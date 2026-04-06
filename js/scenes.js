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
    mood: "neutral",
    backgroundTint: null,
    tintOpacity: 0,
    speaker: {
      EN: null,
      TH: null
    },
    choicePrompt: {
      EN: "What's sitting in your chest right now?",
      TH: "ตอนนี้ในอกคุณมีอะไรอยู่?"
    },
    description: {
      EN:
        "It's 9:47 PM. You're lying on your side, phone screen glowing in the dark. You've opened and closed the same chat three times without typing anything. Somewhere in the next room, you can hear them moving around.",
      TH:
        "สี่ทุ่มสี่สิบเจ็ดนาที คุณนอนตะแคงอยู่ หน้าจอโทรศัพท์เรืองแสงในห้องมืด เปิดแล้วปิดหน้าแชทเดิมซ้ำแล้วซ้ำเล่า โดยที่ยังไม่ได้พิมพ์อะไรเลย ได้ยินเสียงเขา/เธอขยับตัวอยู่ในห้องถัดไป"
    },
    choices: [
      {
        id: "mirror-open",
        text: {
          EN: "Tired. Just... tired.",
          TH: "เหนื่อย แค่นั้นเลย"
        },
        internalNote: {
          EN: "Not angry. Not sad. Just worn out in a way that's hard to explain.",
          TH: "ไม่ใช่โกรธ ไม่ใช่เศร้า แค่หมดแรงในแบบที่อธิบายยาก"
        },
        tint: "#1a1a2e",
        tintOpacity: 0.45,
        mood: "heavy",
        archetypeHint: "The Nurturer",
        styleImpact: { anxious: 1, secure: 0, avoidant: 1, fearful: 2 },
        dimensions: { selfWorth: -1, motivation: -2, pattern: -2 }
      },
      {
        id: "mirror-deflect",
        text: {
          EN: "Like no one really sees me today.",
          TH: "รู้สึกเหมือนวันนี้ไม่มีใครมองเห็นเราจริงๆ"
        },
        internalNote: {
          EN: "You were there all day. People looked through you, not at you.",
          TH: "คุณอยู่ตรงนั้นทั้งวัน แต่คนมองผ่าน ไม่ได้มองที่คุณ"
        },
        tint: "#2d1b4e",
        tintOpacity: 0.5,
        mood: "lonely",
        archetypeHint: "The Builder",
        styleImpact: { anxious: 0, secure: 0, avoidant: 2, fearful: 1 },
        dimensions: { selfWorth: 0, motivation: -1, pattern: -1 }
      },
      {
        id: "mirror-honest-needs",
        text: {
          EN: "Nothing. I can't feel anything right now.",
          TH: "ไม่มีอะไร รู้สึกชาอยู่"
        },
        internalNote: {
          EN: "Sometimes the hardest thing to sit with is the absence of feeling.",
          TH: "บางทีสิ่งที่อยู่ด้วยยากที่สุด คือความว่างเปล่าที่ไม่รู้สึกอะไรเลย"
        },
        tint: "#1c2b1c",
        tintOpacity: 0.4,
        mood: "numb",
        archetypeHint: "The Seeker",
        styleImpact: { anxious: 2, secure: 0, avoidant: 0, fearful: 1 },
        dimensions: { selfWorth: -2, motivation: -1, pattern: -2 }
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
