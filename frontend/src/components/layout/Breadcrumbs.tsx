'use client';

import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.label,
            item: item.href ? `https://yellowlighthub.com${item.href}` : undefined,
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <nav className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 py-4 overflow-x-auto scrollbar-hide">
                <Link href="/" className="hover:text-royal-blue transition-colors flex-shrink-0">Home</Link>
                {items.map((item, index) => (
                    <React.Fragment key={index}>
                        <span className="text-slate-200">/</span>
                        {item.href ? (
                            <Link href={item.href} className="hover:text-royal-blue transition-colors flex-shrink-0">
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-slate-600 flex-shrink-0">{item.label}</span>
                        )}
                    </React.Fragment>
                ))}
            </nav>
        </>
    );
};
