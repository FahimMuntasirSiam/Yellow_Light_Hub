'use client';

import React, { useState } from 'react';
import {
    Info,
    Image as ImageIcon,
    Package,
    Globe,
    CheckCircle2,
    ArrowRight,
    Zap,
    AlertCircle,
    Hash,
    Type,
    Layout,
    Star,
    Download,
    ShieldCheck,
    Search,
    Monitor
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface ProductFormProps {
    initialData?: any;
    isLoading?: boolean;
    onSubmit: (data: any) => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ initialData, isLoading, onSubmit }) => {
    const [activeTab, setActiveTab] = useState('basic');
    const [formData, setFormData] = useState(initialData || {
        name: '',
        slug: '',
        short_description: '',
        description: '',
        type: 'physical',
        category_id: '',
        brand: '',
        sku: '',
        selling_price: 0,
        compare_price: 0,
        cost_price: 0,
        stock_qty: 10,
        status: 'active',
        is_featured: false,
        meta_title: '',
        meta_description: '',
        meta_keywords: '',
        images: [],
        thumbnail_url: ''
    });

    const handleInputChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;

        if (name === 'name' && !initialData) {
            const slug = value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            setFormData((prev: any) => ({ ...prev, name: value, slug }));
        } else {
            setFormData((prev: any) => ({ ...prev, [name]: val }));
        }
    };

    const tabs = [
        { id: 'basic', label: 'Basic Info', icon: <Info className="w-4 h-4" /> },
        { id: 'media', label: 'Media Highlights', icon: <ImageIcon className="w-4 h-4" /> },
        { id: 'inventory', label: 'Inventory & Digital', icon: <Package className="w-4 h-4" /> },
        { id: 'seo', label: 'SEO Engine', icon: <Globe className="w-4 h-4" /> },
        { id: 'publish', label: 'Visibility', icon: <CheckCircle2 className="w-4 h-4" /> },
    ];

    return (
        <div className="flex flex-col lg:flex-row gap-10">
            {/* Tab Navigation */}
            <aside className="lg:w-72 shrink-0">
                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col gap-2 sticky top-24">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-black transition-all ${activeTab === tab.id
                                    ? 'bg-royal-blue text-white shadow-xl shadow-royal-blue/10 translate-x-1'
                                    : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                                }`}
                        >
                            <div className={activeTab === tab.id ? 'text-brand-yellow' : 'text-slate-300'}>
                                {tab.icon}
                            </div>
                            {tab.label}
                        </button>
                    ))}
                    <div className="mt-8 pt-8 border-t border-slate-50 flex flex-col gap-3">
                        <Button
                            onClick={() => onSubmit(formData)}
                            className="w-full h-14 rounded-2xl shadow-xl shadow-royal-blue/20"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Processing...' : (initialData ? 'Update Product' : 'Create Product')}
                        </Button>
                        <p className="text-center text-[10px] font-bold text-slate-300 uppercase tracking-widest">Draft Saved Automatically</p>
                    </div>
                </div>
            </aside>

            {/* Tab Content */}
            <main className="flex-1 min-w-0">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100 min-h-[700px]">

                    {/* BASIC INFO TAB */}
                    {activeTab === 'basic' && (
                        <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="flex items-center justify-between border-b border-slate-50 pb-6">
                                <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                                    <Type className="w-6 h-6 text-royal-blue" />
                                    Basic Information
                                </h3>
                                <Badge className="bg-slate-50 text-slate-400 border-none font-bold italic">Required fields marked</Badge>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Product Name</label>
                                    <input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Ultra Gaming Headset Pro"
                                        className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 focus:bg-white focus:ring-2 focus:ring-royal-blue/10 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Permalink / Slug</label>
                                    <div className="relative">
                                        <input
                                            name="slug"
                                            value={formData.slug}
                                            onChange={handleInputChange}
                                            className="w-full bg-slate-100 border-none rounded-2xl pl-24 pr-5 py-4 text-sm font-bold text-slate-500 italic cursor-not-allowed"
                                        />
                                        <span className="absolute left-5 top-4.5 text-[10px] font-black text-slate-300 uppercase">ylhub.com/</span>
                                    </div>
                                </div>

                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Short Catchy Description</label>
                                    <textarea
                                        name="short_description"
                                        value={formData.short_description}
                                        onChange={handleInputChange}
                                        rows={2}
                                        placeholder="Explain this product in one powerful sentence..."
                                        className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 focus:bg-white focus:ring-2 focus:ring-royal-blue/10 outline-none transition-all resize-none italic"
                                    />
                                </div>

                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Master Product Specification</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows={8}
                                        placeholder="Detailed features, box contents, and full specs..."
                                        className="w-full bg-slate-50 border-none rounded-2xl p-6 text-sm font-bold text-slate-700 focus:bg-white focus:ring-2 focus:ring-royal-blue/10 outline-none transition-all resize-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Inventory SKU</label>
                                    <div className="relative">
                                        <input
                                            name="sku"
                                            value={formData.sku}
                                            onChange={handleInputChange}
                                            placeholder="YL-HD-001"
                                            className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-5 py-4 text-sm font-bold text-slate-700 focus:bg-white outline-none"
                                        />
                                        <Hash className="absolute left-4 top-4 w-5 h-5 text-slate-300" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Product Type</label>
                                    <div className="flex bg-slate-50 rounded-2xl p-1 gap-1">
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, type: 'physical' })}
                                            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${formData.type === 'physical' ? 'bg-white text-royal-blue shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                        >Physical</button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, type: 'digital' })}
                                            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${formData.type === 'digital' ? 'bg-white text-brand-yellow shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                        >Digital</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* MEDIA TAB */}
                    {activeTab === 'media' && (
                        <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="flex items-center justify-between border-b border-slate-50 pb-6">
                                <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                                    <ImageIcon className="w-6 h-6 text-emerald-500" />
                                    Media Assets
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-6">
                                    <div className="p-8 border-4 border-dashed border-slate-100 rounded-[2.5rem] bg-slate-50/50 flex flex-col items-center justify-center text-center group hover:bg-white hover:border-royal-blue/20 transition-all cursor-pointer">
                                        <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-lg mb-4 text-slate-300 group-hover:text-royal-blue transition-colors">
                                            <Plus className="w-8 h-8" />
                                        </div>
                                        <h4 className="text-sm font-black text-slate-700">Drop your product images here</h4>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Maximum file size: 5MB</p>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        {[...Array(3)].map((_, i) => (
                                            <div key={i} className="aspect-square bg-slate-50 rounded-2xl border-2 border-slate-100 border-dashed animate-pulse"></div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col justify-center">
                                    <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mb-6">
                                        <Zap className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-xl font-black mb-4">Fast Loading Optimization</h4>
                                    <p className="text-sm font-bold text-slate-400 italic leading-relaxed">Images will be automatically compressed to WebP format for 90+ PageSpeed insights scores. High-res originals are kept for hover-zoom.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* INVENTORY TAB */}
                    {activeTab === 'inventory' && (
                        <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="flex items-center justify-between border-b border-slate-50 pb-6">
                                <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                                    <Package className="w-6 h-6 text-sky-500" />
                                    Inventory Controls
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Current Selling Price (৳)</label>
                                    <div className="relative">
                                        <input
                                            name="selling_price"
                                            type="number"
                                            value={formData.selling_price}
                                            onChange={handleInputChange}
                                            className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-5 py-4 text-lg font-black text-royal-blue focus:bg-white outline-none"
                                        />
                                        <span className="absolute left-5 top-4.5 font-black text-slate-300">৳</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Compare Price / MRP (৳)</label>
                                    <div className="relative">
                                        <input
                                            name="compare_price"
                                            type="number"
                                            value={formData.compare_price}
                                            onChange={handleInputChange}
                                            className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-5 py-4 text-sm font-bold text-slate-400 focus:bg-white outline-none"
                                        />
                                        <span className="absolute left-5 top-4.5 font-black text-slate-200">৳</span>
                                    </div>
                                </div>

                                {formData.type === 'physical' ? (
                                    <div className="md:col-span-2 p-8 rounded-[2rem] bg-slate-50 border border-slate-100 space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400">
                                                    <Layout className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-black text-slate-800">Physical Stock Management</h4>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Calculates shipping at checkout</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Initial Stock Quantity</label>
                                                <input
                                                    name="stock_qty"
                                                    type="number"
                                                    value={formData.stock_qty}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-white border border-slate-100 rounded-2xl px-5 py-3 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-royal-blue/10 outline-none"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Unit Weight (Gram)</label>
                                                <input
                                                    placeholder="e.g. 500"
                                                    className="w-full bg-white border border-slate-100 rounded-2xl px-5 py-3 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-royal-blue/10 outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="md:col-span-2 p-8 rounded-[2rem] bg-slate-900 border border-slate-800 space-y-8 animate-in zoom-in-95 duration-300">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-brand-yellow/10 rounded-xl shadow-sm flex items-center justify-center text-brand-yellow">
                                                <Download className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-black text-white">Digital Delivery Settings</h4>
                                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Automatic instant delivery after payment</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Version String</label>
                                                <input
                                                    placeholder="v1.0.4"
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm font-bold text-white focus:bg-white/10 outline-none"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">License Type</label>
                                                <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm font-bold text-white outline-none appearance-none">
                                                    <option className="bg-slate-900">Personal Use</option>
                                                    <option className="bg-slate-900">Commercial (Extended)</option>
                                                    <option className="bg-slate-900">Subscription Key</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="p-10 border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center text-center group hover:bg-white/5 hover:border-brand-yellow/30 transition-all cursor-pointer">
                                            <div className="w-16 h-16 bg-brand-yellow rounded-2xl flex items-center justify-center shadow-lg shadow-brand-yellow/20 mb-4 group-hover:scale-110 transition-transform">
                                                <Plus className="w-8 h-8 text-royal-blue" />
                                            </div>
                                            <h4 className="text-white font-black">Upload Digital Package</h4>
                                            <p className="text-[10px] font-bold text-slate-500 uppercase mt-2">ZIP, PDF, OR LICENSE TEXT</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* SEO TAB */}
                    {activeTab === 'seo' && (
                        <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="flex items-center justify-between border-b border-slate-50 pb-6">
                                <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                                    <Globe className="w-6 h-6 text-royal-blue" />
                                    Google Search Visibility
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                <div className="space-y-8">
                                    <div className="space-y-2">
                                        <div className="flex justify-between ml-1">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Meta Title Tag</label>
                                            <span className={`text-[10px] font-black ${formData.meta_title.length > 50 && formData.meta_title.length <= 60 ? 'text-emerald-500' : 'text-slate-300'}`}>{formData.meta_title.length}/60</span>
                                        </div>
                                        <input
                                            name="meta_title"
                                            value={formData.meta_title}
                                            onChange={handleInputChange}
                                            placeholder="Recommended: Product Name + Brand"
                                            className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3.5 text-sm font-bold text-slate-700 focus:bg-white focus:ring-2 focus:ring-royal-blue/10 outline-none transition-all"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between ml-1">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Meta Description</label>
                                            <span className={`text-[10px] font-black ${formData.meta_description.length > 150 && formData.meta_description.length <= 160 ? 'text-emerald-500' : 'text-slate-300'}`}>{formData.meta_description.length}/160</span>
                                        </div>
                                        <textarea
                                            name="meta_description"
                                            value={formData.meta_description}
                                            onChange={handleInputChange}
                                            rows={4}
                                            placeholder="A compelling summary to increase click-through rate..."
                                            className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 focus:bg-white focus:ring-2 focus:ring-royal-blue/10 outline-none transition-all resize-none italic"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Keywords (Comma separated)</label>
                                        <input
                                            name="meta_keywords"
                                            value={formData.meta_keywords}
                                            onChange={handleInputChange}
                                            placeholder="e.g. bluetooth, wireless, audiophile"
                                            className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3.5 text-sm font-bold text-slate-700 outline-none"
                                        />
                                    </div>
                                </div>

                                {/* SEO LIVE PREVIEW */}
                                <div className="space-y-6">
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <Search className="w-4 h-4" />
                                        Live Google Search Preview
                                    </h4>

                                    <div className="bg-white rounded-[2rem] p-8 shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col gap-2">
                                        <div className="flex items-center gap-3 mb-1">
                                            <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-[10px] font-black text-slate-300">YL</div>
                                            <div>
                                                <p className="text-[11px] text-slate-500 font-bold">YellowLight Hub</p>
                                                <p className="text-[10px] text-slate-300">https://ylhub.com › products › {formData.slug || '...'}</p>
                                            </div>
                                            <MoreHorizontal className="w-4 h-4 text-slate-200 ml-auto" />
                                        </div>
                                        <h5 className="text-xl text-[#1a0dab] font-normal hover:underline cursor-pointer truncate">
                                            {formData.meta_title || formData.name || 'Your Product Meta Title Will Appear Here'}
                                        </h5>
                                        <p className="text-sm text-[#4d5156] leading-relaxed line-clamp-2">
                                            {formData.meta_description || 'Write a compelling meta description to increase your search engine visibility and attract more potential customers to your store.'}
                                        </p>
                                    </div>

                                    <div className="bg-royal-blue/5 p-6 rounded-[2rem] border border-royal-blue/10 flex items-start gap-4">
                                        <ShieldCheck className="w-6 h-6 text-royal-blue shrink-0 mt-1" />
                                        <div>
                                            <h6 className="text-xs font-black text-slate-800 uppercase tracking-tight mb-1">JSON-LD Data Generated</h6>
                                            <p className="text-[11px] font-bold text-slate-500 italic">We've automatically added Product Schema for rich results and Google Shopping snippets.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* PUBLISH TAB */}
                    {activeTab === 'publish' && (
                        <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="flex items-center justify-between border-b border-slate-50 pb-6">
                                <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                                    Visibility & Launch
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div
                                    onClick={() => setFormData({ ...formData, status: formData.status === 'active' ? 'inactive' : 'active' })}
                                    className={`p-10 rounded-[2.5rem] border-2 cursor-pointer transition-all ${formData.status === 'active'
                                            ? 'bg-emerald-50 border-emerald-200'
                                            : 'bg-slate-50 border-slate-100 hover:border-slate-200'
                                        }`}
                                >
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${formData.status === 'active' ? 'bg-emerald-500 text-white' : 'bg-white text-slate-300'}`}>
                                        <Eye className="w-7 h-7" />
                                    </div>
                                    <h4 className="text-xl font-black text-slate-800">Public Visibility</h4>
                                    <p className="text-sm font-bold text-slate-400 mt-2 italic">When active, product is visible to all store visitors.</p>
                                </div>

                                <div
                                    onClick={() => setFormData({ ...formData, is_featured: !formData.is_featured })}
                                    className={`p-10 rounded-[2.5rem] border-2 cursor-pointer transition-all ${formData.is_featured
                                            ? 'bg-brand-yellow/5 border-brand-yellow/30'
                                            : 'bg-slate-50 border-slate-100 hover:border-slate-200'
                                        }`}
                                >
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${formData.is_featured ? 'bg-brand-yellow text-royal-blue' : 'bg-white text-slate-300'}`}>
                                        <Star className="w-7 h-7" />
                                    </div>
                                    <h4 className="text-xl font-black text-slate-800">Homepage Feature</h4>
                                    <p className="text-sm font-bold text-slate-400 mt-2 italic">Product will be highlighted in "Featured Deals" carousels.</p>
                                </div>
                            </div>

                            <div className="bg-slate-50 p-12 rounded-[3rem] border border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
                                <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center shadow-sm mb-6 text-slate-200">
                                    <Monitor className="w-10 h-10" />
                                </div>
                                <h4 className="text-lg font-black text-slate-800 mb-2">Ready to publish?</h4>
                                <p className="text-sm font-bold text-slate-400 max-w-sm mb-10 italic">Double check your SEO and images before going live. Every detail counts for conversion.</p>
                                <div className="flex gap-4">
                                    <Button variant="outline" className="h-14 px-10 rounded-2xl font-black border-slate-200 text-slate-500">Save as Draft</Button>
                                    <Button onClick={() => onSubmit(formData)} className="h-14 px-12 rounded-2xl font-black flex gap-3 shadow-xl shadow-royal-blue/20">
                                        <Zap className="w-5 h-5" />
                                        Publish Product
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
};
