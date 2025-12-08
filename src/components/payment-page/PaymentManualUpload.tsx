import React from 'react';
import { CloudUpload, FileImage, AlertCircle } from 'lucide-react';
import { PaymentManualUploadProps } from './types';

export default function PaymentManualUpload({ state, handleFileUpload, uploading }: PaymentManualUploadProps) {
    return (
        <div className="text-center py-8 space-y-6 animate-fade-in">
            {/* Status Icon */}
            <div className="relative inline-block group">
                <div className="absolute inset-0 bg-amber-200/50 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="w-16 h-16 bg-gradient-to-br from-amber-50 to-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-amber-500/10 border border-amber-200 relative z-10">
                    <AlertCircle size={32} className="group-hover:scale-110 transition-transform duration-300" />
                </div>
            </div>

            {/* Header Text */}
            <div className="space-y-2">
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Manual Verification Required</h2>
                <div className="h-0.5 w-12 bg-amber-200 mx-auto rounded-full"></div>
                <p className="text-slate-500 text-xs font-medium max-w-xs mx-auto leading-relaxed">
                    We couldn't verify automatically. Please upload a <span className="text-slate-700 font-bold">payment screenshot</span>.
                </p>
            </div>

            {/* Upload Zone */}
            <div className="relative group max-w-sm mx-auto">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    disabled={uploading}
                />
                <label
                    htmlFor="file-upload"
                    className={`
                        w-full flex flex-col items-center justify-center gap-5 px-6 py-10
                        bg-white/50 backdrop-blur-sm
                        border-2 border-dashed border-slate-300 rounded-3xl
                        cursor-pointer transition-all duration-300 relative overflow-hidden
                        group-hover:border-[#635BFF] group-hover:bg-indigo-50/30 group-hover:shadow-[0_0_40px_-10px_rgba(99,91,255,0.15)]
                        ${uploading ? 'opacity-70 pointer-events-none' : 'active:scale-[0.99]'}
                    `}
                >
                    {/* Interactive Background Grid */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                        style={{
                            backgroundImage: 'radial-gradient(#635BFF 0.5px, transparent 0.5px)',
                            backgroundSize: '16px 16px',
                            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
                        }}>
                    </div>

                    {uploading ? (
                        <div className="flex flex-col items-center gap-4 relative z-10 py-4">
                            <div className="relative">
                                {/* Custom Spinner */}
                                <div className="w-16 h-16 rounded-full border-4 border-slate-100"></div>
                                <div className="absolute inset-0 rounded-full border-4 border-t-[#635BFF] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <CloudUpload size={24} className="text-[#635BFF] animate-pulse" />
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <span className="font-bold text-sm text-slate-900">Uploading Evidence</span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest animate-pulse">Please Wait</span>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Icon Circle */}
                            <div className="w-20 h-20 bg-white text-[#635BFF] rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-100/50 border border-white group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 relative z-10 group-hover:-translate-y-1">
                                <CloudUpload size={36} className="drop-shadow-sm" />
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-400 rounded-full border-4 border-white flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 scale-0 group-hover:scale-100">
                                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                </div>
                            </div>

                            {/* Text Instructions */}
                            <div className="space-y-1.5 relative z-10">
                                <p className="text-base font-bold text-slate-900 group-hover:text-[#635BFF] transition-colors">
                                    Upload Payment Proof
                                </p>
                                <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider group-hover:text-slate-500 transition-colors">
                                    Click or Drag & Drop
                                </p>
                            </div>

                            {/* Format Tags */}
                            <div className="flex items-center gap-2 relative z-10 mt-2">
                                {['JPG', 'PNG', 'PDF'].map((fmt) => (
                                    <span key={fmt} className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-[10px] font-bold text-slate-400 shadow-sm group-hover:border-indigo-100 group-hover:text-indigo-400 transition-colors">
                                        {fmt}
                                    </span>
                                ))}
                            </div>
                        </>
                    )}
                </label>
            </div>

            {state.error && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 text-xs font-bold rounded-lg border border-rose-100 animate-shake shadow-sm">
                    <AlertCircle size={14} />
                    <span>{state.error}</span>
                </div>
            )}
        </div>
    );
}
