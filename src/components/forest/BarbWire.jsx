import { motion } from "framer-motion";
import { useState } from "react";

const BARBS_PER_STRAND = 8;

function Strand({ delay, isHovered }) {
  const barbs = Array.from({ length: BARBS_PER_STRAND }, (_, i) => ({
    key: i,
    left: `${((i + 0.5) / BARBS_PER_STRAND) * 100}%`
  }));

  return (
    <div className="relative h-3 w-full">
      <motion.div
        className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-stone-700/90"
        style={{
          boxShadow: isHovered
            ? "0 0 12px rgba(220,38,38,0.45), 0 0 2px rgba(248,113,113,0.5)"
            : "none"
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      />
      {barbs.map((b) => (
        <motion.span
          key={b.key}
          className="absolute top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-stone-600"
          style={{
            left: b.left,
            boxShadow: isHovered ? "0 0 8px rgba(239,68,68,0.35)" : undefined
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: delay + 0.15 + b.key * 0.04 }}
        />
      ))}
    </div>
  );
}

export function BarbWire({ visible, onApproach, onLeave }) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const setHover = (v) => {
    setHovered(v);
    if (v) onApproach?.();
    else onLeave?.();
  };

  return (
    <motion.div
      className={`absolute left-1/2 z-20 w-[60%] max-w-3xl -translate-x-1/2 ${
        visible ? "pointer-events-auto" : "pointer-events-none"
      }`}
      style={{ bottom: "28%" }}
      initial={false}
      animate={
        visible
          ? { opacity: 1, transition: { duration: 0.8 } }
          : { opacity: 0, transition: { duration: 0.4 } }
      }
    >
      {hovered && (
        <motion.div
          className="pointer-events-none absolute inset-[-18%_-8%_-32%_-8%] rounded-md bg-red-950/25"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}

      <motion.p
        className="pointer-events-none mb-4 text-center text-sm italic text-stone-300"
        style={{ opacity: hovered ? 0.3 : 0 }}
        animate={{ opacity: hovered ? 0.3 : 0 }}
      >
        ความกลัวที่สะสมมา
      </motion.p>

      <div className="relative flex items-end justify-between gap-2">
        <div className="w-3 shrink-0 rounded-sm bg-[#2a2218] shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]" style={{ height: "4.25rem" }} />
        <motion.div
          className="relative w-full px-1"
          onHoverStart={() => setHover(true)}
          onHoverEnd={() => setHover(false)}
          onTouchStart={(e) => {
            setPressed(true);
            setHover(true);
          }}
          onTouchEnd={() => {
            setPressed(false);
            setHover(false);
          }}
          style={{
            boxShadow:
              hovered || pressed
                ? "0 0 28px rgba(239,68,68,0.2), 0 0 4px rgba(248,113,113,0.35)"
                : undefined
          }}
        >
          <div className="flex flex-col gap-2 py-1">
            <Strand delay={0.05} isHovered={hovered || pressed} />
            <Strand delay={0.18} isHovered={hovered || pressed} />
            <Strand delay={0.3} isHovered={hovered || pressed} />
          </div>
        </motion.div>
        <div className="w-3 shrink-0 rounded-sm bg-[#2a2218] shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]" style={{ height: "4.25rem" }} />
      </div>
    </motion.div>
  );
}
