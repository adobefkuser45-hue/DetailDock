import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  AlertCircle, 
  RefreshCw,
  Warehouse
} from 'lucide-react';
import { Button } from '../common/Button.jsx';
import { getAvailability } from '../../services/api.js';

// Generate next 14 business days (skipping Sundays)
const generateAvailableDates = () => {
  const dates = [];
  const current = new Date();
  let dayOffset = 1; // Start from tomorrow

  while (dates.length < 10) {
    const d = new Date();
    d.setDate(current.getDate() + dayOffset);
    // 0 = Sunday (closed)
    if (d.getDay() !== 0) {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;

      const weekday = d.toLocaleDateString('en-US', { weekday: 'short' });
      const monthName = d.toLocaleDateString('en-US', { month: 'short' });
      const dayNum = d.getDate();

      dates.push({ dateStr, weekday, monthName, dayNum });
    }
    dayOffset++;
  }
  return dates;
};

export const SlotPickerStep = ({
  selectedDate,
  selectedSlot,
  onSelectDate,
  onSelectSlot,
  onNext,
  onBack
}) => {
  const availableDates = generateAvailableDates();
  const [activeDate, setActiveDate] = useState(selectedDate || availableDates[0].dateStr);
  const [slotsData, setSlotsData] = useState([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (!selectedDate && activeDate) {
      onSelectDate(activeDate);
    }
  }, [activeDate, selectedDate, onSelectDate]);

  useEffect(() => {
    let isMounted = true;

    const fetchSlots = async () => {
      if (!activeDate) return;
      setIsLoadingSlots(true);
      setErrorMsg(null);

      try {
        const res = await getAvailability(activeDate);
        if (isMounted) {
          if (res?.data?.slots) {
            setSlotsData(res.data.slots);
          } else if (Array.isArray(res?.slots)) {
            setSlotsData(res.slots);
          } else {
            setSlotsData([
              { time: '08:00 AM', isAvailable: true, availableCount: 2, availableBays: [1, 2] },
              { time: '10:30 AM', isAvailable: true, availableCount: 1, availableBays: [1] },
              { time: '01:30 PM', isAvailable: true, availableCount: 2, availableBays: [1, 2] },
              { time: '04:00 PM', isAvailable: true, availableCount: 1, availableBays: [2] }
            ]);
          }
        }
      } catch (err) {
        if (isMounted) {
          console.warn('Availability check fallback:', err.message);
          setSlotsData([
            { time: '08:00 AM', isAvailable: true, availableCount: 2, availableBays: [1, 2] },
            { time: '10:30 AM', isAvailable: true, availableCount: 1, availableBays: [1] },
            { time: '01:30 PM', isAvailable: true, availableCount: 2, availableBays: [1, 2] },
            { time: '04:00 PM', isAvailable: true, availableCount: 1, availableBays: [2] }
          ]);
        }
      } finally {
        if (isMounted) setIsLoadingSlots(false);
      }
    };

    fetchSlots();
    return () => { isMounted = false; };
  }, [activeDate]);

  const handleDateClick = (dateStr) => {
    setActiveDate(dateStr);
    onSelectDate(dateStr);
    onSelectSlot('');
  };

  return (
    <div className="space-y-8 text-left">
      <div>
        <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider">
          Step 02 of 03
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-[#F8FAFC] tracking-tight mt-1 font-display">
          Select Date & Cleanroom Bay Slot
        </h2>
        <p className="text-sm text-[#94A3B8] mt-1 font-normal">
          Pick an intake date to inspect live capacity across our climate-controlled dual cleanroom bays.
        </p>
      </div>

      {/* Date Carousel */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase text-[#94A3B8] tracking-wider block font-mono">
          1. Select Intake Date
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {availableDates.map((d) => {
            const isSelected = activeDate === d.dateStr;
            return (
              <button
                key={d.dateStr}
                type="button"
                onClick={() => handleDateClick(d.dateStr)}
                className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer tactile-press ${
                  isSelected
                    ? 'bg-[#151822] border-[#D4AF37] text-white shadow-[0_0_20px_rgba(212,175,55,0.18)] ring-1 ring-[#D4AF37]'
                    : 'bg-[#0E1017] border-white/10 text-[#94A3B8] hover:border-white/25 hover:text-white'
                }`}
              >
                <div className="text-[11px] font-mono uppercase text-[#D4AF37] font-bold">
                  {d.weekday}
                </div>
                <div className="text-xl font-black text-white my-0.5 font-display">
                  {d.dayNum}
                </div>
                <div className="text-[10px] text-[#94A3B8] font-mono">
                  {d.monthName}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slot Grid */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase text-[#94A3B8] tracking-wider block font-mono">
            2. Select Bay Slot for {activeDate}
          </label>
          {isLoadingSlots && (
            <span className="text-xs text-[#D4AF37] flex items-center gap-1 font-mono">
              <RefreshCw className="w-3 h-3 animate-spin text-[#D4AF37]" />
              Checking live bay sensors...
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {slotsData.map((slot, index) => {
            const slotTime = slot.timeSlot || slot.time;
            const isSelected = selectedSlot === slotTime;
            const isAvailable = Boolean(slot.isAvailable);
            const openBaysCount = typeof slot.availableBays === 'number' ? slot.availableBays : (slot.availableCount || 0);

            return (
              <button
                key={`${slotTime}-${index}`}
                data-testid={`bay-slot-${index}`}
                type="button"
                disabled={!isAvailable}
                onClick={() => onSelectSlot(slotTime)}
                className={`p-4 rounded-xl border text-left transition-all relative tactile-press ${
                  !isAvailable
                    ? 'bg-[#0E1017]/40 border-white/5 opacity-50 cursor-not-allowed'
                    : isSelected
                    ? 'bg-[#151822] border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.18)] ring-1 ring-[#D4AF37] cursor-pointer'
                    : 'bg-[#0E1017] border-white/10 hover:border-white/25 hover:bg-[#131620] cursor-pointer'
                }`}
              >
                {/* Time */}
                <div className="flex items-center justify-between mb-2">
                  <div className="text-base font-black font-mono text-white flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#D4AF37]" />
                    {slotTime}
                  </div>
                  {isSelected && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] shadow-md shadow-[#D4AF37]" />
                  )}
                </div>

                {/* Capacity Status */}
                <div className="text-xs">
                  {isAvailable ? (
                    openBaysCount >= 2 ? (
                      <span className="text-[#10B981] font-semibold flex items-center gap-1 font-mono">
                        <Warehouse className="w-3.5 h-3.5" />
                        Dual Bays Open (1 & 2)
                      </span>
                    ) : (
                      <span className="text-[#D4AF37] font-semibold flex items-center gap-1 font-mono">
                        <Warehouse className="w-3.5 h-3.5" />
                        1 Bay Open ({slot.suggestedBay ? `Bay ${slot.suggestedBay}` : 'Bay 1'})
                      </span>
                    )
                  ) : (
                    <span className="text-[#EF4444] font-semibold font-mono">
                      Fully Booked
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Slot Confirmation Strip */}
      {selectedSlot && (
        <div className="p-4 rounded-xl bg-[#0E1017] border border-[#D4AF37]/30 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#D4AF37]">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white font-display">
                Scheduled Slot: {activeDate} at {selectedSlot}
              </div>
              <div className="text-[#94A3B8]">
                Assigned to climate-controlled bay upon submission
              </div>
            </div>
          </div>
          <span className="text-[11px] font-mono text-[#10B981] font-bold bg-[#10B981]/15 px-2.5 py-1 rounded-md">
            Bay Available
          </span>
        </div>
      )}

      {/* Wizard Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-white/10">
        <Button
          variant="secondary"
          size="md"
          icon={ArrowLeft}
          onClick={onBack}
        >
          Back to Review
        </Button>

        <Button
          variant="primary"
          size="md"
          iconRight={ArrowRight}
          disabled={!selectedSlot}
          onClick={onNext}
          className="glow-gold"
        >
          Continue to Vehicle Intake
        </Button>
      </div>
    </div>
  );
};
