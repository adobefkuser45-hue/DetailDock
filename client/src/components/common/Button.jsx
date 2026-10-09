import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Precision Automotive Button Component
 * Features tactile spring-like hover states, glow accents, and loading spinners.
 */
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon,
  iconLeft,
  iconRight: IconRight,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const Icon = icon || iconLeft;
  const baseStyles = 'inline-flex items-center justify-center font-bold tracking-tight rounded-xl transition-all duration-200 select-none focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98]';

  const variants = {
    primary: 'bg-[#0284C7] hover:bg-[#38BDF8] text-[#F8FAFC] hover:text-[#090C12] shadow-lg shadow-[#0284C7]/20 border border-[#38BDF8]/40 hover:border-[#38BDF8]',
    secondary: 'bg-[#161D2E] hover:bg-[#1F273B] text-[#F8FAFC] border border-[#2A364E] hover:border-[#38BDF8]/50 shadow-sm',
    gold: 'bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] hover:from-[#FDE047] hover:to-[#D4AF37] text-[#090C12] font-extrabold shadow-lg shadow-[#F59E0B]/20 border border-[#FDE047]/40',
    outline: 'bg-transparent hover:bg-[#161D2E] text-[#F8FAFC] border border-[#2A364E] hover:border-[#38BDF8]',
    ghost: 'bg-transparent hover:bg-[#161D2E]/80 text-[#94A3B8] hover:text-[#F8FAFC]',
    danger: 'bg-[#EF4444]/10 hover:bg-[#EF4444] text-[#EF4444] hover:text-white border border-[#EF4444]/30'
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5 rounded-lg',
    md: 'text-sm px-5 py-2.5 gap-2 rounded-xl',
    lg: 'text-base px-6 py-3.5 gap-2.5 rounded-xl font-extrabold'
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-current" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="w-4 h-4 flex-shrink-0" />}
          {children}
          {IconRight && <IconRight className="w-4 h-4 flex-shrink-0" />}
        </>
      )}
    </button>
  );
};
