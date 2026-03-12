'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { CheckCircle2, Download, ArrowRight, Package, Home, Truck, Phone, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { API_BASE_URL } from '@/config/api';

export default function OrderConfirmationPage() {
    const router = useRouter();
    const { orderId } = useParams();
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/orders/${orderId}`);
                if (res.ok) {
                    const data = await res.json();
                    setOrder(data);
                }
            } catch (err) {
                console.error('Failed to fetch order:', err);
            } finally {
                setLoading(false);
            }
        };

        if (orderId) fetchOrder();
    }, [orderId]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="w-12 h-12 border-4 border-royal-blue border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    const hasDigital = order?.order_items?.some((item: any) => item.product_snapshot.type === 'digital');

    return (
        <div className="bg-slate-50 min-h-screen pb-20 pt-12">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    {/* Success Header */}
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                            className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/10"
                        >
                            <CheckCircle2 className="w-12 h-12" />
                        </motion.div>
                        <h1 className="text-3xl md:text-5xl font-black text-slate-800 mb-4">Your order has been placed!</h1>
                        <p className="text-slate-500 font-bold italic mb-4">Confirmation email has been sent to <span className="text-royal-blue">{order?.email || 'your email'}</span></p>
                        <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm">
                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Order Number:</span>
                            <span className="text-sm font-black text-royal-blue">#{order?.order_number || orderId}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h3 className="font-black text-slate-800 mb-6 flex items-center gap-2">
                                <Package className="w-5 h-5 text-royal-blue" />
                                Order Summary
                            </h3>
                            <div className="space-y-4">
                                {order?.order_items?.map((item: any) => (
                                    <div key={item.id} className="flex justify-between items-center text-sm font-bold">
                                        <span className="text-slate-500">{item.product_snapshot.name} × {item.quantity}</span>
                                        <span className="text-slate-800">৳{(item.unit_price * item.quantity).toLocaleString()}</span>
                                    </div>
                                ))}
                                <div className="pt-4 border-t border-slate-50">
                                    <div className="flex justify-between items-center text-sm font-black text-slate-800">
                                        <span>Total Amount</span>
                                        <span className="text-royal-blue">৳{order?.total?.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                            <h3 className="font-black text-slate-800 mb-6 flex items-center gap-2">
                                <Truck className="w-5 h-5 text-emerald-600" />
                                Shipping To
                            </h3>
                            <div className="space-y-2">
                                <p className="text-sm font-black text-slate-700">{order?.fullName}</p>
                                <p className="text-xs font-bold text-slate-500 italic leading-relaxed">
                                    {order?.shipping_address?.address}, {order?.shipping_address?.district}
                                </p>
                                <p className="text-xs font-bold text-slate-500 mt-2 flex items-center gap-2">
                                    <Phone className="w-3.5 h-3.5" />
                                    {order?.phone}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Digital Access Alert */}
                    {hasDigital && (
                        <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden mb-12 shadow-2xl shadow-indigo-500/20">
                            <div className="absolute -right-10 -bottom-10 opacity-10">
                                <Zap className="w-64 h-64" />
                            </div>
                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                                <div className="flex-1 text-center md:text-left">
                                    <Badge variant="secondary" className="bg-brand-yellow text-royal-blue font-black tracking-widest mb-4">DIGITAL ACCESS</Badge>
                                    <h2 className="text-2xl md:text-3xl font-black mb-4">Access your digital products instantly!</h2>
                                    <p className="text-slate-400 font-bold italic mb-6">Your license keys and download links are ready in your dashboard.</p>
                                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                        <Button onClick={() => router.push('/account/licenses')} className="h-14 px-8 rounded-2xl gap-3">
                                            <Download className="w-5 h-5" />
                                            Go to My Licenses
                                        </Button>
                                    </div>
                                </div>
                                <div className="w-32 h-32 md:w-48 md:h-48 bg-white/5 backdrop-blur-3xl rounded-[3rem] flex items-center justify-center p-8 border border-white/10 shrink-0">
                                    <Zap className="w-full h-full text-brand-yellow drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                        <Button variant="outline" onClick={() => router.push('/')} className="h-14 px-10 rounded-2xl gap-2 border-slate-200">
                            <Home className="w-5 h-5" />
                            Return Home
                        </Button>
                        <Button onClick={() => router.push('/products/physical')} className="h-14 px-10 rounded-2xl gap-2">
                            Continue Shopping
                            <ArrowRight className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
