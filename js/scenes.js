export const PHASE_1_SCENES = [
  {
    id: "p1s1-intro",
    phaseLabel: {
      EN: "Phase 1 - Self Discovery",
      TH: "เฟส 1 – ค้นพบตัวเอง"
    },
    sceneLabel: {
      EN: "Scene 1 of 3",
      TH: "ฉากที่ 1 จาก 3"
    },
    title: {
      EN: "The Hearth",
      TH: "ข้างกองไฟ"
    },
    description: {
      EN:
        "The fire crackles softly as evening settles in. Warmth returns, but uncertainty still lingers in your chest. What do you do first?",
      TH:
        "เสียงฟืนแตกเบาๆ ยามเย็นค่อยๆ คลุมห้อง ความอบอุ่นกลับมา แต่ลึกๆ ยังมีความไม่แน่ใจค้างอยู่ในอก คุณจะเริ่มจากอะไร?"
    },
    choices: [
      {
        id: "double-text",
        text: {
          EN: "Send another message right away, so they do not forget me.",
          TH: "ส่งข้อความซ้ำทันที เผื่อเขา/เธอจะไม่ลืมเรา"
        },
        archetypeHint: "The Seeker",
        styleImpact: { anxious: 2, secure: 0, avoidant: 0, fearful: 1 },
        dimensions: { selfWorth: -1, motivation: -1, pattern: -2 }
      },
      {
        id: "balanced-checkin",
        text: {
          EN: "Take a breath, continue your evening, and send one clear check-in later.",
          TH: "หายใจลึกๆ แล้วกลับไปใช้เวลาของตัวเองก่อน ค่อยส่งข้อความสั้นๆ ที่ชัดเจนทีหลัง"
        },
        archetypeHint: "The Anchor",
        styleImpact: { anxious: 0, secure: 2, avoidant: 0, fearful: 0 },
        dimensions: { selfWorth: 2, motivation: 2, pattern: 2 }
      },
      {
        id: "pull-away",
        text: {
          EN: "Assume they are not serious, then pull back emotionally.",
          TH: "คิดไปก่อนว่าเขา/เธอไม่จริงจัง แล้วถอยความรู้สึกทันที"
        },
        archetypeHint: "The Builder",
        styleImpact: { anxious: 0, secure: 0, avoidant: 2, fearful: 1 },
        dimensions: { selfWorth: 0, motivation: -1, pattern: -1 }
      },
      {
        id: "mixed-signal",
        text: {
          EN: "Want closeness but feel unsafe, so you stay quiet and overthink.",
          TH: "ก็อยากใกล้ แต่ก็ไม่ค่อยปลอดภัยในใจ เลยเงียบและคิดวนอยู่คนเดียว"
        },
        archetypeHint: "The Nurturer",
        styleImpact: { anxious: 1, secure: 0, avoidant: 1, fearful: 2 },
        dimensions: { selfWorth: -1, motivation: -2, pattern: -2 }
      }
    ]
  },
  {
    id: "p1s2-emotional-mirror",
    phaseLabel: {
      EN: "Phase 1 - Self Discovery",
      TH: "เฟส 1 – ค้นพบตัวเอง"
    },
    sceneLabel: {
      EN: "Scene 2 of 3",
      TH: "ฉากที่ 2 จาก 3"
    },
    title: {
      EN: "The Emotional Mirror",
      TH: "กระจกสะท้อนอารมณ์"
    },
    description: {
      EN:
        "You have barely spoken since getting home. Your partner notices, not to pressure you, but because they are afraid of losing you to silence. How do you respond?",
      TH:
        "ตั้งแต่กลับบ้านมาคุณแทบไม่พูดอะไรเลย คนรักสังเกตเห็น และไม่อยากปล่อยผ่าน ไม่ใช่เพราะจะกดดันคุณ แต่เพราะกลัวว่าจะเข้าไม่ถึงคุณอีกต่อไป คุณจะตอบอย่างไร?"
    },
    choices: [
      {
        id: "mirror-open",
        text: {
          EN: "\"I just need a moment... but I'll tell you soon.\"",
          TH: "\"ขอเวลาแป๊บนึงนะ แต่เดี๋ยวจะเล่าให้ฟัง\""
        },
        archetypeHint: "The Anchor",
        styleImpact: { anxious: 0, secure: 2, avoidant: 0, fearful: 0 },
        dimensions: { selfWorth: 2, motivation: 2, pattern: 2 }
      },
      {
        id: "mirror-deflect",
        text: {
          EN: "\"It's nothing. Don't worry about it.\"",
          TH: "\"ไม่เป็นไรหรอก อย่าคิดมาก\""
        },
        archetypeHint: "The Builder",
        styleImpact: { anxious: 0, secure: 0, avoidant: 2, fearful: 1 },
        dimensions: { selfWorth: 0, motivation: -1, pattern: -1 }
      },
      {
        id: "mirror-honest-needs",
        text: {
          EN: "\"Honestly? Sit with me. No questions for now.\"",
          TH: "\"จริงๆ แค่อยากให้นั่งอยู่ข้างๆ ก่อน ยังไม่ต้องถามอะไร\""
        },
        archetypeHint: "The Anchor",
        styleImpact: { anxious: 0, secure: 2, avoidant: 0, fearful: 0 },
        dimensions: { selfWorth: 2, motivation: 2, pattern: 2 }
      },
      {
        id: "mirror-freeze",
        text: {
          EN: "You freeze, stay silent, and wait for them to lead everything.",
          TH: "ชะงัก เงียบ และปล่อยให้อีกฝ่ายนำทุกอย่างไปก่อน"
        },
        archetypeHint: "The Nurturer",
        styleImpact: { anxious: 1, secure: 0, avoidant: 1, fearful: 2 },
        dimensions: { selfWorth: -1, motivation: -2, pattern: -2 }
      }
    ]
  },
  {
    id: "p1s3-repair",
    phaseLabel: {
      EN: "Phase 1 - Self Discovery",
      TH: "เฟส 1 – ค้นพบตัวเอง"
    },
    sceneLabel: {
      EN: "Scene 3 of 3",
      TH: "ฉากที่ 3 จาก 3"
    },
    title: {
      EN: "After the Mirror",
      TH: "หลังมองเห็นกัน"
    },
    description: {
      EN:
        "The moment passes. You can either repair gently, withdraw again, or stay present in quiet connection. What is your next move?",
      TH:
        "ช่วงเวลานั้นผ่านไปแล้ว ตอนนี้คุณมีทางเลือก: ค่อยๆ ซ่อมความสัมพันธ์ ถอยกลับเข้าเปลือกเดิม หรืออยู่ตรงนี้ด้วยกันอย่างสงบ คุณจะเลือกแบบไหน?"
    },
    choices: [
      {
        id: "chase-reassurance",
        text: {
          EN: "Push for immediate reassurance because uncertainty still feels unbearable.",
          TH: "เร่งขอความมั่นใจทันที เพราะความไม่ชัดยังหนักเกินจะทน"
        },
        archetypeHint: "The Seeker",
        styleImpact: { anxious: 2, secure: 0, avoidant: 0, fearful: 1 },
        dimensions: { selfWorth: -1, motivation: -1, pattern: -2 }
      },
      {
        id: "repair-openly",
        text: {
          EN: "Speak softly and honestly: name your feelings, and invite a calm repair talk.",
          TH: "พูดด้วยน้ำเสียงเบาและจริงใจ บอกความรู้สึกตรงๆ แล้วชวนคุยซ่อมความสัมพันธ์อย่างสงบ"
        },
        archetypeHint: "The Anchor",
        styleImpact: { anxious: 0, secure: 2, avoidant: 0, fearful: 0 },
        dimensions: { selfWorth: 2, motivation: 2, pattern: 2 }
      },
      {
        id: "stonewall",
        text: {
          EN: "Withdraw again and protect yourself by shutting the door emotionally.",
          TH: "ถอยอีกครั้ง และปิดประตูทางอารมณ์เพื่อกันตัวเองไม่ให้เจ็บ"
        },
        archetypeHint: "The Builder",
        styleImpact: { anxious: 0, secure: 0, avoidant: 2, fearful: 1 },
        dimensions: { selfWorth: 0, motivation: -1, pattern: -1 }
      },
      {
        id: "freeze-cycle",
        text: {
          EN: "Want to reconnect, but fear takes over, so you wait in silence.",
          TH: "จริงๆ ก็อยากเชื่อมใหม่ แต่ความกลัวนำหน้า เลยเงียบและรอไปก่อน"
        },
        archetypeHint: "The Nurturer",
        styleImpact: { anxious: 1, secure: 0, avoidant: 1, fearful: 2 },
        dimensions: { selfWorth: -1, motivation: -2, pattern: -2 }
      }
    ]
  }
];
