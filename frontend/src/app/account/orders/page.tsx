'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { API_BASE_URL } from '@/config/api';
import { useRouter } from 'next/navigation';

export default function AccountOrdersPage() {
    const router = useRouter();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // In a real app, we'd get the user email from auth context
                const userEmail = 'user@example.com';
                const res = await fetch(`${API_BASE_URL}/api/orders/user/${userEmail}`);
                if (res.ok) {
                    const data = await res.json();
                    setOrders(data);
                }
            } catch (err) {
                console.error('Failed to fetch orders:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'delivered': return 'bg-emerald-50 text-emerald-600';
            case 'processing': return 'bg-sky-50 text-sky-600';
            case 'shipped': return 'bg-indigo-50 text-indigo-600';
            case 'cancelled': return 'bg-rose-50 text-rose-600';
            default: return 'bg-slate-50 text-slate-500';
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-black text-slate-800 mb-2">My Orders</h1>
                            <p className="text-slate-500 font-bold italic">Track and manage your recent purchases.</p>
                        </div>
                        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm">
                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Orders:</span>
                            <span className="text-sm font-black text-royal-blue">{orders.length}</span>
                        </div>
                    </header>

                    {loading ? (
                        <div className="space-y-6">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="h-48 bg-white rounded-3xl border border-slate-100 animate-pulse" />
                            ))}
                        </div>
                    ) : orders.length > 0 ? (
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div key={order.id} className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                                    <div className="flex flex-col md:flex-row justify-between gap-6">
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-4 mb-6">
                                                <span className="text-lg font-black text-slate-800">Order #{order.order_number}</span>
                                                <Badge className={`${getStatusColor(order.status)} border-none px-3 py-1 font-black text-[10px] tracking-widest uppercase`}>
                                                    {order.status}
                                                </Badge>
                                            </div>

                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
                                                <div>
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Date</span>
                                                    <span className="text-sm font-bold text-slate-700 block">{new Date(order.created_at).toLocaleDateString()}</span>
                                                </div>
                                                <div>
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Items</span>
                                                    <span className="text-sm font-bold text-slate-700 block">{order.order_items?.length || 0} Products</span>
                                                </div>
                                                <div>
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Total</span>
                                                    <span className="text-sm font-black text-royal-blue block">৳{order.total?.toLocaleString()}</span>
                                                </div>
                                                <div>
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Payment</span>
                                                    <span className="text-sm font-bold text-slate-700 block uppercase">{order.payment_method}</span>
                                                </div>
                                            </div>

                                            <div className="flex gap-2 overflow-x-auto pb-4">
                                                {order.order_items?.map((item: any, idx: number) => (
                                                    <div key={idx} className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 p-1 shrink-0 relative">
                                                        <Image src={item.product_snapshot.thumbnail_url} alt={item.product_snapshot.name || ''} fill className="object-contain p-1" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="md:w-48 flex flex-col gap-3 justify-center">
                                            <Button variant="outline" className="w-full border-slate-200 text-slate-600 hover:text-royal-blue h-12 rounded-xl text-xs font-black uppercase tracking-widest">
                                                View Details
                                            </Button>
                                            {order.status === 'delivered' && (
                                                <Button variant="secondary" className="w-full h-12 rounded-xl text-xs font-black uppercase tracking-widest">
                                                    Track Order
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white p-24 rounded-3xl border border-dashed border-slate-200 text-center">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <ShoppingBag className="w-10 h-10 text-slate-200" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-2">No orders found</h3>
                            <p className="text-slate-500 font-medium">You haven&apos;t placed any orders yet. Start shopping to see them here.</p>
                            <Button onClick={() => router.push('/products/physical')} className="mt-8">Start Shopping</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
