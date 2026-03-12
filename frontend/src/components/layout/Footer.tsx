import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, ShieldCheck } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <span className="text-2xl font-bold text-white flex items-center gap-2">
                            <div className="bg-brand-yellow p-1 rounded-md">
                                <div className="w-4 h-4 bg-royal-blue rounded-full" />
                            </div>
                            YellowLight Hub
                        </span>
                        <p className="text-sm leading-relaxed">
                            Your premium destination for high-quality electronics and digital products in Bangladesh. Innovation meets reliability.
                        </p>
                        <div className="flex items-center gap-4">
                            <Link href="#" className="hover:text-brand-yellow transition-colors"><Facebook className="w-5 h-5" /></Link>
                            <Link href="#" className="hover:text-brand-yellow transition-colors"><Twitter className="w-5 h-5" /></Link>
                            <Link href="#" className="hover:text-brand-yellow transition-colors"><Instagram className="w-5 h-5" /></Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Quick Links</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/about" className="hover:text-brand-yellow transition-colors">About Us</Link></li>
                            <li><Link href="/products" className="hover:text-brand-yellow transition-colors">Shop All</Link></li>
                            <li><Link href="/shipping" className="hover:text-brand-yellow transition-colors">Shipping Info</Link></li>
                            <li><Link href="/terms" className="hover:text-brand-yellow transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Help & Support</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/contact" className="hover:text-brand-yellow transition-colors">Contact Us</Link></li>
                            <li><Link href="/faq" className="hover:text-brand-yellow transition-colors">FAQs</Link></li>
                            <li><Link href="/returns" className="hover:text-brand-yellow transition-colors">Returns & Refunds</Link></li>
                            <li><Link href="/track" className="hover:text-brand-yellow transition-colors">Track Order</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Newsletter</h4>
                        <p className="text-sm mb-4">Subscribe for the latest gadget launches and exclusive deals.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="bg-slate-800 border-none rounded-lg px-4 py-2 text-sm w-full focus:ring-2 focus:ring-royal-blue outline-none"
                            />
                            <button className="bg-royal-blue text-white p-2 rounded-lg hover:bg-royal-blue/90 transition-colors">
                                <Mail className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="mt-8 flex items-center gap-3 bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                            <ShieldCheck className="w-6 h-6 text-brand-yellow" />
                            <div>
                                <span className="block text-xs font-bold text-white uppercase tracking-wider">Trusted by Customers</span>
                                <span className="text-[10px] text-slate-400">Secure Payments in Bangladesh</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px]">
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                        <p>© 2026 YellowLight Hub. All rights reserved.</p>
                        <span className="hidden md:inline text-slate-700">|</span>
                        <p className="font-black text-brand-yellow/80">Powered by YellowLight Hub</p>
                    </div>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
