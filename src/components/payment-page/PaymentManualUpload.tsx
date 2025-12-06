import React from 'react';
import { CloudUpload, FileImage, AlertCircle } from 'lucide-react';
import { PaymentManualUploadProps } from './types';

export default function PaymentManualUpload({ state, handleFileUpload, uploading }: PaymentManualUploadProps) {
    return (
        <div className="text-center py-8 space-y-6 animate-fade-in">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <AlertCircle size={32} />
            </div>
            <div>
                <h2 className="text-xl font-bold text-slate-900">Manual Verification</h2>
                <p className="text-slate-500 text-sm mt-1 max-w-xs mx-auto">
                    We couldn't verify automatically. Please upload a screenshot of your payment.
                </p>
            </div>

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
                    className={`w-full flex flex-col items-center justify-center gap-4 px-6 py-12 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer transition-all duration-300 group relative overflow-hidden ${uploading ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-500 hover:bg-blue-50/30 hover:shadow-xl hover:shadow-blue-500/10'}`}
                >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                    </div>

                    {uploading ? (
                        <div className="flex flex-col items-center gap-3 relative z-10">
                            <div className="relative">
                                <div className="w-16 h-16 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-xs font-bold text-blue-600">...</span>
                                </div>
                            </div>
                            <span className="font-bold text-sm text-slate-700 animate-pulse">Uploading Proof...</span>
                        </div>
                    ) : (
                        <>
                            <div className="w-20 h-20 bg-white text-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300 shadow-md border border-blue-100 relative z-10">
                                <CloudUpload size={36} className="group-hover:text-blue-500" />
                            </div>
                            <div className="space-y-2 relative z-10">
                                <p className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                                    Click to upload or drag and drop
                                </p>
                                <p className="text-xs text-slate-500 font-medium">
                                    SVG, PNG, JPG or GIF (max. 5MB)
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm group-hover:border-blue-200 group-hover:text-blue-600 transition-all relative z-10">
                                <FileImage size={14} />
                                <span>Payment Screenshot</span>
                            </div>
                        </>
                    )}
                </label>
            </div>
            {state.error && (
                <div className="p-3 bg-rose-50 text-rose-600 text-sm rounded-lg flex items-center justify-center gap-2 border border-rose-100 animate-shake">
                    <AlertCircle size={16} />
                    <span className="font-medium">{state.error}</span>
                </div>
            )}
        </div>
    );
}
