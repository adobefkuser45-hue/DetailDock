import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Layers, 
  Activity, 
  Award, 
  FileText, 
  Thermometer,
  Zap,
  Gauge
} from 'lucide-react';
import { Button } from '../common/Button.jsx';
import { getServices } from '../../services/api.js';

const FALLBACK_PACKAGES = [
  {
    _id: 'p-ess-01',
    name: 'Essential Clean & Decon',
    tagline: 'Exterior decontamination and interior rejuvenation for well-maintained vehicles.',
    category: 'Essential',
    basePrice: 149,
    estimatedDurationMinutes: 90,
    isPopular: false,
    warrantyMonths: 3,
    features: [
      'pH-Neutral Citrus Pre-Wash & Dual-Bucket Foam Wash',
      'Chemical Iron Fallout & Road Tar Dissolution',
      'Wheel Barrel & Caliper Deep Clean with Acid-Free Gel',
      'Cabin Vacuum & Dashboard Satin Anti-Static Wipe',
      '3-Month Hydrophobic SiO2 Sealant Application'
    ]
  },
  {
    _id: 'p-sig-02',
    name: 'Signature Multi-Stage Detail',
    tagline: 'Single-stage rotary machine clarity polish eliminating 65-75% swirl marks.',
    category: 'Correction',
    basePrice: 289,
    estimatedDurationMinutes: 180,
    isPopular: true,
    warrantyMonths: 12,
    features: [
      'Full Multi-Stage Chemical & Mechanical Clay Decon',
      'Single-Stage Machine Polish (65-75% Swirl Elimination)',
      'Hot Water Interior Steam Extraction & Stain Treatment',
      'Leather Conditioning with OEM Matte Finish',
      '12-Month Ceramic Spray Coating Protection',
      'Engine Bay Surface Steam & Dressing'
    ]
  },
  {
    _id: 'p-cer-03',
    name: 'Ultimate 9H Ceramic Shield',
    tagline: 'Dual-stage heavy compounding followed by true 9H professional ceramic glass coating.',
    category: 'Pinnacle Ceramic',
    basePrice: 499,
    estimatedDurationMinutes: 270,
    isPopular: false,
    warrantyMonths: 36,
    features: [
      '2-Stage Heavy Cut Compounding & Jeweling Polish (90%+ Elimination)',
      'Scangrip High-CRI Swirl & Defect Inspection Report',
      'Dual-Layer Pro-Grade 9H Nano-Ceramic Glass Coating',
      'Infrared (IR) Shortwave Heat Lamp Curing in Cleanroom',
      '3-Year Serialized Warranty Certificate',
      'Full Cockpit Leather Ceramic Coating Treatment'
    ]
  }
];

export const ServiceGrid = () => {
  const [packages, setPackages] = useState(FALLBACK_PACKAGES);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchLiveServices = async () => {
      try {
        setIsLoading(true);
        const res = await getServices();
        if (isMounted && res && res.data && Array.isArray(res.data) && res.data.length > 0) {
          setPackages(res.data);
        }
      } catch (err) {
        console.warn('Using fallback studio service packages:', err.message);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchLiveServices();
    return () => { isMounted = false; };
  }, []);

  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const signaturePkg = packages.find(p => p.name.includes('Signature') || p.isPopular) || packages[1] || packages[0];
  const ceramicPkg = packages.find(p => p.name.includes('Ceramic') || p.name.includes('Ultimate')) || packages[2] || packages[0];
  const essentialPkg = packages.find(p => p.name.includes('Essential') || p.basePrice < 200) || packages[0];

  return (
    <section id="services" className="py-24 bg-[#0B0E14] border-t border-white/10 relative overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#F59E0B]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B] bg-[#F59E0B]/10 px-4 py-1.5 rounded-full border border-[#F59E0B]/25 inline-flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            Atelier Preservation Spectrum
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-[-0.03em] mt-5 text-[#F8FAFC] font-display">
            Asymmetric Concourse Bento
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] mt-3 font-normal">
            Every vehicle is staged in our climate-controlled dual cleanroom bays under 96+ CRI Scangrip inspection lights. Explore our precision services and authoritative pricing below.
          </p>
        </div>

        {/* 4-Tile Asymmetric Photographic Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* BENTO TILE 1: Signature Multi-Stage Detail (Large Hero Card, Spans 2 Cols) */}
          <div 
            onMouseMove={handleCardMouseMove}
            className="lg:col-span-2 relative rounded-2xl bg-[#111622] border border-white/10 p-8 sm:p-10 flex flex-col justify-between overflow-hidden group hover:border-[#F59E0B]/50 transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
          >
            {/* Photographic Backdrop with Gradient Fade */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <img 
                src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1000&auto=format&fit=crop" 
                alt="Rotary Machine Compounding & Paint Correction"
                className="w-full h-full object-cover object-center opacity-25 group-hover:scale-105 group-hover:opacity-35 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111622] via-[#111622]/90 to-[#111622]/80" />
            </div>

            {/* Specular Mouse-Tracking Highlight */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              style={{
                background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(245, 158, 11, 0.1), transparent 40%)'
              }}
            />

            {/* Popular Atelier Pill */}
            <div className="absolute top-6 right-6 z-20">
              <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-[#0B0E14] text-[10px] font-black uppercase tracking-widest shadow-md flex items-center gap-1.5 font-mono">
                <Sparkles className="w-3 h-3 fill-current" />
                Atelier Choice • Stage 02
              </span>
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold font-mono uppercase tracking-widest text-[#F59E0B]">
                  Flagship Paint Restoration
                </span>
                <span className="text-white/20">•</span>
                <span className="text-xs font-mono text-[#94A3B8] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
                  {signaturePkg.estimatedDurationMinutes} Mins Cleanroom Duration
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight mb-3 font-display">
                {signaturePkg.name}
              </h3>
              
              <p className="text-sm text-[#94A3B8] leading-relaxed max-w-xl mb-6 font-normal">
                {signaturePkg.tagline || 'Single-stage rotary machine clarity polish eliminating 65-75% swirl marks with deep chemical decon and interior hot-water extraction.'}
              </p>

              {/* Price & Guarantee Pill */}
              <div className="flex flex-wrap items-baseline gap-4 mb-8 pb-6 border-b border-white/10">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black font-mono text-[#F59E0B] tracking-tight">
                    ${signaturePkg.basePrice}
                  </span>
                  <span className="text-xs text-[#94A3B8]">/ coupe & sedan baseline</span>
                </div>
                <div className="text-xs font-mono text-[#CBD5E1] bg-white/5 px-3 py-1 rounded-full border border-white/10">
                  {signaturePkg.warrantyMonths || 12}-Month Coating Shield
                </div>
              </div>

              {/* Two-Column Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                {(signaturePkg.features || []).map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#CBD5E1]">
                    <CheckCircle2 className="w-4 h-4 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
              <Link to={`/builder?package=${signaturePkg._id}`} className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="md"
                  iconRight={ArrowRight}
                  className="w-full sm:w-auto glow-amber-sm font-bold"
                >
                  Configure in 3D Builder
                </Button>
              </Link>
              <div className="text-xs text-[#64748B] font-mono">
                Includes Paint Depth Audit + Scangrip Report
              </div>
            </div>
          </div>

          {/* BENTO TILE 2: Ultrasonic Paint Depth Telemetry (Square Tech Card, 1 Col) */}
          <div 
            onMouseMove={handleCardMouseMove}
            className="lg:col-span-1 relative rounded-2xl bg-[#111622] border border-white/10 p-8 flex flex-col justify-between overflow-hidden group hover:border-white/30 transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
          >
            {/* Background Car Image */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <img 
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop" 
                alt="Paint Sensor HUD"
                className="w-full h-full object-cover opacity-20 group-hover:scale-105 group-hover:opacity-30 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111622] via-[#111622]/90 to-[#111622]/80" />
            </div>

            {/* Specular Highlight */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              style={{
                background: 'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.05), transparent 40%)'
              }}
            />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#F59E0B]">
                  <Activity className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#10B981] bg-[#10B981]/10 px-2.5 py-1 rounded-full border border-[#10B981]/25">
                  Live Sensor Audit
                </span>
              </div>

              <h4 className="text-xl font-bold text-[#F8FAFC] tracking-tight mb-2 font-display">
                Ultrasonic Depth Telemetry
              </h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed mb-6 font-normal">
                PosiTector electromagnetic paint thickness mapping before every rotary pass ensures clear coat safety.
              </p>

              {/* Simulated Gauge Readout Pod */}
              <div className="p-4 rounded-xl bg-[#0B0E14]/90 border border-white/10 space-y-3 font-mono">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#94A3B8]">Clear Coat Substrate:</span>
                  <span className="text-[#F8FAFC] font-bold">124 µm (Healthy)</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-[#F59E0B] to-[#10B981] h-full w-[82%]" />
                </div>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-[#94A3B8]">Gloss Meter Reading:</span>
                  <span className="text-[#F59E0B] font-bold flex items-center gap-1">
                    <Gauge className="w-3.5 h-3.5" /> 98.4 GU (Mirror)
                  </span>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#94A3B8]">
              <span>Tolerance Check:</span>
              <span className="text-[#10B981] font-mono font-bold">Passed (Zero Burn Risk)</span>
            </div>
          </div>

          {/* BENTO TILE 3: Pinnacle 9H Ceramic Shield Ribbon (Spans 2 Cols) */}
          <div 
            onMouseMove={handleCardMouseMove}
            className="lg:col-span-2 relative rounded-2xl bg-[#111622] border border-white/10 p-8 sm:p-10 flex flex-col justify-between overflow-hidden group hover:border-[#F59E0B]/50 transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
          >
            {/* Macro Water Beading Photography Backdrop */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <img 
                src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=1000&auto=format&fit=crop" 
                alt="Ceramic Coating Hydrophobic Water Beading"
                className="w-full h-full object-cover object-center opacity-25 group-hover:scale-105 group-hover:opacity-35 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111622] via-[#111622]/90 to-[#111622]/80" />
            </div>

            {/* Specular Highlight */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              style={{
                background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(245, 158, 11, 0.1), transparent 40%)'
              }}
            />

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#F59E0B] font-mono mb-2">
                    <Award className="w-4 h-4 text-[#F59E0B]" />
                    Pinnacle Coating • 36-Month Certified
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] tracking-tight font-display">
                    {ceramicPkg.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8] mt-2 max-w-lg leading-relaxed font-normal">
                    Dual-layer 9H nano-ceramic glass matrix cured via shortwave infrared heat lamps. Delivers 115° water contact angle and a serialized digital diploma warranty.
                  </p>
                </div>

                <div className="text-left md:text-right flex-shrink-0">
                  <div className="text-3xl sm:text-4xl font-black font-mono text-[#F59E0B]">
                    ${ceramicPkg.basePrice}
                  </div>
                  <div className="text-xs text-[#94A3B8]">baseline tier</div>
                </div>
              </div>

              {/* Feature Ribbon Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
                <div className="p-3 rounded-xl bg-[#0B0E14]/85 border border-white/5 text-center">
                  <div className="text-xs font-mono font-bold text-[#F8FAFC]">115° Contact</div>
                  <div className="text-[10px] text-[#94A3B8] mt-0.5">Ultra-Hydrophobic</div>
                </div>
                <div className="p-3 rounded-xl bg-[#0B0E14]/85 border border-white/5 text-center">
                  <div className="text-xs font-mono font-bold text-[#F59E0B]">IR Heat Cured</div>
                  <div className="text-[10px] text-[#94A3B8] mt-0.5">Cleanroom Bay 2</div>
                </div>
                <div className="p-3 rounded-xl bg-[#0B0E14]/85 border border-white/5 text-center">
                  <div className="text-xs font-mono font-bold text-[#CBD5E1]">3-Year PDF</div>
                  <div className="text-[10px] text-[#94A3B8] mt-0.5">Serialized Diploma</div>
                </div>
                <div className="p-3 rounded-xl bg-[#0B0E14]/85 border border-white/5 text-center">
                  <div className="text-xs font-mono font-bold text-[#10B981]">9H Hardness</div>
                  <div className="text-[10px] text-[#94A3B8] mt-0.5">Lab Certified</div>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
              <Link to={`/builder?package=${ceramicPkg._id}`} className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="md"
                  iconRight={ArrowRight}
                  className="w-full sm:w-auto glow-amber-sm font-bold"
                >
                  Configure 9H Ceramic
                </Button>
              </Link>
              <div className="text-xs text-[#64748B] font-mono flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#F59E0B]" />
                Includes Official Digital Warranty Certificate
              </div>
            </div>
          </div>

          {/* BENTO TILE 4: Essential Clean & ISO Cleanroom Environment (1 Col) */}
          <div 
            onMouseMove={handleCardMouseMove}
            className="lg:col-span-1 relative rounded-2xl bg-[#111622] border border-white/10 p-8 flex flex-col justify-between overflow-hidden group hover:border-white/30 transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
          >
            {/* Snow Foam Cannon Photography Backdrop */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <img 
                src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=800&auto=format&fit=crop" 
                alt="Snow Foam Citrus Pre-Wash"
                className="w-full h-full object-cover opacity-25 group-hover:scale-105 group-hover:opacity-35 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111622] via-[#111622]/90 to-[#111622]/80" />
            </div>

            {/* Specular Highlight */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              style={{
                background: 'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.05), transparent 40%)'
              }}
            />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold font-mono uppercase tracking-widest text-[#94A3B8]">
                  Entry Preservation
                </span>
                <span className="text-lg font-black font-mono text-[#F8FAFC]">
                  ${essentialPkg.basePrice}
                </span>
              </div>

              <h4 className="text-xl font-bold text-[#F8FAFC] tracking-tight mb-2 font-display">
                {essentialPkg.name}
              </h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed mb-6 font-normal">
                Dual-bucket pH-neutral foam bath, chemical iron decon, acid-free wheel gel, and interior anti-static satin wipe.
              </p>

              {/* Cleanroom Specs Widget */}
              <div className="p-4 rounded-xl bg-[#0B0E14]/90 border border-white/10 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between text-[#94A3B8]">
                  <span className="flex items-center gap-1.5">
                    <Thermometer className="w-3.5 h-3.5 text-[#F59E0B]" /> Climate Control:
                  </span>
                  <span className="text-[#F8FAFC] font-bold">68°F / 45% RH</span>
                </div>
                <div className="flex items-center justify-between text-[#94A3B8]">
                  <span>HEPA Air Filtration:</span>
                  <span className="text-[#10B981] font-bold">ISO-6 Certified</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-6 pt-4 border-t border-white/10">
              <Link to={`/builder?package=${essentialPkg._id}`}>
                <Button
                  variant="secondary"
                  size="sm"
                  iconRight={ArrowRight}
                  className="w-full text-xs font-semibold"
                >
                  Configure Essential (${essentialPkg.basePrice})
                </Button>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
