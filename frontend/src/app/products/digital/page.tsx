'use client';

import React, { useState, useEffect } from 'react';
import { Search, Monitor, Zap, Filter, ShieldCheck, Cpu } from 'lucide-react';
import { DigitalProductCard } from '@/components/product/DigitalProductCard';
import { Button } from '@/components/ui/Button';
import { ProductGridSkeleton } from '@/components/ui/Skeleton';
import { API_BASE_URL } from '@/config/api';

interface Product {
    id: string;
    name: string;
    slug: string;
    selling_price: number;
    discount_price?: number;
    thumbnail_url: string;
    categories?: { name: string };
    digital_assets?: { version: string; file_type: string }[];
    is_featured?: boolean;
}

export default function DigitalProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState('newest');

    const digitalTypes = ['Software License', 'Template', 'Plugin', 'Tool', 'Bundle'];

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const queryParams = new URLSearchParams({
                    type: 'digital',
                    ...(selectedType && { category: selectedType }),
                    ...(searchQuery && { search: searchQuery }),
                    sort: sortBy
                });

                const res = await fetch(`${API_BASE_URL}/api/products?${queryParams}`);
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                console.error('Failed to fetch digital products:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [selectedType, searchQuery, sortBy]);

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Premium Header */}
            <div className="bg-slate-900 text-white relative overflow-hidden">
                {/* Decorative Grid */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

                <div className="container mx-auto px-4 lg:px-8 py-16 md:py-24 relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 bg-brand-yellow text-royal-blue px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                            <Zap className="w-4 h-4" />
                            Instant Delivery
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                            Software Licenses & <span className="text-brand-yellow">Digital Assets</span>
                        </h1>
                        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-medium">
                            Elevate your workflow with premium licenses, templates, and digital tools. Instant access after purchase.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
                            <div className="relative flex-grow">
                                <input
                                    type="text"
                                    placeholder="Search software, keys..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:bg-white/10 focus:ring-2 focus:ring-brand-yellow/30 transition-all outline-none"
                                />
                                <Search className="absolute left-4 top-4.5 w-5 h-5 text-slate-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 lg:px-8 -mt-10 relative z-20">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar - Quick Filters */}
                    <aside className="lg:w-72 shrink-0 space-y-6">
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
                            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <Filter className="w-4 h-4 text-brand-yellow" />
                                Filter by Type
                            </h3>
                            <div className="space-y-2">
                                <button
                                    onClick={() => setSelectedType(null)}
                                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${!selectedType ? 'bg-royal-blue text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
                                >
                                    All Digital Assets
                                </button>
                                {digitalTypes.map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setSelectedType(type)}
                                        className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${selectedType === type ? 'bg-royal-blue text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Support Card */}
                        <div className="bg-indigo-600 rounded-3xl p-6 text-white overflow-hidden relative group">
                            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
                                <Monitor className="w-32 h-32" />
                            </div>
                            <div className="relative z-10">
                                <h4 className="font-bold mb-2">Need help?</h4>
                                <p className="text-xs text-indigo-100 mb-4 font-medium italic opacity-80">Our team can help you find the right license for your project.</p>
                                <Button variant="outline" size="sm" className="w-full bg-white/10 border-white/20 text-white hover:bg-white hover:text-indigo-600">
                                    Contact Support
                                </Button>
                            </div>
                        </div>
                    </aside>

                    {/* Listing Grid */}
                    <main className="flex-1">
                        <div className="flex items-center justify-between mb-8">
                            <div className="text-sm">
                                <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Active Inventory:</span>
                                <span className="text-slate-800 font-extrabold ml-2">{products.length} Digital Assets</span>
                            </div>

                            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-100 shadow-sm">
                                <span className="text-[10px] font-black text-slate-400 uppercase">Sort:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="text-xs font-bold text-slate-800 bg-transparent outline-none cursor-pointer"
                                >
                                    <option value="newest">Latest Releases</option>
                                    <option value="price-low">Price: Low-High</option>
                                    <option value="price-high">Price: High-Low</option>
                                </select>
                            </div>
                        </div>

                        {loading ? (
                            <ProductGridSkeleton />
                        ) : products.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {products.map((p) => (
                                    <DigitalProductCard
                                        key={p.id}
                                        id={p.id}
                                        name={p.name}
                                        slug={p.slug}
                                        price={p.selling_price}
                                        discountPrice={p.discount_price}
                                        image={p.thumbnail_url}
                                        category={p.categories?.name || 'Software'}
                                        rating={4.9}
                                        version={p.digital_assets?.[0]?.version || '1.0.0'}
                                        fileType={p.digital_assets?.[0]?.file_type?.toUpperCase() || 'ZIP'}
                                        badge={p.is_featured ? 'Bestseller' : undefined}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="py-24 text-center bg-white rounded-3xl border border-dashed border-slate-200 shadow-sm">
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Search className="w-10 h-10 text-slate-200" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-2">Inventory Empty</h3>
                                <p className="text-slate-500 font-medium">We couldn&apos;t find any digital assets matching your criteria.</p>
                                <Button
                                    variant="outline"
                                    className="mt-8"
                                    onClick={() => { setSelectedType(null); setSearchQuery(''); }}
                                >
                                    Clear All Filters
                                </Button>
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* Trust Section */}
            <section className="container mx-auto px-4 lg:px-8 mt-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 flex gap-4">
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800 mb-1">Authentic Licenses</h4>
                            <p className="text-xs text-slate-500 font-medium italic">We only sell genuine keys from verified providers.</p>
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 flex gap-4">
                        <div className="w-12 h-12 bg-brand-yellow/10 text-brand-yellow rounded-2xl flex items-center justify-center shrink-0">
                            <Zap className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800 mb-1">Instant Fulfillment</h4>
                            <p className="text-xs text-slate-500 font-medium italic">Your download link arrives immediately after payment.</p>
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 flex gap-4">
                        <div className="w-12 h-12 bg-royal-blue/5 text-royal-blue rounded-2xl flex items-center justify-center shrink-0">
                            <Cpu className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800 mb-1">Technical Support</h4>
                            <p className="text-xs text-slate-500 font-medium italic">24/7 priority support for license activation issues.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
