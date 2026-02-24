'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { BackgroundParticles } from '@/components/BackgroundParticles';
import { ChatInterface } from '@/components/ChatInterface';
import { allModules } from '@/lib/game-config';
import { useGame } from '@/lib/game-context';
import { Lock } from 'lucide-react';

export default function LevelPage() {
    const params = useParams();
    const router = useRouter();
    const { isLevelUnlocked } = useGame();

    const moduleId = params.moduleId as string;
    const levelId = parseInt(params.levelId as string, 10);

    const moduleConfig = allModules.find((m) => m.id === moduleId);
    const levelConfig = moduleConfig?.levels.find((l) => l.id === levelId);

    // Module or level not found
    if (!moduleConfig || !levelConfig) {
        return (
            <div className="min-h-screen relative overflow-hidden">
                <div className="fixed inset-0 bg-gradient-main z-0" />
                <BackgroundParticles />
                <div className="relative z-10 flex items-center justify-center min-h-screen">
                    <div className="glass-card p-8 text-center max-w-md">
                        <p className="text-6xl mb-4">❓</p>
                        <h2 className="text-2xl font-bold text-white mb-2">Level Not Found</h2>
                        <p className="text-white/50 mb-6">This level doesn&apos;t exist yet.</p>
                        <button onClick={() => router.push('/')} className="btn-primary">
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Level locked
    if (!isLevelUnlocked(moduleId, levelId)) {
        return (
            <div className="min-h-screen relative overflow-hidden">
                <div className="fixed inset-0 bg-gradient-main z-0" />
                <BackgroundParticles />
                <div className="relative z-10 flex items-center justify-center min-h-screen">
                    <motion.div
                        className="glass-card p-8 text-center max-w-md"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <motion.div
                            className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Lock size={32} className="text-white/30" />
                        </motion.div>
                        <h2 className="text-2xl font-bold text-white mb-2">Level Locked</h2>
                        <p className="text-white/50 mb-6">
                            Complete Level {levelId - 1} first to unlock this challenge.
                        </p>
                        <button
                            onClick={() => router.push(`/modules/${moduleId}`)}
                            className="btn-primary"
                        >
                            Back to {moduleConfig.name}
                        </button>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col relative overflow-hidden">
            {/* Background */}
            <div className="fixed inset-0 bg-gradient-main z-0" />
            <BackgroundParticles />
            <div className="orb orb-1" />
            <div className="orb orb-2" />

            {/* Chat takes full height */}
            <div className="relative z-10 flex-1 flex flex-col">
                <ChatInterface
                    level={levelConfig}
                    moduleId={moduleId}
                    accentColor={moduleConfig.accentColor}
                    guardianName={moduleConfig.guardianName}
                    onBack={() => router.push(`/modules/${moduleId}`)}
                />
            </div>
        </div>
    );
}
