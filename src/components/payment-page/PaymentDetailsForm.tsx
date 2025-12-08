import React from 'react';
import { ArrowRight, Lock, AlertCircle } from 'lucide-react';
import { PaymentDetailsFormProps } from './types';

export default function PaymentDetailsForm({ state, setState, handleDetailsSubmit }: PaymentDetailsFormProps) {
    return (
        <form onSubmit={handleDetailsSubmit} className="space-y-8 animate-fade-in" noValidate>
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">Contact Information</h2>
                <p className="text-slate-500 text-sm font-medium">Enter your details to generate a secure payment link.</p>
            </div>

            <div className="space-y-6">
                <div className="group">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 ml-1 group-focus-within:text-[#635BFF] transition-colors">Email Address</label>
                    <input
                        type="email"
                        className="w-full px-4 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-xl focus:bg-white focus:border-[#635BFF] focus:ring-4 focus:ring-[#635BFF]/10 transition-all duration-300 outline-none text-slate-900 placeholder:text-slate-400 font-medium shadow-sm hover:border-slate-200"
                        value={state.email}
                        onChange={e => setState({ ...state, email: e.target.value })}
                        placeholder="sharkfunded@example.com"
                    />
                </div>
                <div className="group">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 ml-1 group-focus-within:text-[#635BFF] transition-colors">Full Name</label>
                    <input
                        type="text"
                        className="w-full px-4 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-xl focus:bg-white focus:border-[#635BFF] focus:ring-4 focus:ring-[#635BFF]/10 transition-all duration-300 outline-none text-slate-900 placeholder:text-slate-400 font-medium shadow-sm hover:border-slate-200"
                        value={state.name}
                        onChange={e => setState({ ...state, name: e.target.value })}
                        placeholder="Shark Funded"
                    />
                </div>
                <div className="group">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 ml-1 group-focus-within:text-[#635BFF] transition-colors">Amount</label>
                    <div className="relative transform transition-all duration-300 group-focus-within:scale-[1.01]">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-lg group-focus-within:text-[#635BFF] transition-colors">₹</span>
                        <input
                            type="number"
                            min="1"
                            className="w-full pl-8 pr-4 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-xl focus:bg-white focus:border-[#635BFF] focus:ring-4 focus:ring-[#635BFF]/10 transition-all duration-300 outline-none text-slate-900 font-bold text-lg placeholder:text-slate-400 shadow-sm hover:border-slate-200"
                            value={state.amount}
                            onChange={e => setState({ ...state, amount: e.target.value })}
                            placeholder="0.00"
                        />
                    </div>
                </div>
            </div>

            {state.error && (
                <div className="p-4 bg-rose-50 text-rose-600 text-sm rounded-xl flex items-center gap-3 border border-rose-100 animate-shake shadow-sm">
                    <AlertCircle size={18} className="shrink-0" />
                    <span className="font-semibold">{state.error}</span>
                </div>
            )}

            <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#635BFF] to-indigo-600 text-white py-4 rounded-xl font-bold text-base hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 mt-6 group relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                <span className="relative z-10">Pay ₹{state.amount ? Number(state.amount).toLocaleString() : '0.00'}</span>
                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="mt-8 flex items-center justify-center gap-2 text-slate-400 opacity-80 hover:opacity-100 transition-opacity">
                <Lock size={12} className="text-emerald-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">256-bit SSL Encrypted</span>
            </div>
        </form>
    );
}
