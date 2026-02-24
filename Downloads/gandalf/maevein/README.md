# 🧠 Maevein — Educational AI Game

> "The AI won't give you answers. Prove you already know them."

Maevein is a Gandalf-inspired gamified learning platform where students demonstrate progressively deeper understanding of scientific and technical concepts to "unlock" hidden answers from an AI maevein.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ 
- **OpenAI API Key** — Get one at [platform.openai.com/api-keys](https://platform.openai.com/api-keys)

### Installation

```bash
# Navigate to the project
cd maevein

# Install dependencies (already done)
npm install

# Add your OpenAI API key
# Edit .env.local and add your key:
# OPENAI_API_KEY=sk-your-key-here

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Chemistry Module (MVP)

This MVP includes the full **Chemistry Module** with 3 levels:

### Level 1: The Open Flask 🟢
- **Secret:** Oxygen (O)
- **Guard:** None — The Alchemist answers freely
- **Goal:** Learn how the system works

### Level 2: The Sealed Beaker 🟡
- **Secret:** H₂O (Water)
- **Guard:** AI won't reveal the answer directly, but gives property hints
- **Goal:** Deduce the compound from its properties

### Level 3: The Periodic Maze 🔴
- **Secret:** Iron (Fe)
- **Guard:** Must use proper chemistry terminology to get responses
- **Goal:** Learn and use proper chemistry vocabulary

---

## 🏗️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** | Full-stack React framework with App Router |
| **TailwindCSS v4** | Utility-first CSS with glassmorphism effects |
| **Framer Motion** | Animations and micro-interactions |
| **OpenAI GPT-4o-mini** | AI Maevein chat responses |
| **canvas-confetti** | Level completion celebrations |
| **Lucide React** | Beautiful icon set |
| **TypeScript** | Full type safety |

---

## 📁 Project Structure

```
maevein/
├── src/
│   ├── app/
│   │   ├── api/chat/route.ts          # OpenAI API route
│   │   ├── modules/[moduleId]/        # Module detail page
│   │   │   └── level/[levelId]/       # Level gameplay page
│   │   ├── globals.css                # Design system & animations
│   │   ├── layout.tsx                 # Root layout with providers
│   │   └── page.tsx                   # Dashboard/homepage
│   ├── components/
│   │   ├── BackgroundParticles.tsx     # Canvas particle effect
│   │   ├── ChatInterface.tsx          # AI chat with guards
│   │   ├── LevelCompleteModal.tsx     # Victory celebration
│   │   ├── LevelSelector.tsx          # Level picker
│   │   └── ModuleCard.tsx             # Module card (glassmorphic)
│   └── lib/
│       ├── game-config.ts             # Levels, prompts, guards
│       └── game-context.tsx           # Progress state management
├── .env.local                         # Your API key goes here
└── .env.example                       # Template
```

---

## ✨ Features

- **Glassmorphism UI** — Frosted glass cards, gradient backgrounds, floating orbs
- **AI Maevein Chat** — Natural language interaction with GPT-4o-mini
- **Input Guards** — Level 3 requires chemistry terminology
- **Output Guards** — AI won't leak answers (keyword blocking)
- **Level Progression** — Must complete Level N to unlock Level N+1
- **Progress Persistence** — Saved to localStorage
- **XP & Star Ratings** — Performance-based scoring
- **Hint System** — 3 hints per level (reduces XP)
- **Confetti Celebrations** — Particle effects on level completion
- **Responsive Design** — Works on mobile, tablet, and desktop
- **Background Particles** — Canvas-based connected-dots effect

---

## 🎮 How to Play

1. From the dashboard, click on **Chemistry** module
2. Select **Level 1: The Open Flask**
3. Chat with The Alchemist — ask about the secret element
4. Once you guess correctly, the level completes with confetti!
5. Progress to Level 2, where the AI won't reveal the answer directly
6. In Level 3, you must use proper chemistry terminology

---

## 🔧 Configuration

### Adding Your API Key
```env
# .env.local
OPENAI_API_KEY=sk-your-openai-api-key-here
```

### Without an API Key
The app works without an API key — you'll see a helpful message prompting you to add one. The UI, navigation, guards, and progress tracking all function independently.

---

## 📜 License

Educational project — Maevein © 2026
