import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Search, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Copy, 
  Check, 
  ExternalLink, 
  RotateCcw,
  Sparkles, 
  AlertCircle, 
  CreditCard, 
  FileDown, 
  MailCheck,
  Warehouse,
  Gauge,
  Activity
} from 'lucide-react';
import { Button } from '../components/common/Button.jsx';
import { Badge } from '../components/common/Badge.jsx';
import { JobProgressMeter } from '../components/tracking/JobProgressMeter.jsx';
import { JobTelemetryCards } from '../components/tracking/JobTelemetryCards.jsx';
import { JobAuditTimeline } from '../components/tracking/JobAuditTimeline.jsx';
import { ReadyPickupBanner } from '../components/tracking/ReadyPickupBanner.jsx';
import { CommunicationsLogSection } from '../components/tracking/CommunicationsLogSection.jsx';
import { WarrantyCertificateSection } from '../components/tracking/WarrantyCertificateSection.jsx';
import { VehicleInspectionCard } from '../components/tracking/VehicleInspectionCard.jsx';
import { trackBooking, getInvoiceDownloadUrl, resendBookingReceipt } from '../services/api.js';

// Production Showcase Appointment for DD-DEMO01
const DEMO_BOOKING_SHOWCASE = {
  bookingCode: 'DD-DEMO01',
  status: 'In Bay',
  progress: {
    currentStep: 3,
    maxSteps: 5,
    statusLabel: 'In Studio Bay — Multi-Stage Polish & Curing',
    percentage: 60,
    isCancelled: false
  },
  schedule: {
    date: '2026-10-14',
    timeSlot: '09:00 AM',
    bayNumber: 1
  },
  customer: {
    name: 'Alexander Vance',
    maskedEmail: 'a***e@concours-atelier.com',
    maskedPhone: '***-***-8821'
  },
  vehicle: {
    make: 'Porsche',
    model: '911 GT3 RS (Weissach Package)',
    year: 2025,
    category: 'Exotic / High-Performance Coupe',
    paintColor: 'Shark Blue (Gloss)',
    licensePlate: 'TX-DOCK911'
  },
  service: {
    packageTitle: 'Signature Multi-Stage Detail & Dual Ceramic Shield',
    packagePrice: 489,
    addons: [
      { title: 'Ceramic Wheel & Caliper Shield', price: 99, durationMinutes: 45 },
      { title: 'Leather Hydrophobic Barrier', price: 79, durationMinutes: 30 }
    ],
    totalPrice: 667,
    totalDurationMinutes: 255
  },
  payment: {
    status: 'paid',
    method: 'stripe',
    amountPaid: 667,
    depositAmount: 0,
    paidAt: '2026-10-14T09:15:00.000Z'
  },
  timeline: [
    {
      status: 'Pending',
      changedAt: '2026-10-14T08:00:00.000Z',
      note: 'Appointment booking requested online via DetailDock Atelier.'
    },
    {
      status: 'Confirmed',
      changedAt: '2026-10-14T08:30:00.000Z',
      note: 'Cleanroom Bay 1 reserved with dedicated master technician.'
    },
    {
      status: 'In Bay',
      changedAt: '2026-10-14T09:15:00.000Z',
      note: 'Vehicle entered cleanroom bay. Decontamination complete; two-stage machine polish in progress.'
    }
  ],
  communications: [
    {
      channel: 'email',
      recipient: 'alexander@concours-atelier.com',
      message: 'Preservation receipt and Cleanroom Bay 1 confirmation issued for DD-DEMO01.',
      dispatchedAt: '2026-10-14T08:30:00.000Z',
      status: 'dispatched'
    },
    {
      channel: 'sms',
      recipient: '(512) 882-9910',
      message: 'Your 911 GT3 RS has entered Cleanroom Bay 1 for optical paint correction.',
      dispatchedAt: '2026-10-14T09:15:00.000Z',
      status: 'dispatched'
    }
  ],
  createdAt: '2026-10-14T08:00:00.000Z'
};

export const TrackJobPage = () => {
  const { code: urlCode } = useParams();
  const navigate = useNavigate();

  const [inputCode, setInputCode] = useState(urlCode || '');
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [resendingEmail, setResendingEmail] = useState(false);
  const [emailNotice, setEmailNotice] = useState(null);

  const handleResendReceipt = async () => {
    if (!bookingData?.bookingCode) return;
    try {
      setResendingEmail(true);
      setEmailNotice(null);
      await resendBookingReceipt(bookingData.bookingCode);
      setEmailNotice('Receipt sent to customer email!');
      setTimeout(() => setEmailNotice(null), 4000);
    } catch (err) {
      setEmailNotice('Could not send receipt. Please contact studio.');
    } finally {
      setResendingEmail(false);
    }
  };

  const executeTrack = async (searchCode) => {
    const clean = searchCode?.trim().toUpperCase();
    if (!clean) return;

    setLoading(true);
    setError(null);

    try {
      let data = null;
      try {
        data = await trackBooking(clean);
      } catch (apiErr) {
        if (clean === 'DD-DEMO01' || clean === 'DEMO01') {
          data = DEMO_BOOKING_SHOWCASE;
        } else {
          throw apiErr;
        }
      }
      if (!data && (clean === 'DD-DEMO01' || clean === 'DEMO01')) {
        data = DEMO_BOOKING_SHOWCASE;
      }
      setBookingData(data);
      if (urlCode !== clean) {
        navigate(`/track/${encodeURIComponent(clean)}`, { replace: true });
      }
    } catch (err) {
      console.warn('Track query error:', err.message);
      setError(err.message || `No detailing appointment found with code "${clean}". Please verify your 6-character code.`);
      setBookingData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    executeTrack(inputCode);
  };

  useEffect(() => {
    if (urlCode) {
      setInputCode(urlCode);
      executeTrack(urlCode);
    }
  }, [urlCode]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [urlCode, bookingData]);

  const handleCopyCode = () => {
    if (bookingData?.bookingCode) {
      navigator.clipboard.writeText(bookingData.bookingCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full bg-[#0B0E14] text-[#F8FAFC] min-h-screen pt-32 pb-24 sm:pt-36 sm:pb-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#F59E0B] bg-[#F59E0B]/10 px-3.5 py-1.5 rounded-full border border-[#F59E0B]/25 inline-flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            Live Client Telemetry Portal
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#F8FAFC] tracking-[-0.03em] mt-3 font-display">
            Track Vehicle Treatment
          </h1>
          <p className="text-sm sm:text-base text-[#94A3B8] mt-2 font-normal">
            Inspect real-time cleanroom bay status, paint correction progression, and technician inspection notes using your unique 6-character booking code.
          </p>
        </div>

        {/* Search Bar Cockpit */}
        <div className="max-w-2xl mx-auto">
          <form 
            onSubmit={handleFormSubmit}
            className="p-3 sm:p-4 rounded-2xl bg-[#111622] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col sm:flex-row gap-3 hover:border-[#F59E0B]/30 transition-all"
          >
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                placeholder="Enter Code e.g. DD-XXXXXX"
                className="w-full bg-[#0B0E14] border border-white/10 focus:border-[#F59E0B] rounded-xl pl-11 pr-4 py-3 text-sm font-mono text-[#F8FAFC] placeholder-[#64748B] uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-[#F59E0B]"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={loading}
              iconRight={ArrowRight}
              className="glow-amber"
            >
              Track Vehicle
            </Button>
          </form>

          {/* Quick Demo Code Suggestion Helper */}
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-[#64748B] font-mono">
            <span>Need a code to test?</span>
            <button
              type="button"
              onClick={() => {
                setInputCode('DD-DEMO01');
                executeTrack('DD-DEMO01');
              }}
              className="text-[#F59E0B] hover:underline font-bold cursor-pointer"
            >
              Try DD-DEMO01
            </button>
            <span>•</span>
            <Link to="/book" className="text-[#94A3B8] hover:underline font-sans">
              Create New Booking
            </Link>
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="max-w-2xl mx-auto p-4 rounded-xl bg-[#EF4444]/15 border border-[#EF4444]/40 flex items-start gap-3 text-xs text-[#FCA5A5] text-left">
            <AlertCircle className="w-4 h-4 text-[#EF4444] flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold">Code Lookup Notice</div>
              <div className="mt-0.5">{error}</div>
            </div>
          </div>
        )}

        {/* Empty State: Feature Preview Grid (when no booking is loaded) */}
        {!bookingData && !loading && !error && (
          <div className="pt-6 space-y-8 animate-fadeIn max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3">
              <div className="h-px bg-white/10 flex-1 max-w-xs" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#94A3B8]">
                Atelier Telemetry Architecture
              </span>
              <div className="h-px bg-white/10 flex-1 max-w-xs" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
              {/* Feature 1 */}
              <div className="p-6 rounded-2xl bg-[#111622] border border-white/10 hover:border-[#F59E0B]/30 transition-all space-y-3 group">
                <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B] group-hover:scale-110 transition-transform">
                  <Warehouse className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white font-display">
                  Cleanroom Bay Isolation
                </h4>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Climate-controlled dual cleanroom bays (68°F • 45% RH) with positive-pressure HEPA filtration protecting delicate clear coat surfaces from airborne contaminants.
                </p>
                <div className="text-[11px] font-mono text-[#F59E0B] font-bold flex items-center gap-1 pt-1">
                  <span>Dual Dedicated Cleanrooms</span>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="p-6 rounded-2xl bg-[#111622] border border-white/10 hover:border-[#F59E0B]/30 transition-all space-y-3 group">
                <div className="w-10 h-10 rounded-xl bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center text-[#10B981] group-hover:scale-110 transition-transform">
                  <Gauge className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white font-display">
                  Ultrasonic Depth Sensors
                </h4>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Sub-micron paint gauge mapping across 6 exterior panels ensuring zero destructive clear coat removal (&lt;4µm leveled) with mirror specular gloss index measurement.
                </p>
                <div className="text-[11px] font-mono text-[#10B981] font-bold flex items-center gap-1 pt-1">
                  <span>Optical Gloss & Thickness</span>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="p-6 rounded-2xl bg-[#111622] border border-white/10 hover:border-[#F59E0B]/30 transition-all space-y-3 group">
                <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/15 border border-[#3B82F6]/30 flex items-center justify-center text-[#3B82F6] group-hover:scale-110 transition-transform">
                  <Activity className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white font-display">
                  5-Stage Telemetry Pipeline
                </h4>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Complete real-time transparency across each treatment milestone: Intake ➔ Decon ➔ Paint Correction ➔ Infrared Curing ➔ Optical Handover.
                </p>
                <div className="text-[11px] font-mono text-[#3B82F6] font-bold flex items-center gap-1 pt-1">
                  <span>Live Automated Dispatches</span>
                </div>
              </div>
            </div>

            {/* Quick Demo Launch Strip */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-[#161D2A] to-[#111622] border border-[#F59E0B]/25 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-left">
                <Sparkles className="w-5 h-5 text-[#F59E0B] shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white font-display">
                    Explore Interactive Live Telemetry
                  </div>
                  <div className="text-[11px] text-[#94A3B8]">
                    Load a fully configured atelier appointment in active machine polish stage.
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setInputCode('DD-DEMO01');
                    executeTrack('DD-DEMO01');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#0B0E14] font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.3)] active:scale-95"
                >
                  Load DD-DEMO01 Showcase →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Live Booking Results Display */}
        {bookingData && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Top Bar with Tracking Code & Status Pill */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#111622] border border-[#F59E0B]/50 shadow-[0_20px_50px_rgba(245,158,11,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
              <div>
                <div className="text-xs uppercase font-bold text-[#94A3B8] font-mono tracking-wider">
                  Vehicle Appointment Code
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-3xl sm:text-4xl font-black font-mono text-[#F59E0B] tracking-widest drop-shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                    {bookingData.bookingCode}
                  </span>
                  <button
                    onClick={handleCopyCode}
                    className="p-2 rounded-xl bg-white/5 border border-white/10 text-[#CBD5E1] hover:text-[#F59E0B] hover:border-[#F59E0B]/50 transition-colors cursor-pointer tactile-press"
                    title="Copy code"
                  >
                    {copied ? <Check className="w-4 h-4 text-[#10B981]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 self-start sm:self-auto">
                <Badge status={bookingData.status} label={bookingData.progress?.statusLabel || bookingData.status} size="lg" />
              </div>
            </div>

            {/* Stage Callout Notice (Showroom Ready / In Bay) */}
            <ReadyPickupBanner
              status={bookingData.status}
              bayNumber={bookingData.schedule?.bayNumber}
            />

            {/* 5-Stage Job Progression Meter */}
            <JobProgressMeter
              progress={bookingData.progress}
              status={bookingData.status}
            />

            {/* 3 Telemetry Pods (Vehicle, Bay, Service) */}
            <JobTelemetryCards
              vehicle={bookingData.vehicle}
              schedule={bookingData.schedule}
              service={bookingData.service}
            />

            {/* Financial Settlement & Tax Invoicing Section */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#111622] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-left space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#F59E0B]" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono">
                    Financial Settlement & Official Invoicing
                  </h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase w-fit ${
                  bookingData.payment?.status === 'paid'
                    ? 'bg-[#10B981]/15 text-[#34D399] border border-[#10B981]/30'
                    : bookingData.payment?.status === 'deposit_paid'
                    ? 'bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30'
                    : 'bg-white/5 text-[#CBD5E1] border border-white/10'
                }`}>
                  {bookingData.payment?.status === 'paid'
                    ? 'Paid in Full'
                    : bookingData.payment?.status === 'deposit_paid'
                    ? 'Deposit Paid'
                    : 'Due at Studio Arrival'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#0B0E14] border border-white/10">
                  <span className="text-[#94A3B8] block text-[11px] font-mono">Preservation Investment:</span>
                  <span className="text-base font-black text-white font-mono">
                    ${Number(bookingData.service?.totalPrice || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0B0E14] border border-white/10">
                  <span className="text-[#94A3B8] block text-[11px] font-mono">Settlement Method:</span>
                  <span className="text-sm font-semibold text-white capitalize font-display">
                    {bookingData.payment?.method === 'stripe' ? 'Online Card (Stripe)' : 'Pay on Arrival'}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0B0E14] border border-white/10">
                  <span className="text-[#94A3B8] block text-[11px] font-mono">Amount Settled:</span>
                  <span className="text-base font-black text-[#10B981] font-mono">
                    ${Number(bookingData.payment?.amountPaid || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Action Buttons for Invoice & Email */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <a
                  href={getInvoiceDownloadUrl(bookingData.bookingCode)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    icon={FileDown}
                    className="w-full sm:w-auto text-xs border-[#F59E0B]/40 text-[#F59E0B] hover:bg-[#F59E0B]/10"
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

                {emailNotice && (
                  <span className="text-xs text-[#10B981] font-mono font-medium">{emailNotice}</span>
                )}
              </div>
            </div>

            {/* Digital Vehicle Inspection (DVI) & Paint Health Report */}
            <VehicleInspectionCard booking={bookingData} />

            {/* Official Digital Ceramic Coating Warranty Section */}
            <WarrantyCertificateSection booking={bookingData} />

            {/* Client Communications & Status Updates Log */}
            <CommunicationsLogSection communications={bookingData.communications} />

            {/* Chronological Audit Log Timeline */}
            <JobAuditTimeline
              auditLogs={bookingData.auditLogs}
              createdAt={bookingData.createdAt}
            />

          </div>
        )}

      </div>
    </div>
  );
};
