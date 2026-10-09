import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Sparkles, MapPin, Clock, Phone } from 'lucide-react';
import { Button } from '../common/Button.jsx';

export const CTASection = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-radial from-[#161D2E]/80 via-[#090C12] to-[#090C12] border-t border-[#1D2536]">
      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#0284C7]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <span className="text-xs font-bold uppercase tracking-widest text-[#38BDF8] bg-[#38BDF8]/10 px-3.5 py-1.5 rounded-full border border-[#38BDF8]/20 inline-flex items-center gap-1.5 mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          Dedicated Double-Bay Capacity
        </span>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F8FAFC] tracking-tight leading-tight mb-6">
          Elevate Your Vehicle to Showroom Perfection.
        </h2>

        <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed mb-10">
          Book your climate-controlled bay slot today. Dynamic pricing calculated in seconds with zero hidden charges.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link to="/builder" className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="lg"
              iconRight={ArrowRight}
              className="w-full sm:w-auto glow-cyan shadow-xl shadow-[#0284C7]/20"
            >
              Open Smart Package Builder
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

        {/* Quick Studio Facts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-[#1D2536] text-xs text-[#94A3B8]">
          <div className="flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4 text-[#38BDF8]" />
            <span>2400 E 5th St, Austin, TX 78702</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 text-[#38BDF8]" />
            <span>Mon–Sat: 8:00 AM – 6:00 PM</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Phone className="w-4 h-4 text-[#38BDF8]" />
            <span>Direct Atelier Line: (512) 555-DOCK</span>
          </div>
        </div>

      </div>
    </section>
  );
};
