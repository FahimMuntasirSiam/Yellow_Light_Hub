import { ProductGridSkeleton } from '@/components/ui/Skeleton';

export default function Loading() {
    return (
        <div className="container mx-auto px-4 lg:px-8 py-12">
            <div className="h-12 w-48 bg-slate-100 rounded-xl mb-8 animate-pulse" />
            <ProductGridSkeleton />
        </div>
    );
}
