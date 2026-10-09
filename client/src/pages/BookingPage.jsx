import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import { Button } from '../components/common/Button.jsx';

export const BookingPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/30 text-[#F59E0B] text-xs font-bold uppercase tracking-wider mb-6">
        <Calendar className="w-4 h-4" />
        Atelier Bay Reservation
      </div>
      <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F8FAFC] tracking-tight mb-4">
        Reserve Your Detailing Slot
      </h1>
      <p className="text-base text-[#94A3B8] max-w-2xl mx-auto mb-10">
        Live double-bay calendar scheduling with capacity protection. Guaranteed zero double bookings across Bay 1 and Bay 2.
      </p>
      <div className="p-8 max-w-xl mx-auto rounded-2xl bg-[#101522] border border-[#1D2536] text-left space-y-4">
        <div className="text-xs font-bold uppercase text-[#F59E0B] tracking-wider">
          Multi-Step Booking Flow Scheduled for TASK-017
        </div>
        <p className="text-xs text-[#94A3B8] leading-relaxed">
          The slot availability endpoints (<code className="text-[#38BDF8]">/api/v1/availability</code>) and booking creation (<code className="text-[#38BDF8]">/api/v1/bookings</code>) are fully tested and ready.
        </p>
        <Link to="/track" className="block pt-2">
          <Button variant="secondary" size="md" className="w-full" iconRight={ArrowRight}>
            Track Existing Booking
          </Button>
        </Link>
      </div>
    </div>
  );
};
