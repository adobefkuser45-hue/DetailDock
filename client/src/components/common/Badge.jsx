import React from 'react';

/**
 * Status Badge Component with pulsating color dots
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
      bg: 'bg-[#F59E0B]/10',
      border: 'border-[#F59E0B]/30',
      text: 'text-[#F59E0B]',
      dot: 'bg-[#F59E0B]',
      defaultLabel: 'Pending Confirmation'
    },
    Confirmed: {
      bg: 'bg-[#0284C7]/15',
      border: 'border-[#38BDF8]/40',
      text: 'text-[#38BDF8]',
      dot: 'bg-[#38BDF8]',
      defaultLabel: 'Confirmed & Bay Reserved'
    },
    'In Bay': {
      bg: 'bg-[#8B5CF6]/15',
      border: 'border-[#A78BFA]/40',
      text: 'text-[#A78BFA]',
      dot: 'bg-[#A78BFA]',
      defaultLabel: 'In Bay — Detailing'
    },
    Ready: {
      bg: 'bg-[#10B981]/15',
      border: 'border-[#34D399]/40',
      text: 'text-[#34D399]',
      dot: 'bg-[#34D399]',
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
    bg: 'bg-[#1F273B]',
    border: 'border-[#2A364E]',
    text: 'text-[#94A3B8]',
    dot: 'bg-[#94A3B8]',
    defaultLabel: status || 'Unknown'
  };

  const displayLabel = label || config.defaultLabel;

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-2',
    lg: 'text-sm px-3.5 py-1.5 gap-2.5 font-bold'
  };

  return (
    <span
      className={`inline-flex items-center font-bold uppercase tracking-wider rounded-full border ${config.bg} ${config.border} ${config.text} ${sizeClasses[size] || sizeClasses.md} ${className}`}
    >
      <span className="relative flex h-2 w-2">
        {pulse && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${config.dot}`}
          />
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${config.dot}`} />
      </span>
      <span>{displayLabel}</span>
    </span>
  );
};
