'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, AlertCircle, Loader2, ShieldCheck, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const AdminLoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [step, setStep] = useState<'login' | '2fa_setup' | '2fa_verify'>('login');
    const [twoFactorSecret, setTwoFactorSecret] = useState<string>('');
    const [twoFactorAuthUrl, setTwoFactorAuthUrl] = useState<string>('');
    const [twoFactorCode, setTwoFactorCode] = useState('');

    // Store user data temporarily between steps
    const [tempUserData, setTempUserData] = useState<any>(null);

    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data && data.success) {
                setTempUserData(data.user);
                if (data.user.has2FA) {
                    setStep('2fa_verify');
                    setLoading(false);
                } else {
                    initiate2FASetup(data.user.email);
                }
            } else {
                setError(data?.message || 'Invalid credentials');
                setLoading(false);
            }
        } catch (err: any) {
            console.error('Login error:', err);
            setError(err.message || 'An unexpected error occurred');
            setLoading(false);
        }
    };

    const initiate2FASetup = async (userEmail: string) => {
        try {
            const response = await fetch('/api/admin/2fa/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: userEmail })
            });

            const data = await response.json();

            if (data.success) {
                setTwoFactorSecret(data.secret);
                setTwoFactorAuthUrl(data.otpauth);
                setStep('2fa_setup');
            } else {
                setError('Failed to generate 2FA setup');
            }
        } catch (err) {
            setError('Error initiating 2FA setup');
        } finally {
            setLoading(false);
        }
    };

    const handleVerify2FA = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const targetEmail = tempUserData?.email || email;
            const response = await fetch('/api/admin/2fa/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: targetEmail,
                    token: twoFactorCode,
                    secret: step === '2fa_setup' ? twoFactorSecret : undefined,
                    isSetup: step === '2fa_setup'
                })
            });

            const result = await response.json();

            if (result.success) {
                completeLogin(result.user);
            } else {
                setError(result.message || 'Invalid code');
                setLoading(false);
            }
        } catch (err) {
            setError('Verification failed');
            setLoading(false);
        }
    };

    const completeLogin = (verifiedUser?: any) => {
        const userData = verifiedUser || tempUserData;
        if (userData) {
            localStorage.setItem('admin_user', JSON.stringify(userData));
            const isHttps = typeof window !== 'undefined' && window.location.protocol === 'https:';
            const cookieValue = encodeURIComponent(JSON.stringify(userData));
            document.cookie = `admin_session=${cookieValue}; path=/; max-age=86400; SameSite=Lax${isHttps ? '; Secure' : ''}`;
        }
        window.location.href = '/sharkfunded2logintoadminwithpermission';
    };

    if (step === '2fa_setup') {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden p-8">
                    <div className="text-center mb-6">
                        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                            <QrCode className="text-blue-600" size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Set Up 2FA</h2>
                        <p className="text-slate-500 mt-2 text-sm">Scan this QR code with your authenticator app (e.g., Google Authenticator) to secure your account.</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-3 text-rose-600 text-sm">
                            <AlertCircle size={18} className="shrink-0 mt-0.5" />
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="flex justify-center mb-8 bg-white p-4 rounded-xl border border-slate-200">
                        {twoFactorAuthUrl && (
                            <QRCodeSVG value={twoFactorAuthUrl} size={180} />
                        )}
                    </div>

                    <div className="mb-6 text-center">
                        <p className="text-xs text-slate-400 font-mono break-all bg-slate-100 p-2 rounded">Secret: {twoFactorSecret}</p>
                    </div>

                    <form onSubmit={handleVerify2FA} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Enter 6-digit Code</label>
                            <input
                                type="text"
                                value={twoFactorCode}
                                onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                className="w-full text-center tracking-[1em] text-2xl py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-bold transition-all"
                                placeholder="000000"
                                required
                                autoFocus
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading || twoFactorCode.length !== 6}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 size={20} className="animate-spin" /> : 'Verify & Enable'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    if (step === '2fa_verify') {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden p-8">
                    <div className="text-center mb-6">
                        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                            <ShieldCheck className="text-blue-600" size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Two-Factor Authentication</h2>
                        <p className="text-slate-500 mt-2 text-sm">Enter the code from your authenticator app to continue.</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-3 text-rose-600 text-sm">
                            <AlertCircle size={18} className="shrink-0 mt-0.5" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleVerify2FA} className="space-y-5">
                        <div className="space-y-2">
                            <input
                                type="text"
                                value={twoFactorCode}
                                onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                className="w-full text-center tracking-[1em] text-2xl py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-bold transition-all"
                                placeholder="000000"
                                required
                                autoFocus
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading || twoFactorCode.length !== 6}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 size={20} className="animate-spin" /> : 'Verify Code'}
                        </button>

                        <button
                            type="button"
                            onClick={() => { setStep('login'); setEmail(''); setPassword(''); }}
                            className="w-full text-slate-400 hover:text-slate-600 text-sm font-medium py-2"
                        >
                            Back to Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <div className="w-48 mx-auto mb-6">
                            <img src="/shark-logo-email.png" alt="SharkFunded" className="w-full h-auto object-contain" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Admin Login</h2>
                        <p className="text-slate-500 mt-2">Secure access for administrators only</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-3 text-rose-600 text-sm">
                            <AlertCircle size={18} className="shrink-0 mt-0.5" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-medium transition-all"
                                    placeholder="admin@sharkfunded.com"
                                    required
                                    suppressHydrationWarning
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-medium transition-all"
                                    placeholder="••••••••"
                                    required
                                    suppressHydrationWarning
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                <>
                                    Sign In to Dashboard
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>
                </div>
                <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
                    <p className="text-xs text-slate-400 font-medium">
                        &copy; {new Date().getFullYear()} SharkFunded. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;
