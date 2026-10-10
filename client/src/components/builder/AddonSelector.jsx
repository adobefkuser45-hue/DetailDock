import React from 'react';
import { Clock, Sparkles, Shield, Flame, Disc, Sun } from 'lucide-react';

const ADDON_ICONS = {
  Flame: Flame,
  Shield: Shield,
  Sparkles: Sparkles,
  Disc: Disc,
  Sun: Sun
};

export const AddonSelector = ({ addons, selectedAddons, onToggleAddon }) => {
  const isAddonSelected = (addon) => {
    return selectedAddons.some(a => (a._id && a._id === addon._id) || (a.slug && a.slug === addon.slug));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-mono font-bold text-[#F59E0B] uppercase tracking-wider">
            Step 03
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[#F8FAFC] tracking-tight font-display">
            Optional Atelier Enhancements
          </h2>
        </div>
        <span className="text-xs text-[#94A3B8] font-mono">
          Add custom standalone treatments
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addons.map((addon, idx) => {
          const selected = isAddonSelected(addon);
          const IconComp = ADDON_ICONS[addon.iconName] || Sparkles;
          const isLastOdd = idx === addons.length - 1 && addons.length % 2 !== 0;

          return (
            <div
              key={addon._id || addon.slug}
              onClick={() => onToggleAddon(addon)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 flex items-start justify-between gap-4 select-none tactile-press card-hover ${
                isLastOdd ? 'md:col-span-2' : ''
              } ${
                selected
                  ? 'bg-[#161D2A] border-[#F59E0B] shadow-[0_0_20px_rgba(245,158,11,0.18)] ring-1 ring-[#F59E0B]'
                  : 'bg-[#111622] border-white/10 hover:border-white/25 hover:bg-[#161D2A]'
              }`}
            >
              <div className="flex items-start gap-3.5 flex-1">
                {/* Icon box */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                  selected
                    ? 'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30'
                    : 'bg-white/5 text-[#94A3B8] border border-white/10'
                }`}>
                  <IconComp className="w-5 h-5" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm sm:text-base text-white font-display">
                      {addon.title || addon.name}
                    </h3>
                  </div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed mt-1 mb-2.5 font-normal max-w-xl">
                    {addon.description}
                  </p>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#94A3B8]">
                    <span className="inline-flex items-center gap-1.5 text-[#CBD5E1] bg-[#0B0E14] px-2.5 py-0.5 rounded-full border border-white/5 font-medium">
                      <Clock className="w-3 h-3 text-[#F59E0B]" />
                      +{addon.durationMinutes} mins studio time
                    </span>
                  </div>
                </div>
              </div>

              {/* Price & Toggle switch */}
              <div className="flex flex-col items-end gap-2.5 flex-shrink-0 pl-2">
                <div className="text-sm sm:text-base font-black font-mono text-[#F59E0B]">
                  +${addon.price}
                </div>

                {/* Animated toggle pill with text indicator */}
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono font-bold tracking-wider uppercase transition-colors ${
                    selected ? 'text-[#F59E0B]' : 'text-[#64748B]'
                  }`}>
                    {selected ? 'Added' : 'Add'}
                  </span>
                  <div 
                    className={`w-10 h-5.5 rounded-full transition-colors relative flex items-center p-0.5 ${
                      selected ? 'bg-[#F59E0B]' : 'bg-[#1D2536]'
                    }`}
                  >
                    <div
                      className={`w-4.5 h-4.5 rounded-full shadow-md transform transition-transform ${
                        selected ? 'translate-x-4.5 bg-[#0B0E14]' : 'translate-x-0 bg-white'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
