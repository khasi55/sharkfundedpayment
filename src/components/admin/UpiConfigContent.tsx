'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Search, Plus, Trash2, Power, AlertCircle, CheckCircle2, QrCode } from 'lucide-react';
import ConfirmationModal from '@/components/ConfirmationModal';

interface PaymentConfig {
    id: string;
    vpa: string;
    merchant_name: string;
    is_active: boolean;
    created_at: string;
}

export default function UpiConfigContent() {
    const [configs, setConfigs] = useState<PaymentConfig[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        vpa: '',
        merchant_name: '',
        is_active: true
    });
    const [formLoading, setFormLoading] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    // Delete Modal
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [configToDelete, setConfigToDelete] = useState<PaymentConfig | null>(null);

    useEffect(() => {
        fetchConfigs();
    }, []);

    const fetchConfigs = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('payment_configs')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setConfigs(data || []);
        } catch (err: any) {
            console.error('Error fetching configs:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenCreateModal = () => {
        setFormData({
            vpa: '',
            merchant_name: '',
            is_active: true
        });
        setFormError(null);
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormLoading(true);
        setFormError(null);

        try {
            // Validation
            if (!formData.vpa.includes('@')) {
                throw new Error('Invalid VPA format (should contain @)');
            }

            const { error } = await supabase
                .from('payment_configs')
                .insert([{
                    vpa: formData.vpa.trim(),
                    merchant_name: formData.merchant_name.trim(),
                    is_active: formData.is_active
                }]);

            if (error) {
                if (error.code === '23505') throw new Error('This VPA already exists.');
                throw error;
            }

            setIsModalOpen(false);
            fetchConfigs();
        } catch (err: any) {
            console.error('Form error:', err);
            setFormError(err.message || 'An error occurred');
        } finally {
            setFormLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!configToDelete) return;

        try {
            const { error } = await supabase
                .from('payment_configs')
                .delete()
                .eq('id', configToDelete.id);

            if (error) throw error;
            fetchConfigs();
            setShowDeleteConfirm(false);
            setConfigToDelete(null);
        } catch (err: any) {
            console.error('Delete error:', err);
        }
    };

    const handleToggleActive = async (config: PaymentConfig) => {
        try {
            // Optimistic update
            setConfigs(prev => prev.map(c =>
                c.id === config.id ? { ...c, is_active: !config.is_active } : c
            ));

            const { error } = await supabase
                .from('payment_configs')
                .update({ is_active: !config.is_active })
                .eq('id', config.id);

            if (error) {
                // Revert on error
                setConfigs(prev => prev.map(c =>
                    c.id === config.id ? { ...c, is_active: config.is_active } : c
                ));
                throw error;
            }
        } catch (err) {
            console.error('Error toggling status:', err);
        }
    };

    const filteredConfigs = configs.filter(c =>
        c.vpa.toLowerCase().includes(search.toLowerCase()) ||
        c.merchant_name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Payment Settings</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage UPI IDs and Merchant Names for payment page</p>
                </div>
                <button
                    onClick={handleOpenCreateModal}
                    className="flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5"
                >
                    <Plus size={20} />
                    <span>Add New UPI ID</span>
                </button>
            </div>

            {/* Content box */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-50/30">
                    <div className="relative w-full md:w-96 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search by VPA or merchant name..."
                            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-sm font-medium transition-all shadow-sm"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px]">Status</th>
                                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px]">Merchant Name</th>
                                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px]">UPI ID (VPA)</th>
                                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px]">Added On</th>
                                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                Array.from({ length: 3 }).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={5} className="px-6 py-10"><div className="h-10 bg-slate-100 rounded-lg w-full"></div></td>
                                    </tr>
                                ))
                            ) : filteredConfigs.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-24 text-center">
                                        <div className="flex flex-col items-center gap-3 opacity-50">
                                            <QrCode size={48} className="text-slate-300" />
                                            <p className="text-slate-500 font-medium">No UPI configurations found</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredConfigs.map((config) => (
                                    <tr key={config.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleToggleActive(config)}
                                                className={`
                                                    flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all
                                                    ${config.is_active
                                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100'
                                                        : 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200'}
                                                `}
                                            >
                                                <Power size={12} strokeWidth={3} />
                                                {config.is_active ? 'Active' : 'Inactive'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-slate-900">{config.merchant_name}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-mono text-slate-600 bg-slate-50 px-2 py-1 rounded-md inline-block border border-slate-100">
                                                {config.vpa}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">
                                            {new Date(config.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => {
                                                        setConfigToDelete(config);
                                                        setShowDeleteConfirm(true);
                                                    }}
                                                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                                                    title="Delete Configuration"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    />
                    <div className="bg-white rounded-[32px] w-full max-w-lg overflow-hidden shadow-2xl relative z-10 animate-in fade-in zoom-in duration-200">
                        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="text-xl font-bold text-slate-900">Add UPI Configuration</h3>
                            <p className="text-slate-500 text-sm mt-1">Configure a new receiver info</p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8">
                            {formError && (
                                <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 text-sm">
                                    <AlertCircle size={18} />
                                    <span>{formError}</span>
                                </div>
                            )}

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Merchant Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-medium transition-all"
                                        placeholder="Shark Funded"
                                        value={formData.merchant_name}
                                        onChange={e => setFormData({ ...formData, merchant_name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">UPI ID (VPA)</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-medium transition-all"
                                        placeholder="example@okicici"
                                        value={formData.vpa}
                                        onChange={e => setFormData({ ...formData, vpa: e.target.value })}
                                    />
                                    <p className="text-xs text-slate-400 ml-1">Must be a valid UPI ID (e.g. name@bank)</p>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer" onClick={() => setFormData({ ...formData, is_active: !formData.is_active })}>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${formData.is_active ? 'bg-blue-600 border-blue-600' : 'border-slate-300'}`}>
                                        {formData.is_active && <CheckCircle2 size={14} className="text-white" />}
                                    </div>
                                    <span className="font-bold text-slate-700 text-sm">Enable immediately</span>
                                </div>
                            </div>

                            <div className="mt-8 flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={formLoading}
                                    className="flex-[2] px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50"
                                >
                                    {formLoading ? 'Adding...' : 'Add Configuration'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <ConfirmationModal
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                onConfirm={handleDelete}
                title="Delete Configuration"
                message={`Are you sure you want to delete ${configToDelete?.vpa}?`}
                confirmText="Delete Config"
                type="danger"
            />
        </div>
    );
}
