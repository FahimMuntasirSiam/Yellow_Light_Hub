import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'info';
    className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'primary', className = '' }) => {
    const styles = {
        primary: 'bg-royal-blue/10 text-royal-blue border-royal-blue/20',
        secondary: 'bg-brand-yellow/10 text-brand-yellow border-brand-yellow/20',
        success: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        warning: 'bg-amber-100 text-amber-700 border-amber-200',
        info: 'bg-sky-100 text-sky-700 border-sky-200',
    };

    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${styles[variant]} ${className}`}>
            {children}
        </span>
    );
};
