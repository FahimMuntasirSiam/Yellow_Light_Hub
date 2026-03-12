'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Search,
    Filter,
    Eye,
    Calendar,
    CreditCard,
    Truck,
    ChevronLeft,
    ChevronRight,
    MoreVertical,
    Download
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { supabase } from '@/lib/supabase';

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data, error } = await supabase
                    .from('orders')
                    .select('*, profiles:user_id(full_name)')
                    .order('created_at', { ascending: false });

                if (data) setOrders(data);
            } catch (err) {
                console.error('Failed to fetch orders:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const filteredOrders = orders.filter(o => {
        const matchesSearch = o.id.toLowerCase().includes(search.toLowerCase()) ||
            (o.profiles?.full_name || '').toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending': return 'bg-amber-50 text-amber-600';
            case 'processing': return 'bg-sky-50 text-sky-600';
            case 'shipped': return 'bg-indigo-50 text-indigo-600';
            case 'delivered': return 'bg-emerald-50 text-emerald-600';
            case 'cancelled': return 'bg-rose-50 text-rose-600';
            default: return 'bg-slate-50 text-slate-500';
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-800">Orders</h1>
                    <p className="text-slate-500 font-bold italic mt-1">Manage customer purchases and fulfillment status.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-12 rounded-2xl px-6 gap-2 border-slate-200">
                        <Download className="w-4 h-4" />
                        Export CSV
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <input
                        type="text"
                        placeholder="Search Order ID or Customer..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-4 py-3.5 text-sm font-bold text-slate-700 focus:bg-white focus:ring-2 focus:ring-royal-blue/10 transition-all outline-none"
                    />
                    <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-300" />
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="flex-1 md:w-40 bg-slate-50 border-none rounded-2xl px-6 py-3.5 text-sm font-bold text-slate-700 focus:bg-white outline-none appearance-none"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                    <Button variant="outline" className="h-12 w-12 p-0 rounded-2xl border-slate-100">
                        <Filter className="w-5 h-5 text-slate-400" />
                    </Button>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="py-5 px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Order ID</th>
                                <th className="py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                                <th className="py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                                <th className="py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Total</th>
                                <th className="py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="py-5 px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 font-bold text-slate-700">
                            {loading ? (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={6} className="py-8 px-8"><div className="h-6 bg-slate-100 rounded-lg w-full"></div></td>
                                    </tr>
                                ))
                            ) : filteredOrders.map((order) => (
                                <tr key={order.id} className="group hover:bg-slate-50 transition-all duration-300">
                                    <td className="py-6 px-8 text-royal-blue font-black uppercase text-xs">#{order.id.slice(0, 8)}</td>
                                    <td className="py-6 px-6">
                                        <div className="flex items-center gap-2 text-xs">
                                            <Calendar className="w-3.5 h-3.5 text-slate-300" />
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="py-6 px-6">
                                        <div className="text-sm font-black text-slate-800">{order.profiles?.full_name || 'Guest'}</div>
                                        <div className="text-[10px] text-slate-400 uppercase tracking-tight">{order.payment_method}</div>
                                    </td>
                                    <td className="py-6 px-6">
                                        <div className="text-sm font-black text-slate-800">৳{order.total_amount.toLocaleString()}</div>
                                        <div className="text-[10px] text-slate-400">{order.item_count} items</div>
                                    </td>
                                    <td className="py-6 px-6">
                                        <Badge className={`${getStatusColor(order.status)} border-none px-3 py-1 font-black text-[9px] uppercase tracking-widest`}>
                                            {order.status}
                                        </Badge>
                                    </td>
                                    <td className="py-6 px-8 text-right">
                                        <Link href={`/admin/orders/${order.id}`}>
                                            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-100 text-slate-300 hover:text-royal-blue hover:border-royal-blue hover:shadow-lg hover:shadow-royal-blue/10 transition-all ml-auto">
                                                <Eye className="w-4.5 h-4.5" />
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
