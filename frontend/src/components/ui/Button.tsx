import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
        const variants = {
            primary: 'bg-royal-blue text-white hover:bg-royal-blue/90 shadow-sm',
            secondary: 'bg-brand-yellow text-slate-900 hover:bg-brand-yellow/90 shadow-sm',
            outline: 'border-2 border-royal-blue text-royal-blue hover:bg-royal-blue/5',
            danger: 'bg-red-600 text-white hover:bg-red-700 shadow-sm',
        };

        const sizes = {
            sm: 'px-3 py-1.5 text-sm rounded-md',
            md: 'px-5 py-2.5 text-base rounded-lg font-medium',
            lg: 'px-8 py-3.5 text-lg rounded-xl font-semibold',
        };

        return (
            <button
                ref={ref}
                disabled={isLoading || disabled}
                className={cn(
                    'inline-flex items-center justify-center transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed',
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {isLoading ? (
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : null}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

export { Button };
