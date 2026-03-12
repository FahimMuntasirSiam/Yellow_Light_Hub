import React from 'react';
import { Star, StarHalf } from 'lucide-react';

interface StarRatingProps {
    rating: number;
    total?: number;
    size?: 'sm' | 'md' | 'lg';
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, total = 5, size = 'md' }) => {
    const iconSize = size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-6 h-6' : 'w-4 h-4';

    return (
        <div className="flex items-center gap-1">
            {[...Array(Math.floor(rating))].map((_, i) => (
                <Star key={i} className={`${iconSize} fill-brand-yellow text-brand-yellow`} />
            ))}
            {rating % 1 !== 0 && <StarHalf className={`${iconSize} fill-brand-yellow text-brand-yellow`} />}
            {[...Array(total - Math.ceil(rating))].map((_, i) => (
                <Star key={i} className={`${iconSize} text-slate-200`} />
            ))}
            <span className={`ml-1 font-bold text-slate-500 ${size === 'sm' ? 'text-[10px]' : 'text-xs'}`}>({rating})</span>
        </div>
    );
};
