'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LevelProgress {
    completed: boolean;
    attempts: number;
    hintsUsed: number;
    timeSpent: number; // seconds
    completedAt?: string;
}

interface ModuleProgress {
    [levelId: number]: LevelProgress;
}

interface GameProgress {
    [moduleId: string]: ModuleProgress;
}

interface GameState {
    progress: GameProgress;
    totalXP: number;
    streak: number;
    lastPlayedAt: string | null;
    isPro: boolean;
}

interface GameContextType {
    gameState: GameState;
    isLevelCompleted: (moduleId: string, levelId: number) => boolean;
    isLevelUnlocked: (moduleId: string, levelId: number) => boolean;
    getLevelProgress: (moduleId: string, levelId: number) => LevelProgress | null;
    getModuleCompletedCount: (moduleId: string) => number;
    completeLevel: (moduleId: string, levelId: number, stats: { attempts: number; hintsUsed: number; timeSpent: number }) => void;
    unlockPro: () => void;
    resetProgress: () => void;
}

const defaultState: GameState = {
    progress: {},
    totalXP: 0,
    streak: 0,
    lastPlayedAt: null,
    isPro: false,
};

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
    const [gameState, setGameState] = useState<GameState>(defaultState);
    const [mounted, setMounted] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('maevein-progress');
        if (saved) {
            try {
                setGameState(JSON.parse(saved));
            } catch {
                setGameState(defaultState);
            }
        }
        setMounted(true);
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        if (mounted) {
            localStorage.setItem('maevein-progress', JSON.stringify(gameState));
        }
    }, [gameState, mounted]);

    const isLevelCompleted = (moduleId: string, levelId: number): boolean => {
        return gameState.progress[moduleId]?.[levelId]?.completed ?? false;
    };

    const isLevelUnlocked = (moduleId: string, levelId: number): boolean => {
        if (levelId === 1) return true;
        return isLevelCompleted(moduleId, levelId - 1);
    };

    const getLevelProgress = (moduleId: string, levelId: number): LevelProgress | null => {
        return gameState.progress[moduleId]?.[levelId] ?? null;
    };

    const getModuleCompletedCount = (moduleId: string): number => {
        const moduleProgress = gameState.progress[moduleId];
        if (!moduleProgress) return 0;
        return Object.values(moduleProgress).filter((lp) => lp.completed).length;
    };

    const completeLevel = (
        moduleId: string,
        levelId: number,
        stats: { attempts: number; hintsUsed: number; timeSpent: number }
    ) => {
        const xpBase = 100;
        const xpMultiplier = levelId; // Higher levels give more XP
        const hintPenalty = stats.hintsUsed * 20;
        const xpEarned = Math.max(50, xpBase * xpMultiplier - hintPenalty);

        setGameState((prev) => ({
            ...prev,
            progress: {
                ...prev.progress,
                [moduleId]: {
                    ...prev.progress[moduleId],
                    [levelId]: {
                        completed: true,
                        attempts: stats.attempts,
                        hintsUsed: stats.hintsUsed,
                        timeSpent: stats.timeSpent,
                        completedAt: new Date().toISOString(),
                    },
                },
            },
            totalXP: prev.totalXP + xpEarned,
            lastPlayedAt: new Date().toISOString(),
        }));
    };

    const unlockPro = () => {
        setGameState((prev) => ({
            ...prev,
            isPro: true,
        }));
    };

    const resetProgress = () => {
        setGameState(defaultState);
        localStorage.removeItem('maevein-progress');
    };

    if (!mounted) {
        return null; // Don't render until hydrated
    }

    return (
        <GameContext.Provider
            value={{
                gameState,
                isLevelCompleted,
                isLevelUnlocked,
                getLevelProgress,
                getModuleCompletedCount,
                completeLevel,
                unlockPro,
                resetProgress,
            }}
        >
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
}
