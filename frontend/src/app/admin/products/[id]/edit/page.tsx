'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { ProductForm } from '@/components/admin/product-form/ProductForm';
import { API_BASE_URL } from '@/config/api';

export default function EditProductPage() {
    const router = useRouter();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/products/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setProduct(data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchProduct();
    }, [id]);

    const handleSubmit = async (data: any) => {
        setSaving(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/admin/products/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                router.push('/admin/products');
                router.refresh();
            } else {
                alert('Update failed.');
            }
        } catch (err) {
            console.error(err);
            alert('Network error.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-royal-blue border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="space-y-10">
            <div className="flex items-center gap-6">
                <Link href="/admin/products">
                    <button className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-royal-blue shadow-sm hover:shadow-lg transition-all">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                </Link>
                <div>
                    <h1 className="text-3xl font-black text-slate-800">Refining: <span className="text-royal-blue">{product?.name}</span></h1>
                    <p className="text-slate-500 font-bold italic mt-1">Updates will sync across the entire hub globally.</p>
                </div>
            </div>

            <ProductForm initialData={product} onSubmit={handleSubmit} isLoading={saving} />
        </div>
    );
}
