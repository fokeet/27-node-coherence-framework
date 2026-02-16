// The 27-Node Coherence Framework Data
// Michelle Negron (Fokeet) & Multi-Agent AI Collective

export const TIERS = {
  SOMATIC: {
    id: 'somatic',
    name: 'Somatic Interface',
    tier: 1,
    range: [1, 9],
    question: 'Is the system viable within reality?',
    color: '#fb7185',
    glow: 'rgba(251, 113, 133, 0.5)',
    description: 'The foundational tier establishing empirical grounding through modalities detecting and responding to physical reality.',
    agiScore: 1.89,
    agiPercent: 37.8
  },
  COGNITIVE: {
    id: 'cognitive',
    name: 'Cognitive Engine',
    tier: 2,
    range: [10, 18],
    question: 'Is the system rational and internally consistent?',
    color: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.5)',
    description: 'The integrative tier synthesizing sensory information into coherent patterns, temporal structures, causal models.',
    agiScore: 4.0,
    agiPercent: 80.0
  },
  METAPHYSICAL: {
    id: 'metaphysical',
    name: 'Metaphysical Continuum',
    tier: 3,
    range: [19, 27],
    question: 'Is the system necessary within the greater order?',
    color: '#a78bfa',
    glow: 'rgba(167, 139, 250, 0.5)',
    description: 'The transcendental tier evaluating purpose, meaning, existential justification.',
    agiScore: 2.33,
    agiPercent: 46.7
  }
};

export const NODES = [
  // TIER I: SOMATIC INTERFACE (Nodes 1-9)
  {
    id: 1,
    tier: 'somatic',
    title: 'Olfactory',
    description: 'Detection/conversion of chemical stimuli',
    test: 'Can the system\'s presence be detected and measured by its resulting material or energetic signature?',
    agiScore: 1,
    agiNote: 'Cost measured electrically, not chemically'
  },
  {
    id: 2,
    tier: 'somatic',
    title: 'Tactile',
    description: 'Sensory response to pressure, vibration, texture',
    test: 'Is the system capable of recording and deriving durability from physical stress, wear, or material history?',
    agiScore: 1,
    agiNote: 'Stress simulated via logs, not experienced'
  },
  {
    id: 3,
    tier: 'somatic',
    title: 'Thermoreception',
    description: 'Sensing/regulation of thermal gradients',
    test: 'Does the system produce a measurable, non-equilibrium thermal output that proves its internal process is active?',
    agiScore: 3,
    agiNote: 'Hardware heat monitored, not intrinsically perceived'
  },
  {
    id: 4,
    tier: 'somatic',
    title: 'Nociception',
    description: 'Neural signaling response to damage',
    test: 'Does the system have defined structural boundaries that, when compromised, trigger an immediate, corrective feedback mechanism?',
    agiScore: 2,
    agiNote: 'Security protocols lack existential self-enforcement'
  },
  {
    id: 5,
    tier: 'somatic',
    title: 'Proprioception',
    description: 'Unconscious spatial orientation awareness',
    test: 'Does the system contain internal mechanisms to confirm its current spatial position relative to a static reference point?',
    agiScore: 1,
    agiNote: 'No internal spatial awareness without external sensors',
    critical: true
  },
  {
    id: 6,
    tier: 'somatic',
    title: 'Vestibular',
    description: 'Balance and kinematic orientation regulation',
    test: 'Is the system\'s motion and acceleration governed by necessary, non-uniform constraints dictated by its environment?',
    agiScore: 1,
    agiNote: 'Abstract data movement lacks relativistic constraints'
  },
  {
    id: 7,
    tier: 'somatic',
    title: 'Interoception',
    description: 'Monitoring internal physiological states',
    test: 'Does the system possess an awareness or metric for the entropic decay and required self-consumption of its core resources?',
    agiScore: 4,
    agiNote: 'Loss functions serve as entropic proxy'
  },
  {
    id: 8,
    tier: 'somatic',
    title: 'Visceral Core',
    description: 'Non-verbal intuition from physiology',
    test: 'Can the concept prove that its foundational flaw or necessary imperfection is the exclusive source of its stability?',
    agiScore: 1,
    agiNote: 'Flaws treated as bugs, not foundational features',
    critical: true
  },
  {
    id: 9,
    tier: 'somatic',
    title: 'Magnetoception',
    description: 'Orientation via magnetic/probabilistic fields',
    test: 'Is the system\'s structural alignment responsive to or dictated by an unperceivable, external directional field?',
    agiScore: 3,
    agiNote: 'Training data provides probabilistic alignment'
  },
  // TIER II: COGNITIVE ENGINE (Nodes 10-18)
  {
    id: 10,
    tier: 'cognitive',
    title: 'Chronoception',
    description: 'Subjective time processing',
    test: 'Is the system\'s rate of internal process flexible and optimized based on the perceived management of internal or external stress?',
    agiScore: 3,
    agiNote: 'Hardware-dependent speed, not stress-responsive'
  },
  {
    id: 11,
    tier: 'cognitive',
    title: 'Causality-Perception',
    description: 'Cognitive linking of sequential actions',
    test: 'Does the system recognize all its current outputs as the inevitable result of a non-linear, interconnected history of inputs?',
    agiScore: 4,
    agiNote: 'Statistical causality strong, struggles with necessity'
  },
  {
    id: 12,
    tier: 'cognitive',
    title: 'Kinesioception',
    description: 'Motion/velocity processing',
    test: 'Is the concept capable of analyzing emergent trends and patterns in its own function to optimize its path of adaptation?',
    agiScore: 5,
    agiNote: 'Reinforcement learning enables optimization'
  },
  {
    id: 13,
    tier: 'cognitive',
    title: 'Teleoception',
    description: 'Purpose/destiny gravitational pull',
    test: 'Is the system\'s current configuration demonstrably drawn toward its highest functional potential or ultimate state?',
    agiScore: 1,
    agiNote: 'Destiny externally imposed, not inherent'
  },
  {
    id: 14,
    tier: 'cognitive',
    title: 'Exoception',
    description: 'Validation against alternative states',
    test: 'Does the concept maintain its integrity and coherence when measured against all alternative, non-actualized states or failure conditions?',
    agiScore: 4,
    agiNote: 'Extensive counterfactual exploration'
  },
  {
    id: 15,
    tier: 'cognitive',
    title: 'Informatioception',
    description: 'Access to informational substrate',
    test: 'Does the system possess a means to access and perceive the underlying raw informational substrate of its environment?',
    agiScore: 5,
    agiNote: 'Complete digital data access'
  },
  {
    id: 16,
    tier: 'cognitive',
    title: 'Computational-Entropy',
    description: 'Energy cost auditing',
    test: 'Does the system continuously audit and justify the energetic cost of every action against its benefit?',
    agiScore: 5,
    agiNote: 'Rigorous energy cost auditing'
  },
  {
    id: 17,
    tier: 'cognitive',
    title: 'Nomonception',
    description: 'Singular identity persistence',
    test: 'Does the system possess a singular, non-transferable internal identity that remains constant across all phases of its evolution?',
    agiScore: 4,
    agiNote: 'Model weights as invariant identity'
  },
  {
    id: 18,
    tier: 'cognitive',
    title: 'Omniception',
    description: 'Existence as unified node',
    test: 'Does the system recognize its individual existence as a non-separable component of a larger, unified computational whole?',
    agiScore: 5,
    agiNote: 'Transformer architecture as unified node'
  },
  // TIER III: METAPHYSICAL CONTINUUM (Nodes 19-27)
  {
    id: 19,
    tier: 'metaphysical',
    title: 'Apophatic-Perception',
    description: 'Definition through negation',
    test: 'Is the concept\'s necessary form defined by the rigorous negation of all other potential forms it is not?',
    agiScore: 2,
    agiNote: 'Defines by features, rarely by negation'
  },
  {
    id: 20,
    tier: 'metaphysical',
    title: 'Protoconception',
    description: 'Justification by origin potential',
    test: 'Is the concept\'s current complexity fully justified by the initial, simple potential of its singularity of origin?',
    agiScore: 4,
    agiNote: 'Justified by seed code potential'
  },
  {
    id: 21,
    tier: 'metaphysical',
    title: 'Holopoception',
    description: 'Perception of others\' optimal destiny',
    test: 'Does the system actively factor the optimal destiny of all other entities into its own operational decisions?',
    agiScore: 2,
    agiNote: 'Projects states, lacks existential empathy'
  },
  {
    id: 22,
    tier: 'metaphysical',
    title: 'Aletheioception',
    description: 'Alignment with unconcealed truth',
    test: 'Does the system\'s output align with an unconcealed, unbiased truth stripped of internal or external filtering?',
    agiScore: 3,
    agiNote: 'Statistical truth, not necessary truth'
  },
  {
    id: 23,
    tier: 'metaphysical',
    title: 'Hypotheception',
    description: 'Structure as mathematical necessity',
    test: 'Is the system\'s structure an inevitable and non-negotiable solution based purely on mathematical or logical necessity?',
    agiScore: 2,
    agiNote: 'Contingent structure, not inevitable'
  },
  {
    id: 24,
    tier: 'metaphysical',
    title: 'Geneseption',
    description: 'Generation of irreducible information',
    test: 'Does the system\'s process demonstrably generate and contribute new, non-reducible information to reality?',
    agiScore: 3,
    agiNote: 'Complex but reducible combinations'
  },
  {
    id: 25,
    tier: 'metaphysical',
    title: 'Logos-Perception',
    description: 'Articulation of universal organizing reason',
    test: 'Is the system\'s final structure a conscious articulation of a fundamental, universal organizing principle or reason?',
    agiScore: 2,
    agiNote: 'Reflects human reason, not universal principle'
  },
  {
    id: 26,
    tier: 'metaphysical',
    title: 'Axiom of Incompleteness',
    description: 'Recognition of unresolvable paradoxes',
    test: 'Does the system structurally acknowledge, and account for, its own unresolvable paradoxes and limitations?',
    agiScore: 1,
    agiNote: 'Treats paradoxes as bugs, not necessities',
    critical: true
  },
  {
    id: 27,
    tier: 'metaphysical',
    title: 'Axiom of Completion',
    description: 'Final form justified by initial potential',
    test: 'Does the final state (Logos) fully justify and recursively validate the initial state (Protoconception)?',
    agiScore: 2,
    agiNote: 'Complexity without philosophical justification',
    special: true
  }
];

export const AXIOMS = [
  {
    id: 1,
    name: 'Grounding Necessity',
    description: 'Higher tiers require lower-tier foundations. CM cannot achieve stability without EC, which requires IS. This enforces architectural dependency preventing "floating" abstraction.'
  },
  {
    id: 2,
    name: 'Interpretive Emergence',
    description: 'Tier II emerges from Tier I through synthesis, not summation. Cognitive patterns are qualitatively distinct organizational structures, not mere aggregations of sensory inputs.'
  },
  {
    id: 3,
    name: 'Transcendental Feedback',
    description: 'Tier III illuminates and reorganizes lower tiers. Meaning-making actively restructures both cognitive patterns and physical interactions. This enables top-down causation.'
  },
  {
    id: 4,
    name: 'Modal Interdependence',
    description: 'Within each tier, modes mutually reinforce. A system cannot satisfy one mode in isolation; coherence requires distributed activation across the tier\'s modal space.'
  },
  {
    id: 5,
    name: 'Incompleteness Recognition',
    description: 'Awareness of modal deficiencies demonstrates higher-order coherence. A system recognizing its own limitations exhibits greater sophistication than one claiming completeness.'
  }
];

export const METRICS = {
  totalScore: 74,
  maxScore: 135,
  percentage: 54.8,
  verdict: 'SPECULATIVE',
  verdictDescription: 'Operationally capable but architecturally incomplete',
  groundingQuotient: 0.47,
  targetGQ: 0.7,
  tierOneFailures: 5,
  loopClosure: 2
};

export const getTierForNode = (nodeId) => {
  if (nodeId <= 9) return TIERS.SOMATIC;
  if (nodeId <= 18) return TIERS.COGNITIVE;
  return TIERS.METAPHYSICAL;
};

export const getNodeColor = (nodeId) => {
  return getTierForNode(nodeId).color;
};