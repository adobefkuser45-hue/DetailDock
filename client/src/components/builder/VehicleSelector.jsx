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
          <span className="text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-wider">
            Step 01
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#F8FAFC]">
            Select Vehicle Body Style
          </h2>
        </div>
        <span className="text-xs text-[#94A3B8]">
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
              className={`relative p-5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between group ${
                isSelected
                  ? 'bg-[#161D2E] border-[#38BDF8] shadow-lg shadow-[#0284C7]/20 ring-1 ring-[#38BDF8]'
                  : 'bg-[#101522] border-[#1D2536] hover:border-[#2A364E] hover:bg-[#131A2B]'
              }`}
            >
              {/* Selected Checkmark Indicator */}
              {isSelected && (
                <div className="absolute top-3.5 right-3.5 w-6 h-6 rounded-full bg-[#0284C7] text-white flex items-center justify-center shadow-md">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'bg-[#0284C7]/20 text-[#38BDF8] border border-[#38BDF8]/40'
                      : 'bg-[#161D2E] text-[#94A3B8] border border-[#1D2536] group-hover:text-white'
                  }`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-white">
                      {cat.name}
                    </h3>
                    <div className="text-[11px] font-mono text-[#38BDF8] font-semibold">
                      {cat.priceMultiplier === 1.0 ? '1.0x (Baseline)' : `${cat.priceMultiplier}x Multiplier`}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#94A3B8] leading-relaxed mb-3">
                  {cat.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#1D2536] flex items-center justify-between text-[11px] text-[#64748B]">
                <span>Duration factor: {cat.durationMultiplier}x</span>
                {isSelected && (
                  <span className="text-[#38BDF8] font-bold">Active</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
