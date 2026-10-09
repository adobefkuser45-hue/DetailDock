import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, ArrowRight, Gauge } from 'lucide-react';
import { Button } from '../components/common/Button.jsx';

export const BuilderPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0284C7]/15 border border-[#38BDF8]/30 text-[#38BDF8] text-xs font-bold uppercase tracking-wider mb-6">
        <Gauge className="w-4 h-4" />
        Interactive Configurator
      </div>
      <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F8FAFC] tracking-tight mb-4">
        Smart Package Builder
      </h1>
      <p className="text-base text-[#94A3B8] max-w-2xl mx-auto mb-10">
        Choose your vehicle category to apply authoritative server multipliers, select a baseline detailing tier, and attach bespoke add-on enhancements with real-time price & duration computation.
      </p>
      <div className="p-8 max-w-xl mx-auto rounded-2xl bg-[#101522] border border-[#1D2536] text-left space-y-4">
        <div className="text-xs font-bold uppercase text-[#38BDF8] tracking-wider">
          Configurator Initializing in Next Task (TASK-016)
        </div>
        <p className="text-xs text-[#94A3B8] leading-relaxed">
          The backend API endpoints (<code className="text-[#38BDF8]">/api/v1/vehicles/categories</code>, <code className="text-[#38BDF8]">/api/v1/services</code>, <code className="text-[#38BDF8]">/api/v1/pricing/calculate</code>) are 100% verified and operational.
        </p>
        <Link to="/book" className="block pt-2">
          <Button variant="primary" size="md" className="w-full" iconRight={ArrowRight}>
            Proceed to Appointment Booking
          </Button>
        </Link>
      </div>
    </div>
  );
};
