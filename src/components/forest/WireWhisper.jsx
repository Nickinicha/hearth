import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * @param {object} props
 * @param {boolean} props.run
 * @param {string[]} props.lines
 * @param {boolean} props.choicesVisible
 * @param {() => void} props.onSequenceComplete
 */
export function WireWhisper({ run, lines, choicesVisible, onSequenceComplete }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const completionFiredRef = useRef(false);
  const timeoutIdsRef = useRef(/** @type {number[]} */ ([]));

  const clearTimers = () => {
    timeoutIdsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutIdsRef.current = [];
  };

  useEffect(() => {
    clearTimers();
    completionFiredRef.current = false;
    setVisibleCount(0);

    if (!run) {
      return clearTimers;
    }

    lines.forEach((_, i) => {
      const id = window.setTimeout(() => setVisibleCount((c) => Math.max(c, i + 1)), i * 850);
      timeoutIdsRef.current.push(id);
    });

    const lastAt = Math.max(0, (lines.length - 1) * 850);
    const doneId = window.setTimeout(() => {
      if (completionFiredRef.current) return;
      completionFiredRef.current = true;
      onSequenceComplete?.();
    }, lastAt + 2000);
    timeoutIdsRef.current.push(doneId);

    return clearTimers;
  }, [run, lines, onSequenceComplete]);

  if (!run) {
    return null;
  }

  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 z-30 w-[88%] max-w-lg -translate-x-1/2"
      style={{ bottom: "38%" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: choicesVisible ? 0 : 1 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
      <div className="flex flex-col items-center gap-5">
        {lines.slice(0, visibleCount).map((line, i) => (
          <motion.p
            key={`${line}-${i}`}
            className="text-center text-base italic text-stone-400 md:text-lg"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 0.95, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
}
