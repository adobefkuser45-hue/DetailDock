import React from 'react';
import { Microscope, Gauge, Sparkles, CheckCircle, ShieldAlert, ArrowRight } from 'lucide-react';

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

  return (
    <div className="p-6 rounded-2xl bg-[#101522] border-2 border-[#1E293B] shadow-xl text-left space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1E293B] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8]">
            <Microscope className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#38BDF8]/20 text-[#38BDF8] font-bold border border-[#38BDF8]/30">
                Studio Telemetry
              </span>
              <span className="text-xs text-[#94A3B8] font-mono">
                Ultrasonic Depth Sensor
              </span>
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight mt-0.5">
              Digital Vehicle Inspection (DVI) & Paint Health Report
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
            {completion.swirlDefectEliminationPercent || 95}% Defects Eliminated
          </span>
        </div>
      </div>

      {/* Before / After Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Intake Inspection */}
        <div className="p-4 rounded-xl bg-[#090C12] border border-[#1E293B] space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-[#F59E0B] uppercase">
            <span className="flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" />
              01. Intake Pre-Inspection
            </span>
            <span className="font-mono text-[10px] text-[#64748B]">Arrival Baseline</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[10px] text-[#64748B] block">Clear Coat Depth</span>
              <span className="text-base font-bold font-mono text-white">
                {intake.clearCoatDepthMicrons || 120} <span className="text-xs text-[#94A3B8]">µm</span>
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#64748B] block">Swirl Severity</span>
              <span className="text-sm font-bold text-[#F59E0B]">
                {intake.swirlSeverity || 'Moderate'}
              </span>
            </div>
          </div>

          <p className="text-xs text-[#94A3B8] italic border-t border-[#1E293B]/60 pt-2">
            "{intake.paintCondition || 'Wash marring and surface contamination detected.'}"
          </p>
        </div>

        {/* Completion Handover */}
        <div className="p-4 rounded-xl bg-[#090C12] border border-[#1E293B] space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-[#10B981] uppercase">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              02. Post-Correction Handover
            </span>
            <span className="font-mono text-[10px] text-[#10B981]">Refined Spec</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[10px] text-[#64748B] block">Specular Gloss Meter</span>
              <span className="text-base font-bold font-mono text-[#10B981] flex items-center gap-1">
                <Gauge className="w-4 h-4" />
                {completion.finalGlossUnits || 98.4} <span className="text-xs text-[#94A3B8]">GU</span>
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#64748B] block">Clear Coat Preserved</span>
              <span className="text-base font-bold font-mono text-white">
                {completion.finalClearCoatDepthMicrons || 116} <span className="text-xs text-[#94A3B8]">µm</span>
              </span>
            </div>
          </div>

          <p className="text-xs text-[#94A3B8] italic border-t border-[#1E293B]/60 pt-2">
            "{completion.finishQuality || 'Surface refined to deep mirror reflection.'}"
          </p>
        </div>

      </div>

      {/* Gloss Recovery Progression Bar */}
      <div className="p-4 rounded-xl bg-[#0B0F19] border border-[#1E293B]/80 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#94A3B8] font-mono">Gloss Index Progression:</span>
          <span className="text-white font-mono font-bold flex items-center gap-1.5">
            58 GU (Dull) <ArrowRight className="w-3.5 h-3.5 text-[#38BDF8]" /> <span className="text-[#10B981]">{completion.finalGlossUnits || 98.4} GU (Mirror Finish)</span>
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-[#1E293B] overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#F59E0B] via-[#38BDF8] to-[#10B981] rounded-full transition-all duration-1000"
            style={{ width: `${Math.min(100, ((completion.finalGlossUnits || 98.4) / 100) * 100)}%` }}
          />
        </div>
      </div>

    </div>
  );
};
