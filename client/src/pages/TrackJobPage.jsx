import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/common/Button.jsx';
import { trackBooking } from '../services/api.js';
import { Badge } from '../components/common/Badge.jsx';

export const TrackJobPage = () => {
  const { code: urlCode } = useParams();
  const navigate = useNavigate();
  const [inputCode, setInputCode] = useState(urlCode || '');
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e?.preventDefault();
    if (!inputCode.trim()) return;

    setLoading(true);
    setError(null);
    setBookingData(null);

    try {
      const data = await trackBooking(inputCode.trim());
      setBookingData(data);
      if (urlCode !== inputCode.trim()) {
        navigate(`/track/${encodeURIComponent(inputCode.trim())}`, { replace: true });
      }
    } catch (err) {
      setError(err.message || 'Booking code not found.');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (urlCode) {
      setInputCode(urlCode);
      handleSearch();
    }
  }, [urlCode]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-[#38BDF8] bg-[#38BDF8]/10 px-3 py-1 rounded-full border border-[#38BDF8]/20">
          Client Live Portal
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight mt-3">
          Track Detailing Appointment
        </h1>
        <p className="text-sm text-[#94A3B8] mt-2">
          Enter your 6-digit appointment code (e.g., <span className="font-mono text-[#38BDF8]">DD-XXXXXX</span>) to inspect live bay progress, scheduled time, and inspection history.
        </p>
      </div>

      {/* Code Search Input Card */}
      <form onSubmit={handleSearch} className="p-4 sm:p-6 rounded-2xl bg-[#101522] border border-[#1D2536] shadow-xl flex flex-col sm:flex-row gap-3 mb-10">
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value.toUpperCase())}
            placeholder="e.g. DD-84920A"
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
          Track Job
        </Button>
      </form>

      {/* Error Notice */}
      {error && (
        <div className="p-4 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/30 text-xs text-[#EF4444] text-center mb-8">
          {error}
        </div>
      )}

      {/* Active Booking Result Preview */}
      {bookingData && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#101522] border border-[#2A364E] shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1D2536]">
            <div>
              <div className="text-xs text-[#94A3B8] font-mono">TRACKING CODE</div>
              <div className="text-2xl font-extrabold font-mono text-[#38BDF8] tracking-wider">
                {bookingData.bookingCode}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge status={bookingData.status} label={bookingData.progress.statusLabel} size="lg" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#161D2E] border border-[#1D2536]">
              <span className="text-[#64748B] uppercase font-bold tracking-wider">Vehicle</span>
              <div className="font-extrabold text-sm text-[#F8FAFC] mt-1">
                {bookingData.vehicle.year} {bookingData.vehicle.make} {bookingData.vehicle.model}
              </div>
              <div className="text-[#94A3B8] mt-0.5">{bookingData.vehicle.category}</div>
            </div>

            <div className="p-4 rounded-xl bg-[#161D2E] border border-[#1D2536]">
              <span className="text-[#64748B] uppercase font-bold tracking-wider">Schedule</span>
              <div className="font-extrabold text-sm text-[#F8FAFC] mt-1">
                {bookingData.schedule.date}
              </div>
              <div className="text-[#38BDF8] font-mono mt-0.5">{bookingData.schedule.timeSlot} • Bay {bookingData.schedule.bayNumber}</div>
            </div>

            <div className="p-4 rounded-xl bg-[#161D2E] border border-[#1D2536]">
              <span className="text-[#64748B] uppercase font-bold tracking-wider">Total Investment</span>
              <div className="font-extrabold text-sm text-[#F8FAFC] font-mono mt-1">
                ${bookingData.service.totalPrice}
              </div>
              <div className="text-[#94A3B8] mt-0.5">{bookingData.service.packageTitle}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
