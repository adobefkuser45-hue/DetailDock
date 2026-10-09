import React from 'react';
import { 
  ShieldCheck, 
  Lightbulb, 
  Cpu, 
  Radio, 
  CheckCircle2, 
  Thermometer, 
  Eye, 
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
    icon: Cpu,
    tag: 'Authoritative Architecture',
    title: 'Deterministic Server-Side Pricing Engine',
    desc: 'No vague ballpark quotes or bait-and-switch invoicing. Body style multipliers and add-ons are authoritatively calculated and locked by the server upon booking.',
    stat: '100%',
    statLabel: 'Price Certainty'
  },
  {
    icon: Radio,
    tag: 'Customer Transparency',
    title: 'Live Job Telemetry Tracking (DD-XXXXXX)',
    desc: 'Every booking receives a unique tracking code. Monitor your vehicle’s journey through 5 stages in real time without ever needing to call the front desk.',
    stat: '5 Stages',
    statLabel: 'Transparent Progress'
  }
];

export const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-[#090C12] border-t border-[#1D2536] relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#0284C7]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#38BDF8] bg-[#38BDF8]/10 px-3.5 py-1.5 rounded-full border border-[#38BDF8]/20 inline-flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            The DetailDock Difference
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mt-4 text-[#F8FAFC]">
            Engineered Detailing. Zero Compromises.
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] mt-3">
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
                className="p-8 rounded-2xl bg-[#101522] border border-[#1D2536] hover:border-[#38BDF8]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#0284C7]/15 border border-[#0284C7]/30 flex items-center justify-center text-[#38BDF8] group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#94A3B8] px-2.5 py-1 rounded bg-[#161D2E] border border-[#1D2536]">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-[#38BDF8] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1D2536] flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-extrabold text-[#38BDF8] font-mono">
                      {pillar.stat}
                    </div>
                    <div className="text-xs text-[#64748B] font-semibold">
                      {pillar.statLabel}
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#161D2E] flex items-center justify-center text-[#94A3B8] group-hover:text-[#38BDF8] transition-colors">
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
