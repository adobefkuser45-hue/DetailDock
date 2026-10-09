import React from 'react';
import { 
  Sliders, 
  CalendarCheck, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react';

const STEPS = [
  {
    step: '01',
    icon: Sliders,
    title: 'Configure Your Spec',
    desc: 'Select your vehicle chassis, choose between essential decon or 9H ceramic packages, and add custom treatments with transparent live pricing.',
    meta: 'Dynamic Pricing Engine',
    img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=600&auto=format&fit=crop'
  },
  {
    step: '02',
    icon: CalendarCheck,
    title: 'Reserve Guaranteed Bay',
    desc: 'Select an open date and time slot. Our server guards double-bay capacity to ensure dedicated technician focus without vehicle congestion.',
    meta: 'Dual Bay Scheduling',
    img: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=600&auto=format&fit=crop'
  },
  {
    step: '03',
    icon: Sparkles,
    title: 'Precision Treatment',
    desc: 'Vehicle enters Bay 1 or Bay 2. Decontamination, multi-stage rotary machine compounding, and shortwave IR ceramic curing in a cleanroom.',
    meta: 'Infrared Cured 9H',
    img: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=600&auto=format&fit=crop'
  },
  {
    step: '04',
    icon: ShieldCheck,
    title: 'Track & Handover',
    desc: 'Track live stage progress using your code (DD-XXXXXX). Receive your serialized warranty certificate and inspection report upon handover.',
    meta: 'Live Job Telemetry',
    img: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=600&auto=format&fit=crop'
  }
];

export const ProcessTimeline = () => {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B] bg-[#F59E0B]/10 px-4 py-1.5 rounded-full border border-[#F59E0B]/25 inline-flex items-center gap-2">
          <CalendarCheck className="w-3.5 h-3.5 text-[#F59E0B]" />
          The Client Journey
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.03em] mt-5 text-[#F8FAFC] font-display">
          From Online Spec to Concourse Mirror
        </h2>
        <p className="text-sm sm:text-base text-[#94A3B8] mt-3 font-normal">
          Our four-stage workflow eliminates the uncertainty of traditional automotive service shops with complete transparency.
        </p>
      </div>

      {/* Steps Flow Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {STEPS.map((step, idx) => {
          const IconComp = step.icon;
          return (
            <div 
              key={idx}
              className="relative rounded-2xl bg-[#111622] border border-white/10 hover:border-[#F59E0B]/50 transition-all duration-300 flex flex-col justify-between group shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden card-hover"
            >
              {/* Step Image Header */}
              <div className="h-36 w-full overflow-hidden relative image-zoom-container">
                <img 
                  src={step.img} 
                  alt={step.title}
                  className="w-full h-full object-cover object-center opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111622] via-[#111622]/40 to-transparent" />
                
                {/* Step Number Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-[#0B0E14]/85 border border-white/15 text-xs font-black font-mono text-[#F59E0B] shadow-md backdrop-blur-md">
                  STEP {step.step}
                </div>

                {/* Floating Step Icon */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-[#0B0E14]/85 border border-white/15 flex items-center justify-center text-[#F59E0B] shadow-md backdrop-blur-md">
                  <IconComp className="w-4 h-4" />
                </div>
              </div>

              {/* Step Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#F59E0B] transition-colors font-display">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-6 font-normal">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#94A3B8]">
                  <span>{step.meta}</span>
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
