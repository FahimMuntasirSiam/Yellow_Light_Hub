'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Plus,
    Search,
    Filter,
    Edit2,
    Trash2,
    Eye,
    Package,
    Zap,
    ChevronLeft,
    ChevronRight,
    Download
} from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

import { API_BASE_URL } from '@/config/api';
 
 export default function AdminProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/products?limit=50`);
                if (res.ok) {
                    const data = await res.json();
                    setProducts(data);
                }
            } catch (err) {
                console.error('Failed to fetch products:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku?.toLowerCase().includes(search.toLowerCase());
        const matchesType = typeFilter === 'all' || p.type === typeFilter;
        return matchesSearch && matchesType;
    });

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-800">Products</h1>
                    <p className="text-slate-500 font-bold italic mt-1">Manage your physical and digital inventory.</p>
                </div>
                <Link href="/admin/products/new">
                    <Button className="h-12 rounded-2xl px-8 gap-2 shadow-xl shadow-royal-blue/20">
                        <Plus className="w-5 h-5" />
                        Add New Product
                    </Button>
                </Link>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <input
                        type="text"
                        placeholder="Search by name or SKU..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-4 py-3.5 text-sm font-bold text-slate-700 focus:bg-white focus:ring-2 focus:ring-royal-blue/10 transition-all outline-none"
                    />
                    <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-300" />
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="flex-1 md:w-40 bg-slate-50 border-none rounded-2xl px-6 py-3.5 text-sm font-bold text-slate-700 focus:bg-white outline-none appearance-none"
                    >
                        <option value="all">All Types</option>
                        <option value="physical">Physical Items</option>
                        <option value="digital">Digital Assets</option>
                    </select>
                    <Button variant="outline" className="h-12 w-12 p-0 rounded-2xl border-slate-100">
                        <Filter className="w-5 h-5 text-slate-400" />
                    </Button>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="py-5 px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Product</th>
                                <th className="py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                                <th className="py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Price</th>
                                <th className="py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Inventory</th>
                                <th className="py-5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="py-5 px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="py-6 px-8"><div className="h-10 w-48 bg-slate-100 rounded-lg"></div></td>
                                        <td className="py-6 px-6"><div className="h-6 w-20 bg-slate-100 rounded-lg"></div></td>
                                        <td className="py-6 px-6"><div className="h-6 w-16 bg-slate-100 rounded-lg"></div></td>
                                        <td className="py-6 px-6"><div className="h-6 w-16 bg-slate-100 rounded-lg"></div></td>
                                        <td className="py-6 px-6"><div className="h-6 w-20 bg-slate-100 rounded-lg"></div></td>
                                        <td className="py-6 px-8"><div className="h-10 w-10 bg-slate-100 rounded-lg ml-auto"></div></td>
                                    </tr>
                                ))
                            ) : filteredProducts.map((product) => (
                                <tr key={product.id} className="group hover:bg-slate-50/80 transition-all duration-300">
                                    <td className="py-6 px-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden border border-slate-100 shrink-0 relative">
                                                {product.thumbnail_url && (
                                                    <Image src={product.thumbnail_url} alt={product.name} fill className="object-contain" />
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="text-sm font-black text-slate-800 truncate group-hover:text-royal-blue transition-colors">{product.name}</h4>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{product.sku || 'No SKU'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-6 px-6">
                                        <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${product.type === 'digital' ? 'text-brand-yellow' : 'text-sky-500'}`}>
                                            {product.type === 'digital' ? <Zap className="w-3 h-3" /> : <Package className="w-3 h-3" />}
                                            {product.type}
                                        </div>
                                    </td>
                                    <td className="py-6 px-6">
                                        <div className="text-sm font-black text-slate-800">৳{product.selling_price.toLocaleString()}</div>
                                        {product.compare_price && (
                                            <div className="text-[10px] font-bold text-slate-300 line-through">৳{product.compare_price.toLocaleString()}</div>
                                        )}
                                    </td>
                                    <td className="py-6 px-6">
                                        <div className={`text-sm font-bold ${product.stock_qty < 5 ? 'text-rose-500' : 'text-slate-600'}`}>
                                            {product.type === 'digital' ? (
                                                <span className="flex items-center gap-1.5"><Download className="w-3.5 h-3.5" /> Unlimited</span>
                                            ) : (
                                                `${product.stock_qty} in stock`
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-6 px-6">
                                        <Badge className={product.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-none px-3 py-1 font-black text-[9px]' : 'bg-slate-100 text-slate-500 border-none px-3 py-1 font-black text-[9px]'}>
                                            {product.status?.toUpperCase() || 'ACTIVE'}
                                        </Badge>
                                    </td>
                                    <td className="py-6 px-8 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-royal-blue hover:border-royal-blue hover:shadow-lg hover:shadow-royal-blue/10 transition-all">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <Link href={`/admin/products/${product.id}/edit`}>
                                                <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-emerald-500 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/10 transition-all">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                            </Link>
                                            <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-rose-500 hover:border-rose-500 hover:shadow-lg hover:shadow-rose-500/10 transition-all">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Placeholder */}
                <div className="bg-slate-50/50 p-6 flex justify-between items-center border-t border-slate-100">
                    <p className="text-xs font-bold text-slate-400 italic">Showing {filteredProducts.length} of {products.length} products</p>
                    <div className="flex gap-2">
                        <Button variant="outline" className="h-10 w-10 p-0 rounded-xl border-slate-200"><ChevronLeft className="w-4 h-4" /></Button>
                        <Button variant="outline" className="h-10 w-10 p-0 rounded-xl border-slate-200"><ChevronRight className="w-4 h-4" /></Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
