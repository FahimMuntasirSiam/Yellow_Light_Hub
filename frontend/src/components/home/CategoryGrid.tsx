'use client';

import React from 'react';
import Link from 'next/link';
import {
    Smartphone,
    Laptop,
    Home,
    Download,
    Layout,
    Settings,
    ChevronRight
} from 'lucide-react';

const categories = [
    { name: 'Electronics', icon: Smartphone, color: 'text-blue-600', bg: 'bg-blue-50', link: '/category/electronics' },
    { name: 'Mobile Accessories', icon: Laptop, color: 'text-royal-blue', bg: 'bg-indigo-50', link: '/category/accessories' },
    { name: 'Smart Home', icon: Home, color: 'text-emerald-600', bg: 'bg-emerald-50', link: '/category/smart-home' },
    { name: 'Software Licenses', icon: Download, color: 'text-purple-600', bg: 'bg-purple-50', link: '/category/software' },
    { name: 'Templates', icon: Layout, color: 'text-brand-yellow', bg: 'bg-amber-50', link: '/category/templates' },
    { name: 'Digital Tools', icon: Settings, color: 'text-rose-600', bg: 'bg-rose-50', link: '/category/digital-tools' },
];

export const CategoryGrid = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800 mb-2">Shop by Category</h2>
                        <p className="text-slate-500">Find exactly what you are looking for in our curated selections.</p>
                    </div>
                    <Link href="/categories" className="text-royal-blue font-semibold flex items-center gap-1 group">
                        View All <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
                    {categories.map((cat, i) => (
                        <Link
                            key={i}
                            href={cat.link}
                            className="group p-6 rounded-2xl border border-slate-100 hover:border-royal-blue/20 hover:shadow-lg hover:shadow-royal-blue/5 transition-all text-center"
                        >
                            <div className={`w-14 h-14 ${cat.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                                <cat.icon className={`w-7 h-7 ${cat.color}`} />
                            </div>
                            <h3 className="font-semibold text-slate-800 text-sm md:text-base mb-1">{cat.name}</h3>
                            <span className="text-[10px] uppercase font-bold text-royal-blue opacity-0 group-hover:opacity-100 transition-opacity">Shop Now</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};
