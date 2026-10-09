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
    primary: 'bg-gradient-to-r from-[#D4AF37] via-[#E2C366] to-[#C99C25] hover:from-[#E8CA72] hover:to-[#D4AF37] text-[#08090C] font-black shadow-lg shadow-[#D4AF37]/20 border border-[#F3DB94]/60 hover:shadow-[#D4AF37]/35',
    secondary: 'bg-[#151822] hover:bg-[#1C202C] text-[#F8FAFC] border border-[#262B3A] hover:border-[#D4AF37]/40 shadow-sm hover:text-[#FFFFFF]',
    gold: 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#E5C07B] hover:to-[#D4AF37] text-[#08090C] font-black shadow-lg shadow-[#D4AF37]/25 border border-[#F5D88C]/60',
    titanium: 'bg-[#1B1E28] hover:bg-[#242836] text-[#CBD5E1] hover:text-[#FFFFFF] border border-[#2E3446] hover:border-[#94A3B8]',
    outline: 'bg-transparent hover:bg-[#151822] text-[#CBD5E1] hover:text-[#FFFFFF] border border-[#262B3A] hover:border-[#D4AF37]/50',
    ghost: 'bg-transparent hover:bg-[#151822]/80 text-[#94A3B8] hover:text-[#F8FAFC]',
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
