import React from 'react';
import { Search, Users } from 'lucide-react';
import { UserStat } from './types';

interface UsersTableProps {
    users: UserStat[];
    search: string;
    setSearch: (value: string) => void;
    formatDate: (dateString: string) => string;
    formatTime: (dateString: string) => string;
}

export default function UsersTable({ users, search, setSearch, formatDate, formatTime }: UsersTableProps) {
    return (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100 flex flex-col lg:flex-row gap-4 items-center justify-between bg-slate-50/30">
                <div className="flex items-center gap-4 w-full">
                    <div className="relative w-full lg:w-96 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search users by name or email..."
                            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-sm font-medium transition-all shadow-sm placeholder:text-slate-400"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto w-full">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px] w-[30%]">User</th>
                            <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px] w-[20%]">Total Spend</th>
                            <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px] w-[15%]">Orders</th>
                            <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px] w-[20%]">Last Active</th>
                            <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-[11px] w-[15%]">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-24 text-center">
                                    <div className="flex flex-col items-center gap-3 opacity-50">
                                        <Users size={48} className="text-slate-300" />
                                        <p className="text-slate-500 font-medium">No users found</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user.email} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-700 font-bold text-sm border border-indigo-200 shadow-sm flex-shrink-0">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900">{user.name}</div>
                                                <div className="text-xs text-slate-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-bold text-slate-900">₹{user.totalSpend.toLocaleString()}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1">
                                            <span className="font-medium text-slate-700">{user.totalOrders}</span>
                                            <span className="text-xs text-slate-400">orders</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-slate-600">{formatDate(user.lastActive)}</div>
                                        <div className="text-xs text-slate-400">{formatTime(user.lastActive)}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-100">
                                            Active
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
