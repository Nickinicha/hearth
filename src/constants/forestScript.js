/** Hearth 2026 — forest opening script (Thai text preserved exactly). */

export const FOREST_WHISPERS = [
  { text: "เธอเดินมานานแค่ไหนแล้ว", atMs: 2800, visibleMs: 5200 },
  { text: "ในป่าที่ไม่มีแผนที่", atMs: 9000, visibleMs: 5200 },
  { text: "แต่ยังมีแสงอยู่บางส่วน", atMs: 15200, visibleMs: 6000 }
];

export const WHISPER_AT_WIRE = [
  "ครั้งสุดท้ายที่เชื่อใจคน...",
  "มันจบยังไง?",
  "เธอจำได้ไหม?"
];

export const FOREST_CHOICES = [
  {
    id: "cross-with-memory",
    main: "ฉันยังจำได้ แต่จะข้ามไป",
    sub: "ยอมรับว่ามีเรื่องเก่า แต่เลือกก้าวต่อ",
    attachmentHint: "secure"
  },
  {
    id: "pause-here",
    main: "ฉันไม่พร้อม ขอยืนอยู่ตรงนี้ก่อน",
    sub: "ยังต้องการจังหวะและความปลอดภัยในใจ",
    attachmentHint: "anxious"
  },
  {
    id: "find-another-way",
    main: "ฉันจะหาทางอ้อม",
    sub: "ไม่ขังอยู่กับจุดนี้ แต่ยังไม่ปะทะตรงๆ",
    attachmentHint: "avoidant"
  }
];

/** Element appearance offsets from scene mount (ms). */
export const CLOCK_APPEAR_AT = 800;
export const LIGHT_APPEAR_AT = 2200;
export const BARB_WIRE_APPEAR_AT = 3800;
