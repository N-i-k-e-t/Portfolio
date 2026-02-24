import { useState } from "react";
import Navbar from "@/components/Navbar";
import { MOCK_LEADERBOARD, MODULES } from "@/lib/game-data";
import { motion } from "framer-motion";
import { Trophy, Medal } from "lucide-react";

const TABS = ["Global", "This Week", ...MODULES.map((m) => m.name)];

export default function Leaderboard() {
  const [tab, setTab] = useState("Global");

  const podiumColors = ["from-yellow-500/20 to-yellow-600/10 border-yellow-500/30", "from-gray-400/20 to-gray-500/10 border-gray-400/30", "from-orange-600/20 to-orange-700/10 border-orange-600/30"];
  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="gradient-text">Leaderboard</span>
          </h1>
          <p className="text-muted-foreground mb-8">Top guardians breakers ranked by XP</p>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  tab === t ? "gradient-button" : "glass hover:bg-[hsl(var(--glass-hover))]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Podium */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[1, 0, 2].map((idx) => {
              const p = MOCK_LEADERBOARD[idx];
              return (
                <div key={idx} className={`glass-card p-6 rounded-2xl text-center border bg-gradient-to-b ${podiumColors[idx]} ${idx === 0 ? "md:-mt-4" : ""}`}>
                  <div className="text-3xl mb-1">{medals[idx]}</div>
                  <div className="text-3xl mb-2">{p.avatar}</div>
                  <div className="font-bold text-sm">{p.name}</div>
                  <div className="text-primary font-bold">{p.xp.toLocaleString()} XP</div>
                  <div className="text-xs text-muted-foreground">{p.levels} levels</div>
                </div>
              );
            })}
          </div>

          {/* List */}
          <div className="space-y-2">
            {MOCK_LEADERBOARD.slice(3).map((p) => (
              <div key={p.rank} className="glass-card p-4 rounded-xl flex items-center gap-4">
                <span className="text-muted-foreground font-mono w-8 text-right">#{p.rank}</span>
                <span className="text-2xl">{p.avatar}</span>
                <div className="flex-1">
                  <div className="font-semibold text-sm">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.levels} levels completed</div>
                </div>
                <div className="text-primary font-bold text-sm">{p.xp.toLocaleString()} XP</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
