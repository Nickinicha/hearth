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
      EN: "The First Message",
      TH: "ข้อความแรก"
    },
    description: {
      EN:
        "A match you genuinely like has not replied for 6 hours. What do you do next?",
      TH:
        "คนที่คุณไม่ได้แค่เล่นๆ ยังไม่ตอบข้อความมา 6 ชั่วโมงแล้ว คุณจะทำอย่างไรต่อ?"
    },
    choices: [
      {
        id: "double-text",
        text: {
          EN: "Send another message to make sure they do not forget me.",
          TH: "ส่งข้อความอีกครั้งเพื่อไม่ให้เขาลืมฉัน"
        },
        archetypeHint: "The Seeker",
        styleImpact: { anxious: 2, secure: 0, avoidant: 0, fearful: 1 },
        dimensions: { selfWorth: -1, motivation: -1, pattern: -2 }
      },
      {
        id: "balanced-checkin",
        text: {
          EN: "Take a breath, continue my day, and send one clear check-in later.",
          TH: "หายใจลึกๆ ใช้ชีวิตตามปกติ แล้วค่อยส่งข้อความเช็กอินที่ชัดเจนทีหลัง"
        },
        archetypeHint: "The Anchor",
        styleImpact: { anxious: 0, secure: 2, avoidant: 0, fearful: 0 },
        dimensions: { selfWorth: 2, motivation: 2, pattern: 2 }
      },
      {
        id: "pull-away",
        text: {
          EN: "Assume they are not serious and emotionally pull away immediately.",
          TH: "สรุปว่าเขาไม่จริงจัง แล้วถอยความรู้สึกทันที"
        },
        archetypeHint: "The Builder",
        styleImpact: { anxious: 0, secure: 0, avoidant: 2, fearful: 1 },
        dimensions: { selfWorth: 0, motivation: -1, pattern: -1 }
      },
      {
        id: "mixed-signal",
        text: {
          EN: "Want closeness but feel unsafe, so I stay silent and overthink.",
          TH: "อยากใกล้แต่รู้สึกไม่ปลอดภัย เลยเงียบและคิดวนไปเอง"
        },
        archetypeHint: "The Nurturer",
        styleImpact: { anxious: 1, secure: 0, avoidant: 1, fearful: 2 },
        dimensions: { selfWorth: -1, motivation: -2, pattern: -2 }
      }
    ]
  },
  {
    id: "p1s2-boundary",
    phaseLabel: {
      EN: "Phase 1 - Self Discovery",
      TH: "เฟส 1 – ค้นพบตัวเอง"
    },
    sceneLabel: {
      EN: "Scene 2 of 3",
      TH: "ฉากที่ 2 จาก 3"
    },
    title: {
      EN: "The Boundary Moment",
      TH: "จุดที่ต้องตั้งขอบเขต"
    },
    description: {
      EN:
        "Someone you like asks for more access to your time than you can give this week. How do you respond?",
      TH:
        "คนที่คุณชอบขอเวลาคุณมากกว่าที่คุณมีในสัปดาห์นี้ คุณจะตอบรับอย่างไร?"
    },
    choices: [
      {
        id: "over-give",
        text: {
          EN: "Say yes to everything so they will not lose interest in me.",
          TH: "ตอบตกลงทุกอย่างเพื่อไม่ให้เขาหมดความสนใจ"
        },
        archetypeHint: "The Seeker",
        styleImpact: { anxious: 2, secure: 0, avoidant: 0, fearful: 1 },
        dimensions: { selfWorth: -2, motivation: -1, pattern: -2 }
      },
      {
        id: "clear-boundary",
        text: {
          EN: "Be warm and honest: set a clear boundary, suggest another time.",
          TH: "อบอุ่นและตรงไปตรงมา: ตั้งขอบเขตชัดเจน ชวนหาเวลาอื่นแทน"
        },
        archetypeHint: "The Anchor",
        styleImpact: { anxious: 0, secure: 2, avoidant: 0, fearful: 0 },
        dimensions: { selfWorth: 2, motivation: 2, pattern: 2 }
      },
      {
        id: "detach-fast",
        text: {
          EN: "Feel pressured and shut down the connection before discussing it.",
          TH: "รู้สึกถูกกดดันจนปิดโอกาสคุยก่อนจะได้พูดกัน"
        },
        archetypeHint: "The Builder",
        styleImpact: { anxious: 0, secure: 0, avoidant: 2, fearful: 1 },
        dimensions: { selfWorth: 0, motivation: -1, pattern: -1 }
      },
      {
        id: "conflicted-boundary",
        text: {
          EN: "Need closeness but fear conflict, so avoid replying for a while.",
          TH: "อยากใกล้แต่กลัวขัดแย้ง เลยตอบช้าหรือเงียบไปก่อน"
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
      EN: "After a Misunderstanding",
      TH: "หลังความเข้าใจคลาดเคลื่อน"
    },
    description: {
      EN:
        "A small conflict happens and both of you feel misunderstood. What is your first move?",
      TH:
        "มีเรื่องเล็กน้อยคาใจ ทั้งคู่รู้สึกว่าถูกเข้าใจผิด คุณจะลงมือแบบไหนเป็นอย่างแรก?"
    },
    choices: [
      {
        id: "chase-reassurance",
        text: {
          EN: "Push for immediate reassurance because uncertainty feels unbearable.",
          TH: "เร่งขอความมั่นใจทันทีเพราะความไม่แน่นหนาทนไม่ไหว"
        },
        archetypeHint: "The Seeker",
        styleImpact: { anxious: 2, secure: 0, avoidant: 0, fearful: 1 },
        dimensions: { selfWorth: -1, motivation: -1, pattern: -2 }
      },
      {
        id: "repair-openly",
        text: {
          EN: "Pause, regulate, then name feelings and invite a calm repair talk.",
          TH: "หยุดพัก ปรับอารมณ์ แล้วพูดความรู้สึกชัดเชิญชวนคุยซ่อมความสัมพันธ์อย่างสงบ"
        },
        archetypeHint: "The Anchor",
        styleImpact: { anxious: 0, secure: 2, avoidant: 0, fearful: 0 },
        dimensions: { selfWorth: 2, motivation: 2, pattern: 2 }
      },
      {
        id: "stonewall",
        text: {
          EN: "Withdraw and focus on being independent so I cannot be hurt.",
          TH: "ถอยและเน้นเป็นอิสระเพื่อไม่ให้ตัวเองเจ็บ"
        },
        archetypeHint: "The Builder",
        styleImpact: { anxious: 0, secure: 0, avoidant: 2, fearful: 1 },
        dimensions: { selfWorth: 0, motivation: -1, pattern: -1 }
      },
      {
        id: "freeze-cycle",
        text: {
          EN: "Want to reconnect but freeze from fear, waiting for them to lead.",
          TH: "อยากเชื่อมใหม่แต่ชะงักเพราะกลัว รอให้อีกฝ่ายเป็นฝ่ายเริ่มก่อน"
        },
        archetypeHint: "The Nurturer",
        styleImpact: { anxious: 1, secure: 0, avoidant: 1, fearful: 2 },
        dimensions: { selfWorth: -1, motivation: -2, pattern: -2 }
      }
    ]
  }
];
