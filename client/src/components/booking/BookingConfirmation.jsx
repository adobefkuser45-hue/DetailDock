import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Copy, 
  Check, 
  ArrowRight, 
  Calendar, 
  Warehouse, 
  Car, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  ExternalLink 
} from 'lucide-react';
import { Button } from '../common/Button.jsx';
import { Badge } from '../common/Badge.jsx';

export const BookingConfirmation = ({ booking }) => {
  const [copied, setCopied] = useState(false);

  const bookingCode = booking?.bookingCode || 'DD-SAMPLE';
  const assignedBay = booking?.assignedBay || 1;
  const scheduledDate = booking?.scheduledDate ? new Date(booking.scheduledDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }) : 'Scheduled Date';
  const scheduledTimeSlot = booking?.scheduledTimeSlot || '09:00 AM';
  const vehicle = booking?.vehicle || {};
  const pricing = booking?.pricingSnapshot || {};

  const handleCopy = () => {
    navigator.clipboard.writeText(bookingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 text-center py-6">
      
      {/* Success Badge & Header */}
      <div>
        <div className="w-16 h-16 rounded-2xl bg-[#10B981]/20 border border-[#10B981]/40 flex items-center justify-center text-[#10B981] mx-auto mb-4 shadow-xl shadow-[#10B981]/15 animate-bounce">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#10B981] bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/20">
          Bay Capacity Reserved
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight mt-3">
          Appointment Confirmed & Secured
        </h2>
        <p className="text-sm text-[#94A3B8] max-w-xl mx-auto mt-2">
          Your vehicle has been allotted dedicated time in our climate-controlled atelier. A confirmation receipt has been dispatched.
        </p>
      </div>

      {/* Signature Tracking Code Card */}
      <div className="p-8 rounded-3xl bg-[#101522] border-2 border-[#38BDF8] shadow-2xl shadow-[#0284C7]/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#0284C7]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-xs uppercase font-bold text-[#94A3B8] tracking-widest font-mono mb-2">
          Your Public Telemetry Tracking Code
        </div>

        {/* Large Prominent Code Display */}
        <div className="flex items-center justify-center gap-3 my-4">
          <span className="text-4xl sm:text-5xl font-black font-mono text-[#38BDF8] tracking-widest drop-shadow-[0_0_20px_rgba(56,189,248,0.4)]">
            {bookingCode}
          </span>
          <button
            onClick={handleCopy}
            className="p-2.5 rounded-xl bg-[#161D2E] border border-[#2A364E] text-[#94A3B8] hover:text-[#38BDF8] hover:border-[#38BDF8] transition-all"
            title="Copy Tracking Code"
          >
            {copied ? <Check className="w-5 h-5 text-[#10B981]" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>

        <p className="text-xs text-[#64748B] max-w-md mx-auto mb-6">
          Bookmark or save this code. You can view real-time stage transitions (Intake, Decon, Machine Polish, Infrared Cure, Showroom Ready) at any time.
        </p>

        {/* Slot & Bay Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#1D2536] text-left text-xs">
          <div className="p-3.5 rounded-xl bg-[#090C12] border border-[#1D2536]">
            <div className="text-[#64748B] flex items-center gap-1.5 mb-1">
              <Calendar className="w-3.5 h-3.5 text-[#38BDF8]" />
              Scheduled Slot
            </div>
            <div className="font-bold text-white">{scheduledDate}</div>
            <div className="text-[11px] font-mono text-[#38BDF8]">{scheduledTimeSlot}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#090C12] border border-[#1D2536]">
            <div className="text-[#64748B] flex items-center gap-1.5 mb-1">
              <Warehouse className="w-3.5 h-3.5 text-[#F59E0B]" />
              Assigned Bay
            </div>
            <div className="font-bold text-white">Cleanroom Bay {assignedBay}</div>
            <div className="text-[11px] text-[#10B981]">HEPA Positive Pressure</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#090C12] border border-[#1D2536]">
            <div className="text-[#64748B] flex items-center gap-1.5 mb-1">
              <Car className="w-3.5 h-3.5 text-[#10B981]" />
              Vehicle
            </div>
            <div className="font-bold text-white truncate">{vehicle.year} {vehicle.make} {vehicle.model}</div>
            <div className="text-[11px] text-[#64748B]">{vehicle.color || 'Standard Finish'}</div>
          </div>
        </div>
      </div>

      {/* Concierge Intake Instructions */}
      <div className="p-6 rounded-2xl bg-[#101522] border border-[#1D2536] text-left text-xs space-y-3">
        <h4 className="font-bold uppercase tracking-wider text-white flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#38BDF8]" />
          Drop-Off & Intake Instructions
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[#94A3B8] pt-2">
          <div>
            <div className="font-semibold text-white">Atelier Location:</div>
            <div>DetailDock Cleanroom Studio</div>
            <div>2400 E 5th St, Austin, TX 78702</div>
          </div>
          <div>
            <div className="font-semibold text-white">Arrival Protocol:</div>
            <div>Please arrive 10 minutes prior to your slot ({scheduledTimeSlot}). Direct bay check-in via concierge iPad terminal.</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link to={`/track/${bookingCode}`} className="w-full sm:w-auto">
          <Button
            variant="primary"
            size="lg"
            iconRight={ExternalLink}
            className="w-full sm:w-auto glow-cyan shadow-xl shadow-[#0284C7]/20"
          >
            Track Your Vehicle Live
          </Button>
        </Link>

        <Link to="/" className="w-full sm:w-auto">
          <Button
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
          >
            Return to Homepage
          </Button>
        </Link>
      </div>

    </div>
  );
};
