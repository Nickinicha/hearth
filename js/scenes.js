export const PHASE_1_SCENES = [
  {
    id: "scene_1",
    phaseLabel: { EN: "Hearth - Story", TH: "Hearth - เรื่องราว" },
    sceneLabel: { EN: "Scene 1", TH: "ฉาก 1" },
    title: { EN: "The First Message", TH: "ข้อความแรก" },
    backgroundTint: null,
    tintOpacity: 0,
    mood: "neutral",
    speaker: { EN: null, TH: null },
    description: {
      EN: "It's early morning. A message from 2:14 AM glows in first light. You pause, feeling a small wave of Cosmic Energy in your chest, as if this moment arrived by Star Alignment to begin your Soul Growth.",
      TH: "เช้าตรู่ ข้อความจากตีสองสิบสี่นาทีเรืองอยู่ในแสงแรกของวัน คุณหยุดนิ่ง และรับรู้พลังจักรวาลอ่อนๆ ในอก ราวกับช่วงเวลานี้ถูกจัดวางโดยการเรียงตัวของดวงดาว เพื่อเปิดทางให้การเติบโตของจิตวิญญาณ"
    },
    choicePrompt: {
      EN: "Something stirs in your chest. What is it?",
      TH: "มีบางอย่างขยับอยู่ในอก มันคืออะไร?"
    },
    choices: [
      {
        id: "s1_warmth",
        text: { EN: "Warmth. You feel glad they trusted you with this.", TH: "ความอบอุ่น ดีใจที่เขา/เธอไว้วางใจบอก" },
        internalNote: {
          EN: "To receive someone's uncertainty is sacred Cosmic Energy in motion.",
          TH: "การรับความไม่แน่ใจของใครสักคน คือพลังจักรวาลที่กำลังเคลื่อนอย่างศักดิ์สิทธิ์"
        },
        effects: { secure: 20 },
        tint: "#2a1a0a",
        tintOpacity: 0.15,
        mood: "warm",
        next: "scene_2"
      },
      {
        id: "s1_anxious",
        text: { EN: "Worry. You wonder if they're pulling away.", TH: "กังวล กลัวว่าเขา/เธอกำลังถอยห่าง" },
        internalNote: {
          EN: "When the heart shakes, it seeks certainty before trusting Soul Growth.",
          TH: "เมื่อหัวใจสั่นไหว มันมักรีบหาความแน่นอน ก่อนจะยอมไว้วางใจการเติบโตของจิตวิญญาณ"
        },
        effects: { anxious: 20 },
        tint: "#1a1a2e",
        tintOpacity: 0.35,
        mood: "heavy",
        next: "scene_2"
      },
      {
        id: "s1_still",
        text: { EN: "Stillness. You let the words settle before reacting.", TH: "ความสงบ ปล่อยให้คำพูดนั้นนิ่งลงก่อนที่จะตอบสนอง" },
        internalNote: {
          EN: "Not every message needs speed; some need silence for Star Alignment.",
          TH: "ไม่ใช่ทุกข้อความต้องรีบตอบ บางอย่างต้องการความเงียบเพื่อให้ดาวเรียงตัวในใจ"
        },
        effects: { secure: 15, avoidant: 10 },
        tint: "#1c2b1c",
        tintOpacity: 0.25,
        mood: "still",
        next: "scene_2"
      }
    ]
  },
  {
    id: "scene_2",
    phaseLabel: { EN: "Hearth - Story", TH: "Hearth - เรื่องราว" },
    sceneLabel: { EN: "Scene 2", TH: "ฉาก 2" },
    title: { EN: "The Emotional Mirror", TH: "กระจกสะท้อนอารมณ์" },
    backgroundTint: null,
    tintOpacity: 0,
    mood: "neutral",
    speaker: { EN: null, TH: null },
    description: {
      EN: "Evening. You have not replied for hours. A soft knock arrives as your Cosmic Energy runs low, and you wonder whether this pause is fear or Soul Growth written in a hidden Star Alignment.",
      TH: "ยามเย็น คุณยังไม่ได้ตอบข้อความมาหลายชั่วโมงแล้ว เสียงเคาะประตูเบาๆ ดังขึ้นในจังหวะที่พลังจักรวาลของคุณลดลง และคุณสงสัยว่าความเงียบนี้คือความกลัว หรือคือการเติบโตของจิตวิญญาณที่ดาวกำลังเขียนไว้"
    },
    choicePrompt: {
      EN: "Your energy is low. What does your inner voice say?",
      TH: "พลังงานในตัวคุณต่ำมาก เสียงข้างในบอกอะไร?"
    },
    choices: [
      {
        id: "s2_space",
        text: { EN: "\"I need to protect what little energy I have left.\"", TH: "\"ต้องปกป้องพลังงานที่เหลืออยู่น้อยนิดนี้ไว้\"" },
        internalNote: {
          EN: "Boundaries are the geometry of Cosmic Energy, not a closed heart.",
          TH: "ขอบเขตคือเรขาคณิตของพลังจักรวาล ไม่ใช่หัวใจที่ปิดตาย"
        },
        effects: { avoidant: 15, secure: 10 },
        tint: "#1c2b1c",
        tintOpacity: 0.35,
        mood: "still",
        next: "scene_2b_space"
      },
      {
        id: "s2_reach",
        text: { EN: "\"Even tired, I want them to know I'm here.\"", TH: "\"แม้จะเหนื่อย แต่อยากให้เขา/เธอรู้ว่ายังอยู่ตรงนี้\"" },
        internalNote: {
          EN: "Showing up imperfectly is still Soul Growth under kind stars.",
          TH: "การปรากฏตัวแม้ไม่สมบูรณ์ คือการเติบโตของจิตวิญญาณใต้ดาวที่อ่อนโยน"
        },
        effects: { secure: 25 },
        tint: "#2a1a0a",
        tintOpacity: 0.2,
        mood: "warm",
        next: "scene_2b_reach"
      },
      {
        id: "s2_fear",
        text: { EN: "\"What if they're upset I haven't replied?\"", TH: "\"ถ้าเขา/เธอโกรธที่ยังไม่ตอบล่ะ?\"" },
        internalNote: {
          EN: "Fear of disapproval is an old constellation asking to be renamed.",
          TH: "ความกลัวการไม่ถูกรับคือกลุ่มดาวเก่าที่กำลังขอชื่อใหม่"
        },
        effects: { anxious: 25 },
        tint: "#2d1b4e",
        tintOpacity: 0.4,
        mood: "lonely",
        next: "scene_2b_fear"
      }
    ]
  },
  {
    id: "scene_2b_space",
    phaseLabel: { EN: "Hearth - Story", TH: "Hearth - เรื่องราว" },
    sceneLabel: { EN: "Scene 2-A", TH: "ฉาก 2-A" },
    title: { EN: "Space", TH: "พื้นที่" },
    backgroundTint: "#1c2b1c",
    tintOpacity: 0.25,
    mood: "still",
    speaker: { EN: null, TH: null },
    description: {
      EN: "You open the door slightly: \"I need quiet tonight.\" They answer, \"Okay. I'll be here.\" In that tender pause, your Star Alignment shifts toward Soul Growth.",
      TH: "คุณเปิดประตูนิดหนึ่งแล้วพูดว่า \"คืนนี้ขอความเงียบนะ\" เขา/เธอตอบว่า \"โอเค ฉันอยู่ตรงนี้\" ในช่องว่างที่อ่อนโยนนั้น ดาวภายในคุณค่อยๆ เรียงตัวไปทางการเติบโตของจิตวิญญาณ"
    },
    choices: [{ id: "s2_space_continue", text: { EN: "Breathe. Let cosmic silence restore you.", TH: "หายใจ แล้วให้ความเงียบระดับจักรวาลฟื้นฟูคุณ" }, effects: { secure: 10 }, next: "scene_breath" }]
  },
  {
    id: "scene_2b_reach",
    phaseLabel: { EN: "Hearth - Story", TH: "Hearth - เรื่องราว" },
    sceneLabel: { EN: "Scene 2-B", TH: "ฉาก 2-B" },
    title: { EN: "Reach", TH: "เอื้อมหา" },
    backgroundTint: "#2a1a0a",
    tintOpacity: 0.15,
    mood: "warm",
    speaker: { EN: null, TH: null },
    description: {
      EN: "You open the door fully. No grand speech, just presence. Their nearness steadies your Cosmic Energy, like two stars finding alignment in one quiet orbit.",
      TH: "คุณเปิดประตูเต็มที่ ไม่มีคำพูดใหญ่โต มีแค่การอยู่ตรงนั้น ความใกล้ของเขา/เธอทำให้พลังจักรวาลในตัวคุณนิ่งลง เหมือนดาวสองดวงที่ค่อยๆ เรียงจังหวะกันในวงโคจรเดียว"
    },
    choices: [{ id: "s2_reach_continue", text: { EN: "Rest in that shared, starlit silence.", TH: "พักอยู่ในความเงียบที่มีแสงดาวร่วมกัน" }, effects: { secure: 10 }, next: "scene_breath" }]
  },
  {
    id: "scene_2b_fear",
    phaseLabel: { EN: "Hearth - Story", TH: "Hearth - เรื่องราว" },
    sceneLabel: { EN: "Scene 2-C", TH: "ฉาก 2-C" },
    title: { EN: "Fear", TH: "ความกลัว" },
    backgroundTint: "#2d1b4e",
    tintOpacity: 0.3,
    mood: "lonely",
    speaker: { EN: null, TH: null },
    description: {
      EN: "You apologize right away. They gently stop you: \"You don't owe me a constant signal.\" Their kindness feels like unexpected Cosmic Energy guiding Soul Growth.",
      TH: "คุณขอโทษทันที เขา/เธอหยุดคุณเบาๆ ว่า \"เธอไม่ต้องส่งสัญญาณตลอดเวลา\" ความอ่อนโยนนั้นเหมือนพลังจักรวาลที่มาไม่ทันตั้งตัว และพาใจคุณไปทางการเติบโตของจิตวิญญาณ"
    },
    choices: [{ id: "s2_fear_continue", text: { EN: "Let that kindness in. Really let it in.", TH: "รับความกรุณานั้นเข้ามา รับเข้ามาจริงๆ" }, effects: { secure: 15, anxious: -10 }, next: "scene_breath" }]
  },
  {
    id: "scene_breath",
    phaseLabel: { EN: "Hearth - Story", TH: "Hearth - เรื่องราว" },
    sceneLabel: { EN: "Interlude", TH: "ช่วงพักใจ" },
    title: { EN: "Breathing Space", TH: "ช่องว่างของลมหายใจ" },
    isBreathingScene: true,
    backgroundTint: "#0a0a1a",
    tintOpacity: 0.5,
    mood: "cosmic",
    speaker: { EN: null, TH: null },
    description: {
      EN: "Before we continue, return to your breath.",
      TH: "ก่อนจะไปต่อ ลองกลับมาอยู่กับลมหายใจของตัวเอง"
    },
    breathInstruction: {
      EN: ["Breathe in...", "Hold...", "Breathe out...", "You are here."],
      TH: ["หายใจเข้า...", "กลั้นไว้...", "หายใจออก...", "คุณอยู่ตรงนี้"]
    },
    continueLabel: {
      EN: "I'm ready to continue",
      TH: "พร้อมแล้ว ไปต่อเลย"
    },
    next: "scene_3"
  },
  {
    id: "scene_3",
    phaseLabel: { EN: "Hearth - Story", TH: "Hearth - เรื่องราว" },
    sceneLabel: { EN: "Scene 3", TH: "ฉาก 3" },
    title: { EN: "The Soul Connection", TH: "การเชื่อมต่อของจิตวิญญาณ" },
    backgroundTint: null,
    tintOpacity: 0,
    mood: "neutral",
    speaker: { EN: null, TH: null },
    description: {
      EN: "Late night. They say: \"Sometimes I love you more than you let yourself be loved.\" The room falls still, as if Star Alignment pauses to witness your Soul Growth.",
      TH: "ดึกมาก แล้วเขา/เธอพูดว่า: \"บางทีฉันรักเธอมากกว่าที่เธอยอมให้ตัวเองถูกรัก\" ห้องทั้งห้องนิ่งลง ราวกับการเรียงตัวของดวงดาวหยุดเพื่อเฝ้าดูการเติบโตของจิตวิญญาณของคุณ"
    },
    choicePrompt: {
      EN: "Something deep shifts. How does your soul respond?",
      TH: "บางอย่างข้างในขยับลึกๆ จิตวิญญาณคุณตอบสนองอย่างไร?"
    },
    choices: [
      { id: "s3_receive", text: { EN: "\"You might be right. I'm still learning how.\"", TH: "\"อาจจะจริง ฉันยังเรียนรู้อยู่\"" }, effects: { secure: 30 }, next: "scene_summary" },
      { id: "s3_deflect", text: { EN: "\"That's not fair. I show up, don't I?\"", TH: "\"นั่นไม่ยุติธรรมนะ ฉันก็อยู่ตรงนี้ตลอด\"" }, effects: { avoidant: 25 }, next: "scene_summary" },
      { id: "s3_break", text: { EN: "Silence. Then tears you didn't know were there.", TH: "ความเงียบ แล้วก็น้ำตาที่ไม่รู้ว่ามีอยู่" }, effects: { anxious: 15, secure: 20 }, next: "scene_summary" }
    ]
  },
  { id: "scene_summary", isSummary: true }
];

export const ATTACHMENT_STYLE_SUMMARIES = {
  secure: {
    icon: "🌕",
    name: { EN: "Harmonious Star", TH: "ดาวกลมกลืน (Harmonious Star)" },
    spiritual: {
      EN: "Celestial Guidance: You are the Harmonious Star. Your Cosmic Energy is steady, your Star Alignment is clear, and your Soul Growth is guided by warmth without self-abandonment.",
      TH: "คำชี้นำแห่งท้องฟ้า: คุณคือดาวกลมกลืน พลังจักรวาลของคุณมั่นคง การเรียงตัวของดาวภายในชัดเจน และการเติบโตของจิตวิญญาณเดินไปพร้อมความอบอุ่นโดยไม่ทิ้งตัวเอง"
    }
  },
  anxious: {
    icon: "🌒",
    name: { EN: "Orbiting Moon", TH: "จันทร์โคจร (Orbiting Moon)" },
    spiritual: {
      EN: "Celestial Guidance: You are the Orbiting Moon. Your Cosmic Energy is sensitive and luminous; each wave of feeling is a Star Alignment inviting deeper Soul Growth.",
      TH: "คำชี้นำแห่งท้องฟ้า: คุณคือจันทร์โคจร พลังจักรวาลของคุณอ่อนไหวและสว่างไหว ทุกคลื่นความรู้สึกคือการเรียงตัวของดาวที่เชิญให้จิตวิญญาณเติบโตลึกขึ้น"
    }
  },
  avoidant: {
    icon: "🌑",
    name: { EN: "Solitary Comet", TH: "ดาวหางเดียวดาย (Solitary Comet)" },
    spiritual: {
      EN: "You carry a quiet, self-sufficient universe inside you. You learned to need very little because needing once felt unsafe. Your growth edge is not to become someone who needs more, but to let what you already feel be known.",
      TH: "คุณพกพาจักรวาลที่เงียบสงบและพึ่งตัวเองได้ไว้ข้างใน คุณเรียนรู้ที่จะต้องการน้อยมาก เพราะการต้องการ ณ จุดใดจุดหนึ่งในชีวิต มันรู้สึกไม่ปลอดภัย\n\nแต่คุณอยู่ที่นี่ ในเรื่องราวเกี่ยวกับการเชื่อมต่อ บางส่วนของคุณเลือกที่จะอยู่ตรงนี้เอง\n\nสิ่งที่คุณต้องเติบโตไม่ใช่การกลายเป็นคนที่ต้องการมากขึ้น แต่คือการเรียนรู้ที่จะให้สิ่งที่คุณรู้สึกอยู่แล้วนั้น ได้รับการรับรู้\n\n✦ ดาวไม่ได้หรี่แสงลงเพื่อให้คนอื่นดูสว่างกว่า และคุณก็ไม่จำเป็นต้องหายไปเพื่อรักษาความสงบ"
    }
  },
  fearful: {
    icon: "🌘",
    name: { EN: "Nebula of Mist", TH: "เนบิวลาหมอกพร่า (Nebula of Mist)" },
    spiritual: {
      EN: "Celestial Guidance: You are the Nebula of Mist. Your Cosmic Energy carries both longing and caution; gentle Star Alignment will reveal Soul Growth one clear breath at a time.",
      TH: "คำชี้นำแห่งท้องฟ้า: คุณคือเนบิวลาหมอกพร่า พลังจักรวาลของคุณพกทั้งความโหยหาและความระวัง การเรียงตัวของดาวอย่างอ่อนโยนจะค่อยๆ เปิดการเติบโตของจิตวิญญาณทีละลมหายใจ"
    }
  }
};
