'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Lightbulb, ArrowRight, Loader2, AlertCircle, ShieldCheck } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { data, error: authError } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });

            if (authError) throw authError;

            router.push('/');
            router.refresh();
        } catch (err: any) {
            setError(err.message || 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full">
                {/* Logo Section */}
                <div className="text-center mb-10">
                    <Link href="/" className="inline-flex items-center gap-2 mb-4">
                        <div className="bg-brand-yellow p-2 rounded-xl">
                            <Lightbulb className="w-8 h-8 text-royal-blue" />
                        </div>
                        <span className="text-2xl font-black text-royal-blue">YellowLight Hub</span>
                    </Link>
                    <h1 className="text-3xl font-black text-slate-800">Welcome Back</h1>
                    <p className="text-slate-500 font-bold italic mt-2">Log in to manage your orders & licenses.</p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
                    {error && (
                        <div className="mb-6 bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-center gap-3 text-rose-600">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            <p className="text-xs font-bold">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
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
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                                <Link href="/forgot-password" virtual-link className="text-[10px] font-black text-royal-blue hover:underline">Forgot Password?</Link>
                            </div>
                            <div className="relative">
                                <input
                                    required
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="••••••••"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-slate-700 focus:bg-white focus:ring-2 focus:ring-royal-blue/20 outline-none transition-all"
                                />
                                <Lock className="absolute left-4 top-4.5 w-5 h-5 text-slate-300" />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-14 rounded-2xl text-lg font-black shadow-xl shadow-royal-blue/10 flex items-center justify-center gap-2"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                                <>
                                    Log In
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-slate-50 text-center">
                        <p className="text-sm font-bold text-slate-400">
                            Don't have an account?
                            <Link href="/register" className="text-royal-blue ml-2 hover:underline">Register Now</Link>
                        </p>
                    </div>
                </div>

                <p className="mt-8 text-center text-[10px] font-bold text-slate-400 flex items-center justify-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    Secure payment & data encryption by Supabase
                </p>
            </div>
        </div>
    );
}
