'use client';

import React, { useState, useEffect } from 'react';
import {
    CheckCircle2,
    EyeOff,
    Trash2,
    Edit3,
    MessageSquare,
    User,
    Package,
    Star,
    Search,
    Filter,
    Check,
    AlertCircle,
    Send
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { supabase } from '@/lib/supabase';

export default function AdminReviewsPage() {
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [editingReview, setEditingReview] = useState<any>(null);
    const [replyingReview, setReplyingReview] = useState<any>(null);
    const [adminResponse, setAdminResponse] = useState('');

    const fetchReviews = async () => {
        const { data } = await supabase
            .from('reviews')
            .select('*, profiles:user_id(full_name), products:product_id(name)')
            .order('created_at', { ascending: false });

        if (data) setReviews(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleApprove = async (id: string) => {
        const { error } = await supabase.from('reviews').update({ is_approved: true }).eq('id', id);
        if (!error) fetchReviews();
    };

    const handleHide = async (id: string) => {
        const { error } = await supabase.from('reviews').update({ is_approved: false }).eq('id', id);
        if (!error) fetchReviews();
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to permanently delete this review?')) return;
        const { error } = await supabase.from('reviews').delete().eq('id', id);
        if (!error) fetchReviews();
    };

    const handleReply = async (id: string) => {
        const { error } = await supabase.from('reviews').update({ admin_response: adminResponse }).eq('id', id);
        if (!error) {
            setReplyingReview(null);
            setAdminResponse('');
            fetchReviews();
        }
    };

    const filteredReviews = reviews.filter(r => {
        const matchesSearch = (r.profiles?.full_name || '').toLowerCase().includes(search.toLowerCase()) ||
            (r.products?.name || '').toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === 'all' ||
            (statusFilter === 'pending' && !r.is_approved) ||
            (statusFilter === 'approved' && r.is_approved);
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 italic">Review Moderation</h1>
                    <p className="text-slate-500 font-bold italic mt-1">Curate authentic customer feedback and build trust.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-12 border-slate-200">Export Feedback</Button>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <input
                        type="text"
                        placeholder="Search within reviews or customers..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-4 py-3.5 text-sm font-bold text-slate-700 focus:bg-white outline-none ring-2 ring-transparent focus:ring-royal-blue/10 transition-all"
                    />
                    <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-300" />
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="flex-1 md:w-40 bg-slate-50 border-none rounded-2xl px-6 py-3.5 text-sm font-bold text-slate-700 outline-none appearance-none"
                    >
                        <option value="all">All Reviews</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                    </select>
                    <Button variant="outline" className="h-12 w-12 p-0 rounded-2xl border-slate-100 font-black">
                        <Filter className="w-4 h-4 text-slate-400" />
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {loading ? (
                    [...Array(3)].map((_, i) => (
                        <div key={i} className="h-40 bg-white rounded-[2.5rem] animate-pulse"></div>
                    ))
                ) : filteredReviews.map((review) => (
                    <div key={review.id} className={`bg-white rounded-[2.5rem] p-8 border hover:shadow-xl transition-all duration-500 relative flex flex-col lg:flex-row gap-8 ${!review.is_approved ? 'border-amber-100 bg-amber-50/10' : 'border-slate-50'}`}>

                        {!review.is_approved && (
                            <div className="absolute top-8 right-8 animate-pulse">
                                <Badge className="bg-amber-500 text-white font-black text-[8px] uppercase tracking-widest border-none">Awaiting Approval</Badge>
                            </div>
                        )}

                        <div className="flex-1 space-y-6">
                            <div className="flex flex-col md:flex-row md:items-center gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-royal-blue text-white rounded-xl flex items-center justify-center font-black">
                                        {review.profiles?.full_name?.charAt(0) || <User className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-slate-800">{review.profiles?.full_name || 'Anonymous'}</h4>
                                        <p className="text-[10px] font-bold text-slate-400 italic">{new Date(review.created_at).toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="hidden md:block h-6 w-px bg-slate-100 mx-2"></div>
                                <div className="flex items-center gap-2">
                                    <Package className="w-3.5 h-3.5 text-slate-300" />
                                    <span className="text-xs font-black text-royal-blue hover:underline cursor-pointer">{review.products?.name}</span>
                                </div>
                                <div className="flex items-center gap-0.5 text-brand-yellow ml-auto lg:ml-0 md:pl-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-slate-100'}`} />
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h5 className="text-sm font-black text-slate-800">{review.title}</h5>
                                <p className="text-sm font-bold text-slate-500 italic leading-relaxed">{review.body}</p>
                            </div>

                            {review.admin_response && (
                                <div className="p-5 bg-slate-50 rounded-2xl border-l-4 border-royal-blue/30 relative mt-4 group/resp">
                                    <p className="text-[10px] font-black text-royal-blue uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                                        <MessageSquare className="w-3 h-3" /> Your Response
                                    </p>
                                    <p className="text-xs font-black text-slate-600 italic">&quot;{review.admin_response}&quot;</p>
                                    <button onClick={() => { setReplyingReview(review); setAdminResponse(review.admin_response) }} className="absolute right-4 top-4 opacity-0 group-hover/resp:opacity-100 transition-opacity text-slate-300 hover:text-royal-blue">
                                        <Edit3 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Action Sidebar */}
                        <div className="w-full lg:w-60 border-t lg:border-t-0 lg:border-l border-slate-50 lg:pl-8 pt-8 lg:pt-0 flex flex-col gap-3">
                            {review.is_approved ? (
                                <Button variant="outline" onClick={() => handleHide(review.id)} className="w-full h-11 rounded-xl text-xs font-black gap-2 border-slate-100 text-slate-400 hover:text-amber-600 hover:border-amber-100">
                                    <EyeOff className="w-4 h-4" /> Hide Review
                                </Button>
                            ) : (
                                <Button onClick={() => handleApprove(review.id)} className="w-full h-11 rounded-xl text-xs font-black gap-2 bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/10">
                                    <CheckCircle2 className="w-4 h-4" /> Approve
                                </Button>
                            )}

                            <Button variant="outline" onClick={() => setReplyingReview(review)} className="w-full h-11 rounded-xl text-xs font-black gap-2 border-slate-100 text-slate-400 hover:text-royal-blue hover:border-royal-blue/20">
                                <MessageSquare className="w-4 h-4" /> Reply
                            </Button>

                            <div className="flex gap-2">
                                <Button variant="outline" className="flex-1 h-11 rounded-xl text-xs font-black border-slate-100 text-slate-300 hover:text-slate-600">
                                    <Edit3 className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" onClick={() => handleDelete(review.id)} className="flex-1 h-11 rounded-xl text-xs font-black border-slate-100 text-slate-300 hover:text-rose-500 hover:border-rose-100">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Reply Modal */}
            {replyingReview && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in-95 duration-300 relative overflow-hidden">
                        <div className="absolute -right-6 -top-6 text-slate-50 opacity-10">
                            <MessageSquare className="w-32 h-32" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-800 mb-2 italic">Respond to feedback</h2>
                        <p className="text-xs font-bold text-slate-400 italic mb-8">Replying to {replyingReview.profiles?.full_name}</p>

                        <div className="space-y-6 relative z-10">
                            <textarea
                                rows={5}
                                value={adminResponse}
                                onChange={(e) => setAdminResponse(e.target.value)}
                                placeholder="Write your professional response here..."
                                className="w-full bg-slate-50 border-none rounded-2xl p-6 text-sm font-black text-slate-700 focus:bg-white outline-none ring-2 ring-transparent focus:ring-royal-blue/10 transition-all resize-none shadow-inner"
                            />

                            <div className="flex gap-4 pt-4">
                                <Button variant="outline" onClick={() => setReplyingReview(null)} className="flex-1 h-14 rounded-2xl font-black border-slate-100">Cancel</Button>
                                <Button onClick={() => handleReply(replyingReview.id)} className="flex-1 h-14 rounded-2xl font-black gap-2 shadow-xl shadow-royal-blue/20">
                                    <Send className="w-4 h-4" /> Post Reply
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
