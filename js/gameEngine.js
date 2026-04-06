import {
  ATTACHMENT_STYLES,
  CHARACTER_ARCHETYPES,
  DIMENSION_KEYS
} from "./config.js";

const DEFAULT_STATE = {
  phase: 1,
  scene: 1,
  scores: {
    anxious: 0,
    secure: 0,
    avoidant: 0,
    fearful: 0
  },
  dimensions: {
    selfWorth: 0,
    motivation: 0,
    pattern: 0
  },
  archetypeScores: {
    "The Seeker": 0,
    "The Anchor": 0,
    "The Nurturer": 0,
    "The Builder": 0
  },
  selectedArchetype: null,
  history: []
};

export class GameEngine {
  constructor(initialState = DEFAULT_STATE) {
    this.state = structuredClone(initialState);
  }

  getState() {
    return structuredClone(this.state);
  }

  applyChoice(choice, options = {}) {
    const { id, text, styleImpact = {}, dimensions = {}, archetypeHint = null } =
      choice;
    const { dimensionWeights = {} } = options;

    ATTACHMENT_STYLES.forEach((style) => {
      this.state.scores[style] += styleImpact[style] ?? 0;
    });

    DIMENSION_KEYS.forEach((key) => {
      const baseDelta = dimensions[key] ?? 0;
      const weight = dimensionWeights[key] ?? 1;
      this.state.dimensions[key] += baseDelta * weight;
    });

    if (archetypeHint) {
      if (this.state.archetypeScores[archetypeHint] !== undefined) {
        this.state.archetypeScores[archetypeHint] += 1;
      }
      this.state.selectedArchetype = archetypeHint;
    }

    this.state.history.push({
      phase: this.state.phase,
      scene: this.state.scene,
      choiceId: id,
      choiceText: text
    });
  }

  getTopAttachmentStyle() {
    return ATTACHMENT_STYLES.reduce((best, current) => {
      const bestValue = this.state.scores[best];
      const currentValue = this.state.scores[current];
      return currentValue > bestValue ? current : best;
    }, ATTACHMENT_STYLES[0]);
  }

  getTopArchetype() {
    return CHARACTER_ARCHETYPES.reduce((best, current) => {
      const bestValue = this.state.archetypeScores[best];
      const currentValue = this.state.archetypeScores[current];
      return currentValue > bestValue ? current : best;
    }, CHARACTER_ARCHETYPES[0]);
  }

  getDerivedPattern() {
    return this.state.dimensions.pattern >= 0 ? "love" : "fear";
  }

  reset() {
    this.state = structuredClone(DEFAULT_STATE);
  }
}
