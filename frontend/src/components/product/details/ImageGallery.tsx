'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

interface ImageGalleryProps {
    images: string[];
    productName: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, productName }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const galleryImages = images.length > 0 ? images : ['/placeholder-product.jpg'];

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-3xl border border-slate-100 overflow-hidden group cursor-zoom-in">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full"
                    >
                        <Image
                            src={galleryImages[activeIndex]}
                            alt={productName}
                            fill
                            className="object-contain p-8 group-hover:scale-110 transition-transform duration-500"
                            priority
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Zoom Icon Overlay */}
                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur shadow-sm p-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                    <Search className="w-5 h-5 text-slate-400" />
                </div>

                {/* Navigation Buttons for gallery */}
                {galleryImages.length > 1 && (
                    <>
                        <button
                            onClick={() => setActiveIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-xl rounded-full flex items-center justify-center text-slate-400 hover:text-royal-blue transition-all opacity-0 group-hover:opacity-100"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={() => setActiveIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-xl rounded-full flex items-center justify-center text-slate-400 hover:text-royal-blue transition-all opacity-0 group-hover:opacity-100"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnails */}
            {galleryImages.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {galleryImages.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            className={`relative w-24 h-24 rounded-2xl border-2 transition-all shrink-0 overflow-hidden bg-white ${activeIndex === idx ? 'border-royal-blue shadow-lg shadow-royal-blue/10' : 'border-slate-100 hover:border-slate-200'
                                }`}
                        >
                            <Image src={img} alt={`${productName} thumbnail ${idx}`} fill className="object-cover p-2" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
