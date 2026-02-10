"use client";

import React, { useState, useEffect } from 'react';
import { Loader2, X, Lock } from 'lucide-react';

interface SecurityVerificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onVerify: (code: string) => Promise<void>;
    actionName: string; // e.g., "Add Payment Config"
}

export default function SecurityVerificationModal({ isOpen, onClose, onVerify, actionName }: SecurityVerificationModalProps) {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Reset state when opening
    useEffect(() => {
        if (isOpen) {
            setCode(['', '', '', '', '', '']);
            setError(null);
            setLoading(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleChange = (element: HTMLInputElement, index: number) => {
        if (isNaN(Number(element.value))) return;

        const newCode = [...code];
        newCode[index] = element.value;
        setCode(newCode);

        // Focus next input
        if (element.value && element.nextSibling) {
            (element.nextSibling as HTMLInputElement).focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            const newCode = [...code];
            newCode[index - 1] = '';
            setCode(newCode);

            const prevInput = (e.currentTarget.previousSibling as HTMLInputElement);
            if (prevInput) prevInput.focus();
        }
    };

    const handleVerify = async () => {
        const codeString = code.join('');
        if (codeString.length !== 6) {
            setError('Please enter a valid 6-digit code');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await onVerify(codeString);
            // Modal closing is handled by parent on success
        } catch (err: any) {
            setError(err.message || 'Verification failed');
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-[#111C44] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock className="w-8 h-8 text-blue-500" />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">Security Verification</h3>
                    <p className="text-slate-400 text-sm mb-6">
                        To continue with <b>{actionName}</b>, please enter the 6-digit code from your Authenticator App.
                    </p>

                    <div className="flex justify-center gap-2 mb-6">
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={e => handleChange(e.target, index)}
                                onKeyDown={e => handleKeyDown(e, index)}
                                onPaste={e => {
                                    e.preventDefault();
                                    const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
                                    const newCode = [...code];
                                    pastedData.forEach((d, i) => {
                                        if (index + i < 6) newCode[index + i] = d;
                                    });
                                    setCode(newCode);
                                }}
                                className="w-10 h-12 bg-black/20 border border-white/10 rounded-lg text-center text-xl font-bold text-white focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        ))}
                    </div>

                    {error && (
                        <div className="text-red-400 text-sm mb-4 bg-red-400/10 p-2 rounded-lg">
                            {error}
                        </div>
                    )}

                    <button
                        onClick={handleVerify}
                        disabled={loading || code.join('').length !== 6}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Verifying...
                            </>
                        ) : (
                            'Verify & Proceed'
                        )}
                    </button>

                    <button
                        onClick={onClose}
                        className="mt-4 text-sm text-slate-500 hover:text-slate-300"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
