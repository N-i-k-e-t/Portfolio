'use client';

import { motion } from 'framer-motion';
import { BackgroundParticles } from '@/components/BackgroundParticles';
import { Shield, Check, Zap, Star, ArrowLeft, Trophy, Calendar, Sparkles } from 'lucide-react';
import Link from 'next/link';
import PayPalCheckout from '@/components/PayPalCheckout';
import { useState } from 'react';

export default function PricingPage() {
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    const plans = {
        free: {
            name: "Beginner",
            price: "0",
            period: "/ forever",
            desc: "Start your journey",
            features: [
                "Basic Level Access",
                "Community Support",
                "Standard Learning Path",
                "Profile Stats"
            ]
        },
        monthly: {
            name: "Pro Monthly",
            price: "5.49",
            period: "/ month",
            desc: "Flexible full access",
            features: [
                "Unlock ALL Learning Modules",
                "Unlimited AI Interactions",
                "Standard XP Multiplier",
                "Monthly Secret Levels",
                "Ad-free Experience"
            ]
        },
        yearly: {
            name: "maevein Yearly",
            price: "49.99",
            period: "/ year",
            desc: "Best value for masters",
            features: [
                "Everything in Monthly",
                "3x XP Multiplier (Yearly Exclusive)",
                "Early Access to New Modules",
                "Yearly Achievement Badge",
                "2 Months Free Included"
            ]
        }
    };

    if (paymentSuccess) {
        return (
            <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
                <div className="fixed inset-0 bg-gradient-main z-0" />
                <BackgroundParticles />
                <motion.div
                    className="relative z-10 glass p-12 text-center max-w-md mx-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-400 border border-emerald-500/30">
                        <Check size={40} />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Upgrade Confirmed!</h2>
                    <p className="text-white/60 mb-8">Your account has been upgraded successfully. Your official invoice is ready.</p>
                    <Link href="/" className="btn-primary block w-full">
                        Back to Dashboard
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            <div className="fixed inset-0 bg-gradient-main z-0" />
            <BackgroundParticles />

            <div className="relative z-10">
                <header className="border-b border-white/5">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                        <Link href="/" className="flex items-center gap-3 group w-fit">
                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                <ArrowLeft size={16} className="text-white/60" />
                            </div>
                            <h1 className="font-bold text-white text-md leading-tight">Knowledge maevein</h1>
                        </Link>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-20">
                    <motion.div
                        className="text-center max-w-2xl mx-auto mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">Choose Your Mastery Level</h2>
                        <p className="text-white/50 text-lg mb-8">
                            Join over 1,000+ maeveins. Unlock all STEM modules and AI interactions.
                        </p>

                        <div className="flex items-center justify-center gap-4 mb-8">
                            <span className={`text-sm ${billingCycle === 'monthly' ? 'text-white font-bold' : 'text-white/40'}`}>Monthly Billing</span>
                            <button
                                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                                className="w-14 h-7 rounded-full bg-white/10 p-1 relative transition-colors duration-200"
                            >
                                <motion.div
                                    className="w-5 h-5 bg-blue-500 rounded-full"
                                    animate={{ x: billingCycle === 'monthly' ? 0 : 28 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            </button>
                            <span className={`text-sm ${billingCycle === 'yearly' ? 'text-white font-bold' : 'text-white/40'}`}>Yearly (Save 25%)</span>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">

                        {/* Free Plan */}
                        <motion.div
                            className="glass-card p-8 flex flex-col border-white/10 bg-white/5 opacity-80"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="mb-8">
                                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 text-white/60">
                                    <Star size={24} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">{plans.free.name}</h3>
                                <div className="text-4xl font-extrabold text-white mb-2">$0<span className="text-sm font-normal text-white/30 ml-2">{plans.free.period}</span></div>
                                <p className="text-white/40 text-sm">{plans.free.desc}</p>
                            </div>

                            <ul className="space-y-4 mb-10 flex-1">
                                {plans.free.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-white/50">
                                        <Check size={12} className="text-blue-400" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Link href="/" className="btn-secondary w-full text-center">
                                Current Strategy
                            </Link>
                        </motion.div>

                        {/* Monthly Plan */}
                        <motion.div
                            className={`glass-card p-8 flex flex-col transition-all duration-300 relative ${billingCycle === 'monthly' ? 'border-blue-500/50 ring-1 ring-blue-500/20 bg-blue-500/5 scale-105' : 'border-white/10'}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="mb-8">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4 text-blue-400">
                                    <Calendar size={24} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">{plans.monthly.name}</h3>
                                <div className="text-4xl font-extrabold text-white mb-2">${plans.monthly.price}<span className="text-sm font-normal text-white/30 ml-2">{plans.monthly.period}</span></div>
                                <p className="text-white/40 text-sm">{plans.monthly.desc}</p>
                            </div>

                            <ul className="space-y-4 mb-10 flex-1">
                                {plans.monthly.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-white/70">
                                        <Check size={12} className="text-blue-400" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <PayPalCheckout
                                amount={plans.monthly.price}
                                onSuccess={() => setPaymentSuccess(true)}
                            />
                        </motion.div>

                        {/* Yearly Plan */}
                        <motion.div
                            className={`glass-card p-8 flex flex-col transition-all duration-300 relative overflow-hidden ${billingCycle === 'yearly' ? 'border-purple-500/50 ring-1 ring-purple-500/20 bg-purple-500/5 scale-105' : 'border-white/10'}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="absolute top-0 right-0 p-4">
                                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-[9px] font-black text-white px-2 py-0.5 rounded-full uppercase tracking-tighter">
                                    Best Value
                                </div>
                            </div>
                            <div className="mb-8">
                                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4 text-purple-400">
                                    <Zap size={24} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">{plans.yearly.name}</h3>
                                <div className="text-4xl font-extrabold text-white mb-2">${plans.yearly.price}<span className="text-sm font-normal text-white/30 ml-2">{plans.yearly.period}</span></div>
                                <p className="text-white/40 text-sm">{plans.yearly.desc}</p>
                            </div>

                            <ul className="space-y-4 mb-10 flex-1">
                                {plans.yearly.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                                        <Check size={12} className="text-purple-400" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <PayPalCheckout
                                amount={plans.yearly.price}
                                onSuccess={() => setPaymentSuccess(true)}
                            />
                        </motion.div>
                    </div>

                    <div className="mt-20 flex flex-wrap justify-center gap-12 border-t border-white/5 pt-12">
                        {[
                            { icon: <Shield className="text-blue-400" />, title: 'Secure Checkout' },
                            { icon: <Zap className="text-yellow-400" />, title: 'Instant Unlock' },
                            { icon: <Star className="text-purple-400" />, title: 'Life-time Access' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 opacity-40">
                                {item.icon}
                                <span className="text-[10px] font-bold text-white tracking-[0.2em] uppercase">{item.title}</span>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}
