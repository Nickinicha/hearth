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
      EN: "It's early morning. A message from 2:14 AM waits in first light: \"I kept thinking about what you said. I don't know what to do with that yet.\" You hold the phone before responding.",
      TH: "เช้าตรู่ ข้อความที่มาถึงตั้งแต่ตีสองสิบสี่นาทีกำลังรออยู่ในแสงเช้า: \"หนูคิดถึงสิ่งที่แกพูดอยู่ตลอด ยังไม่รู้จะรับมือกับมันยังไง\" คุณถือโทรศัพท์ไว้ครู่หนึ่งก่อนตอบ"
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
          EN: "To receive someone's uncertainty is a quiet form of love.",
          TH: "การรับความไม่แน่ใจของใครสักคน คือรูปแบบเงียบๆ ของความรัก"
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
          EN: "The mind reaches for certainty when the heart feels unsteady.",
          TH: "ใจที่ไม่มั่นคงมักพยายามหาความแน่นอนจากภายนอก"
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
          EN: "Not every message needs an immediate answer. Some need space to breathe.",
          TH: "ไม่ใช่ทุกข้อความที่ต้องการคำตอบทันที บางอย่างต้องการพื้นที่หายใจก่อน"
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
      EN: "Evening. You have not replied for hours. A soft knock comes at the door while you're trying to find what is left in you.",
      TH: "ยามเย็น คุณยังไม่ได้ตอบข้อความผ่านมาหลายชั่วโมงแล้ว ระหว่างที่กำลังหาส่วนที่ยังเหลืออยู่ในตัวเอง ก็มีเสียงเคาะประตูเบาๆ"
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
          EN: "Boundaries are not walls. They are the shape of your inner peace.",
          TH: "ขอบเขตไม่ใช่กำแพง มันคือรูปร่างของความสงบภายในใจ"
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
          EN: "Showing up imperfectly is still showing up.",
          TH: "การปรากฏตัวแม้ไม่สมบูรณ์ ก็ยังถือว่ามา"
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
          EN: "Fear of disapproval is an old wound asking to be seen.",
          TH: "ความกลัวการถูกปฏิเสธคือบาดแผลเก่าที่ขอให้มองเห็นมัน"
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
      EN: "You open the door slightly: \"I need quiet tonight.\" They answer, \"Okay. I'll be here.\" The door stays half-open, and so does something in you.",
      TH: "คุณเปิดประตูนิดเดียว: \"คืนนี้ขอความเงียบนะ\" เขา/เธอตอบว่า \"โอเค ฉันอยู่ตรงนี้\" ประตูยังเปิดครึ่งหนึ่ง และบางอย่างในตัวคุณก็เช่นกัน"
    },
    choices: [{ id: "s2_space_continue", text: { EN: "Breathe. Let the quiet restore you.", TH: "หายใจ ให้ความเงียบฟื้นฟูคุณ" }, effects: { secure: 10 }, next: "scene_3" }]
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
      EN: "You open the door fully. No big words, just presence. They sit beside you and say, \"You don't have to talk. I know.\"",
      TH: "คุณเปิดประตูเต็มที่ ไม่มีคำพูดใหญ่โต มีแค่การอยู่ข้างๆ เขา/เธอนั่งลงและพูดว่า \"ไม่ต้องพูดก็ได้ เรารู้อยู่\""
    },
    choices: [{ id: "s2_reach_continue", text: { EN: "Rest in that shared silence.", TH: "พักอยู่ในความเงียบที่แบ่งกันนั้น" }, effects: { secure: 10 }, next: "scene_3" }]
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
      EN: "You apologize right away. They gently stop you: \"You don't owe me a constant signal. I just wanted to know you're okay.\"",
      TH: "คุณขอโทษทันที เขา/เธอหยุดคุณเบาๆ: \"เธอไม่ต้องส่งสัญญาณตลอดเวลา แค่อยากรู้ว่าโอเคไหม\""
    },
    choices: [{ id: "s2_fear_continue", text: { EN: "Let that kindness in.", TH: "รับความกรุณานั้นเข้ามา" }, effects: { secure: 15, anxious: -10 }, next: "scene_3" }]
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
      EN: "Late night. They say: \"Sometimes I love you more than you let yourself be loved.\" The truth hangs in the room.",
      TH: "ดึกมาก แล้วเขา/เธอพูดว่า: \"บางทีฉันรักเธอมากกว่าที่เธอยอมให้ตัวเองถูกรัก\" ความจริงลอยอยู่ในห้อง"
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
    name: { EN: "Secure", TH: "มั่นคง (Secure)" },
    spiritual: {
      EN: "Your energy moves like still water: clear, deep, and grounded. You can stay close without abandoning yourself.",
      TH: "พลังงานของคุณเคลื่อนไหวเหมือนน้ำนิ่ง: ใส ลึก และมั่นคง คุณอยู่ใกล้ใครได้โดยไม่ทิ้งตัวเอง"
    }
  },
  anxious: {
    icon: "🌒",
    name: { EN: "Anxious", TH: "วิตกกังวล (Anxious)" },
    spiritual: {
      EN: "Your heart feels intensely. Sensitivity is not weakness; it is a sacred signal asking for safety and gentle truth.",
      TH: "หัวใจของคุณรับรู้อย่างเข้มข้น ความอ่อนไหวไม่ใช่จุดอ่อน แต่เป็นสัญญาณศักดิ์สิทธิ์ที่ขอความปลอดภัยและความจริงอย่างอ่อนโยน"
    }
  },
  avoidant: {
    icon: "🌑",
    name: { EN: "Avoidant", TH: "หลีกเลี่ยง (Avoidant)" },
    spiritual: {
      EN: "You learned to survive by standing alone. Your next growth is not needing more, but letting trusted love in without disappearing.",
      TH: "คุณเรียนรู้การอยู่รอดด้วยการยืนลำพัง การเติบโตต่อไปไม่ใช่การต้องการมากขึ้น แต่คือการยอมให้ความรักที่ไว้ใจได้เข้ามาโดยไม่หายไปจากตัวเอง"
    }
  },
  fearful: {
    icon: "🌘",
    name: { EN: "Fearful", TH: "หวาดกลัว-หลบเลี่ยง (Fearful)" },
    spiritual: {
      EN: "You long for closeness and fear it at once. Your healing path is to move in small, honest steps where your body can still feel safe.",
      TH: "คุณโหยหาความใกล้ชิดและกลัวมันพร้อมกัน เส้นทางเยียวยาคือการก้าวเล็กๆ อย่างซื่อสัตย์ ในจังหวะที่ร่างกายยังรู้สึกปลอดภัย"
    }
  }
};
