import React from 'react';
import { Microscope, Gauge, Sparkles, CheckCircle2, ShieldAlert, ArrowRight, Activity, Car } from 'lucide-react';

export const VehicleInspectionCard = ({ booking }) => {
  const inspection = booking?.inspectionData || {
    intakeInspection: {
      clearCoatDepthMicrons: 120,
      swirlSeverity: 'Moderate',
      paintCondition: 'Factory Clear Coat with wash-induced marring',
      rockChipsDetected: 2,
      wheelBrakeDust: 'Heavy'
    },
    completionInspection: {
      finalGlossUnits: 98.4,
      swirlDefectEliminationPercent: 95,
      finalClearCoatDepthMicrons: 116,
      finishQuality: 'Concours Show-Car Mirror Refinement',
      inspectionNotes: 'Two-stage compound and micro-finishing polish completed. 9H ceramic shield thermally cured.'
    }
  };

  const intake = inspection.intakeInspection || {};
  const completion = inspection.completionInspection || {};

  // 6-Zone Paint Health Readings
  const ZONES = [
    { zone: 'Front Hood', intake: 122, post: 118, status: '98 GU Mirror' },
    { zone: 'Roof Panel', intake: 125, post: 121, status: '98 GU Mirror' },
    { zone: 'Front Fenders', intake: 119, post: 116, status: '97 GU Mirror' },
    { zone: 'Driver / Pass Doors', intake: 121, post: 117, status: '98 GU Mirror' },
    { zone: 'Rear Quarters', intake: 120, post: 116, status: '99 GU Mirror' },
    { zone: 'Trunk Deck Lid', intake: 118, post: 115, status: '98 GU Mirror' }
  ];

  return (
    <div className="p-6 sm:p-7 rounded-2xl bg-[#0E1017] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-left space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37]">
            <Microscope className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] font-bold border border-[#D4AF37]/25">
                Studio Telemetry
              </span>
              <span className="text-xs text-[#94A3B8] font-mono">
                Ultrasonic Depth Sensor
              </span>
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight mt-0.5 font-display">
              Digital Vehicle Inspection (DVI) & Paint Health Report
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/25">
            {completion.swirlDefectEliminationPercent || 95}% Defects Eliminated
          </span>
        </div>
      </div>

      {/* 6-Zone Paint Health Radar Diagram */}
      <div className="p-5 rounded-xl bg-[#08090C] border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] font-mono flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" />
            6-Zone Ultrasonic Clear Coat Health Radar
          </span>
          <span className="text-[11px] font-mono text-[#94A3B8]">Safe Clear Coat Preservation (&lt;4µm leveled)</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {ZONES.map((z, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-[#0E1017] border border-white/5 text-center">
              <div className="text-[10px] font-mono uppercase text-[#94A3B8] font-semibold">{z.zone}</div>
              <div className="text-base font-black font-mono text-white my-1">{z.post} <span className="text-[10px] text-[#D4AF37]">µm</span></div>
              <div className="text-[10px] font-mono text-[#10B981] font-bold">{z.status}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Before / After Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Intake Inspection */}
        <div className="p-5 rounded-xl bg-[#08090C] border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-[#D4AF37] uppercase font-mono">
            <span className="flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-[#D4AF37]" />
              01. Intake Pre-Inspection
            </span>
            <span className="font-mono text-[10px] text-[#94A3B8]">Arrival Baseline</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[10px] text-[#94A3B8] font-mono block">Clear Coat Depth</span>
              <span className="text-base font-bold font-mono text-white">
                {intake.clearCoatDepthMicrons || 120} <span className="text-xs text-[#94A3B8]">µm</span>
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#94A3B8] font-mono block">Swirl Severity</span>
              <span className="text-sm font-bold text-[#D4AF37] font-sans">
                {intake.swirlSeverity || 'Moderate'}
              </span>
            </div>
          </div>

          <p className="text-xs text-[#94A3B8] italic border-t border-white/5 pt-2 font-normal">
            "{intake.paintCondition || 'Wash marring and surface contamination detected.'}"
          </p>
        </div>

        {/* Completion Handover */}
        <div className="p-5 rounded-xl bg-[#08090C] border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-[#10B981] uppercase font-mono">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              02. Post-Correction Handover
            </span>
            <span className="font-mono text-[10px] text-[#10B981]">Refined Spec</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[10px] text-[#94A3B8] font-mono block">Specular Gloss Meter</span>
              <span className="text-base font-bold font-mono text-[#10B981] flex items-center gap-1">
                <Gauge className="w-4 h-4" />
                {completion.finalGlossUnits || 98.4} <span className="text-xs text-[#94A3B8]">GU</span>
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#94A3B8] font-mono block">Clear Coat Preserved</span>
              <span className="text-base font-bold font-mono text-white">
                {completion.finalClearCoatDepthMicrons || 116} <span className="text-xs text-[#94A3B8]">µm</span>
              </span>
            </div>
          </div>

          <p className="text-xs text-[#94A3B8] italic border-t border-white/5 pt-2 font-normal">
            "{completion.finishQuality || 'Surface refined to deep mirror reflection.'}"
          </p>
        </div>

      </div>

      {/* Gloss Recovery Progression Bar */}
      <div className="p-4 rounded-xl bg-[#08090C] border border-white/10 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#94A3B8] font-mono">Gloss Index Progression:</span>
          <span className="text-white font-mono font-bold flex items-center gap-1.5">
            58 GU (Dull) <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" /> <span className="text-[#10B981]">{completion.finalGlossUnits || 98.4} GU (Mirror Finish)</span>
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#D4AF37] to-[#10B981] rounded-full transition-all duration-1000"
            style={{ width: `${Math.min(100, ((completion.finalGlossUnits || 98.4) / 100) * 100)}%` }}
          />
        </div>
      </div>

    </div>
  );
};
