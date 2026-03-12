'use client';

import Link from 'next/link';
import { Home, Search, HelpCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center p-6 bg-slate-50">
            <div className="max-w-xl w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="relative inline-block">
                    <h1 className="text-[12rem] font-black text-royal-blue/5 leading-none select-none">404</h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-brand-yellow px-6 py-2 rounded-2xl shadow-xl shadow-brand-yellow/20 rotate-[-5deg] border-4 border-white">
                            <span className="text-royal-blue font-black text-xl uppercase tracking-widest">Lost in Transit</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-3xl font-black text-slate-800 italic">Something went wrong.</h2>
                    <p className="text-slate-500 font-bold italic max-w-md mx-auto">
                        It seems the product you&apos;re looking for was either sold out or removed. Let&apos;s get you back on track!
                    </p>
                </div>

                <div className="relative group max-w-sm mx-auto">
                    <input
                        type="text"
                        placeholder="Search for electronics or digital tools..."
                        className="w-full bg-white border-2 border-slate-100 rounded-[2rem] px-8 py-5 text-sm font-bold text-slate-700 focus:border-royal-blue/20 focus:shadow-2xl transition-all outline-none"
                    />
                    <button className="absolute right-3 top-3 w-10 h-10 bg-royal-blue text-white rounded-2xl flex items-center justify-center shadow-lg shadow-royal-blue/20 hover:scale-105 active:scale-95 transition-all">
                        <Search className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Link href="/" className="w-full sm:w-auto">
                        <Button className="w-full h-14 rounded-2xl px-10 gap-3 text-sm font-black shadow-xl shadow-royal-blue/10">
                            <Home className="w-4 h-4" />
                            Return Home
                        </Button>
                    </Link>
                    <Link href="/products/physical" className="w-full sm:w-auto">
                        <Button variant="outline" className="w-full h-14 rounded-2xl px-10 border-slate-200 text-sm font-black gap-3 hover:bg-slate-100">
                            Browse Shop
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>

                <div className="flex items-center justify-center gap-6 pt-12 border-t border-slate-100">
                    <a href="https://wa.me/8801234567890" target="_blank" className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-royal-blue transition-colors uppercase tracking-widest">
                        <HelpCircle className="w-4 h-4" />
                        Need Help?
                    </a>
                </div>
            </div>
        </div>
    );
}
