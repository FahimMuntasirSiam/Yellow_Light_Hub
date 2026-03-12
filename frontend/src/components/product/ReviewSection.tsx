'use client';

import React, { useState, useEffect } from 'react';
import { Star, CheckCircle2, MessageSquare, AlertCircle, Loader2, Send, User } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { supabase } from '@/lib/supabase';

interface Review {
    id: string;
    rating: number;
    title: string;
    body: string;
    created_at: string;
    is_verified: boolean;
    is_edited: boolean;
    admin_response: string | null;
    profiles: {
        full_name: string;
    };
}

interface ReviewSectionProps {
    productId: string;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({ productId }) => {
    const { user, profile } = useAuthStore();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [hasPurchased, setHasPurchased] = useState(false);
    const [showForm, setShowForm] = useState(false);

    // Form State
    const [newReview, setNewReview] = useState({
        rating: 5,
        title: '',
        body: ''
    });

    useEffect(() => {
        fetchReviews();
        checkPurchaseStatus();
    }, [productId, user]);

    const fetchReviews = async () => {
        const { data, error } = await supabase
            .from('reviews')
            .select('*, profiles:user_id(full_name)')
            .eq('product_id', productId)
            .eq('is_approved', true)
            .order('created_at', { ascending: false });

        if (data) setReviews(data);
        setLoading(false);
    };

    const checkPurchaseStatus = async () => {
        if (!user) return;

        // Check if user has an order with this product
        const { data, error } = await supabase
            .from('order_items')
            .select('id, orders!inner(user_id, status)')
            .eq('product_id', productId)
            .eq('orders.user_id', user.id)
            .eq('orders.status', 'delivered') // Only after delivery
            .limit(1);

        if (data && data.length > 0) {
            setHasPurchased(true);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setSubmitting(true);

        try {
            const { error } = await supabase
                .from('reviews')
                .insert([{
                    product_id: productId,
                    user_id: user.id,
                    rating: newReview.rating,
                    title: newReview.title,
                    body: newReview.body,
                    is_verified: hasPurchased,
                    is_approved: false // Moderation required
                }]);

            if (!error) {
                alert('Thank you! Your review has been submitted for moderation.');
                setShowForm(false);
                setNewReview({ rating: 5, title: '', body: '' });
            }
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    const averageRating = reviews.length > 0
        ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
        : '0.0';

    const starCount = (star: number) => reviews.filter(r => r.rating === star).length;
    const starPercentage = (star: number) => reviews.length > 0 ? (starCount(star) / reviews.length) * 100 : 0;

    return (
        <div className="space-y-12 py-10">
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Rating Summary */}
                <div className="lg:w-80 shrink-0 space-y-8">
                    <div className="bg-slate-50 rounded-[2.5rem] p-8 text-center border border-slate-100">
                        <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">Aggregate Rating</h4>
                        <div className="text-6xl font-black text-royal-blue mb-2">{averageRating}</div>
                        <div className="flex justify-center gap-1 mb-4 text-brand-yellow">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-5 h-5 ${i < Math.round(Number(averageRating)) ? 'fill-current' : 'text-slate-200'}`} />
                            ))}
                        </div>
                        <p className="text-xs font-bold text-slate-500 italic">Based on {reviews.length} authentic reviews</p>
                    </div>

                    <div className="space-y-3">
                        {[5, 4, 3, 2, 1].map(star => (
                            <div key={star} className="flex items-center gap-4 group">
                                <div className="flex items-center gap-1 w-8 text-[10px] font-black text-slate-400">
                                    {star} <Star className="w-2.5 h-2.5 fill-slate-300 text-slate-300" />
                                </div>
                                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-brand-yellow rounded-full transition-all duration-1000"
                                        style={{ width: `${starPercentage(star)}%` }}
                                    ></div>
                                </div>
                                <div className="w-10 text-[10px] font-black text-slate-400 text-right">{Math.round(starPercentage(star))}%</div>
                            </div>
                        ))}
                    </div>

                    {user && hasPurchased && !showForm && (
                        <Button onClick={() => setShowForm(true)} className="w-full h-14 rounded-2xl shadow-xl shadow-royal-blue/10">
                            Write a Review
                        </Button>
                    )}

                    {!user && (
                        <div className="bg-royal-blue/5 p-6 rounded-[2rem] border border-royal-blue/10 text-center">
                            <p className="text-[10px] font-black text-royal-blue uppercase tracking-widest mb-4">Sharing is caring</p>
                            <p className="text-xs font-bold text-slate-500 italic mb-6">Log in to share your experience with other shoppers.</p>
                            <Link href="/login" className="text-xs font-black text-royal-blue underline">Log In Now</Link>
                        </div>
                    )}
                </div>

                {/* Reviews List */}
                <div className="flex-1 space-y-8">
                    {showForm && (
                        <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] p-8 border-2 border-royal-blue/20 shadow-xl shadow-royal-blue/5 animate-in slide-in-from-top-4 duration-500 space-y-6 mb-12">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-black text-slate-800 italic">Your Experience</h3>
                                <button type="button" onClick={() => setShowForm(false)} className="text-xs font-bold text-slate-400 hover:text-rose-500 transition-colors">Cancel</button>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl w-fit">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Your Rating</span>
                                    <div className="flex gap-1 text-brand-yellow cursor-pointer">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <button key={star} type="button" onClick={() => setNewReview({ ...newReview, rating: star })}>
                                                <Star className={`w-6 h-6 ${star <= newReview.rating ? 'fill-current' : 'text-slate-200'}`} />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <input
                                        required
                                        placeholder="Review Title (e.g. Best performance for the price!)"
                                        value={newReview.title}
                                        onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-black text-slate-700 focus:bg-white outline-none ring-2 ring-transparent focus:ring-royal-blue/5 transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <textarea
                                        required
                                        rows={4}
                                        placeholder="Tell others about the quality, delivery, and your overal feel..."
                                        value={newReview.body}
                                        onChange={(e) => setNewReview({ ...newReview, body: e.target.value })}
                                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-5 text-sm font-bold text-slate-700 focus:bg-white outline-none ring-2 ring-transparent focus:ring-royal-blue/5 transition-all resize-none"
                                    />
                                </div>
                            </div>

                            <Button type="submit" disabled={submitting} className="w-full h-14 rounded-2xl font-black gap-2">
                                {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /> Submit for Moderation</>}
                            </Button>
                        </form>
                    )}

                    <div className="space-y-10">
                        {loading ? (
                            [...Array(3)].map((_, i) => (
                                <div key={i} className="h-40 bg-slate-50 rounded-[2rem] animate-pulse"></div>
                            ))
                        ) : reviews.length === 0 ? (
                            <div className="text-center py-20 bg-slate-50/50 rounded-[3rem] border-4 border-dashed border-slate-100">
                                <MessageSquare className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                                <h4 className="text-xl font-black text-slate-400 italic">No reviews yet. Be the first!</h4>
                            </div>
                        ) : reviews.map((review) => (
                            <div key={review.id} className="group relative">
                                <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-royal-blue/5 text-royal-blue rounded-xl flex items-center justify-center font-black">
                                                {review.profiles?.full_name?.charAt(0) || <User className="w-5 h-5" />}
                                            </div>
                                            <div>
                                                <h5 className="text-sm font-black text-slate-800">{review.profiles?.full_name || 'Anonymous'}</h5>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[10px] font-bold text-slate-300 italic">{new Date(review.created_at).toLocaleDateString()}</span>
                                                    {review.is_verified && (
                                                        <span className="flex items-center gap-1 text-[9px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-full">
                                                            <CheckCircle2 className="w-2.5 h-2.5" /> Verified Purchase
                                                        </span>
                                                    )}
                                                    {review.is_edited && (
                                                        <span className="text-[9px] font-bold text-slate-300 uppercase italic">Admin Edited</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-0.5 text-brand-yellow">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-current' : 'text-slate-100'}`} />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="text-sm font-black text-slate-800">{review.title}</h4>
                                        <p className="text-sm font-bold text-slate-500 leading-relaxed italic">{review.body}</p>
                                    </div>

                                    {review.admin_response && (
                                        <div className="mt-8 pt-8 border-t border-slate-50 relative">
                                            <div className="absolute -top-3 left-8 bg-royal-blue text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 ring-4 ring-white">
                                                <MessageSquare className="w-2.5 h-2.5" /> Admin Reply
                                            </div>
                                            <p className="text-xs font-black text-slate-700 leading-relaxed pl-4 border-l-4 border-royal-blue/20">{review.admin_response}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
