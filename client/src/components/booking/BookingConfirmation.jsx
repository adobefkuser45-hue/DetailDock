import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Copy, 
  Check, 
  Calendar, 
  Warehouse, 
  Car, 
  MapPin, 
  ExternalLink,
  FileDown,
  MailCheck,
  CreditCard
} from 'lucide-react';
import { Button } from '../common/Button.jsx';
import { getInvoiceDownloadUrl, resendBookingReceipt } from '../../services/api.js';

export const BookingConfirmation = ({ booking }) => {
  const [copied, setCopied] = useState(false);
  const [resendingEmail, setResendingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState(null);

  const bookingCode = booking?.bookingCode || 'DD-SAMPLE';
  const assignedBay = booking?.assignedBayNumber || booking?.assignedBay || 1;
  const scheduledDate = booking?.scheduledDate ? new Date(booking.scheduledDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }) : 'Scheduled Date';
  const scheduledTimeSlot = booking?.scheduledTimeSlot || '09:00 AM';
  const vehicle = booking?.vehicle || {};
  const totalPrice = booking?.totalPrice || 0;
  const payment = booking?.payment || { status: 'unpaid', method: 'studio_pay', amountPaid: 0 };

  const handleCopy = () => {
    navigator.clipboard.writeText(bookingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResendReceipt = async () => {
    try {
      setResendingEmail(true);
      setEmailStatus(null);
      await resendBookingReceipt(bookingCode);
      setEmailStatus('Receipt emailed successfully!');
      setTimeout(() => setEmailStatus(null), 4000);
    } catch (err) {
      setEmailStatus('Failed to send receipt. Please try again.');
    } finally {
      setResendingEmail(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 text-center py-6">
      
      {/* Success Badge & Header */}
      <div>
        <div className="w-16 h-16 rounded-2xl bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center text-[#10B981] mx-auto mb-4 shadow-xl shadow-[#10B981]/15">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#10B981] bg-[#10B981]/10 px-3.5 py-1 rounded-full border border-[#10B981]/25">
          Bay Capacity Reserved
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-[#F8FAFC] tracking-[-0.03em] mt-3 font-display">
          Appointment Confirmed & Secured
        </h2>
        <p className="text-sm text-[#94A3B8] max-w-xl mx-auto mt-2 font-normal">
          Your vehicle has been allotted dedicated time in our climate-controlled atelier. A transactional receipt has been dispatched.
        </p>
      </div>

      {/* Signature Tracking Code Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#0E1017] border border-[#D4AF37] shadow-[0_0_50px_rgba(212,175,55,0.2)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="text-xs uppercase font-bold text-[#D4AF37] tracking-widest font-mono mb-2">
          Your Public Telemetry Tracking Code
        </div>

        {/* Large Prominent Code Display */}
        <div className="flex items-center justify-center gap-3 my-5">
          <span className="text-4xl sm:text-6xl font-black font-mono text-[#D4AF37] tracking-widest drop-shadow-[0_0_25px_rgba(212,175,55,0.4)]">
            {bookingCode}
          </span>
          <button
            onClick={handleCopy}
            className="p-3 rounded-xl bg-white/5 border border-white/10 text-[#CBD5E1] hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all cursor-pointer tactile-press"
            title="Copy Tracking Code"
          >
            {copied ? <Check className="w-5 h-5 text-[#10B981]" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>

        <p className="text-xs text-[#94A3B8] max-w-md mx-auto mb-8 font-normal">
          Bookmark or save this code. You can view real-time stage transitions (Intake, Decon, Machine Polish, Infrared Cure, Showroom Ready) at any time.
        </p>

        {/* Slot & Bay Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10 text-left text-xs font-mono">
          <div className="p-4 rounded-xl bg-[#08090C] border border-white/10">
            <div className="text-[#94A3B8] flex items-center gap-1.5 mb-1">
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
              Scheduled Slot
            </div>
            <div className="font-bold text-white font-sans">{scheduledDate}</div>
            <div className="text-[11px] font-mono text-[#D4AF37] font-bold">{scheduledTimeSlot}</div>
          </div>

          <div className="p-4 rounded-xl bg-[#08090C] border border-white/10">
            <div className="text-[#94A3B8] flex items-center gap-1.5 mb-1">
              <Warehouse className="w-3.5 h-3.5 text-[#D4AF37]" />
              Assigned Bay
            </div>
            <div className="font-bold text-white font-sans">Cleanroom Bay {assignedBay}</div>
            <div className="text-[11px] text-[#10B981] font-bold">HEPA Positive Pressure</div>
          </div>

          <div className="p-4 rounded-xl bg-[#08090C] border border-white/10">
            <div className="text-[#94A3B8] flex items-center gap-1.5 mb-1">
              <Car className="w-3.5 h-3.5 text-[#D4AF37]" />
              Vehicle
            </div>
            <div className="font-bold text-white truncate font-sans">{vehicle.year} {vehicle.make} {vehicle.model}</div>
            <div className="text-[11px] text-[#94A3B8]">{vehicle.color || 'Standard Finish'}</div>
          </div>
        </div>
      </div>

      {/* Payment & Invoicing Overview Strip */}
      <div className="p-6 sm:p-7 rounded-2xl bg-[#0E1017] border border-white/10 text-left text-xs space-y-4 shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#D4AF37]" />
            <h4 className="font-bold uppercase tracking-wider text-white font-mono">
              Settlement & Official Documentation
            </h4>
          </div>
          <span className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase w-fit ${
            payment.status === 'paid'
              ? 'bg-[#10B981]/15 text-[#34D399] border border-[#10B981]/30'
              : payment.status === 'deposit_paid'
              ? 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30'
              : 'bg-white/5 text-[#CBD5E1] border border-white/10'
          }`}>
            {payment.status === 'paid' ? 'Paid in Full' : payment.status === 'deposit_paid' ? 'Deposit Received' : 'Pay at Studio Arrival'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[#94A3B8]">
          <div className="p-3.5 rounded-xl bg-[#08090C] border border-white/10">
            <span className="text-[#94A3B8] block text-[11px] font-mono">Authorized Total:</span>
            <span className="text-base font-black text-white font-mono">
              ${Number(totalPrice).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#08090C] border border-white/10">
            <span className="text-[#94A3B8] block text-[11px] font-mono">Payment Method:</span>
            <span className="text-base font-bold text-white capitalize font-display">
              {payment.method === 'stripe' ? 'Online Card (Stripe)' : 'Pay on Arrival'}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#08090C] border border-white/10">
            <span className="text-[#94A3B8] block text-[11px] font-mono">Amount Settled:</span>
            <span className="text-base font-black text-[#10B981] font-mono">
              ${Number(payment.amountPaid || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Invoice & Email Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <a
            href={getInvoiceDownloadUrl(bookingCode)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button
              variant="outline"
              size="sm"
              icon={FileDown}
              className="w-full sm:w-auto text-xs border-[#D4AF37]/40 hover:bg-[#D4AF37]/10 text-[#D4AF37]"
            >
              Download Tax Invoice / Receipt (PDF)
            </Button>
          </a>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            icon={MailCheck}
            onClick={handleResendReceipt}
            disabled={resendingEmail}
            className="w-full sm:w-auto text-xs text-[#94A3B8] hover:text-white"
          >
            {resendingEmail ? 'Transmitting...' : 'Resend Email Receipt'}
          </Button>

          {emailStatus && (
            <span className="text-xs text-[#10B981] font-medium font-mono">{emailStatus}</span>
          )}
        </div>
      </div>

      {/* Concierge Intake Instructions */}
      <div className="p-6 sm:p-7 rounded-2xl bg-[#0E1017] border border-white/10 text-left text-xs space-y-3 shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
        <h4 className="font-bold uppercase tracking-wider text-white flex items-center gap-2 font-mono">
          <MapPin className="w-4 h-4 text-[#D4AF37]" />
          Drop-Off & Intake Instructions
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[#94A3B8] pt-2">
          <div>
            <div className="font-bold text-white font-display">Atelier Location:</div>
            <div>DetailDock Cleanroom Studio</div>
            <div>2400 E 5th St, Austin, TX 78702</div>
          </div>
          <div>
            <div className="font-bold text-white font-display">Arrival Protocol:</div>
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
            className="w-full sm:w-auto glow-gold shadow-2xl"
          >
            Launch Live Vehicle Telemetry
          </Button>
        </Link>

        <Link to="/" className="w-full sm:w-auto">
          <Button
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto border-white/10 hover:border-[#D4AF37]/50"
          >
            Return to Homepage
          </Button>
        </Link>
      </div>

    </div>
  );
};
