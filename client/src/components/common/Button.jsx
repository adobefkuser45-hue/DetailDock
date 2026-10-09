import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Concourse Atelier Luxury Button Component
 * Features tactile spring-like physics, specular reflections, and refined metallic states.
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
  const baseStyles = 'inline-flex items-center justify-center font-bold tracking-tight rounded-xl select-none focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98] transition-all duration-200';

  const variants = {
    primary: 'bg-gradient-to-r from-[#F59E0B] via-[#FBBF24] to-[#D97706] hover:from-[#FBBF24] hover:to-[#F59E0B] text-[#0B0E14] font-black shadow-lg shadow-[#F59E0B]/25 border border-[#FDE68A]/60 hover:shadow-[#F59E0B]/40',
    secondary: 'bg-[#161D2A] hover:bg-[#1E2738] text-[#F8FAFC] border border-white/10 hover:border-[#F59E0B]/50 shadow-sm hover:text-[#FFFFFF]',
    amber: 'bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-[#FBBF24] hover:to-[#F59E0B] text-[#0B0E14] font-black shadow-lg shadow-[#F59E0B]/30 border border-[#FDE68A]/60',
    gold: 'bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-[#FBBF24] hover:to-[#F59E0B] text-[#0B0E14] font-black shadow-lg shadow-[#F59E0B]/30 border border-[#FDE68A]/60',
    titanium: 'bg-[#1E2738] hover:bg-[#28354D] text-[#CBD5E1] hover:text-[#FFFFFF] border border-white/10 hover:border-[#94A3B8]',
    outline: 'bg-transparent hover:bg-[#161D2A] text-[#CBD5E1] hover:text-[#FFFFFF] border border-white/15 hover:border-[#F59E0B]/60',
    ghost: 'bg-transparent hover:bg-[#161D2A]/80 text-[#94A3B8] hover:text-[#F8FAFC]',
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
