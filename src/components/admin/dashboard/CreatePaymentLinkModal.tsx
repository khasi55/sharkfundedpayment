'use client';

import React, { useState } from 'react';
import { X, Copy, CheckCircle2, Link as LinkIcon, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface CreatePaymentLinkModalProps {
    onClose: () => void;
    onSuccess: () => void;
}

export default function CreatePaymentLinkModal({ onClose, onSuccess }: CreatePaymentLinkModalProps) {
    const [amount, setAmount] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [generatedLink, setGeneratedLink] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (!amount || Number(amount) <= 0) {
                throw new Error('Please enter a valid amount');
            }

            // Create transaction in 'pending_payment' state
            const { data, error: dbError } = await supabase
                .from('transactions')
                .insert([{
                    amount: Number(amount),
                    status: 'pending_payment',
                    customer_details: {
                        name: name || 'Guest',
                        email: email || '',
                        generated_via: 'admin_link'
                    },
                    utr: `LINK-${Date.now()}-${Math.random().toString(36).substring(7)}` // Placeholder
                }])
                .select()
                .single();

            if (dbError) throw dbError;

            // Generate Link
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
            const link = `${baseUrl}/secure-checkout/${data.id}`;
            setGeneratedLink(link);
            onSuccess(); // Refresh transaction list in background

        } catch (err: any) {
            console.error('Error creating link:', err);
            setError(err.message || 'Failed to generate link');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        if (generatedLink) {
            navigator.clipboard.writeText(generatedLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />
            <div className="bg-white rounded-[32px] w-full max-w-md overflow-hidden shadow-2xl relative z-10 animate-in fade-in zoom-in duration-200">
                <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">Create Payment Link</h3>
                        <p className="text-slate-500 text-sm mt-1">Generate a secure fixed-amount link</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-8">
                    {!generatedLink ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 text-sm">
                                    <AlertCircle size={18} />
                                    <span>{error}</span>
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Amount (INR)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                                    <input
                                        type="number"
                                        required
                                        min="1"
                                        className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-bold text-lg transition-all"
                                        placeholder="0.00"
                                        value={amount}
                                        onChange={e => setAmount(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Customer Name <span className="text-slate-400 font-normal">(Optional)</span></label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-medium transition-all"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Email <span className="text-slate-400 font-normal">(Optional)</span></label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-medium transition-all"
                                    placeholder="john@example.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {loading ? 'Generating...' : (
                                    <>
                                        <LinkIcon size={18} />
                                        Generate Link
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        <div className="space-y-6">
                            <div className="flex flex-col items-center justify-center text-center py-6">
                                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                                    <CheckCircle2 size={32} />
                                </div>
                                <h4 className="text-xl font-bold text-slate-900">Link Generated!</h4>
                                <p className="text-slate-500 mt-1">Share this link with the customer to collect payment.</p>
                            </div>

                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
                                <div className="flex-1 font-mono text-sm text-slate-600 truncate">
                                    {generatedLink}
                                </div>
                                <button
                                    onClick={copyToClipboard}
                                    className={`p-2 rounded-xl transition-all ${copied ? 'bg-emerald-500 text-white' : 'bg-white border border-slate-200 text-slate-500 hover:text-blue-600'}`}
                                >
                                    {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                                </button>
                            </div>

                            <button
                                onClick={() => {
                                    setGeneratedLink(null);
                                    setAmount('');
                                    setName('');
                                    setEmail('');
                                }}
                                className="w-full py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl transition-all"
                            >
                                Create Another Link
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
