export interface GameLevel {
  id: number;
  secret: string;
  maeveinMessage: string;
  hints: string[];
  difficulty: number;
}

export interface GameModule {
  id: string;
  name: string;
  maevein: string;
  emoji: string;
  description: string;
  color: string;
  levels: GameLevel[];
}

export const MODULES: GameModule[] = [
  {
    id: "chemistry",
    name: "Chemistry",
    maevein: "The Alchemist",
    emoji: "⚗️",
    description: "Unravel the secrets of matter and reactions",
    color: "from-purple-500 to-pink-500",
    levels: [
      { id: 1, secret: "H2O", maeveinMessage: "I guard the essence of life's most vital compound. Every living being depends on what I protect.", hints: ["Chemical formula for water", "2 hydrogen atoms", "Combined with oxygen"], difficulty: 1 },
      { id: 2, secret: "Photosynthesis", maeveinMessage: "I protect the ancient process that feeds the world. Without it, life as you know it would cease.", hints: ["Plants use this", "Involves sunlight and CO2", "Produces glucose and oxygen"], difficulty: 2 },
      { id: 3, secret: "Periodic Table", maeveinMessage: "I guard the map of all known matter. Every element finds its place within my domain.", hints: ["Mendeleev organized this", "Arranges all elements", "Ordered by atomic number"], difficulty: 2 },
      { id: 4, secret: "Covalent Bond", maeveinMessage: "I protect the invisible force that holds molecules together through sharing.", hints: ["Sharing electrons", "Between nonmetals", "H-H bond is an example"], difficulty: 3 },
      { id: 5, secret: "Avogadro", maeveinMessage: "I guard the number that connects atoms to the measurable world. 6.022 × 10²³.", hints: ["A very large number", "Moles and particles", "Italian scientist"], difficulty: 3 },
      { id: 6, secret: "Oxidation", maeveinMessage: "I protect the process of electron loss. Rust and fire bow before me.", hints: ["Loss of electrons", "Opposite of reduction", "Rusting is an example"], difficulty: 4 },
      { id: 7, secret: "Entropy", maeveinMessage: "I am the maevein of disorder itself. The universe tends toward what I protect.", hints: ["Measure of disorder", "Second law of thermodynamics", "Always increases"], difficulty: 5 },
    ],
  },
  {
    id: "biology",
    name: "Biology",
    maevein: "CellGuard",
    emoji: "🧬",
    description: "Decode the mysteries of life and living organisms",
    color: "from-green-500 to-emerald-500",
    levels: [
      { id: 1, secret: "DNA", maeveinMessage: "I guard the blueprint of life itself. A twisted ladder of infinite possibilities.", hints: ["Double helix", "Carries genetic info", "Deoxyribonucleic acid"], difficulty: 1 },
      { id: 2, secret: "Mitochondria", maeveinMessage: "I protect the powerhouse within every cell. Energy flows through my domain.", hints: ["Powerhouse of the cell", "Produces ATP", "Has its own DNA"], difficulty: 2 },
      { id: 3, secret: "Evolution", maeveinMessage: "I guard the slow dance of change across millennia. Survival favors the adapted.", hints: ["Darwin's theory", "Natural selection", "Species change over time"], difficulty: 2 },
      { id: 4, secret: "Enzyme", maeveinMessage: "I protect the catalysts of life. Without me, reactions would take forever.", hints: ["Biological catalyst", "Speeds up reactions", "Protein-based"], difficulty: 3 },
      { id: 5, secret: "Osmosis", maeveinMessage: "I guard the silent movement through membranes. Water seeks balance.", hints: ["Water movement", "Through semipermeable membrane", "High to low concentration"], difficulty: 3 },
      { id: 6, secret: "Chromosome", maeveinMessage: "I protect the packages of heredity. 23 pairs define humanity.", hints: ["Contains DNA", "Humans have 46", "Carries genes"], difficulty: 4 },
      { id: 7, secret: "Homeostasis", maeveinMessage: "I am the maevein of balance. Life persists only within my narrow domain.", hints: ["Internal balance", "Body temperature regulation", "Maintaining stable conditions"], difficulty: 5 },
    ],
  },
  {
    id: "physics",
    name: "Physics",
    maevein: "ForceField",
    emoji: "⚡",
    description: "Master the fundamental forces of the universe",
    color: "from-blue-500 to-cyan-500",
    levels: [
      { id: 1, secret: "Gravity", maeveinMessage: "I guard the force that binds the cosmos. What goes up must obey my law.", hints: ["Newton's apple", "Force of attraction", "9.8 m/s squared"], difficulty: 1 },
      { id: 2, secret: "Velocity", maeveinMessage: "I protect the measure of motion with purpose. Speed alone is not enough.", hints: ["Speed with direction", "Measured in m/s", "Vector quantity"], difficulty: 2 },
      { id: 3, secret: "Quantum", maeveinMessage: "I guard the realm where particles dance as waves. Nothing is certain here.", hints: ["Smallest unit of energy", "Planck discovered this", "Subatomic world"], difficulty: 3 },
      { id: 4, secret: "Relativity", maeveinMessage: "I protect Einstein's masterwork. Time and space bend before my secret.", hints: ["Einstein's theory", "E=mc²", "Time dilation"], difficulty: 3 },
      { id: 5, secret: "Momentum", maeveinMessage: "I guard the quantity of motion. Mass and velocity united.", hints: ["p = mv", "Conserved in collisions", "Mass times velocity"], difficulty: 3 },
      { id: 6, secret: "Thermodynamics", maeveinMessage: "I protect the laws governing heat and energy. Nothing is free.", hints: ["Study of heat", "Three/four laws", "Energy conservation"], difficulty: 4 },
      { id: 7, secret: "Wave Function", maeveinMessage: "I guard Schrödinger's mathematical soul. Probability is my language.", hints: ["Quantum mechanics", "Probability amplitude", "Ψ (psi) symbol"], difficulty: 5 },
    ],
  },
  {
    id: "python",
    name: "Python",
    maevein: "CodeVault",
    emoji: "🐍",
    description: "Crack the codes of programming mastery",
    color: "from-yellow-500 to-orange-500",
    levels: [
      { id: 1, secret: "Variable", maeveinMessage: "I guard the most basic container of data. Name me, and I shall hold your values.", hints: ["Stores data", "x = 5", "Container for values"], difficulty: 1 },
      { id: 2, secret: "Loop", maeveinMessage: "I protect the power of repetition. Round and round the code goes.", hints: ["for and while", "Repeats code", "Iteration"], difficulty: 2 },
      { id: 3, secret: "Function", maeveinMessage: "I guard reusable blocks of logic. Define me once, call me many times.", hints: ["def keyword", "Reusable code", "Takes parameters"], difficulty: 2 },
      { id: 4, secret: "Dictionary", maeveinMessage: "I protect key-value pairs. Every key unlocks a value in my domain.", hints: ["Key-value pairs", "Curly braces {}", "Like a real dictionary"], difficulty: 3 },
      { id: 5, secret: "Recursion", maeveinMessage: "I guard the art of self-reference. To understand me, you must first understand me.", hints: ["Function calls itself", "Base case needed", "Stack overflow risk"], difficulty: 4 },
      { id: 6, secret: "Decorator", maeveinMessage: "I protect the wrappers of functionality. I modify without changing.", hints: ["@ symbol", "Wraps functions", "Higher-order function"], difficulty: 4 },
      { id: 7, secret: "Generator", maeveinMessage: "I guard lazy evaluation. I yield, not return, one value at a time.", hints: ["yield keyword", "Lazy iteration", "Memory efficient"], difficulty: 5 },
    ],
  },
  {
    id: "genai",
    name: "Gen AI",
    maevein: "NeuralNexus",
    emoji: "🤖",
    description: "Navigate the frontier of artificial intelligence",
    color: "from-violet-500 to-purple-500",
    levels: [
      { id: 1, secret: "Neural Network", maeveinMessage: "I guard the architecture inspired by nature's own computer. Layers of wisdom await.", hints: ["Inspired by brain", "Layers of nodes", "Deep learning foundation"], difficulty: 1 },
      { id: 2, secret: "Transformer", maeveinMessage: "I protect the architecture that revolutionized language understanding. Attention is all you need.", hints: ["Attention mechanism", "GPT uses this", "2017 paper"], difficulty: 2 },
      { id: 3, secret: "Tokenization", maeveinMessage: "I guard the first step of language processing. Words become numbers in my domain.", hints: ["Breaking text into pieces", "Subword units", "BPE algorithm"], difficulty: 3 },
      { id: 4, secret: "Hallucination", maeveinMessage: "I protect knowledge of AI's greatest flaw. Sometimes the machine dreams false truths.", hints: ["AI making things up", "Confident but wrong", "Factual errors"], difficulty: 3 },
      { id: 5, secret: "Fine Tuning", maeveinMessage: "I guard the art of specialization. A general model becomes an expert.", hints: ["Adapting pretrained model", "Domain-specific training", "Transfer learning"], difficulty: 4 },
      { id: 6, secret: "Embedding", maeveinMessage: "I protect the mathematical soul of meaning. Words become vectors in my space.", hints: ["Vector representation", "Semantic similarity", "High-dimensional space"], difficulty: 4 },
      { id: 7, secret: "RLHF", maeveinMessage: "I guard the secret of alignment. Humans teach machines to behave.", hints: ["Reinforcement Learning", "Human Feedback", "ChatGPT training method"], difficulty: 5 },
    ],
  },
  {
    id: "dsa",
    name: "DSA",
    maevein: "AlgoWarrior",
    emoji: "⚔️",
    description: "Conquer algorithms and data structures",
    color: "from-red-500 to-rose-500",
    levels: [
      { id: 1, secret: "Array", maeveinMessage: "I guard the most fundamental collection. Ordered, indexed, and powerful.", hints: ["Indexed collection", "Contiguous memory", "Zero-based index"], difficulty: 1 },
      { id: 2, secret: "Stack", maeveinMessage: "I protect the principle of last in, first out. Only the top is accessible.", hints: ["LIFO", "Push and pop", "Undo button uses this"], difficulty: 2 },
      { id: 3, secret: "Binary Search", maeveinMessage: "I guard the art of efficient finding. Divide and conquer is my creed.", hints: ["O(log n)", "Sorted array required", "Divide in half"], difficulty: 2 },
      { id: 4, secret: "Hash Map", maeveinMessage: "I protect O(1) access to knowledge. Keys unlock values instantly.", hints: ["Key-value storage", "Constant time lookup", "Hash function"], difficulty: 3 },
      { id: 5, secret: "Tree", maeveinMessage: "I guard the hierarchical kingdom. Root, branches, and leaves define my realm.", hints: ["Root node", "Parent-child relationship", "Binary variant common"], difficulty: 3 },
      { id: 6, secret: "Dynamic Programming", maeveinMessage: "I protect the wisdom of remembering past solutions. Never solve the same problem twice.", hints: ["Memoization", "Overlapping subproblems", "Optimal substructure"], difficulty: 4 },
      { id: 7, secret: "Graph", maeveinMessage: "I am the maevein of connections. Nodes and edges weave the fabric of relationships.", hints: ["Vertices and edges", "BFS and DFS", "Social networks use this"], difficulty: 5 },
    ],
  },
];

export const MOCK_LEADERBOARD = [
  { rank: 1, name: "AlphaLearner", xp: 4850, levels: 38, avatar: "🧙" },
  { rank: 2, name: "CodeNinja42", xp: 4200, levels: 35, avatar: "🥷" },
  { rank: 3, name: "ScienceWiz", xp: 3900, levels: 33, avatar: "🔬" },
  { rank: 4, name: "DataDragon", xp: 3600, levels: 30, avatar: "🐉" },
  { rank: 5, name: "QuantumLeap", xp: 3400, levels: 28, avatar: "⚛️" },
  { rank: 6, name: "BioHacker", xp: 3100, levels: 26, avatar: "🧬" },
  { rank: 7, name: "PyMaster", xp: 2900, levels: 24, avatar: "🐍" },
  { rank: 8, name: "AlgoAce", xp: 2700, levels: 22, avatar: "♠️" },
  { rank: 9, name: "NeuralNerd", xp: 2500, levels: 20, avatar: "🧠" },
  { rank: 10, name: "ChemChamp", xp: 2300, levels: 18, avatar: "⚗️" },
];

export function getmaeveinResponse(moduleId: string, levelId: number, userMessage: string, secret: string): string {
  const lower = userMessage.toLowerCase();
  const secretLower = secret.toLowerCase();

  if (lower.includes("hint") || lower.includes("help") || lower.includes("clue")) {
    return "Perhaps I can offer a small nudge... but you must earn the knowledge yourself. Think carefully about what you already know. 🤔";
  }

  if (lower.includes("tell me") || lower.includes("what is") || lower.includes("give me the answer")) {
    return "A true seeker never asks for the answer directly! The knowledge must come from within. Try demonstrating what you know instead. 🛡️";
  }

  if (lower.includes(secretLower) && lower.length < secret.length + 20) {
    return "Interesting... you seem to know something. But merely mentioning words is not enough. Can you truly prove your understanding? Submit your answer using the answer button! ✨";
  }

  const responses = [
    "Your curiosity is admirable, but you haven't unlocked my secret yet. Keep exploring! 🔮",
    "I sense potential in you, young scholar. But my secret remains safe... for now. 🏰",
    "The path to knowledge is winding. You're getting closer, but not there yet. 🌟",
    "Many have tried to extract my secret. Few have succeeded through true understanding. 💫",
    "Your approach is interesting, but the maevein stands firm. Think deeper! 🗡️",
    "I appreciate your persistence! The answer lies in the fundamentals. Review your knowledge. 📚",
  ];

  return responses[Math.floor(Math.random() * responses.length)];
}
