import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Sparkles, MapPin, Clock, Phone } from 'lucide-react';
import { Button } from '../common/Button.jsx';

export const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-[#0B0E14] border-t border-white/10">
      {/* Supercar Showroom Backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1600&auto=format&fit=crop"
          alt="Luxury Studio Showroom"
          className="w-full h-full object-cover object-center opacity-15 mix-blend-luminosity scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-[#0B0E14]/80 to-[#0B0E14]" />
      </div>

      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#F59E0B]/10 rounded-full blur-[160px] pointer-events-none z-0" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B] bg-[#F59E0B]/10 px-4 py-1.5 rounded-full border border-[#F59E0B]/25 inline-flex items-center gap-2 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
          Dedicated Double-Bay Capacity
        </span>

        <h2 className="text-3xl sm:text-5xl font-black text-[#F8FAFC] tracking-[-0.03em] leading-tight mb-6 font-display">
          Elevate Your Vehicle to Concourse Perfection.
        </h2>

        <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
          Book your climate-controlled bay slot today. Dynamic pricing calculated in seconds with zero hidden charges.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link to="/builder" className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="lg"
              iconRight={ArrowRight}
              className="w-full sm:w-auto glow-amber shadow-2xl font-bold"
            >
              Open Smart Package Builder
            </Button>
          </Link>

          <Link to="/book" className="w-full sm:w-auto">
            <Button
              variant="secondary"
              size="lg"
              icon={Calendar}
              className="w-full sm:w-auto border-white/15 hover:border-[#F59E0B]/50"
            >
              Reserve Bay Slot
            </Button>
          </Link>
        </div>

        {/* Quick Studio Facts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-white/10 text-xs text-[#94A3B8]">
          <div className="flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4 text-[#F59E0B]" />
            <span>2400 E 5th St, Austin, TX 78702</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 text-[#F59E0B]" />
            <span>Mon–Sat: 8:00 AM – 6:00 PM</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Phone className="w-4 h-4 text-[#F59E0B]" />
            <span>Direct Atelier Line: (512) 555-DOCK</span>
          </div>
        </div>

      </div>
    </section>
  );
};
