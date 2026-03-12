'use client';

import React from 'react';

interface SkeletonProps {
    className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
    return (
        <div className={`animate-pulse bg-slate-200 rounded-2xl ${className}`} />
    );
};

export const ProductCardSkeleton = () => {
    return (
        <div className="bg-white rounded-[2rem] p-4 border border-slate-50 space-y-4">
            <Skeleton className="aspect-square w-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="flex justify-between items-center pt-2">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-10 w-10 rounded-full" />
            </div>
        </div>
    );
};

export const ProductGridSkeleton = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
    );
};
