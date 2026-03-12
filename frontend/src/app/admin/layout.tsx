'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    Package,
    Layers,
    ShoppingCart,
    MessageSquare,
    Users,
    Ticket,
    Settings,
    Globe,
    LogOut,
    Lightbulb,
    Bell,
    Search,
    ExternalLink
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

const sidebarLinks = [
    { label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, href: '/admin' },
    { label: 'Products', icon: <Package className="w-5 h-5" />, href: '/admin/products' },
    { label: 'Categories', icon: <Layers className="w-5 h-5" />, href: '/admin/categories' },
    { label: 'Orders', icon: <ShoppingCart className="w-5 h-5" />, href: '/admin/orders' },
    { label: 'Reviews', icon: <MessageSquare className="w-5 h-5" />, href: '/admin/reviews' },
    { label: 'Customers', icon: <Users className="w-5 h-5" />, href: '/admin/users' },
    { label: 'Coupons', icon: <Ticket className="w-5 h-5" />, href: '/admin/coupons' },
    { label: 'Site Settings', icon: <Settings className="w-5 h-5" />, href: '/admin/settings' },
    { label: 'SEO', icon: <Globe className="w-5 h-5" />, href: '/admin/seo' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, profile, signOut } = useAuthStore();

    // Basic admin protection (In a real app, use a middleware or session check)
    // if (!user || profile?.role !== 'admin') {
    //   if (typeof window !== 'undefined') router.push('/');
    //   return null;
    // }

    return (
        <div className="flex min-h-screen bg-slate-50 font-inter">
            {/* Dark Sidebar */}
            <aside className="w-72 bg-slate-900 text-slate-400 flex flex-col fixed h-full z-50">
                <div className="p-8 border-b border-slate-800/50">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="bg-brand-yellow p-1.5 rounded-lg">
                            <Lightbulb className="w-6 h-6 text-royal-blue" />
                        </div>
                        <span className="text-xl font-black text-white tracking-tight">YellowLight <span className="text-brand-yellow">Admin</span></span>
                    </Link>
                </div>

                <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-2">
                    {sidebarLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${isActive
                                        ? 'bg-royal-blue text-white shadow-lg shadow-royal-blue/20 translate-x-1'
                                        : 'hover:bg-slate-800 hover:text-slate-200'
                                    }`}
                            >
                                {link.icon}
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-6 border-t border-slate-800/50">
                    <button
                        onClick={() => signOut()}
                        className="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold w-full hover:bg-rose-500/10 hover:text-rose-400 transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 ml-72">
                {/* Top Header */}
                <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-10 sticky top-0 z-40">
                    <div className="relative w-96">
                        <input
                            type="text"
                            placeholder="Search admin tools..."
                            className="w-full bg-slate-50 border-none rounded-xl pl-12 pr-4 py-2.5 text-sm font-bold text-slate-500 focus:bg-white focus:ring-2 focus:ring-royal-blue/10 transition-all outline-none"
                        />
                        <Search className="absolute left-4 top-2.5 w-5 h-5 text-slate-300" />
                    </div>

                    <div className="flex items-center gap-6">
                        <Link href="/" target="_blank" className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-royal-blue transition-all">
                            View Store <ExternalLink className="w-3.5 h-3.5" />
                        </Link>

                        <button className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100 transition-all">
                            <Bell className="w-5 h-5 text-slate-500" />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
                        </button>

                        <div className="h-8 w-px bg-slate-100"></div>

                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-sm font-black text-slate-800">{profile?.full_name || 'Admin'}</p>
                                <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Master Admin</p>
                            </div>
                            <div className="w-10 h-10 bg-royal-blue text-white rounded-xl flex items-center justify-center font-black">
                                {profile?.full_name?.charAt(0) || 'A'}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="p-10">
                    {children}
                </div>
            </div>
        </div>
    );
}
