import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { MODULES } from "@/lib/game-data";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Zap, Trophy, Flame, Star, ArrowRight, Play } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  if (!user) return null;

  const progress = JSON.parse(localStorage.getItem("kg_progress") || "{}");

  const getModuleProgress = (moduleId: string) => {
    const completed = Object.keys(progress).filter((k) => k.startsWith(moduleId + "-") && progress[k]).length;
    return completed;
  };

  const stats = [
    { icon: Zap, label: "Total XP", value: user.xp.toLocaleString(), color: "text-primary" },
    { icon: Trophy, label: "Levels Done", value: user.levelsCompleted.toString(), color: "text-accent" },
    { icon: Flame, label: "Streak", value: `${user.streak} days`, color: "text-destructive" },
    { icon: Star, label: "Rank", value: "#42", color: "text-secondary" },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 pt-24 pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome back, <span className="gradient-text">{user.name}</span>!
          </h1>
          <p className="text-muted-foreground mb-8">Continue your journey to outsmart the guardians.</p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {stats.map((s) => (
              <div key={s.label} className="glass-card p-5 rounded-2xl">
                <s.icon className={`w-6 h-6 ${s.color} mb-2`} />
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Modules */}
          <h2 className="text-xl font-bold mb-6">Your Modules</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {MODULES.map((mod, i) => {
              const done = getModuleProgress(mod.id);
              const total = mod.levels.length;
              const pct = Math.round((done / total) * 100);
              const nextLevel = done + 1;
              return (
                <motion.div key={mod.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <div className="glass-card p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{mod.emoji}</span>
                      <div>
                        <h3 className="font-bold">{mod.name}</h3>
                        <p className="text-xs text-muted-foreground">{mod.guardian}</p>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 mb-3">
                      <div className="h-2 rounded-full gradient-button" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{done}/{total} levels</span>
                      <Link
                        to={nextLevel <= total ? `/play/${mod.id}/${nextLevel}` : "#"}
                        className={`inline-flex items-center gap-1 text-sm font-semibold ${
                          done >= total ? "text-success" : "text-primary hover:underline"
                        }`}
                      >
                        {done >= total ? (
                          "✅ Complete"
                        ) : done > 0 ? (
                          <>Continue <ArrowRight className="w-3 h-3" /></>
                        ) : (
                          <>Start <Play className="w-3 h-3" /></>
                        )}
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Activity */}
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="glass-card p-6 rounded-2xl space-y-4">
            {[
              { text: "Signed up for Knowledge Guardian", time: "Just now", emoji: "🎓" },
              { text: "Ready to start your first challenge!", time: "Now", emoji: "⚡" },
            ].map((a, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-2xl">{a.emoji}</span>
                <div>
                  <p className="text-sm font-medium">{a.text}</p>
                  <p className="text-xs text-muted-foreground">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
