import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { FOREST_CHOICES, WHISPER_AT_WIRE } from "../../constants/forestScript.js";
import { useForestSequence } from "../../hooks/useForestSequence.js";
import { BarbWire } from "./BarbWire.jsx";
import { DistantLight } from "./DistantLight.jsx";
import { ForestBackground } from "./ForestBackground.jsx";
import { ForestChoice } from "./ForestChoice.jsx";
import { OldClock } from "./OldClock.jsx";
import { WireWhisper } from "./WireWhisper.jsx";

/**
 * Cinematic forest opening for Hearth 2026.
 * Import only this component from outside `src/components/forest/`.
 *
 * @param {{ onComplete: (data: object) => void }} props
 */
export function ForestScene({ onComplete }) {
  const {
    phase,
    clockVisible,
    lightVisible,
    wireVisible,
    activeAmbientWhisper,
    wireWhisperRunning,
    choicesVisible,
    handleWireApproach,
    handleWireLeave,
    handleClockInteract,
    handleLightInteract,
    handleWireSequenceFullyReadyForChoices,
    finalizeChoice
  } = useForestSequence();

  const [resultPayload, setResultPayload] = useState(null);
  const completedRef = useRef(false);
  const choiceLockRef = useRef(false);

  const handleChoice = useCallback(
    (payload) => {
      if (choiceLockRef.current || completedRef.current) return;
      choiceLockRef.current = true;
      const data = finalizeChoice(payload);
      if (!data) {
        choiceLockRef.current = false;
        return;
      }
      setResultPayload(data);
    },
    [finalizeChoice]
  );

  useEffect(() => {
    if (!resultPayload || completedRef.current) return undefined;
    const id = window.setTimeout(() => {
      if (completedRef.current) return;
      completedRef.current = true;
      onComplete?.(resultPayload);
    }, 2500);
    return () => window.clearTimeout(id);
  }, [onComplete, resultPayload]);

  return (
    <div className="fixed inset-0 overflow-hidden font-sans text-stone-200">
      <ForestBackground />

      <AnimatePresence mode="wait">
        {activeAmbientWhisper ? (
          <motion.p
            key={activeAmbientWhisper}
            className="pointer-events-none absolute left-1/2 top-[14%] z-10 w-[90%] max-w-md -translate-x-1/2 text-center text-sm text-stone-400/90"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 0.92, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {activeAmbientWhisper}
          </motion.p>
        ) : null}
      </AnimatePresence>

      <OldClock visible={clockVisible} onInteract={handleClockInteract} />
      <DistantLight visible={lightVisible} onInteract={handleLightInteract} />
      <BarbWire
        visible={wireVisible}
        onApproach={handleWireApproach}
        onLeave={handleWireLeave}
      />

      <WireWhisper
        run={wireWhisperRunning}
        lines={WHISPER_AT_WIRE}
        choicesVisible={choicesVisible}
        onSequenceComplete={handleWireSequenceFullyReadyForChoices}
      />

      <ForestChoice visible={choicesVisible} choices={FOREST_CHOICES} onChoose={handleChoice} />

      <AnimatePresence>
        {resultPayload ? (
          <motion.div
            key="vignette"
            className="pointer-events-none fixed inset-0 z-50 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.88 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 2.2, ease: "easeIn" }}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
