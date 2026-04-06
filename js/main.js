import { GameEngine } from "./gameEngine.js";
import {
  ATTACHMENT_STYLES,
  CHARACTER_ARCHETYPES,
  DIMENSION_KEYS,
  getLang,
  toggleLang,
  t,
  ATTACHMENT_LABELS,
  ARCHETYPE_LABELS,
  PATTERN_LABELS,
  DIMENSION_LABELS,
  RARITY_LABELS,
  UI,
  formatUi
} from "./config.js";
import { PHASE_1_SCENES, ATTACHMENT_STYLE_SUMMARIES } from "./scenes.js";
import {
  getPhaseTwoChoices,
  getTurnScenario,
  PHASE_2_TOTAL_TURNS,
  buildTurnScenarioFromSnapshot
} from "./phase2.js";

const engine = new GameEngine();
let currentSceneIndex = 0;
let currentSceneId = PHASE_1_SCENES[0]?.id ?? null;
let viewMode = "scene";
const PROGRESSION_STORAGE_KEY = "hearth_phase2_progression_v1";
const PHASE_2_START_CHAPTER = 4;
const PHASE_2_FINAL_CHAPTER = 10;
const CINEMATIC_SCENE_TRANSITION_MS = 900;
const CINEMATIC_TYPEWORD_MS = 34;
const CINEMATIC_ORB_STAGGER_MS = 70;
const CINEMATIC_CONSTELLATION_FADE_MS = 700;
const DEFAULT_WORLD_MAP = { chapters: [] };
const DEFAULT_SYSTEMS = {
  dimensionWeightsByFocus: {
    selfWorth: { selfWorth: 1.4, motivation: 1, pattern: 1 },
    motivation: { selfWorth: 1, motivation: 1.4, pattern: 1 },
    pattern: { selfWorth: 1, motivation: 1, pattern: 1.4 },
    integrated: { selfWorth: 1.2, motivation: 1.2, pattern: 1.2 }
  },
  difficulty: {
    minTier: 1,
    maxTier: 4,
    securePenaltyPerTier: 0.04
  }
};
let worldMapModel = structuredClone(DEFAULT_WORLD_MAP);
let systemsModel = structuredClone(DEFAULT_SYSTEMS);
const DEFAULT_PROGRESSION = {
  day: 1,
  secureProgress: 35,
  difficultyTier: 1,
  chapterIndex: PHASE_2_START_CHAPTER,
  chapterHistory: [],
  season: 1,
  isSeasonComplete: false,
  lastDominantStyle: "secure",
  insightPoints: 0,
  unlockedPerks: [],
  activePerk: null,
  showPerkDetails: false
};
const progression = loadProgression();
const PERK_DEFINITIONS = [
  {
    id: "reflective-pause",
    name: {
      EN: "Reflective Pause",
      TH: "จังหวะสะท้อน"
    },
    rarity: "Common",
    threshold: 6,
    description: {
      EN: "Soften emotional spikes: insecure losses are reduced.",
      TH: "ลดหางแรงกระชากทางอารมณ์: การเสียจากความไม่มั่นคงเบาลง"
    },
    effects: { negativeReduction: 1 }
  },
  {
    id: "grounding-ritual",
    name: {
      EN: "Grounding Ritual",
      TH: "พิธีกรรมเชื่อมตัว"
    },
    rarity: "Common",
    threshold: 12,
    description: {
      EN: "Start each day with a small stability boost.",
      TH: "เริ่มวันด้วยความมั่นคงเล็กน้อย"
    },
    effects: { dayStartBoost: 2 }
  },
  {
    id: "boundary-compass",
    name: {
      EN: "Boundary Compass",
      TH: "เข็มทิศขอบเขต"
    },
    rarity: "Rare",
    threshold: 20,
    description: {
      EN: "Boundary clarity: secure decisions gain extra progress.",
      TH: "ขอบเขตชัด: การตัดสินใจแบบมั่นคงได้คะแนนเพิ่ม"
    },
    effects: { positiveBonus: 1 }
  },
  {
    id: "pattern-lens",
    name: {
      EN: "Pattern Lens",
      TH: "เลนส์รูปแบบ"
    },
    rarity: "Rare",
    threshold: 26,
    description: {
      EN: "Meta insight: gain extra Insight from secure turns.",
      TH: "อินซายต์เชิงเมตา: ได้อินซายต์พิเศษจากเทิร์นแบบมั่นคง"
    },
    effects: { insightBonusOnSecure: 1 }
  },
  {
    id: "repair-script",
    name: {
      EN: "Repair Script",
      TH: "บทสนทนาซ่อมความสัมพันธ์"
    },
    rarity: "Epic",
    threshold: 36,
    description: {
      EN: "Repair momentum: larger day-start boost and stronger secure gain.",
      TH: "โมเมนตัมการซ่อม: เริ่มวันแรงขึ้นและได้คะแนนมั่นคงชัดขึ้น"
    },
    effects: { dayStartBoost: 5, positiveBonus: 1 }
  }
];

const phaseTwoSession = {
  day: progression.day,
  chapterIndex: progression.chapterIndex,
  character: null,
  turn: 0,
  secureProgress: progression.secureProgress,
  difficultyTier: progression.difficultyTier,
  seenScenarios: [],
  activePerk: progression.activePerk,
  perkShopOffers: [],
  rerollCount: 0,
  showPerkDetails: progression.showPerkDetails,
  lastTurnSnapshot: null,
  feedbackSecureShiftScore: null
};
let seasonRecapCache = null;
let isPhaseOneTransitioning = false;
let phaseTwoDaySummaryPaintPayload = null;

const phaseLabel = document.querySelector("#phaseLabel");
const sceneLabel = document.querySelector("#sceneLabel");
const sceneTitle = document.querySelector("#sceneTitle");
const sceneDescription = document.querySelector("#sceneDescription");
const choiceContainer = document.querySelector("#choiceContainer");
const attachmentStatus = document.querySelector("#attachmentStatus");
const resultText = document.querySelector("#resultText");
const restartButton = document.querySelector("#restartButton");
const resetUiPrefsButton = document.querySelector("#resetUiPrefsButton");
const phase2Meta = document.querySelector("#phase2Meta");
const phase2TurnLabel = document.querySelector("#phase2TurnLabel");
const phase2ProgressFill = document.querySelector("#phase2ProgressFill");
const phase2ProgressText = document.querySelector("#phase2ProgressText");
const langToggleBtn = document.querySelector("#langToggleBtn");
const starfieldCanvas = document.querySelector("#starfieldCanvas") || document.querySelector("#star-canvas");
const constellationCanvas = document.querySelector("#constellationCanvas");
const tintOverlay = document.querySelector("#tintOverlay");
const moodIndicator = document.querySelector("#moodIndicator");
const sceneChoicePrompt = document.querySelector("#sceneChoicePrompt");
const internalNote = document.querySelector("#internalNote");
const heroTitleEl = document.querySelector(".hero__title");
const heroSubtitleEl = document.querySelector(".hero__subtitle");
const statusCardTitleEl = document.querySelector(".status-card h3");
const progressWrapEl = document.querySelector(".progress-wrap");

let starfieldCtx = null;
let constellationCtx = null;
let starfieldStars = [];
let starfieldRafId = null;
let constellationFlashTimer = null;
let starfieldSpeedMultiplier = 1;
let starfieldTargetSpeedMultiplier = 1;
let starfieldGlowBoost = 1;
let starfieldTargetGlowBoost = 1;
let textTypeTimer = null;
let audioCtx = null;

function toDisplayName(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function labelStyle(style) {
  return t(ATTACHMENT_LABELS[style] ?? { EN: toDisplayName(style), TH: style });
}

function labelArchetype(name) {
  return t(ARCHETYPE_LABELS[name] ?? { EN: name, TH: name });
}

function labelPattern(patternKey) {
  return t(PATTERN_LABELS[patternKey] ?? { EN: toDisplayName(patternKey), TH: patternKey });
}

function labelRarity(rarity) {
  return t(RARITY_LABELS[rarity] ?? { EN: rarity, TH: rarity });
}

function applyShellI18n() {
  document.documentElement.lang = getLang() === "TH" ? "th" : "en";
  document.title = t(UI.docTitle);
  if (heroTitleEl) heroTitleEl.textContent = t(UI.heroTitle);
  if (heroSubtitleEl) heroSubtitleEl.textContent = t(UI.heroSubtitle);
  if (statusCardTitleEl) statusCardTitleEl.textContent = t(UI.statusCardTitle);
  if (progressWrapEl) {
    progressWrapEl.setAttribute("aria-label", t(UI.progressSecureAria));
  }
  if (resetUiPrefsButton) {
    resetUiPrefsButton.textContent = t(UI.resetUiPrefs);
  }
  if (langToggleBtn) {
    langToggleBtn.textContent = getLang() === "EN" ? "ไทย" : "English";
  }
}

function applySceneTint(tintColor, opacity = 0) {
  if (!tintOverlay) {
    return;
  }
  if (!tintColor) {
    tintOverlay.style.opacity = "0";
    return;
  }
  tintOverlay.style.backgroundColor = tintColor;
  tintOverlay.style.opacity = `${opacity}`;
}

function updateMoodIndicator(moodValue) {
  if (!moodIndicator) {
    return;
  }
  const moodMap = {
    neutral: "",
    heavy: "🌑",
    lonely: "🌘",
    numb: "🌿",
    withdrawn: "🌑",
    open: "🌒",
    reaching: "🌓",
    warm: "🌕",
    still: "🍃",
    cosmic: "✨",
    peaceful: "☀️",
    moving: "🌱"
  };
  moodIndicator.textContent = moodMap[moodValue] ?? "";
}

function replayGalaxyTransition(...elements) {
  elements.forEach((el) => {
    if (!el) return;
    el.classList.remove("galaxy-transition");
    // Force reflow so animation replays on each scene
    void el.offsetWidth;
    el.classList.add("galaxy-transition");
  });
}

function stopTypewriter() {
  if (textTypeTimer) {
    clearInterval(textTypeTimer);
    textTypeTimer = null;
  }
}

function typeTextWordByWord(targetEl, text, options = {}) {
  const words = String(text ?? "").split(/\s+/).filter(Boolean);
  const intervalMs = options.intervalMs ?? CINEMATIC_TYPEWORD_MS;
  targetEl.textContent = "";
  if (words.length === 0) {
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    let i = 0;
    stopTypewriter();
    textTypeTimer = window.setInterval(() => {
      i += 1;
      targetEl.textContent = words.slice(0, i).join(" ");
      if (i >= words.length) {
        stopTypewriter();
        resolve();
      }
    }, intervalMs);
  });
}

function initAudio() {
  if (audioCtx) return;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  audioCtx = new AudioContextClass();
}

function ensureAudioResumed() {
  if (!audioCtx) return;
  if (audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
}

function playPing(style = "neutral") {
  if (!audioCtx) return;
  ensureAudioResumed();
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const base = style === "anxious" ? 420 : style === "secure" ? 250 : style === "avoidant" ? 180 : 300;
  osc.type = "sine";
  osc.frequency.setValueAtTime(base, now);
  osc.frequency.exponentialRampToValueAtTime(base * 0.55, now + 0.8);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(0.08, now + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(now);
  osc.stop(now + 0.9);
}

function playWindChime() {
  if (!audioCtx) return;
  ensureAudioResumed();
  const freqs = [523.25, 659.25, 783.99];
  freqs.forEach((freq, idx) => {
    const start = audioCtx.currentTime + idx * 0.08;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.linearRampToValueAtTime(0.05, start + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 1.2);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(start);
    osc.stop(start + 1.25);
  });
}

function initStarfield() {
  if (!starfieldCanvas || !constellationCanvas) {
    return;
  }
  starfieldCtx = starfieldCanvas.getContext("2d");
  constellationCtx = constellationCanvas.getContext("2d");
  if (!starfieldCtx || !constellationCtx) {
    return;
  }
  resizeSkyCanvases();
  buildStars();
  if (starfieldRafId) {
    cancelAnimationFrame(starfieldRafId);
  }
  animateStarfield();
  window.addEventListener("resize", () => {
    resizeSkyCanvases();
    buildStars();
  });
}

function resizeSkyCanvases() {
  if (!starfieldCanvas || !constellationCanvas) {
    return;
  }
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = Math.floor(window.innerWidth * dpr);
  const h = Math.floor(window.innerHeight * dpr);
  starfieldCanvas.width = w;
  starfieldCanvas.height = h;
  constellationCanvas.width = w;
  constellationCanvas.height = h;
  if (starfieldCtx) {
    starfieldCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  if (constellationCtx) {
    constellationCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
}

function buildStars() {
  const targetCount = Math.max(45, Math.floor((window.innerWidth * window.innerHeight) / 18000));
  starfieldStars = Array.from({ length: targetCount }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: 0.35 + Math.random() * 1.35,
    a: 0.15 + Math.random() * 0.45,
    vy: 0.01 + Math.random() * 0.06,
    vx: (Math.random() - 0.5) * 0.02,
    twinkle: Math.random() * Math.PI * 2
  }));
}

function animateStarfield() {
  if (!starfieldCtx) {
    return;
  }
  starfieldCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  starfieldSpeedMultiplier += (starfieldTargetSpeedMultiplier - starfieldSpeedMultiplier) * 0.06;
  starfieldGlowBoost += (starfieldTargetGlowBoost - starfieldGlowBoost) * 0.06;

  for (const star of starfieldStars) {
    star.x += star.vx * starfieldSpeedMultiplier;
    star.y += star.vy * starfieldSpeedMultiplier;
    star.twinkle += 0.01;

    if (star.y > window.innerHeight + 2) star.y = -2;
    if (star.x > window.innerWidth + 2) star.x = -2;
    if (star.x < -2) star.x = window.innerWidth + 2;

    const twinkleAlpha = Math.max(
      0.07,
      Math.min(0.9, (star.a + Math.sin(star.twinkle) * 0.08) * starfieldGlowBoost)
    );
    starfieldCtx.beginPath();
    starfieldCtx.fillStyle = `rgba(255, 247, 223, ${twinkleAlpha})`;
    starfieldCtx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    starfieldCtx.fill();
  }

  starfieldRafId = requestAnimationFrame(animateStarfield);
}

function getHoverProfile(choice) {
  const scoreMap = choice.styleImpact ?? getAttachmentStyleFromEffects(choice.effects ?? {});
  const bestStyle = ATTACHMENT_STYLES.reduce((best, key) => {
    const bestValue = scoreMap[best] ?? Number.NEGATIVE_INFINITY;
    const currentValue = scoreMap[key] ?? Number.NEGATIVE_INFINITY;
    return currentValue > bestValue ? key : best;
  }, ATTACHMENT_STYLES[0]);

  if (bestStyle === "anxious") return { speed: 2.2, glow: 1.15 };
  if (bestStyle === "secure") return { speed: 0.8, glow: 1.55 };
  if (bestStyle === "avoidant") return { speed: 0.6, glow: 0.95 };
  if (bestStyle === "fearful") return { speed: 1.6, glow: 1.25 };
  return { speed: 1, glow: 1 };
}

function triggerConstellationFlash() {
  if (!constellationCtx || !constellationCanvas) {
    return;
  }
  if (constellationFlashTimer) {
    clearTimeout(constellationFlashTimer);
  }
  const points = [];
  const count = 5 + Math.floor(Math.random() * 3);
  for (let i = 0; i < count; i += 1) {
    points.push({
      x: window.innerWidth * (0.2 + Math.random() * 0.6),
      y: window.innerHeight * (0.15 + Math.random() * 0.7)
    });
  }
  points.sort((a, b) => a.x - b.x);

  constellationCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  constellationCtx.beginPath();
  constellationCtx.strokeStyle = "rgba(219, 205, 255, 0.42)";
  constellationCtx.lineWidth = 1.1;
  constellationCtx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i += 1) {
    constellationCtx.lineTo(points[i].x, points[i].y);
  }
  constellationCtx.stroke();

  points.forEach((pt) => {
    constellationCtx.beginPath();
    constellationCtx.fillStyle = "rgba(255, 250, 236, 0.62)";
    constellationCtx.arc(pt.x, pt.y, 1.9, 0, Math.PI * 2);
    constellationCtx.fill();
  });

  constellationCanvas.style.opacity = "0.5";
  constellationCanvas.style.transition = `opacity ${CINEMATIC_CONSTELLATION_FADE_MS}ms ease`;
  constellationFlashTimer = window.setTimeout(() => {
    constellationCanvas.style.opacity = "0";
    window.setTimeout(() => {
      if (constellationCtx) {
        constellationCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }
    }, CINEMATIC_CONSTELLATION_FADE_MS);
  }, 140);
}

function showInternalNote(noteObj) {
  if (!internalNote) {
    return;
  }
  if (!noteObj) {
    internalNote.hidden = true;
    internalNote.textContent = "";
    return;
  }
  internalNote.hidden = false;
  internalNote.textContent = t(noteObj);
}

function refreshCurrentView() {
  applyShellI18n();
  switch (viewMode) {
    case "scene":
      renderScene(getSceneById(currentSceneId) ?? PHASE_1_SCENES[0]);
      break;
    case "breathing": {
      const breathingScene = getSceneById(currentSceneId) ?? PHASE_1_SCENES[0];
      renderBreathingScene(breathingScene);
      break;
    }
    case "summary":
      renderPhaseOneSummary();
      break;
    case "phase2-turn":
      renderPhaseTwoTurn({ reuseLastScenario: true });
      break;
    case "phase2-turn-feedback":
      if (phaseTwoSession.feedbackSecureShiftScore != null) {
        renderPhaseTwoTurnFeedback(phaseTwoSession.feedbackSecureShiftScore);
      }
      break;
    case "phase2-perk-select":
      renderPerkSelection();
      break;
    case "phase2-day-summary":
      if (phaseTwoDaySummaryPaintPayload) {
        applyPhaseTwoDaySummaryPaint(phaseTwoDaySummaryPaintPayload);
      }
      break;
    case "phase2-season-recap":
      renderSeasonRecap();
      break;
    default:
      break;
  }
}

function renderBreathingScene(scene) {
  viewMode = "breathing";
  updateUiPreferenceButtonVisibility();
  hidePhaseTwoMeta();
  phaseLabel.textContent = t(scene.phaseLabel ?? { EN: "Interlude", TH: "ช่วงพักใจ" });
  sceneLabel.textContent = t(scene.sceneLabel ?? { EN: "Breathing", TH: "หายใจ" });
  sceneTitle.textContent = t(scene.title ?? { EN: "Breathing Space", TH: "พักหายใจ" });
  sceneDescription.textContent = t(scene.description);
  if (sceneChoicePrompt) {
    sceneChoicePrompt.textContent = "";
  }
  applySceneTint(scene.backgroundTint ?? "#0a0a1a", scene.tintOpacity ?? 0.5);
  updateMoodIndicator(scene.mood ?? "cosmic");
  showInternalNote(null);
  resultText.textContent = "";
  restartButton.hidden = true;

  const steps = Array.isArray(scene.breathInstruction) ? scene.breathInstruction : null;
  const chosen = steps ? steps : (scene.breathInstruction ? t(scene.breathInstruction) : "");
  const lines = Array.isArray(chosen) ? chosen : [chosen];
  choiceContainer.innerHTML = "";
  lines.forEach((line) => {
    const p = document.createElement("p");
    p.className = "chapter-recap-line";
    p.style.fontSize = "1rem";
    p.style.margin = "6px 0";
    p.textContent = line;
    choiceContainer.appendChild(p);
  });
  const continueBtn = document.createElement("button");
  continueBtn.type = "button";
  continueBtn.className = "choice-btn";
  continueBtn.textContent = t(scene.continueLabel ?? { EN: "Continue", TH: "ไปต่อ" });
  continueBtn.addEventListener("click", () => {
    if (scene.effects) {
      engine.applyChoice(
        normalizeChoiceForEngine({
          id: `${scene.id}-breath`,
          text: t(scene.title ?? { EN: "Breathing", TH: "หายใจ" }),
          effects: scene.effects
        }),
        { dimensionWeights: {} }
      );
      renderStatus();
    }
    const nextScene = scene.next ? getSceneById(scene.next) : null;
    if (!nextScene || nextScene.isSummary) {
      showSummary();
      return;
    }
    currentSceneId = nextScene.id;
    currentSceneIndex = Math.max(0, PHASE_1_SCENES.findIndex((entry) => entry.id === nextScene.id));
    renderScene(nextScene);
  });
  choiceContainer.appendChild(continueBtn);
  replayGalaxyTransition(sceneTitle, sceneDescription, choiceContainer);
}

async function loadContentModels() {
  try {
    const [worldRes, systemsRes] = await Promise.all([
      fetch("./js/data/worldMap10.json"),
      fetch("./js/data/systems.v3.json")
    ]);

    if (worldRes.ok) {
      worldMapModel = await worldRes.json();
    }
    if (systemsRes.ok) {
      systemsModel = await systemsRes.json();
    }
  } catch {
    worldMapModel = structuredClone(DEFAULT_WORLD_MAP);
    systemsModel = structuredClone(DEFAULT_SYSTEMS);
  }
}

function getChapterByOrder(order) {
  return worldMapModel.chapters.find((chapter) => chapter.order === order) ?? null;
}

function getCurrentPhaseTwoChapter() {
  return getChapterByOrder(phaseTwoSession.chapterIndex);
}

function getPhaseOneChapterForScene(sceneIndex) {
  return getChapterByOrder(sceneIndex + 1);
}

function getSceneById(sceneId) {
  return PHASE_1_SCENES.find((scene) => scene.id === sceneId) ?? null;
}

function getAttachmentStyleFromEffects(effects = {}) {
  return {
    anxious: effects.anxious ?? 0,
    secure: effects.secure ?? 0,
    avoidant: effects.avoidant ?? 0,
    fearful: effects.fearful ?? 0
  };
}

function normalizeChoiceForEngine(choice) {
  if (choice.styleImpact || choice.dimensions) {
    return choice;
  }
  return {
    ...choice,
    styleImpact: getAttachmentStyleFromEffects(choice.effects ?? {}),
    dimensions: { selfWorth: 0, motivation: 0, pattern: 0 }
  };
}

function calculateAttachmentStyle() {
  const state = engine.getState();
  const topStyle = ATTACHMENT_STYLES.reduce((best, current) => {
    const bestScore = state.scores[best] ?? Number.NEGATIVE_INFINITY;
    const currentScore = state.scores[current] ?? Number.NEGATIVE_INFINITY;
    return currentScore > bestScore ? current : best;
  }, ATTACHMENT_STYLES[0]);
  return { topStyle, scores: state.scores };
}

function getNextChapterPolicy(currentChapterIndex) {
  if (currentChapterIndex >= PHASE_2_FINAL_CHAPTER) {
    return { nextChapterIndex: PHASE_2_FINAL_CHAPTER, isSeasonComplete: true };
  }
  return { nextChapterIndex: currentChapterIndex + 1, isSeasonComplete: false };
}

function getDimensionWeightsForChapter(chapter) {
  const focus = chapter?.focusDimension ?? "integrated";
  return systemsModel.dimensionWeightsByFocus[focus] ??
    systemsModel.dimensionWeightsByFocus.integrated ??
    DEFAULT_SYSTEMS.dimensionWeightsByFocus.integrated;
}

function loadProgression() {
  try {
    const raw = window.localStorage.getItem(PROGRESSION_STORAGE_KEY);
    if (!raw) {
      return structuredClone(DEFAULT_PROGRESSION);
    }
    const parsed = JSON.parse(raw);
    return {
      day: parsed.day ?? DEFAULT_PROGRESSION.day,
      secureProgress: parsed.secureProgress ?? DEFAULT_PROGRESSION.secureProgress,
      difficultyTier: parsed.difficultyTier ?? DEFAULT_PROGRESSION.difficultyTier,
      chapterIndex: parsed.chapterIndex ?? DEFAULT_PROGRESSION.chapterIndex,
      chapterHistory: parsed.chapterHistory ?? DEFAULT_PROGRESSION.chapterHistory,
      season: parsed.season ?? DEFAULT_PROGRESSION.season,
      isSeasonComplete:
        parsed.isSeasonComplete ?? DEFAULT_PROGRESSION.isSeasonComplete,
      lastDominantStyle:
        parsed.lastDominantStyle ?? DEFAULT_PROGRESSION.lastDominantStyle,
      insightPoints: parsed.insightPoints ?? DEFAULT_PROGRESSION.insightPoints,
      unlockedPerks: parsed.unlockedPerks ?? DEFAULT_PROGRESSION.unlockedPerks,
      activePerk: parsed.activePerk ?? DEFAULT_PROGRESSION.activePerk,
      showPerkDetails:
        parsed.showPerkDetails ?? DEFAULT_PROGRESSION.showPerkDetails
    };
  } catch {
    return structuredClone(DEFAULT_PROGRESSION);
  }
}

function saveProgression() {
  window.localStorage.setItem(PROGRESSION_STORAGE_KEY, JSON.stringify(progression));
}

function getScoreSummary(state) {
  return DIMENSION_KEYS
    .map((key) => `${t(DIMENSION_LABELS[key])}: ${state.dimensions[key]}`)
    .join(" | ");
}

function getSecureShiftFeedback(secureShiftScore) {
  if (secureShiftScore >= 2) {
    return t(UI.secureShiftStrong);
  }
  if (secureShiftScore >= 0) {
    return t(UI.secureShiftPartial);
  }
  return t(UI.secureShiftInsecure);
}

function hasPerk(perkId) {
  return progression.unlockedPerks.includes(perkId);
}

function getUnlockedPerkNames() {
  return PERK_DEFINITIONS.filter((perk) => hasPerk(perk.id))
    .map((perk) => t(perk.name))
    .join(", ");
}

function getUnlockedPerks() {
  return PERK_DEFINITIONS.filter((perk) => hasPerk(perk.id));
}

function getPerkName(perkId) {
  const perk = PERK_DEFINITIONS.find((entry) => entry.id === perkId);
  return perk ? t(perk.name) : t({ EN: "None", TH: "ไม่มี" });
}

function getPerkById(perkId) {
  return PERK_DEFINITIONS.find((entry) => entry.id === perkId) ?? null;
}

function getPerkRarity(perkId) {
  const perk = getPerkById(perkId);
  return perk ? perk.rarity : "None";
}

function isActivePerk(perkId) {
  return phaseTwoSession.activePerk === perkId;
}

function getActivePerkEffects() {
  const perk = getPerkById(phaseTwoSession.activePerk);
  return perk?.effects ?? {};
}

function grantInsightPoints(secureShiftScore) {
  const effects = getActivePerkEffects();
  const bonusOnSecure = effects.insightBonusOnSecure ?? 0;
  if (secureShiftScore >= 2) {
    progression.insightPoints += 3 + bonusOnSecure;
    return;
  }
  if (secureShiftScore >= 0) {
    progression.insightPoints += 2 + bonusOnSecure;
    return;
  }
  progression.insightPoints += 1;
}

function unlockPerksByProgression() {
  const unlockedIds = [];
  PERK_DEFINITIONS.forEach((perk) => {
    if (progression.insightPoints >= perk.threshold && !hasPerk(perk.id)) {
      progression.unlockedPerks.push(perk.id);
      unlockedIds.push(perk.id);
    }
  });
  return unlockedIds;
}

function pickPhaseTwoCharacter() {
  const playerArchetype = engine.getTopArchetype();
  const pool = CHARACTER_ARCHETYPES.filter((type) => type !== playerArchetype);
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getAdaptiveDifficultyTier() {
  const topStyle = engine.getTopAttachmentStyle();
  let stylePressure = 0;
  if (topStyle === "anxious" || topStyle === "fearful") {
    stylePressure = 1;
  } else if (topStyle === "secure") {
    stylePressure = -1;
  }
  const progressPressure = progression.secureProgress >= 70 ? 1 : 0;
  const minTier = systemsModel.difficulty.minTier ?? 1;
  const maxTier = systemsModel.difficulty.maxTier ?? 4;
  return clamp(progression.difficultyTier + stylePressure + progressPressure, minTier, maxTier);
}

function getAdaptiveDelta(secureShiftScore) {
  const tier = phaseTwoSession.difficultyTier;
  let positiveScale = 9 - tier;
  let negativeScale = 6 + tier;
  const effects = getActivePerkEffects();
  const positiveBonus = effects.positiveBonus ?? 0;
  const negativeReduction = effects.negativeReduction ?? 0;

  positiveScale += positiveBonus;
  negativeScale -= negativeReduction;

  if (secureShiftScore >= 0) {
    return secureShiftScore * positiveScale;
  }
  return secureShiftScore * negativeScale;
}

function getRarityWeight(rarity) {
  if (rarity === "Common") return 5;
  if (rarity === "Rare") return 3;
  return 1;
}

function drawWeightedPerk(unlockedPool) {
  const totalWeight = unlockedPool.reduce(
    (sum, perk) => sum + getRarityWeight(perk.rarity),
    0
  );
  let roll = Math.random() * totalWeight;
  for (const perk of unlockedPool) {
    roll -= getRarityWeight(perk.rarity);
    if (roll <= 0) {
      return perk;
    }
  }
  return unlockedPool[unlockedPool.length - 1];
}

function getPerkShopOffers() {
  const unlocked = getUnlockedPerks();
  if (unlocked.length <= 3) {
    return unlocked;
  }

  const pool = [...unlocked];
  const offers = [];
  while (offers.length < 3 && pool.length > 0) {
    const selected = drawWeightedPerk(pool);
    offers.push(selected);
    const index = pool.findIndex((entry) => entry.id === selected.id);
    if (index >= 0) {
      pool.splice(index, 1);
    }
  }
  return offers;
}

function getRerollCost() {
  return 3 + phaseTwoSession.rerollCount * 2;
}

function getChoiceOutcomeProbabilities(style, difficultyTier) {
  const secureBase = style === "secure" ? 0.5 : 0.3;
  const mixedBase = style === "fearful" ? 0.28 : 0.2;
  const insecureBase = style === "avoidant" ? 0.32 : 0.24;
  const anxiousBase = style === "anxious" ? 0.3 : 0.16;
  const difficultyPenaltyRate = systemsModel.difficulty.securePenaltyPerTier ?? 0.04;
  const difficultyPenalty = (difficultyTier - 1) * difficultyPenaltyRate;

  const secure = clamp(secureBase - difficultyPenalty, 0.12, 0.62);
  const mixed = clamp(mixedBase + difficultyPenalty * 0.5, 0.12, 0.32);
  const insecure = clamp(insecureBase + difficultyPenalty * 0.8, 0.12, 0.38);
  const anxious = clamp(1 - (secure + mixed + insecure), 0.12, 0.4);

  return { secure, mixed, insecure, anxious };
}

function getExpectedValueForPerk(perk, dominantStyle, difficultyTier) {
  const probs = getChoiceOutcomeProbabilities(dominantStyle, difficultyTier);
  const effects = perk?.effects ?? {};
  const positiveScale = (9 - difficultyTier) + (effects.positiveBonus ?? 0);
  const negativeScale = (6 + difficultyTier) - (effects.negativeReduction ?? 0);

  const evSecureProgress =
    probs.secure * (2 * positiveScale) +
    probs.mixed * (-2 * negativeScale) +
    probs.insecure * (-1 * negativeScale) +
    probs.anxious * (-2 * negativeScale) +
    (effects.dayStartBoost ?? 0);

  const evInsight =
    probs.secure * (3 + (effects.insightBonusOnSecure ?? 0)) +
    probs.mixed * 1 +
    probs.insecure * 1 +
    probs.anxious * 1;

  const strategicScore = (evSecureProgress * 0.75) + (evInsight * 1.5);
  return {
    evSecureProgress: Math.round(evSecureProgress * 10) / 10,
    evInsight: Math.round(evInsight * 10) / 10,
    strategicScore: Math.round(strategicScore * 10) / 10
  };
}

function formatSigned(value) {
  return value > 0 ? `+${value}` : `${value}`;
}

function downloadFile(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function getBatchTimestamp() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return (
    `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_` +
    `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`
  );
}

function toCsvRow(values) {
  return values
    .map((value) => {
      const text = String(value ?? "");
      const escaped = text.replace(/"/g, "\"\"");
      return `"${escaped}"`;
    })
    .join(",");
}

function toSeasonRecapCsv(recap) {
  const header = toCsvRow([
    "season",
    "day",
    "chapterOrder",
    "chapterTitle",
    "focusDimension",
    "hiddenQuestion",
    "selfWorth",
    "motivation",
    "pattern"
  ]);
  const rows = recap.history.map((entry) =>
    toCsvRow([
      recap.season,
      entry.day,
      entry.chapterOrder,
      entry.chapterTitle,
      entry.focusDimension,
      entry.hiddenQuestion,
      entry.dimensions?.selfWorth ?? 0,
      entry.dimensions?.motivation ?? 0,
      entry.dimensions?.pattern ?? 0
    ])
  );
  return [header, ...rows].join("\n");
}

function exportSeasonRecapJson() {
  if (!seasonRecapCache) {
    return;
  }
  const fileName =
    `hearth-season-${seasonRecapCache.season}-${seasonRecapCache.batchTimestamp}-recap.json`;
  const content = JSON.stringify(seasonRecapCache, null, 2);
  downloadFile(fileName, content, "application/json");
}

function exportSeasonRecapCsv() {
  if (!seasonRecapCache) {
    return;
  }
  const fileName =
    `hearth-season-${seasonRecapCache.season}-${seasonRecapCache.batchTimestamp}-recap.csv`;
  const content = toSeasonRecapCsv(seasonRecapCache);
  downloadFile(fileName, content, "text/csv;charset=utf-8");
}

function exportSeasonRecapSvg() {
  if (!seasonRecapCache) {
    return;
  }
  const fileName =
    `hearth-season-${seasonRecapCache.season}-${seasonRecapCache.batchTimestamp}-trend.svg`;
  const content = seasonRecapCache.trendSvg;
  downloadFile(fileName, content, "image/svg+xml;charset=utf-8");
}

function exportSeasonRecapAll() {
  if (!seasonRecapCache) {
    return;
  }
  const sharedBatchTimestamp = getBatchTimestamp();
  seasonRecapCache.batchTimestamp = sharedBatchTimestamp;
  exportSeasonRecapJson();
  setTimeout(() => exportSeasonRecapCsv(), 120);
  setTimeout(() => exportSeasonRecapSvg(), 240);
}

function getPerkScoreReasons(perk, dominantStyle, difficultyTier) {
  const effects = perk?.effects ?? {};
  const reasons = [];
  const styleLabel = labelStyle(dominantStyle);

  reasons.push(formatUi(UI.perkReasonIntro, { style: styleLabel, tier: difficultyTier }));

  if ((effects.positiveBonus ?? 0) > 0) {
    reasons.push(formatUi(UI.perkReasonPositive, { n: effects.positiveBonus }));
  }
  if ((effects.negativeReduction ?? 0) > 0) {
    reasons.push(
      formatUi(UI.perkReasonNegative, { n: effects.negativeReduction })
    );
  }
  if ((effects.dayStartBoost ?? 0) > 0) {
    reasons.push(formatUi(UI.perkReasonDay, { n: effects.dayStartBoost }));
  }
  if ((effects.insightBonusOnSecure ?? 0) > 0) {
    reasons.push(
      formatUi(UI.perkReasonInsight, { n: effects.insightBonusOnSecure })
    );
  }
  if (reasons.length === 1) {
    reasons.push(t(UI.perkReasonBaseline));
  }

  return reasons.join(" ");
}

function buildTelemetryPanel(offers) {
  const dominantStyle = engine.getTopAttachmentStyle();
  const difficultyTier = getAdaptiveDifficultyTier();
  const panel = document.createElement("div");
  panel.className = "telemetry-panel";

  const title = document.createElement("p");
  title.className = "telemetry-title";
  title.textContent = formatUi(UI.telemetryTitle, {
    style: labelStyle(dominantStyle),
    tier: difficultyTier
  });
  panel.appendChild(title);

  const list = document.createElement("div");
  list.className = "telemetry-list";
  if (!phaseTwoSession.showPerkDetails) {
    list.classList.add("is-collapsed");
  }

  const ranked = offers
    .map((perk) => ({ perk, metric: getExpectedValueForPerk(perk, dominantStyle, difficultyTier) }))
    .sort((a, b) => b.metric.strategicScore - a.metric.strategicScore);

  ranked.forEach(({ perk, metric }, index) => {
    const row = document.createElement("p");
    row.className = "telemetry-row";
    row.title = getPerkScoreReasons(perk, dominantStyle, difficultyTier);
    row.textContent = formatUi(UI.telemetryRow, {
      rank: index + 1,
      name: t(perk.name),
      rarity: labelRarity(perk.rarity),
      score: metric.strategicScore,
      evS: metric.evSecureProgress,
      evI: metric.evInsight
    });
    list.appendChild(row);
  });

  panel.appendChild(list);
  return panel;
}

function hidePhaseTwoMeta() {
  phase2Meta.hidden = true;
}

function updateUiPreferenceButtonVisibility() {
  resetUiPrefsButton.hidden = !(
    viewMode === "phase2-perk-select" ||
    viewMode === "phase2-day-summary" ||
    viewMode === "phase2-season-recap"
  );
}

function renderPhaseTwoMeta() {
  phase2Meta.hidden = false;
  const seasonText = progression.season
    ? formatUi(UI.seasonPrefix, { season: progression.season })
    : "";
  phase2TurnLabel.textContent =
    seasonText +
    formatUi(UI.phase2TurnRest, {
      day: phaseTwoSession.day,
      turn: phaseTwoSession.turn,
      total: PHASE_2_TOTAL_TURNS,
      difficulty: phaseTwoSession.difficultyTier
    });
  phase2ProgressFill.style.width = `${phaseTwoSession.secureProgress}%`;
  phase2ProgressText.textContent = formatUi(UI.phase2ProgressLine, {
    pct: phaseTwoSession.secureProgress,
    insight: progression.insightPoints,
    perk: getPerkName(phaseTwoSession.activePerk),
    rarity: getPerkRarity(phaseTwoSession.activePerk)
  });
}

function renderStatus() {
  const state = engine.getState();
  attachmentStatus.innerHTML = "";

  ATTACHMENT_STYLES.forEach((style) => {
    const pill = document.createElement("div");
    pill.className = "status-pill";
    pill.textContent = `${labelStyle(style)}: ${state.scores[style]}`;
    attachmentStatus.appendChild(pill);
  });
}

function finalizeScene() {
  const state = engine.getState();
  const dominantStyle = engine.getTopAttachmentStyle();
  const dominantArchetype = engine.getTopArchetype();
  const dominantPattern = engine.getDerivedPattern();

  resultText.textContent =
    `Current archetype signal: ${labelArchetype(dominantArchetype)}. ` +
    `Dominant attachment trend: ${labelStyle(dominantStyle)}. ` +
    `Pattern baseline: ${labelPattern(dominantPattern)}.`;

  const scoreSummary = getScoreSummary(state);
  resultText.textContent += ` Core logic score -> ${scoreSummary}`;

  choiceContainer.innerHTML = "";
  restartButton.textContent =
    currentSceneIndex < PHASE_1_SCENES.length - 1
      ? "Continue to next scene"
      : "View Phase 1 Summary";
  restartButton.hidden = false;
}

function handleChoice(choice) {
  if (isPhaseOneTransitioning) {
    return;
  }
  isPhaseOneTransitioning = true;
  playPing((choice.styleImpact && Object.keys(choice.styleImpact).find((k) => choice.styleImpact[k] > 0)) || "neutral");
  playWindChime();
  triggerConstellationFlash();
  const chapter = getPhaseOneChapterForScene(currentSceneIndex);
  const dimensionWeights = getDimensionWeightsForChapter(chapter);
  engine.applyChoice(normalizeChoiceForEngine(choice), { dimensionWeights });
  applySceneTint(choice.tint ?? chapter?.backgroundTint ?? null, choice.tintOpacity ?? chapter?.tintOpacity ?? 0);
  updateMoodIndicator(choice.mood ?? chapter?.mood ?? "neutral");
  showInternalNote(choice.internalNote);
  renderStatus();
  choiceContainer.innerHTML = "";
  restartButton.hidden = true;
  const nextScene = choice.next ? getSceneById(choice.next) : null;
  const isSummaryNext = !nextScene || nextScene.isSummary;
  resultText.textContent = isSummaryNext
    ? t(UI.phase1TransitionSummary)
    : t({ EN: "Choice received. Moving to next scene...", TH: "รับคำตอบแล้ว กำลังไปฉากถัดไป..." });

  window.setTimeout(() => {
    isPhaseOneTransitioning = false;
    if (isSummaryNext) {
      renderPhaseOneSummary();
      return;
    }
    currentSceneId = nextScene.id;
    currentSceneIndex = Math.max(0, PHASE_1_SCENES.findIndex((scene) => scene.id === currentSceneId));
    renderScene(nextScene);
  }, CINEMATIC_SCENE_TRANSITION_MS);
}

function renderScene(scene) {
  if (!scene) {
    return;
  }
  if (scene.isSummary) {
    showSummary();
    return;
  }
  if (scene.isBreathingScene) {
    currentSceneId = scene.id;
    currentSceneIndex = Math.max(0, PHASE_1_SCENES.findIndex((entry) => entry.id === scene.id));
    renderBreathingScene(scene);
    return;
  }
  currentSceneId = scene.id;
  currentSceneIndex = Math.max(0, PHASE_1_SCENES.findIndex((entry) => entry.id === scene.id));
  viewMode = "scene";
  updateUiPreferenceButtonVisibility();
  hidePhaseTwoMeta();
  phaseLabel.textContent = t(scene.phaseLabel);
  sceneLabel.textContent = t(scene.sceneLabel);
  sceneTitle.textContent = t(scene.title);
  sceneDescription.textContent = "";
  if (sceneChoicePrompt) {
    sceneChoicePrompt.textContent = scene.choicePrompt ? t(scene.choicePrompt) : "";
  }
  showInternalNote(null);
  applySceneTint(scene.backgroundTint ?? null, scene.tintOpacity ?? 0);
  updateMoodIndicator(scene.mood ?? "neutral");
  resultText.textContent = "";
  restartButton.hidden = true;
  replayGalaxyTransition(sceneTitle, sceneDescription, sceneChoicePrompt, resultText, moodIndicator);

  choiceContainer.innerHTML = "";
  choiceContainer.style.opacity = "0";
  typeTextWordByWord(sceneDescription, t(scene.description), { intervalMs: CINEMATIC_TYPEWORD_MS }).then(() => {
    scene.choices.forEach((choice, index) => {
      const wrapper = document.createElement("div");
      wrapper.className = "orb-wrapper";

      const button = document.createElement("button");
      button.type = "button";
      button.className = "choice-btn orb-choice";
      button.dataset.style = (choice.styleImpact && Object.keys(choice.styleImpact).sort((a, b) => (choice.styleImpact[b] ?? 0) - (choice.styleImpact[a] ?? 0))[0]) || "neutral";
      button.setAttribute("aria-label", t(choice.text));

      const orbCore = document.createElement("span");
      orbCore.className = "orb-core";
      button.appendChild(orbCore);

      const label = document.createElement("p");
      label.className = "orb-label";
      label.textContent = t(choice.text);

      wrapper.appendChild(button);
      wrapper.appendChild(label);
      choiceContainer.appendChild(wrapper);

      const profile = getHoverProfile(choice);
      wrapper.addEventListener("mouseenter", () => {
        starfieldTargetSpeedMultiplier = profile.speed;
        starfieldTargetGlowBoost = profile.glow;
      });
      wrapper.addEventListener("mouseleave", () => {
        starfieldTargetSpeedMultiplier = 1;
        starfieldTargetGlowBoost = 1;
      });
      button.addEventListener("click", () => handleChoice(choice));

      window.setTimeout(() => {
        wrapper.classList.add("revealed");
      }, CINEMATIC_ORB_STAGGER_MS * index);
    });
    choiceContainer.style.opacity = "1";
  });

  renderStatus();
}

function renderPhaseOneSummary() {
  showSummary();
}

function renderSummaryBars(scores) {
  choiceContainer.innerHTML = "";
  const values = ATTACHMENT_STYLES.map((style) => ({
    style,
    score: Math.max(0, scores[style] ?? 0)
  }));
  const maxScore = Math.max(1, ...values.map((entry) => entry.score));

  values.forEach(({ style, score }) => {
    const row = document.createElement("div");
    row.className = "chapter-recap-card";
    row.style.padding = "10px 12px";

    const label = document.createElement("p");
    label.className = "chapter-recap-line";
    label.style.marginBottom = "8px";
    label.textContent = `${labelStyle(style)}: ${score}`;

    const track = document.createElement("div");
    track.className = "progress-track";
    track.style.height = "8px";

    const fill = document.createElement("div");
    fill.className = "progress-fill";
    fill.style.width = `${Math.max(4, Math.round((score / maxScore) * 100))}%`;

    track.appendChild(fill);
    row.appendChild(label);
    row.appendChild(track);
    choiceContainer.appendChild(row);
  });
}

function showSummary() {
  viewMode = "summary";
  updateUiPreferenceButtonVisibility();
  hidePhaseTwoMeta();
  const { topStyle, scores } = calculateAttachmentStyle();
  const state = engine.getState();
  const dominantArchetype = engine.getTopArchetype();
  const dominantPattern = engine.getDerivedPattern();
  const scoreSummary = getScoreSummary(state);
  const styleSummary = ATTACHMENT_STYLE_SUMMARIES[topStyle];

  phaseLabel.textContent = t({ EN: "Celestial Guidance", TH: "คำชี้นำแห่งท้องฟ้า" });
  sceneLabel.textContent = t({ EN: "Star Alignment Reading", TH: "การอ่านแนวเรียงตัวแห่งดวงดาว" });
  sceneTitle.textContent = styleSummary ? t(styleSummary.name) : t(UI.emotionalBlueprint);
  sceneDescription.textContent = styleSummary
    ? `${styleSummary.icon} ${t(styleSummary.spiritual)}`
    : t(UI.summaryIntro);

  renderSummaryBars(scores);

  resultText.textContent = formatUi(
    {
      EN: "Cosmic Energy trend: {style}. Star Alignment reflects {archetype} with a {pattern} arc. Soul Growth markers -> {scores}.",
      TH: "แนวโน้มพลังจักรวาล: {style} การเรียงตัวของดาวสะท้อน {archetype} พร้อมวิถี {pattern} สัญญาณการเติบโตของจิตวิญญาณ -> {scores}"
    },
    {
      style: styleSummary ? t(styleSummary.name) : labelStyle(topStyle),
      archetype: labelArchetype(dominantArchetype),
      pattern: labelPattern(dominantPattern),
      scores: scoreSummary
    }
  );

  restartButton.hidden = false;
  restartButton.textContent = t({ EN: "Restart Story", TH: "เริ่มเรื่องใหม่" });
  replayGalaxyTransition(sceneTitle, sceneDescription, choiceContainer, resultText);
}

function renderPhaseTwoTurn(options = {}) {
  const { reuseLastScenario = false } = options;
  viewMode = "phase2-turn";
  updateUiPreferenceButtonVisibility();
  const state = engine.getState();
  if (!phaseTwoSession.character) {
    phaseTwoSession.character = pickPhaseTwoCharacter();
  }
  if (phaseTwoSession.turn === 0) {
    phaseTwoSession.turn = 1;
  }
  phaseTwoSession.difficultyTier = getAdaptiveDifficultyTier();
  renderPhaseTwoMeta();

  const snap = phaseTwoSession.lastTurnSnapshot;
  const canReuse =
    reuseLastScenario &&
    snap &&
    snap.archetype === phaseTwoSession.character &&
    snap.turnNumber === phaseTwoSession.turn;

  let turnScenario;
  if (canReuse) {
    turnScenario = buildTurnScenarioFromSnapshot(snap);
  } else {
    turnScenario = getTurnScenario(
      phaseTwoSession.character,
      phaseTwoSession.turn,
      phaseTwoSession.difficultyTier,
      {
        dominantStyle: engine.getTopAttachmentStyle(),
        seenScenarios: phaseTwoSession.seenScenarios
      }
    );
    phaseTwoSession.seenScenarios.push(turnScenario.scenarioId);
    phaseTwoSession.lastTurnSnapshot = {
      archetype: phaseTwoSession.character,
      scenarioId: turnScenario.scenarioId,
      turnNumber: phaseTwoSession.turn,
      difficultyTier: phaseTwoSession.difficultyTier
    };
  }

  phaseLabel.textContent = t(UI.phase2Sim);
  const chapter = getCurrentPhaseTwoChapter();
  sceneLabel.textContent = chapter
    ? `Chapter ${chapter.order}: ${chapter.title}`
    : t(UI.starterLoop);
  sceneTitle.textContent = formatUi(UI.dayLoopWith, {
    name: labelArchetype(phaseTwoSession.character)
  });
  const hiddenPart = chapter
    ? `${t(UI.hiddenQuestionPrefix)} ${chapter.hiddenQuestion}. `
    : "";
  sceneDescription.textContent =
    `${turnScenario.text} ${hiddenPart}${t(UI.howRespond)}`;

  resultText.textContent = formatUi(UI.baselineTurn, {
    style: labelStyle(engine.getTopAttachmentStyle()),
    pattern: labelPattern(engine.getDerivedPattern()),
    scores: getScoreSummary(state)
  });
  restartButton.hidden = true;

  choiceContainer.innerHTML = "";
  getPhaseTwoChoices().forEach((choice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-btn";
    button.textContent = t(choice.text);
    button.addEventListener("click", () => handlePhaseTwoChoice(choice));
    choiceContainer.appendChild(button);
  });

  renderStatus();
}

function startPhaseTwoDayWithPerk(perkId) {
  phaseTwoSession.activePerk = perkId;
  progression.activePerk = perkId;
  phaseTwoSession.character = null;
  phaseTwoSession.turn = 1;
  phaseTwoSession.secureProgress = progression.secureProgress;
  const dayStartBoost = getActivePerkEffects().dayStartBoost ?? 0;
  if (dayStartBoost > 0) {
    phaseTwoSession.secureProgress = clamp(
      phaseTwoSession.secureProgress + dayStartBoost,
      0,
      100
    );
    progression.secureProgress = phaseTwoSession.secureProgress;
  }
  phaseTwoSession.difficultyTier = progression.difficultyTier;
  phaseTwoSession.seenScenarios = [];
  phaseTwoSession.perkShopOffers = [];
  phaseTwoSession.rerollCount = 0;
  phaseTwoSession.lastTurnSnapshot = null;
  saveProgression();
  renderPhaseTwoTurn();
}

function renderPerkSelection() {
  const unlockedPerks = getUnlockedPerks();
  if (unlockedPerks.length === 0) {
    startPhaseTwoDayWithPerk(null);
    return;
  }

  viewMode = "phase2-perk-select";
  updateUiPreferenceButtonVisibility();
  hidePhaseTwoMeta();
  phaseTwoSession.perkShopOffers =
    phaseTwoSession.perkShopOffers.length > 0
      ? phaseTwoSession.perkShopOffers
      : getPerkShopOffers();
  phaseLabel.textContent = t(UI.phase2Strategic);
  sceneLabel.textContent = formatUi(UI.seasonDayPrep, {
    season: progression.season,
    day: phaseTwoSession.day
  });
  sceneTitle.textContent = t(UI.choosePerkTitle);
  sceneDescription.textContent = t(UI.choosePerkDesc);
  resultText.textContent = formatUi(UI.perkPoolLine, {
    names: getUnlockedPerkNames() || t(UI.noneYet),
    insight: progression.insightPoints
  });
  restartButton.hidden = true;

  choiceContainer.innerHTML = "";
  const detailToggle = document.createElement("button");
  detailToggle.type = "button";
  detailToggle.className = "secondary-btn detail-toggle-btn";
  detailToggle.textContent = phaseTwoSession.showPerkDetails
    ? t(UI.hideDetails)
    : t(UI.showDetails);
  detailToggle.addEventListener("click", () => {
    phaseTwoSession.showPerkDetails = !phaseTwoSession.showPerkDetails;
    progression.showPerkDetails = phaseTwoSession.showPerkDetails;
    saveProgression();
    renderPerkSelection();
  });
  choiceContainer.appendChild(detailToggle);

  choiceContainer.appendChild(buildTelemetryPanel(phaseTwoSession.perkShopOffers));
  phaseTwoSession.perkShopOffers.forEach((perk) => {
    const metric = getExpectedValueForPerk(
      perk,
      engine.getTopAttachmentStyle(),
      getAdaptiveDifficultyTier()
    );
    const dominantStyle = engine.getTopAttachmentStyle();
    const difficultyTier = getAdaptiveDifficultyTier();
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-btn";
    button.textContent =
      `[${labelRarity(perk.rarity)}] ${t(perk.name)} — ${t(perk.description)} ` +
      `(EV score: ${metric.strategicScore})`;
    button.addEventListener("click", () => startPhaseTwoDayWithPerk(perk.id));

    const tooltip = document.createElement("p");
    tooltip.className = "perk-tooltip";
    if (!phaseTwoSession.showPerkDetails) {
      tooltip.classList.add("is-collapsed");
    }
    tooltip.textContent = `${t(UI.whyScorePrefix)} ${getPerkScoreReasons(perk, dominantStyle, difficultyTier)}`;

    const card = document.createElement("div");
    card.className = "perk-card";
    card.appendChild(button);
    card.appendChild(tooltip);
    choiceContainer.appendChild(card);
  });

  const rerollCost = getRerollCost();
  const rerollButton = document.createElement("button");
  rerollButton.type = "button";
  rerollButton.className = "choice-btn";
  rerollButton.textContent = formatUi(UI.rerollPerks, { cost: rerollCost });
  rerollButton.disabled = progression.insightPoints < rerollCost;
  rerollButton.addEventListener("click", () => {
    if (progression.insightPoints < rerollCost) {
      return;
    }
    progression.insightPoints -= rerollCost;
    phaseTwoSession.rerollCount += 1;
    phaseTwoSession.perkShopOffers = getPerkShopOffers();
    saveProgression();
    renderPerkSelection();
  });
  choiceContainer.appendChild(rerollButton);
}

function handlePhaseTwoChoice(choice) {
  const chapter = getCurrentPhaseTwoChapter();
  const dimensionWeights = getDimensionWeightsForChapter(chapter);
  engine.applyChoice({
    ...choice,
    archetypeHint: phaseTwoSession.character
  }, { dimensionWeights });
  const adaptiveDelta = getAdaptiveDelta(choice.secureShiftScore);
  phaseTwoSession.secureProgress = clamp(phaseTwoSession.secureProgress + adaptiveDelta, 0, 100);
  grantInsightPoints(choice.secureShiftScore);
  progression.secureProgress = phaseTwoSession.secureProgress;
  progression.lastDominantStyle = engine.getTopAttachmentStyle();
  saveProgression();
  renderStatus();
  if (phaseTwoSession.turn < PHASE_2_TOTAL_TURNS) {
    renderPhaseTwoTurnFeedback(choice.secureShiftScore);
    return;
  }
  renderPhaseTwoDaySummary(choice.secureShiftScore);
}

function renderPhaseTwoTurnFeedback(secureShiftScore) {
  phaseTwoSession.feedbackSecureShiftScore = secureShiftScore;
  viewMode = "phase2-turn-feedback";
  updateUiPreferenceButtonVisibility();
  renderPhaseTwoMeta();
  const state = engine.getState();
  const feedback = getSecureShiftFeedback(secureShiftScore);

  choiceContainer.innerHTML = "";
  phaseLabel.textContent = t(UI.phase2TurnDone);
  sceneLabel.textContent = t(UI.secureShiftFeedback);
  sceneTitle.textContent = formatUi(UI.turnReflection, { n: phaseTwoSession.turn });
  sceneDescription.textContent = t(UI.useSignalNext);
  resultText.textContent = formatUi(UI.feedbackResultLine, {
    feedback,
    scores: getScoreSummary(state),
    insight: progression.insightPoints,
    perk: getPerkName(phaseTwoSession.activePerk),
    rarity: getPerkRarity(phaseTwoSession.activePerk)
  });

  restartButton.hidden = false;
  restartButton.textContent = t(UI.nextTurn);
}

function renderPhaseTwoDaySummary(lastTurnShiftScore) {
  const state = engine.getState();
  const dominantStyle = engine.getTopAttachmentStyle();
  const unlockedNow = unlockPerksByProgression();
  const chapter = getCurrentPhaseTwoChapter();
  const chapterPolicy = getNextChapterPolicy(phaseTwoSession.chapterIndex);
  const nextChapter = getChapterByOrder(chapterPolicy.nextChapterIndex);
  progression.day += 1;
  progression.secureProgress = phaseTwoSession.secureProgress;
  progression.difficultyTier = getAdaptiveDifficultyTier();
  if (chapter) {
    progression.chapterHistory.push({
      season: progression.season,
      day: phaseTwoSession.day,
      chapterOrder: chapter.order,
      chapterTitle: chapter.title,
      focusDimension: chapter.focusDimension,
      hiddenQuestion: chapter.hiddenQuestion,
      dimensions: {
        selfWorth: Math.round(state.dimensions.selfWorth * 10) / 10,
        motivation: Math.round(state.dimensions.motivation * 10) / 10,
        pattern: Math.round(state.dimensions.pattern * 10) / 10
      }
    });
  }
  progression.chapterIndex = chapterPolicy.nextChapterIndex;
  progression.isSeasonComplete = chapterPolicy.isSeasonComplete;
  progression.lastDominantStyle = dominantStyle;
  saveProgression();

  phaseTwoDaySummaryPaintPayload = {
    lastTurnShiftScore,
    chapter,
    chapterPolicy,
    nextChapter,
    unlockedPerkIds: unlockedNow
  };
  applyPhaseTwoDaySummaryPaint(phaseTwoDaySummaryPaintPayload);
}

function applyPhaseTwoDaySummaryPaint(payload) {
  const { lastTurnShiftScore, chapter, chapterPolicy, nextChapter, unlockedPerkIds } = payload;
  viewMode = "phase2-day-summary";
  updateUiPreferenceButtonVisibility();
  renderPhaseTwoMeta();
  const state = engine.getState();
  const dominantStyle = engine.getTopAttachmentStyle();
  const dominantPattern = engine.getDerivedPattern();
  const feedback = getSecureShiftFeedback(lastTurnShiftScore);

  choiceContainer.innerHTML = "";
  phaseLabel.textContent = t(UI.phase2DayDone);
  sceneLabel.textContent = formatUi(UI.daySummary, { day: phaseTwoSession.day });
  sceneTitle.textContent = formatUi(UI.loopResultWith, {
    name: labelArchetype(phaseTwoSession.character)
  });
  sceneDescription.textContent = chapterPolicy.isSeasonComplete
    ? t(UI.finalChapterLock)
    : t(UI.completedFiveTurns);

  if (chapter) {
    const recapCard = document.createElement("div");
    recapCard.className = "chapter-recap-card";
    recapCard.innerHTML =
      `<p class="chapter-recap-title">${t(UI.chapterRecapTitle)}</p>` +
      `<p class="chapter-recap-line">${formatUi(UI.seasonDayChapterLine, {
        season: progression.season,
        day: phaseTwoSession.day,
        order: chapter.order,
        title: chapter.title
      })}</p>` +
      `<p class="chapter-recap-line">${t(UI.patternLine)} ${chapter.pattern}</p>` +
      `<p class="chapter-recap-line">${t(UI.hiddenQuestionLine)} ${chapter.hiddenQuestion}</p>` +
      `<p class="chapter-recap-line">${t(UI.focusLine)} ${chapter.focusDimension}</p>`;
    choiceContainer.appendChild(recapCard);
  }

  const chapterFocus = chapter
    ? formatUi(UI.chapterFocusPrefix, { focus: chapter.focusDimension })
    : "";

  const newUnlocksText =
    unlockedPerkIds.length > 0
      ? formatUi(UI.newUnlocksPrefix, {
          list: unlockedPerkIds.map((id) => t(getPerkById(id).name)).join(", ")
        })
      : "";

  resultText.textContent = formatUi(UI.daySummaryBody, {
    chapterFocus,
    style: labelStyle(dominantStyle),
    pattern: labelPattern(dominantPattern),
    feedback,
    secure: phaseTwoSession.secureProgress,
    difficulty: progression.difficultyTier,
    scores: getScoreSummary(state),
    insight: progression.insightPoints,
    perk: getPerkName(phaseTwoSession.activePerk),
    rarity: getPerkRarity(phaseTwoSession.activePerk),
    unlocked: getUnlockedPerkNames() || t(UI.noneYet),
    newUnlocks: newUnlocksText
  });

  restartButton.hidden = false;
  restartButton.textContent = chapterPolicy.isSeasonComplete
    ? t(UI.viewSeasonRecap)
    : formatUi(UI.startNextDay, {
        day: progression.day,
        chapter: nextChapter
          ? formatUi(UI.chapterSuffix, { order: nextChapter.order })
          : ""
      });
}

function getSeasonHistory(season) {
  return progression.chapterHistory
    .filter((entry) => entry.season === season)
    .sort((a, b) => a.chapterOrder - b.chapterOrder);
}

function buildTrendLine(values, color, chart) {
  if (values.length === 0) {
    return "";
  }
  const { width, height, padding, minValue, range } = chart;
  const stepX = values.length > 1 ? (width - padding * 2) / (values.length - 1) : 0;

  const points = values.map((value, index) => {
    const x = padding + index * stepX;
    const normalized = (value - minValue) / range;
    const y = height - padding - normalized * (height - padding * 2);
    return `${x},${y}`;
  });

  const markers = values.map((value, index) => {
    const x = padding + index * stepX;
    const normalized = (value - minValue) / range;
    const y = height - padding - normalized * (height - padding * 2);
    return `<circle cx="${x}" cy="${y}" r="2.4" fill="${color}" />`;
  });

  return (
    `<polyline fill="none" stroke="${color}" stroke-width="2" points="${points.join(" ")}" />` +
    markers.join("")
  );
}

function getSeriesDelta(values) {
  if (values.length < 2) {
    return 0;
  }
  return Math.round((values[values.length - 1] - values[0]) * 10) / 10;
}

function renderTrendAxis(chapters, chart) {
  if (chapters.length === 0) {
    return "";
  }
  const { width, height, padding, minValue, range } = chart;
  const xStep = chapters.length > 1 ? (width - padding * 2) / (chapters.length - 1) : 0;
  const yTicks = [0, 0.25, 0.5, 0.75, 1];

  const yLines = yTicks.map((tick) => {
    const y = height - padding - tick * (height - padding * 2);
    const yLabelValue = Math.round((minValue + tick * range) * 10) / 10;
    return (
      `<line x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}" class="trend-grid-line" />` +
      `<text x="${padding - 6}" y="${y + 4}" text-anchor="end" class="trend-axis-label">${yLabelValue}</text>`
    );
  });

  const xTicks = chapters.map((chapterOrder, index) => {
    const x = padding + index * xStep;
    return (
      `<line x1="${x}" y1="${height - padding}" x2="${x}" y2="${height - padding + 4}" class="trend-axis-line" />` +
      `<text x="${x}" y="${height - 2}" text-anchor="middle" class="trend-axis-label">C${chapterOrder}</text>`
    );
  });

  return (
    `<line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" class="trend-axis-line" />` +
    `<line x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}" class="trend-axis-line" />` +
    yLines.join("") +
    xTicks.join("")
  );
}

function renderSeasonRecap() {
  viewMode = "phase2-season-recap";
  updateUiPreferenceButtonVisibility();
  hidePhaseTwoMeta();

  const season = progression.season;
  const seasonHistory = getSeasonHistory(season);
  const historyRangeText = seasonHistory.length > 0
    ? `${seasonHistory[0].chapterOrder}-${seasonHistory[seasonHistory.length - 1].chapterOrder}`
    : "4-10";

  phaseLabel.textContent = t(UI.phase2SeasonRecap);
  sceneLabel.textContent = formatUi(UI.seasonReview, { n: season });
  sceneTitle.textContent = t(UI.chapterIntegrated);
  sceneDescription.textContent = t(UI.recapSeasonIntro);

  const selfWorthSeries = seasonHistory.map((entry) => entry.dimensions?.selfWorth ?? 0);
  const motivationSeries = seasonHistory.map((entry) => entry.dimensions?.motivation ?? 0);
  const patternSeries = seasonHistory.map((entry) => entry.dimensions?.pattern ?? 0);
  const chapterOrders = seasonHistory.map((entry) => entry.chapterOrder);
  const allValues = [...selfWorthSeries, ...motivationSeries, ...patternSeries];
  const chart = {
    width: 320,
    height: 140,
    padding: 20,
    minValue: Math.min(...(allValues.length ? allValues : [0]), 0),
    maxValue: Math.max(...(allValues.length ? allValues : [1]), 1)
  };
  chart.range = chart.maxValue - chart.minValue || 1;

  const selfWorthDelta = getSeriesDelta(selfWorthSeries);
  const motivationDelta = getSeriesDelta(motivationSeries);
  const patternDelta = getSeriesDelta(patternSeries);

  const trendSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${chart.width} ${chart.height}" class="trend-svg" role="img" aria-label="${t(UI.trendSvgAria)}">
      ${renderTrendAxis(chapterOrders, chart)}
      ${buildTrendLine(selfWorthSeries, "#8b6d3a", chart)}
      ${buildTrendLine(motivationSeries, "#3d6f8b", chart)}
      ${buildTrendLine(patternSeries, "#7a4c8b", chart)}
    </svg>
  `;
  seasonRecapCache = {
    exportedAt: new Date().toISOString(),
    batchTimestamp: getBatchTimestamp(),
    season,
    chapterRange: historyRangeText,
    deltas: {
      selfWorth: selfWorthDelta,
      motivation: motivationDelta,
      pattern: patternDelta
    },
    history: seasonHistory,
    trendSvg: trendSvg.trim()
  };

  choiceContainer.innerHTML = "";
  const recapCard = document.createElement("div");
  recapCard.className = "season-recap-card";

  const listItems = seasonHistory
    .map((entry) =>
      `<li>${formatUi(UI.chapterListItem, {
        order: entry.chapterOrder,
        title: entry.chapterTitle,
        focus: entry.focusDimension
      })}</li>`
    )
    .join("");

  recapCard.innerHTML =
    `<p class="chapter-recap-title">${formatUi(UI.seasonChaptersTitle, { n: season, range: historyRangeText })}</p>` +
    `<ul class="season-recap-list">${listItems || `<li>${t(UI.noHistory)}</li>`}</ul>` +
    `<p class="chapter-recap-title">${t(UI.miniTrend)}</p>` +
    `<div class="trend-legend">` +
      `<span>${t(UI.trendLegendSelf)}</span><span>${t(UI.trendLegendMot)}</span><span>${t(UI.trendLegendPat)}</span>` +
    `</div>` +
    `<div class="trend-deltas">` +
      `<span>${formatUi(UI.trendDeltaLine, { label: t(UI.trendLegendSelf), signed: formatSigned(selfWorthDelta), range: historyRangeText })}</span>` +
      `<span>${formatUi(UI.trendDeltaLine, { label: t(UI.trendLegendMot), signed: formatSigned(motivationDelta), range: historyRangeText })}</span>` +
      `<span>${formatUi(UI.trendDeltaLine, { label: t(UI.trendLegendPat), signed: formatSigned(patternDelta), range: historyRangeText })}</span>` +
    `</div>` +
    trendSvg;

  choiceContainer.appendChild(recapCard);

  const exportRow = document.createElement("div");
  exportRow.className = "export-row";

  const exportAllButton = document.createElement("button");
  exportAllButton.type = "button";
  exportAllButton.className = "secondary-btn";
  exportAllButton.textContent = t(UI.exportAll);
  exportAllButton.addEventListener("click", () => exportSeasonRecapAll());

  const exportJsonButton = document.createElement("button");
  exportJsonButton.type = "button";
  exportJsonButton.className = "secondary-btn";
  exportJsonButton.textContent = t(UI.exportJson);
  exportJsonButton.addEventListener("click", () => exportSeasonRecapJson());

  const exportCsvButton = document.createElement("button");
  exportCsvButton.type = "button";
  exportCsvButton.className = "secondary-btn";
  exportCsvButton.textContent = t(UI.exportCsv);
  exportCsvButton.addEventListener("click", () => exportSeasonRecapCsv());

  const exportSvgButton = document.createElement("button");
  exportSvgButton.type = "button";
  exportSvgButton.className = "secondary-btn";
  exportSvgButton.textContent = t(UI.exportSvg);
  exportSvgButton.addEventListener("click", () => exportSeasonRecapSvg());

  exportRow.appendChild(exportAllButton);
  exportRow.appendChild(exportJsonButton);
  exportRow.appendChild(exportCsvButton);
  exportRow.appendChild(exportSvgButton);
  choiceContainer.appendChild(exportRow);

  resultText.textContent = formatUi(UI.seasonRecapFooter, { n: season });
  restartButton.hidden = false;
  restartButton.textContent = formatUi(UI.startSeason, { n: season + 1 });
}

function startNextPhaseTwoDay() {
  if (progression.isSeasonComplete) {
    progression.season += 1;
    progression.day = 1;
    progression.chapterIndex = PHASE_2_START_CHAPTER;
    progression.isSeasonComplete = false;
    saveProgression();
  }
  phaseTwoSession.day = progression.day;
  phaseTwoSession.chapterIndex = progression.chapterIndex ?? DEFAULT_PROGRESSION.chapterIndex;
  phaseTwoSession.showPerkDetails = progression.showPerkDetails;
  renderPerkSelection();
}

function resetEntireRun() {
  const preservedUiPreference = progression.showPerkDetails;
  engine.reset();
  currentSceneIndex = 0;
  currentSceneId = PHASE_1_SCENES[0]?.id ?? null;
  Object.assign(progression, structuredClone(DEFAULT_PROGRESSION));
  progression.showPerkDetails = preservedUiPreference;
  saveProgression();
  phaseTwoSession.day = progression.day;
  phaseTwoSession.chapterIndex = progression.chapterIndex;
  phaseTwoSession.character = null;
  phaseTwoSession.turn = 0;
  phaseTwoSession.secureProgress = progression.secureProgress;
  phaseTwoSession.difficultyTier = progression.difficultyTier;
  phaseTwoSession.seenScenarios = [];
  phaseTwoSession.activePerk = progression.activePerk;
  phaseTwoSession.perkShopOffers = [];
  phaseTwoSession.rerollCount = 0;
  phaseTwoSession.showPerkDetails = progression.showPerkDetails;
  phaseTwoSession.lastTurnSnapshot = null;
  phaseTwoSession.feedbackSecureShiftScore = null;
  phaseTwoDaySummaryPaintPayload = null;
  renderScene(getSceneById(currentSceneId) ?? PHASE_1_SCENES[0]);
}

function resetUiPreferences() {
  progression.showPerkDetails = DEFAULT_PROGRESSION.showPerkDetails;
  phaseTwoSession.showPerkDetails = DEFAULT_PROGRESSION.showPerkDetails;
  saveProgression();
  if (viewMode === "phase2-perk-select") {
    renderPerkSelection();
  }
}

restartButton.addEventListener("click", () => {
  if (viewMode === "summary") {
    resetEntireRun();
    return;
  }

  if (viewMode === "phase2-turn-feedback") {
    phaseTwoSession.turn += 1;
    renderPhaseTwoTurn();
    return;
  }

  if (viewMode === "phase2-day-summary") {
    if (progression.isSeasonComplete) {
      renderSeasonRecap();
      return;
    }
    startNextPhaseTwoDay();
    return;
  }

  if (viewMode === "phase2-season-recap") {
    startNextPhaseTwoDay();
    return;
  }

  if (currentSceneIndex < PHASE_1_SCENES.length - 1) {
    currentSceneIndex += 1;
    const fallbackScene = PHASE_1_SCENES[currentSceneIndex];
    currentSceneId = fallbackScene?.id ?? currentSceneId;
    renderScene(fallbackScene);
    return;
  }

  if (currentSceneIndex === PHASE_1_SCENES.length - 1) {
    renderPhaseOneSummary();
    return;
  }

  resetEntireRun();
});

resetUiPrefsButton.addEventListener("click", () => {
  resetUiPreferences();
});

async function bootstrap() {
  await loadContentModels();
  initAudio();
  initStarfield();
  if (langToggleBtn) {
    langToggleBtn.addEventListener("click", () => {
      toggleLang();
      refreshCurrentView();
    });
  }
  applyShellI18n();
  renderScene(getSceneById(currentSceneId) ?? PHASE_1_SCENES[0]);
}

bootstrap();
