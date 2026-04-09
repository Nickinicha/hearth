import { motion } from "framer-motion";
import { useMemo } from "react";

const STAR_COUNT = 40;
const LEFT_TREE_COUNT = 6;
const RIGHT_TREE_COUNT = 6;

function pseudo(i, m) {
  return ((i * 7919 + m * 997) % 1000) / 1000;
}

function Tree({ side, index, total }) {
  const baseX =
    side === "left"
      ? 2 + (index / Math.max(1, total - 1)) * 28
      : 58 + (index / Math.max(1, total - 1)) * 38;
  const swayDuration = 6 + pseudo(index, 3) * 2;
  const delay = pseudo(index, 7) * 2;
  const scale = 0.85 + pseudo(index, 11) * 0.35;

  return (
    <motion.div
      className="pointer-events-none absolute bottom-0 flex flex-col items-center"
      style={{
        left: `${baseX}%`,
        transform: `translateX(-50%) scale(${scale})`
      }}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.9, delay: 0.35 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{ rotate: [-1.1, 1.1, -1.1] }}
        transition={{
          duration: swayDuration,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay
        }}
        className="flex flex-col items-center"
      >
        {/* canopy layers */}
        <div className="h-0 w-0 border-x-[18px] border-b-[26px] border-x-transparent border-b-[#070a10]" />
        <div className="-mt-3 h-0 w-0 border-x-[22px] border-b-[32px] border-x-transparent border-b-[#06080f]" />
        <div className="-mt-4 h-0 w-0 border-x-[28px] border-b-[40px] border-x-transparent border-b-[#05070c]" />
        <div className="mt-1 h-24 w-2 rounded-[2px] bg-[#03050a]" />
      </motion.div>
    </motion.div>
  );
}

export function ForestBackground() {
  const stars = useMemo(
    () =>
      Array.from({ length: STAR_COUNT }, (_, i) => ({
        id: i,
        left: `${(pseudo(i, 1) * 94 + 3).toFixed(2)}%`,
        top: `${(pseudo(i, 2) * 62 + 4).toFixed(2)}%`,
        size: 1 + (i % 3),
        delay: pseudo(i, 5) * 4,
        duration: 2.8 + pseudo(i, 9) * 2.4
      })),
    []
  );

  return (
    <motion.div
      className="fixed inset-0 z-0 overflow-hidden bg-[#020408]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, ease: "easeOut" }}
    >
      {/* night gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #050a12 0%, #03060c 38%, #020408 72%, #010206 100%)"
        }}
      />

      {/* moonlight */}
      <div
        className="pointer-events-none absolute -top-[20%] left-1/2 h-[55vh] w-[120vw] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(200,210,255,0.08) 0%, transparent 62%)"
        }}
      />

      {/* stars */}
      {stars.map((s) => (
        <motion.span
          key={s.id}
          className="pointer-events-none absolute rounded-full bg-stone-200/90"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size
          }}
          animate={{ opacity: [0.2, 0.85, 0.35, 0.9, 0.25] }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: s.delay
          }}
        />
      ))}

      {/* ground fog */}
      <motion.div
        className="pointer-events-none absolute bottom-0 left-[-20%] h-[28vh] w-[140%]"
        style={{
          background:
            "linear-gradient(0deg, rgba(10,14,22,0.85) 0%, rgba(8,10,18,0.45) 45%, transparent 100%)"
        }}
        animate={{ x: ["0%", "4%", "-2%", "0%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />

      {/* trees */}
      {Array.from({ length: LEFT_TREE_COUNT }, (_, i) => (
        <Tree key={`L-${i}`} side="left" index={i} total={LEFT_TREE_COUNT} />
      ))}
      {Array.from({ length: RIGHT_TREE_COUNT }, (_, i) => (
        <Tree key={`R-${i}`} side="right" index={i} total={RIGHT_TREE_COUNT} />
      ))}

      {/* film grain SVG */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.03] mix-blend-overlay">
        <filter id="forestGrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#forestGrain)" />
      </svg>
    </motion.div>
  );
}
