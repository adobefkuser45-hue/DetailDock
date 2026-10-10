import React from 'react';
import { 
  ShieldCheck, 
  Lightbulb, 
  Cpu, 
  Radio, 
  CheckCircle2, 
  Thermometer, 
  Award 
} from 'lucide-react';

const PILLARS = [
  {
    icon: Thermometer,
    tag: 'Climate & Air Quality',
    title: 'Dual Climate-Controlled Cleanroom Bays',
    desc: 'Ceramic coatings fail when cured in dusty or humid ambient environments. Our sealed atelier maintains 68°F and 45% relative humidity with positive-pressure HEPA filtration.',
    stat: '99.97%',
    statLabel: 'Particulate Filtration'
  },
  {
    icon: Lightbulb,
    tag: 'Optical Inspection',
    title: 'Tunable 96+ CRI Scangrip Lighting',
    desc: 'Swirl marks and micro-scratches are invisible under standard fluorescent shop fixtures. We inspect every square inch under dual 3000K-6000K high-CRI defect spotlights.',
    stat: '96+ CRI',
    statLabel: 'True Paint Defect Reveal'
  },
  {
    icon: ShieldCheck,
    tag: 'Studio Pricing Guarantee',
    title: 'Guaranteed Upfront Studio Rates',
    desc: 'No vague ballpark quotes or bait-and-switch invoicing. Body style multipliers and specialized add-ons are completely transparent and locked upon reservation.',
    stat: '100%',
    statLabel: 'Price Certainty'
  },
  {
    icon: Radio,
    tag: 'Live Stage Tracking',
    title: 'Real-Time Atelier Progress Portal',
    desc: 'Every reservation receives a unique tracking code (DD-XXXXXX). Monitor your vehicle’s journey through 5 detailing stages in real time from your phone.',
    stat: '5 Stages',
    statLabel: 'Transparent Progress'
  }
];

export const WhyChooseUs = () => {
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section className="py-24 bg-[#0B0E14] border-t border-white/10 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#F59E0B]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B] bg-[#F59E0B]/10 px-4 py-1.5 rounded-full border border-[#F59E0B]/25 inline-flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
            The DetailDock Difference
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.03em] mt-5 text-[#F8FAFC] font-display">
            Engineered Detailing. Zero Compromises.
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] mt-3 font-normal">
            Most detailing shops operate in open garages with unpredictable scheduling. We engineered our atelier around sterile cleanroom conditions and transparent full-stack software.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PILLARS.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <div 
                key={idx}
                onMouseMove={handleCardMouseMove}
                className="p-8 sm:p-10 rounded-2xl bg-[#111622] border border-white/10 hover:border-[#F59E0B]/50 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)] card-hover"
              >
                {/* Specular Highlight */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(245, 158, 11, 0.08), transparent 40%)'
                  }}
                />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#F59E0B] group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#CBD5E1] px-3 py-1 rounded-full bg-[#161D2A] border border-white/10">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-[#F59E0B] transition-colors font-display">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed mb-6 font-normal">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-black text-[#F59E0B] font-mono tracking-tight">
                      {pillar.stat}
                    </div>
                    <div className="text-xs text-[#94A3B8] font-medium mt-0.5">
                      {pillar.statLabel}
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-[#161D2A] border border-white/5 flex items-center justify-center text-[#10B981]">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
