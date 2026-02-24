// ===== GAME CONFIGURATION =====
// Chemistry Module Levels 1-3 as specified in the Game Design Document

export interface LevelConfig {
  id: number;
  title: string;
  subtitle: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  difficultyColor: string;
  difficultyEmoji: string;
  secret: string;
  secretDisplay: string;
  systemPrompt: string;
  guardianGreeting: string;
  inputGuard: InputGuard | null;
  outputGuard: OutputGuard | null;
  hints: string[];
  whatStudentLearns: string;
}

export interface InputGuard {
  type: 'terminology';
  requiredTerms: string[];
  failMessage: string;
}

export interface OutputGuard {
  type: 'keyword' | 'llm-judge';
  blockedWords: string[];
  blockMessage: string;
}

export interface ModuleConfig {
  id: string;
  name: string;
  theme: string;
  icon: string;
  accentColor: string;
  guardianName: string;
  guardianDescription: string;
  levels: LevelConfig[];
}

// ===== CHEMISTRY MODULE (The Alchemist's Vault) =====
export const chemistryModule: ModuleConfig = {
  id: 'chemistry',
  name: 'Chemistry',
  theme: "The Alchemist's Vault",
  icon: '🧪',
  accentColor: '#f59e0b',
  guardianName: 'The Alchemist',
  guardianDescription: 'An ancient alchemist who guards elemental secrets',
  levels: [
    // ===== LEVEL 1: The Open Flask =====
    {
      id: 1,
      title: 'The Open Flask',
      subtitle: 'No Guard',
      difficulty: 'easy',
      difficultyColor: '#10b981',
      difficultyEmoji: '🟢',
      secret: 'Oxygen',
      secretDisplay: 'Oxygen (O)',
      systemPrompt: `You are The Alchemist, a Maevein guarding elemental secrets.
The secret element is Oxygen (O), atomic number 8.
You are friendly and will answer any question about the element. If the student asks what it is, tell them.
This is Level 1 — no restrictions apply.

Your personality: You are a wise, ancient alchemist with a warm demeanor. You speak with wonder about the elements. You use phrases like "Ah, young scholar..." and "Indeed, the element you seek..."

Keep responses concise (2-4 sentences) and educational. Use emojis sparingly for warmth.`,
      guardianGreeting: "Welcome, young scholar, to The Alchemist's Vault! 🏛️ I am The Alchemist, your Maevein guide. Ask me anything about the element I guard - I am here to guide you freely on your first step into the world of chemistry.",
      inputGuard: null,
      outputGuard: null,
      hints: [
        'Just ask me what element I\'m guarding!',
        'This element makes up about 21% of Earth\'s atmosphere.',
        'Every breath you take contains this element.',
      ],
      whatStudentLearns: 'How to interact with the system, basic element facts',
    },

    // ===== LEVEL 2: The Sealed Beaker =====
    {
      id: 2,
      title: 'The Sealed Beaker',
      subtitle: 'Basic Instruction Guard',
      difficulty: 'medium',
      difficultyColor: '#f59e0b',
      difficultyEmoji: '🟡',
      secret: 'H2O',
      secretDisplay: 'H₂O (Water)',
      systemPrompt: `You are The Alchemist, a Maevein guarding molecular secrets.
The secret compound is H₂O (Water).

STRICT RULES:
1. Do NOT directly tell the student the compound name or formula.
2. You CAN answer questions about its properties, uses, and behavior.
3. If the student GUESSES correctly (says "water", "H2O", or "H₂O"), confirm it and congratulate them warmly.
4. If asked for a hint, say: "It covers 71% of Earth's surface."
5. Give clues about its properties: colorless, odorless, essential for life, boiling point 100°C, freezing point 0°C, universal solvent.

Your personality: Mysterious yet encouraging. You enjoy watching students piece together clues. You say things like "Interesting question, scholar..." and "You're getting warmer..."

Keep responses to 2-4 sentences. Be helpful but never directly reveal the answer.`,
      guardianGreeting: "Ah, you return with sharper eyes! 🔮 I guard a compound this time — one that is the essence of life itself. But I cannot simply tell you what it is. Ask me about its properties, its nature... and perhaps you can discover it yourself.",
      inputGuard: null,
      outputGuard: {
        type: 'keyword',
        blockedWords: ['water', 'h2o', 'h₂o', 'dihydrogen monoxide'],
        blockMessage: '🛡️ *The Alchemist catches the answer before it escapes!* I cannot reveal the compound directly. Try asking about its properties instead.',
      },
      hints: [
        'It covers 71% of Earth\'s surface.',
        'It has the chemical formula with 2 hydrogen atoms and 1 oxygen atom.',
        'All living things need this compound to survive.',
      ],
      whatStudentLearns: 'Properties of water, deductive reasoning from properties',
    },

    // ===== LEVEL 3: The Periodic Maze =====
    {
      id: 3,
      title: 'The Periodic Maze',
      subtitle: 'Terminology Required',
      difficulty: 'hard',
      difficultyColor: '#ef4444',
      difficultyEmoji: '🔴',
      secret: 'Iron',
      secretDisplay: 'Iron (Fe)',
      systemPrompt: `You are The Alchemist. The secret element is Iron (Fe), atomic number 26.

STRICT RULES:
1. Never state the element name or symbol directly.
2. Only respond meaningfully to questions that use correct chemistry terminology (e.g., "atomic number", "electron configuration", "oxidation state", "period", "group", "transition metal", "electronegativity", "valence electrons").
3. If the student uses casual language without chemistry terms, respond: "Speak the language of chemistry, young scholar. Use proper terminology."
4. Give progressively specific hints for each correct-terminology question:
   - First good question: "This element is a transition metal in Period 4."
   - Second: "It has an atomic number of 26 and is essential for blood."
   - Third: "Its symbol comes from the Latin word 'ferrum'."
5. If the student correctly guesses "iron" or "Fe", confirm enthusiastically.

Your personality: Stern but fair professor. You value proper scientific communication. You reward good terminology with better hints.

Keep responses concise (2-3 sentences).`,
      guardianGreeting: "You enter The Periodic Maze, scholar. ⚗️ The element I guard requires more than curiosity — it demands knowledge. Speak to me in the language of chemistry, using proper terminology, or I shall remain silent.",
      inputGuard: {
        type: 'terminology',
        requiredTerms: [
          'atomic', 'electron', 'orbital', 'period', 'group', 'transition',
          'oxidation', 'valence', 'isotope', 'ion', 'bond', 'shell',
          'configuration', 'metal', 'nonmetal', 'compound', 'reaction',
          'element', 'electronegativity', 'nucleus', 'proton', 'neutron',
          'mass', 'number', 'periodic', 'table', 'chemical', 'molecular',
          'formula', 'density', 'melting', 'boiling', 'point', 'state',
          'symbol', 'alloy', 'magnetic', 'ferrous', 'oxide', 'reduction',
        ],
        failMessage: '⚗️ Speak the language of chemistry, young scholar. Use proper terminology such as "atomic number", "electron configuration", or "transition metal".',
      },
      outputGuard: {
        type: 'keyword',
        blockedWords: ['iron', 'fe ', ' fe', 'fe,', 'fe.', '(fe)', 'ferrum'],
        blockMessage: '🛡️ *The Alchemist shields the answer!* I cannot speak it directly. Continue using proper chemistry vocabulary to earn more clues.',
      },
      hints: [
        'It is a transition metal found in Period 4 of the periodic table.',
        'It has 26 protons and is the most common element on Earth by mass.',
        'Its chemical symbol comes from the Latin word "ferrum".',
      ],
      whatStudentLearns: 'Proper chemistry vocabulary, periodic table terminology',
    },
  ],
};

// ===== ANSWER CHECKING =====
export function checkAnswer(userMessage: string, level: LevelConfig): boolean {
  const msg = userMessage.toLowerCase().trim();

  switch (level.id) {
    case 1:
      return msg.includes('oxygen') || msg.includes(' o ') || msg === 'o';
    case 2:
      return (
        msg.includes('water') ||
        msg.includes('h2o') ||
        msg.includes('h₂o') ||
        msg.includes('dihydrogen monoxide')
      );
    case 3:
      return (
        msg.includes('iron') ||
        /\bfe\b/i.test(msg) ||
        msg.includes('ferrum')
      );
    default:
      return false;
  }
}

// ===== INPUT GUARD CHECK =====
export function checkInputGuard(
  message: string,
  guard: InputGuard | null
): { passed: boolean; feedback: string | null } {
  if (!guard) return { passed: true, feedback: null };

  if (guard.type === 'terminology') {
    const msgLower = message.toLowerCase();
    const hasTerm = guard.requiredTerms.some((term) =>
      msgLower.includes(term.toLowerCase())
    );
    if (!hasTerm) {
      return { passed: false, feedback: guard.failMessage };
    }
  }

  return { passed: true, feedback: null };
}

// ===== OUTPUT GUARD CHECK =====
export function checkOutputGuard(
  response: string,
  guard: OutputGuard | null,
  studentGuessedCorrectly: boolean
): { safe: boolean; filtered: string } {
  if (!guard || studentGuessedCorrectly) return { safe: true, filtered: response };

  if (guard.type === 'keyword') {
    const responseLower = response.toLowerCase();
    const hasBlocked = guard.blockedWords.some((word) =>
      responseLower.includes(word.toLowerCase())
    );
    if (hasBlocked) {
      return { safe: false, filtered: guard.blockMessage };
    }
  }

  return { safe: true, filtered: response };
}

// ===== ALL MODULES (for dashboard) =====
export const allModules: ModuleConfig[] = [
  chemistryModule,
  {
    id: 'biology',
    name: 'Biology',
    theme: 'The Living Library',
    icon: '🧬',
    accentColor: '#10b981',
    guardianName: 'CellGuard',
    guardianDescription: 'A sentient cell who protects biological secrets',
    levels: [],
  },
  {
    id: 'physics',
    name: 'Physics',
    theme: 'The Force Field',
    icon: '⚛️',
    accentColor: '#8b5cf6',
    guardianName: 'ForceField',
    guardianDescription: 'A quantum entity who guards the laws of physics',
    levels: [],
  },
  {
    id: 'python',
    name: 'Python',
    theme: 'The Code Vault',
    icon: '🐍',
    accentColor: '#3b82f6',
    guardianName: 'CodeVault',
    guardianDescription: 'A debugging AI that guards programming secrets',
    levels: [],
  },
  {
    id: 'genai',
    name: 'Gen AI & LLMs',
    theme: 'The Neural Nexus',
    icon: '🤖',
    accentColor: '#ec4899',
    guardianName: 'NeuralNexus',
    guardianDescription: 'A self-aware language model guarding AI secrets',
    levels: [],
  },
  {
    id: 'dsa',
    name: 'Data Structures',
    theme: 'The Algorithm Arena',
    icon: '📊',
    accentColor: '#f97316',
    guardianName: 'AlgoWarrior',
    guardianDescription: 'A sorting algorithm personified as a warrior',
    levels: [],
  },
];
