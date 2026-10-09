import React from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  Cpu, 
  RefreshCw 
} from 'lucide-react';
import { Button } from '../common/Button.jsx';

export const PricingCockpit = ({
  category,
  pkg,
  addons,
  pricingData,
  isCalculating,
  onProceed
}) => {
  const multiplier = Number(category?.priceMultiplier || 1.0);
  const durMultiplier = Number(category?.durationMultiplier || 1.0);

  // Fallback calculations if backend call is in-flight
  const basePrice = Number(pkg?.basePrice || 0);
  const adjustedPkgPrice = Number((basePrice * multiplier).toFixed(2));
  const addonsTotal = addons.reduce((sum, a) => sum + Number(a.price || 0), 0);
  const totalSubtotal = Number((adjustedPkgPrice + addonsTotal).toFixed(2));

  const baseMinutes = Number(pkg?.baseDurationMinutes || pkg?.estimatedDurationMinutes || 90);
  const adjustedPkgMinutes = Math.round(baseMinutes * durMultiplier);
  const addonsMinutes = addons.reduce((sum, a) => sum + Number(a.durationMinutes || 0), 0);
  const totalMinutes = adjustedPkgMinutes + addonsMinutes;

  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  const formattedDuration = hours > 0 ? `${hours} hr${hours > 1 ? 's' : ''} ${mins} min${mins > 1 ? 's' : ''}` : `${mins} mins`;

  const displayTotal = pricingData?.breakdown?.subtotal !== undefined
    ? Number(pricingData.breakdown.subtotal).toFixed(2)
    : totalSubtotal.toFixed(2);

  const displayDuration = pricingData?.breakdown?.formattedDuration || formattedDuration;

  return (
    <div className="rounded-2xl bg-[#0E1017] border border-white/10 p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.7)] sticky top-28 backdrop-blur-2xl hover:border-[#D4AF37]/30 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#F8FAFC] font-mono">
            Pricing Cockpit
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/25 font-bold">
          {isCalculating ? (
            <span className="flex items-center gap-1">
              <RefreshCw className="w-3 h-3 animate-spin text-[#D4AF37]" />
              Syncing...
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <Cpu className="w-3 h-3" />
              Authoritative
            </span>
          )}
        </div>
      </div>

      {/* Selected Spec Overview */}
      <div className="py-5 space-y-3.5 border-b border-white/10 text-xs">
        {/* Chassis */}
        <div className="flex items-center justify-between">
          <span className="text-[#94A3B8]">Chassis Platform:</span>
          <span className="font-bold text-[#F8FAFC] flex items-center gap-1.5 font-display">
            {category?.name || 'Sedan'}
            <span className="text-[#D4AF37] font-mono text-[11px] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/20 font-bold">
              {multiplier}x
            </span>
          </span>
        </div>

        {/* Package */}
        <div className="flex items-center justify-between">
          <span className="text-[#94A3B8]">Atelier Tier:</span>
          <span className="font-bold text-[#F8FAFC] font-display">
            {pkg?.title || pkg?.name || 'Signature Detail'}
          </span>
        </div>

        {/* Package Base Math */}
        <div className="flex items-center justify-between text-[#64748B] pl-2 font-mono">
          <span>Base ${basePrice} × {multiplier}x:</span>
          <span className="text-[#E2E8F0]">${adjustedPkgPrice.toFixed(2)}</span>
        </div>

        {/* Addons List */}
        {addons.length > 0 && (
          <div className="pt-2 border-t border-white/5">
            <div className="text-[11px] font-bold uppercase text-[#94A3B8] mb-1.5 font-mono">
              Selected Addons ({addons.length}):
            </div>
            <div className="space-y-1.5 pl-2">
              {addons.map((a) => (
                <div key={a._id || a.slug} className="flex items-center justify-between text-[#94A3B8]">
                  <span className="truncate max-w-[180px]">{a.title}</span>
                  <span className="font-mono text-[#D4AF37] font-bold flex-shrink-0">+${a.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Estimated Duration & Bay Time */}
      <div className="py-4 border-b border-white/10 flex items-center justify-between text-xs">
        <span className="text-[#94A3B8] flex items-center gap-1.5 font-mono">
          <Clock className="w-4 h-4 text-[#D4AF37]" />
          Estimated Bay Time:
        </span>
        <span className="font-mono font-bold text-[#CBD5E1] text-sm">
          {displayDuration}
        </span>
      </div>

      {/* Total Amount */}
      <div className="py-5">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-xs uppercase font-bold text-[#94A3B8] font-mono">
              Estimated Investment
            </div>
            <div className="text-[10px] text-[#64748B]">
              Taxes calculated at intake
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl sm:text-4xl font-black text-[#D4AF37] font-mono tracking-tight">
              ${displayTotal}
            </div>
            <div className="text-[10px] text-[#10B981] font-mono font-bold flex items-center justify-end gap-1 mt-0.5">
              <ShieldCheck className="w-3 h-3" />
              Guaranteed Atelier Rate
            </div>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-2">
        <Button
          variant="primary"
          size="lg"
          iconRight={ArrowRight}
          onClick={onProceed}
          className="w-full glow-gold shadow-2xl"
        >
          Proceed to Bay Reservation
        </Button>
      </div>

      {/* Confidence Footer */}
      <div className="mt-4 pt-3 border-t border-white/10 text-center">
        <p className="text-[11px] text-[#64748B] flex items-center justify-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
          <span>Locks slot in dual climate cleanroom bay</span>
        </p>
      </div>
    </div>
  );
};
