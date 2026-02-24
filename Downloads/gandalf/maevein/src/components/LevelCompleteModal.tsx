'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Trophy, Clock, MessageCircle, Lightbulb, Zap, ArrowRight, LayoutDashboard } from 'lucide-react';

interface LevelCompleteProps {
    level: number;
    stats: {
        timeSpent: number;
        attempts: number;
        hintsUsed: number;
        xpEarned: number;
    };
    accentColor: string;
    onNext: () => void;
    onDashboard: () => void;
}

export function LevelCompleteModal({ level, stats, accentColor, onNext, onDashboard }: LevelCompleteProps) {
    useEffect(() => {
        // Double confetti burst
        const end = Date.now() + 2000;
        const frame = () => {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0, y: 0.6 },
                colors: ['#4facfe', '#00f2fe', accentColor],
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0.6 },
                colors: ['#667eea', '#764ba2', accentColor],
            });
            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();
    }, [accentColor]);

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    };

    const stars = 3 - Math.min(stats.hintsUsed, 2);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="w-full max-w-md glass-card p-8 relative overflow-hidden"
                initial={{ scale: 0.7, y: 60, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: 'spring', damping: 15, stiffness: 200 }}
            >
                {/* Background glow */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        background: `radial-gradient(circle at center, ${accentColor} 0%, transparent 70%)`,
                    }}
                />

                <div className="relative z-10">
                    {/* Trophy icon */}
                    <div className="flex justify-center mb-5">
                        <motion.div
                            className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center shadow-lg"
                            style={{ boxShadow: `0 0 40px rgba(245, 158, 11, 0.4)` }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
                        >
                            <Trophy size={36} className="text-white" />
                        </motion.div>
                    </div>

                    {/* Stars */}
                    <div className="flex justify-center gap-2 mb-4">
                        {[1, 2, 3].map((star) => (
                            <motion.span
                                key={star}
                                className={`text-2xl ${star <= stars ? '' : 'opacity-20 grayscale'}`}
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.4 + star * 0.15, type: 'spring' }}
                            >
                                ⭐
                            </motion.span>
                        ))}
                    </div>

                    {/* Title */}
                    <motion.h2
                        className="text-3xl font-bold text-white text-center mb-1"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Level {level} Complete!
                    </motion.h2>
                    <motion.p
                        className="text-white/50 text-center mb-6 text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        You&apos;ve mastered this challenge. Ready for the next?
                    </motion.p>

                    {/* Stats grid */}
                    <motion.div
                        className="grid grid-cols-2 gap-3 mb-6"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <StatCard icon={<Clock size={16} />} label="Time" value={formatTime(stats.timeSpent)} />
                        <StatCard icon={<MessageCircle size={16} />} label="Messages" value={String(stats.attempts)} />
                        <StatCard icon={<Lightbulb size={16} />} label="Hints Used" value={`${stats.hintsUsed}/3`} />
                        <StatCard icon={<Zap size={16} />} label="XP Earned" value={`+${stats.xpEarned}`} color="#fbbf24" />
                    </motion.div>

                    {/* Action buttons */}
                    <motion.div
                        className="space-y-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <button
                            onClick={onNext}
                            className="w-full py-3.5 px-6 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all hover:shadow-xl"
                            style={{
                                background: `linear-gradient(135deg, ${accentColor}cc, ${accentColor})`,
                                boxShadow: `0 4px 20px ${accentColor}40`,
                            }}
                        >
                            Next Level
                            <ArrowRight size={18} />
                        </button>
                        <button
                            onClick={onDashboard}
                            className="w-full py-3.5 px-6 glass rounded-xl font-semibold text-white/80 flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                        >
                            <LayoutDashboard size={16} />
                            Back to Module
                        </button>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
}

function StatCard({
    icon,
    label,
    value,
    color,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    color?: string;
}) {
    return (
        <div className="glass rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-1.5 text-white/40 mb-1">
                {icon}
                <span className="text-xs">{label}</span>
            </div>
            <p
                className="text-xl font-bold"
                style={{ color: color || '#ffffff' }}
            >
                {value}
            </p>
        </div>
    );
}
