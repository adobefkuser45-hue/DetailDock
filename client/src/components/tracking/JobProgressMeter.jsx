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
        <h3 className="text-lg font-bold text-[#FCA5A5] font-display">Appointment Cancelled</h3>
        <p className="text-xs text-[#94A3B8] mt-1 font-normal">
          This booking has been cancelled. Please contact the studio atelier if you require assistance.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-[#111622] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-left space-y-6">
      
      {/* Header of Meter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono uppercase font-bold text-[#F59E0B] tracking-widest">
            Live Telemetry Pipeline
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5 font-display">
            {progress?.statusLabel || status}
          </h3>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="text-right">
            <div className="text-xs text-[#94A3B8] font-mono">Stage Progression:</div>
            <div className="text-xl font-mono font-black text-[#F59E0B]">
              {percentage}%
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#F59E0B]">
            {percentage === 100 ? (
              <Award className="w-5 h-5 text-[#10B981]" />
            ) : percentage >= 80 ? (
              <ShieldCheck className="w-5 h-5 text-[#10B981]" />
            ) : percentage >= 60 ? (
              <Warehouse className="w-5 h-5 text-[#F59E0B] animate-pulse" />
            ) : (
              <Clock className="w-5 h-5 text-[#F59E0B]" />
            )}
          </div>
        </div>
      </div>

      {/* Visual Progress Bar with Glow */}
      <div className="relative pt-6 pb-2">
        {/* Track Background Bar */}
        <div className="h-2 w-full bg-[#0B0E14] rounded-full overflow-hidden border border-white/10">
          <div
            className="h-full bg-gradient-to-r from-[#F59E0B] via-[#FBBF24] to-[#10B981] transition-all duration-700 ease-out shadow-[0_0_15px_rgba(245,158,11,0.8)]"
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
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-mono font-black transition-all ${
                    isCompleted
                      ? 'bg-[#10B981] text-white shadow-md'
                      : isCurrent
                      ? 'bg-[#F59E0B] text-[#0B0E14] ring-4 ring-[#F59E0B]/25 shadow-lg shadow-[#F59E0B]/40'
                      : 'bg-[#0B0E14] text-[#94A3B8] border border-white/10'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : s.step}
                </div>

                <div className="mt-2">
                  <div className={`text-[11px] sm:text-xs font-bold leading-tight font-display ${
                    isCurrent ? 'text-white' : isCompleted ? 'text-[#F59E0B]' : 'text-[#64748B]'
                  }`}>
                    {s.label}
                  </div>
                  <div className="hidden sm:block text-[10px] text-[#64748B] mt-0.5 max-w-[90px] mx-auto font-sans">
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
