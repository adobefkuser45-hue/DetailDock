import React from 'react';
import { 
  Sliders, 
  CalendarCheck, 
  ShieldAlert, 
  Sparkles, 
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

const STEPS = [
  {
    step: '01',
    icon: Sliders,
    title: 'Configure Your Spec',
    desc: 'Select your vehicle chassis, choose between essential decon or 9H ceramic packages, and add custom treatments with transparent live pricing.',
    meta: 'Dynamic Pricing Engine'
  },
  {
    step: '02',
    icon: CalendarCheck,
    title: 'Reserve Guaranteed Bay',
    desc: 'Select an open date and time slot. Our server guards double-bay capacity to ensure dedicated technician focus without vehicle congestion.',
    meta: 'Dual Bay Scheduling'
  },
  {
    step: '03',
    icon: Sparkles,
    title: 'Precision Treatment',
    desc: 'Vehicle enters Bay 1 or Bay 2. Decontamination, multi-stage rotary machine compounding, and shortwave IR ceramic curing in a cleanroom.',
    meta: 'Infrared Cured 9H'
  },
  {
    step: '04',
    icon: ShieldCheck,
    title: 'Track & Handover',
    desc: 'Track live stage progress using your code (DD-XXXXXX). Receive your serialized warranty certificate and inspection report upon handover.',
    meta: 'Live Job Telemetry'
  }
];

export const ProcessTimeline = () => {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-[#38BDF8] bg-[#38BDF8]/10 px-3.5 py-1.5 rounded-full border border-[#38BDF8]/20 inline-flex items-center gap-1.5">
          <CalendarCheck className="w-3.5 h-3.5" />
          The Client Experience
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mt-4 text-[#F8FAFC]">
          From Online Spec to Showroom Mirror
        </h2>
        <p className="text-sm sm:text-base text-[#94A3B8] mt-3">
          Our four-stage workflow eliminates the uncertainty of traditional automotive service shops.
        </p>
      </div>

      {/* Steps Flow Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {STEPS.map((step, idx) => {
          const IconComp = step.icon;
          return (
            <div 
              key={idx}
              className="relative p-6 rounded-2xl bg-[#101522] border border-[#1D2536] hover:border-[#38BDF8]/40 transition-all flex flex-col justify-between group"
            >
              {/* Connector line for large screens */}
              {idx < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-3 w-6 h-[2px] bg-[#2A364E] z-10" />
              )}

              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-2xl font-extrabold font-mono text-[#38BDF8]">
                    {step.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#161D2E] border border-[#2A364E] flex items-center justify-center text-[#94A3B8] group-hover:text-[#38BDF8] group-hover:border-[#38BDF8]/40 transition-all">
                    <IconComp className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#38BDF8] transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-6">
                  {step.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#1D2536] flex items-center justify-between text-[11px] font-mono text-[#64748B]">
                <span>{step.meta}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
