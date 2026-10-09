import React from 'react';

/**
 * Concourse Atelier Status Badge Component
 * Features refined metallic status glows with subtle micro-dots.
 */
export const Badge = ({
  status,
  label,
  size = 'md',
  pulse = true,
  className = ''
}) => {
  const statusConfig = {
    Pending: {
      bg: 'bg-[#B8860B]/10',
      border: 'border-[#D4AF37]/30',
      text: 'text-[#E5C07B]',
      dot: 'bg-[#D4AF37]',
      defaultLabel: 'Pending Confirmation'
    },
    Confirmed: {
      bg: 'bg-[#D4AF37]/15',
      border: 'border-[#D4AF37]/50',
      text: 'text-[#F3DB94]',
      dot: 'bg-[#D4AF37]',
      defaultLabel: 'Confirmed & Bay Reserved'
    },
    'In Bay': {
      bg: 'bg-[#CBD5E1]/15',
      border: 'border-[#CBD5E1]/40',
      text: 'text-[#FFFFFF]',
      dot: 'bg-[#CBD5E1]',
      defaultLabel: 'In Bay — Treatment'
    },
    Ready: {
      bg: 'bg-[#10B981]/15',
      border: 'border-[#10B981]/40',
      text: 'text-[#34D399]',
      dot: 'bg-[#10B981]',
      defaultLabel: 'Ready for Pick-Up'
    },
    Completed: {
      bg: 'bg-[#10B981]/10',
      border: 'border-[#10B981]/30',
      text: 'text-[#10B981]',
      dot: 'bg-[#10B981]',
      defaultLabel: 'Completed'
    },
    Cancelled: {
      bg: 'bg-[#EF4444]/10',
      border: 'border-[#EF4444]/30',
      text: 'text-[#EF4444]',
      dot: 'bg-[#EF4444]',
      defaultLabel: 'Cancelled'
    }
  };

  const config = statusConfig[status] || {
    bg: 'bg-[#1C202C]',
    border: 'border-[#262B3A]',
    text: 'text-[#94A3B8]',
    dot: 'bg-[#64748B]',
    defaultLabel: status || 'Unknown'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px] gap-1.5',
    md: 'px-2.5 py-1 text-xs gap-2',
    lg: 'px-3.5 py-1.5 text-sm gap-2.5'
  };

  const dotSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5'
  };

  return (
    <span
      className={`inline-flex items-center font-bold uppercase tracking-wider rounded-full border transition-all ${config.bg} ${config.border} ${config.text} ${sizes[size] || sizes.md} ${className}`}
    >
      <span className="relative flex items-center justify-center">
        {pulse && status !== 'Completed' && status !== 'Cancelled' && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${config.dot}`}
          />
        )}
        <span
          className={`relative inline-flex rounded-full ${dotSizes[size] || dotSizes.md} ${config.dot}`}
        />
      </span>
      <span>{label || config.defaultLabel}</span>
    </span>
  );
};
