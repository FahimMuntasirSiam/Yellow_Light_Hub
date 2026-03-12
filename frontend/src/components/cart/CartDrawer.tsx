'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { Button } from '../ui/Button';

export const CartDrawer = () => {
    const { items, isOpen, setIsOpen, updateQuantity, removeItem, getTotalPrice } = useCartStore();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 z-[70] h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="w-6 h-6 text-royal-blue" />
                                <h2 className="text-xl font-bold text-slate-800">Your Cart</h2>
                                <span className="bg-brand-yellow/20 text-royal-blue text-xs font-bold px-2 py-0.5 rounded-full">
                                    {items.length} Items
                                </span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-slate-500" />
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center">
                                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                        <ShoppingBag className="w-10 h-10 text-slate-300" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-700">Empty Cart</h3>
                                    <p className="text-slate-400 text-sm mt-1 mb-6">Looks like you haven't added anything yet.</p>
                                    <Button onClick={() => setIsOpen(false)}>Start Shopping</Button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.id} className="flex gap-4 group">
                                        <div className="relative w-24 h-24 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 shrink-0">
                                            <Image
                                                src={item.image || '/placeholder-product.jpg'}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <h4 className="font-semibold text-slate-800 text-sm line-clamp-1">{item.name}</h4>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-slate-300 hover:text-red-500 transition-colors ml-2"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-wider italic">Physical Product</p>
                                            </div>

                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1 px-2 hover:bg-slate-50 text-slate-500"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="px-3 text-sm font-bold text-slate-700 min-w-8 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1 px-2 hover:bg-slate-50 text-slate-500"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                                <span className="font-bold text-royal-blue">৳{(item.price * item.quantity).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-slate-100 bg-slate-50/50 space-y-4">
                                <div className="flex justify-between items-center text-slate-600">
                                    <span className="text-sm font-medium">Subtotal</span>
                                    <span className="text-lg font-bold text-slate-800">৳{getTotalPrice().toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-slate-400 text-xs">
                                    <span>Shipping & Taxes</span>
                                    <span>Calculated at checkout</span>
                                </div>
                                <Button className="w-full h-14 text-lg">
                                    Proceed to Checkout
                                </Button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-full text-center text-sm font-medium text-slate-500 hover:text-royal-blue transition-colors"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
