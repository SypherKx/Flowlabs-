import React from 'react';

interface SkeletonProps {
    className?: string;
    isDarkMode?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', isDarkMode = true }) => {
    return (
        <div
            className={`animate-pulse rounded-md ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'} ${className}`}
        />
    );
};
