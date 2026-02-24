'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useGame } from '@/lib/game-context';
import { Lock, CheckCircle2, PlayCircle, ChevronRight } from 'lucide-react';

interface ModuleCardProps {
    module: {
        id: string;
        name: string;
        theme: string;
        icon: string;
        accentColor: string;
        totalLevels: number;
    };
}

export function ModuleCard({ module }: ModuleCardProps) {
    const router = useRouter();
    const { getModuleCompletedCount } = useGame();
    const completed = getModuleCompletedCount(module.id);
    const isAvailable = module.totalLevels > 0;
    const progress = module.totalLevels > 0 ? (completed / module.totalLevels) * 100 : 0;

    return (
        <motion.div
            className={`relative w-full rounded-3xl overflow-hidden glass-card cursor-pointer group ${!isAvailable ? 'opacity-50' : ''
                }`}
            whileHover={isAvailable ? { y: -8, scale: 1.02 } : {}}
            whileTap={isAvailable ? { scale: 0.98 } : {}}
            onClick={() => isAvailable && router.push(`/modules/${module.id}`)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Accent gradient overlay */}
            <div
                className="absolute inset-0 opacity-[0.07] group-hover:opacity-[0.15] transition-opacity duration-500"
                style={{
                    background: `linear-gradient(135deg, transparent 0%, ${module.accentColor} 100%)`,
                }}
            />

            {/* Glow effect on hover */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                style={{
                    boxShadow: `inset 0 0 60px ${module.accentColor}15, 0 0 30px ${module.accentColor}10`,
                }}
            />

            <div className="relative p-6 h-full flex flex-col min-h-[280px]">
                {/* Icon with float animation */}
                <div className="w-16 h-16 mb-4">
                    <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <span className="text-5xl">{module.icon}</span>
                    </motion.div>
                </div>

                {/* Module name & theme */}
                <h3 className="text-2xl font-bold text-white mb-1">{module.name}</h3>
                <p className="text-sm text-white/50 mb-2">{module.theme}</p>

                {/* Status badge */}
                {!isAvailable && (
                    <div className="flex items-center gap-1.5 text-xs text-white/40 mb-4">
                        <Lock size={12} />
                        <span>Coming Soon</span>
                    </div>
                )}

                {/* Spacer */}
                <div className="flex-1" />

                {/* Progress bar */}
                {isAvailable && (
                    <div className="mt-auto">
                        <div className="flex items-center gap-1 mb-2.5">
                            {Array.from({ length: module.totalLevels }).map((_, i) => (
                                <div
                                    key={i}
                                    className="h-2 flex-1 rounded-full transition-all duration-500"
                                    style={{
                                        background:
                                            i < completed
                                                ? `linear-gradient(135deg, ${module.accentColor}, ${module.accentColor}cc)`
                                                : 'rgba(255, 255, 255, 0.1)',
                                    }}
                                />
                            ))}
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-xs text-white/50">
                                {completed} of {module.totalLevels} levels
                            </p>
                            {completed > 0 && completed < module.totalLevels && (
                                <div className="flex items-center gap-1 text-xs" style={{ color: module.accentColor }}>
                                    <PlayCircle size={12} />
                                    <span>In Progress</span>
                                </div>
                            )}
                            {completed === module.totalLevels && (
                                <div className="flex items-center gap-1 text-xs text-emerald-400">
                                    <CheckCircle2 size={12} />
                                    <span>Complete</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* CTA Button */}
                {isAvailable && (
                    <motion.button
                        className="mt-4 w-full py-3 px-4 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2 transition-all duration-200"
                        style={{
                            background: `linear-gradient(135deg, ${module.accentColor}90, ${module.accentColor}cc)`,
                            boxShadow: `0 4px 20px ${module.accentColor}30`,
                        }}
                        whileHover={{ scale: 1.02, boxShadow: `0 6px 28px ${module.accentColor}50` }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {completed === 0
                            ? 'Start Learning'
                            : completed < module.totalLevels
                                ? `Continue Level ${completed + 1}`
                                : 'Replay'}
                        <ChevronRight size={16} />
                    </motion.button>
                )}
            </div>
        </motion.div>
    );
}
