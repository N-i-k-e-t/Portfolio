'use client';

import { motion } from 'framer-motion';
import { BackgroundParticles } from '@/components/BackgroundParticles';
import { ModuleCard } from '@/components/ModuleCard';
import { useGame } from '@/lib/game-context';
import { allModules } from '@/lib/game-config';
import { Flame, Trophy, Zap, BookOpen, Shield, Sparkles, Crown } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const { gameState } = useGame();

  const totalCompleted = Object.values(gameState.progress).reduce(
    (acc, mod) => acc + Object.values(mod).filter((l) => l.completed).length,
    0
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-main z-0" />
      <BackgroundParticles />

      {/* Floating orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Shield size={20} className="text-white" />
              </div>
              <div>
                <h1 className="font-bold text-white text-lg leading-tight">Maevein</h1>
                <p className="text-xs text-white/40">Prove your knowledge</p>
              </div>
            </motion.div>

            {/* Stats & Pro bar */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="hidden sm:flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-sm text-white/60">
                  <Zap size={14} className="text-yellow-400" />
                  <span className="font-semibold text-white">{gameState.totalXP}</span>
                  <span className="text-white/40">XP</span>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-1.5 text-sm text-white/60">
                  <Trophy size={14} className="text-emerald-400" />
                  <span className="font-semibold text-white">{totalCompleted}</span>
                  <span className="text-white/40">Cleared</span>
                </div>
              </div>

              {gameState.isPro ? (
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/30">
                  <div className="w-5 h-5 rounded-md bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                    <Crown size={12} className="text-black" />
                  </div>
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Pro Maevein</span>
                </div>
              ) : (
                <Link
                  href="/pricing"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
                >
                  <div className="w-5 h-5 rounded-md bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Crown size={12} className="text-black" />
                  </div>
                  <span className="text-xs font-bold text-white hidden xs:inline">Get Pro</span>
                </Link>
              )}
            </motion.div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-8 sm:pt-20 sm:pb-12">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-white/70 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles size={12} className="text-yellow-400" />
              AI-Powered Educational Game
              <Sparkles size={12} className="text-purple-400" />
            </motion.div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight tracking-tight">
              The AI Won&apos;t Give You
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Answers.
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-white/50 mb-2 font-light">
              Prove you already know them.
            </p>
            <p className="text-sm text-white/30 max-w-xl mx-auto">
              Chat with AI Maeveins who protect secrets across Chemistry, Biology, Physics, Python, and more.
              Demonstrate your knowledge to unlock each level.
            </p>
          </motion.div>
        </section>

        {/* How It Works */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-12">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {[
              { icon: <BookOpen size={20} />, title: 'Choose a Module', desc: 'Pick from 6 STEM subjects' },
              { icon: <Shield size={20} />, title: 'Chat with AI', desc: 'Prove your knowledge to the Maevein' },
              { icon: <Trophy size={20} />, title: 'Unlock Secrets', desc: 'Master each level to progress' },
            ].map((step, i) => (
              <motion.div
                key={i}
                className="glass rounded-2xl p-5 text-center"
                whileHover={{ y: -4 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-3 text-blue-400">
                  {step.icon}
                </div>
                <h4 className="font-semibold text-white text-sm mb-1">{step.title}</h4>
                <p className="text-xs text-white/40">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Module Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Flame size={20} className="text-orange-400" />
            <h3 className="text-xl font-bold text-white">Learning Modules</h3>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allModules.map((mod) => (
              <ModuleCard
                key={mod.id}
                module={{
                  id: mod.id,
                  name: mod.name,
                  theme: mod.theme,
                  icon: mod.icon,
                  accentColor: mod.accentColor,
                  totalLevels: mod.levels.length,
                }}
              />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-xs text-white/25">
              Maevein © 2026 - Built with Next.js, Tailwind CSS, and OpenAI
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
