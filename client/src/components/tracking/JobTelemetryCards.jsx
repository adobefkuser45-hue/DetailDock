import React from 'react';
import { 
  Car, 
  Warehouse, 
  Layers, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Thermometer, 
  Sparkles,
  Palette,
  Hash
} from 'lucide-react';

export const JobTelemetryCards = ({ vehicle, schedule, service }) => {
  const durationHours = Math.floor((service?.totalDurationMinutes || 180) / 60);
  const durationMins = (service?.totalDurationMinutes || 180) % 60;
  const formattedDur = durationHours > 0 
    ? `${durationHours}h ${durationMins > 0 ? `${durationMins}m` : ''}` 
    : `${durationMins}m`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
      
      {/* POD 1: VEHICLE TELEMETRY */}
      <div className="p-6 rounded-2xl bg-[#101522] border border-[#1D2536] flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-[#1D2536] mb-4">
            <div className="flex items-center gap-2">
              <Car className="w-4 h-4 text-[#38BDF8]" />
              <span className="text-xs uppercase font-bold text-[#94A3B8] font-mono">
                Vehicle Spec
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#38BDF8] bg-[#0284C7]/10 px-2 py-0.5 rounded border border-[#0284C7]/20">
              {vehicle?.category || 'Chassis'}
            </span>
          </div>

          <h4 className="text-lg font-bold text-white mb-1">
            {vehicle?.year} {vehicle?.make} {vehicle?.model}
          </h4>

          <div className="space-y-2 mt-4 text-xs text-[#94A3B8]">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-[#64748B]" />
                Paint Finish:
              </span>
              <span className="text-white font-medium">{vehicle?.paintColor || 'Factory Finish'}</span>
            </div>
            {vehicle?.licensePlate && (
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-[#64748B]" />
                  Plate Tag:
                </span>
                <span className="font-mono text-white">{vehicle?.licensePlate}</span>
              </div>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-[#1D2536] mt-4 text-[11px] text-[#64748B]">
          Surface multi-stage inspection logged
        </div>
      </div>

      {/* POD 2: BAY ALLOCATION */}
      <div className="p-6 rounded-2xl bg-[#101522] border border-[#1D2536] flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-[#1D2536] mb-4">
            <div className="flex items-center gap-2">
              <Warehouse className="w-4 h-4 text-[#F59E0B]" />
              <span className="text-xs uppercase font-bold text-[#94A3B8] font-mono">
                Cleanroom Bay
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded border border-[#10B981]/20">
              Assigned Bay {schedule?.bayNumber || 1}
            </span>
          </div>

          <h4 className="text-lg font-bold text-white mb-1">
            Cleanroom Studio Bay {schedule?.bayNumber || 1}
          </h4>

          <div className="space-y-2 mt-4 text-xs text-[#94A3B8]">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#64748B]" />
                Date:
              </span>
              <span className="text-white font-medium">{schedule?.date}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#64748B]" />
                Slot:
              </span>
              <span className="font-mono text-[#38BDF8] font-semibold">{schedule?.timeSlot}</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#1D2536] mt-4 flex items-center justify-between text-[11px] text-[#10B981]">
          <span className="flex items-center gap-1">
            <Thermometer className="w-3.5 h-3.5" />
            68°F • 45% RH Climate Controlled
          </span>
        </div>
      </div>

      {/* POD 3: SERVICE SNAPSHOT */}
      <div className="p-6 rounded-2xl bg-[#101522] border border-[#1D2536] flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-[#1D2536] mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#10B981]" />
              <span className="text-xs uppercase font-bold text-[#94A3B8] font-mono">
                Preservation Spec
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#F59E0B]">
              ~{formattedDur} bay time
            </span>
          </div>

          <h4 className="text-lg font-bold text-white mb-1">
            {service?.packageTitle}
          </h4>

          {/* Addons List */}
          {service?.addons && service.addons.length > 0 ? (
            <div className="mt-3 space-y-1 text-xs">
              <div className="text-[11px] text-[#64748B] uppercase font-semibold">Attached Upgrades:</div>
              {service.addons.map((a, i) => (
                <div key={i} className="flex items-center justify-between text-[#94A3B8]">
                  <span className="truncate max-w-[170px]">{a.title}</span>
                  <span className="font-mono text-[#F59E0B]">+${a.price}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[#64748B] mt-2">Baseline package treatment</p>
          )}
        </div>

        <div className="pt-4 border-t border-[#1D2536] mt-4 flex items-baseline justify-between">
          <span className="text-xs font-bold uppercase text-[#94A3B8]">Total Amount:</span>
          <span className="text-2xl font-extrabold font-mono text-[#38BDF8]">
            ${Number(service?.totalPrice || 0).toFixed(2)}
          </span>
        </div>
      </div>

    </div>
  );
};
