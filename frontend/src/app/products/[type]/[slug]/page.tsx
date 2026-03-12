import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { ShoppingCart, Zap, ShieldCheck, Truck, Package, Download, Monitor, Info, Share2, Heart, Plus, Minus, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ImageGallery } from '@/components/product/details/ImageGallery';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProductCard } from '@/components/product/ProductCard';
import { StarRating } from '@/components/ui/StarRating';
import { ProductTabs } from '@/components/product/ProductTabs';
import { API_BASE_URL } from '@/config/api';

// --- SEO & Metadata Generation ---
export async function generateMetadata(
    { params }: { params: { type: string; slug: string } },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = params;

    try {
        const res = await fetch(`${API_BASE_URL}/api/products/${slug}`);
        if (!res.ok) return { title: 'Product Not Found' };

        const product = await res.json();

        const previousImages = (await parent).openGraph?.images || [];

        return {
            title: `${product.meta_title || product.name} | YellowLight Hub`,
            description: product.meta_description || product.description?.substring(0, 160),
            keywords: product.meta_keywords,
            alternates: {
                canonical: `https://yellowlighthub.com/products/${params.type}/${slug}`,
            },
            openGraph: {
                title: product.name,
                description: product.meta_description,
                url: `https://yellowlighthub.com/products/${params.type}/${slug}`,
                images: [product.thumbnail_url, ...previousImages],
                type: 'website',
            },
            twitter: {
                card: 'summary_large_image',
                title: product.name,
                description: product.meta_description,
                images: [product.thumbnail_url],
            },
        };
    } catch {
        return { title: 'YellowLight Hub' };
    }
}

interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    short_description?: string;
    meta_title?: string;
    meta_description?: string;
    meta_keywords?: string;
    thumbnail_url: string;
    images?: string[];
    category_id: string;
    categories?: { name: string };
    selling_price: number;
    discount_price?: number;
    compare_price?: number;
    stock_qty: number;
    sku?: string;
}

export default async function ProductDetailPage({ params }: { params: { type: string; slug: string } }) {
    const { type, slug } = params;

    // Fetch product and related products
    let product: Product | null = null;
    let relatedProducts: Product[] = [];
    try {
        const res = await fetch(`${API_BASE_URL}/api/products/${slug}?type=${type}`);
        if (!res.ok) notFound();
        product = await res.json();

        if (product) {
            const relatedRes = await fetch(`${API_BASE_URL}/api/products?category=${product.category_id}&limit=4`);
            if (relatedRes.ok) {
                const data = await relatedRes.json();
                relatedProducts = data.filter((p: Product) => p.id !== (product as Product).id);
            }
        }
    } catch (err) {
        console.error('Product fetch error:', err);
        notFound();
    }

    if (!product) return null;

    const isPhysical = type === 'physical';
    const discountPercent = product.compare_price ? Math.round(((product.compare_price - product.selling_price) / product.compare_price) * 100) : 0;

    // JSON-LD Structured Data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        image: [product.thumbnail_url, ...(product.images || [])],
        description: product.meta_description || product.short_description || product.description,
        sku: product.sku,
        brand: {
            '@type': 'Brand',
            name: 'YellowLight Hub',
        },
        offers: {
            '@type': 'Offer',
            url: `https://yellowlighthub.com/products/${type}/${slug}`,
            priceCurrency: 'BDT',
            price: product.selling_price,
            itemCondition: 'https://schema.org/NewCondition',
            availability: product.stock_qty > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            reviewCount: '24',
        },
    };

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Dynamic SEO JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="container mx-auto px-4 lg:px-8">
                <Breadcrumbs
                    items={[
                        { label: type === 'physical' ? 'Electronics' : 'Digital Products', href: `/products/${type}` },
                        { label: product.name }
                    ]}
                />

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white rounded-[2.5rem] p-6 lg:p-12 shadow-sm border border-slate-100">
                    {/* Left Column: Image Gallery */}
                    <div className="lg:col-span-6 xl:col-span-5">
                        <ImageGallery images={product.images || [product.thumbnail_url]} productName={product.name} />
                    </div>

                    {/* Right Column: Product Detail */}
                    <div className="lg:col-span-6 xl:col-span-7 flex flex-col">
                        <div className="flex justify-between items-start gap-4">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Badge variant="primary" className="bg-royal-blue/5 text-royal-blue border-none font-black tracking-widest text-[10px]">
                                        {product.categories?.name || (isPhysical ? 'Physical' : 'Digital')}
                                    </Badge>
                                    {discountPercent > 0 && (
                                        <Badge variant="secondary" className="bg-brand-yellow text-royal-blue border-none font-black text-[10px]">
                                            SAVE {discountPercent}%
                                        </Badge>
                                    )}
                                </div>
                                <h1 className="text-3xl md:text-4xl font-black text-slate-800 leading-tight">{product.name}</h1>
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <StarRating rating={4.8} size="sm" />
                                        <span className="text-xs font-bold text-slate-400 underline decoration-slate-200 cursor-pointer hover:text-royal-blue transition-colors">(24 Reviews)</span>
                                    </div>
                                    <div className="text-xs font-bold text-slate-400 flex items-center gap-2">
                                        <Package className="w-3.5 h-3.5" />
                                        SKU: {product.sku || 'N/A'}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center hover:bg-rose-50 hover:border-rose-100 group transition-all">
                                    <Heart className="w-5 h-5 text-slate-400 group-hover:text-rose-500" />
                                </button>
                                <button className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center hover:bg-royal-blue/5 hover:border-royal-blue/10 group transition-all">
                                    <Share2 className="w-5 h-5 text-slate-400 group-hover:text-royal-blue" />
                                </button>
                            </div>
                        </div>

                        <div className="mt-8 pb-8 border-b border-slate-100">
                            <div className="flex items-baseline gap-4 mb-2">
                                <span className="text-4xl font-black text-royal-blue">৳{product.selling_price.toLocaleString()}</span>
                                {product.compare_price && (
                                    <span className="text-xl text-slate-300 line-through font-bold">৳{product.compare_price.toLocaleString()}</span>
                                )}
                            </div>

                            {/* Stock Indicator */}
                            <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${product.stock_qty > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                                <span className={`text-sm font-bold ${product.stock_qty > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                    {product.stock_qty > 0 ? `In Stock (${product.stock_qty} units available)` : 'Out of Stock'}
                                </span>
                            </div>
                        </div>

                        <div className="mt-8 space-y-8">
                            {product.short_description && (
                                <p className="text-slate-500 leading-relaxed font-bold italic opacity-80">
                                    {product.short_description}
                                </p>
                            )}

                            {isPhysical ? (
                                // PHYSICAL CONTROLS
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Quantity:</span>
                                        <div className="flex items-center border-2 border-slate-100 rounded-2xl p-1 bg-white">
                                            <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-royal-blue hover:bg-slate-50 rounded-xl transition-all">
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="w-12 text-center font-black text-slate-700">1</span>
                                            <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-royal-blue hover:bg-slate-50 rounded-xl transition-all">
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <Button className="h-16 text-lg font-black rounded-2xl gap-3 shadow-xl shadow-royal-blue/10">
                                            <ShoppingCart className="w-6 h-6" />
                                            Add to Cart
                                        </Button>
                                        <Button variant="secondary" className="h-16 text-lg font-black rounded-2xl gap-3 shadow-xl shadow-brand-yellow/10">
                                            <Zap className="w-6 h-6" />
                                            Buy It Now
                                        </Button>
                                    </div>

                                    {/* Shipping Info */}
                                    <div className="p-5 rounded-3xl bg-slate-50 border border-slate-100 grid grid-cols-2 gap-4">
                                        <div className="flex items-start gap-4">
                                            <Truck className="w-5 h-5 text-royal-blue shrink-0 mt-1" />
                                            <div>
                                                <h4 className="text-xs font-black text-slate-800 uppercase mb-1">Shipping</h4>
                                                <p className="text-[11px] text-slate-500 font-bold italic leading-tight">Delivery in 2-4 days across Bangladesh.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
                                            <div>
                                                <h4 className="text-xs font-black text-slate-800 uppercase mb-1">Warranty</h4>
                                                <p className="text-[11px] text-slate-500 font-bold italic leading-tight">1 Year official brand warranty.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // DIGITAL CONTROLS
                                <div className="space-y-6">
                                    <Button variant="secondary" className="w-full h-16 text-lg font-black rounded-2xl gap-3 shadow-xl shadow-brand-yellow/10">
                                        <Zap className="w-6 h-6" />
                                        Get Instant Access
                                    </Button>

                                    <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-4">
                                        <h4 className="text-xs font-black text-brand-yellow uppercase tracking-widest flex items-center gap-2">
                                            <Info className="w-4 h-4" />
                                            Digital Delivery Info
                                        </h4>
                                        <ul className="space-y-3">
                                            <li className="flex items-center gap-3 text-sm font-bold opacity-90">
                                                <Download className="w-4 h-4 text-emerald-400" />
                                                Instant ZIP download after payment.
                                            </li>
                                            <li className="flex items-center gap-3 text-sm font-bold opacity-90">
                                                <Monitor className="w-4 h-4 text-sky-400" />
                                                Compatible with Windows, Mac, and Linux.
                                            </li>
                                            <li className="flex items-center gap-3 text-sm font-bold opacity-90">
                                                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                                                100% Genuine commercial license.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Product Tabs (Description, Specs, Reviews, FAQ) */}
                <ProductTabs
                    description={product.description}
                    productId={product.id}
                />

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-20">
                        <div className="flex items-center justify-between mb-10">
                            <h2 className="text-3xl font-black text-slate-800">Customers also viewed</h2>
                            <Link href={`/products/${type}`} className="text-royal-blue font-black text-sm uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
                                View All <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProducts.map((p: Product) => (
                                <ProductCard
                                    key={p.id}
                                    id={p.id}
                                    name={p.name}
                                    slug={p.slug}
                                    price={p.selling_price}
                                    discountPrice={p.discount_price}
                                    image={p.thumbnail_url}
                                    category={p.categories?.name || 'Accessories'}
                                    rating={4.8}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
