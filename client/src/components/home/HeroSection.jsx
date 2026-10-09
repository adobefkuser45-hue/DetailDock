import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Calendar, 
  ShieldCheck, 
  Sparkles, 
  Gauge, 
  CheckCircle2, 
  Flame, 
  ChevronRight,
  Layers,
  Clock,
  Compass
} from 'lucide-react';
import { Button } from '../common/Button.jsx';
import { Badge } from '../common/Badge.jsx';

export const HeroSection = () => {
  const [selectedQuickBody, setSelectedQuickBody] = useState('sedan');

  const QUICK_ESTIMATES = {
    sedan: { label: 'Sedan / Coupe', multiplier: '1.0x', price: 289, duration: '180m', model: 'Porsche 911 / BMW M3' },
    suv: { label: 'Compact SUV', multiplier: '1.25x', price: 361, duration: '225m', model: 'Porsche Macan / Tesla Y' },
    truck: { label: 'Full SUV / Truck', multiplier: '1.45x', price: 419, duration: '260m', model: 'Range Rover / G-Wagon' }
  };

  const currentEst = QUICK_ESTIMATES[selectedQuickBody];

  return (
    <section className="relative overflow-hidden py-16 lg:py-24 border-b border-[#1D2536] bg-radial from-[#161D2E]/50 via-[#090C12] to-[#090C12]">
      {/* Ambient Lighting Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#0284C7]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-[#F59E0B]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute -top-20 left-10 w-[300px] h-[300px] bg-[#38BDF8]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Scangrip Overhead Cleanroom Light Beam Simulation */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-1 bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent shadow-[0_0_24px_rgba(56,189,248,0.9)] opacity-70" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Value Proposition (7 cols) */}
          <div className="lg:col-span-7 text-left">
            {/* Live Studio Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#101522] border border-[#2A364E] text-xs font-bold text-[#F8FAFC] shadow-lg mb-6">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
              </span>
              <span className="text-[#38BDF8] font-mono">DUAL BAYS ACTIVE</span>
              <span className="text-[#64748B]">•</span>
              <span className="text-[#94A3B8]">Austin Cleanroom Atelier</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-extrabold tracking-tight text-[#F8FAFC] leading-[1.05] mb-6">
              Preserve Perfection. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F8FAFC] via-[#38BDF8] to-[#0284C7]">
                Engineered Detailing & Smart Booking.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-2xl mb-8">
              Bespoke multi-stage rotary compounding, certified 9H ceramic glass coatings, and an intelligent dual-bay scheduling engine driven by authoritative server pricing.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
              <Link to="/builder" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  iconRight={ArrowRight}
                  className="w-full sm:w-auto glow-cyan shadow-lg shadow-[#0284C7]/20"
                >
                  Launch Smart Package Builder
                </Button>
              </Link>

              <Link to="/book" className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="lg"
                  icon={Calendar}
                  className="w-full sm:w-auto"
                >
                  Reserve Bay Slot
                </Button>
              </Link>
            </div>

            {/* Core Trust Metric Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#1D2536]/90">
              <div>
                <div className="text-2xl font-extrabold text-[#F8FAFC] font-mono">9H + IR</div>
                <div className="text-xs text-[#94A3B8] font-medium mt-0.5">Infrared Cured</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-[#38BDF8] font-mono">2 Bays</div>
                <div className="text-xs text-[#94A3B8] font-medium mt-0.5">Capacity Guarded</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-[#F59E0B] font-mono">100%</div>
                <div className="text-xs text-[#94A3B8] font-medium mt-0.5">Authoritative Math</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-[#10B981] font-mono">DD-XXXX</div>
                <div className="text-xs text-[#94A3B8] font-medium mt-0.5">Live Job Telemetry</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Instant Estimator Cockpit (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-[#101522] border-2 border-[#1D2536] p-6 shadow-2xl backdrop-blur-xl">
              
              {/* Header of Cockpit */}
              <div className="flex items-center justify-between pb-4 border-b border-[#1D2536]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#38BDF8] animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F8FAFC] font-mono">
                    Instant Estimator Cockpit
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#38BDF8] bg-[#0284C7]/15 px-2.5 py-0.5 rounded-full border border-[#0284C7]/30">
                  Live Rule Engine
                </span>
              </div>

              {/* Step 1 in Cockpit: Vehicle Body Picker */}
              <div className="mt-5">
                <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider block mb-2.5">
                  1. Select Body Style
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'sedan', label: 'Coupe / Sedan', sub: '1.0x' },
                    { id: 'suv', label: 'Compact SUV', sub: '1.25x' },
                    { id: 'truck', label: 'Full SUV / Truck', sub: '1.45x' }
                  ].map((body) => (
                    <button
                      key={body.id}
                      onClick={() => setSelectedQuickBody(body.id)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        selectedQuickBody === body.id
                          ? 'bg-[#0284C7]/15 border-[#38BDF8] text-[#F8FAFC] shadow-sm'
                          : 'bg-[#161D2E]/60 border-[#1D2536] text-[#94A3B8] hover:border-[#2A364E]'
                      }`}
                    >
                      <div className="text-xs font-bold">{body.label}</div>
                      <div className="text-[10px] font-mono text-[#38BDF8] mt-0.5">{body.sub}</div>
                    </button>
                  ))}
                </div>
                <div className="text-[11px] text-[#64748B] mt-2 italic flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Examples: {currentEst.model}</span>
                </div>
              </div>

              {/* Dynamic Telemetry Calculation Display */}
              <div className="mt-6 p-4 rounded-xl bg-[#090C12] border border-[#1D2536] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#94A3B8]">Featured Tier:</span>
                  <span className="font-bold text-[#F8FAFC]">Signature Multi-Stage Detail</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#94A3B8]">Chassis Multiplier:</span>
                  <span className="font-mono text-[#38BDF8] font-bold">{currentEst.multiplier}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#94A3B8]">Estimated Bay Time:</span>
                  <span className="font-mono text-[#F59E0B] font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {currentEst.duration}
                  </span>
                </div>
                <div className="pt-3 border-t border-[#1D2536] flex items-baseline justify-between">
                  <span className="text-xs font-bold text-[#94A3B8] uppercase">Estimated Total:</span>
                  <div className="text-right">
                    <div className="text-3xl font-extrabold text-[#38BDF8] font-mono tracking-tight">
                      ${currentEst.price}
                    </div>
                    <div className="text-[10px] text-[#64748B]">Includes paint polish + full steam decon</div>
                  </div>
                </div>
              </div>

              {/* Deep Link Button into Full Builder */}
              <div className="mt-6">
                <Link to={`/builder?category=${selectedQuickBody}`}>
                  <Button
                    variant="primary"
                    size="md"
                    iconRight={ChevronRight}
                    className="w-full glow-cyan-sm"
                  >
                    Customize in Full 3D Builder
                  </Button>
                </Link>
              </div>

              {/* Bay Availability Status Footer */}
              <div className="mt-4 pt-3 border-t border-[#1D2536] flex items-center justify-between text-[11px] text-[#94A3B8]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                  <span>Bay 1: Available Today</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                  <span>Bay 2: Reserved (Porsche GT3)</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
