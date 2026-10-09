import React from 'react';
import { Clock, Plus, Check, Sparkles, Shield, Flame, Disc, Sun } from 'lucide-react';

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
          <span className="text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-wider">
            Step 03
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#F8FAFC]">
            Optional Atelier Enhancements
          </h2>
        </div>
        <span className="text-xs text-[#94A3B8]">
          Add custom standalone treatments
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addons.map((addon) => {
          const selected = isAddonSelected(addon);
          const IconComp = ADDON_ICONS[addon.iconName] || Sparkles;

          return (
            <div
              key={addon._id || addon.slug}
              onClick={() => onToggleAddon(addon)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 flex items-start justify-between gap-4 select-none ${
                selected
                  ? 'bg-[#161D2E] border-[#38BDF8] shadow-md shadow-[#0284C7]/15 ring-1 ring-[#38BDF8]'
                  : 'bg-[#101522] border-[#1D2536] hover:border-[#2A364E] hover:bg-[#131A2B]'
              }`}
            >
              <div className="flex items-start gap-3.5">
                {/* Icon box */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                  selected
                    ? 'bg-[#0284C7]/20 text-[#38BDF8] border border-[#38BDF8]/40'
                    : 'bg-[#161D2E] text-[#94A3B8] border border-[#1D2536]'
                }`}>
                  <IconComp className="w-5 h-5" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm sm:text-base text-white">
                      {addon.title || addon.name}
                    </h3>
                  </div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed mt-1 mb-2.5">
                    {addon.description}
                  </p>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#64748B]">
                    <span className="flex items-center gap-1 text-[#38BDF8]">
                      <Clock className="w-3 h-3" />
                      +{addon.durationMinutes} mins
                    </span>
                  </div>
                </div>
              </div>

              {/* Price & Toggle switch */}
              <div className="flex flex-col items-end gap-3 flex-shrink-0">
                <div className="text-sm sm:text-base font-extrabold font-mono text-[#F59E0B]">
                  +${addon.price}
                </div>

                {/* Animated toggle pill */}
                <div 
                  className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                    selected ? 'bg-[#0284C7]' : 'bg-[#1D2536]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                      selected ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
