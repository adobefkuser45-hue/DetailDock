import React from 'react';
import { Car, Sparkles, CarFront, Truck, Check } from 'lucide-react';

const ICON_MAP = {
  Car: Car,
  Sparkles: Sparkles,
  CarFront: CarFront,
  Truck: Truck
};

const CATEGORY_PHOTOS = {
  // Primary API and Seed Database Slugs:
  sedan: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=600&auto=format&fit=crop',
  'executive-coupe': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=600&auto=format&fit=crop',
  'compact-suv': 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=600&auto=format&fit=crop',
  'full-suv': 'https://images.unsplash.com/photo-1551830820-330a71b99659?q=80&w=600&auto=format&fit=crop',
  // Direct Alias Fallbacks:
  coupe: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=600&auto=format&fit=crop',
  suv: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=600&auto=format&fit=crop',
  'truck-van': 'https://images.unsplash.com/photo-1551830820-330a71b99659?q=80&w=600&auto=format&fit=crop',
  exotic: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=600&auto=format&fit=crop'
};

export const VehicleSelector = ({ categories, selectedCategory, onSelect }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-mono font-bold text-[#F59E0B] uppercase tracking-wider">
            Step 01
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[#F8FAFC] tracking-tight font-display">
            Select Vehicle Platform & Chassis
          </h2>
        </div>
        <span className="text-xs text-[#94A3B8] font-mono">
          Precision Surface Area Calibration
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat) => {
          const isSelected = selectedCategory && (selectedCategory._id === cat._id || selectedCategory.slug === cat.slug);
          const IconComp = ICON_MAP[cat.iconName] || Car;
          const photoUrl = CATEGORY_PHOTOS[cat.slug] || CATEGORY_PHOTOS[cat.name?.toLowerCase()] || CATEGORY_PHOTOS.sedan;

          return (
            <button
              key={cat._id || cat.slug}
              type="button"
              onClick={() => onSelect(cat)}
              className={`relative rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between group cursor-pointer tactile-press overflow-hidden card-hover ${
                isSelected
                  ? 'bg-[#161D2A] border-[#F59E0B] shadow-[0_0_25px_rgba(245,158,11,0.25)] ring-1 ring-[#F59E0B]'
                  : 'bg-[#111622] border-white/10 hover:border-white/25 hover:bg-[#161D2A]'
              }`}
            >
              {/* Vehicle Photo Header */}
              <div className="h-28 w-full overflow-hidden relative image-zoom-container">
                <img 
                  src={photoUrl} 
                  alt={cat.name}
                  className={`w-full h-full object-cover object-center transition-transform duration-500 ${
                    isSelected ? 'scale-105 opacity-90' : 'opacity-70 group-hover:scale-105 group-hover:opacity-85'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111622] via-[#111622]/40 to-transparent" />
                
                {/* Selected Checkmark Indicator */}
                {isSelected && (
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#F59E0B] text-[#0B0E14] flex items-center justify-center shadow-lg">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30'
                        : 'bg-white/5 text-[#94A3B8] border border-white/10'
                    }`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-white font-display">
                        {cat.name}
                      </h3>
                      <div className="text-[10px] font-mono text-[#F59E0B] font-bold">
                        {cat.priceMultiplier === 1.0 ? '1.0x (Baseline)' : `${cat.priceMultiplier}x Multiplier`}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#94A3B8] leading-relaxed mb-3 font-normal min-h-[2.5rem]">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-[#94A3B8] font-mono">
                  <span>Duration: {cat.durationMultiplier}x</span>
                  {isSelected && (
                    <span className="text-[#F59E0B] font-bold">Selected</span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
