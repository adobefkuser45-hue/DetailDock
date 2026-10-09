import React from 'react';
import { Clock, CheckCircle2, User, FileText, ArrowDown } from 'lucide-react';
import { Badge } from '../common/Badge.jsx';

export const JobAuditTimeline = ({ timeline }) => {
  if (!timeline || timeline.length === 0) {
    return null;
  }

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-[#101522] border border-[#1D2536] text-left space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#1D2536]">
        <div>
          <span className="text-xs font-mono font-bold uppercase text-[#38BDF8] tracking-wider">
            Chronological Audit Trail
          </span>
          <h3 className="text-xl font-bold text-white mt-0.5">
            Technician Job Log & Status History
          </h3>
        </div>
        <span className="text-xs text-[#94A3B8]">
          {timeline.length} {timeline.length === 1 ? 'Event' : 'Events'} Logged
        </span>
      </div>

      <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-[#1D2536]">
        {timeline.map((event, idx) => {
          const date = new Date(event.changedAt);
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
              <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-[#101522] border-2 border-[#38BDF8] flex items-center justify-center text-[#38BDF8] group-hover:scale-125 transition-transform shadow-md shadow-[#0284C7]/30">
                <div className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
              </div>

              <div className="p-4 rounded-xl bg-[#090C12] border border-[#1D2536] hover:border-[#2A364E] transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <Badge status={event.status} size="sm" />
                  <span className="text-[11px] font-mono text-[#64748B] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formattedDate} at {formattedTime}
                  </span>
                </div>

                {event.note && (
                  <p className="text-xs text-[#E2E8F0] mt-2 leading-relaxed">
                    {event.note}
                  </p>
                )}

                {event.changedBy && (
                  <div className="text-[11px] text-[#64748B] mt-2 pt-2 border-t border-[#1D2536]/60 flex items-center gap-1.5">
                    <User className="w-3 h-3 text-[#38BDF8]" />
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
