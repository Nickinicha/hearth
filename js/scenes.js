export const PHASE_1_SCENES = [
  {
    id: "p1s1-intro",
    phaseLabel: "Phase 1 - Self Discovery",
    sceneLabel: "Scene 1 of 3",
    title: "The First Message",
    description:
      "A match you genuinely like has not replied for 6 hours. What do you do next?",
    choices: [
      {
        id: "double-text",
        text: "Send another message to make sure they do not forget me.",
        archetypeHint: "The Seeker",
        styleImpact: { anxious: 2, secure: 0, avoidant: 0, fearful: 1 },
        dimensions: { selfWorth: -1, motivation: -1, pattern: -2 }
      },
      {
        id: "balanced-checkin",
        text: "Take a breath, continue my day, and send one clear check-in later.",
        archetypeHint: "The Anchor",
        styleImpact: { anxious: 0, secure: 2, avoidant: 0, fearful: 0 },
        dimensions: { selfWorth: 2, motivation: 2, pattern: 2 }
      },
      {
        id: "pull-away",
        text: "Assume they are not serious and emotionally pull away immediately.",
        archetypeHint: "The Builder",
        styleImpact: { anxious: 0, secure: 0, avoidant: 2, fearful: 1 },
        dimensions: { selfWorth: 0, motivation: -1, pattern: -1 }
      },
      {
        id: "mixed-signal",
        text: "Want closeness but feel unsafe, so I stay silent and overthink.",
        archetypeHint: "The Nurturer",
        styleImpact: { anxious: 1, secure: 0, avoidant: 1, fearful: 2 },
        dimensions: { selfWorth: -1, motivation: -2, pattern: -2 }
      }
    ]
  },
  {
    id: "p1s2-boundary",
    phaseLabel: "Phase 1 - Self Discovery",
    sceneLabel: "Scene 2 of 3",
    title: "The Boundary Moment",
    description:
      "Someone you like asks for more access to your time than you can give this week. How do you respond?",
    choices: [
      {
        id: "over-give",
        text: "Say yes to everything so they will not lose interest in me.",
        archetypeHint: "The Seeker",
        styleImpact: { anxious: 2, secure: 0, avoidant: 0, fearful: 1 },
        dimensions: { selfWorth: -2, motivation: -1, pattern: -2 }
      },
      {
        id: "clear-boundary",
        text: "Be warm and honest: set a clear boundary, suggest another time.",
        archetypeHint: "The Anchor",
        styleImpact: { anxious: 0, secure: 2, avoidant: 0, fearful: 0 },
        dimensions: { selfWorth: 2, motivation: 2, pattern: 2 }
      },
      {
        id: "detach-fast",
        text: "Feel pressured and shut down the connection before discussing it.",
        archetypeHint: "The Builder",
        styleImpact: { anxious: 0, secure: 0, avoidant: 2, fearful: 1 },
        dimensions: { selfWorth: 0, motivation: -1, pattern: -1 }
      },
      {
        id: "conflicted-boundary",
        text: "Need closeness but fear conflict, so avoid replying for a while.",
        archetypeHint: "The Nurturer",
        styleImpact: { anxious: 1, secure: 0, avoidant: 1, fearful: 2 },
        dimensions: { selfWorth: -1, motivation: -2, pattern: -2 }
      }
    ]
  },
  {
    id: "p1s3-repair",
    phaseLabel: "Phase 1 - Self Discovery",
    sceneLabel: "Scene 3 of 3",
    title: "After a Misunderstanding",
    description:
      "A small conflict happens and both of you feel misunderstood. What is your first move?",
    choices: [
      {
        id: "chase-reassurance",
        text: "Push for immediate reassurance because uncertainty feels unbearable.",
        archetypeHint: "The Seeker",
        styleImpact: { anxious: 2, secure: 0, avoidant: 0, fearful: 1 },
        dimensions: { selfWorth: -1, motivation: -1, pattern: -2 }
      },
      {
        id: "repair-openly",
        text: "Pause, regulate, then name feelings and invite a calm repair talk.",
        archetypeHint: "The Anchor",
        styleImpact: { anxious: 0, secure: 2, avoidant: 0, fearful: 0 },
        dimensions: { selfWorth: 2, motivation: 2, pattern: 2 }
      },
      {
        id: "stonewall",
        text: "Withdraw and focus on being independent so I cannot be hurt.",
        archetypeHint: "The Builder",
        styleImpact: { anxious: 0, secure: 0, avoidant: 2, fearful: 1 },
        dimensions: { selfWorth: 0, motivation: -1, pattern: -1 }
      },
      {
        id: "freeze-cycle",
        text: "Want to reconnect but freeze from fear, waiting for them to lead.",
        archetypeHint: "The Nurturer",
        styleImpact: { anxious: 1, secure: 0, avoidant: 1, fearful: 2 },
        dimensions: { selfWorth: -1, motivation: -2, pattern: -2 }
      }
    ]
  }
];
