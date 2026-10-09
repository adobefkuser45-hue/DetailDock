import React from 'react';

/**
 * 100% Bespoke, Code-Native Vector SVG Logo for DetailDock
 * Fully responsive, high-DPI crisp rendering, zero trademark/copyright risk (ADR-004 compliant).
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
      {/* Precision Automotive Emblem */}
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
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#090C12" />
          </linearGradient>
          <linearGradient id="emblemCyan" x1="12" y1="10" x2="36" y2="38" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>
          <linearGradient id="emblemGold" x1="20" y1="12" x2="38" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <filter id="emblemGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Hexagonal Shield */}
        <path
          d="M24 3L41 11V26C41 35.5 33.7 42.8 24 45C14.3 42.8 7 35.5 7 26V11L24 3Z"
          fill="url(#emblemShield)"
          stroke="#2A364E"
          strokeWidth="1.5"
        />

        {/* Inner Cyan Frame */}
        <path
          d="M24 6.5L38 13V25.5C38 33.5 32 39.5 24 41.5C16 39.5 10 33.5 10 25.5V13L24 6.5Z"
          stroke="#38BDF8"
          strokeOpacity="0.35"
          strokeWidth="1"
        />

        {/* Monogram D: Left Titanium Pillar */}
        <path
          d="M16 14C16 13.4 16.4 13 17 13H20C20.6 13 21 13.4 21 14V34C21 34.6 20.6 35 20 35H17C16.4 35 16 34.6 16 34V14Z"
          fill="#F8FAFC"
        />

        {/* Monogram D: Aerodynamic Speed Wing */}
        <path
          d="M21 13H27C32.5 13 36 17 36 24C36 31 32.5 35 27 35H21V30.5H26.5C29.5 30.5 31.5 28 31.5 24C31.5 20 29.5 17.5 26.5 17.5H21V13Z"
          fill="url(#emblemCyan)"
          filter="url(#emblemGlow)"
        />

        {/* Precision Micro-Sparkle Highlight */}
        <path
          d="M24 20L25.5 24L29.5 25.5L25.5 27L24 31L22.5 27L18.5 25.5L22.5 24L24 20Z"
          fill="url(#emblemGold)"
        />
      </svg>

      {/* Typography Wordmark */}
      {!iconOnly && showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-extrabold tracking-tight text-[#F8FAFC] ${currentSize.textClasses}`}>
            Detail<span className="text-[#38BDF8]">Dock</span>
          </span>
          {showTagline && (
            <span className={`font-bold uppercase text-[#94A3B8] mt-0.5 ${currentSize.subtextClasses}`}>
              Smart Auto Atelier
            </span>
          )}
        </div>
      )}
    </div>
  );
};
