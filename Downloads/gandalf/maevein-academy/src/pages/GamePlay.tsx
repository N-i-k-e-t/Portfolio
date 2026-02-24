import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { MODULES, getGuardianResponse } from "@/lib/game-data";
import { useAuth } from "@/lib/auth-context";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, Lightbulb, Timer, Flag, Star, ArrowRight } from "lucide-react";

interface Message {
  sender: "guardian" | "user";
  text: string;
}

export default function GamePlay() {
  const { moduleId, levelId } = useParams();
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const module = MODULES.find((m) => m.id === moduleId);
  const levelNum = parseInt(levelId || "1");
  const level = module?.levels.find((l) => l.id === levelNum);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const [typing, setTyping] = useState(false);
  const [startTime] = useState(Date.now());
  const [attempts, setAttempts] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    if (!module || !level) { navigate("/dashboard"); return; }
    setMessages([{ sender: "guardian", text: level.guardianMessage }]);
  }, [moduleId, levelId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  if (!module || !level) return null;

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setTyping(true);

    setTimeout(() => {
      const response = getGuardianResponse(module.id, level.id, userMsg, level.secret);
      setMessages((prev) => [...prev, { sender: "guardian", text: response }]);
      setTyping(false);
    }, 800 + Math.random() * 1200);
  };

  const useHint = () => {
    if (hintsUsed >= level.hints.length) return;
    const hint = level.hints[hintsUsed];
    setHintsUsed((h) => h + 1);
    setMessages((prev) => [...prev, { sender: "guardian", text: `💡 Hint: ${hint}` }]);
  };

  const submitAnswer = () => {
    setAttempts((a) => a + 1);
    if (answer.trim().toLowerCase() === level.secret.toLowerCase()) {
      setResult("correct");
      const progress = JSON.parse(localStorage.getItem("kg_progress") || "{}");
      progress[`${module.id}-${level.id}`] = true;
      localStorage.setItem("kg_progress", JSON.stringify(progress));
      const xpEarned = Math.max(50, 200 - hintsUsed * 30 - (attempts * 10));
      if (user) {
        updateUser({ xp: user.xp + xpEarned, levelsCompleted: user.levelsCompleted + 1 });
      }
      try {
        import("canvas-confetti").then((mod) => {
          mod.default({ particleCount: 200, spread: 100, origin: { y: 0.5 } });
        });
      } catch {}
    } else {
      setResult("wrong");
      setTimeout(() => setResult(null), 1500);
    }
    setShowAnswer(false);
    setAnswer("");
  };

  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  const nextLevel = levelNum + 1;
  const hasNext = module.levels.some((l) => l.id === nextLevel);

  if (result === "correct") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card p-10 rounded-2xl text-center max-w-md">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold gradient-text mb-2">Level Complete!</h2>
          <p className="text-muted-foreground mb-6">The secret was: <span className="font-mono text-primary font-bold">{level.secret}</span></p>
          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div className="glass p-3 rounded-xl"><div className="text-muted-foreground">Time</div><div className="font-bold">{mins}:{secs.toString().padStart(2, "0")}</div></div>
            <div className="glass p-3 rounded-xl"><div className="text-muted-foreground">Attempts</div><div className="font-bold">{attempts}</div></div>
            <div className="glass p-3 rounded-xl"><div className="text-muted-foreground">Hints Used</div><div className="font-bold">{hintsUsed}/3</div></div>
            <div className="glass p-3 rounded-xl"><div className="text-muted-foreground">XP Earned</div><div className="font-bold text-primary">+{Math.max(50, 200 - hintsUsed * 30 - (attempts * 10))}</div></div>
          </div>
          <div className="flex gap-3">
            <Link to="/dashboard" className="flex-1 glass py-3 rounded-xl font-semibold text-center hover:bg-[hsl(var(--glass-hover))]">Dashboard</Link>
            {hasNext && (
              <Link to={`/play/${module.id}/${nextLevel}`} className="flex-1 gradient-button py-3 rounded-xl font-semibold flex items-center justify-center gap-2" onClick={() => window.location.reload()}>
                Next Level <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-80 glass border-r border-border/50 p-6 flex flex-col gap-4 md:min-h-screen">
        <Link to="/dashboard" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <div className="text-center">
          <div className="text-5xl mb-2">{module.emoji}</div>
          <h2 className="font-bold text-lg">{module.guardian}</h2>
          <p className="text-sm text-primary">Level {level.id} of {module.levels.length}</p>
        </div>
        <p className="text-sm text-muted-foreground text-center italic">"{level.guardianMessage}"</p>
        <div className="flex items-center justify-center gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < level.difficulty ? "text-primary fill-primary" : "text-muted"}`} />
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Timer className="w-4 h-4" />
          <span>{mins}:{secs.toString().padStart(2, "0")}</span>
        </div>
        <button
          onClick={useHint}
          disabled={hintsUsed >= level.hints.length}
          className="glass-card px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-30"
        >
          <Lightbulb className="w-4 h-4 text-primary" />
          Hint ({hintsUsed}/{level.hints.length})
        </button>
        <button onClick={() => navigate("/dashboard")} className="glass-card px-4 py-3 rounded-xl text-sm text-destructive flex items-center justify-center gap-2 mt-auto">
          <Flag className="w-4 h-4" /> Give Up
        </button>
      </div>

      {/* Chat */}
      <div className="flex-1 flex flex-col min-h-[calc(100vh-200px)] md:min-h-screen relative">
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: msg.sender === "guardian" ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[80%] px-5 py-3 rounded-2xl text-sm ${
                  msg.sender === "guardian"
                    ? "glass-card rounded-tl-sm"
                    : "bg-primary/20 border border-primary/30 rounded-tr-sm"
                }`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {typing && (
            <div className="flex justify-start">
              <div className="glass-card px-5 py-3 rounded-2xl rounded-tl-sm flex gap-1">
                {[0, 1, 2].map((d) => (
                  <span key={d} className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: `${d * 0.15}s` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Answer button */}
        <div className="absolute bottom-20 right-4 md:bottom-24 md:right-6">
          <button onClick={() => setShowAnswer(true)} className="gradient-button px-5 py-3 rounded-xl font-semibold text-sm shadow-lg animate-pulse-glow">
            🎯 I Know the Answer!
          </button>
        </div>

        {/* Input */}
        <div className="p-4 md:p-6 border-t border-border/50">
          <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Chat with the guardian..."
              className="flex-1 glass-input px-4 py-3 rounded-xl"
            />
            <button type="submit" className="gradient-button p-3 rounded-xl">
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Answer Modal */}
        <AnimatePresence>
          {showAnswer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-20"
            >
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className={`glass-card p-8 rounded-2xl max-w-md w-full ${result === "wrong" ? "animate-shake" : ""}`}>
                <h3 className="text-xl font-bold mb-4 text-center">Submit Your Answer</h3>
                <input
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="What's the secret?"
                  className="w-full glass-input px-4 py-3 rounded-xl mb-4 font-mono"
                  autoFocus
                  onKeyDown={(e) => e.key === "Enter" && submitAnswer()}
                />
                {result === "wrong" && <p className="text-destructive text-sm text-center mb-4">❌ Not quite! Keep trying.</p>}
                <div className="flex gap-3">
                  <button onClick={() => { setShowAnswer(false); setAnswer(""); setResult(null); }} className="flex-1 glass py-3 rounded-xl font-semibold">Cancel</button>
                  <button onClick={submitAnswer} className="flex-1 gradient-button py-3 rounded-xl font-semibold">Submit</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
