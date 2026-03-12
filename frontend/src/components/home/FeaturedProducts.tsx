'use client';

import React, { useEffect, useState } from 'react';
import { ProductCard } from '../product/ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { API_BASE_URL } from '@/config/api';

export const FeaturedProducts = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/products`);
                const data = await res.json();
                // For demonstration, taking the first 8 or filtering featured if data has it
                setProducts(data.slice(0, 8));
            } catch (err) {
                console.error('Failed to fetch featured products:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchFeatured();
    }, []);

    return (
        <section className="py-20 bg-slate-50 overflow-hidden">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800 mb-2 font-sans tracking-tight">Trending Items</h2>
                        <p className="text-slate-500">Our most popular products this week.</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 rounded-full border border-slate-200 bg-white hover:border-royal-blue hover:text-royal-blue transition-colors">
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button className="p-2 rounded-full border border-slate-200 bg-white hover:border-royal-blue hover:text-royal-blue transition-colors">
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl border border-slate-100 p-4 space-y-4 animate-pulse">
                                <div className="aspect-square bg-slate-100 rounded-xl" />
                                <div className="h-4 bg-slate-100 rounded-full w-2/3" />
                                <div className="h-4 bg-slate-100 rounded-full w-1/2" />
                                <div className="flex justify-between items-center pt-2">
                                    <div className="h-6 bg-slate-100 rounded-full w-1/4" />
                                    <div className="h-8 bg-slate-100 rounded-lg w-1/4" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.length > 0 ? (
                            products.map((p) => (
                                <ProductCard
                                    key={p.id}
                                    id={p.id}
                                    name={p.name}
                                    slug={p.slug}
                                    price={p.selling_price}
                                    discountPrice={p.discount_price}
                                    image={p.thumbnail_url}
                                    category={p.categories?.name || 'Category'}
                                    rating={4.5} // Placeholder as requested or if DB has it
                                    badge={p.is_featured ? 'Hot' : undefined}
                                />
                            ))
                        ) : (
                            <div className="col-span-full py-12 text-center text-slate-400 font-medium bg-white rounded-2xl border border-dashed border-slate-200">
                                No featured products found. Start adding some to your shop!
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};
