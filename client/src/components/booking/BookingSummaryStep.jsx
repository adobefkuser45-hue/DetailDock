import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Car, 
  CheckCircle2, 
  Edit3,
  Layers
} from 'lucide-react';
import { Button } from '../common/Button.jsx';

export const BookingSummaryStep = ({
  category,
  pkg,
  addons,
  pricing,
  onNext
}) => {
  const multiplier = Number(category?.priceMultiplier || 1.0);
  const basePrice = Number(pkg?.basePrice || 0);
  const adjustedPkgPrice = Number((basePrice * multiplier).toFixed(2));
  const addonsTotal = addons.reduce((sum, a) => sum + Number(a.price || 0), 0);
  const subtotal = Number((adjustedPkgPrice + addonsTotal).toFixed(2));

  const baseMinutes = Number(pkg?.baseDurationMinutes || pkg?.estimatedDurationMinutes || 90);
  const durMultiplier = Number(category?.durationMultiplier || 1.0);
  const totalMinutes = Math.round(baseMinutes * durMultiplier) + addons.reduce((sum, a) => sum + Number(a.durationMinutes || 0), 0);
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  const durationStr = hours > 0 ? `${hours}h ${mins > 0 ? `${mins}m` : ''}` : `${mins}m`;

  const displayTotal = pricing?.breakdown?.subtotal ? Number(pricing.breakdown.subtotal).toFixed(2) : subtotal.toFixed(2);
  const displayDuration = pricing?.breakdown?.formattedDuration || durationStr;

  return (
    <div className="space-y-6">
      <div className="text-left">
        <span className="text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-wider">
          Step 01 of 03
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] tracking-tight mt-1">
          Review Detailing Specification
        </h2>
        <p className="text-sm text-[#94A3B8] mt-1">
          Verify your selected vehicle chassis, treatment tier, and optional upgrades before reserving your cleanroom bay slot.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Spec Cards (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Card 1: Selected Chassis */}
          <div className="p-5 rounded-2xl bg-[#101522] border border-[#1D2536] flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#0284C7]/20 border border-[#38BDF8]/40 flex items-center justify-center text-[#38BDF8]">
                <Car className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs uppercase font-bold text-[#64748B] tracking-wider">Vehicle Chassis</div>
                <div className="text-base font-bold text-white mt-0.5">{category?.name || 'Compact / Sedan'}</div>
                <div className="text-xs text-[#94A3B8] font-mono">Multiplier: {multiplier}x</div>
              </div>
            </div>
            <Link to="/builder" className="text-xs text-[#38BDF8] hover:underline flex items-center gap-1">
              <Edit3 className="w-3.5 h-3.5" />
              <span>Modify</span>
            </Link>
          </div>

          {/* Card 2: Selected Package */}
          <div className="p-6 rounded-2xl bg-[#101522] border border-[#1D2536]">
            <div className="flex items-center justify-between pb-3 border-b border-[#1D2536]">
              <div>
                <div className="text-xs uppercase font-bold text-[#38BDF8] tracking-wider font-mono">
                  Primary Package
                </div>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  {pkg?.title || pkg?.name || 'Signature Multi-Stage Detail'}
                </h3>
              </div>
              <div className="text-right">
                <div className="text-xl font-extrabold font-mono text-[#38BDF8]">
                  ${adjustedPkgPrice.toFixed(2)}
                </div>
                <div className="text-[10px] text-[#64748B]">Adjusted for chassis</div>
              </div>
            </div>

            <p className="text-xs text-[#94A3B8] mt-3 leading-relaxed">
              {pkg?.tagline || pkg?.description}
            </p>

            {/* Included features pill */}
            <div className="mt-4 pt-3 border-t border-[#1D2536]/60 flex flex-wrap gap-2">
              {(pkg?.includedFeatures || pkg?.features || []).slice(0, 4).map((feat, i) => (
                <span key={i} className="text-[11px] px-2.5 py-1 rounded-lg bg-[#161D2E] text-[#94A3B8] border border-[#1D2536] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-[#38BDF8]" />
                  <span>{feat}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Card 3: Selected Addons */}
          {addons.length > 0 && (
            <div className="p-6 rounded-2xl bg-[#101522] border border-[#1D2536]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase font-bold text-[#F59E0B] tracking-wider font-mono">
                  Selected Atelier Upgrades ({addons.length})
                </span>
                <span className="text-xs font-mono font-bold text-[#F59E0B]">
                  +${addonsTotal.toFixed(2)}
                </span>
              </div>
              <div className="space-y-2.5">
                {addons.map((add) => (
                  <div key={add._id || add.slug} className="flex items-center justify-between p-3 rounded-xl bg-[#090C12] border border-[#1D2536] text-xs">
                    <div>
                      <div className="font-semibold text-white">{add.title}</div>
                      <div className="text-[11px] text-[#64748B] flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-[#38BDF8]" />
                        <span>+{add.durationMinutes} mins</span>
                      </div>
                    </div>
                    <div className="font-mono font-bold text-[#F59E0B]">
                      +${add.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Reservation Total Card (5 cols) */}
        <div className="lg:col-span-5">
          <div className="p-6 rounded-2xl bg-[#161D2E] border-2 border-[#1D2536] shadow-xl">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] font-mono mb-4">
              Estimated Investment Summary
            </h4>

            <div className="space-y-3 pb-4 border-b border-[#1D2536] text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#94A3B8]">Base Detailing Tier:</span>
                <span className="font-mono text-white">${basePrice.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#94A3B8]">Chassis Multiplier:</span>
                <span className="font-mono text-[#38BDF8]">× {multiplier}x</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#94A3B8]">Adjusted Package Total:</span>
                <span className="font-mono text-white">${adjustedPkgPrice.toFixed(2)}</span>
              </div>
              {addonsTotal > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-[#94A3B8]">Atelier Add-ons Total:</span>
                  <span className="font-mono text-[#F59E0B]">+${addonsTotal.toFixed(2)}</span>
                </div>
              )}
              <div className="flex items-center justify-between pt-2 border-t border-[#1D2536]/60">
                <span className="text-[#94A3B8] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
                  Estimated Bay Time:
                </span>
                <span className="font-mono font-bold text-[#F59E0B]">{displayDuration}</span>
              </div>
            </div>

            <div className="py-4">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-bold text-white uppercase">Total Subtotal:</span>
                <div className="text-right">
                  <div className="text-3xl font-extrabold font-mono text-[#38BDF8]">
                    ${displayTotal}
                  </div>
                  <div className="text-[10px] text-[#10B981] flex items-center justify-end gap-1 mt-0.5">
                    <ShieldCheck className="w-3 h-3" />
                    Guaranteed Studio Rate
                  </div>
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              iconRight={ArrowRight}
              onClick={onNext}
              className="w-full glow-cyan mt-2"
            >
              Continue to Date & Bay Selection
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
