import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function OldClock({ visible, onInteract }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    if (!visible) return undefined;
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, [visible]);

  const sec = now.getSeconds();
  const secDeg = (sec / 60) * 360;

  return (
    <motion.div
      className={`absolute z-20 flex flex-col items-center ${
        visible ? "pointer-events-auto" : "pointer-events-none"
      }`}
      style={{ top: "25%", right: "22%" }}
      initial={false}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
      transition={{ duration: 1.1, ease: "easeOut" }}
    >
      <div className="h-8 w-px bg-stone-700/90" />

      <motion.div
        className="group relative"
        whileHover={{ filter: "drop-shadow(0 0 10px rgba(251,191,36,0.35))" }}
      >
        <motion.button
          type="button"
          aria-label="นาฬิกาเก่า"
          className="relative flex h-28 w-28 cursor-pointer items-center justify-center rounded-full border border-stone-700/80 bg-[#12151c] shadow-[inset_0_0_24px_rgba(0,0,0,0.65)] outline-none focus-visible:ring-2 focus-visible:ring-amber-400/30"
          onClick={() => onInteract?.()}
        >
          {/* hour markers */}
          {Array.from({ length: 12 }, (_, i) => (
            <span
              key={i}
              className="absolute left-1/2 top-1/2 h-[46px] w-px origin-bottom bg-stone-500/90"
              style={{
                transform: `translate(-50%, -100%) rotate(${i * 30}deg)`
              }}
            />
          ))}
          <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-stone-500" />
          {/* second hand */}
          <span
            className="absolute left-1/2 top-1/2 h-[40px] w-px origin-bottom bg-amber-700/85"
            style={{
              transform: `translate(-50%, -100%) rotate(${secDeg}deg)`
            }}
          />
        </motion.button>

        <motion.p
          className="pointer-events-none absolute left-1/2 top-full mt-2 w-40 -translate-x-1/2 text-center text-xs text-stone-400 opacity-0 transition-opacity group-hover:opacity-100"
          initial={false}
        >
          นาฬิกาไม่เคยหยุด
        </motion.p>
      </motion.div>

      {/* pendulum */}
      <motion.div
        className="mt-4 flex h-14 w-6 flex-col items-center"
        animate={{ rotate: [-3, 3, -3] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "50% 0%" }}
      >
        <div className="h-8 w-px bg-stone-700" />
        <div className="mt-[-2px] h-5 w-5 rounded-full bg-[#1a1f28] ring-1 ring-stone-700/70" />
      </motion.div>
    </motion.div>
  );
}
