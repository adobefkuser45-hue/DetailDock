import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Calendar, 
  Sparkles, 
  ChevronRight,
  Clock, 
  Compass,
  Gauge,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import { Button } from '../common/Button.jsx';

export const HeroSection = () => {
  const [selectedQuickBody, setSelectedQuickBody] = useState('sedan');
  const [mousePos, setMousePos] = useState({ x: 50, y: 30 });
  const heroRef = useRef(null);

  const QUICK_ESTIMATES = {
    sedan: { 
      label: 'Coupe / Sedan', 
      multiplier: '1.0x', 
      price: 289, 
      duration: '180m', 
      model: 'Porsche 911 / BMW M3 / Taycan',
      img: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=400&auto=format&fit=crop'
    },
    suv: { 
      label: 'Luxury SUV', 
      multiplier: '1.25x', 
      price: 361, 
      duration: '225m', 
      model: 'Porsche Macan / Cayenne / Range Rover',
      img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=400&auto=format&fit=crop'
    },
    exotic: { 
      label: 'Supercar', 
      multiplier: '1.45x', 
      price: 419, 
      duration: '260m', 
      model: 'Ferrari 296 / Lambo Huracán / GT3 RS',
      img: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=400&auto=format&fit=crop'
    }
  };

  const currentEst = QUICK_ESTIMATES[selectedQuickBody];

  // Mouse move handler for Scangrip spotlight inspection beam
  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x: Math.round(x), y: Math.round(y) });
  };

  return (
    <section 
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden py-16 lg:py-24 border-b border-white/10 bg-[#0B0E14] transition-colors"
    >
      {/* Cinematic Supercar Full-Bleed Backdrop with Studio Vignette */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1600&auto=format&fit=crop"
          alt="Exotic Porsche 911 GT3 Atelier Studio"
          className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity scale-105"
        />
        {/* Multi-layered gradient overlays to guarantee pristine contrast and luxury depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0E14] via-[#0B0E14]/90 to-[#0B0E14]/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0E14] via-transparent to-[#0B0E14]" />
      </div>

      {/* Dynamic Scangrip Optical Spotlight Beam */}
      <div 
        className="absolute pointer-events-none transition-all duration-300 ease-out z-0"
        style={{
          top: `${mousePos.y}%`,
          left: `${mousePos.x}%`,
          transform: 'translate(-50%, -50%)',
          width: '750px',
          height: '750px',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, rgba(245, 158, 11, 0.03) 40%, transparent 70%)',
          filter: 'blur(45px)'
        }}
      />

      {/* Atmospheric Amber & Platinum Ambient Glows */}
      <div className="absolute top-10 right-1/4 w-[500px] h-[500px] bg-[#F59E0B]/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute -bottom-20 left-10 w-[450px] h-[450px] bg-white/[0.03] rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Architectural Value Proposition (7 cols) */}
          <div className="lg:col-span-7 text-left">
            
            {/* Live Studio Status Pill */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#111622]/90 border border-white/10 text-xs font-semibold text-[#F8FAFC] shadow-2xl mb-8 backdrop-blur-xl">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10B981]" />
              </span>
              <span className="text-[#F59E0B] font-mono tracking-wider font-bold">DUAL CLEANROOM BAYS ACTIVE</span>
              <span className="text-white/20">•</span>
              <span className="text-[#94A3B8]">Austin ISO-6 Atelier</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-[70px] font-black tracking-[-0.04em] text-[#F8FAFC] leading-[1.03] mb-6 font-display">
              Where Paint Meets <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] via-[#FBBF24] to-[#D97706] filter drop-shadow-[0_2px_15px_rgba(245,158,11,0.3)]">
                Concourse Perfection.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-2xl mb-10 font-normal">
              Bespoke multi-stage rotary compounding, certified 9H ceramic glass shielding, and real-time bay telemetry engineered for discerning automotive enthusiasts.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
              <Link to="/builder" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  iconRight={ArrowRight}
                  className="w-full sm:w-auto glow-amber shadow-2xl font-bold"
                >
                  Configure In Smart Builder
                </Button>
              </Link>

              <Link to="/book" className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="lg"
                  icon={Calendar}
                  className="w-full sm:w-auto border-white/15 hover:border-[#F59E0B]/50"
                >
                  Reserve Bay Appointment
                </Button>
              </Link>
            </div>

            {/* Core Architectural Metric Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/10">
              <div>
                <div className="text-2xl font-extrabold text-[#F8FAFC] font-mono tracking-tight">9H + IR</div>
                <div className="text-xs text-[#94A3B8] font-medium mt-1">Shortwave Infrared Cured</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-[#F59E0B] font-mono tracking-tight">&lt; 0.5µm</div>
                <div className="text-xs text-[#94A3B8] font-medium mt-1">Rotary Paint Leveling</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-[#CBD5E1] font-mono tracking-tight">100%</div>
                <div className="text-xs text-[#94A3B8] font-medium mt-1">Authoritative Server Math</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-[#10B981] font-mono tracking-tight">DD-XXXX</div>
                <div className="text-xs text-[#94A3B8] font-medium mt-1">Live Job Telemetry HUD</div>
              </div>
            </div>
          </div>

          {/* Right Column: Precision Atelier Cockpit with Real Vehicle Thumbnails (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-[#111622]/95 border border-white/10 p-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] backdrop-blur-2xl group hover:border-[#F59E0B]/50 transition-all duration-300">
              
              {/* Cockpit Top Bar */}
              <div className="flex items-center justify-between pb-5 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#F8FAFC] font-mono">
                    Atelier Estimation Cockpit
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#F59E0B] bg-[#F59E0B]/10 px-3 py-1 rounded-full border border-[#F59E0B]/25 font-bold">
                  v2.0 Rule Engine
                </span>
              </div>

              {/* Step 1: Vehicle Body Architecture Picker with Real Photography */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider block font-mono">
                    1. Select Vehicle Platform
                  </label>
                  <span className="text-[11px] text-[#F59E0B] font-mono font-bold">Multiplier</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'sedan', label: 'Coupe / Sedan', sub: '1.0x', img: QUICK_ESTIMATES.sedan.img },
                    { id: 'suv', label: 'Luxury SUV', sub: '1.25x', img: QUICK_ESTIMATES.suv.img },
                    { id: 'exotic', label: 'Supercar', sub: '1.45x', img: QUICK_ESTIMATES.exotic.img }
                  ].map((body) => {
                    const isSelected = selectedQuickBody === body.id;
                    return (
                      <button
                        key={body.id}
                        type="button"
                        onClick={() => setSelectedQuickBody(body.id)}
                        className={`rounded-xl border overflow-hidden transition-all cursor-pointer tactile-press text-left group/btn ${
                          isSelected
                            ? 'bg-[#161D2A] border-[#F59E0B] text-white shadow-[0_0_20px_rgba(245,158,11,0.25)] ring-1 ring-[#F59E0B]'
                            : 'bg-[#0B0E14]/80 border-white/5 text-[#94A3B8] hover:border-white/20 hover:text-white'
                        }`}
                      >
                        {/* Car thumbnail photo */}
                        <div className="h-16 w-full overflow-hidden relative">
                          <img 
                            src={body.img} 
                            alt={body.label}
                            className={`w-full h-full object-cover transition-transform duration-500 ${
                              isSelected ? 'scale-110' : 'group-hover/btn:scale-105 opacity-80'
                            }`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#111622] via-transparent to-transparent" />
                        </div>
                        <div className="p-2">
                          <div className="text-[11px] font-bold truncate">{body.label}</div>
                          <div className={`text-[10px] font-mono font-bold mt-0.5 ${isSelected ? 'text-[#F59E0B]' : 'text-slate-500'}`}>
                            {body.sub}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="text-[11px] text-[#64748B] mt-2.5 flex items-center gap-1.5 font-sans">
                  <Compass className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span className="truncate">Platform: {currentEst.model}</span>
                </div>
              </div>

              {/* Dynamic Telemetry Calculation Display */}
              <div className="mt-6 p-5 rounded-xl bg-[#0B0E14] border border-white/10 space-y-3.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#94A3B8]">Selected Atelier Tier:</span>
                  <span className="font-bold text-[#F8FAFC]">Signature Multi-Stage Detail</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#94A3B8]">Chassis Multiplier:</span>
                  <span className="font-mono text-[#F59E0B] font-bold">{currentEst.multiplier}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#94A3B8]">Estimated Cleanroom Time:</span>
                  <span className="font-mono text-[#CBD5E1] font-bold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
                    {currentEst.duration}
                  </span>
                </div>
                <div className="pt-4 border-t border-white/10 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#94A3B8] uppercase block font-mono">Authoritative Total:</span>
                    <span className="text-[10px] text-[#64748B]">Paint leveling + steam decon</span>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-[#F59E0B] font-mono tracking-tight">
                      ${currentEst.price}
                    </div>
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
                    className="w-full glow-amber-sm font-bold"
                  >
                    Customize in 3D Configurator
                  </Button>
                </Link>
              </div>

              {/* Bay Availability Status Footer */}
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-[#94A3B8]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                  <span>Bay 1: Ready For Intake</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                  <span>Bay 2: Active Ceramic Cure</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
