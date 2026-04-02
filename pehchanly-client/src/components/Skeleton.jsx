import React from 'react';

const Skeleton = ({ className }) => {
    return (
        <div className={`animate-pulse bg-white/5 rounded-2xl ${className}`} />
    );
};

export const ServiceSkeleton = () => (
    <div className="glass-card rounded-[3rem] p-12 border-white/5 space-y-8 h-full">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-24 w-full" />
        <div className="flex gap-3">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <div className="flex justify-between items-center pt-6">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-12 w-32 rounded-2xl" />
        </div>
    </div>
);

export const TableRowSkeleton = () => (
    <tr className="animate-pulse">
        <td className="px-12 py-12">
            <Skeleton className="h-8 w-48 mb-3" />
            <Skeleton className="h-4 w-24" />
        </td>
        <td className="px-12 py-12">
            <Skeleton className="h-8 w-24 mx-auto rounded-full" />
        </td>
        <td className="px-12 py-12">
            <Skeleton className="h-10 w-20" />
        </td>
        <td className="px-12 py-12">
            <div className="flex justify-end gap-6">
                <Skeleton className="h-12 w-12 rounded-[1.5rem]" />
                <Skeleton className="h-12 w-12 rounded-[1.5rem]" />
            </div>
        </td>
    </tr>
);

export default Skeleton;
