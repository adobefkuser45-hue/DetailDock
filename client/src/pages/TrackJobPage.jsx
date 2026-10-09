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
  Car,
  RotateCcw,
  Sparkles,
  AlertCircle,
  CreditCard,
  FileDown,
  MailCheck
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

  // Search by code function
  const executeTrack = async (searchCode) => {
    const clean = searchCode?.trim();
    if (!clean) return;

    setLoading(true);
    setError(null);

    try {
      const data = await trackBooking(clean);
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

  // Auto-search if code is present in URL
  useEffect(() => {
    if (urlCode) {
      setInputCode(urlCode);
      executeTrack(urlCode);
    }
  }, [urlCode]);

  const handleCopyCode = () => {
    if (bookingData?.bookingCode) {
      navigator.clipboard.writeText(bookingData.bookingCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full bg-[#090C12] text-[#F8FAFC] min-h-screen py-12 lg:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#38BDF8] bg-[#38BDF8]/10 px-3.5 py-1.5 rounded-full border border-[#38BDF8]/20 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Live Client Telemetry Portal
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F8FAFC] tracking-tight mt-3">
            Track Vehicle Treatment
          </h1>
          <p className="text-sm sm:text-base text-[#94A3B8] mt-2">
            Inspect real-time cleanroom bay status, paint correction progression, and technician inspection notes using your unique 6-character booking code.
          </p>
        </div>

        {/* Search Bar Cockpit */}
        <div className="max-w-2xl mx-auto">
          <form 
            onSubmit={handleFormSubmit}
            className="p-3 sm:p-4 rounded-2xl bg-[#101522] border-2 border-[#1D2536] shadow-2xl flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                placeholder="Enter Code e.g. DD-XXXXXX"
                className="w-full bg-[#161D2E] border border-[#2A364E] focus:border-[#38BDF8] rounded-xl pl-11 pr-4 py-3 text-sm font-mono text-[#F8FAFC] placeholder-[#64748B] uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-[#38BDF8]"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={loading}
              iconRight={ArrowRight}
              className="glow-cyan-sm"
            >
              Track Vehicle
            </Button>
          </form>

          {/* Quick Demo Code Suggestion Helper */}
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-[#64748B]">
            <span>Need a code to test?</span>
            <button
              type="button"
              onClick={() => {
                setInputCode('DD-DEMO01');
                executeTrack('DD-DEMO01');
              }}
              className="text-[#38BDF8] hover:underline font-mono"
            >
              Try DD-DEMO01
            </button>
            <span>•</span>
            <Link to="/book" className="text-[#94A3B8] hover:underline">
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

        {/* Live Booking Results Display */}
        {bookingData && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Top Bar with Tracking Code & Status Pill */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#101522] border-2 border-[#1D2536] shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
              <div>
                <div className="text-xs uppercase font-bold text-[#64748B] font-mono tracking-wider">
                  Vehicle Appointment Code
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-3xl sm:text-4xl font-black font-mono text-[#38BDF8] tracking-widest">
                    {bookingData.bookingCode}
                  </span>
                  <button
                    onClick={handleCopyCode}
                    className="p-2 rounded-xl bg-[#161D2E] border border-[#2A364E] text-[#94A3B8] hover:text-[#38BDF8] transition-colors"
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
            <div className="p-6 rounded-2xl bg-[#101522] border-2 border-[#1D2536] shadow-xl text-left space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1D2536]">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#38BDF8]" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                    Financial Settlement & Official Invoicing
                  </h3>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-bold uppercase w-fit ${
                  bookingData.payment?.status === 'paid'
                    ? 'bg-[#10B981]/15 text-[#34D399] border border-[#10B981]/30'
                    : bookingData.payment?.status === 'deposit_paid'
                    ? 'bg-[#0284C7]/15 text-[#38BDF8] border border-[#0284C7]/30'
                    : 'bg-[#F59E0B]/15 text-[#FBBF24] border border-[#F59E0B]/30'
                }`}>
                  {bookingData.payment?.status === 'paid'
                    ? 'Paid in Full'
                    : bookingData.payment?.status === 'deposit_paid'
                    ? 'Deposit Paid'
                    : 'Due at Studio Arrival'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#090C12] border border-[#1D2536]">
                  <span className="text-[#64748B] block text-[11px]">Authoritative Total:</span>
                  <span className="text-base font-extrabold text-[#38BDF8] font-mono">
                    ${Number(bookingData.service?.totalPrice || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#090C12] border border-[#1D2536]">
                  <span className="text-[#64748B] block text-[11px]">Settlement Method:</span>
                  <span className="text-sm font-semibold text-white capitalize">
                    {bookingData.payment?.method === 'stripe' ? 'Online Card (Stripe)' : 'Pay on Arrival'}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#090C12] border border-[#1D2536]">
                  <span className="text-[#64748B] block text-[11px]">Amount Settled:</span>
                  <span className="text-base font-extrabold text-[#34D399] font-mono">
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
                    className="w-full sm:w-auto text-xs border-[#38BDF8]/40 text-[#38BDF8] hover:bg-[#38BDF8]/10"
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
                  {resendingEmail ? 'Sending...' : 'Resend Receipt to My Email'}
                </Button>

                {emailNotice && (
                  <span className="text-xs text-[#34D399] font-medium">{emailNotice}</span>
                )}
              </div>
            </div>

            {/* Official Digital Ceramic Coating Warranty Certificate */}
            <WarrantyCertificateSection booking={bookingData} />

            {/* Digital Vehicle Inspection (DVI) & Paint Health Telemetry */}
            <VehicleInspectionCard booking={bookingData} />

            {/* Chronological Technician History Audit */}
            <JobAuditTimeline
              timeline={bookingData.timeline}
            />

            {/* Live Automated Client Notifications & Dispatch Log */}
            <CommunicationsLogSection
              communications={bookingData.communications}
              customerPhone={bookingData.customer?.maskedPhone}
              bookingCode={bookingData.bookingCode}
            />

            {/* Footer Navigation Strip */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#1D2536] text-xs text-[#94A3B8]">
              <div>
                Questions regarding treatment? Call concierge at <span className="text-white font-mono">(512) 555-DOCK</span>
              </div>
              <div className="flex items-center gap-3">
                <Link to="/book">
                  <Button variant="secondary" size="md">
                    Book Another Bay Slot
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="ghost" size="md">
                    Return to Atelier Home
                  </Button>
                </Link>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
