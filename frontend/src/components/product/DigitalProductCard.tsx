'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Download, Monitor, Zap, Shield, FileCode, ShoppingCart, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useCartStore } from '@/store/cartStore';

interface DigitalProductCardProps {
    id: string | number;
    name: string;
    slug: string;
    price: number;
    discountPrice?: number;
    image: string;
    category: string;
    rating: number;
    version?: string;
    licenseType?: 'Personal' | 'Commercial';
    compatibility?: string[]; // e.g. ['Windows', 'Mac', 'Web']
    fileType?: string; // e.g. 'ZIP', 'EXE', 'PDF'
    badge?: string;
}

export const DigitalProductCard: React.FC<DigitalProductCardProps> = ({
    id,
    name,
    slug,
    price,
    discountPrice,
    image,
    category,
    rating,
    version = '1.0.0',
    licenseType = 'Personal',
    compatibility = ['Web'],
    fileType = 'ZIP',
    badge,
}) => {
    const { addItem } = useCartStore();

    const handleGetNow = (e: React.MouseEvent) => {
        e.preventDefault();
        addItem({
            id,
            name,
            slug,
            price: discountPrice || price,
            image,
        });
    };

    return (
        <div className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-brand-yellow/10 transition-all duration-500 flex flex-col h-full">
            {/* Visual Header */}
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <Image
                    src={image || '/placeholder-digital.jpg'}
                    alt={name}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />

                {/* Digital Badge */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <Badge variant="secondary" className="bg-brand-yellow text-royal-blue border-none shadow-lg">
                        DIGITAL
                    </Badge>
                    {badge && <Badge variant="primary">{badge}</Badge>}
                </div>

                {/* Instant Delivery Promise */}
                <div className="absolute top-3 right-3 bg-white/10 backdrop-blur-md px-2 py-1 rounded-lg border border-white/20 flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-brand-yellow" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">Instant</span>
                </div>

                {/* File Type Overlay */}
                <div className="absolute bottom-3 right-3 bg-slate-800/80 text-white text-[10px] font-bold px-2 py-1 rounded-md border border-slate-700">
                    .{fileType}
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{category}</span>
                    <span className="text-[10px] font-bold text-royal-blue bg-royal-blue/5 px-2 py-0.5 rounded leading-none">v{version}</span>
                </div>

                <Link href={`/product/${slug}`} className="block mb-3">
                    <h3 className="font-bold text-slate-800 group-hover:text-royal-blue transition-colors leading-tight line-clamp-2">
                        {name}
                    </h3>
                </Link>

                {/* Compatibility & License */}
                <div className="flex flex-wrap gap-2 mb-4">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                        <Monitor className="w-3 h-3" />
                        {compatibility.join(' / ')}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-brand-yellow bg-brand-yellow/5 px-2 py-1 rounded-md border border-brand-yellow/10">
                        <Shield className="w-3 h-3" />
                        {licenseType} License
                    </div>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex flex-col">
                        {discountPrice ? (
                            <>
                                <span className="text-xs text-slate-400 line-through">৳{price.toLocaleString()}</span>
                                <span className="text-xl font-black text-royal-blue font-sans">৳{discountPrice.toLocaleString()}</span>
                            </>
                        ) : (
                            <span className="text-xl font-black text-slate-800 font-sans">৳{price.toLocaleString()}</span>
                        )}
                        <span className="text-[9px] font-bold text-emerald-600 flex items-center gap-1 mt-0.5">
                            <Download className="w-2.5 h-2.5" />
                            Instant Access
                        </span>
                    </div>

                    <Button
                        onClick={handleGetNow}
                        variant="secondary"
                        size="sm"
                        className="rounded-xl font-bold text-xs h-10 px-4 flex items-center gap-2 group/btn"
                    >
                        Get Now
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                </div>
            </div>
        </div>
    );
};
