'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FloatingUI = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
            {/* WhatsApp Button */}
            <a
                href="https://wa.me/8801234567890" // Placeholder number
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/20 hover:scale-110 active:scale-95 transition-all group relative"
            >
                <MessageCircle className="w-7 h-7" />
                <span className="absolute right-full mr-4 bg-slate-900 text-white px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Chat with us
                </span>
            </a>

            {/* Scroll to Top */}
            <AnimatePresence>
                {isVisible && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        onClick={scrollToTop}
                        className="w-14 h-14 bg-white text-royal-blue rounded-2xl flex items-center justify-center shadow-2xl shadow-slate-200 border border-slate-100 hover:scale-110 active:scale-95 transition-all group"
                    >
                        <ChevronUp className="w-7 h-7" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};
