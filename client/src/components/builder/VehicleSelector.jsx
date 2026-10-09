import React from 'react';
import { Car, Sparkles, CarFront, Truck, Check } from 'lucide-react';

const ICON_MAP = {
  Car: Car,
  Sparkles: Sparkles,
  CarFront: CarFront,
  Truck: Truck
};

export const VehicleSelector = ({ categories, selectedCategory, onSelect }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider">
            Step 01
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[#F8FAFC] tracking-tight font-display">
            Select Vehicle Platform & Chassis
          </h2>
        </div>
        <span className="text-xs text-[#94A3B8] font-mono">
          Applies surface area multiplier
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat) => {
          const isSelected = selectedCategory && (selectedCategory._id === cat._id || selectedCategory.slug === cat.slug);
          const IconComp = ICON_MAP[cat.iconName] || Car;

          return (
            <button
              key={cat._id || cat.slug}
              type="button"
              onClick={() => onSelect(cat)}
              className={`relative p-5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between group cursor-pointer tactile-press ${
                isSelected
                  ? 'bg-[#151822] border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.15)] ring-1 ring-[#D4AF37]'
                  : 'bg-[#0E1017] border-white/10 hover:border-white/25 hover:bg-[#131620]'
              }`}
            >
              {/* Selected Checkmark Indicator */}
              {isSelected && (
                <div className="absolute top-3.5 right-3.5 w-6 h-6 rounded-full bg-[#D4AF37] text-[#08090C] flex items-center justify-center shadow-md">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30'
                      : 'bg-white/5 text-[#94A3B8] border border-white/10 group-hover:text-white'
                  }`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-white font-display">
                      {cat.name}
                    </h3>
                    <div className="text-[11px] font-mono text-[#D4AF37] font-bold">
                      {cat.priceMultiplier === 1.0 ? '1.0x (Baseline)' : `${cat.priceMultiplier}x Multiplier`}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#94A3B8] leading-relaxed mb-3 font-normal">
                  {cat.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-[#94A3B8] font-mono">
                <span>Duration factor: {cat.durationMultiplier}x</span>
                {isSelected && (
                  <span className="text-[#D4AF37] font-bold">Selected</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
