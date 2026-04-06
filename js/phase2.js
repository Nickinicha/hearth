const ARCHETYPE_SCENARIOS = {
  "The Seeker": [
    {
      text: "They ask why you were quiet this afternoon and want reassurance right now.",
      tags: ["anxious", "fearful"]
    },
    {
      text: "They send three emotional messages quickly and ask if your feelings changed.",
      tags: ["anxious"]
    },
    {
      text: "They want to define the relationship immediately after an intense date.",
      tags: ["anxious", "secure"]
    },
    {
      text: "They feel distant and ask you to prove you still care tonight.",
      tags: ["fearful", "anxious"]
    },
    {
      text: "They fear disconnection and ask for constant updates during your workday.",
      tags: ["anxious", "avoidant"]
    }
  ],
  "The Anchor": [
    {
      text: "They suggest a weekly check-in ritual and ask what support helps you most.",
      tags: ["secure"]
    },
    {
      text: "They notice tension and invite a calm conversation with clear boundaries.",
      tags: ["secure", "fearful"]
    },
    {
      text: "They ask for honesty about pacing so both of you feel respected.",
      tags: ["secure", "avoidant"]
    },
    {
      text: "They propose a repair talk after a misunderstanding and ask for your needs.",
      tags: ["secure", "anxious"]
    },
    {
      text: "They ask how to balance closeness and personal space in a healthy way.",
      tags: ["secure", "avoidant"]
    }
  ],
  "The Nurturer": [
    {
      text: "They prioritize your feelings first and hide their own needs in the moment.",
      tags: ["fearful", "anxious"]
    },
    {
      text: "They offer help immediately, then quietly feel unseen later.",
      tags: ["fearful"]
    },
    {
      text: "They over-give emotional labor and ask for very little in return.",
      tags: ["anxious", "fearful"]
    },
    {
      text: "They avoid asking directly for support, hoping you will notice.",
      tags: ["fearful", "avoidant"]
    },
    {
      text: "They hold space for you but struggle to set limits when overwhelmed.",
      tags: ["fearful", "secure"]
    }
  ],
  "The Builder": [
    {
      text: "They focus on practical plans and skip emotional context in the conversation.",
      tags: ["avoidant"]
    },
    {
      text: "They ask for efficient communication and minimal emotional ambiguity.",
      tags: ["avoidant", "secure"]
    },
    {
      text: "They pull back during conflict and prefer to solve things later alone.",
      tags: ["avoidant", "fearful"]
    },
    {
      text: "They care deeply but express it through consistency more than words.",
      tags: ["secure", "avoidant"]
    },
    {
      text: "They want clarity and structure before becoming emotionally vulnerable.",
      tags: ["avoidant", "fearful"]
    }
  ]
};

const TURN_CHOICES = [
  {
    id: "p2-regulate-and-clarify",
    text: "Name my feeling clearly, ask what they need, and co-create a pace.",
    styleImpact: { anxious: 0, secure: 2, avoidant: 0, fearful: 0 },
    dimensions: { selfWorth: 2, motivation: 2, pattern: 2 },
    secureShiftScore: 2
  },
  {
    id: "p2-people-please",
    text: "Say yes to avoid tension, even if it crosses my limits.",
    styleImpact: { anxious: 2, secure: 0, avoidant: 0, fearful: 1 },
    dimensions: { selfWorth: -2, motivation: -1, pattern: -2 },
    secureShiftScore: -2
  },
  {
    id: "p2-withdraw",
    text: "Keep it vague and disengage to protect myself from discomfort.",
    styleImpact: { anxious: 0, secure: 0, avoidant: 2, fearful: 1 },
    dimensions: { selfWorth: 0, motivation: -1, pattern: -1 },
    secureShiftScore: -1
  },
  {
    id: "p2-mixed",
    text: "Want closeness but freeze; delay response and overanalyze intentions.",
    styleImpact: { anxious: 1, secure: 0, avoidant: 1, fearful: 2 },
    dimensions: { selfWorth: -1, motivation: -2, pattern: -2 },
    secureShiftScore: -2
  }
];

export const PHASE_2_TOTAL_TURNS = 5;

const DIFFICULTY_INTENSITY = {
  1: "The emotional pressure is low and the pacing feels manageable.",
  2: "There is moderate emotional pressure and mixed signals appear.",
  3: "The pressure is high; timing and clarity are harder to sustain.",
  4: "The pressure is intense; insecurity triggers are highly active."
};

function pickWeightedScenario(scenarios, context) {
  const { dominantStyle = "secure", difficultyTier = 1, seen = [] } = context;
  const available = scenarios.filter((item) => !seen.includes(item.text));
  const pool = available.length > 0 ? available : scenarios;

  const weighted = pool.map((item) => {
    let weight = 1;
    if (item.tags.includes(dominantStyle)) {
      weight += 2.5;
    }
    if (difficultyTier >= 3 && item.tags.includes("fearful")) {
      weight += 1;
    }
    if (difficultyTier >= 2 && item.tags.includes("avoidant")) {
      weight += 0.5;
    }
    return { item, weight };
  });

  const totalWeight = weighted.reduce((sum, item) => sum + item.weight, 0);
  let threshold = Math.random() * totalWeight;

  for (const candidate of weighted) {
    threshold -= candidate.weight;
    if (threshold <= 0) {
      return candidate.item;
    }
  }

  return weighted[weighted.length - 1].item;
}

export function getTurnScenario(archetype, turnNumber, difficultyTier = 1, context = {}) {
  const scenarios = ARCHETYPE_SCENARIOS[archetype] ?? ARCHETYPE_SCENARIOS["The Anchor"];
  const selectedScenario = pickWeightedScenario(scenarios, {
    dominantStyle: context.dominantStyle,
    difficultyTier,
    seen: context.seenScenarios ?? []
  });
  const intensity = DIFFICULTY_INTENSITY[difficultyTier] ?? DIFFICULTY_INTENSITY[1];
  return {
    text: `${selectedScenario.text} ${intensity}`,
    tags: selectedScenario.tags,
    key: `${archetype}-${turnNumber}-${selectedScenario.text}`
  };
}

export function getPhaseTwoChoices() {
  return TURN_CHOICES;
}
