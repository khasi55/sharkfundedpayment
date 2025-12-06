import React from 'react';
import { ArrowRight, Lock, AlertCircle } from 'lucide-react';
import { PaymentDetailsFormProps } from './types';

export default function PaymentDetailsForm({ state, setState, handleDetailsSubmit }: PaymentDetailsFormProps) {
    return (
        <form onSubmit={handleDetailsSubmit} className="space-y-6 animate-fade-in" noValidate>
            <div className="mb-8">
                <h2 className="text-xl font-bold text-slate-900 mb-2">Contact Information</h2>
                <p className="text-slate-500 text-sm">Enter your details to proceed with the payment.</p>
            </div>

            <div className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                    <input
                        type="email"
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-slate-900 placeholder:text-slate-400 shadow-sm"
                        value={state.email}
                        onChange={e => setState({ ...state, email: e.target.value })}
                        placeholder="sharkfunded@example.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                    <input
                        type="text"
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-slate-900 placeholder:text-slate-400 shadow-sm"
                        value={state.name}
                        onChange={e => setState({ ...state, name: e.target.value })}
                        placeholder="Shark Funded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Amount</label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">₹</span>
                        <input
                            type="number"
                            min="1"
                            className="w-full pl-8 pr-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-slate-900 font-medium placeholder:text-slate-400 shadow-sm"
                            value={state.amount}
                            onChange={e => setState({ ...state, amount: e.target.value })}
                            placeholder="0.00"
                        />
                    </div>
                </div>
            </div>

            {state.error && (
                <div className="p-3 bg-rose-50 text-rose-600 text-sm rounded-lg flex items-center gap-2 border border-rose-100 animate-shake">
                    <AlertCircle size={16} />
                    <span className="font-medium">{state.error}</span>
                </div>
            )}

            <button
                type="submit"
                className="w-full bg-[#635BFF] text-white py-3.5 rounded-lg font-bold text-sm hover:bg-[#5851E3] hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200 flex items-center justify-center gap-2 mt-4"
            >
                Pay ₹{state.amount ? Number(state.amount).toLocaleString() : '0.00'}
                <ArrowRight size={16} />
            </button>

            <div className="mt-6 flex items-center justify-center gap-2 text-slate-400">
                <Lock size={12} />
                <span className="text-[10px] font-medium uppercase tracking-wider">256-bit SSL Encrypted</span>
            </div>
        </form>
    );
}
