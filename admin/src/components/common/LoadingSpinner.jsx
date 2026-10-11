import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-3">
      <Loader2 className={`${sizes[size] || sizes.md} animate-spin text-[#F59E0B]`} />
      {text && <p className="text-xs font-mono text-[#94A3B8] tracking-wider uppercase">{text}</p>}
    </div>
  );
};
