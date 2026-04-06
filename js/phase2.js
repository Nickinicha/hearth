import { t } from "./config.js";

const ARCHETYPE_SCENARIOS = {
  "The Seeker": [
    {
      scenarioId: "sk-1",
      text: {
        EN: "They ask why you were quiet this afternoon and want reassurance right now.",
        TH: "เขาถามว่าทำไมคุณเงียบช่วงบ่าย และอยากได้ความมั่นใจเดี๋ยวนี้"
      },
      tags: ["anxious", "fearful"]
    },
    {
      scenarioId: "sk-2",
      text: {
        EN: "They send three emotional messages quickly and ask if your feelings changed.",
        TH: "เขาส่งข้อความเชิงอารมณ์มาสามข้อรวดและถามว่าความรู้สึกคุณเปลี่ยนไหม"
      },
      tags: ["anxious"]
    },
    {
      scenarioId: "sk-3",
      text: {
        EN: "They want to define the relationship immediately after an intense date.",
        TH: "หลังเดทที่เข้มข้น เขาอยากนิยามความสัมพันธ์ทันที"
      },
      tags: ["anxious", "secure"]
    },
    {
      scenarioId: "sk-4",
      text: {
        EN: "They feel distant and ask you to prove you still care tonight.",
        TH: "เขารู้สึกห่างและขอให้คุณพิสูจน์ว่าคุณยังแคร์คืนนี้"
      },
      tags: ["fearful", "anxious"]
    },
    {
      scenarioId: "sk-5",
      text: {
        EN: "They fear disconnection and ask for constant updates during your workday.",
        TH: "เขากลัวขาดการเชื่อมโยงและขอให้คุณอัปเดตตลอดช่วงที่ทำงาน"
      },
      tags: ["anxious", "avoidant"]
    }
  ],
  "The Anchor": [
    {
      scenarioId: "an-1",
      text: {
        EN: "They suggest a weekly check-in ritual and ask what support helps you most.",
        TH: "เขาเสนอเช็กอินประจำสัปดาห์และถามว่าการสนับสนุนแบบไหนช่วยคุณได้มากสุด"
      },
      tags: ["secure"]
    },
    {
      scenarioId: "an-2",
      text: {
        EN: "They notice tension and invite a calm conversation with clear boundaries.",
        TH: "เขาเห็นความตึงและชวนคุยอย่างสงบพร้อมขอบเขตที่ชัด"
      },
      tags: ["secure", "fearful"]
    },
    {
      scenarioId: "an-3",
      text: {
        EN: "They ask for honesty about pacing so both of you feel respected.",
        TH: "เขาขอความจริงใจเรื่องจังหวะเพื่อให้ทั้งคู่รู้สึกถูกให้เกียรติ"
      },
      tags: ["secure", "avoidant"]
    },
    {
      scenarioId: "an-4",
      text: {
        EN: "They propose a repair talk after a misunderstanding and ask for your needs.",
        TH: "หลังเข้าใจผิด เขาเสนอคุยซ่อมความสัมพันธ์และถามว่าคุณต้องการอะไร"
      },
      tags: ["secure", "anxious"]
    },
    {
      scenarioId: "an-5",
      text: {
        EN: "They ask how to balance closeness and personal space in a healthy way.",
        TH: "เขาถามวิธีสมดุลระหว่างความใกล้ชิดและพื้นที่ส่วนตัวอย่างสุขภาพดี"
      },
      tags: ["secure", "avoidant"]
    }
  ],
  "The Nurturer": [
    {
      scenarioId: "nu-1",
      text: {
        EN: "They prioritize your feelings first and hide their own needs in the moment.",
        TH: "เขาให้ความรู้สึกคุณมาก่อนและเก็บความต้องการของตัวเองไว้ตอนนั้น"
      },
      tags: ["fearful", "anxious"]
    },
    {
      scenarioId: "nu-2",
      text: {
        EN: "They offer help immediately, then quietly feel unseen later.",
        TH: "เขาช่วยทันที แต่ภายหลังเงียบๆ รู้สึกว่าไม่ถูกมองเห็น"
      },
      tags: ["fearful"]
    },
    {
      scenarioId: "nu-3",
      text: {
        EN: "They over-give emotional labor and ask for very little in return.",
        TH: "เขาให้แรงงานอารมณ์มากเกินไปและขอสิ่งตอบแทนน้อยมาก"
      },
      tags: ["anxious", "fearful"]
    },
    {
      scenarioId: "nu-4",
      text: {
        EN: "They avoid asking directly for support, hoping you will notice.",
        TH: "เขาไม่ขอการสนับสนุนตรงๆ แต่หวังว่าคุณจะสังเกตเอง"
      },
      tags: ["fearful", "avoidant"]
    },
    {
      scenarioId: "nu-5",
      text: {
        EN: "They hold space for you but struggle to set limits when overwhelmed.",
        TH: "เขาโอบรับคุณแต่ตั้งขีดจำกัดไม่ค่อยได้เมื่อล้น"
      },
      tags: ["fearful", "secure"]
    }
  ],
  "The Builder": [
    {
      scenarioId: "bu-1",
      text: {
        EN: "They focus on practical plans and skip emotional context in the conversation.",
        TH: "เขาโฟกัสแผนเชิงปฏิบัติและข้ามบริบทอารมณ์ในบทสนทนา"
      },
      tags: ["avoidant"]
    },
    {
      scenarioId: "bu-2",
      text: {
        EN: "They ask for efficient communication and minimal emotional ambiguity.",
        TH: "เขาขอสื่อสารตรงและไม่อยากให้ความรู้สึกคลุมเครือ"
      },
      tags: ["avoidant", "secure"]
    },
    {
      scenarioId: "bu-3",
      text: {
        EN: "They pull back during conflict and prefer to solve things later alone.",
        TH: "เวลามีความขัดแย้งเขาถอยและอยากคิดเงียบๆ คนเดียวก่อน"
      },
      tags: ["avoidant", "fearful"]
    },
    {
      scenarioId: "bu-4",
      text: {
        EN: "They care deeply but express it through consistency more than words.",
        TH: "เขาใส่ใจลึกแต่แสดงผ่านความสม่ำเสมอมากกว่าคำพูด"
      },
      tags: ["secure", "avoidant"]
    },
    {
      scenarioId: "bu-5",
      text: {
        EN: "They want clarity and structure before becoming emotionally vulnerable.",
        TH: "เขาต้องการความชัดและโครงก่อนจะเปิดเผยด้านอ่อนไหว"
      },
      tags: ["avoidant", "fearful"]
    }
  ]
};

const TURN_CHOICES = [
  {
    id: "p2-regulate-and-clarify",
    text: {
      EN: "Name my feeling clearly, ask what they need, and co-create a pace.",
      TH: "พูดความรู้สึกชัดๆ ถามว่าเขาต้องการอะไร และสร้างจังหวะร่วมกัน"
    },
    styleImpact: { anxious: 0, secure: 2, avoidant: 0, fearful: 0 },
    dimensions: { selfWorth: 2, motivation: 2, pattern: 2 },
    secureShiftScore: 2
  },
  {
    id: "p2-people-please",
    text: {
      EN: "Say yes to avoid tension, even if it crosses my limits.",
      TH: "พูดตกลงเพื่อเลี่ยงความตึง แม้จะเกินขีดจำกัดของตัวเอง"
    },
    styleImpact: { anxious: 2, secure: 0, avoidant: 0, fearful: 1 },
    dimensions: { selfWorth: -2, motivation: -1, pattern: -2 },
    secureShiftScore: -2
  },
  {
    id: "p2-withdraw",
    text: {
      EN: "Keep it vague and disengage to protect myself from discomfort.",
      TH: "พูดกว้างๆ แล้วถอยเพื่อกันตัวเองจากความอึดอัด"
    },
    styleImpact: { anxious: 0, secure: 0, avoidant: 2, fearful: 1 },
    dimensions: { selfWorth: 0, motivation: -1, pattern: -1 },
    secureShiftScore: -1
  },
  {
    id: "p2-mixed",
    text: {
      EN: "Want closeness but freeze; delay response and overanalyze intentions.",
      TH: "อยากใกล้แต่ชะงัก ตอบช้าและวิเคราะห์เจตนาเกินไป"
    },
    styleImpact: { anxious: 1, secure: 0, avoidant: 1, fearful: 2 },
    dimensions: { selfWorth: -1, motivation: -2, pattern: -2 },
    secureShiftScore: -2
  }
];

export const PHASE_2_TOTAL_TURNS = 5;

const DIFFICULTY_INTENSITY = {
  1: {
    EN: "The emotional pressure is low and the pacing feels manageable.",
    TH: "แรงกดดันทางอารมณ์ต่ำ จังหวะยังพอจัดการได้"
  },
  2: {
    EN: "There is moderate emotional pressure and mixed signals appear.",
    TH: "มีแรงกดดันปานกลางและเริ่มมีสัญญาณปนกัน"
  },
  3: {
    EN: "The pressure is high; timing and clarity are harder to sustain.",
    TH: "ความกดดันสูง การรักษาจังหวะและความชัดทำได้ยากขึ้น"
  },
  4: {
    EN: "The pressure is intense; insecurity triggers are highly active.",
    TH: "กดดันหนัก ทริกเกอร์ความไม่มั่นคงถูกกระตุ้นแรง"
  }
};

function pickWeightedScenario(scenarios, context) {
  const { dominantStyle = "secure", difficultyTier = 1, seen = [] } = context;
  const available = scenarios.filter((item) => !seen.includes(item.scenarioId));
  const pool = available.length > 0 ? available : scenarios;

  const weighted = pool.map((item) => {
    let weight = 1;
    if (item.tags.includes(dominantStyle)) {
      weight += 2.5;
    }
    if (difficultyTier >= 3 && item.tags.includes("fearful")) {
      weight += 1;
    }
    if (difficultyTier >= 2 && item.tags.includes("avoidant")) {
      weight += 0.5;
    }
    return { item, weight };
  });

  const totalWeight = weighted.reduce((sum, item) => sum + item.weight, 0);
  let threshold = Math.random() * totalWeight;

  for (const candidate of weighted) {
    threshold -= candidate.weight;
    if (threshold <= 0) {
      return candidate.item;
    }
  }

  return weighted[weighted.length - 1].item;
}

function composeTurnScenarioText(selectedScenario, difficultyTier) {
  const intensity = DIFFICULTY_INTENSITY[difficultyTier] ?? DIFFICULTY_INTENSITY[1];
  return `${t(selectedScenario.text)} ${t(intensity)}`;
}

export function buildTurnScenarioFromSnapshot(snapshot) {
  const { archetype, scenarioId, turnNumber, difficultyTier } = snapshot;
  const scenarios = ARCHETYPE_SCENARIOS[archetype] ?? ARCHETYPE_SCENARIOS["The Anchor"];
  const selected =
    scenarios.find((item) => item.scenarioId === scenarioId) ?? scenarios[0];
  return {
    text: composeTurnScenarioText(selected, difficultyTier),
    scenarioId: selected.scenarioId,
    tags: selected.tags,
    key: `${archetype}-${turnNumber}-${selected.scenarioId}`
  };
}

export function getTurnScenario(archetype, turnNumber, difficultyTier = 1, context = {}) {
  const scenarios = ARCHETYPE_SCENARIOS[archetype] ?? ARCHETYPE_SCENARIOS["The Anchor"];
  const selectedScenario = pickWeightedScenario(scenarios, {
    dominantStyle: context.dominantStyle,
    difficultyTier,
    seen: context.seenScenarios ?? []
  });
  return {
    text: composeTurnScenarioText(selectedScenario, difficultyTier),
    scenarioId: selectedScenario.scenarioId,
    tags: selectedScenario.tags,
    key: `${archetype}-${turnNumber}-${selectedScenario.scenarioId}`
  };
}

export function getPhaseTwoChoices() {
  return TURN_CHOICES;
}
