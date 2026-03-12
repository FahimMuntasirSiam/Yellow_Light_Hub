'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    User, Package, ShieldCheck, MapPin,
    Settings, LogOut, ChevronRight,
    CreditCard, ExternalLink, Download,
    Trash2, Plus, Edit3, Loader2
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function AccountPage() {
    const router = useRouter();
    const { user, profile, loading, signOut } = useAuthStore();
    const [activeTab, setActiveTab] = useState('profile');

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="w-12 h-12 border-4 border-royal-blue border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!user) {
        if (typeof window !== 'undefined') router.push('/login');
        return null;
    }

    const tabs = [
        { id: 'profile', label: 'Profile Settings', icon: <User className="w-4 h-4" /> },
        { id: 'orders', label: 'Order History', icon: <Package className="w-4 h-4" /> },
        { id: 'licenses', label: 'Digital Licenses', icon: <ShieldCheck className="w-4 h-4" /> },
        { id: 'addresses', label: 'Saved Addresses', icon: <MapPin className="w-4 h-4" /> },
    ];

    return (
        <div className="bg-slate-50 min-h-screen pb-20 pt-10">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-6xl mx-auto">

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar Navigation */}
                        <aside className="lg:w-72 shrink-0">
                            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 mb-6">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-16 h-16 bg-royal-blue text-white rounded-2xl flex items-center justify-center text-2xl font-black">
                                        {profile?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="min-w-0">
                                        <h2 className="text-lg font-black text-slate-800 truncate">{profile?.full_name || 'Guest User'}</h2>
                                        <p className="text-xs font-bold text-slate-400 truncate opacity-80">{user.email}</p>
                                    </div>
                                </div>

                                <nav className="space-y-2">
                                    {tabs.map(tab => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-black tracking-tight transition-all ${activeTab === tab.id
                                                    ? 'bg-royal-blue text-white shadow-lg shadow-royal-blue/10'
                                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                                                }`}
                                        >
                                            {tab.icon}
                                            {tab.label}
                                        </button>
                                    ))}
                                    <div className="pt-4 border-t border-slate-50 mt-4">
                                        <button
                                            onClick={() => signOut()}
                                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-black text-rose-500 hover:bg-rose-50 transition-all"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Logout Session
                                        </button>
                                    </div>
                                </nav>
                            </div>

                            <div className="bg-slate-900 rounded-[2rem] p-6 text-white relative overflow-hidden group">
                                <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                                    <CreditCard className="w-24 h-24" />
                                </div>
                                <h4 className="text-xs font-black text-brand-yellow tracking-widest uppercase mb-2">Member Since</h4>
                                <p className="text-sm font-bold opacity-80">{new Date(user.created_at).toLocaleDateString()}</p>
                            </div>
                        </aside>

                        {/* Content Area */}
                        <main className="flex-1">
                            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100 min-h-[600px]">
                                {activeTab === 'profile' && (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                        <h3 className="text-2xl font-black text-slate-800">Profile Settings</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                                <input
                                                    readOnly
                                                    value={profile?.full_name || ''}
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-slate-500 cursor-not-allowed"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email (Primary)</label>
                                                <input
                                                    readOnly
                                                    value={user.email || ''}
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-slate-500 cursor-not-allowed"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                                                <input
                                                    readOnly
                                                    value={profile?.phone || 'Not set'}
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-slate-500 cursor-not-allowed"
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-12 p-6 rounded-[2rem] border-2 border-dashed border-slate-100 flex flex-col items-center justify-center text-center">
                                            <p className="text-sm font-bold text-slate-400 max-w-xs mb-6 italic">Profile editing is currently managed via account security settings.</p>
                                            <Button variant="outline" className="border-slate-200">Change Password</Button>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'orders' && (
                                    <div className="animate-in fade-in slide-in-from-right-4 duration-500 text-center py-20">
                                        <Package className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                                        <h4 className="text-xl font-black text-slate-800 mb-2">Manage your orders</h4>
                                        <p className="text-slate-500 font-bold mb-8">View and track all your physical product purchases.</p>
                                        <Button onClick={() => router.push('/account/orders')}>Open Order History</Button>
                                    </div>
                                )}

                                {activeTab === 'licenses' && (
                                    <div className="animate-in fade-in slide-in-from-right-4 duration-500 text-center py-20">
                                        <ShieldCheck className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                                        <h4 className="text-xl font-black text-slate-800 mb-2">My Digital Assets</h4>
                                        <p className="text-slate-500 font-bold mb-8">Access your software keys, templates, and downloads.</p>
                                        <Button onClick={() => router.push('/account/licenses')}>Open My Licenses</Button>
                                    </div>
                                )}

                                {activeTab === 'addresses' && (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-2xl font-black text-slate-800">Saved Addresses</h3>
                                            <Button className="rounded-xl h-10 px-4 text-xs">Add New</Button>
                                        </div>
                                        <div className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50 flex flex-col items-center justify-center text-center">
                                            <MapPin className="w-10 h-10 text-slate-200 mb-4" />
                                            <p className="text-sm font-bold text-slate-400 italic">No addresses saved yet.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
}
