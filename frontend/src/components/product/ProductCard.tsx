'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Eye } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { StarRating } from '../ui/StarRating';
import { useCartStore } from '@/store/cartStore';

interface ProductCardProps {
    id: string | number;
    name: string;
    slug: string;
    price: number;
    discountPrice?: number;
    image: string;
    category: string;
    rating: number;
    badge?: string;
    inStock?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    id,
    name,
    slug,
    price,
    discountPrice,
    image,
    category,
    rating,
    badge,
    inStock = true,
}) => {
    const { addItem } = useCartStore();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addItem({
            id,
            name,
            slug,
            price: discountPrice || price,
            image
        });
    };

    return (
        <div className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-royal-blue/5 transition-all duration-300">
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-slate-50">
                <Link href={`/product/${slug}`}>
                    <Image
                        src={image || '/placeholder-product.jpg'}
                        alt={name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </Link>

                {badge && (
                    <div className="absolute top-3 left-3">
                        <Badge variant={badge === 'Sale' || badge === 'Hot' ? 'secondary' : 'primary'}>{badge}</Badge>
                    </div>
                )}

                <div className="absolute inset-0 bg-royal-blue/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                        variant="secondary"
                        size="sm"
                        className="rounded-full w-10 h-10 p-0"
                        onClick={handleAddToCart}
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </Button>
                    <Link href={`/product/${slug}`}>
                        <Button variant="primary" size="sm" className="rounded-full w-10 h-10 p-0">
                            <Eye className="w-5 h-5" />
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="text-[10px] font-bold text-royal-blue uppercase tracking-widest mb-1">{category}</div>
                <Link href={`/product/${slug}`}>
                    <h3 className="font-semibold text-slate-800 line-clamp-1 group-hover:text-royal-blue transition-colors mb-2">
                        {name}
                    </h3>
                </Link>

                <div className="mb-3">
                    <StarRating rating={rating} />
                </div>

                <div className="flex items-end justify-between">
                    <div className="flex flex-col">
                        {discountPrice ? (
                            <>
                                <span className="text-xs text-slate-400 line-through">৳{price.toLocaleString()}</span>
                                <span className="text-lg font-bold text-royal-blue font-sans tracking-tight">৳{discountPrice.toLocaleString()}</span>
                            </>
                        ) : (
                            <span className="text-lg font-bold text-slate-800 font-sans tracking-tight">৳{price.toLocaleString()}</span>
                        )}
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        className="h-9 px-3 rounded-lg border-slate-200 text-slate-600 hover:border-royal-blue hover:text-royal-blue"
                        onClick={handleAddToCart}
                    >
                        Add
                    </Button>
                </div>
            </div>
        </div>
    );
};
