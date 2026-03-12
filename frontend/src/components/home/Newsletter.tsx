'use client';

import React from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const Newsletter = () => {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="bg-royal-blue rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden">
                    {/* Decorative Pattern */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <div className="w-16 h-16 bg-brand-yellow/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
                            <Mail className="w-8 h-8 text-brand-yellow" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Never Miss a Deal</h2>
                        <p className="text-blue-100 mb-10 text-lg opacity-80">
                            Subscribe to our newsletter and get exclusive gadget launches and discounts sent directly to your inbox.
                        </p>

                        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-grow bg-white text-slate-800 h-14 px-6 rounded-xl border-none outline-none focus:ring-4 focus:ring-brand-yellow/30 font-medium"
                            />
                            <Button variant="secondary" size="lg" className="h-14 whitespace-nowrap group">
                                Join Now <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </form>
                        <p className="mt-6 text-[11px] uppercase tracking-widest font-bold text-blue-300 opacity-60">
                            No Spam. Only verified gadget picks.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
