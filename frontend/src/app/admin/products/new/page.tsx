'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { ProductForm } from '@/components/admin/product-form/ProductForm';
import { API_BASE_URL } from '@/config/api';

export default function NewProductPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (data: any) => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/admin/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                router.push('/admin/products');
                router.refresh();
            } else {
                alert('Failed to create product. Please check console.');
            }
        } catch (err) {
            console.error(err);
            alert('Network error.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-10">
            <div className="flex items-center gap-6">
                <Link href="/admin/products">
                    <button className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-royal-blue shadow-sm hover:shadow-lg transition-all">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                </Link>
                <div>
                    <h1 className="text-3xl font-black text-slate-800">Create New Offering</h1>
                    <p className="text-slate-500 font-bold italic mt-1">Expanding your digital and physical catalog.</p>
                </div>
            </div>

            <ProductForm onSubmit={handleSubmit} isLoading={loading} />
        </div>
    );
}
