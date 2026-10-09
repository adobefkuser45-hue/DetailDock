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
  AlertCircle
} from 'lucide-react';
import { Button } from '../components/common/Button.jsx';
import { Badge } from '../components/common/Badge.jsx';
import { JobProgressMeter } from '../components/tracking/JobProgressMeter.jsx';
import { JobTelemetryCards } from '../components/tracking/JobTelemetryCards.jsx';
import { JobAuditTimeline } from '../components/tracking/JobAuditTimeline.jsx';
import { ReadyPickupBanner } from '../components/tracking/ReadyPickupBanner.jsx';
import { trackBooking } from '../services/api.js';

export const TrackJobPage = () => {
  const { code: urlCode } = useParams();
  const navigate = useNavigate();

  const [inputCode, setInputCode] = useState(urlCode || '');
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

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

            {/* Chronological Technician History Audit */}
            <JobAuditTimeline
              timeline={bookingData.timeline}
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
