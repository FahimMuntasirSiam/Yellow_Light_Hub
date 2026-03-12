'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, ArrowRight, Zap } from 'lucide-react';
import { Button } from '../ui/Button';

export const Hero = () => {
    return (
        <div className="relative overflow-hidden bg-royal-blue text-white py-20 lg:py-32">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-yellow/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-400/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

            <div className="container mx-auto px-4 lg:px-8 relative">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Animated Lightbulb */}
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-8"
                    >
                        <div className="relative">
                            <Lightbulb className="w-5 h-5 text-brand-yellow" />
                            <motion.div
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute inset-0 w-5 h-5 bg-brand-yellow blur-md -z-10"
                            />
                        </div>
                        <span className="text-xs font-bold tracking-widest uppercase">Trusted for Innovation</span>
                    </motion.div>

                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]"
                    >
                        Bangladesh's <span className="text-brand-yellow">Trusted</span> Electronics & Digital Products Store
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-10"
                    >
                        Shop smart. Buy local. Premium gadgets and instant digital services delivered straight to your door.
                    </motion.p>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Button variant="secondary" size="lg" className="w-full sm:w-auto flex items-center gap-2">
                            Shop Electronics <ArrowRight className="w-5 h-5" />
                        </Button>
                        <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white/10 flex items-center gap-2">
                            Get Digital Assets <Zap className="w-5 h-5" />
                        </Button>
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="mt-16 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
                    >
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-xl uppercase tracking-tighter">Secure.</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-xl uppercase tracking-tighter">Speed.</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-xl uppercase tracking-tighter">Support.</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
