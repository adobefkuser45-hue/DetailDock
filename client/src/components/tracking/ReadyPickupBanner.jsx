import React from 'react';
import { ShieldCheck, MapPin, Phone, Award, Sparkles, Clock, Warehouse } from 'lucide-react';

export const ReadyPickupBanner = ({ status, bayNumber }) => {
  if (status === 'Ready') {
    return (
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#10B981]/15 to-[#0284C7]/15 border-2 border-[#10B981] shadow-2xl text-left space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#10B981]/20 border border-[#10B981]/40 flex items-center justify-center text-[#10B981] flex-shrink-0">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#10B981]">
              Quality Inspection Approved
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
              Your Vehicle is Showroom Ready for Pick-Up!
            </h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 leading-relaxed">
              Final defect verification is complete under 96+ CRI Scangrip inspection lamps. Your vehicle is currently resting in the cleanroom handover bay.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#1D2536] text-xs">
          <div className="flex items-center gap-2 text-[#E2E8F0]">
            <MapPin className="w-4 h-4 text-[#38BDF8]" />
            <span>DetailDock Atelier, 2400 E 5th St, Austin, TX 78702</span>
          </div>
          <div className="flex items-center gap-2 text-[#E2E8F0]">
            <Phone className="w-4 h-4 text-[#38BDF8]" />
            <span>Concierge Line: (512) 555-DOCK</span>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'In Bay') {
    return (
      <div className="p-5 rounded-2xl bg-[#0284C7]/10 border border-[#38BDF8]/40 text-left flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#0284C7]/20 flex items-center justify-center text-[#38BDF8] flex-shrink-0">
          <Warehouse className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h4 className="text-base font-bold text-white">
            Active Detailing in Progress (Cleanroom Bay {bayNumber || 1})
          </h4>
          <p className="text-xs text-[#94A3B8] mt-1">
            Our certified technician is currently executing multi-stage paint compounding and ceramic surface bonding. Live status updates will reflect automatically as inspection phases finish.
          </p>
        </div>
      </div>
    );
  }

  if (status === 'Completed') {
    return (
      <div className="p-6 rounded-2xl bg-[#F59E0B]/10 border border-[#F59E0B]/40 text-left flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/20 flex items-center justify-center text-[#F59E0B] flex-shrink-0">
          <Award className="w-5 h-5 text-[#F59E0B]" />
        </div>
        <div>
          <h4 className="text-base font-bold text-white">
            Service Complete & Warranty Activated
          </h4>
          <p className="text-xs text-[#94A3B8] mt-1">
            Vehicle has been released. Your serialized digital warranty certificate and maintenance guide have been recorded in the atelier registry.
          </p>
        </div>
      </div>
    );
  }

  return null;
};
