'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    ChevronLeft,
    Printer,
    Package,
    CheckCircle2,
    MapPin,
    Phone,
    Mail,
    CreditCard,
    Clock,
    ArrowRight
} from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { supabase } from '@/lib/supabase';

interface OrderItem {
    name: string;
    quantity: number;
    price: number;
    image_url: string;
}

interface Order {
    id: string;
    created_at: string;
    status: string;
    total_amount: number;
    payment_method: string;
    order_items: OrderItem[];
    profiles: {
        full_name: string;
        email: string;
        phone: string;
    };
    shipping_address: {
        phone: string;
        full_address: string;
    };
}

export default function OrderDetailPage() {
    const { id } = useParams();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const { data, error } = await supabase
                    .from('orders')
                    .select('*, order_items(*), profiles:user_id(full_name, email, phone)')
                    .eq('id', id)
                    .single();

                if (data) setOrder(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchOrder();
    }, [id]);

    const updateStatus = async (newStatus: string) => {
        if (!order) return;
        setUpdating(true);
        try {
            const { error } = await supabase
                .from('orders')
                .update({ status: newStatus })
                .eq('id', id);

            if (!error) {
                setOrder({ ...order, status: newStatus });
            } else {
                console.error('Update error:', error);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <div className="p-10 text-center font-bold">Loading Order...</div>;
    if (!order) return <div className="p-10 text-center font-bold">Order Not Found</div>;

    const steps = ['pending', 'processing', 'shipped', 'delivered'];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Top Navigation */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link href="/admin/orders">
                        <button className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-royal-blue shadow-sm hover:shadow-lg transition-all">
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Order #{order.id.slice(0, 8)}</h1>
                        <p className="text-slate-400 font-bold text-xs mt-1 italic">Placed on {new Date(order.created_at).toLocaleString()}</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-12 rounded-xl border-slate-200 gap-2" onClick={() => window.print()}>
                        <Printer className="w-4 h-4" />
                        Print Invoice
                    </Button>
                    <div className="relative group">
                        <Button className="h-12 rounded-xl px-6 gap-2 bg-royal-blue shadow-lg shadow-royal-blue/20">
                            Update Status
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                        {/* Status Dropdown */}
                        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                            {steps.map(s => (
                                <button
                                    key={s}
                                    disabled={updating}
                                    onClick={() => updateStatus(s)}
                                    className={`w-full text-left px-5 py-3 text-xs font-black uppercase tracking-widest hover:bg-slate-50 disabled:opacity-50 ${order.status === s ? 'text-royal-blue' : 'text-slate-400'}`}
                                >
                                    {s} {updating && order.status === s ? '...' : ''}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Order Items */}
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <Package className="w-6 h-6 text-royal-blue" />
                            <h3 className="text-xl font-black text-slate-800">Purchased Items</h3>
                        </div>

                        <div className="space-y-6">
                            {order.order_items?.map((item: any, i: number) => (
                                <div key={i} className="flex items-center gap-6 p-4 rounded-3xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group">
                                    <div className="w-16 h-16 bg-slate-100 rounded-2xl overflow-hidden border border-slate-100 shrink-0 relative">
                                        <Image src={item.image_url} alt={item.name} fill className="object-contain" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-black text-slate-800 truncate">{item.name}</h4>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Quantity: {item.quantity}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-slate-800">৳{(item.price * item.quantity).toLocaleString()}</p>
                                        <p className="text-[10px] font-bold text-slate-300">৳{item.price.toLocaleString()} each</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 pt-8 border-t border-slate-50 space-y-3">
                            <div className="flex justify-between text-sm font-bold text-slate-500">
                                <span>Subtotal</span>
                                <span>৳{order.total_amount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm font-bold text-slate-500">
                                <span>Delivery Fee</span>
                                <span>৳0</span>
                            </div>
                            <div className="flex justify-between text-lg font-black text-slate-800 pt-2">
                                <span>Grand Total</span>
                                <span className="text-royal-blue">৳{order.total_amount.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Status Timeline */}
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-10">
                            <Clock className="w-6 h-6 text-sky-500" />
                            <h3 className="text-xl font-black text-slate-800">Status Lifecycle</h3>
                        </div>

                        <div className="relative flex justify-between items-start">
                            <div className="absolute top-5 left-0 w-full h-1 bg-slate-100 -z-0"></div>
                            {steps.map((step, idx) => {
                                const isDone = steps.indexOf(order.status) >= idx;
                                return (
                                    <div key={step} className="relative z-10 flex flex-col items-center gap-3 w-1/4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${isDone ? 'bg-royal-blue text-white shadow-lg shadow-royal-blue/20' : 'bg-white border-2 border-slate-200 text-slate-300'
                                            }`}>
                                            {isDone ? <CheckCircle2 className="w-5 h-5" /> : <div className="w-2 h-2 rounded-full bg-slate-200" />}
                                        </div>
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${isDone ? 'text-royal-blue' : 'text-slate-300'}`}>{step}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Customer Info */}
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Customer Profile</h3>
                        <div className="flex items-center gap-4 mb-8 p-4 bg-slate-50 rounded-2xl">
                            <div className="w-12 h-12 bg-royal-blue text-white rounded-xl flex items-center justify-center font-black text-lg">
                                {order.profiles?.full_name?.charAt(0) || 'G'}
                            </div>
                            <div className="min-w-0">
                                <h4 className="text-sm font-black text-slate-800 truncate">{order.profiles?.full_name || 'Guest User'}</h4>
                                <p className="text-[10px] font-bold text-slate-400 truncate tracking-tight">{order.profiles?.email}</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <Phone className="w-4 h-4 text-slate-300" />
                                <p className="text-xs font-bold text-slate-600">{order.shipping_address?.phone || order.profiles?.phone || 'No phone provided'}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <Mail className="w-4 h-4 text-slate-300" />
                                <p className="text-xs font-bold text-slate-600">{order.profiles?.email}</p>
                            </div>
                            <div className="flex items-start gap-4">
                                <MapPin className="w-4 h-4 text-slate-300 mt-1" />
                                <div className="text-xs font-bold text-slate-600 italic">
                                    {order.shipping_address?.full_address || 'No shipping address provided for digital asset.'}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Details */}
                    <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl shadow-slate-200">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xs font-black text-brand-yellow uppercase tracking-widest">Payment Ledger</h3>
                            <CreditCard className="w-5 h-5 text-slate-500" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-2xl font-black">৳{order.total_amount.toLocaleString()}</p>
                            <div className="flex items-center gap-2">
                                <Badge className="bg-emerald-500/20 text-emerald-400 border-none px-2 py-0.5 text-[8px] font-black uppercase">Paid</Badge>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{order.payment_method}</span>
                            </div>
                        </div>

                        <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/5 italic">
                            <p className="text-[10px] text-slate-400 leading-relaxed font-bold">Verification successful. Digital licenses have been dispatched to the customer dashboard.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
