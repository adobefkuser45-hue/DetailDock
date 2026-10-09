import React from 'react';

/**
 * Luxury Radial Pulse Loading Spinner
 */
export const LoadingSpinner = ({
  size = 'md',
  message = 'Loading studio data...',
  className = ''
}) => {
  const sizeMap = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-2',
    lg: 'w-16 h-16 border-3'
  };

  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
      <div className="relative">
        <div
          className={`${sizeMap[size] || sizeMap.md} rounded-full border-[#1D2536] border-t-[#38BDF8] animate-spin`}
        />
        <div className="absolute inset-0 rounded-full blur-sm bg-[#38BDF8]/20 animate-pulse pointer-events-none" />
      </div>
      {message && (
        <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#94A3B8] animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};
