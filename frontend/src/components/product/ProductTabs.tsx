'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReviewSection } from './ReviewSection';

interface ProductTabsProps {
    description: string;
    productId: string;
    specifications?: any;
}

export const ProductTabs: React.FC<ProductTabsProps> = ({ description, productId, specifications }) => {
    const [activeTab, setActiveTab] = useState('description');

    const tabs = [
        { id: 'description', label: 'Description' },
        { id: 'specs', label: 'Specifications' },
        { id: 'reviews', label: 'Reviews' },
        { id: 'faq', label: 'FAQ' },
    ];

    return (
        <div className="mt-20">
            <div className="flex border-b border-slate-200 gap-8 md:gap-12 overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-4 text-sm font-black uppercase tracking-widest transition-all relative whitespace-nowrap ${activeTab === tab.id ? 'text-royal-blue' : 'text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="activeTabUnderline"
                                className="absolute bottom-0 left-0 right-0 h-1 bg-royal-blue rounded-full"
                            />
                        )}
                    </button>
                ))}
            </div>

            <div className="py-10">
                <AnimatePresence mode="wait">
                    {activeTab === 'description' && (
                        <motion.div
                            key="description"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="prose prose-slate max-w-none"
                        >
                            <div
                                className="text-slate-500 leading-loose font-medium"
                                dangerouslySetInnerHTML={{ __html: description }}
                            />
                        </motion.div>
                    )}

                    {activeTab === 'specs' && (
                        <motion.div
                            key="specs"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                                <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6">Technical Details</h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between py-2 border-b border-slate-100">
                                        <span className="text-xs font-bold text-slate-400 uppercase">Product Code</span>
                                        <span className="text-xs font-black text-slate-700">YLH-4921</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-slate-100">
                                        <span className="text-xs font-bold text-slate-400 uppercase">Weight</span>
                                        <span className="text-xs font-black text-slate-700">0.5 kg</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-slate-100">
                                        <span className="text-xs font-bold text-slate-400 uppercase">Dimensions</span>
                                        <span className="text-xs font-black text-slate-700">10 x 5 x 2 cm</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'reviews' && (
                        <motion.div
                            key="reviews"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <ReviewSection productId={productId} />
                        </motion.div>
                    )}

                    {activeTab === 'faq' && (
                        <motion.div
                            key="faq"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6 max-w-3xl"
                        >
                            {[
                                { q: "How long does shipping take?", a: "Shipping usually takes 1-3 days inside Dhaka and 3-5 days outside Dhaka." },
                                { q: "Is there a warranty?", a: "Yes, all our physical products come with a 1-year official brand warranty." },
                                { q: "Can I return a digital product?", a: "Due to the nature of digital products, they are non-refundable once the license key or download link is accessed." }
                            ].map((item, i) => (
                                <div key={i} className="p-6 bg-white rounded-2xl border border-slate-100">
                                    <h5 className="text-sm font-black text-slate-800 mb-2">{item.q}</h5>
                                    <p className="text-xs font-bold text-slate-500 italic leading-relaxed">{item.a}</p>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
