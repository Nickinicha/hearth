import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * @param {object} props
 * @param {boolean} props.visible
 * @param {typeof import('../../constants/forestScript.js').FOREST_CHOICES} props.choices
 * @param {(payload: { choiceId: string, attachmentHint: string, hoverData: Record<string, number> }) => void} props.onChoose
 */
export function ForestChoice({ visible, choices, onChoose }) {
  const hoverStartRef = useRef(/** @type {Record<string, number | null>} */ ({}));
  const hoverMsRef = useRef(/** @type {Record<string, number>} */ ({}));

  useEffect(() => {
    if (!visible) return;
    choices.forEach((c) => {
      hoverStartRef.current[c.id] = null;
      hoverMsRef.current[c.id] = 0;
    });
  }, [visible, choices]);

  const flushHover = (id) => {
    const start = hoverStartRef.current[id];
    if (start == null) return;
    hoverMsRef.current[id] += performance.now() - start;
    hoverStartRef.current[id] = null;
  };

  const handlePick = (choice) => {
    choices.forEach((c) => flushHover(c.id));
    onChoose({
      choiceId: choice.id,
      attachmentHint: choice.attachmentHint,
      hoverData: Object.fromEntries(
        choices.map((c) => [c.id, Math.round(hoverMsRef.current[c.id] ?? 0)])
      )
    });
  };

  if (!visible) {
    return null;
  }

  return (
    <motion.div
      className="pointer-events-auto absolute bottom-6 left-1/2 z-40 flex w-[92%] max-w-md -translate-x-1/2 flex-col gap-3 md:bottom-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {choices.map((choice, index) => (
        <motion.button
          key={choice.id}
          type="button"
          className="w-full cursor-pointer rounded-xl border border-white/10 bg-stone-900/35 px-4 py-3 text-left shadow-lg backdrop-blur-md outline-none ring-0 transition-colors focus-visible:ring-2 focus-visible:ring-amber-400/25"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.25, duration: 0.45, ease: "easeOut" }}
          onMouseEnter={() => {
            hoverStartRef.current[choice.id] = performance.now();
          }}
          onMouseLeave={() => flushHover(choice.id)}
          onFocus={() => {
            hoverStartRef.current[choice.id] = performance.now();
          }}
          onBlur={() => flushHover(choice.id)}
          whileHover={{ x: 4, scale: 1.02 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => handlePick(choice)}
        >
          <span className="block text-sm font-medium text-stone-300">{choice.main}</span>
          {choice.sub ? (
            <span className="mt-1 block text-xs text-stone-600">{choice.sub}</span>
          ) : null}
        </motion.button>
      ))}
    </motion.div>
  );
}
