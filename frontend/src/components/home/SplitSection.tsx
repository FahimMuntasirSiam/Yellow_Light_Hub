'use client';

import React from 'react';
import { Package, Globe, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const SplitSection = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Physical Products */}
                    <div className="flex-1 bg-royal-blue rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                            <Package className="w-48 h-48" />
                        </div>
                        <div className="relative z-10 max-w-md">
                            <h3 className="text-3xl font-bold mb-4">Physical Products</h3>
                            <p className="text-blue-100 mb-8 text-lg">
                                Premium electronics, smartphones, and accessories curated for reliability. Quick delivery across Bangladesh.
                            </p>
                            <Button variant="secondary" className="group/btn">
                                Browse Electronics <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </div>

                    {/* Digital Products */}
                    <div className="flex-1 bg-brand-yellow rounded-3xl p-8 lg:p-12 text-royal-blue relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                            <Globe className="w-48 h-48" />
                        </div>
                        <div className="relative z-10 max-w-md">
                            <h3 className="text-3xl font-bold mb-4">Digital Products</h3>
                            <p className="text-royal-blue/70 mb-8 text-lg">
                                Software licenses, digital assets, and tools. Instant delivery by email after payment. No waiting.
                            </p>
                            <Button variant="primary" className="group/btn">
                                Explore Digital <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
