import React from 'react';
import { 
  Check, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  Warehouse, 
  AlertTriangle,
  Award
} from 'lucide-react';

const STAGES = [
  { step: 1, key: 'Pending', label: 'Requested', desc: 'Order logged & queued' },
  { step: 2, key: 'Confirmed', label: 'Bay Reserved', desc: 'Technician & bay allocated' },
  { step: 3, key: 'In Bay', label: 'In Studio Bay', desc: 'Paint correction & cure' },
  { step: 4, key: 'Ready', label: 'Showroom Ready', desc: 'Passed optical inspection' },
  { step: 5, key: 'Completed', label: 'Released', desc: 'Handed over with warranty' }
];

export const JobProgressMeter = ({ progress, status }) => {
  const isCancelled = status === 'Cancelled';
  const currentStep = progress?.currentStep || 1;
  const percentage = isCancelled ? 0 : progress?.percentage || 20;

  if (isCancelled) {
    return (
      <div className="p-6 rounded-2xl bg-[#EF4444]/10 border border-[#EF4444]/30 text-center">
        <div className="w-12 h-12 rounded-full bg-[#EF4444]/20 flex items-center justify-center text-[#EF4444] mx-auto mb-3">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-[#FCA5A5]">Appointment Cancelled</h3>
        <p className="text-xs text-[#94A3B8] mt-1">
          This booking has been cancelled. Please contact the studio atelier if you require assistance.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-[#101522] border border-[#2A364E] shadow-xl text-left space-y-6">
      
      {/* Header of Meter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono uppercase font-bold text-[#38BDF8] tracking-widest">
            Live Telemetry Pipeline
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
            {progress?.statusLabel || status}
          </h3>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="text-right">
            <div className="text-xs text-[#94A3B8]">Stage Progression:</div>
            <div className="text-lg font-mono font-extrabold text-[#38BDF8]">
              {percentage}%
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#0284C7]/20 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8]">
            {percentage === 100 ? (
              <Award className="w-5 h-5 text-[#10B981]" />
            ) : percentage >= 80 ? (
              <ShieldCheck className="w-5 h-5 text-[#10B981]" />
            ) : percentage >= 60 ? (
              <Warehouse className="w-5 h-5 text-[#F59E0B] animate-pulse" />
            ) : (
              <Clock className="w-5 h-5 text-[#38BDF8]" />
            )}
          </div>
        </div>
      </div>

      {/* Visual Progress Bar with Glow */}
      <div className="relative pt-6 pb-2">
        {/* Track Background Bar */}
        <div className="h-2 w-full bg-[#161D2E] rounded-full overflow-hidden border border-[#1D2536]">
          <div
            className="h-full bg-gradient-to-r from-[#0284C7] via-[#38BDF8] to-[#10B981] transition-all duration-700 ease-out shadow-[0_0_12px_rgba(56,189,248,0.8)]"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* 5 Milestone Step Pins */}
        <div className="grid grid-cols-5 gap-1 mt-6">
          {STAGES.map((s) => {
            const isCompleted = currentStep > s.step;
            const isCurrent = currentStep === s.step;

            return (
              <div key={s.step} className="flex flex-col items-center text-center">
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all ${
                    isCompleted
                      ? 'bg-[#10B981] text-white shadow-md'
                      : isCurrent
                      ? 'bg-[#0284C7] text-white ring-4 ring-[#0284C7]/30 shadow-lg shadow-[#0284C7]'
                      : 'bg-[#161D2E] text-[#64748B] border border-[#1D2536]'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : s.step}
                </div>

                <div className="mt-2">
                  <div className={`text-[11px] sm:text-xs font-bold leading-tight ${
                    isCurrent ? 'text-white' : isCompleted ? 'text-[#38BDF8]' : 'text-[#64748B]'
                  }`}>
                    {s.label}
                  </div>
                  <div className="hidden sm:block text-[10px] text-[#64748B] mt-0.5 max-w-[90px] mx-auto">
                    {s.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
