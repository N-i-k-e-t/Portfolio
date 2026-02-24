'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, Download, CheckCircle, Printer, ArrowLeft, Mail, User, FileText, Globe } from 'lucide-react';
import { BackgroundParticles } from '@/components/BackgroundParticles';
import Link from 'next/link';

export default function InvoicePage() {
    const params = useParams();
    const router = useRouter();
    const [invoiceData, setInvoiceData] = useState<any>(null);

    useEffect(() => {
        const data = sessionStorage.getItem(`invoice_${params.orderId}`);
        if (data) {
            setInvoiceData(JSON.parse(data));
        }
    }, [params.orderId]);

    const handlePrint = () => {
        window.print();
    };

    if (!invoiceData) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-white/60 font-medium">Generating Secure Invoice...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#060606] text-white print:bg-white print:text-black">
            <div className="fixed inset-0 bg-gradient-main z-0 print:hidden" />
            <BackgroundParticles className="opacity-30 print:hidden" />

            <div className="relative z-10 max-w-5xl mx-auto px-4 py-8 sm:py-16">
                {/* Actions Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-6 print:hidden">
                    <Link href="/" className="flex items-center gap-2 text-white/40 hover:text-white transition-all group">
                        <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10">
                            <ArrowLeft size={16} />
                        </div>
                        <span className="font-medium">Dashboard</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handlePrint}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-semibold"
                        >
                            <Printer size={18} />
                            Print Receipt
                        </button>
                        <button
                            onClick={handlePrint}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all font-bold shadow-lg shadow-blue-500/20"
                        >
                            <Download size={18} />
                            Download PDF
                        </button>
                    </div>
                </div>

                {/* Main Invoice Glass */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card bg-black/60 backdrop-blur-2xl border-white/10 overflow-hidden shadow-2xl print:bg-transparent print:border-none print:shadow-none"
                >
                    {/* Status Top Strip */}
                    <div className="bg-emerald-500/10 border-b border-emerald-500/20 px-8 py-3 flex items-center justify-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest print:hidden">
                        <CheckCircle size={14} />
                        Payment Successfully Verified & Captured
                    </div>

                    <div className="p-8 sm:p-12">
                        {/* Header Section */}
                        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                                        <Shield size={28} className="text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-black tracking-tighter uppercase">Knowledge Guardian</h1>
                                        <p className="text-blue-400/60 font-bold text-xs uppercase tracking-widest">Mastery Level: Pro Access</p>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-white/40 text-sm">
                                        <Globe size={14} />
                                        <span>maevein.andsnetwork.com</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-white/40 text-sm">
                                        <Mail size={14} />
                                        <span>info@andsnetwork.com</span>
                                    </div>
                                </div>
                            </div>

                            <div className="text-right space-y-4">
                                <div className="inline-block px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                                    <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-1">Receipt Number</p>
                                    <p className="font-mono text-xl font-bold text-white">#KG-{invoiceData.id.slice(-8).toUpperCase()}</p>
                                </div>
                                <div className="text-sm text-white/40">
                                    <p>Issued on {new Date(invoiceData.create_time).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
                                </div>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16 border-y border-white/5 py-12 print:border-black">
                            {/* Payer */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-white/30 uppercase text-[10px] font-bold tracking-widest">
                                    <User size={12} />
                                    <span>Billed To</span>
                                </div>
                                <div>
                                    <p className="text-xl font-bold">{invoiceData.payer.name.given_name} {invoiceData.payer.name.surname}</p>
                                    <p className="text-white/50 text-sm">{invoiceData.payer.email_address}</p>
                                    <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-white/40">
                                        <span className="w-1 h-1 rounded-full bg-blue-400" />
                                        ID: {invoiceData.userId}
                                    </div>
                                </div>
                            </div>

                            {/* Transaction */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-white/30 uppercase text-[10px] font-bold tracking-widest">
                                    <FileText size={12} />
                                    <span>Payment Data</span>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-white/80 font-medium">Method: PayPal Express</p>
                                    <p className="text-white/40 text-xs font-mono truncate">ID: {invoiceData.id}</p>
                                    <p className="text-white/40 text-xs">Auth Status: COMPLETED</p>
                                </div>
                            </div>

                            {/* Plan */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-white/30 uppercase text-[10px] font-bold tracking-widest">
                                    <Sparkles size={12} />
                                    <span>Subscription</span>
                                </div>
                                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-600/10 border border-blue-500/20">
                                    <p className="text-blue-400 font-black uppercase text-sm tracking-tight">{invoiceData.amount.value == '49.99' ? 'Guardian Yearly' : 'Pro Monthly'}</p>
                                    <p className="text-white/40 text-[10px] mt-1">Full Access Privileges Enabled</p>
                                </div>
                            </div>
                        </div>

                        {/* Charges Table */}
                        <div className="mb-12">
                            <div className="grid grid-cols-12 pb-4 border-b border-white/10 text-[10px] font-bold text-white/30 uppercase tracking-widest print:border-black">
                                <div className="col-span-8">Description</div>
                                <div className="col-span-2 text-center">Qty</div>
                                <div className="col-span-2 text-right">Total</div>
                            </div>
                            <div className="grid grid-cols-12 py-8 items-center border-b border-white/5 print:border-black">
                                <div className="col-span-8">
                                    <p className="text-lg font-bold text-white">Knowledge Guardian Pro Access</p>
                                    <p className="text-sm text-white/40 mt-1 italic">Professional educational license for STEM secrets</p>
                                </div>
                                <div className="col-span-2 text-center text-white/60 font-mono">1</div>
                                <div className="col-span-2 text-right text-xl font-bold text-white">
                                    ${invoiceData.amount.value}
                                </div>
                            </div>
                        </div>

                        {/* Totals Summary */}
                        <div className="flex flex-col items-end gap-3 mb-16">
                            <div className="flex justify-between w-full max-w-[300px] text-white/40">
                                <span>Subtotal</span>
                                <span>${invoiceData.amount.value}</span>
                            </div>
                            <div className="flex justify-between w-full max-w-[300px] text-white/40">
                                <span>Platform Processing Fee</span>
                                <span className="text-emerald-400/60">$0.00</span>
                            </div>
                            <div className="h-px bg-white/10 w-full max-w-[300px] my-2 print:bg-black" />
                            <div className="flex justify-between w-full max-w-[300px] items-baseline">
                                <span className="text-sm font-bold uppercase tracking-widest text-blue-400">Grand Total</span>
                                <div className="text-right">
                                    <span className="text-3xl font-black text-white">${invoiceData.amount.value}</span>
                                    <span className="text-xs font-bold text-white/30 ml-2">{invoiceData.amount.currency_code}</span>
                                </div>
                            </div>
                        </div>

                        {/* Final Signature-ish Detail */}
                        <div className="flex flex-col items-center justify-center p-8 border-t border-white/5 space-y-4 print:border-black">
                            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
                            <p className="text-white/20 text-[10px] text-center uppercase tracking-[0.3em]">Computer Generated Receipt — No Signature Required</p>
                            <div className="flex gap-4 opacity-20">
                                <Shield size={16} />
                                <Zap size={16} />
                                <Star size={16} />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Print Branding Footer */}
                <div className="mt-12 text-center hidden print:block">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-black">Generated by Knowledge Guardian Security Systems</p>
                </div>
            </div>
        </div>
    );
}
