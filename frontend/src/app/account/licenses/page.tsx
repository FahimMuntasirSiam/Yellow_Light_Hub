'use client';

import React from 'react';
import { Key, Download, ExternalLink, ShieldCheck, Clock, FileCode } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function LicensesPage() {
    // Placeholder data for licenses
    const licenses = [
        {
            id: 1,
            name: 'Adobe Creative Cloud 2026',
            type: 'Software Subscription',
            key: 'XXXX-YYYY-ZZZZ-1234',
            purchaseDate: 'March 10, 2026',
            status: 'Active',
            downloadUrl: '#',
            fileType: 'EXE / PKG'
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <header className="mb-10">
                        <h1 className="text-3xl font-black text-slate-800 mb-2">My Digital Licenses</h1>
                        <p className="text-slate-500 font-medium italic">Manage your software keys and downloadable assets.</p>
                    </header>

                    <div className="space-y-6">
                        {licenses.length > 0 ? (
                            licenses.map((license) => (
                                <div key={license.id} className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                                    <div className="flex flex-col md:flex-row justify-between gap-6">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-4">
                                                <Badge variant="info" className="bg-brand-yellow text-royal-blue font-black tracking-widest">{license.status}</Badge>
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{license.type}</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-800 mb-4">{license.name}</h3>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase block mb-2 flex items-center gap-1">
                                                        <Key className="w-3 h-3 text-brand-yellow" />
                                                        License Key
                                                    </span>
                                                    <code className="text-sm font-black text-royal-blue tracking-wider select-all">{license.key}</code>
                                                </div>
                                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase block mb-2 flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        Purchase Date
                                                    </span>
                                                    <span className="text-sm font-bold text-slate-700">{license.purchaseDate}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="md:w-56 flex flex-col gap-3">
                                            <Button className="w-full flex items-center justify-center gap-2">
                                                <Download className="w-4 h-4" />
                                                Download File
                                            </Button>
                                            <Button variant="outline" className="w-full border-slate-200 text-slate-600 hover:text-royal-blue flex items-center justify-center gap-2">
                                                <ExternalLink className="w-4 h-4" />
                                                View Receipt
                                            </Button>
                                            <div className="flex items-center justify-center gap-2 mt-2 text-[10px] font-bold text-emerald-600">
                                                <ShieldCheck className="w-3.5 h-3.5" />
                                                Verified Purchase
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white p-20 rounded-3xl border border-dashed border-slate-200 text-center">
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FileCode className="w-10 h-10 text-slate-200" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-2">No Licenses Found</h3>
                                <p className="text-slate-500 font-medium">Any software or templates you purchase will appear here.</p>
                                <Button className="mt-8">Go to Digital Store</Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
