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
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section className="py-24 bg-[#08090C] border-t border-white/10 relative overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 px-4 py-1.5 rounded-full border border-[#D4AF37]/25 inline-flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
            Verified Concourse Owners
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.03em] mt-5 text-[#F8FAFC] font-display">
            Trusted by Discerning Supercar & Performance Drivers
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] mt-3 font-normal">
            Read real feedback from vehicle owners who demand surgical precision, documented gloss levels, and zero compromise.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              onMouseMove={handleCardMouseMove}
              className="p-8 sm:p-10 rounded-2xl bg-[#0E1017] border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col justify-between relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] group"
            >
              {/* Specular Highlight */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(212, 175, 55, 0.08), transparent 40%)'
                }}
              />

              <div>
                {/* Header with Stars and Vehicle Pill */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1 text-[#D4AF37]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/25 flex items-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                    Verified Client
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-sm sm:text-base text-[#E2E8F0] leading-relaxed mb-6 italic font-normal">
                  "{item.quote}"
                </p>
              </div>

              {/* Author & Vehicle Details */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#F8FAFC] text-sm font-display">
                    {item.author}
                  </div>
                  <div className="text-xs text-[#94A3B8]">
                    {item.location}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-[#CBD5E1] font-mono">
                    {item.vehicle}
                  </div>
                  <div className="text-[11px] text-[#D4AF37] font-mono">
                    {item.service}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
