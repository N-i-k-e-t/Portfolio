import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import Navbar from "@/components/Navbar";
import { MODULES } from "@/lib/game-data";
import { motion } from "framer-motion";
import { User, Mail, Calendar, Award, Zap, Trophy, Edit } from "lucide-react";

export default function Profile() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if (!user) navigate("/login");
    else setName(user.name);
  }, [user, navigate]);

  if (!user) return null;

  const badges = [
    { emoji: "🎓", name: "Newcomer", unlocked: true },
    { emoji: "⚗️", name: "Alchemist I", unlocked: user.levelsCompleted >= 1 },
    { emoji: "🧬", name: "Bio Scholar", unlocked: user.levelsCompleted >= 3 },
    { emoji: "⚡", name: "Force Master", unlocked: user.levelsCompleted >= 5 },
    { emoji: "🐍", name: "Pythonista", unlocked: user.levelsCompleted >= 7 },
    { emoji: "🤖", name: "AI Whisperer", unlocked: user.levelsCompleted >= 10 },
    { emoji: "⚔️", name: "Algo Knight", unlocked: user.levelsCompleted >= 15 },
    { emoji: "👑", name: "maevein Breaker", unlocked: user.levelsCompleted >= 42 },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 pt-24 pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Profile Card */}
          <div className="glass-card p-8 rounded-2xl mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="text-5xl">{user.avatar}</div>
                <div>
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-3 h-3" /> {user.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Calendar className="w-3 h-3" /> Joined {user.joinedDate}
                  </div>
                </div>
              </div>
              <button onClick={() => setEditing(!editing)} className="glass p-2 rounded-lg hover:bg-[hsl(var(--glass-hover))]">
                <Edit className="w-4 h-4" />
              </button>
            </div>

            {editing && (
              <div className="glass p-4 rounded-xl mb-4 flex gap-3">
                <input value={name} onChange={(e) => setName(e.target.value)} className="flex-1 glass-input px-3 py-2 rounded-lg text-sm" />
                <button
                  onClick={() => { updateUser({ name }); setEditing(false); }}
                  className="gradient-button px-4 py-2 rounded-lg text-sm font-semibold"
                >
                  Save
                </button>
              </div>
            )}

            <div className="grid grid-cols-3 gap-4">
              <div className="glass p-4 rounded-xl text-center">
                <Zap className="w-5 h-5 text-primary mx-auto mb-1" />
                <div className="font-bold">{user.xp}</div>
                <div className="text-xs text-muted-foreground">XP</div>
              </div>
              <div className="glass p-4 rounded-xl text-center">
                <Trophy className="w-5 h-5 text-accent mx-auto mb-1" />
                <div className="font-bold">{user.levelsCompleted}</div>
                <div className="text-xs text-muted-foreground">Levels</div>
              </div>
              <div className="glass p-4 rounded-xl text-center">
                <Award className="w-5 h-5 text-secondary mx-auto mb-1" />
                <div className="font-bold">{badges.filter((b) => b.unlocked).length}</div>
                <div className="text-xs text-muted-foreground">Badges</div>
              </div>
            </div>
          </div>

          {/* Badges */}
          <h2 className="text-xl font-bold mb-4">Badges</h2>
          <div className="grid grid-cols-4 gap-3 mb-8">
            {badges.map((b) => (
              <div key={b.name} className={`glass-card p-4 rounded-xl text-center ${!b.unlocked ? "opacity-30" : ""}`}>
                <div className="text-3xl mb-1">{b.emoji}</div>
                <div className="text-xs font-medium">{b.name}</div>
              </div>
            ))}
          </div>

          {/* Activity */}
          <h2 className="text-xl font-bold mb-4">Activity Timeline</h2>
          <div className="glass-card p-6 rounded-2xl space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-muted-foreground">Account created</span>
              <span className="ml-auto text-xs text-muted-foreground">{user.joinedDate}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span className="text-muted-foreground">Started learning journey</span>
              <span className="ml-auto text-xs text-muted-foreground">Today</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
