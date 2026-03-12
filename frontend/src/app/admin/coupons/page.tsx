'use client';

import React, { useState, useEffect } from 'react';
import {
    Plus,
    Ticket,
    Calendar,
    Trash2,
    ToggleRight,
    Search,
    Zap,
    Tag,
    Clock,
    CheckCircle2,
    MoreVertical
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { supabase } from '@/lib/supabase';

export default function CouponsPage() {
    const [coupons, setCoupons] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);
    const [newCoupon, setNewCoupon] = useState({
        code: '',
        type: 'percentage',
        value: 10,
        min_order: 0,
        expiry_date: '',
        max_uses: 100,
        is_active: true
    });

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const { data } = await supabase.from('coupons').select('*').order('created_at', { ascending: false });
                if (data) setCoupons(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCoupons();
    }, []);

    const handleCreate = async () => {
        try {
            const { data, error } = await supabase
                .from('coupons')
                .insert([newCoupon])
                .select();

            if (data) {
                setCoupons([data[0], ...coupons]);
                setIsNewModalOpen(false);
                setNewCoupon({ code: '', type: 'percentage', value: 10, min_order: 0, expiry_date: '', max_uses: 100, is_active: true });
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this coupon?')) return;
        try {
            await supabase.from('coupons').delete().eq('id', id);
            setCoupons(coupons.filter(c => c.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 italic">Coupons</h1>
                    <p className="text-slate-500 font-bold italic mt-1">Drive conversions with high-impact promotional offers.</p>
                </div>
                <Button onClick={() => setIsNewModalOpen(true)} className="h-12 rounded-2xl px-8 gap-2 shadow-xl shadow-emerald-500/20 bg-emerald-500 hover:bg-emerald-600">
                    <Plus className="w-5 h-5" />
                    Create New Campaign
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loading ? (
                    [...Array(3)].map((_, i) => (
                        <div key={i} className="h-60 bg-white rounded-[2.5rem] animate-pulse border border-slate-100"></div>
                    ))
                ) : coupons.map((coupon) => (
                    <div key={coupon.id} className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:shadow-xl transition-all duration-300 relative group overflow-hidden">
                        <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
                            <Ticket className="w-32 h-32" />
                        </div>

                        <div className="flex justify-between items-start mb-6">
                            <div className="bg-royal-blue/5 text-royal-blue px-4 py-2 rounded-xl text-lg font-black tracking-tighter border border-royal-blue/10">
                                {coupon.code}
                            </div>
                            <Badge className={`${coupon.is_active ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-300'} border-none font-black text-[9px] uppercase`}>
                                {coupon.is_active ? 'Running' : 'Paused'}
                            </Badge>
                        </div>

                        <div className="space-y-2 mb-8">
                            <h3 className="text-2xl font-black text-slate-800">
                                {coupon.type === 'percentage' ? `${coupon.value}% OFF` : `৳${coupon.value} OFF`}
                            </h3>
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest italic">
                                Min. Order: ৳{coupon.min_order.toLocaleString()}
                            </p>
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                                <Clock className="w-3.5 h-3.5" />
                                Exp: {coupon.expiry_date ? new Date(coupon.expiry_date).toLocaleDateString() : 'Never'}
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleDelete(coupon.id)} className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-200 hover:text-rose-500 hover:bg-rose-50 transition-all">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {coupons.length === 0 && !loading && (
                    <div className="lg:col-span-3 py-20 bg-slate-50/50 border-4 border-dashed border-slate-100 rounded-[3rem] text-center">
                        <Tag className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                        <h4 className="text-xl font-black text-slate-400">No active campaigns</h4>
                    </div>
                )}
            </div>

            {/* New Coupon Modal Placeholder */}
            {isNewModalOpen && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in-95 duration-300 relative">
                        <h2 className="text-2xl font-black text-slate-800 mb-8 italic">New Promo Campaign</h2>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Coupon Code</label>
                                <input
                                    value={newCoupon.code}
                                    onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                                    placeholder="SAVE20"
                                    className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-black text-royal-blue focus:shadow-xl transition-all outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</label>
                                    <select
                                        value={newCoupon.type}
                                        onChange={(e) => setNewCoupon({ ...newCoupon, type: e.target.value })}
                                        className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 outline-none appearance-none"
                                    >
                                        <option value="percentage">Percentage (%)</option>
                                        <option value="fixed">Fixed Amount (৳)</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Value</label>
                                    <input
                                        type="number"
                                        value={newCoupon.value}
                                        onChange={(e) => setNewCoupon({ ...newCoupon, value: Number(e.target.value) })}
                                        className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-black text-slate-700 outline-none"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4 pt-6">
                                <Button variant="outline" onClick={() => setIsNewModalOpen(false)} className="flex-1 h-14 rounded-2xl font-black border-slate-100">Cancel</Button>
                                <Button onClick={handleCreate} className="flex-1 h-14 rounded-2xl font-black bg-emerald-500 hover:bg-emerald-600 shadow-xl shadow-emerald-500/10">Launch Campaign</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
