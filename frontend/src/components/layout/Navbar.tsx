'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, User, Lightbulb, Menu, X, ChevronRight, Zap } from 'lucide-react';
import { Button } from '../ui/Button';
import { useCartStore } from '@/store/cartStore';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { getTotalItems, setIsOpen } = useCartStore();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 backdrop-blur-sm py-4'}`}>
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex items-center justify-between gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-brand-yellow p-1.5 rounded-lg">
                            <Lightbulb className="w-6 h-6 text-royal-blue" />
                        </div>
                        <span className="text-xl font-bold text-royal-blue hidden sm:inline-block">YellowLight <span className="text-slate-700">Hub</span></span>
                    </Link>

                    {/* Search Bar - Desktop */}
                    <div className="hidden md:flex flex-1 max-w-xl relative">
                        <input
                            type="text"
                            placeholder="Search for gadgets, electronics..."
                            className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 focus:border-royal-blue transition-all"
                        />
                        <Search className="absolute left-3.5 top-2.5 w-5 h-5 text-slate-400" />
                    </div>

                    {/* Navigation Links - Desktop */}
                    <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
                        <Link href="/products/physical" className="hover:text-royal-blue transition-colors">Electronics</Link>
                        <Link href="/digital" className="hover:text-royal-blue transition-colors">Digital Products</Link>
                        <Link href="/deals" className="hover:text-brand-yellow font-bold transition-colors text-royal-blue">Deals</Link>
                    </div>

                    {/* Action Icons */}
                    <div className="flex items-center gap-2 md:gap-4">
                        <button
                            onClick={() => setIsOpen(true)}
                            className="relative p-2 hover:bg-slate-100 rounded-full transition-all group"
                        >
                            <ShoppingCart className="w-6 h-6 text-slate-700 group-hover:text-royal-blue" />
                            {getTotalItems() > 0 && (
                                <span className="absolute top-0 right-0 bg-brand-yellow text-royal-blue text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                                    {getTotalItems()}
                                </span>
                            )}
                        </button>
                        <Button variant="outline" size="sm" className="hidden md:flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Login
                        </Button>
                        <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden bg-white border-t mt-0 p-6 flex flex-col gap-6 shadow-2xl animate-in slide-in-from-top-4 duration-300">
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Search gadgets..."
                            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-royal-blue/20 focus:bg-white transition-all outline-none font-medium"
                        />
                        <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Link href="/products/physical" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 font-bold text-slate-700 hover:text-royal-blue hover:bg-slate-50 rounded-xl transition-all flex items-center justify-between">
                            Electronics
                            <ChevronRight className="w-4 h-4 text-slate-300" />
                        </Link>
                        <Link href="/products/digital" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 font-bold text-slate-700 hover:text-royal-blue hover:bg-slate-50 rounded-xl transition-all flex items-center justify-between">
                            Digital Products
                            <ChevronRight className="w-4 h-4 text-slate-300" />
                        </Link>
                        <Link href="/deals" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 font-bold text-brand-yellow hover:bg-amber-50 rounded-xl transition-all flex items-center justify-between">
                            Hot Deals
                            <Zap className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                        <Button className="w-full h-12 rounded-xl justify-center font-bold">Sign In</Button>
                        <Button variant="outline" className="w-full h-12 rounded-xl justify-center font-bold border-slate-200">Register</Button>
                    </div>
                </div>
            )}
        </nav>
    );
};
