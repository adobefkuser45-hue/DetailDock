import React from 'react';
import { Star, ShieldCheck, Quote, CheckCircle2, Award } from 'lucide-react';

const TESTIMONIALS = [
  {
    author: 'Alexander R.',
    location: 'Austin, TX',
    vehicle: 'Porsche 911 GT3 RS (992)',
    paintColor: 'Shark Blue',
    service: 'Ultimate 9H Ceramic Shield',
    rating: 5,
    quote: 'The Scangrip inspection revealed micro-swirls my previous detailer claimed were unfixable. DetailDock’s 2-stage compounding brought the clear coat to 98 GU depth. Watching the live tracking updates was incredible peace of mind.',
    verified: true
  },
  {
    author: 'Marcus Vance',
    location: 'Westlake Hills, TX',
    vehicle: 'Ferrari 296 GTB',
    paintColor: 'Rosso Corsa',
    service: 'Signature Multi-Stage Detail + Wheel Coating',
    rating: 5,
    quote: 'Most shops treat exotics like regular cars. DetailDock’s climate-controlled cleanroom and dual-bay capacity showed true atelier discipline. The infrared-cured ceramic gave the paint a deep liquid mirror gloss.',
    verified: true
  },
  {
    author: 'Elena Vance',
    location: 'Downtown Austin, TX',
    vehicle: 'BMW M4 Competition',
    paintColor: 'Isle of Man Green',
    service: 'Signature Multi-Stage Detail',
    rating: 5,
    quote: 'The Smart Package Builder is brilliant. Transparent multipliers with zero awkward negotiations. The steam extraction returned the Merino leather to an authentic OEM matte finish without any greasy shine.',
    verified: true
  },
  {
    author: 'David Koenig',
    location: 'Lakeway, TX',
    vehicle: 'Tesla Model S Plaid',
    paintColor: 'Solid Black',
    service: 'Ultimate 9H Ceramic Shield',
    rating: 5,
    quote: 'Black Tesla clear coat is notoriously soft and easy to mar. DetailDock eliminated all swirl marks and sealed it under 9H ceramic. Water sheets off at 45 mph and maintenance washes take 10 minutes now.',
    verified: true
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-[#090C12] border-t border-[#1D2536] relative overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-[#F59E0B]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B] bg-[#F59E0B]/10 px-3.5 py-1.5 rounded-full border border-[#F59E0B]/20 inline-flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            Verified Atelier Owners
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mt-4 text-[#F8FAFC]">
            Trusted by Discerning Supercar & Performance Drivers
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] mt-3">
            Read real feedback from vehicle owners who demand surgical precision, documented gloss levels, and zero compromise.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-[#101522] border border-[#1D2536] hover:border-[#F59E0B]/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header with Stars and Vehicle Pill */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#F59E0B]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-[#38BDF8] bg-[#0284C7]/10 px-2.5 py-1 rounded-full border border-[#0284C7]/20 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
                    Verified Service
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-sm sm:text-base text-[#E2E8F0] leading-relaxed mb-6 italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Author & Vehicle Details */}
              <div className="pt-4 border-t border-[#1D2536] flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#F8FAFC] text-sm">
                    {item.author}
                  </div>
                  <div className="text-xs text-[#94A3B8] mt-0.5">
                    {item.vehicle} • <span className="text-[#64748B]">{item.paintColor}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[11px] font-mono text-[#94A3B8]">
                    {item.location}
                  </div>
                  <div className="text-[11px] text-[#F59E0B] font-semibold mt-0.5">
                    {item.service.split('+')[0]}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Atelier Guarantee Bar */}
        <div className="mt-12 p-6 rounded-2xl bg-[#161D2E] border border-[#2A364E] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center text-[#10B981] flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-base font-bold text-white">100% Paint Defect Elimination Guarantee</div>
              <div className="text-xs text-[#94A3B8]">If you are not satisfied during the final Scangrip inspection, we repolish at no charge.</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#38BDF8] bg-[#101522] px-4 py-2 rounded-xl border border-[#1D2536]">
            5.0 / 5.0 RATING • 140+ VEHICLES PROTECTED
          </div>
        </div>

      </div>
    </section>
  );
};
