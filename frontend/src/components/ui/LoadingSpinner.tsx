import React from 'react';

export const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex h-full w-full items-center justify-center p-8">
            <div className="relative">
                <div className="h-12 w-12 rounded-full border-4 border-royal-blue/20" />
                <div className="absolute top-0 h-12 w-12 animate-spin rounded-full border-4 border-royal-blue border-t-transparent" />
            </div>
        </div>
    );
};
