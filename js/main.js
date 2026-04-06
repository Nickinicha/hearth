import { GameEngine } from "./gameEngine.js";
import {
  ATTACHMENT_STYLES,
  CHARACTER_ARCHETYPES,
  DIMENSION_KEYS
} from "./config.js";
import { PHASE_1_SCENES } from "./scenes.js";
import {
  getPhaseTwoChoices,
  getTurnScenario,
  PHASE_2_TOTAL_TURNS
} from "./phase2.js";

const engine = new GameEngine();
let currentSceneIndex = 0;
let viewMode = "scene";
const PROGRESSION_STORAGE_KEY = "hearth_phase2_progression_v1";
const PHASE_2_START_CHAPTER = 4;
const PHASE_2_FINAL_CHAPTER = 10;
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
    name: "Reflective Pause",
    rarity: "Common",
    threshold: 6,
    description: "Soften emotional spikes: insecure losses are reduced.",
    effects: { negativeReduction: 1 }
  },
  {
    id: "grounding-ritual",
    name: "Grounding Ritual",
    rarity: "Common",
    threshold: 12,
    description: "Start each day with a small stability boost.",
    effects: { dayStartBoost: 2 }
  },
  {
    id: "boundary-compass",
    name: "Boundary Compass",
    rarity: "Rare",
    threshold: 20,
    description: "Boundary clarity: secure decisions gain extra progress.",
    effects: { positiveBonus: 1 }
  },
  {
    id: "pattern-lens",
    name: "Pattern Lens",
    rarity: "Rare",
    threshold: 26,
    description: "Meta insight: gain extra Insight from secure turns.",
    effects: { insightBonusOnSecure: 1 }
  },
  {
    id: "repair-script",
    name: "Repair Script",
    rarity: "Epic",
    threshold: 36,
    description: "Repair momentum: larger day-start boost and stronger secure gain.",
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
  showPerkDetails: progression.showPerkDetails
};
let seasonRecapCache = null;

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

function toDisplayName(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
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
  return DIMENSION_KEYS.map((key) => `${key}: ${state.dimensions[key]}`).join(" | ");
}

function getSecureShiftFeedback(secureShiftScore) {
  if (secureShiftScore >= 2) {
    return "Strong secure shift: you balanced self-respect and connection.";
  }
  if (secureShiftScore >= 0) {
    return "Partial secure shift: a healthy impulse appeared, but consistency needs practice.";
  }
  return "Insecure pattern detected: fear management overrode grounded communication.";
}

function hasPerk(perkId) {
  return progression.unlockedPerks.includes(perkId);
}

function getUnlockedPerkNames() {
  return PERK_DEFINITIONS.filter((perk) => hasPerk(perk.id))
    .map((perk) => perk.name)
    .join(", ");
}

function getUnlockedPerks() {
  return PERK_DEFINITIONS.filter((perk) => hasPerk(perk.id));
}

function getPerkName(perkId) {
  const perk = PERK_DEFINITIONS.find((entry) => entry.id === perkId);
  return perk ? perk.name : "None";
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
  const unlockedNow = [];
  PERK_DEFINITIONS.forEach((perk) => {
    if (progression.insightPoints >= perk.threshold && !hasPerk(perk.id)) {
      progression.unlockedPerks.push(perk.id);
      unlockedNow.push(perk.name);
    }
  });
  return unlockedNow;
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
  const styleLabel = toDisplayName(dominantStyle);

  reasons.push(`Player style trend: ${styleLabel}, difficulty tier: ${difficultyTier}.`);

  if ((effects.positiveBonus ?? 0) > 0) {
    reasons.push(
      `Secure gains boosted by ${formatSigned(effects.positiveBonus)} positive scale.`
    );
  }
  if ((effects.negativeReduction ?? 0) > 0) {
    reasons.push(
      `Insecure penalties softened by ${formatSigned(-(effects.negativeReduction))} negative scale.`
    );
  }
  if ((effects.dayStartBoost ?? 0) > 0) {
    reasons.push(`Day starts with ${formatSigned(effects.dayStartBoost)} secure progress.`);
  }
  if ((effects.insightBonusOnSecure ?? 0) > 0) {
    reasons.push(
      `Secure choices grant ${formatSigned(effects.insightBonusOnSecure)} extra Insight.`
    );
  }
  if (reasons.length === 1) {
    reasons.push("Value mainly comes from baseline consistency under current difficulty.");
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
  title.textContent =
    `Telemetry: expected perk value for ${toDisplayName(dominantStyle)} style (difficulty ${difficultyTier})`;
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
    row.textContent =
      `#${index + 1} ${perk.name} (${perk.rarity}) — Score ${metric.strategicScore}, ` +
      `EV Secure ${metric.evSecureProgress}, EV Insight ${metric.evInsight}`;
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
  const seasonText = progression.season ? `Season ${progression.season} • ` : "";
  phase2TurnLabel.textContent =
    `${seasonText}Day ${phaseTwoSession.day} • Turn ${phaseTwoSession.turn} / ${PHASE_2_TOTAL_TURNS} • Difficulty ${phaseTwoSession.difficultyTier}`;
  phase2ProgressFill.style.width = `${phaseTwoSession.secureProgress}%`;
  phase2ProgressText.textContent =
    `Progress toward Secure: ${phaseTwoSession.secureProgress}% • Insight: ${progression.insightPoints} • Active Perk: ${getPerkName(phaseTwoSession.activePerk)} (${getPerkRarity(phaseTwoSession.activePerk)})`;
}

function renderStatus() {
  const state = engine.getState();
  attachmentStatus.innerHTML = "";

  ATTACHMENT_STYLES.forEach((style) => {
    const pill = document.createElement("div");
    pill.className = "status-pill";
    pill.textContent = `${toDisplayName(style)}: ${state.scores[style]}`;
    attachmentStatus.appendChild(pill);
  });
}

function finalizeScene() {
  const state = engine.getState();
  const dominantStyle = engine.getTopAttachmentStyle();
  const dominantArchetype = engine.getTopArchetype();
  const dominantPattern = engine.getDerivedPattern();

  resultText.textContent =
    `Current archetype signal: ${dominantArchetype}. ` +
    `Dominant attachment trend: ${toDisplayName(dominantStyle)}. ` +
    `Pattern baseline: ${toDisplayName(dominantPattern)}.`;

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
  const chapter = getPhaseOneChapterForScene(currentSceneIndex);
  const dimensionWeights = getDimensionWeightsForChapter(chapter);
  engine.applyChoice(choice, { dimensionWeights });
  renderStatus();
  finalizeScene();
}

function renderScene(scene) {
  viewMode = "scene";
  updateUiPreferenceButtonVisibility();
  hidePhaseTwoMeta();
  phaseLabel.textContent = scene.phaseLabel;
  sceneLabel.textContent = scene.sceneLabel;
  sceneTitle.textContent = scene.title;
  sceneDescription.textContent = scene.description;
  resultText.textContent = "";
  restartButton.hidden = true;

  choiceContainer.innerHTML = "";
  scene.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-btn";
    button.textContent = choice.text;
    button.addEventListener("click", () => handleChoice(choice));
    choiceContainer.appendChild(button);
  });

  renderStatus();
}

function renderPhaseOneSummary() {
  viewMode = "summary";
  updateUiPreferenceButtonVisibility();
  hidePhaseTwoMeta();
  const state = engine.getState();
  const dominantStyle = engine.getTopAttachmentStyle();
  const dominantArchetype = engine.getTopArchetype();
  const dominantPattern = engine.getDerivedPattern();
  const scoreSummary = getScoreSummary(state);

  phaseLabel.textContent = "Phase 1 Complete";
  sceneLabel.textContent = "Player Profile Summary";
  sceneTitle.textContent = "Your Emotional Blueprint";
  sceneDescription.textContent =
    "This summary is your baseline before entering Phase 2: The Sim.";
  choiceContainer.innerHTML = "";

  resultText.textContent =
    `Primary attachment trend: ${toDisplayName(dominantStyle)}. ` +
    `Current archetype signal: ${dominantArchetype}. ` +
    `Pattern orientation: ${toDisplayName(dominantPattern)}. ` +
    `Core scores -> ${scoreSummary}.`;

  restartButton.hidden = false;
  restartButton.textContent = "Start Phase 2 Starter Loop";
}

function renderPhaseTwoTurn() {
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
  const turnScenario = getTurnScenario(
    phaseTwoSession.character,
    phaseTwoSession.turn,
    phaseTwoSession.difficultyTier,
    {
      dominantStyle: engine.getTopAttachmentStyle(),
      seenScenarios: phaseTwoSession.seenScenarios
    }
  );
  phaseTwoSession.seenScenarios.push(turnScenario.text);

  phaseLabel.textContent = "Phase 2 - The Sim";
  const chapter = getCurrentPhaseTwoChapter();
  sceneLabel.textContent = chapter
    ? `Chapter ${chapter.order}: ${chapter.title}`
    : "Starter Loop";
  sceneTitle.textContent = `Day Loop with ${phaseTwoSession.character}`;
  sceneDescription.textContent =
    `${turnScenario.text} ` +
    `${chapter ? `Hidden question: ${chapter.hiddenQuestion}. ` : ""}` +
    "How do you respond?";

  resultText.textContent =
    `Baseline before this turn -> attachment: ${toDisplayName(engine.getTopAttachmentStyle())}, ` +
    `pattern: ${toDisplayName(engine.getDerivedPattern())}, ` +
    `${getScoreSummary(state)}.`;
  restartButton.hidden = true;

  choiceContainer.innerHTML = "";
  getPhaseTwoChoices().forEach((choice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-btn";
    button.textContent = choice.text;
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
  phaseLabel.textContent = "Phase 2 - Strategic Layer";
  sceneLabel.textContent = `Season ${progression.season} · Day ${phaseTwoSession.day} Preparation`;
  sceneTitle.textContent = "Choose 1 Active Perk";
  sceneDescription.textContent =
    "Select one perk for this day. Only the selected perk affects this day loop.";
  resultText.textContent =
    `Available perks unlocked: ${getUnlockedPerkNames()}. Current insight: ${progression.insightPoints}.`;
  restartButton.hidden = true;

  choiceContainer.innerHTML = "";
  const detailToggle = document.createElement("button");
  detailToggle.type = "button";
  detailToggle.className = "secondary-btn detail-toggle-btn";
  detailToggle.textContent = phaseTwoSession.showPerkDetails
    ? "Hide details"
    : "Show details";
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
      `[${perk.rarity}] ${perk.name} — ${perk.description} ` +
      `(EV score: ${metric.strategicScore})`;
    button.addEventListener("click", () => startPhaseTwoDayWithPerk(perk.id));

    const tooltip = document.createElement("p");
    tooltip.className = "perk-tooltip";
    if (!phaseTwoSession.showPerkDetails) {
      tooltip.classList.add("is-collapsed");
    }
    tooltip.textContent = `Why this score: ${getPerkScoreReasons(perk, dominantStyle, difficultyTier)}`;

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
  rerollButton.textContent = `Reroll Perk Choices (-${rerollCost} Insight)`;
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
  viewMode = "phase2-turn-feedback";
  updateUiPreferenceButtonVisibility();
  renderPhaseTwoMeta();
  const state = engine.getState();
  const feedback = getSecureShiftFeedback(secureShiftScore);

  choiceContainer.innerHTML = "";
  phaseLabel.textContent = "Phase 2 - Turn Complete";
  sceneLabel.textContent = "Secure Shift Feedback";
  sceneTitle.textContent = `Turn ${phaseTwoSession.turn} Reflection`;
  sceneDescription.textContent =
    "Use this signal to adjust your next decision.";
  resultText.textContent =
    `${feedback} Running scores -> ${getScoreSummary(state)}. ` +
    `Meta economy -> Insight points: ${progression.insightPoints}. Active perk: ${getPerkName(phaseTwoSession.activePerk)} (${getPerkRarity(phaseTwoSession.activePerk)}).`;

  restartButton.hidden = false;
  restartButton.textContent = "Next Turn";
}

function renderPhaseTwoDaySummary(lastTurnShiftScore) {
  viewMode = "phase2-day-summary";
  updateUiPreferenceButtonVisibility();
  renderPhaseTwoMeta();
  const state = engine.getState();
  const dominantStyle = engine.getTopAttachmentStyle();
  const dominantPattern = engine.getDerivedPattern();
  const feedback = getSecureShiftFeedback(lastTurnShiftScore);
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

  choiceContainer.innerHTML = "";
  phaseLabel.textContent = "Phase 2 - Day Complete";
  sceneLabel.textContent = `Day ${phaseTwoSession.day} Summary`;
  sceneTitle.textContent = `Loop Result with ${phaseTwoSession.character}`;
  sceneDescription.textContent =
    chapterPolicy.isSeasonComplete
      ? "You completed the final chapter. Season is now in reflection lock."
      : "You completed 5 interaction turns. This is your current secure-shift trajectory.";

  if (chapter) {
    const recapCard = document.createElement("div");
    recapCard.className = "chapter-recap-card";
    recapCard.innerHTML =
      `<p class="chapter-recap-title">Chapter Recap</p>` +
      `<p class="chapter-recap-line">Season ${progression.season} · Day ${phaseTwoSession.day} · Chapter ${chapter.order}: ${chapter.title}</p>` +
      `<p class="chapter-recap-line">Pattern: ${chapter.pattern}</p>` +
      `<p class="chapter-recap-line">Hidden question: ${chapter.hiddenQuestion}</p>` +
      `<p class="chapter-recap-line">Focus dimension: ${chapter.focusDimension}</p>`;
    choiceContainer.appendChild(recapCard);
  }
  resultText.textContent =
    `${chapter ? `Chapter focus: ${chapter.focusDimension}. ` : ""}` +
    `Dominant attachment: ${toDisplayName(dominantStyle)}. ` +
    `Pattern: ${toDisplayName(dominantPattern)}. ` +
    `${feedback} Final day progress toward Secure: ${phaseTwoSession.secureProgress}%. ` +
    `Next day difficulty preview: ${progression.difficultyTier}. ` +
    `Core scores -> ${getScoreSummary(state)}. ` +
    `Insight points: ${progression.insightPoints}. ` +
    `Active perk used: ${getPerkName(phaseTwoSession.activePerk)} (${getPerkRarity(phaseTwoSession.activePerk)}). ` +
    `Unlocked perks: ${getUnlockedPerkNames() || "None yet"}.` +
    (unlockedNow.length > 0 ? ` New unlocks today: ${unlockedNow.join(", ")}.` : "");

  restartButton.hidden = false;
  restartButton.textContent = chapterPolicy.isSeasonComplete
    ? "View Season Recap"
    : `Start Day ${progression.day}` + (nextChapter ? ` · Chapter ${nextChapter.order}` : "");
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

  phaseLabel.textContent = "Phase 2 - Season Recap";
  sceneLabel.textContent = `Season ${season} Review`;
  sceneTitle.textContent = "Chapter 4-10 Integrated Reflection";
  sceneDescription.textContent =
    "Review your full season journey before entering the next season.";

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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${chart.width} ${chart.height}" class="trend-svg" role="img" aria-label="Season trend lines">
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
      `<li>Chapter ${entry.chapterOrder} - ${entry.chapterTitle} (${entry.focusDimension})</li>`
    )
    .join("");

  recapCard.innerHTML =
    `<p class="chapter-recap-title">Season ${season} Chapters (${historyRangeText})</p>` +
    `<ul class="season-recap-list">${listItems || "<li>No chapter history found yet.</li>"}</ul>` +
    `<p class="chapter-recap-title">Mini Trend Line</p>` +
    `<div class="trend-legend">` +
      `<span>SelfWorth</span><span>Motivation</span><span>Pattern</span>` +
    `</div>` +
    `<div class="trend-deltas">` +
      `<span>SelfWorth ${formatSigned(selfWorthDelta)} (chapter ${historyRangeText})</span>` +
      `<span>Motivation ${formatSigned(motivationDelta)} (chapter ${historyRangeText})</span>` +
      `<span>Pattern ${formatSigned(patternDelta)} (chapter ${historyRangeText})</span>` +
    `</div>` +
    trendSvg;

  choiceContainer.appendChild(recapCard);

  const exportRow = document.createElement("div");
  exportRow.className = "export-row";

  const exportAllButton = document.createElement("button");
  exportAllButton.type = "button";
  exportAllButton.className = "secondary-btn";
  exportAllButton.textContent = "Export All";
  exportAllButton.addEventListener("click", () => exportSeasonRecapAll());

  const exportJsonButton = document.createElement("button");
  exportJsonButton.type = "button";
  exportJsonButton.className = "secondary-btn";
  exportJsonButton.textContent = "Export JSON";
  exportJsonButton.addEventListener("click", () => exportSeasonRecapJson());

  const exportCsvButton = document.createElement("button");
  exportCsvButton.type = "button";
  exportCsvButton.className = "secondary-btn";
  exportCsvButton.textContent = "Export CSV";
  exportCsvButton.addEventListener("click", () => exportSeasonRecapCsv());

  const exportSvgButton = document.createElement("button");
  exportSvgButton.type = "button";
  exportSvgButton.className = "secondary-btn";
  exportSvgButton.textContent = "Export SVG Snapshot";
  exportSvgButton.addEventListener("click", () => exportSeasonRecapSvg());

  exportRow.appendChild(exportAllButton);
  exportRow.appendChild(exportJsonButton);
  exportRow.appendChild(exportCsvButton);
  exportRow.appendChild(exportSvgButton);
  choiceContainer.appendChild(exportRow);

  resultText.textContent =
    `Season ${season} complete. Use this recap to choose your next strategy.`;
  restartButton.hidden = false;
  restartButton.textContent = `Start Season ${season + 1}`;
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
  renderScene(PHASE_1_SCENES[currentSceneIndex]);
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
    startNextPhaseTwoDay();
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
    renderScene(PHASE_1_SCENES[currentSceneIndex]);
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
  renderScene(PHASE_1_SCENES[currentSceneIndex]);
}

bootstrap();
