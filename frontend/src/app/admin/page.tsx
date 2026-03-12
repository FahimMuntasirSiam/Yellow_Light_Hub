'use client';

import React, { useEffect, useState } from 'react';
import {
    TrendingUp,
    ShoppingBag,
    Package,
    AlertCircle,
    ArrowUpRight,
    ArrowDownRight,
    ChevronRight,
    MoreVertical,
    Zap,
    Clock
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function AdminDashboardHome() {
    const [stats, setStats] = useState({
        totalSales: ৳45280,
        totalOrders: 156,
        totalProducts: 84,
        pendingOrders: 12
    });

    const recentOrders = [
        { id: '#YLH-192837', customer: 'Tanvir Ahmed', status: 'Processing', total: ৳2450, time: '10 min ago' },
        { id: '#YLH-192838', customer: 'Saima Islam', status: 'Delivered', total: ৳12800, time: '25 min ago' },
        { id: '#YLH-192839', customer: 'Rakib Hassan', status: 'Pending', total: ৳320, time: '1 hour ago' },
        { id: '#YLH-192840', customer: 'Zunaid Kabir', status: 'Shipped', total: ৳5600, time: '3 hours ago' },
    ];

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-slate-800">Overview</h1>
                    <p className="text-slate-500 font-bold italic mt-1">Operational status of YellowLight Hub today.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-11 rounded-xl border-slate-200 text-xs font-black uppercase tracking-widest gap-2">
                        <Clock className="w-4 h-4" />
                        View History
                    </Button>
                    <Button className="h-11 rounded-xl text-xs font-black uppercase tracking-widest gap-2">
                        <Zap className="w-4 h-4" />
                        Generate Report
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Sales Today', value: `৳${stats.totalSales.toLocaleString()}`, change: '+12.5%', icon: <TrendingUp className="w-6 h-6" />, color: 'royal-blue' },
                    { label: 'Total Orders', value: stats.totalOrders, change: '+5.2%', icon: <ShoppingBag className="w-6 h-6" />, color: 'emerald-500' },
                    { label: 'Active Products', value: stats.totalProducts, change: '0%', icon: <Package className="w-6 h-6" />, color: 'brand-yellow' },
                    { label: 'Pending Orders', value: stats.pendingOrders, change: '-2.1%', icon: <AlertCircle className="w-6 h-6" />, color: 'sky-500' }
                ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-${stat.color}/5 text-${stat.color === 'royal-blue' ? 'royal-blue' : stat.color}`}>
                                {stat.icon}
                            </div>
                            <div className={`flex items-center text-[10px] font-black ${stat.change.startsWith('+') ? 'text-emerald-500' : stat.change.startsWith('-') ? 'text-rose-500' : 'text-slate-400'}`}>
                                {stat.change.startsWith('+') ? <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> : stat.change.startsWith('-') ? <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" /> : null}
                                {stat.change}
                            </div>
                        </div>
                        <div>
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                            <h3 className="text-2xl font-black text-slate-800">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Recent Orders Table */}
                <div className="lg:col-span-3 bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-black text-slate-800">Recent Orders</h2>
                        <Link href="/admin/orders" className="text-xs font-black text-royal-blue uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                            All Orders <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="flex-1 overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                    <th className="pb-4 px-2">Order ID</th>
                                    <th className="pb-4 px-2">Customer</th>
                                    <th className="pb-4 px-2">Total</th>
                                    <th className="pb-4 px-2">Status</th>
                                    <th className="pb-4 px-2"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {recentOrders.map((order, i) => (
                                    <tr key={i} className="text-sm font-bold group hover:bg-slate-50/50 transition-all">
                                        <td className="py-4 px-2 text-royal-blue">{order.id}</td>
                                        <td className="py-4 px-2 text-slate-800">{order.customer}</td>
                                        <td className="py-4 px-2 text-slate-800">{order.total.toLocaleString()}</td>
                                        <td className="py-4 px-2">
                                            <Badge className={`${order.status === 'Processing' ? 'bg-sky-50 text-sky-600' :
                                                    order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' :
                                                        order.status === 'Pending' ? 'bg-indigo-50 text-indigo-600' :
                                                            'bg-slate-50 text-slate-500'
                                                } text-[10px] uppercase font-black tracking-widest border-none px-3 py-1 ring-1 ring-inset ring-slate-100`}>
                                                {order.status}
                                            </Badge>
                                        </td>
                                        <td className="py-4 px-2 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-slate-300 hover:text-slate-600">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Low Stock Alerts */}
                <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col">
                    <h2 className="text-xl font-black text-slate-800 mb-8">Stock Alerts</h2>
                    <div className="flex-1 space-y-4">
                        {[
                            { name: 'Apple Watch Series 9', stock: 2, image: '/p1.jpg' },
                            { name: 'Mechanical Keyboard RGB', stock: 4, image: '/p2.jpg' },
                            { name: 'Windows 11 Pro License', stock: 1, image: '/p3.jpg' }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                                <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden shrink-0 border border-slate-200">
                                    {/* image placeholder */}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-black text-slate-800 truncate">{item.name}</h4>
                                    <p className="text-xs font-bold text-rose-500 flex items-center gap-1.5 ring-1 ring-rose-50 px-2 py-0.5 rounded-full w-fit mt-1">
                                        Only {item.stock} left
                                    </p>
                                </div>
                                <Button variant="outline" className="h-9 px-4 rounded-xl text-[10px] font-black uppercase text-royal-blue border-royal-blue/20 hover:bg-royal-blue hover:text-white">Restock</Button>
                            </div>
                        ))}
                    </div>

                    {/* Visual Chart Placeholder */}
                    <div className="mt-8 pt-8 border-t border-slate-50">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">7-Day Sales</h3>
                            <span className="text-emerald-500 font-black text-xs">+18.2%</span>
                        </div>
                        <div className="h-24 w-full bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center p-4">
                            {/* This would be a real chart component in a bigger project */}
                            <svg viewBox="0 0 100 30" className="w-full h-full text-royal-blue/30 overflow-visible">
                                <path d="M0,25 L15,20 L30,22 L45,10 L60,15 L75,5 L100,2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <circle cx="45" cy="10" r="1.5" className="text-royal-blue" fill="currentColor" stroke="white" strokeWidth="0.5" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
