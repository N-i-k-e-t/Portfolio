'use client';

import { motion } from 'framer-motion';
import { useGame } from '@/lib/game-context';
import { Lock, CheckCircle2, Play, Star } from 'lucide-react';
import type { LevelConfig } from '@/lib/game-config';

interface LevelSelectorProps {
    moduleId: string;
    levels: LevelConfig[];
    accentColor: string;
    onSelectLevel: (levelId: number) => void;
}

export function LevelSelector({ moduleId, levels, accentColor, onSelectLevel }: LevelSelectorProps) {
    const { isLevelCompleted, isLevelUnlocked, getLevelProgress } = useGame();

    return (
        <div className="space-y-3">
            {levels.map((level, index) => {
                const completed = isLevelCompleted(moduleId, level.id);
                const unlocked = isLevelUnlocked(moduleId, level.id);
                const progress = getLevelProgress(moduleId, level.id);
                const isCurrent = unlocked && !completed;

                return (
                    <motion.button
                        key={level.id}
                        className={`w-full text-left rounded-2xl border transition-all duration-300 overflow-hidden ${completed
                                ? 'bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/15'
                                : isCurrent
                                    ? 'bg-white/8 border-white/20 hover:bg-white/12'
                                    : 'bg-white/3 border-white/8 cursor-not-allowed'
                            }`}
                        style={
                            isCurrent
                                ? { borderColor: `${accentColor}50`, boxShadow: `0 0 20px ${accentColor}15` }
                                : {}
                        }
                        onClick={() => unlocked && onSelectLevel(level.id)}
                        disabled={!unlocked}
                        whileHover={unlocked ? { x: 4 } : {}}
                        whileTap={unlocked ? { scale: 0.99 } : {}}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="flex items-center gap-4 p-4">
                            {/* Level number / Status icon */}
                            <div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0 ${completed
                                        ? 'bg-emerald-500/20 text-emerald-400'
                                        : isCurrent
                                            ? 'text-white'
                                            : 'bg-white/5 text-white/30'
                                    }`}
                                style={
                                    isCurrent
                                        ? { background: `linear-gradient(135deg, ${accentColor}30, ${accentColor}15)`, color: accentColor }
                                        : {}
                                }
                            >
                                {completed ? (
                                    <CheckCircle2 size={22} />
                                ) : !unlocked ? (
                                    <Lock size={18} />
                                ) : (
                                    <span>{level.id}</span>
                                )}
                            </div>

                            {/* Level info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <h4 className={`font-semibold truncate ${!unlocked ? 'text-white/30' : 'text-white'}`}>
                                        {level.title}
                                    </h4>
                                    <span className="text-xs">{level.difficultyEmoji}</span>
                                </div>
                                <p className={`text-sm truncate ${!unlocked ? 'text-white/20' : 'text-white/50'}`}>
                                    {level.subtitle}
                                </p>
                                {progress && completed && (
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="text-xs text-white/40">
                                            {Math.floor(progress.timeSpent / 60)}m {progress.timeSpent % 60}s
                                        </span>
                                        <span className="text-xs text-white/40">
                                            {progress.attempts} {progress.attempts === 1 ? 'attempt' : 'attempts'}
                                        </span>
                                        <div className="flex items-center gap-0.5">
                                            {[1, 2, 3].map((star) => (
                                                <Star
                                                    key={star}
                                                    size={10}
                                                    className={
                                                        star <= 3 - progress.hintsUsed
                                                            ? 'text-yellow-400 fill-yellow-400'
                                                            : 'text-white/20'
                                                    }
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Action indicator */}
                            <div className="flex-shrink-0">
                                {isCurrent && (
                                    <motion.div
                                        className="w-10 h-10 rounded-full flex items-center justify-center"
                                        style={{ background: `${accentColor}25` }}
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        <Play size={16} style={{ color: accentColor }} fill={accentColor} />
                                    </motion.div>
                                )}
                                {completed && (
                                    <div className="text-xs text-emerald-400/70 font-medium">
                                        Replay →
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.button>
                );
            })}
        </div>
    );
}
