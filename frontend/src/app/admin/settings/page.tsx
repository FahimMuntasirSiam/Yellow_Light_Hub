'use client';

import React, { useState, useEffect } from 'react';
import {
    Settings,
    Layout,
    Image as ImageIcon,
    Truck,
    Bell,
    Globe,
    Save,
    Info,
    Phone,
    Mail,
    MapPin,
    Facebook,
    Twitter,
    Instagram,
    Zap,
    CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { supabase } from '@/lib/supabase';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('general');
    const [settings, setSettings] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const { data } = await supabase.from('site_settings').select('*');
                if (data) {
                    const formatted = data.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {});
                    setSettings(formatted);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleUpdate = async (key: string, value: any) => {
        setSettings({ ...settings, [key]: value });
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const updates = Object.entries(settings).map(([key, value]) => ({
                key,
                value,
                updated_at: new Date().toISOString()
            }));

            const { error } = await supabase
                .from('site_settings')
                .upsert(updates, { onConflict: 'key' });

            if (!error) {
                alert('Global settings updated successfully!');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const tabs = [
        { id: 'general', label: 'Store Identity', icon: <Settings className="w-4 h-4" /> },
        { id: 'homepage', label: 'Home Page Hero', icon: <Layout className="w-4 h-4" /> },
        { id: 'delivery', label: 'Logistic Fees', icon: <Truck className="w-4 h-4" /> },
        { id: 'social', label: 'Social & Footer', icon: <Globe className="w-4 h-4" /> },
    ];

    if (loading) return <div className="p-10 font-bold">Syncing Site Settings...</div>;

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-slate-800">Site Settings</h1>
                    <p className="text-slate-500 font-bold italic mt-1">Global hub configuration and visual identity.</p>
                </div>
                <Button onClick={handleSave} disabled={saving} className="h-12 rounded-2xl px-10 gap-2 shadow-xl shadow-royal-blue/20">
                    <Save className="w-5 h-5" />
                    {saving ? 'Saving...' : 'Save All Changes'}
                </Button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Navigation Sidebar */}
                <aside className="lg:w-72 shrink-0">
                    <div className="bg-white rounded-[2rem] p-4 shadow-sm border border-slate-100 space-y-1">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-black transition-all ${activeTab === tab.id
                                        ? 'bg-royal-blue text-white shadow-lg shadow-royal-blue/10'
                                        : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                                    }`}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    <div className="mt-8 p-6 bg-emerald-50 rounded-[2.5rem] border border-emerald-100 flex items-center gap-4">
                        <div className="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                            <h5 className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Global Sync</h5>
                            <p className="text-[10px] font-bold text-emerald-600 italic">Connected to Production DB</p>
                        </div>
                    </div>
                </aside>

                {/* Form Area */}
                <main className="flex-1">
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100 min-h-[600px]">

                        {activeTab === 'general' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                                    <Info className="w-6 h-6 text-royal-blue" />
                                    Identity & Contact
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Store Name</label>
                                        <input
                                            value={settings.store_name || ''}
                                            onChange={(e) => handleUpdate('store_name', e.target.value)}
                                            className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-black text-slate-700 outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Support Phone</label>
                                        <div className="relative">
                                            <input
                                                value={settings.contact_phone || ''}
                                                onChange={(e) => handleUpdate('contact_phone', e.target.value)}
                                                className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-5 py-4 text-sm font-black text-slate-700 outline-none"
                                            />
                                            <Phone className="absolute left-4 top-4.5 w-5 h-5 text-slate-300" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Support Email</label>
                                        <div className="relative">
                                            <input
                                                value={settings.contact_email || ''}
                                                onChange={(e) => handleUpdate('contact_email', e.target.value)}
                                                className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-5 py-4 text-sm font-black text-slate-700 outline-none"
                                            />
                                            <Mail className="absolute left-4 top-4.5 w-5 h-5 text-slate-300" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Main Address</label>
                                        <div className="relative">
                                            <input
                                                value={settings.contact_address || ''}
                                                onChange={(e) => handleUpdate('contact_address', e.target.value)}
                                                className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-5 py-4 text-sm font-black text-slate-700 outline-none"
                                            />
                                            <MapPin className="absolute left-4 top-4.5 w-5 h-5 text-slate-300" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'homepage' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                                    <Zap className="w-6 h-6 text-brand-yellow" />
                                    Hero Section Copy
                                </h3>

                                <div className="space-y-8 max-w-2xl">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Main Headline</label>
                                        <textarea
                                            value={settings.hero_headline || ''}
                                            onChange={(e) => handleUpdate('hero_headline', e.target.value)}
                                            rows={2}
                                            className="w-full bg-slate-50 border-none rounded-2xl px-6 py-5 text-xl font-black text-royal-blue outline-none transition-all resize-none shadow-inner"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Sub-headline</label>
                                        <textarea
                                            value={settings.hero_subheadline || ''}
                                            onChange={(e) => handleUpdate('hero_subheadline', e.target.value)}
                                            rows={2}
                                            className="w-full bg-slate-50 border-none rounded-2xl px-6 py-5 text-sm font-bold text-slate-500 outline-none transition-all resize-none italic"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Physical Button Text</label>
                                            <input
                                                value={settings.hero_cta_physical || ''}
                                                onChange={(e) => handleUpdate('hero_cta_physical', e.target.value)}
                                                className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-black text-slate-700 outline-none"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Digital Button Text</label>
                                            <input
                                                value={settings.hero_cta_digital || ''}
                                                onChange={(e) => handleUpdate('hero_cta_digital', e.target.value)}
                                                className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-black text-slate-700 outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'delivery' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                                    <Truck className="w-6 h-6 text-sky-500" />
                                    Shipping & Logistics
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Inside Dhaka Shipping (৳)</label>
                                        <input
                                            type="number"
                                            value={settings.delivery_dhaka || 60}
                                            onChange={(e) => handleUpdate('delivery_dhaka', Number(e.target.value))}
                                            className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-black text-slate-700 outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Outside Dhaka Shipping (৳)</label>
                                        <input
                                            type="number"
                                            value={settings.delivery_outside || 120}
                                            onChange={(e) => handleUpdate('delivery_outside', Number(e.target.value))}
                                            className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-black text-slate-700 outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Free Delivery Threshold (৳)</label>
                                        <input
                                            type="number"
                                            value={settings.free_delivery_threshold || 2000}
                                            onChange={(e) => handleUpdate('free_delivery_threshold', Number(e.target.value))}
                                            className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-black text-royal-blue outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'social' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                                    <Globe className="w-6 h-6 text-slate-800" />
                                    Social Presence
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Facebook URL</label>
                                        <div className="relative">
                                            <input
                                                value={settings.social_fb || ''}
                                                onChange={(e) => handleUpdate('social_fb', e.target.value)}
                                                className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-5 py-4 text-sm font-bold text-slate-600 outline-none"
                                            />
                                            <Facebook className="absolute left-4 top-4.5 w-5 h-5 text-slate-300" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Instagram URL</label>
                                        <div className="relative">
                                            <input
                                                value={settings.social_ig || ''}
                                                onChange={(e) => handleUpdate('social_ig', e.target.value)}
                                                className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-5 py-4 text-sm font-bold text-slate-600 outline-none"
                                            />
                                            <Instagram className="absolute left-4 top-4.5 w-5 h-5 text-slate-300" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </main>
            </div>
        </div>
    );
}
