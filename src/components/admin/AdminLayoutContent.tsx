import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Users, CreditCard, LogOut, ShieldCheck, Menu, X, Activity, Key, MessageSquare, Landmark, AlertTriangle } from 'lucide-react';

import ConfirmationModal from '@/components/ConfirmationModal';
import NotificationCenter from './dashboard/NotificationCenter';

const AdminLayoutContent = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const [adminEmail, setAdminEmail] = useState('');
    const [adminName, setAdminName] = useState('Admin');
    const [adminRole, setAdminRole] = useState('subadmin');
    const [permissions, setPermissions] = useState<string[]>([]);

    const isActive = (path: string) => pathname === path;

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const handleLogoutClick = () => {
        setShowLogoutConfirm(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem('admin_user');
        document.cookie = 'admin_session=; path=/; max-age=0;';
        router.push('/sharkfunded2logintoadminwithpermission/login');
    };

    useEffect(() => {
        const adminUserStr = localStorage.getItem('admin_user');
        if (!adminUserStr) {
            router.replace('/sharkfunded2logintoadminwithpermission/login');
        } else {
            try {
                const user = JSON.parse(adminUserStr);
                const name = user.name || user.user_metadata?.name || user.full_name || user.email?.split('@')[0] || 'Admin';
                setAdminEmail(user.email || '');
                setAdminName(name);
                setAdminRole(user.role || 'subadmin');
                setPermissions(user.permissions || []);

                const role = user.role || 'subadmin';
                const otpPath = '/sharkfunded2logintoadminwithpermission/otps';

                if (role === 'otp_admin' && pathname !== otpPath) {
                    router.replace(otpPath);
                }
            } catch (e) {
                console.error("Failed to parse admin user", e);
            }
        }
    }, [router, pathname]);

    const isSuperAdmin = adminRole === 'superadmin' || adminEmail === 'admin@sharkfunded.com';
    const isSubAdmin = adminRole === 'subadmin';
    const isOtpAdmin = adminRole === 'otp_admin';

    const hasPermission = (section: string) => {
        if (isSuperAdmin) return true;
        return permissions.includes(section);
    };

    return (
        <div className="h-screen bg-slate-50 flex font-sans overflow-hidden relative">
            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 z-20 md:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed md:static inset-y-0 left-0 z-30 w-72 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out flex flex-col shadow-2xl h-full
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <div className="p-6 border-b border-slate-800 flex items-center gap-3 shrink-0">
                    <img src="/shark-logo-email.png" alt="SharkFunded" className="h-8 w-auto object-contain" />
                    <span className="font-bold text-lg tracking-tight">SharkFunded Admin</span>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-slate-400 hover:text-white ml-auto">
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <p className="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 mt-2">Menu</p>

                    {(isSuperAdmin || isSubAdmin) && (
                        <>
                            {hasPermission('dashboard') && (
                                <Link
                                    href="/sharkfunded2logintoadminwithpermission"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all group ${isActive('/sharkfunded2logintoadminwithpermission') ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                                >
                                    <LayoutDashboard size={20} className={isActive('/sharkfunded2logintoadminwithpermission') ? 'text-white' : 'text-slate-400 group-hover:text-white transition-colors'} />
                                    <span className="font-medium text-sm">Dashboard</span>
                                </Link>
                            )}
                            {hasPermission('transactions') && (
                                <Link
                                    href="/sharkfunded2logintoadminwithpermission/transactions"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all group ${isActive('/sharkfunded2logintoadminwithpermission/transactions') ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                                >
                                    <CreditCard size={20} className={isActive('/sharkfunded2logintoadminwithpermission/transactions') ? 'text-white' : 'text-slate-400 group-hover:text-white transition-colors'} />
                                    <span className="font-medium text-sm">Transactions</span>
                                </Link>
                            )}
                            {hasPermission('transactions') && (
                                <Link
                                    href="/sharkfunded2logintoadminwithpermission/bank-stats"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all group ${isActive('/sharkfunded2logintoadminwithpermission/bank-stats') ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                                >
                                    <Landmark size={20} className={isActive('/sharkfunded2logintoadminwithpermission/bank-stats') ? 'text-white' : 'text-slate-400 group-hover:text-white transition-colors'} />
                                    <span className="font-medium text-sm">Bank Stats</span>
                                </Link>
                            )}
                            {hasPermission('transactions') && (
                                <Link
                                    href="/sharkfunded2logintoadminwithpermission/user-fraud-stats"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all group ${isActive('/sharkfunded2logintoadminwithpermission/user-fraud-stats') ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                                >
                                    <AlertTriangle size={20} className={isActive('/sharkfunded2logintoadminwithpermission/user-fraud-stats') ? 'text-white' : 'text-slate-400 group-hover:text-white transition-colors'} />
                                    <span className="font-medium text-sm">User Fraud Stats</span>
                                </Link>
                            )}
                            {hasPermission('webhook-logs') && (
                                <Link
                                    href="/sharkfunded2logintoadminwithpermission/webhook-logs"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all group ${isActive('/sharkfunded2logintoadminwithpermission/webhook-logs') ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                                >
                                    <ShieldCheck size={20} className={isActive('/sharkfunded2logintoadminwithpermission/webhook-logs') ? 'text-white' : 'text-slate-400 group-hover:text-white transition-colors'} />
                                    <span className="font-medium text-sm">Received Confirmations</span>
                                </Link>
                            )}
                            {hasPermission('users') && (
                                <Link
                                    href="/sharkfunded2logintoadminwithpermission/users"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all group ${isActive('/sharkfunded2logintoadminwithpermission/users') ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                                >
                                    <Users size={20} className={isActive('/sharkfunded2logintoadminwithpermission/users') ? 'text-white' : 'text-slate-400 group-hover:text-white transition-colors'} />
                                    <span className="font-medium text-sm">Users</span>
                                </Link>
                            )}
                            {hasPermission('system-status') && (
                                <Link
                                    href="/sharkfunded2logintoadminwithpermission/system-status"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all group ${isActive('/sharkfunded2logintoadminwithpermission/system-status') ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                                >
                                    <Activity size={20} className={isActive('/sharkfunded2logintoadminwithpermission/system-status') ? 'text-white' : 'text-slate-400 group-hover:text-white transition-colors'} />
                                    <span className="font-medium text-sm">System Status</span>
                                </Link>
                            )}
                            {hasPermission('api-logs') && (
                                <Link
                                    href="/sharkfunded2logintoadminwithpermission/api-logs"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all group ${isActive('/sharkfunded2logintoadminwithpermission/api-logs') ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                                >
                                    <Activity size={20} className={isActive('/sharkfunded2logintoadminwithpermission/api-logs') ? 'text-white' : 'text-slate-400 group-hover:text-white transition-colors'} />
                                    <span className="font-medium text-sm">API Payloads</span>
                                </Link>
                            )}
                        </>
                    )}

                    {(isSuperAdmin || isSubAdmin || isOtpAdmin) && (
                        <Link
                            href="/sharkfunded2logintoadminwithpermission/otps"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all group ${isActive('/sharkfunded2logintoadminwithpermission/otps') ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                        >
                            <Key size={20} className={isActive('/sharkfunded2logintoadminwithpermission/otps') ? 'text-white' : 'text-slate-400 group-hover:text-white transition-colors'} />
                            <span className="font-medium text-sm">OTPs</span>
                        </Link>
                    )}

                    {/* Settings Section */}
                    {(isSuperAdmin || hasPermission('admin-management') || hasPermission('payment-settings') || hasPermission('activity-logs')) && (
                        <p className="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 mt-6">Settings</p>
                    )}

                    {(isSuperAdmin || hasPermission('admin-management')) && (
                        <Link
                            href="/sharkfunded2logintoadminwithpermission/admin-management"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all group ${isActive('/sharkfunded2logintoadminwithpermission/admin-management') ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                        >
                            <Users size={20} className={isActive('/sharkfunded2logintoadminwithpermission/admin-management') ? 'text-white' : 'text-slate-400 group-hover:text-white transition-colors'} />
                            <span className="font-medium text-sm">Admin Management</span>
                        </Link>
                    )}

                    {(isSuperAdmin || hasPermission('payment-settings')) && (
                        <Link
                            href="/sharkfunded2logintoadminwithpermission/payment-settings"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all group ${isActive('/sharkfunded2logintoadminwithpermission/payment-settings') ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                        >
                            <CreditCard size={20} className={isActive('/sharkfunded2logintoadminwithpermission/payment-settings') ? 'text-white' : 'text-slate-400 group-hover:text-white transition-colors'} />
                            <span className="font-medium text-sm">Payment Settings</span>
                        </Link>
                    )}

                    {(isSuperAdmin || hasPermission('activity-logs')) && (
                        <Link
                            href="/sharkfunded2logintoadminwithpermission/activity-logs"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all group ${isActive('/sharkfunded2logintoadminwithpermission/activity-logs') ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                        >
                            <Activity size={20} className={isActive('/sharkfunded2logintoadminwithpermission/activity-logs') ? 'text-white' : 'text-slate-400 group-hover:text-white transition-colors'} />
                            <span className="font-medium text-sm">Activity Logs</span>
                        </Link>
                    )}
                </nav>

                <div className="p-4 border-t border-slate-800 shrink-0">

                    <button
                        onClick={handleLogoutClick}
                        className="flex items-center gap-3 px-4 py-3.5 w-full rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all group"
                    >
                        <LogOut size={20} className="text-slate-400 group-hover:text-white transition-colors" />
                        <span className="font-medium text-sm">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 h-screen flex flex-col overflow-hidden w-full relative">
                <header className="bg-white border-b border-slate-200 h-20 flex items-center justify-between px-6 md:px-8 shrink-0 shadow-sm z-10">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleMobileMenu}
                            className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg md:hidden transition-colors"
                        >
                            <Menu size={24} />
                        </button>
                        <div>
                            <h2 className="font-bold text-xl text-slate-800 tracking-tight">Overview</h2>
                            <p className="text-xs text-slate-500 font-medium hidden md:block">Welcome back, {adminName}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <NotificationCenter />
                        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-bold text-slate-900">SharkFunded Admin</p>
                                <p className="text-xs text-slate-500">{adminName}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm shadow-inner">
                                {adminName.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-auto p-4 md:p-8 w-full">
                    <div className="w-full">
                        {children}
                    </div>
                </div>
            </main>

            <ConfirmationModal
                isOpen={showLogoutConfirm}
                onClose={() => setShowLogoutConfirm(false)}
                onConfirm={confirmLogout}
                title="Confirm Logout"
                message="Are you sure you want to log out of the admin panel?"
                confirmText="Logout"
                type="danger"
            />
        </div>
    );
};

export default AdminLayoutContent;
