// Projects Data
const projects = [
    {
        slug: "roi-magic",
        name: "ROI Magic — Agent Pilot",
        summary: "Single‑tool agent that cut quoting time by ~70%.",
        problem: "Manual quoting was slow and inconsistent across reps.",
        approach: "Narrow agent with one pricing tool, structured prompts, retries/fallbacks, review step, and telemetry.",
        result: "↓ time to quote ~70%; ↑ consistency; prototype in 5 days.",
        stack: ["Next.js", "FastAPI", "OpenAI", "Postgres", "PostHog"],
        liveUrl: "https://roi-reality-engine.vercel.app",
        repoUrl: "https://github.com/N-i-k-e-t/roi-reality-engine",
        images: ["/projects/roi-magic/hero.png", "/projects/roi-magic/screen-1.png"],
        tags: ["ai", "agent", "automation", "nextjs", "fastapi"]
    },
    {
        slug: "prompt-factory",
        name: "Prompt Factory — Prompt Ops",
        summary: "Prompt pipelines + eval harness for safer launches.",
        problem: "No systematic prompt testing; regressions after changes.",
        approach: "Prompt versioning, eval loops, offline/online metrics dashboard, failure taxonomies.",
        result: "Fewer regressions, faster iterations, clearer quality gates.",
        stack: ["Node", "LangChain", "OpenAI", "Supabase", "Grafana"],
        liveUrl: "https://prompt-factory.vercel.app",
        repoUrl: "https://github.com/N-i-k-e-t/prompt-factory",
        images: ["/projects/prompt-factory/hero.png", "/projects/prompt-factory/screen-1.png"],
        tags: ["ai", "prompt", "evals", "node"]
    },
    {
        slug: "chatbot-ui-mods",
        name: "Chatbot‑UI Mods — RAG",
        summary: "Docs to answers with citations + feedback loop.",
        problem: "Documentation wasn't answerable; hallucinations and slow responses.",
        approach: "RAG with chunking/hybrid search, citation-first UX, guardrails, feedback loop.",
        result: "↑ accuracy, ↓ time‑to‑answer; launched in ~2 weeks.",
        stack: ["Next.js", "Vercel", "LlamaIndex", "pgvector", "OpenAI"],
        liveUrl: "https://chatbot-ui-mods.vercel.app",
        repoUrl: "https://github.com/N-i-k-e-t/chatbot-ui-mods",
        images: ["/projects/chatbot-ui/hero.png", "/projects/chatbot-ui/screen-1.png"],
        tags: ["ai", "rag", "nextjs", "llamaindex"]
    }
];

// Services Data
const services = [
    {
        id: "agent-build",
        title: "Agent Build",
        outcome: "A working agent with tools, memory, guardrails, and dashboards.",
        deliverables: [
            "Scoped agent",
            "Tooling integration", 
            "Eval harness",
            "Docs + handoff"
        ],
        timelineWeeks: 3,
        priceFromUSD: 800,
        priceToUSD: 1500,
        cta: "https://calendly.com/niketpatil"
    },
    {
        id: "rag-chat",
        title: "RAG / Chat Product",
        outcome: "Docs to reliable answers with citations and feedback loop.",
        deliverables: [
            "Indexing pipeline",
            "Search + rerank",
            "UI & citations",
            "Eval dashboard"
        ],
        timelineWeeks: 2,
        priceFromUSD: 1500,
        priceToUSD: 3000,
        cta: "https://calendly.com/niketpatil"
    },
    {
        id: "ai-roadmap",
        title: "AI Roadmapping Sprint",
        outcome: "Architecture, feasibility, milestones, ROI model + prototype.",
        deliverables: [
            "System design",
            "Pilot scope",
            "Risk plan",
            "Prototype"
        ],
        timelineWeeks: 1,
        priceFromUSD: 800,
        cta: "https://calendly.com/niketpatil"
    }
];

// Testimonials Data
const testimonials = [
    {
        quote: "Cut quoting time by ~70%. Clear comms and fast shipping.",
        author: "Product Lead",
        role: "B2B SaaS, Nashik",
        logo: "/logos/client-1.png"
    },
    {
        quote: "Reliable doc answers with evals and telemetry. Launch in 2 weeks.",
        author: "COO",
        role: "DevTools Startup, Nashik",
        logo: "/logos/client-2.png"
    },
    {
        quote: "Prototype over a weekend, then production-ready. Great reliability focus.",
        author: "Founder",
        role: "Services Marketplace, Nashik",
        logo: "/logos/client-3.png"
    }
];

// Blog Posts Data
const blogPosts = [
    {
        slug: "agents-that-actually-work",
        title: "Agents that actually work = tools + memory + guardrails",
        excerpt: "Define real agents; show one-tool pilot; add evals; guardrails; telemetry; link to case study.",
        date: "2024-01-15",
        readTime: "5 min read"
    },
    {
        slug: "rag-isnt-search-engine",
        title: "RAG isn't a search engine: 5 mistakes",
        excerpt: "Chunking, hybrid search, rerank, citations-first UX, evals; common pitfalls.",
        date: "2024-01-08",
        readTime: "7 min read"
    },
    {
        slug: "prompt-evaluation-loops",
        title: "Prompt evaluation loops that de-risk launches",
        excerpt: "Offline vs online evals; golden sets; error taxonomies; dashboards; rollouts.",
        date: "2024-01-01",
        readTime: "6 min read"
    },
    {
        slug: "weekend-prototyping-playbook",
        title: "Shipping in weekends: the AI prototyping playbook",
        excerpt: "Scope narrowly; choose one tool; fake the hard parts; ship; measure.",
        date: "2023-12-25",
        readTime: "4 min read"
    }
];

// FAQ Data
const faqs = [
    {
        question: "What do you actually deliver?",
        answer: "A working agent/chat system with tools, memory, guardrails, eval harness, docs, and deployment."
    },
    {
        question: "How do you ensure reliability?",
        answer: "Constrained tools, retries/fallbacks, red-team prompts, evals, and telemetry."
    },
    {
        question: "Can you work with my stack?",
        answer: "Yes—Next.js, Node/FastAPI, Postgres/Supabase, Slack/CRM/APIs. I adapt to your infra."
    },
    {
        question: "How fast can we start?",
        answer: "Usually within a week. Pilot → 1–2 weeks; RAG product → ~2 weeks."
    }
];

// Export data for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        projects,
        services,
        testimonials,
        blogPosts,
        faqs
    };
}
