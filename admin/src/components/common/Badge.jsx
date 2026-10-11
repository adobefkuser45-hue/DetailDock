import React from 'react';

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
      border: 'border-[#F59E0B]/30',
      text: 'text-[#F59E0B]',
      dot: 'bg-[#F59E0B]',
      defaultLabel: 'Pending Confirmation'
    },
    Confirmed: {
      bg: 'bg-[#0284C7]/15',
      border: 'border-[#0284C7]/40',
      text: 'text-[#38BDF8]',
      dot: 'bg-[#38BDF8]',
      defaultLabel: 'Confirmed & Bay Reserved'
    },
    'In Bay': {
      bg: 'bg-[#8B5CF6]/15',
      border: 'border-[#8B5CF6]/40',
      text: 'text-[#A78BFA]',
      dot: 'bg-[#A78BFA]',
      defaultLabel: 'In Bay — Cleanroom Staging'
    },
    Ready: {
      bg: 'bg-[#10B981]/15',
      border: 'border-[#10B981]/40',
      text: 'text-[#34D399]',
      dot: 'bg-[#10B981]',
      defaultLabel: 'Showroom Ready'
    },
    Completed: {
      bg: 'bg-[#10B981]/10',
      border: 'border-[#10B981]/30',
      text: 'text-[#10B981]',
      dot: 'bg-[#10B981]',
      defaultLabel: 'Completed & Released'
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
