import React from 'react';

/**
 * Concourse Atelier Bespoke Vector SVG Logo for DetailDock
 * Features luxury champagne gold & brushed titanium aerodynamics.
 * 100% Code-Native geometry, zero copyright risk (ADR-004 compliant).
 */
export const DetailDockLogo = ({
  size = 'md',
  showText = true,
  showTagline = true,
  className = '',
  iconOnly = false
}) => {
  const sizeMap = {
    sm: { iconSize: 28, textClasses: 'text-lg', subtextClasses: 'text-[8px] tracking-[1.8px]' },
    md: { iconSize: 36, textClasses: 'text-xl', subtextClasses: 'text-[9px] tracking-[2px]' },
    lg: { iconSize: 44, textClasses: 'text-2xl', subtextClasses: 'text-[10px] tracking-[2.4px]' },
    xl: { iconSize: 56, textClasses: 'text-3xl', subtextClasses: 'text-xs tracking-[2.8px]' }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Precision Automotive Concourse Emblem */}
      <svg
        width={currentSize.iconSize}
        height={currentSize.iconSize}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 transition-transform duration-300 hover:scale-105"
      >
        <defs>
          <linearGradient id="emblemShield" x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1E2330" />
            <stop offset="100%" stopColor="#08090C" />
          </linearGradient>
          <linearGradient id="emblemGoldGrad" x1="12" y1="10" x2="36" y2="38" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F5D88C" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#A67C1E" />
          </linearGradient>
          <linearGradient id="emblemTitanium" x1="16" y1="12" x2="24" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>
        </defs>

        {/* Outer Hexagonal Concourse Shield */}
        <path
          d="M24 3L41 11V26C41 35.5 33.7 42.8 24 45C14.3 42.8 7 35.5 7 26V11L24 3Z"
          fill="url(#emblemShield)"
          stroke="#2A3040"
          strokeWidth="1.5"
        />

        {/* Inner Gold Frame */}
        <path
          d="M24 6.5L38 13V25.5C38 33.5 32 39.5 24 41.5C16 39.5 10 33.5 10 25.5V13L24 6.5Z"
          stroke="#D4AF37"
          strokeOpacity="0.4"
          strokeWidth="1"
        />

        {/* Monogram D: Left Titanium Pillar */}
        <path
          d="M16 14C16 13.4 16.4 13 17 13H20C20.6 13 21 13.4 21 14V34C21 34.6 20.6 35 20 35H17C16.4 35 16 34.6 16 34V14Z"
          fill="url(#emblemTitanium)"
        />

        {/* Monogram D: Aerodynamic Speed Wing in Concourse Gold */}
        <path
          d="M21 13H27C32.5 13 36 17 36 24C36 31 32.5 35 27 35H21V30.5H26.5C29.5 30.5 31.5 28 31.5 24C31.5 20 29.5 17.5 26.5 17.5H21V13Z"
          fill="url(#emblemGoldGrad)"
        />

        {/* Precision Micro-Sparkle Refraction */}
        <path
          d="M24 20L25.5 24L29.5 25.5L25.5 27L24 31L22.5 27L18.5 25.5L22.5 24L24 20Z"
          fill="#FFFFFF"
          opacity="0.9"
        />
      </svg>

      {/* Typography Wordmark */}
      {!iconOnly && showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-black tracking-tight text-[#F8FAFC] ${currentSize.textClasses}`}>
            Detail<span className="bg-gradient-to-r from-[#D4AF37] to-[#E5C07B] bg-clip-text text-transparent font-black">Dock</span>
          </span>
          {showTagline && (
            <span className={`font-bold uppercase tracking-widest text-[#94A3B8] mt-1 ${currentSize.subtextClasses}`}>
              Concourse Atelier
            </span>
          )}
        </div>
      )}
    </div>
  );
};
