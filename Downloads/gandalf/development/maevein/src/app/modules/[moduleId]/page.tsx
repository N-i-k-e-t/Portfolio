'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Sparkles, BookOpen } from 'lucide-react';
import { BackgroundParticles } from '@/components/BackgroundParticles';
import { LevelSelector } from '@/components/LevelSelector';
import { useGame } from '@/lib/game-context';
import { allModules } from '@/lib/game-config';

export default function ModulePage() {
    const params = useParams();
    const router = useRouter();
    const { getModuleCompletedCount } = useGame();

    const moduleId = params.moduleId as string;
    const moduleConfig = allModules.find((m) => m.id === moduleId);

    if (!moduleConfig || moduleConfig.levels.length === 0) {
        return (
            <div className="min-h-screen relative overflow-hidden">
                <div className="fixed inset-0 bg-gradient-main z-0" />
                <BackgroundParticles />
                <div className="relative z-10 flex items-center justify-center min-h-screen">
                    <div className="glass-card p-8 text-center max-w-md">
                        <p className="text-6xl mb-4">🔒</p>
                        <h2 className="text-2xl font-bold text-white mb-2">Coming Soon</h2>
                        <p className="text-white/50 mb-6">This module is still being crafted by the guardians.</p>
                        <button onClick={() => router.push('/')} className="btn-primary">
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const completed = getModuleCompletedCount(moduleId);

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background */}
            <div className="fixed inset-0 bg-gradient-main z-0" />
            <BackgroundParticles />
            <div className="orb orb-1" />
            <div className="orb orb-2" />

            <div className="relative z-10">
                {/* Header */}
                <header className="border-b border-white/5">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
                        <motion.button
                            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                            onClick={() => router.push('/')}
                            whileTap={{ scale: 0.95 }}
                        >
                            <ArrowLeft size={18} className="text-white/70" />
                        </motion.button>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                <Shield size={20} className="text-white" />
                            </div>
                            <div>
                                <h1 className="font-bold text-white text-lg leading-tight">Knowledge Guardian</h1>
                                <p className="text-xs text-white/40">Prove your knowledge</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Module Hero */}
                <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glasss-card glass-card p-6 sm:p-8 relative overflow-hidden"
                    >
                        {/* Accent glow */}
                        <div
                            className="absolute inset-0 opacity-[0.06]"
                            style={{
                                background: `radial-gradient(circle at 30% 50%, ${moduleConfig.accentColor} 0%, transparent 60%)`,
                            }}
                        />

                        <div className="relative z-10">
                            <div className="flex items-start gap-4 sm:gap-6">
                                {/* Icon */}
                                <motion.div
                                    className="text-5xl sm:text-6xl"
                                    animate={{ y: [0, -6, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                >
                                    {moduleConfig.icon}
                                </motion.div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Sparkles size={14} style={{ color: moduleConfig.accentColor }} />
                                        <span className="text-xs font-medium" style={{ color: moduleConfig.accentColor }}>
                                            {moduleConfig.theme}
                                        </span>
                                    </div>
                                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                                        {moduleConfig.name}
                                    </h2>
                                    <p className="text-sm text-white/50 mb-4">
                                        Guardian: <span className="text-white/70 font-medium">{moduleConfig.guardianName}</span>
                                        <span className="mx-2 text-white/20">•</span>
                                        {moduleConfig.guardianDescription}
                                    </p>

                                    {/* Progress bar */}
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1 flex-1 max-w-xs">
                                            {moduleConfig.levels.map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="h-2 flex-1 rounded-full transition-all"
                                                    style={{
                                                        background:
                                                            i < completed
                                                                ? `linear-gradient(135deg, ${moduleConfig.accentColor}, ${moduleConfig.accentColor}cc)`
                                                                : 'rgba(255, 255, 255, 0.08)',
                                                    }}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-xs text-white/40 font-medium">
                                            {completed}/{moduleConfig.levels.length}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Level Selection */}
                <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
                    <motion.div
                        className="flex items-center gap-2 mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <BookOpen size={18} className="text-white/60" />
                        <h3 className="font-semibold text-white">Select Level</h3>
                    </motion.div>

                    <LevelSelector
                        moduleId={moduleId}
                        levels={moduleConfig.levels}
                        accentColor={moduleConfig.accentColor}
                        onSelectLevel={(levelId) =>
                            router.push(`/modules/${moduleId}/level/${levelId}`)
                        }
                    />
                </section>
            </div>
        </div>
    );
}
