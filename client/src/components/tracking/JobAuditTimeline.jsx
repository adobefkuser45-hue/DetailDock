import React from 'react';
import { Clock, CheckCircle2, User, FileText, ArrowDown } from 'lucide-react';
import { Badge } from '../common/Badge.jsx';

export const JobAuditTimeline = ({ timeline, auditLogs }) => {
  const events = timeline || auditLogs || [];
  if (!events || events.length === 0) {
    return null;
  }

  return (
    <div className="p-6 sm:p-7 rounded-2xl bg-[#111622] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-left space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <span className="text-xs font-mono font-bold uppercase text-[#F59E0B] tracking-wider flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            Chronological Audit Trail
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-white mt-1 font-display">
            Technician Job Log & Status History
          </h3>
        </div>
        <span className="text-xs font-mono text-[#94A3B8] px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
          {events.length} {events.length === 1 ? 'Event' : 'Events'} Logged
        </span>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-white/10">
        {events.map((event, idx) => {
          const date = new Date(event.changedAt || Date.now());
          const formattedDate = date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          });
          const formattedTime = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
          });

          return (
            <div key={idx} className="relative group">
              {/* Timeline Dot Marker */}
              <div className="absolute -left-6 top-1.5 w-5 h-5 rounded-full bg-[#111622] border-2 border-[#F59E0B] flex items-center justify-center text-[#F59E0B] group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(245,158,11,0.4)]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
              </div>

              <div className="p-4 rounded-xl bg-[#0B0E14] border border-white/10 hover:border-[#F59E0B]/30 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <Badge status={event.status} size="sm" />
                  <span className="text-[11px] font-mono text-[#64748B] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#94A3B8]" />
                    {formattedDate} at {formattedTime}
                  </span>
                </div>

                {event.note && (
                  <p className="text-xs text-[#E2E8F0] mt-2 leading-relaxed font-normal">
                    {event.note}
                  </p>
                )}

                {event.changedBy && (
                  <div className="text-[11px] text-[#94A3B8] mt-2 pt-2 border-t border-white/5 flex items-center gap-1.5 font-mono">
                    <User className="w-3 h-3 text-[#F59E0B]" />
                    <span>Logged by: {event.changedBy}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
