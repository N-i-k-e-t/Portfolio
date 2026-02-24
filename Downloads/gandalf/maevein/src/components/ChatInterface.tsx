'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Lightbulb, ArrowLeft, RotateCcw, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { useGame } from '@/lib/game-context';
import type { LevelConfig } from '@/lib/game-config';
import { checkAnswer, checkInputGuard, checkOutputGuard } from '@/lib/game-config';
import { LevelCompleteModal } from './LevelCompleteModal';

interface Message {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
}

interface ChatInterfaceProps {
    level: LevelConfig;
    moduleId: string;
    accentColor: string;
    guardianName: string;
    onBack: () => void;
}

export function ChatInterface({ level, moduleId, accentColor, guardianName, onBack }: ChatInterfaceProps) {
    const router = useRouter();
    const { completeLevel, isLevelCompleted, isLevelUnlocked } = useGame();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [hintsUsed, setHintsUsed] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [startTime] = useState(Date.now());
    const [isCompleted, setIsCompleted] = useState(false);
    const [showCompleteModal, setShowCompleteModal] = useState(false);
    const [studentGuessedCorrectly, setStudentGuessedCorrectly] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Add guardian greeting on mount
    useEffect(() => {
        setMessages([
            {
                id: 'greeting',
                role: 'assistant',
                content: level.guardianGreeting,
                timestamp: new Date(),
            },
        ]);
    }, [level.guardianGreeting]);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = useCallback(async () => {
        if (!input.trim() || isLoading || isCompleted) return;

        const userMessage = input.trim();
        setInput('');
        setAttempts((a) => a + 1);

        // Add user message
        const userMsg: Message = {
            id: `user-${Date.now()}`,
            role: 'user',
            content: userMessage,
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMsg]);

        // Check if the student guessed correctly
        const guessedCorrectly = checkAnswer(userMessage, level);
        if (guessedCorrectly) {
            setStudentGuessedCorrectly(true);
        }

        // Input Guard check
        const inputCheck = checkInputGuard(userMessage, level.inputGuard);
        if (!inputCheck.passed) {
            const guardMsg: Message = {
                id: `guard-${Date.now()}`,
                role: 'assistant',
                content: inputCheck.feedback!,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, guardMsg]);
            return;
        }

        setIsLoading(true);

        try {
            // Build conversation history for the API
            const conversationHistory = messages
                .filter((m) => m.role !== 'system')
                .map((m) => ({
                    role: m.role as 'user' | 'assistant',
                    content: m.content,
                }));

            conversationHistory.push({ role: 'user', content: userMessage });

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: conversationHistory,
                    systemPrompt: level.systemPrompt,
                    levelId: level.id,
                    moduleId,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to get response');
            }

            const data = await response.json();
            let aiResponse = data.content;

            // Output Guard check
            const outputCheck = checkOutputGuard(aiResponse, level.outputGuard, guessedCorrectly || studentGuessedCorrectly);
            if (!outputCheck.safe) {
                aiResponse = outputCheck.filtered;
            }

            const aiMsg: Message = {
                id: `ai-${Date.now()}`,
                role: 'assistant',
                content: aiResponse,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiMsg]);

            // Check if student solved the level
            if (guessedCorrectly && !isCompleted) {
                const timeSpent = Math.floor((Date.now() - startTime) / 1000);
                setIsCompleted(true);

                // Delay the completion modal to let the AI response show
                setTimeout(() => {
                    completeLevel(moduleId, level.id, {
                        attempts,
                        hintsUsed,
                        timeSpent,
                    });
                    setShowCompleteModal(true);

                    // Trigger confetti
                    confetti({
                        particleCount: 150,
                        spread: 90,
                        origin: { x: 0.5, y: 0.5 },
                        colors: ['#4facfe', '#00f2fe', '#667eea', '#764ba2', accentColor],
                        ticks: 200,
                        gravity: 0.8,
                        scalar: 1.2,
                    });
                }, 1500);
            }
        } catch {
            const errorMsg: Message = {
                id: `error-${Date.now()}`,
                role: 'assistant',
                content: '⚠️ The Alchemist is momentarily distracted... Please check your API key configuration in `.env.local` and try again.',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    }, [input, isLoading, isCompleted, messages, level, moduleId, attempts, hintsUsed, startTime, completeLevel, accentColor, studentGuessedCorrectly]);

    const handleHint = () => {
        if (hintsUsed >= level.hints.length) return;

        const hint = level.hints[hintsUsed];
        setHintsUsed((h) => h + 1);

        const hintMsg: Message = {
            id: `hint-${Date.now()}`,
            role: 'assistant',
            content: `💡 **Hint ${hintsUsed + 1}/${level.hints.length}:** ${hint}`,
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, hintMsg]);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleNextLevel = () => {
        const nextLevelId = level.id + 1;
        if (isLevelUnlocked(moduleId, nextLevelId)) {
            setShowCompleteModal(false);
            router.push(`/modules/${moduleId}/level/${nextLevelId}`);
        } else {
            router.push(`/modules/${moduleId}`);
        }
    };

    return (
        <div className="flex flex-col h-full relative">
            {/* Header */}
            <div className="glass-dark px-4 py-3 flex items-center gap-3 z-10 flex-shrink-0">
                <motion.button
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                    onClick={onBack}
                    whileTap={{ scale: 0.95 }}
                >
                    <ArrowLeft size={18} className="text-white/70" />
                </motion.button>

                {/* Guardian avatar */}
                <motion.div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                    style={{ background: `${accentColor}25` }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    🧪
                </motion.div>

                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-sm truncate">{guardianName}</h3>
                    <p className="text-xs text-white/40 truncate">
                        Level {level.id}: {level.title}
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    {/* Difficulty badge */}
                    <span
                        className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{
                            background: `${level.difficultyColor}20`,
                            color: level.difficultyColor,
                        }}
                    >
                        {level.difficultyEmoji} {level.difficulty}
                    </span>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            initial={{ opacity: 0, y: 10, x: msg.role === 'user' ? 20 : -20 }}
                            animate={{ opacity: 1, y: 0, x: 0 }}
                            transition={{ duration: 0.25 }}
                        >
                            {msg.role !== 'user' && (
                                <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm mr-2 mt-1 flex-shrink-0"
                                    style={{ background: `${accentColor}20` }}
                                >
                                    🧪
                                </div>
                            )}
                            <div
                                className={
                                    msg.role === 'user' ? 'message-user' : 'message-ai'
                                }
                            >
                                <div className="text-sm leading-relaxed whitespace-pre-wrap">
                                    {msg.content.split(/(\*\*.*?\*\*)/).map((part, i) =>
                                        part.startsWith('**') && part.endsWith('**') ? (
                                            <strong key={i}>{part.slice(2, -2)}</strong>
                                        ) : (
                                            <span key={i}>{part}</span>
                                        )
                                    )}
                                </div>
                                <p className="text-[10px] opacity-40 mt-1.5">
                                    {msg.timestamp.toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Typing indicator */}
                {isLoading && (
                    <motion.div
                        className="flex justify-start"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm mr-2 mt-1 flex-shrink-0"
                            style={{ background: `${accentColor}20` }}
                        >
                            🧪
                        </div>
                        <div className="message-ai">
                            <div className="flex items-center gap-1.5">
                                <motion.div
                                    className="w-2 h-2 rounded-full bg-white/40"
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
                                />
                                <motion.div
                                    className="w-2 h-2 rounded-full bg-white/40"
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                                />
                                <motion.div
                                    className="w-2 h-2 rounded-full bg-white/40"
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="flex-shrink-0 p-4 glass-dark border-t border-white/5">
                {/* Hint button & stats row */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <motion.button
                            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 hover:bg-yellow-500/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            onClick={handleHint}
                            disabled={hintsUsed >= level.hints.length || isCompleted}
                            whileTap={{ scale: 0.95 }}
                            animate={hintsUsed === 0 && attempts >= 3 ? { scale: [1, 1.05, 1] } : {}}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Lightbulb size={12} />
                            Hint ({level.hints.length - hintsUsed} left)
                        </motion.button>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-white/30">
                        <span>{attempts} messages</span>
                        {isCompleted && (
                            <span className="text-emerald-400 flex items-center gap-1">
                                <Sparkles size={12} /> Solved!
                            </span>
                        )}
                    </div>
                </div>

                {/* Input box */}
                <div className="flex items-end gap-2">
                    <div className="flex-1 relative">
                        <textarea
                            ref={inputRef}
                            className="glass-input w-full px-4 py-3 pr-12 resize-none text-sm"
                            placeholder={isCompleted ? 'Level completed! 🎉' : 'Ask the Alchemist...'}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            rows={1}
                            disabled={isCompleted}
                            style={{ minHeight: '44px', maxHeight: '120px' }}
                        />
                    </div>
                    <motion.button
                        className="p-3 rounded-xl transition-all duration-200 flex-shrink-0 disabled:opacity-30"
                        style={{
                            background: input.trim()
                                ? `linear-gradient(135deg, ${accentColor}cc, ${accentColor})`
                                : 'rgba(255, 255, 255, 0.05)',
                            boxShadow: input.trim() ? `0 4px 16px ${accentColor}40` : 'none',
                        }}
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading || isCompleted}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Send size={18} className="text-white" />
                    </motion.button>
                </div>
            </div>

            {/* Level Complete Modal */}
            <AnimatePresence>
                {showCompleteModal && (
                    <LevelCompleteModal
                        level={level.id}
                        stats={{
                            timeSpent: Math.floor((Date.now() - startTime) / 1000),
                            attempts,
                            hintsUsed,
                            xpEarned: Math.max(50, 100 * level.id - hintsUsed * 20),
                        }}
                        accentColor={accentColor}
                        onNext={handleNextLevel}
                        onDashboard={() => router.push(`/modules/${moduleId}`)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
