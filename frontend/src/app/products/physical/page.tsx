'use client';

import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, LayoutGrid, X } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/Button';
import { ProductGridSkeleton } from '@/components/ui/Skeleton';
import { API_BASE_URL } from '@/config/api';

// --- Modular Filter Content Component ---
const FilterContent = ({ selectedCategory, setSelectedCategory, categories, priceRange, setPriceRange, }: any) => (
    <div className="space-y-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                <LayoutGrid className="w-4 h-4 text-royal-blue" />
                Categories
            </h3>
            <div className="space-y-2">
                <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${!selectedCategory ? 'bg-royal-blue text-white font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                    All Products
                </button>
                {categories.map((cat: string) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${selectedCategory === cat ? 'bg-royal-blue text-white font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4">Price Range</h3>
            <input
                type="range"
                min="0"
                max="200000"
                step="1000"
                value={priceRange}
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-royal-blue"
            />
            <div className="flex justify-between mt-2 text-xs font-bold text-slate-400">
                <span>৳0</span>
                <span>৳{priceRange.toLocaleString()}</span>
            </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center justify-between">
            <span className="text-sm font-bold text-slate-700">In Stock Only</span>
            <div className="w-10 h-5 bg-royal-blue rounded-full relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
            </div>
        </div>
    </div>
);

export default function PhysicalProductsPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [priceRange, setPriceRange] = useState(200000);
    const [sortBy, setSortBy] = useState('newest');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const queryParams = new URLSearchParams({
                    type: 'physical',
                    ...(selectedCategory && { category: selectedCategory }),
                    ...(searchQuery && { search: searchQuery }),
                    sort: sortBy
                });

                const res = await fetch(`${API_BASE_URL}/api/products?${queryParams}`);
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                console.error('Failed to fetch products:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [selectedCategory, searchQuery, sortBy]);

    const categories = ['Electronics', 'Mobile Accessories', 'Smart Home', 'Computers', 'Audio'];

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header Section */}
            <div className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 lg:px-8 py-12">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Electronics & Physical Products</h1>
                            <p className="text-slate-500 font-medium">Premium gadgets delivered to your doorstep in Bangladesh.</p>
                        </div>
                        <div className="relative w-full md:w-96">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-slate-100 focus:border-royal-blue/20 outline-none transition-all"
                            />
                            <Search className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 mt-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Mobile Filter Drawer */}
                    {isSidebarOpen && (
                        <div className="fixed inset-0 z-[100] lg:hidden">
                            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
                            <aside className="absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-slate-50 p-6 shadow-2xl animate-in slide-in-from-left duration-300 overflow-y-auto">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-xl font-bold text-slate-800">Filters</h2>
                                    <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                                        <X className="w-6 h-6 text-slate-500" />
                                    </button>
                                </div>
                                <FilterContent
                                    selectedCategory={selectedCategory}
                                    setSelectedCategory={setSelectedCategory}
                                    categories={categories}
                                    priceRange={priceRange}
                                    setPriceRange={setPriceRange}
                                />
                            </aside>
                        </div>
                    )}

                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-72 shrink-0">
                        <FilterContent
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            categories={categories}
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                        />
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
                            <div className="text-sm">
                                <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Active Products:</span>
                                <span className="text-slate-800 font-extrabold ml-2">{products.length} Items</span>
                            </div>

                            <div className="flex items-center gap-4">
                                <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden flex items-center gap-2 bg-white border border-slate-200 px-4 py-2.5 rounded-xl font-bold text-slate-700 shadow-sm">
                                    <SlidersHorizontal className="w-4 h-4" />
                                    Filters
                                </button>
                                <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-xl shadow-sm">
                                    <span className="text-[10px] font-black text-slate-400 uppercase">Sort:</span>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="text-xs font-bold text-slate-800 bg-transparent outline-none cursor-pointer"
                                    >
                                        <option value="newest">Newest First</option>
                                        <option value="price-low">Price: Low-High</option>
                                        <option value="price-high">Price: High-Low</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {loading ? (
                            <ProductGridSkeleton />
                        ) : products.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                {products.map((p) => (
                                    <ProductCard
                                        key={p.id}
                                        id={p.id}
                                        name={p.name}
                                        slug={p.slug}
                                        price={p.selling_price}
                                        discountPrice={p.discount_price}
                                        image={p.thumbnail_url}
                                        category={p.categories?.name || 'Electronics'}
                                        rating={4.8}
                                        badge={p.stock_qty < 5 ? 'Low Stock' : undefined}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="py-24 text-center bg-white rounded-[2.5rem] border border-dashed border-slate-200 shadow-sm">
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Search className="w-10 h-10 text-slate-200" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-2">No Results Found</h3>
                                <p className="text-slate-500 font-medium">Try broadening your search or resetting filters.</p>
                                <Button variant="outline" className="mt-8 rounded-xl h-12 px-8" onClick={() => { setSelectedCategory(null); setSearchQuery(''); }}>
                                    Clear All Filters
                                </Button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
