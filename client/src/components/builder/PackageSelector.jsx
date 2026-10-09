import React from 'react';
import { Check, CheckCircle2, Clock, Sparkles, ShieldCheck } from 'lucide-react';

export const PackageSelector = ({ packages, selectedPackage, selectedCategory, onSelect }) => {
  const multiplier = Number(selectedCategory?.priceMultiplier || 1.0);
  const durMultiplier = Number(selectedCategory?.durationMultiplier || 1.0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-mono font-bold text-[#F59E0B] uppercase tracking-wider">
            Step 02
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[#F8FAFC] tracking-tight font-display">
            Choose Detailing Tier
          </h2>
        </div>
        <span className="text-xs text-[#94A3B8] font-mono">
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
              className={`relative p-6 sm:p-7 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between group tactile-press card-hover ${
                isSelected
                  ? 'bg-[#161D2A] border-[#F59E0B] shadow-[0_0_25px_rgba(245,158,11,0.22)] ring-1 ring-[#F59E0B]'
                  : 'bg-[#111622] border-white/10 hover:border-white/25 hover:bg-[#161D2A]'
              }`}
            >
              {/* Badges */}
              {isSignature && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-[#0B0E14] text-[10px] font-black uppercase tracking-widest shadow-md flex items-center gap-1 font-mono">
                  <Sparkles className="w-3 h-3 fill-current" />
                  Atelier Choice
                </div>
              )}

              {/* Selection Check Circle */}
              {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#F59E0B] text-[#0B0E14] flex items-center justify-center shadow-md">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}

              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-bold uppercase tracking-wider font-mono ${
                    isSignature || isPinnacle ? 'text-[#F59E0B]' : 'text-[#94A3B8]'
                  }`}>
                    {isPinnacle ? 'Pinnacle Tier' : isSignature ? 'Stage 02 Detail' : 'Stage 01 Decon'}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#0B0E14] text-[#CBD5E1] flex items-center gap-1 font-mono border border-white/5">
                    <Clock className="w-3 h-3 text-[#F59E0B]" />
                    {durationString}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-1.5 font-display">
                  {pkg.title || pkg.name}
                </h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed mb-6 font-normal">
                  {pkg.tagline || pkg.description}
                </p>

                {/* Price Display */}
                <div className="p-4 rounded-xl bg-[#0B0E14] border border-white/10 mb-6">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-xs text-[#94A3B8] font-mono">Configured Price:</div>
                      <div className="text-3xl font-black font-mono tracking-tight text-[#F59E0B]">
                        ${adjustedPrice}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] text-[#64748B] font-mono">
                        Base: ${basePrice} × {multiplier}x
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2.5 mb-6">
                  <div className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider font-mono">
                    Included Operations:
                  </div>
                  {features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#CBD5E1]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selection Footer */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#94A3B8]">
                <span>Warranty: {pkg.warrantyMonths || (isPinnacle ? 36 : isSignature ? 12 : 3)} Months</span>
                <span className={`font-bold ${isSelected ? 'text-[#F59E0B]' : 'text-slate-500'}`}>
                  {isSelected ? '✓ Selected' : 'Click to Select'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
