import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="aspect-[3/4] bg-neutral-200 dark:bg-neutral-800 rounded-lg mb-4" />
      <div className="space-y-2">
        <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4" />
        <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2" />
        <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/4" />
      </div>
    </div>
  );
};

export default LoadingSkeleton;
