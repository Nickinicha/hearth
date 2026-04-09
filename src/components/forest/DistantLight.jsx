import { motion } from "framer-motion";

export function DistantLight({ visible, onInteract }) {
  return (
    <motion.div
      className={`absolute left-1/2 z-20 flex -translate-x-1/2 flex-col items-center ${
        visible ? "pointer-events-auto" : "pointer-events-none"
      }`}
      style={{ bottom: "30%" }}
      initial={false}
      animate={
        visible
          ? { opacity: 1, transition: { duration: 3, ease: "easeOut" } }
          : { opacity: 0 }
      }
    >
      {/* beam */}
      <motion.div
        className="mb-1 h-24 w-px"
        style={{
          background:
            "linear-gradient(180deg, rgba(251,191,36,0) 0%, rgba(251,191,36,0.35) 40%, rgba(251,191,36,0.08) 100%)"
        }}
        animate={{ opacity: [0.35, 0.65, 0.4] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.button
        type="button"
        aria-label="แสงไกลแห่งความหวัง"
        className="relative flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-full border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40"
        onClick={() => onInteract?.()}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.98 }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <span
          className="block h-3 w-3 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, rgba(254,243,199,0.95) 0%, rgba(251,191,36,0.85) 45%, rgba(180,83,9,0.5) 100%)",
            boxShadow:
              "0 0 18px rgba(251,191,36,0.55), 0 0 42px rgba(251,191,36,0.25)"
          }}
        />
        <motion.span
          className="pointer-events-none absolute inset-0 -z-10 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(251,191,36,0.35) 0%, transparent 65%)"
          }}
          animate={{ scale: [1, 1.45, 1], opacity: [0.5, 0.9, 0.45] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.button>
    </motion.div>
  );
}
