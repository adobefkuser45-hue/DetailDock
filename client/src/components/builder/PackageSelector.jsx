import React from 'react';
import { Check, CheckCircle2, Clock, Sparkles, ShieldCheck, Flame } from 'lucide-react';

export const PackageSelector = ({ packages, selectedPackage, selectedCategory, onSelect }) => {
  const multiplier = Number(selectedCategory?.priceMultiplier || 1.0);
  const durMultiplier = Number(selectedCategory?.durationMultiplier || 1.0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-wider">
            Step 02
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#F8FAFC]">
            Choose Detailing Tier
          </h2>
        </div>
        <span className="text-xs text-[#94A3B8]">
          Prices reflect your {selectedCategory?.name || 'selected'} chassis
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => {
          const isSelected = selectedPackage && (selectedPackage._id === pkg._id || selectedPackage.slug === pkg.slug);
          const isSignature = pkg.isPopular || pkg.slug === 'signature-detail' || pkg.name?.includes('Signature') || pkg.title?.includes('Signature');
          const isPinnacle = pkg.slug === 'ceramic-shield' || pkg.name?.includes('Ceramic') || pkg.title?.includes('Ceramic');

          // Dynamically calculate adjusted package price and duration
          const basePrice = Number(pkg.basePrice || 0);
          const adjustedPrice = Number((basePrice * multiplier).toFixed(2));
          const baseDuration = Number(pkg.baseDurationMinutes || pkg.estimatedDurationMinutes || 90);
          const adjustedDuration = Math.round(baseDuration * durMultiplier);
          const hours = Math.floor(adjustedDuration / 60);
          const mins = adjustedDuration % 60;
          const durationString = hours > 0 ? `${hours}h ${mins > 0 ? `${mins}m` : ''}` : `${mins}m`;

          const features = pkg.includedFeatures || pkg.features || [];

          return (
            <div
              key={pkg._id || pkg.slug}
              onClick={() => onSelect(pkg)}
              className={`relative p-6 sm:p-7 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between group ${
                isSelected
                  ? isSignature
                    ? 'bg-[#161D2E] border-[#38BDF8] shadow-xl shadow-[#0284C7]/25 ring-2 ring-[#38BDF8]'
                    : isPinnacle
                    ? 'bg-[#161D2E] border-[#F59E0B] shadow-xl shadow-[#F59E0B]/20 ring-2 ring-[#F59E0B]'
                    : 'bg-[#161D2E] border-[#38BDF8] shadow-lg shadow-[#0284C7]/15 ring-2 ring-[#38BDF8]'
                  : 'bg-[#101522] border-[#1D2536] hover:border-[#2A364E] hover:bg-[#131A2B]'
              }`}
            >
              {/* Badges */}
              {isSignature && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#0284C7] text-white text-[10px] font-extrabold uppercase tracking-widest shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Most Popular
                </div>
              )}

              {/* Selection Check Circle */}
              {isSelected && (
                <div className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center text-white shadow-md ${
                  isPinnacle ? 'bg-[#F59E0B]' : 'bg-[#0284C7]'
                }`}>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}

              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-bold uppercase tracking-wider font-mono ${
                    isSignature ? 'text-[#38BDF8]' : isPinnacle ? 'text-[#F59E0B]' : 'text-[#94A3B8]'
                  }`}>
                    {isPinnacle ? 'Pinnacle Tier' : isSignature ? 'Stage 02 Detail' : 'Stage 01 Decon'}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#1F273B] text-[#94A3B8] flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" />
                    {durationString}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-1.5">
                  {pkg.title || pkg.name}
                </h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed mb-6">
                  {pkg.tagline || pkg.description}
                </p>

                {/* Price Display */}
                <div className="p-4 rounded-xl bg-[#090C12] border border-[#1D2536] mb-6">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-xs text-[#94A3B8]">Configured Price:</div>
                      <div className={`text-3xl font-extrabold font-mono tracking-tight ${
                        isSignature ? 'text-[#38BDF8]' : isPinnacle ? 'text-[#F59E0B]' : 'text-[#F8FAFC]'
                      }`}>
                        ${adjustedPrice}
                      </div>
                    </div>
                    {multiplier !== 1.0 && (
                      <div className="text-right">
                        <div className="text-[10px] text-[#64748B]">Base: ${basePrice}</div>
                        <div className="text-[11px] font-mono text-[#38BDF8]">× {multiplier}x</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Included Features */}
                <ul className="space-y-2.5 text-xs text-[#94A3B8] mb-6">
                  {features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${
                        isSignature ? 'text-[#38BDF8]' : isPinnacle ? 'text-[#F59E0B]' : 'text-[#10B981]'
                      }`} />
                      <span className="text-[#E2E8F0]">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom selection indicator */}
              <div className="pt-4 border-t border-[#1D2536] flex items-center justify-between text-xs">
                <span className={isSelected ? 'text-[#38BDF8] font-bold' : 'text-[#64748B]'}>
                  {isSelected ? '✓ Package Selected' : 'Click to select package'}
                </span>
                <span className="text-[11px] font-mono text-[#94A3B8]">
                  ~{adjustedDuration} mins bay time
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
