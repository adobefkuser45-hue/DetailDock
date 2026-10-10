import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Warehouse, 
  Car, 
  User, 
  Phone, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle,
  Eye,
  Check,
  ChevronRight,
  MessageSquare,
  Smartphone
} from 'lucide-react';
import { Badge } from '../common/Badge.jsx';

const LANES = [
  { key: 'Pending', label: '1. Requested', color: 'border-[#F59E0B]/40 text-[#F59E0B]' },
  { key: 'Confirmed', label: '2. Confirmed', color: 'border-[#0284C7]/40 text-[#38BDF8]' },
  { key: 'In Bay', label: '3. In Cleanroom Bay', color: 'border-[#8B5CF6]/40 text-[#A78BFA]' },
  { key: 'Ready', label: '4. Showroom Ready', color: 'border-[#10B981]/40 text-[#10B981]' },
  { key: 'Completed', label: '5. Completed & Released', color: 'border-[#475569]/40 text-[#94A3B8]' }
];

export const KanbanBoard = ({ bookings, onAdvanceStatus, onOpenDetails, isUpdatingId }) => {
  // Group bookings by status
  const grouped = LANES.reduce((acc, lane) => {
    acc[lane.key] = bookings.filter(b => b.status === lane.key);
    return acc;
  }, {});

  return (
    <div className="space-y-4 text-left">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-mono font-bold uppercase text-[#38BDF8] tracking-wider">
            Operational Workflow
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
            Live Atelier Pipeline Board
          </h3>
        </div>
        <div className="text-xs text-[#94A3B8] font-mono">
          Showing {bookings.length} Vehicles Across 5 Stages
        </div>
      </div>

      {/* 5-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 items-start">
        {LANES.map((lane) => {
          const items = grouped[lane.key] || [];

          return (
            <div 
              key={lane.key}
              className="rounded-2xl bg-[#0B0E14] border border-white/10 p-4 flex flex-col min-h-[500px] shadow-lg"
            >
              {/* Lane Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                <span className={`text-xs font-bold uppercase font-mono tracking-wider ${lane.color}`}>
                  {lane.label}
                </span>
                <span className="text-xs font-mono font-extrabold px-2 py-0.5 rounded-full bg-[#111622] text-[#F8FAFC] border border-white/10">
                  {items.length}
                </span>
              </div>

              {/* Lane Content / Cards */}
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[700px] pr-1">
                {items.length === 0 ? (
                  <div className="h-32 rounded-xl border border-dashed border-white/10 flex items-center justify-center text-xs text-[#64748B] font-mono">
                    No vehicles in stage
                  </div>
                ) : (
                  items.map((booking) => {
                    const isProcessing = isUpdatingId === (booking._id || booking.id);
                    const vehicle = booking.vehicle || {};
                    const customer = booking.customer || {};
                    const scheduledDate = booking.scheduledDate ? new Date(booking.scheduledDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    }) : '';

                    return (
                      <div
                        key={booking._id || booking.id || booking.bookingCode}
                        className="p-4 rounded-xl bg-[#111622] border border-white/10 hover:border-[#F59E0B]/40 transition-all shadow-md flex flex-col justify-between group"
                      >
                        <div>
                          {/* Card Top: Code & Bay */}
                          <div className="flex items-center justify-between gap-2 text-xs pb-2 border-b border-white/10">
                            <button
                              type="button"
                              onClick={() => onOpenDetails(booking)}
                              className="font-mono font-extrabold text-[#F59E0B] hover:text-[#FBBF24] hover:underline whitespace-nowrap tracking-wider text-xs"
                            >
                              {booking.bookingCode}
                            </button>
                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              <span className={`text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded whitespace-nowrap ${
                                booking.payment?.status === 'paid'
                                  ? 'bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/30'
                                  : booking.payment?.status === 'deposit_paid'
                                  ? 'bg-[#0284C7]/20 text-[#38BDF8] border border-[#0284C7]/30'
                                  : 'bg-[#F59E0B]/20 text-[#FBBF24] border border-[#F59E0B]/30'
                              }`}>
                                {booking.payment?.status === 'paid' ? 'Paid' : booking.payment?.status === 'deposit_paid' ? 'Deposit' : 'Unpaid'}
                              </span>
                              <span className="text-[10px] font-mono font-bold text-[#F59E0B] bg-[#F59E0B]/10 px-1.5 py-0.5 rounded border border-[#F59E0B]/20 whitespace-nowrap">
                                Bay {booking.bayNumber || 1}
                              </span>
                            </div>
                          </div>

                          {/* Vehicle Info */}
                          <div className="mt-2.5">
                            <h4 className="font-bold text-sm text-[#F8FAFC] group-hover:text-[#F59E0B] transition-colors leading-tight">
                              {vehicle.year} {vehicle.make} {vehicle.model}
                            </h4>
                            <div className="text-[11px] text-[#94A3B8] mt-0.5">
                              {vehicle.paintColor ? `${vehicle.paintColor} • ` : ''}{vehicle.categoryName || vehicle.category || 'Sedan'}
                            </div>
                          </div>

                          {/* Client & Date */}
                          <div className="mt-3 p-2.5 rounded-lg bg-[#090C12] border border-white/5 text-[11px] space-y-1.5">
                            <div className="flex items-center justify-between text-[#94A3B8] gap-2">
                              <span className="flex items-center gap-1 text-[#E2E8F0] truncate">
                                <User className="w-3 h-3 text-[#64748B] flex-shrink-0" />
                                <span className="truncate">{customer.name}</span>
                              </span>
                              <span className="font-mono text-[#F59E0B] font-semibold text-[10px] whitespace-nowrap flex-shrink-0">
                                {booking.scheduledTimeSlot}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[#64748B] text-[10px] font-mono">
                              <span>{scheduledDate}</span>
                              <span className="font-bold text-white">${Number(booking.totalPrice || 0).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Card Bottom: Status Advancement Action */}
                        <div className="pt-3 mt-3 border-t border-white/10 flex items-center gap-1.5">
                          {booking.status === 'Pending' && (
                            <button
                              disabled={isProcessing}
                              onClick={() => onAdvanceStatus(booking, 'Confirmed', 'Confirmed bay booking')}
                              className="w-full py-1.5 px-2 rounded-lg bg-[#F59E0B] hover:bg-[#D97706] text-black text-[11px] font-bold transition-colors flex items-center justify-center gap-1 shadow-sm"
                            >
                              <Check className="w-3 h-3" />
                              <span>Confirm Bay</span>
                            </button>
                          )}

                          {booking.status === 'Confirmed' && (
                            <button
                              disabled={isProcessing}
                              onClick={() => onAdvanceStatus(booking, 'In Bay', 'Vehicle moved to cleanroom bay')}
                              className="w-full py-1.5 px-2 rounded-lg bg-[#8B5CF6] hover:bg-[#A78BFA] text-white text-[11px] font-bold transition-colors flex items-center justify-center gap-1"
                            >
                              <Warehouse className="w-3 h-3" />
                              <span>Stage in Bay</span>
                            </button>
                          )}

                          {booking.status === 'In Bay' && (
                            <button
                              disabled={isProcessing}
                              onClick={() => onAdvanceStatus(booking, 'Ready', 'Passed optical inspection')}
                              className="w-full py-1.5 px-2 rounded-lg bg-[#10B981] hover:bg-[#34D399] text-white text-[11px] font-bold transition-colors flex items-center justify-center gap-1"
                            >
                              <Sparkles className="w-3 h-3" />
                              <span>Mark Ready</span>
                            </button>
                          )}

                          {booking.status === 'Ready' && (
                            <button
                              disabled={isProcessing}
                              onClick={() => onAdvanceStatus(booking, 'Completed', 'Handover complete with warranty')}
                              className="w-full py-1.5 px-2 rounded-lg bg-[#475569] hover:bg-[#64748B] text-white text-[11px] font-bold transition-colors flex items-center justify-center gap-1"
                            >
                              <ShieldCheck className="w-3 h-3" />
                              <span>Complete & Release</span>
                            </button>
                          )}

                          {booking.status === 'Completed' && (
                            <div className="w-full py-1 text-center text-[10px] font-mono text-[#10B981] font-semibold bg-[#10B981]/10 rounded border border-[#10B981]/20">
                              ✓ Serialized Release
                            </div>
                          )}

                          {/* Quick WhatsApp Dispatch Action */}
                          {customer.phone && (
                            <a
                              href={`https://wa.me/${(customer.phone || '').replace(/[^\d]/g, '')}?text=${encodeURIComponent(`DetailDock Atelier: Update on your ${vehicle.year || ''} ${vehicle.make || ''} ${vehicle.model || ''} (Ref: ${booking.bookingCode}). Current status: ${booking.status}. Track live: https://client-mauve-zeta-13.vercel.app/track/${booking.bookingCode}`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-[#0B0E14] border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10 transition-colors"
                              title="Send WhatsApp Client Alert"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </a>
                          )}

                          {/* Quick SMS Dispatch Action */}
                          {customer.phone && (
                            <a
                              href={`sms:${(customer.phone || '').replace(/[^\d]/g, '')}?body=${encodeURIComponent(`DetailDock Atelier: Update on your ${vehicle.year || ''} ${vehicle.make || ''} ${vehicle.model || ''} (Ref: ${booking.bookingCode}). Current status: ${booking.status}. Track live: https://client-mauve-zeta-13.vercel.app/track/${booking.bookingCode}`)}`}
                              className="p-1.5 rounded-lg bg-[#0B0E14] border border-white/10 text-[#CBD5E1] hover:text-white hover:bg-white/5 transition-colors"
                              title="Send SMS Carrier Alert"
                            >
                              <Smartphone className="w-3.5 h-3.5" />
                            </a>
                          )}

                          {/* Quick Details View Button */}
                          <button
                            onClick={() => onOpenDetails(booking)}
                            className="p-1.5 rounded-lg bg-[#0B0E14] border border-white/10 text-[#CBD5E1] hover:text-white hover:bg-white/5 transition-colors"
                            title="Inspect Booking Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
