export const ATTACHMENT_STYLES = ["anxious", "secure", "avoidant", "fearful"];

export const CHARACTER_ARCHETYPES = [
  "The Seeker",
  "The Anchor",
  "The Nurturer",
  "The Builder"
];

export const DIMENSION_KEYS = ["selfWorth", "motivation", "pattern"];

export const LANGUAGE_STORAGE_KEY = "hearth_lang";
export const DEFAULT_LANGUAGE = "EN";

export function getLang() {
  try {
    const raw = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return raw === "TH" ? "TH" : "EN";
  } catch {
    return DEFAULT_LANGUAGE;
  }
}

export function setLang(lang) {
  const next = lang === "TH" ? "TH" : "EN";
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
  } catch {
    /* ignore */
  }
}

export function toggleLang() {
  setLang(getLang() === "EN" ? "TH" : "EN");
}

export function t(textObj) {
  if (textObj == null) {
    return "";
  }
  if (typeof textObj === "string") {
    return textObj;
  }
  const lang = getLang();
  return textObj[lang] ?? textObj.EN ?? "";
}

export const ATTACHMENT_LABELS = {
  anxious: { EN: "Anxious", TH: "วิตกกังวล / ยึดติด" },
  secure: { EN: "Secure", TH: "มั่นคง" },
  avoidant: { EN: "Avoidant", TH: "หลบหลีก / ตั้งรับ" },
  fearful: { EN: "Fearful", TH: "กลัวการถูกทอดทิ้งแบบหลบหลีก" }
};

export const ARCHETYPE_LABELS = {
  "The Seeker": { EN: "The Seeker", TH: "ผู้แสวงหา" },
  "The Anchor": { EN: "The Anchor", TH: "สมดุล / หมุดยึด" },
  "The Nurturer": { EN: "The Nurturer", TH: "ผู้ดูแล / ให้มากเกินไป" },
  "The Builder": { EN: "The Builder", TH: "ผู้สร้างเขตแดน" }
};

export const PATTERN_LABELS = {
  love: { EN: "Love-oriented", TH: "เน้นความรักและความใกล้ชิด" },
  fear: { EN: "Fear-oriented", TH: "เน้นความกลัวและการป้องกันตัวเอง" }
};

export const DIMENSION_LABELS = {
  selfWorth: { EN: "Self-worth", TH: "คุณค่าในตนเอง" },
  motivation: { EN: "Motivation", TH: "แรงจูงใจ" },
  pattern: { EN: "Pattern", TH: "รูปแบบ" }
};

export const RARITY_LABELS = {
  Common: { EN: "Common", TH: "ธรรมดา" },
  Rare: { EN: "Rare", TH: "หายาก" },
  Epic: { EN: "Epic", TH: "ล้ำเลิศ" },
  None: { EN: "None", TH: "ไม่มี" }
};

export const UI = {
  docTitle: {
    EN: "HEARTH — The Relationship Sim",
    TH: "HEARTH — สจ๊วตความสัมพันธ์"
  },
  heroTitle: { EN: "The Relationship Sim", TH: "สจ๊วตความสัมพันธ์" },
  heroSubtitle: {
    EN: "Discover your patterns. Practice secure choices.",
    TH: "ค้นหารูปแบบของคุณ ฝึกเลือกแบบมั่นคงในความสัมพันธ์"
  },
  statusCardTitle: { EN: "Your current tendencies", TH: "แนวโน้มปัจจุบันของคุณ" },
  resetUiPrefs: { EN: "Reset UI Preferences", TH: "รีเซ็ตการตั้งค่าหน้าจอ" },
  progressSecureAria: {
    EN: "Progress toward Secure",
    TH: "ความคืบหน้าสู่ความมั่นคงในความสัมพันธ์"
  },
  phase1TransitionNext: {
    EN: "Answer saved. Loading Scene {n}...",
    TH: "บันทึกคำตอบแล้ว กำลังโหลดฉากที่ {n}..."
  },
  phase1TransitionSummary: {
    EN: "Answer saved. Preparing your Summary...",
    TH: "บันทึกคำตอบแล้ว กำลังเตรียมหน้าสรุป..."
  },
  phase1Complete: { EN: "Phase 1 Complete", TH: "จบเฟส 1" },
  playerProfileSummary: {
    EN: "Player Profile Summary",
    TH: "สรุปโปรไฟล์ผู้เล่น"
  },
  emotionalBlueprint: {
    EN: "Your Emotional Blueprint",
    TH: "แผนที่อารมณ์ของคุณ"
  },
  summaryIntro: {
    EN: "This summary is your baseline before entering Phase 2: The Sim.",
    TH: "สรุปนี้คือจุดเริ่มต้นก่อนเข้าเฟส 2: เดอะซิม"
  },
  summaryPrimaryLine: {
    EN:
      "Primary attachment style: {style}. Current archetype signal: {archetype}. Pattern: {pattern}. Core scores -> {scores}.",
    TH:
      "สไตล์การผูกพันหลักของคุณคือ {style} สัญญาณอาร์คไทป์ปัจจุบัน: {archetype} แนวรูปแบบ: {pattern} คะแนนหลัก -> {scores}"
  },
  startPhase2: {
    EN: "Start Phase 2 Starter Loop",
    TH: "เริ่มเฟส 2 (ลูปเริ่มต้น)"
  },
  seasonPrefix: { EN: "Season {season} • ", TH: "ซีซัน {season} • " },
  phase2TurnRest: {
    EN: "Day {day} • Turn {turn} / {total} • Difficulty {difficulty}",
    TH: "วัน {day} • เทิร์น {turn} / {total} • ระดับความยาก {difficulty}"
  },
  phase2ProgressLine: {
    EN:
      "Progress toward Secure: {pct}% • Insight: {insight} • Active Perk: {perk} ({rarity})",
    TH:
      "ความคืบหน้าสู่ความมั่นคง: {pct}% • อินซายต์: {insight} • เพิร์กที่ใช้: {perk} ({rarity})"
  },
  phase2Sim: { EN: "Phase 2 - The Sim", TH: "เฟส 2 – เดอะซิม" },
  starterLoop: { EN: "Starter Loop", TH: "ลูปเริ่มต้น" },
  dayLoopWith: { EN: "Day Loop with {name}", TH: "ลูปวันกับ {name}" },
  hiddenQuestionPrefix: { EN: "Hidden question:", TH: "คำถามที่ซ่อนอยู่:" },
  howRespond: { EN: "How do you respond?", TH: "คุณตอบสนองอย่างไร?" },
  baselineTurn: {
    EN:
      "Baseline before this turn -> attachment: {style}, pattern: {pattern}, {scores}.",
    TH:
      "จุดเริ่มก่อนเทิร์นนี้ -> การผูกพัน: {style}, แนวรูปแบบ: {pattern}, {scores}."
  },
  phase2Strategic: {
    EN: "Phase 2 - Strategic Layer",
    TH: "เฟส 2 – เลเยอร์เชิงกลยุทธ์"
  },
  seasonDayPrep: {
    EN: "Season {season} · Day {day} Preparation",
    TH: "ซีซัน {season} · วัน {day} เตรียมพร้อม"
  },
  choosePerkTitle: { EN: "Choose 1 Active Perk", TH: "เลือกเพิร์กที่ใช้แอคทีฟ 1 อัน" },
  choosePerkDesc: {
    EN: "Select one perk for this day. Only the selected perk affects this day loop.",
    TH: "เลือกเพียร์กหนึ่งอันสำหรับวันนี้ — มีผลเฉพาะลูปของวันนี้เท่านั้น"
  },
  perkPoolLine: {
    EN: "Available perks unlocked: {names}. Current insight: {insight}.",
    TH: "เพิร์กที่ปลดล็อกแล้ว: {names} ค่าอินซายต์ปัจจุบัน: {insight}"
  },
  showDetails: { EN: "Show details", TH: "แสดงรายละเอียด" },
  hideDetails: { EN: "Hide details", TH: "ซ่อนรายละเอียด" },
  rerollPerks: { EN: "Reroll Perk Choices (-{cost} Insight)", TH: "สุ่มตัวเลือกเพิร์กใหม่ (-{cost} อินซายต์)" },
  telemetryTitle: {
    EN: "Telemetry: expected perk value for {style} style (difficulty {tier})",
    TH: "ค่าคาดหมายของเพิร์ก ({style}, ระดับความยาก {tier})"
  },
  telemetryRow: {
    EN: "#{rank} {name} ({rarity}) — Score {score}, EV Secure {evS}, EV Insight {evI}",
    TH: "#{rank} {name} ({rarity}) — คะแนน {score}, EV Secure {evS}, EV Insight {evI}"
  },
  whyScorePrefix: { EN: "Why this score:", TH: "เหตุผลของคะแนนนี้:" },
  phase2TurnDone: { EN: "Phase 2 - Turn Complete", TH: "เฟส 2 – จบเทิร์น" },
  secureShiftFeedback: { EN: "Secure Shift Feedback", TH: "ข้อเสนอแนะการเปลี่ยนแปลงสู่ความมั่นคง" },
  turnReflection: { EN: "Turn {n} Reflection", TH: "ทบทวนเทิร์นที่ {n}" },
  useSignalNext: {
    EN: "Use this signal to adjust your next decision.",
    TH: "ใช้สัญญาณนี้ปรับการตัดสินใจเทิร์นถัดไป"
  },
  feedbackResultLine: {
    EN:
      "{feedback} Running scores -> {scores}. Meta economy -> Insight points: {insight}. Active perk: {perk} ({rarity}).",
    TH:
      "{feedback} คะแนนระหว่างเล่น -> {scores} เศรษฐกิจในเกม -> อินซายต์: {insight} เพิร์กที่ใช้: {perk} ({rarity})"
  },
  nextTurn: { EN: "Next Turn", TH: "เทิร์นถัดไป" },
  phase2DayDone: { EN: "Phase 2 - Day Complete", TH: "เฟส 2 – จบวัน" },
  daySummary: { EN: "Day {day} Summary", TH: "สรุปวันที่ {day}" },
  loopResultWith: { EN: "Loop Result with {name}", TH: "ผลลูปกับ {name}" },
  finalChapterLock: {
    EN: "You completed the final chapter. Season is now in reflection lock.",
    TH: "คุณผ่านบทสุดท้ายแล้ว ซีซันนี้อยู่ในโหมดทบทวน"
  },
  completedFiveTurns: {
    EN: "You completed 5 interaction turns. This is your current secure-shift trajectory.",
    TH: "คุณเล่นครบ 5 เทิร์นแล้ว นี่คือทิศทางการเปลี่ยนแปลงสู่ความมั่นคงในตอนนี้"
  },
  chapterRecapTitle: { EN: "Chapter Recap", TH: "ทบทวนบท" },
  seasonDayChapterLine: {
    EN: "Season {season} · Day {day} · Chapter {order}: {title}",
    TH: "ซีซัน {season} · วัน {day} · บทที่ {order}: {title}"
  },
  patternLine: { EN: "Pattern:", TH: "รูปแบบ:" },
  hiddenQuestionLine: { EN: "Hidden question:", TH: "คำถามที่ซ่อน:" },
  focusLine: { EN: "Focus dimension:", TH: "มิติโฟกัส:" },
  chapterFocusPrefix: { EN: "Chapter focus: {focus}. ", TH: "โฟกัสบท: {focus}. " },
  daySummaryBody: {
    EN:
      "{chapterFocus}Dominant attachment: {style}. Pattern: {pattern}. {feedback} Final day progress toward Secure: {secure}%. Next day difficulty preview: {difficulty}. Core scores -> {scores}. Insight points: {insight}. Active perk used: {perk} ({rarity}). Unlocked perks: {unlocked}.{newUnlocks}",
    TH:
      "{chapterFocus}การผูกพันที่เด่น: {style} แนวรูปแบบ: {pattern} {feedback} ความคืบหน้าสู่ความมั่นคงสิ้นวัน: {secure}% ความยากวันถัดไป (พรีวิว): {difficulty} คะแนนหลัก -> {scores} อินซายต์: {insight} เพิร์กที่ใช้: {perk} ({rarity}) เพิร์กที่ปลดแล้ว: {unlocked}.{newUnlocks}"
  },
  newUnlocksPrefix: {
    EN: " New unlocks today: {list}.",
    TH: " ปลดล็อกใหม่วันนี้: {list}"
  },
  noneYet: { EN: "None yet", TH: "ยังไม่มี" },
  viewSeasonRecap: { EN: "View Season Recap", TH: "ดูสรุปซีซัน" },
  startNextDay: {
    EN: "Start Day {day}{chapter}",
    TH: "เริ่มวัน {day}{chapter}"
  },
  chapterSuffix: { EN: " · Chapter {order}", TH: " · บทที่ {order}" },
  phase2SeasonRecap: { EN: "Phase 2 - Season Recap", TH: "เฟส 2 – สรุปซีซัน" },
  seasonReview: { EN: "Season {n} Review", TH: "ทบทวนซีซัน {n}" },
  chapterIntegrated: {
    EN: "Chapter 4-10 Integrated Reflection",
    TH: "ทบทวนบท 4–10 แบบบูรณาการ"
  },
  recapSeasonIntro: {
    EN: "Review your full season journey before entering the next season.",
    TH: "ทบทวนการเดินทางทั้งซีซันก่อนเข้าซีซันถัดไป"
  },
  seasonChaptersTitle: {
    EN: "Season {n} Chapters ({range})",
    TH: "ซีซัน {n} บท ({range})"
  },
  noHistory: {
    EN: "No chapter history found yet.",
    TH: "ยังไม่มีประวัติบท"
  },
  miniTrend: { EN: "Mini Trend Line", TH: "เส้นแนวโน้มย่อย" },
  exportAll: { EN: "Export All", TH: "ส่งออกทั้งหมด" },
  exportJson: { EN: "Export JSON", TH: "ส่งออก JSON" },
  exportCsv: { EN: "Export CSV", TH: "ส่งออก CSV" },
  exportSvg: { EN: "Export SVG Snapshot", TH: "ส่งออกภาพ SVG" },
  seasonRecapFooter: {
    EN: "Season {n} complete. Use this recap to choose your next strategy.",
    TH: "จบซีซัน {n} ใช้สรุปนี้วางกลยุทธ์รอบถัดไป"
  },
  startSeason: { EN: "Start Season {n}", TH: "เริ่มซีซัน {n}" },
  chapterListItem: {
    EN: "Chapter {order} - {title} ({focus})",
    TH: "บทที่ {order} - {title} ({focus})"
  },
  trendLegendSelf: { EN: "SelfWorth", TH: "คุณค่าในตนเอง" },
  trendLegendMot: { EN: "Motivation", TH: "แรงจูงใจ" },
  trendLegendPat: { EN: "Pattern", TH: "รูปแบบ" },
  trendDeltaLine: {
    EN: "{label} {signed} (chapter {range})",
    TH: "{label} {signed} (บท {range})"
  },
  trendSvgAria: {
    EN: "Season trend lines",
    TH: "กราฟแนวโน้มของซีซัน"
  },
  secureShiftStrong: {
    EN: "Strong secure shift: you balanced self-respect and connection.",
    TH: "การเคลื่อนไหวสู่ความมั่นคงชัดเจน: คุณรักษาทั้งศักดิ์ศรีและความเชื่อมโยงได้ดี"
  },
  secureShiftPartial: {
    EN:
      "Partial secure shift: a healthy impulse appeared, but consistency needs practice.",
    TH: "เริ่มเคลื่อนไหวสู่ความมั่นคง: มีแรงดีขึ้น แต่ยังต้องฝึกความสม่ำเสมอ"
  },
  secureShiftInsecure: {
    EN: "Insecure pattern detected: fear management overrode grounded communication.",
    TH: "ตรวจพบรูปแบบไม่มั่นคง: ความกลัวบังคับการสื่อสารมากกว่าการยืนหยัดอย่างรากลึก"
  },
  perkReasonIntro: {
    EN: "Player style trend: {style}, difficulty tier: {tier}.",
    TH: "แนวสไตล์ผู้เล่น: {style} ระดับความยาก: {tier}"
  },
  perkReasonPositive: {
    EN: "Secure gains boosted by {n} positive scale.",
    TH: "โบนัสการได้คะแนนมั่นคง +{n} สเกลเชิงบวก"
  },
  perkReasonNegative: {
    EN: "Insecure penalties softened by {n} negative scale.",
    TH: "ลดโทษเชิงลบลง {n} หน่วย"
  },
  perkReasonDay: {
    EN: "Day starts with {n} secure progress.",
    TH: "เริ่มวันด้วยความคืบหน้าความมั่นคง +{n}"
  },
  perkReasonInsight: {
    EN: "Secure choices grant {n} extra Insight.",
    TH: "ตัวเลือกแบบมั่นคงให้ค่าอินซายต์พิเศษ +{n}"
  },
  perkReasonBaseline: {
    EN: "Value mainly comes from baseline consistency under current difficulty.",
    TH: "คุณค่าหลักมาจากความสม่ำเสมอภายใต้ความยากปัจจุบัน"
  }
};

export function formatUi(template, vars) {
  let out = t(template);
  if (!vars) {
    return out;
  }
  Object.keys(vars).forEach((key) => {
    out = out.split(`{${key}}`).join(String(vars[key]));
  });
  return out;
}
