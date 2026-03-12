'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    React.useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-[70vh] flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-8 bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
                    <AlertTriangle className="w-10 h-10" />
                </div>

                <div className="space-y-3">
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">Something Went Wrong</h1>
                    <p className="text-slate-500 font-medium leading-relaxed">
                        We encountered an unexpected error while loading this page. Our technical team has been notified.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <Button
                        onClick={() => reset()}
                        className="h-14 rounded-2xl font-bold flex items-center justify-center gap-2 group"
                    >
                        <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                        Try Again
                    </Button>
                    <Link href="/" className="inline-flex items-center justify-center h-14 rounded-2xl font-bold bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors gap-2">
                        <Home className="w-5 h-5" />
                        Go Home
                    </Link>
                </div>

                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    Error ID: {error.digest || 'UNKNOWN_ERROR'}
                </p>
            </div>
        </div>
    );
}
