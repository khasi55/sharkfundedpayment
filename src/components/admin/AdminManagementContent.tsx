'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Search, UserPlus, Shield, Mail, Key, Trash2, Edit2, CheckCircle2, XCircle, ChevronRight, Check } from 'lucide-react';
import ConfirmationModal from '@/components/ConfirmationModal';

interface AdminUser {
    id: string;
    email: string;
    name: string;
    role: string;
    permissions: string[];
    created_at: string;
}

const SECTIONS = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'transactions', label: 'Transactions' },
    { id: 'webhook-logs', label: 'Received Confirmations' },
    { id: 'users', label: 'Users' },
    { id: 'system-status', label: 'System Status' },
    { id: 'api-logs', label: 'API Payloads' },
    { id: 'otps', label: 'OTPs' },
    { id: 'payment-settings', label: 'Payment Settings' },
    { id: 'activity-logs', label: 'Activity Logs' },
];

export default function AdminManagementContent() {
    const [admins, setAdmins] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState<AdminUser | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [adminToDelete, setAdminToDelete] = useState<AdminUser | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        permissions: [] as string[]
    });
    const [formLoading, setFormLoading] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/admin/admins');
            const result = await response.json();
            if (result.success) {
                setAdmins(result.data || []);
            }
        } catch (err: any) {
            console.error('Error fetching admins:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenCreateModal = () => {
        setIsEdit(false);
        setSelectedAdmin(null);
        setFormData({
            name: '',
            email: '',
            password: '',
            permissions: []
        });
        setFormError(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (admin: AdminUser) => {
        setIsEdit(true);
        setSelectedAdmin(admin);
        setFormData({
            name: admin.name,
            email: admin.email,
            password: '', // Leave empty for edit unless changing
            permissions: admin.permissions || []
        });
        setFormError(null);
        setIsModalOpen(true);
    };

    const handleTogglePermission = (sectionId: string) => {
        setFormData(prev => {
            const current = [...prev.permissions];
            if (current.includes(sectionId)) {
                return { ...prev, permissions: current.filter(id => id !== sectionId) };
            } else {
                return { ...prev, permissions: [...current, sectionId] };
            }
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormLoading(true);
        setFormError(null);

        try {
            if (isEdit && selectedAdmin) {
                const updateData: any = {
                    id: selectedAdmin.id,
                    name: formData.name,
                    email: formData.email,
                    permissions: formData.permissions
                };
                if (formData.password) {
                    updateData.password = formData.password;
                }

                const response = await fetch('/api/admin/admins', {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updateData)
                });
                const result = await response.json();
                if (!result.success) throw new Error(result.message);
            } else {
                if (!formData.password) throw new Error('Password is required for new sub-admins');

                const response = await fetch('/api/admin/admins', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        password: formData.password,
                        permissions: formData.permissions
                    })
                });
                const result = await response.json();
                if (!result.success) throw new Error(result.message);
            }

            setIsModalOpen(false);
            fetchAdmins();
        } catch (err: any) {
            console.error('Form error:', err);
            setFormError(err.message || 'An error occurred');
        } finally {
            setFormLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!adminToDelete) return;

        try {
            const response = await fetch('/api/admin/admins', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: adminToDelete.id })
            });
            const result = await response.json();
            if (!result.success) throw new Error(result.message);

            fetchAdmins();
            setShowDeleteConfirm(false);
            setAdminToDelete(null);
        } catch (err: any) {
            console.error('Delete error:', err);
        }
    };

    const filteredAdmins = admins.filter(admin =>
        admin.name?.toLowerCase().includes(search.toLowerCase()) ||
        admin.email?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Admin Management</h1>
                    <p className="text-slate-500 text-sm mt-1">Create and manage sub-admins with specific permissions</p>
                </div>
                <button
                    onClick={handleOpenCreateModal}
                    className="flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5"
                >
                    <UserPlus size={20} />
                    <span>Add New Admin</span>
                </button>
            </div>

            {/* Content box */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-50/30">
                    <div className="relative w-full md:w-96 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search admins by name or email..."
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
                                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px]">Admin</th>
                                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px]">Role</th>
                                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px]">Permissions</th>
                                <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px]">Joined Date</th>
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
                            ) : filteredAdmins.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-24 text-center">
                                        <div className="flex flex-col items-center gap-3 opacity-50">
                                            <Shield size={48} className="text-slate-300" />
                                            <p className="text-slate-500 font-medium">No admins found</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredAdmins.map((admin) => (
                                    <tr key={admin.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-700 font-bold text-sm border border-blue-200">
                                                    {admin.name?.charAt(0) || 'A'}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900">{admin.name}</div>
                                                    <div className="text-xs text-slate-500">{admin.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${admin.role === 'superadmin'
                                                ? 'bg-purple-50 text-purple-700 border border-purple-100'
                                                : 'bg-blue-50 text-blue-700 border border-blue-100'
                                                }`}>
                                                {admin.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1 max-w-[300px]">
                                                {admin.role === 'superadmin' ? (
                                                    <span className="text-xs text-slate-500 italic">All access</span>
                                                ) : admin.permissions && admin.permissions.length > 0 ? (
                                                    admin.permissions.map(p => (
                                                        <span key={p} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[10px] font-medium">
                                                            {SECTIONS.find(s => s.id === p)?.label || p}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-xs text-rose-400">No sections access</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {new Date(admin.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleOpenEditModal(admin)}
                                                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                    title="Edit Permissions"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                {admin.role !== 'superadmin' && (
                                                    <button
                                                        onClick={() => {
                                                            setAdminToDelete(admin);
                                                            setShowDeleteConfirm(true);
                                                        }}
                                                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                                                        title="Delete Admin"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    />
                    <div className="bg-white rounded-[32px] w-full max-w-2xl overflow-hidden shadow-2xl relative z-10 animate-in fade-in zoom-in duration-200">
                        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="text-xl font-bold text-slate-900">{isEdit ? 'Edit Sub-Admin' : 'Create New Sub-Admin'}</h3>
                            <p className="text-slate-500 text-sm mt-1">Configure details and access permissions</p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 max-h-[70vh] overflow-y-auto">
                            {formError && (
                                <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 text-sm">
                                    <XCircle size={18} />
                                    <span>{formError}</span>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                                    <div className="relative group">
                                        <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                                        <input
                                            type="text"
                                            required
                                            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-medium transition-all"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                                        <input
                                            type="email"
                                            required
                                            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-medium transition-all"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">
                                        {isEdit ? 'New Password (Leave blank to keep current)' : 'Password'}
                                    </label>
                                    <div className="relative group">
                                        <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                                        <input
                                            type="password"
                                            required={!isEdit}
                                            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-medium transition-all"
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-bold text-slate-700 ml-1">Section Access</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {SECTIONS.map((section) => {
                                        const isChecked = formData.permissions.includes(section.id);
                                        return (
                                            <div
                                                key={section.id}
                                                onClick={() => handleTogglePermission(section.id)}
                                                className={`
                                                    flex items-center justify-between p-4 cursor-pointer rounded-2xl border transition-all
                                                    ${isChecked
                                                        ? 'bg-blue-50 border-blue-200 ring-2 ring-blue-500/5'
                                                        : 'bg-white border-slate-200 hover:border-slate-300'}
                                                `}
                                            >
                                                <span className={`font-bold text-sm ${isChecked ? 'text-blue-700' : 'text-slate-600'}`}>
                                                    {section.label}
                                                </span>
                                                <div className={`
                                                    w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all
                                                    ${isChecked ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200'}
                                                `}>
                                                    {isChecked && <Check size={14} strokeWidth={3} />}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="mt-10 flex gap-4">
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
                                    {formLoading ? 'Processing...' : isEdit ? 'Save Changes' : 'Create Sub-Admin'}
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
                title="Delete Admin"
                message={`Are you sure you want to delete ${adminToDelete?.name}? This action cannot be undone.`}
                confirmText="Delete Admin"
                type="danger"
            />
        </div>
    );
}
