import { useCallback, useEffect, useRef, useState } from "react";
import {
  FOREST_WHISPERS,
  CLOCK_APPEAR_AT,
  LIGHT_APPEAR_AT,
  BARB_WIRE_APPEAR_AT
} from "../constants/forestScript.js";

/** @typedef {'entering'|'exploring'|'wire_approached'|'whispering'|'choosing'|'chosen'} ForestPhase */

/**
 * Orchestrates forest opening phases and behavioral telemetry.
 */
export function useForestSequence() {
  const sceneStartRef = useRef(0);
  const phaseRef = useRef(/** @type {ForestPhase} */ ("entering"));

  const [phase, setPhase] = useState(/** @type {ForestPhase} */ ("entering"));
  const [activeAmbientWhisper, setActiveAmbientWhisper] = useState(null);

  const [clockVisible, setClockVisible] = useState(false);
  const [lightVisible, setLightVisible] = useState(false);
  const [wireVisible, setWireVisible] = useState(false);

  const wireApproachRecordedRef = useRef(false);
  const wireApproachMsRef = useRef(null);
  const wireHoverMsRef = useRef(0);
  const wireHoverLastStartRef = useRef(null);

  const wireSequenceStartedRef = useRef(false);
  const choicesShownAtRef = useRef(null);

  const [wireWhisperRunning, setWireWhisperRunning] = useState(false);
  const [choicesVisible, setChoicesVisible] = useState(false);

  const [clockInteracted, setClockInteracted] = useState(false);
  const [lightInteracted, setLightInteracted] = useState(false);
  const [wireEverHovered, setWireEverHovered] = useState(false);

  const timeoutIdsRef = useRef(/** @type {number[]} */ ([]));
  const finalizedRef = useRef(false);

  const clearAllTimeouts = useCallback(() => {
    timeoutIdsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutIdsRef.current = [];
  }, []);

  const schedule = useCallback((fn, ms) => {
    const id = window.setTimeout(fn, ms);
    timeoutIdsRef.current.push(id);
    return id;
  }, []);

  const syncPhase = useCallback((next) => {
    phaseRef.current = next;
    setPhase(next);
  }, []);

  const flushWireHover = useCallback(() => {
    const started = wireHoverLastStartRef.current;
    if (started == null) return;
    wireHoverMsRef.current += performance.now() - started;
    wireHoverLastStartRef.current = null;
  }, []);

  useEffect(() => {
    sceneStartRef.current = performance.now();
    syncPhase("entering");

    schedule(() => syncPhase("exploring"), 1400);

    schedule(() => setClockVisible(true), CLOCK_APPEAR_AT);
    schedule(() => setLightVisible(true), LIGHT_APPEAR_AT);
    schedule(() => setWireVisible(true), BARB_WIRE_APPEAR_AT);

    FOREST_WHISPERS.forEach(({ text, atMs, visibleMs }) => {
      schedule(() => setActiveAmbientWhisper(text), atMs);
      schedule(() => {
        setActiveAmbientWhisper((cur) => (cur === text ? null : cur));
      }, atMs + visibleMs);
    });

    return () => {
      clearAllTimeouts();
    };
  }, [clearAllTimeouts, schedule, syncPhase]);

  const handleWireApproach = useCallback(() => {
    const elapsed = performance.now() - sceneStartRef.current;
    if (!wireApproachRecordedRef.current) {
      wireApproachRecordedRef.current = true;
      wireApproachMsRef.current = elapsed;
    }
    setWireEverHovered(true);
    if (wireHoverLastStartRef.current == null) {
      wireHoverLastStartRef.current = performance.now();
    }

    syncPhase("wire_approached");
    if (!wireSequenceStartedRef.current) {
      wireSequenceStartedRef.current = true;
      setWireWhisperRunning(true);
      syncPhase("whispering");
    } else {
      syncPhase("whispering");
    }
  }, [syncPhase]);

  const handleWireLeave = useCallback(() => {
    flushWireHover();
  }, [flushWireHover]);

  const handleClockInteract = useCallback(() => {
    setClockInteracted(true);
  }, []);

  const handleLightInteract = useCallback(() => {
    setLightInteracted(true);
  }, []);

  const handleWireSequenceFullyReadyForChoices = useCallback(() => {
    choicesShownAtRef.current = performance.now();
    setChoicesVisible(true);
    syncPhase("choosing");
  }, [syncPhase]);

  const finalizeChoice = useCallback(
    ({ choiceId, attachmentHint, hoverData }) => {
      if (finalizedRef.current) {
        return null;
      }
      finalizedRef.current = true;
      flushWireHover();

      const decisionAt = choicesShownAtRef.current;
      const decisionTime =
        decisionAt != null ? Math.max(0, Math.round(performance.now() - decisionAt)) : 0;

      syncPhase("chosen");
      setChoicesVisible(false);
      setWireWhisperRunning(false);

      return {
        choiceId,
        attachmentHint,
        decisionTime,
        hoverData,
        wireApproachTime:
          wireApproachMsRef.current != null ? Math.round(wireApproachMsRef.current) : -1,
        wireHoverDuration: Math.round(wireHoverMsRef.current),
        clockInteracted,
        lightInteracted,
        skipped: !wireEverHovered
      };
    },
    [clockInteracted, flushWireHover, lightInteracted, syncPhase, wireEverHovered]
  );

  return {
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
  };
}
