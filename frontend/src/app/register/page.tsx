'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Phone, Lightbulb, ArrowRight, Loader2, AlertCircle, ShieldCheck, CheckSquare, Square } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [agreed, setAgreed] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!agreed) {
            setError('You must agree to the Terms & Conditions');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const { data, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        full_name: formData.fullName,
                        phone: formData.phone,
                    }
                }
            });

            if (authError) throw authError;

            alert('Registration successful! Please check your email for confirmation.');
            router.push('/login');
        } catch (err: any) {
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 mt-8">
            <div className="max-w-xl w-full">
                {/* Logo Section */}
                <div className="text-center mb-10">
                    <Link href="/" className="inline-flex items-center gap-2 mb-4">
                        <div className="bg-brand-yellow p-2 rounded-xl">
                            <Lightbulb className="w-8 h-8 text-royal-blue" />
                        </div>
                        <span className="text-2xl font-black text-royal-blue">YellowLight Hub</span>
                    </Link>
                    <h1 className="text-3xl font-black text-slate-800">Create Account</h1>
                    <p className="text-slate-500 font-bold italic mt-2">Join Bangladesh's trusted tech community.</p>
                </div>

                {/* Register Form */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
                    {error && (
                        <div className="mb-8 bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-center gap-3 text-rose-600">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            <p className="text-xs font-bold">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 md:col-span-2">
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
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                            <div className="relative">
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="tanvir@example.com"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-slate-700 focus:bg-white focus:ring-2 focus:ring-royal-blue/20 outline-none transition-all"
                                />
                                <Mail className="absolute left-4 top-4.5 w-5 h-5 text-slate-300" />
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
                                    placeholder="017XXXXXXXX"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-slate-700 focus:bg-white focus:ring-2 focus:ring-royal-blue/20 outline-none transition-all"
                                />
                                <Phone className="absolute left-4 top-4.5 w-5 h-5 text-slate-300" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                            <div className="relative">
                                <input
                                    required
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Min 8 characters"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-slate-700 focus:bg-white focus:ring-2 focus:ring-royal-blue/20 outline-none transition-all"
                                />
                                <Lock className="absolute left-4 top-4.5 w-5 h-5 text-slate-300" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Confirm Password</label>
                            <div className="relative">
                                <input
                                    required
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    placeholder="Re-type password"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-slate-700 focus:bg-white focus:ring-2 focus:ring-royal-blue/20 outline-none transition-all"
                                />
                                <Lock className="absolute left-4 top-4.5 w-5 h-5 text-slate-300" />
                            </div>
                        </div>

                        <div className="md:col-span-2 pt-4">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div
                                    onClick={() => setAgreed(!agreed)}
                                    className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${agreed ? 'bg-royal-blue text-white' : 'bg-slate-50 border border-slate-100 group-hover:border-slate-300'}`}
                                >
                                    {agreed ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-slate-200" />}
                                </div>
                                <span className="text-xs font-bold text-slate-500 italic">
                                    I agree to the <Link href="/terms" className="text-royal-blue underline">Terms & Conditions</Link> and <Link href="/privacy" className="text-royal-blue underline">Privacy Policy</Link>
                                </span>
                            </label>
                        </div>

                        <Button
                            type="submit"
                            className="md:col-span-2 h-16 rounded-2xl text-lg font-black shadow-xl shadow-royal-blue/10 flex items-center justify-center gap-2 mt-4"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                                <>
                                    Create Account
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-slate-50 text-center">
                        <p className="text-sm font-bold text-slate-400">
                            Already have an account?
                            <Link href="/login" className="text-royal-blue ml-2 hover:underline">Log In</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
