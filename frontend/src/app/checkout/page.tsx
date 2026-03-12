'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Truck, ShieldCheck, CreditCard, ChevronRight, CheckCircle2, MapPin, Phone, User, Mail, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const BANGLADESH_DISTRICTS = [
    'Dhaka', 'Chittagong', 'Gazipur', 'Narayanganj', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh',
    'Comilla', 'Brahmanbaria', 'Noakhali', 'Feni', 'Chandpur', 'Lakshmipur', 'Cox\'s Bazar', 'Bandarban', 'Rangamati',
    'Khagrachari', 'Bagerhat', 'Satkhira', 'Jessore', 'Magura', 'Narail', 'Kushtia', 'Meherpur', 'Chuadanga', 'Jhenaidah'
];

import { API_BASE_URL } from '@/config/api';
 
 export default function CheckoutPage() {
    const router = useRouter();
    const { items, getTotalPrice, clearCart } = useCartStore();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        address: '',
        district: 'Dhaka',
        notes: '',
        paymentMethod: 'cod'
    });

    const subtotal = getTotalPrice();
    const deliveryFee = subtotal > 2000 ? 0 : (formData.district === 'Dhaka' ? 60 : 120);
    const total = subtotal + deliveryFee;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (items.length === 0) return;

        setLoading(true);
        try {
            const orderData = {
                ...formData,
                items,
                subtotal,
                shipping_cost: deliveryFee,
                total,
                payment_method: formData.paymentMethod,
                shipping_address: {
                    address: formData.address,
                    district: formData.district
                }
            };

            const res = await fetch(`${API_BASE_URL}/api/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            if (res.ok) {
                const result = await res.json();
                clearCart();
                router.push(`/order-confirmation/${result.orderId}`);
            } else {
                alert('Failed to place order. Please try again.');
            }
        } catch (err) {
            console.error('Checkout error:', err);
            alert('An error occurred. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="w-10 h-10 text-slate-200" />
                </div>
                <h2 className="text-2xl font-black text-slate-800 mb-2">Your cart is empty</h2>
                <p className="text-slate-500 mb-8 max-w-sm">Add some amazing products to your cart before checking out.</p>
                <Button onClick={() => router.push('/products/physical')}>Start Shopping</Button>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest py-8">
                    <span>Cart</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span className="text-royal-blue">Checkout</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span>Confirmation</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Form */}
                    <div className="lg:col-span-7 space-y-6">
                        <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                            {/* Customer Info Section */}
                            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                                <h2 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-royal-blue/5 rounded-2xl flex items-center justify-center">
                                        <User className="w-5 h-5 text-royal-blue" />
                                    </div>
                                    Customer Information
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                        <div className="relative">
                                            <input
                                                required
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                placeholder="e.g. Tanvir Ahmed"
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-slate-700 focus:bg-white focus:ring-2 focus:ring-royal-blue/20 outline-none transition-all"
                                            />
                                            <User className="absolute left-4 top-4.5 w-5 h-5 text-slate-300" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                                        <div className="relative">
                                            <input
                                                required
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="e.g. 017XXXXXXXX"
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-slate-700 focus:bg-white focus:ring-2 focus:ring-royal-blue/20 outline-none transition-all"
                                            />
                                            <Phone className="absolute left-4 top-4.5 w-5 h-5 text-slate-300" />
                                        </div>
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                                        <div className="relative">
                                            <input
                                                required
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="e.g. tanvir@example.com"
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-slate-700 focus:bg-white focus:ring-2 focus:ring-royal-blue/20 outline-none transition-all"
                                            />
                                            <Mail className="absolute left-4 top-4.5 w-5 h-5 text-slate-300" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Section */}
                            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                                <h2 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-emerald-50 rounded-2xl flex items-center justify-center">
                                        <Truck className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    Delivery Details
                                </h2>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">District</label>
                                        <div className="relative">
                                            <select
                                                name="district"
                                                value={formData.district}
                                                onChange={handleInputChange}
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-10 py-4 text-sm font-bold text-slate-700 focus:bg-white appearance-none outline-none transition-all"
                                            >
                                                {BANGLADESH_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                                            </select>
                                            <MapPin className="absolute left-4 top-4.5 w-5 h-5 text-slate-300" />
                                            <ChevronRight className="absolute right-4 top-4.5 w-5 h-5 text-slate-300 rotate-90" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Detailed Address</label>
                                        <textarea
                                            required
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            rows={3}
                                            placeholder="Flat, Road, Area, Landmark..."
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold text-slate-700 focus:bg-white focus:ring-2 focus:ring-royal-blue/20 outline-none transition-all resize-none"
                                        ></textarea>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Order Notes (Optional)</label>
                                        <textarea
                                            name="notes"
                                            value={formData.notes}
                                            onChange={handleInputChange}
                                            placeholder="Special instructions for delivery..."
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold text-slate-700 focus:bg-white outline-none transition-all resize-none"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Section */}
                            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                                <h2 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-brand-yellow/10 rounded-2xl flex items-center justify-center">
                                        <CreditCard className="w-5 h-5 text-brand-yellow" />
                                    </div>
                                    Payment Method
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        { id: 'cod', label: 'Cash on Delivery', description: 'Pay when items arrive', icon: <Truck className="w-5 h-5" /> },
                                        { id: 'bkash', label: 'bKash / Nagad', description: 'Instant payment mobile', icon: <Sparkles className="w-5 h-5" /> },
                                        { id: 'bank', label: 'Bank Transfer', description: 'Direct deposit to bank', icon: <CheckCircle2 className="w-5 h-5" /> }
                                    ].map((method) => (
                                        <label
                                            key={method.id}
                                            className={`relative flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${formData.paymentMethod === method.id
                                                    ? 'border-royal-blue bg-royal-blue/5'
                                                    : 'border-slate-100 hover:border-slate-200'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value={method.id}
                                                checked={formData.paymentMethod === method.id}
                                                onChange={handleInputChange}
                                                className="hidden"
                                            />
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${formData.paymentMethod === method.id ? 'bg-royal-blue text-white' : 'bg-slate-50 text-slate-400'}`}>
                                                {method.icon}
                                            </div>
                                            <div>
                                                <div className="text-sm font-black text-slate-800">{method.label}</div>
                                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{method.description}</div>
                                            </div>
                                            {formData.paymentMethod === method.id && (
                                                <div className="absolute top-4 right-4 text-royal-blue">
                                                    <CheckCircle2 className="w-5 h-5" />
                                                </div>
                                            )}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-5 h-fit lg:sticky lg:top-24">
                        <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col h-full">
                            <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                                Order Summary
                                <span className="bg-brand-yellow/20 text-royal-blue text-[10px] font-bold px-2 py-0.5 rounded-full">{items.length} Items</span>
                            </h3>

                            <div className="flex-1 space-y-4 max-h-[300px] overflow-y-auto mb-6 pr-2 scrollbar-thin">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4 items-center">
                                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 shrink-0">
                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-bold text-slate-800 truncate">{item.name}</h4>
                                            <p className="text-xs font-bold text-slate-400 mt-0.5">Qty: {item.quantity} × ৳{item.price.toLocaleString()}</p>
                                        </div>
                                        <div className="text-sm font-black text-slate-800">৳{(item.price * item.quantity).toLocaleString()}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Coupon Code */}
                            <div className="flex gap-2 mb-8">
                                <input
                                    type="text"
                                    placeholder="Coupon Code"
                                    className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold text-slate-600 outline-none focus:bg-white transition-all"
                                />
                                <Button variant="outline" size="sm" className="px-6 rounded-xl border-slate-200">Apply</Button>
                            </div>

                            {/* Totals */}
                            <div className="space-y-3 border-t border-slate-50 pt-6 mb-8">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Subtotal</span>
                                    <span className="font-bold text-slate-800">৳{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Delivery Fee ({formData.district})</span>
                                    <span className={`font-bold ${deliveryFee === 0 ? 'text-emerald-500' : 'text-slate-800'}`}>
                                        {deliveryFee === 0 ? 'FREE' : `৳${deliveryFee.toLocaleString()}`}
                                    </span>
                                </div>
                                {deliveryFee === 0 && (
                                    <div className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-3 py-1.5 rounded-lg flex items-center gap-2">
                                        <Sparkles className="w-3.5 h-3.5" />
                                        FREE Delivery applied for orders over ৳2,000!
                                    </div>
                                )}
                                <div className="flex justify-between items-center pt-3 mt-3 border-t-2 border-slate-100">
                                    <span className="text-lg font-black text-slate-800">Total Amount</span>
                                    <span className="text-2xl font-black text-royal-blue">৳{total.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Button
                                    type="submit"
                                    form="checkout-form"
                                    className="w-full h-16 text-lg font-black rounded-2xl shadow-xl shadow-brand-yellow/20"
                                    disabled={loading}
                                >
                                    {loading ? 'Processing...' : `Place Order (৳${total.toLocaleString()})`}
                                </Button>

                                <div className="flex items-center justify-center gap-4 py-2 opacity-50 grayscale hover:grayscale-0 transition-all">
                                    <div className="relative w-10 h-6">
                                        <Image src="/bkash-logo.png" alt="bKash" fill className="object-contain" />
                                    </div>
                                    <div className="relative w-10 h-6">
                                        <Image src="/nagad-logo.png" alt="Nagad" fill className="object-contain" />
                                    </div>
                                    <div className="relative w-10 h-6">
                                        <Image src="/mastercard-logo.png" alt="Mastercard" fill className="object-contain" />
                                    </div>
                                </div>

                                <p className="text-[10px] text-center text-slate-400 font-bold italic flex items-center justify-center gap-2">
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                                    Your payment information is encrypted and secure.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
