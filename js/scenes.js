export const PHASE_1_SCENES = [
  {
    id: "scene_1",
    phaseLabel: { EN: "Hearth - Story", TH: "Hearth - เรื่องราว" },
    sceneLabel: { EN: "Scene 1", TH: "ฉาก 1" },
    title: { EN: "The First Signal", TH: "สัญญาณแรก" },
    backgroundTint: "#1a1422",
    tintOpacity: 0.16,
    mood: "neutral",
    speaker: { EN: null, TH: null },
    description: {
      EN: "At dawn, a message glows on your screen like a small star asking to be heard. Something in your chest stirs between hope and caution.",
      TH: "ยามเช้า ข้อความหนึ่งเรืองอยู่บนหน้าจอเหมือนดาวดวงเล็กที่ขอให้คุณรับฟัง บางอย่างในอกค่อยๆ ขยับ ระหว่างความหวังกับความระวัง"
    },
    choicePrompt: {
      EN: "How do you answer the first cosmic pull?",
      TH: "คุณจะตอบรับแรงดึงดูดแรกจากจักรวาลอย่างไร?"
    },
    choices: [
      { id: "s1_secure", text: { EN: "Reply gently and clearly.", TH: "ตอบอย่างอ่อนโยนและชัดเจน" }, effects: { secure: 16, warmth: 10 }, next: "scene_2" },
      { id: "s1_anxious", text: { EN: "Read it again and fear the silence.", TH: "อ่านซ้ำแล้วหวั่นกับความเงียบ" }, effects: { anxious: 16, distance: 8 }, next: "scene_2" },
      { id: "s1_avoidant", text: { EN: "Place the phone down and withdraw.", TH: "วางโทรศัพท์ลงแล้วถอยออกมา" }, effects: { avoidant: 16, selfawareness: 4 }, next: "scene_2" },
      { id: "s1_fearful", text: { EN: "Type, delete, and freeze.", TH: "พิมพ์ ลบ แล้วหยุดนิ่ง" }, effects: { fearful: 16, anxious: 4 }, next: "scene_2" }
    ]
  },
  {
    id: "scene_2",
    phaseLabel: { EN: "Hearth - Story", TH: "Hearth - เรื่องราว" },
    sceneLabel: { EN: "Scene 2", TH: "ฉาก 2" },
    title: { EN: "Mirror of Soul", TH: "กระจกแห่งจิตวิญญาณ" },
    backgroundTint: "#271738",
    tintOpacity: 0.22,
    mood: "lonely",
    speaker: { EN: null, TH: null },
    description: {
      EN: "Night arrives. Your face is familiar in the mirror, but your heart is mist. You ask which self is true: the one who reaches, or the one who runs.",
      TH: "กลางคืนมาเยือน ใบหน้าในกระจกยังคุ้นเคย แต่หัวใจคล้ายหมอก คุณถามตัวเองว่าใครคือความจริง ระหว่างส่วนที่อยากเข้าใกล้ กับส่วนที่อยากหนี"
    },
    choicePrompt: {
      EN: "Which reflection do you trust tonight?",
      TH: "คืนนี้คุณจะเชื่อภาพสะท้อนแบบไหน?"
    },
    choices: [
      { id: "s2_secure", text: { EN: "Name your feeling without blaming.", TH: "บอกความรู้สึกโดยไม่โทษใคร" }, effects: { secure: 15, selfawareness: 8 }, next: "scene_3" },
      { id: "s2_anxious", text: { EN: "Ask if they still care, again.", TH: "ถามย้ำว่าเขา/เธอยังแคร์ไหม" }, effects: { anxious: 15, warmth: 3 }, next: "scene_3" },
      { id: "s2_avoidant", text: { EN: "Stay quiet to protect your center.", TH: "เงียบไว้เพื่อปกป้องศูนย์กลางตัวเอง" }, effects: { avoidant: 15, distance: 8 }, next: "scene_3" },
      { id: "s2_fearful", text: { EN: "Reach, then pull away immediately.", TH: "เอื้อมหา แล้วรีบถอยกลับทันที" }, effects: { fearful: 15, anxious: 4 }, next: "scene_3" }
    ]
  },
  {
    id: "scene_3",
    phaseLabel: { EN: "Hearth - Story", TH: "Hearth - เรื่องราว" },
    sceneLabel: { EN: "Scene 3", TH: "ฉาก 3" },
    title: { EN: "The Shadow Self", TH: "เงาตัวตน" },
    backgroundTint: "#111728",
    tintOpacity: 0.26,
    mood: "heavy",
    speaker: { EN: null, TH: null },
    description: {
      EN: "Your shadow self speaks softly: \"I learned these patterns to survive.\" For the first time, you do not argue. You listen.",
      TH: "เงาตัวตนของคุณกระซิบเบาๆ ว่า \"ฉันเรียนรู้รูปแบบพวกนี้เพื่อเอาตัวรอด\" เป็นครั้งแรกที่คุณไม่โต้เถียง คุณแค่รับฟัง"
    },
    choicePrompt: {
      EN: "How do you meet your shadow?",
      TH: "คุณจะพบเงาของตัวเองอย่างไร?"
    },
    choices: [
      { id: "s3_secure", text: { EN: "Thank it, and choose a calmer way.", TH: "ขอบคุณมัน แล้วเลือกทางที่สงบกว่า" }, effects: { secure: 17 }, next: "scene_4" },
      { id: "s3_anxious", text: { EN: "Beg it not to leave you alone.", TH: "อ้อนวอนขอให้มันอย่าทิ้งคุณ" }, effects: { anxious: 17 }, next: "scene_4" },
      { id: "s3_avoidant", text: { EN: "Lock it away and keep moving.", TH: "ขังมันไว้ แล้วเดินต่อไป" }, effects: { avoidant: 17 }, next: "scene_4" },
      { id: "s3_fearful", text: { EN: "Touch it briefly, then recoil.", TH: "แตะมันแค่ชั่วครู่ แล้วถอยหนี" }, effects: { fearful: 17 }, next: "scene_4" }
    ]
  },
  {
    id: "scene_4",
    phaseLabel: { EN: "Hearth - Story", TH: "Hearth - เรื่องราว" },
    sceneLabel: { EN: "Scene 4", TH: "ฉาก 4" },
    title: { EN: "Orbit of Letting Go", TH: "วงโคจรแห่งการปล่อยวาง" },
    backgroundTint: "#173025",
    tintOpacity: 0.24,
    mood: "still",
    speaker: { EN: null, TH: null },
    description: {
      EN: "You stand beneath a sky of slow stars and realize letting go is not forgetting. It is releasing your grip on what no longer grows.",
      TH: "คุณยืนใต้ท้องฟ้าที่ดาวเคลื่อนช้า และเข้าใจว่าการปล่อยวางไม่ใช่การลืม แต่มันคือการคลายมือจากสิ่งที่ไม่เติบโตอีกแล้ว"
    },
    choicePrompt: {
      EN: "What do you release into the night?",
      TH: "คุณจะปล่อยสิ่งใดคืนให้ราตรี?"
    },
    choices: [
      { id: "s4_secure", text: { EN: "Release control, keep connection.", TH: "ปล่อยการควบคุม แต่ยังคงการเชื่อมต่อ" }, effects: { secure: 16 }, next: "scene_5" },
      { id: "s4_anxious", text: { EN: "Hold tighter, afraid to lose.", TH: "ยิ่งจับแน่น เพราะกลัวการสูญเสีย" }, effects: { anxious: 16 }, next: "scene_5" },
      { id: "s4_avoidant", text: { EN: "Release everyone before they can hurt you.", TH: "ปล่อยทุกคนก่อนที่เขาจะทำให้เจ็บ" }, effects: { avoidant: 16 }, next: "scene_5" },
      { id: "s4_fearful", text: { EN: "Open one hand, close the other.", TH: "เปิดมือข้างหนึ่ง แต่กำอีกข้างไว้" }, effects: { fearful: 16 }, next: "scene_5" }
    ]
  },
  {
    id: "scene_5",
    phaseLabel: { EN: "Hearth - Story", TH: "Hearth - เรื่องราว" },
    sceneLabel: { EN: "Scene 5", TH: "ฉาก 5" },
    title: { EN: "Threshold of Trust", TH: "ธรณีแห่งความไว้วางใจ" },
    backgroundTint: "#2a1a0a",
    tintOpacity: 0.2,
    mood: "warm",
    speaker: { EN: null, TH: null },
    description: {
      EN: "A door is open. Not wide, not closed. Just enough for honesty to pass through without force.",
      TH: "มีประตูบานหนึ่งเปิดอยู่ ไม่กว้าง ไม่ปิด แค่พอให้ความจริงใจเดินผ่านได้โดยไม่ต้องฝืน"
    },
    choicePrompt: {
      EN: "How do you step through?",
      TH: "คุณจะก้าวผ่านอย่างไร?"
    },
    choices: [
      { id: "s5_secure", text: { EN: "Speak your need with softness.", TH: "บอกความต้องการด้วยความนุ่มนวล" }, effects: { secure: 14 }, next: "scene_6" },
      { id: "s5_anxious", text: { EN: "Ask for proof of love first.", TH: "ขอหลักฐานความรักก่อน" }, effects: { anxious: 14 }, next: "scene_6" },
      { id: "s5_avoidant", text: { EN: "Step back and call it independence.", TH: "ถอยกลับ แล้วเรียกมันว่าอิสระ" }, effects: { avoidant: 14 }, next: "scene_6" },
      { id: "s5_fearful", text: { EN: "Reach with trembling certainty.", TH: "เอื้อมหาอย่างสั่นไหวและไม่แน่ใจ" }, effects: { fearful: 14 }, next: "scene_6" }
    ]
  },
  {
    id: "scene_6",
    phaseLabel: { EN: "Hearth - Story", TH: "Hearth - เรื่องราว" },
    sceneLabel: { EN: "Scene 6", TH: "ฉาก 6" },
    title: { EN: "Breathing Moment", TH: "ช่วงหายใจ" },
    isBreathingScene: true,
    backgroundTint: "#0a0a1a",
    tintOpacity: 0.52,
    mood: "cosmic",
    speaker: { EN: null, TH: null },
    description: {
      EN: "Midway through the journey, the sky asks you to pause. Breathe in starlight, breathe out old fear.",
      TH: "กลางทางของการเดินทาง ท้องฟ้าขอให้คุณหยุดพัก หายใจเอาแสงดาวเข้าไป และหายใจเอาความกลัวเก่าออกมา"
    },
    breathInstruction: {
      EN: ["Breathe in...", "Hold...", "Breathe out...", "Return to your center."],
      TH: ["หายใจเข้า...", "กลั้นไว้...", "หายใจออก...", "กลับสู่ศูนย์กลางของตัวเอง"]
    },
    continueLabel: { EN: "Continue the Journey", TH: "เดินทางต่อ" },
    effects: { secure: 8, fearful: -2 },
    next: "scene_7"
  },
  {
    id: "scene_7",
    phaseLabel: { EN: "Hearth - Story", TH: "Hearth - เรื่องราว" },
    sceneLabel: { EN: "Scene 7", TH: "ฉาก 7" },
    title: { EN: "Mirror of Soul", TH: "กระจกวิญญาณ" },
    backgroundTint: "#2d1b4e",
    tintOpacity: 0.22,
    mood: "reaching",
    speaker: { EN: null, TH: null },
    description: {
      EN: "You look into the mirror again, and this time it does not show your face first. It shows your longing.",
      TH: "คุณมองกระจกอีกครั้ง และครั้งนี้มันไม่สะท้อนใบหน้าคุณก่อน แต่มันสะท้อนความโหยหาของคุณก่อน"
    },
    choicePrompt: {
      EN: "What truth do you allow to be seen?",
      TH: "คุณยอมให้ความจริงใดถูกมองเห็น?"
    },
    choices: [
      { id: "s7_secure", text: { EN: "I can be loved as I am.", TH: "ฉันถูกรักได้ในแบบที่เป็น" }, effects: { secure: 18 }, next: "scene_8" },
      { id: "s7_anxious", text: { EN: "If I am not needed, I disappear.", TH: "ถ้าไม่มีใครต้องการ ฉันก็เหมือนหายไป" }, effects: { anxious: 18 }, next: "scene_8" },
      { id: "s7_avoidant", text: { EN: "Need less, feel less, stay safe.", TH: "ต้องการให้น้อย รู้สึกให้น้อย แล้วจะปลอดภัย" }, effects: { avoidant: 18 }, next: "scene_8" },
      { id: "s7_fearful", text: { EN: "I want closeness, but I fear the cost.", TH: "ฉันอยากใกล้ชิด แต่กลัวราคาที่ต้องจ่าย" }, effects: { fearful: 18 }, next: "scene_8" }
    ]
  },
  {
    id: "scene_8",
    phaseLabel: { EN: "Hearth - Story", TH: "Hearth - เรื่องราว" },
    sceneLabel: { EN: "Scene 8", TH: "ฉาก 8" },
    title: { EN: "Letting Go of Old Orbits", TH: "ปล่อยวงโคจรเดิม" },
    backgroundTint: "#172336",
    tintOpacity: 0.24,
    mood: "moving",
    speaker: { EN: null, TH: null },
    description: {
      EN: "Some patterns ask to be honored before they are released. You place yours on the night wind and watch them drift.",
      TH: "บางรูปแบบต้องได้รับการยอมรับ ก่อนจะถูกปล่อยวาง คุณวางมันลงบนลมยามค่ำ แล้วมองดูมันค่อยๆ ลอยห่าง"
    },
    choicePrompt: {
      EN: "What orbit do you choose next?",
      TH: "คุณจะเลือกวงโคจรถัดไปแบบไหน?"
    },
    choices: [
      { id: "s8_secure", text: { EN: "An orbit with space and warmth.", TH: "วงโคจรที่มีทั้งพื้นที่และความอบอุ่น" }, effects: { secure: 15 }, next: "scene_9" },
      { id: "s8_anxious", text: { EN: "An orbit that promises never to leave.", TH: "วงโคจรที่สัญญาว่าจะไม่จากไป" }, effects: { anxious: 15 }, next: "scene_9" },
      { id: "s8_avoidant", text: { EN: "An orbit far enough to not be hurt.", TH: "วงโคจรที่ไกลพอจะไม่เจ็บ" }, effects: { avoidant: 15 }, next: "scene_9" },
      { id: "s8_fearful", text: { EN: "An orbit that comes close, then fades.", TH: "วงโคจรที่เข้ามาใกล้ แล้วค่อยๆ เลือนหาย" }, effects: { fearful: 15 }, next: "scene_9" }
    ]
  },
  {
    id: "scene_9",
    phaseLabel: { EN: "Hearth - Story", TH: "Hearth - เรื่องราว" },
    sceneLabel: { EN: "Scene 9", TH: "ฉาก 9" },
    title: { EN: "The Return to Hearth", TH: "กลับสู่เตาไฟ" },
    backgroundTint: "#2a1a0a",
    tintOpacity: 0.18,
    mood: "warm",
    speaker: { EN: null, TH: null },
    description: {
      EN: "You return to The Home — not a place, but a felt safety in your own body. The hearth is lit from within.",
      TH: "คุณกลับสู่บ้าน ไม่ใช่สถานที่ แต่คือความปลอดภัยที่รู้สึกได้ในร่างกายของตัวเอง เตาไฟดวงนี้จุดจากภายใน"
    },
    choicePrompt: {
      EN: "How do you hold this home?",
      TH: "คุณจะโอบอุ้มบ้านนี้ไว้อย่างไร?"
    },
    choices: [
      { id: "s9_secure", text: { EN: "With open hands and steady breath.", TH: "ด้วยมือที่เปิด และลมหายใจที่มั่นคง" }, effects: { secure: 17 }, next: "scene_10" },
      { id: "s9_anxious", text: { EN: "By guarding every flicker of warmth.", TH: "ด้วยการเฝ้าระแวดระวังทุกประกายความอบอุ่น" }, effects: { anxious: 17 }, next: "scene_10" },
      { id: "s9_avoidant", text: { EN: "By keeping the flame private.", TH: "ด้วยการเก็บเปลวไฟไว้เป็นเรื่องส่วนตัว" }, effects: { avoidant: 17 }, next: "scene_10" },
      { id: "s9_fearful", text: { EN: "By moving close, then retreating.", TH: "ด้วยการเข้าใกล้ แล้วถอยกลับ" }, effects: { fearful: 17 }, next: "scene_10" }
    ]
  },
  {
    id: "scene_10",
    phaseLabel: { EN: "Hearth - Story", TH: "Hearth - เรื่องราว" },
    sceneLabel: { EN: "Scene 10", TH: "ฉาก 10" },
    title: { EN: "The Final Portal", TH: "ประตูสุดท้าย" },
    backgroundTint: "#15132a",
    tintOpacity: 0.3,
    mood: "cosmic",
    speaker: { EN: null, TH: null },
    description: {
      EN: "Ten scenes later, the stars grow quiet. You stand at the final portal, carrying every choice as one constellation.",
      TH: "หลังผ่านสิบฉาก ดาวทั้งหลายค่อยๆ สงบ คุณยืนอยู่หน้าประตูสุดท้าย พร้อมทุกทางเลือกที่ถักรวมเป็นกลุ่มดาวเดียว"
    },
    choicePrompt: {
      EN: "Step through and receive your Celestial Guidance.",
      TH: "ก้าวผ่านเข้าไป เพื่อรับคำชี้นำแห่งท้องฟ้า"
    },
    choices: [
      { id: "s10_secure", text: { EN: "Step forward with grounded openness.", TH: "ก้าวไปข้างหน้าด้วยใจเปิดที่มั่นคง" }, effects: { secure: 20 }, next: "scene_summary" },
      { id: "s10_anxious", text: { EN: "Step forward seeking reassurance.", TH: "ก้าวไปข้างหน้าพร้อมความต้องการความมั่นใจ" }, effects: { anxious: 20 }, next: "scene_summary" },
      { id: "s10_avoidant", text: { EN: "Step forward, keeping distance intact.", TH: "ก้าวไปข้างหน้าโดยยังรักษาระยะห่าง" }, effects: { avoidant: 20 }, next: "scene_summary" },
      { id: "s10_fearful", text: { EN: "Step forward and tremble anyway.", TH: "ก้าวไปข้างหน้า ทั้งที่ยังสั่นไหว" }, effects: { fearful: 20 }, next: "scene_summary" }
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
