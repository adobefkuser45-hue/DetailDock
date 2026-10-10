import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  AlertCircle, 
  RefreshCw,
  Warehouse,
  Lock,
  Check
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

  // Next available date finder state
  const [nextAvailableDate, setNextAvailableDate] = useState(null);
  const [isSearchingNext, setIsSearchingNext] = useState(false);

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

  const allBooked = !isLoadingSlots && slotsData.length > 0 && slotsData.every(s => !s.isAvailable);
  const activeDateObj = availableDates.find(d => d.dateStr === activeDate);

  // When all slots on active date are booked, automatically find next available date
  useEffect(() => {
    let isMounted = true;
    if (allBooked) {
      const currentIndex = availableDates.findIndex(d => d.dateStr === activeDate);
      const remainingDates = availableDates.slice(currentIndex + 1);

      const findNext = async () => {
        setIsSearchingNext(true);
        for (const d of remainingDates) {
          try {
            const res = await getAvailability(d.dateStr);
            const slots = res?.data?.slots || res?.slots || [];
            if (slots.some(s => s.isAvailable)) {
              if (isMounted) {
                setNextAvailableDate(d);
                setIsSearchingNext(false);
              }
              return;
            }
          } catch (e) {
            // continue search
          }
        }
        if (isMounted) {
          if (remainingDates[0]) setNextAvailableDate(remainingDates[0]);
          setIsSearchingNext(false);
        }
      };
      findNext();
    } else {
      setNextAvailableDate(null);
      setIsSearchingNext(false);
    }
    return () => { isMounted = false; };
  }, [allBooked, activeDate]);

  const handleDateClick = (dateStr) => {
    setActiveDate(dateStr);
    onSelectDate(dateStr);
    onSelectSlot('');
  };

  const handleJumpToNextAvailable = () => {
    if (nextAvailableDate) {
      handleDateClick(nextAvailableDate.dateStr);
    } else {
      const currentIndex = availableDates.findIndex(d => d.dateStr === activeDate);
      if (currentIndex !== -1 && currentIndex + 1 < availableDates.length) {
        handleDateClick(availableDates[currentIndex + 1].dateStr);
      }
    }
  };

  return (
    <div className="space-y-8 text-left">
      <div>
        <span className="text-xs font-mono font-bold text-[#F59E0B] uppercase tracking-wider">
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
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase text-[#94A3B8] tracking-wider block font-mono">
            1. Select Intake Date
          </label>
          <span className="text-[11px] font-mono text-[#64748B]">
            Sundays Reserved for Facility Maintenance
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {availableDates.map((d) => {
            const isSelected = activeDate === d.dateStr;
            return (
              <button
                key={d.dateStr}
                type="button"
                onClick={() => handleDateClick(d.dateStr)}
                className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer tactile-press flex flex-col items-center justify-between min-h-[96px] ${
                  isSelected
                    ? 'bg-[#161D2A] border-[#F59E0B] text-white shadow-[0_0_24px_rgba(245,158,11,0.22)] ring-1 ring-[#F59E0B]'
                    : 'bg-[#111622] border-white/10 text-[#94A3B8] hover:border-white/25 hover:text-white hover:bg-[#151B27]'
                }`}
              >
                <div className="text-[11px] font-mono uppercase text-[#F59E0B] font-bold">
                  {d.weekday}
                </div>
                <div className="text-xl font-black text-white my-0.5 font-display">
                  {d.dayNum}
                </div>
                <div className="text-[10px] text-[#94A3B8] font-mono">
                  {d.monthName}
                </div>
                {isSelected && (
                  <div className="mt-1">
                    {isLoadingSlots ? (
                      <span className="inline-block w-2 h-2 rounded-full bg-[#F59E0B] animate-ping" />
                    ) : allBooked ? (
                      <span className="text-[9px] font-mono font-bold text-[#FCA5A5] bg-[#EF4444]/20 px-2 py-0.5 rounded border border-[#EF4444]/30">
                        Committed
                      </span>
                    ) : (
                      <span className="text-[9px] font-mono font-bold text-[#34D399] bg-[#10B981]/20 px-2 py-0.5 rounded border border-[#10B981]/30">
                        Bays Open
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Fully Committed Guidance Banner */}
      {allBooked && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#1C1412] to-[#121824] border border-[#F59E0B]/30 shadow-[0_12px_35px_rgba(0,0,0,0.6)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center shrink-0 text-[#F59E0B]">
              <AlertCircle className="w-5 h-5 text-[#F59E0B]" />
            </div>
            <div>
              <div className="text-sm font-bold text-white font-display flex items-center gap-2">
                Cleanroom Bays Fully Committed for {activeDateObj ? `${activeDateObj.weekday}, ${activeDateObj.monthName} ${activeDateObj.dayNum}` : activeDate}
                <span className="text-[10px] font-mono uppercase bg-[#EF4444]/20 text-[#FCA5A5] px-2 py-0.5 rounded font-bold border border-[#EF4444]/30">
                  Full Atelier Capacity
                </span>
              </div>
              <p className="text-xs text-[#94A3B8] mt-0.5">
                Both climate-controlled cleanroom bays are operating at maximum capacity to ensure zero double-booking and dedicated detailer isolation.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleJumpToNextAvailable}
            disabled={isSearchingNext}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-[#D97706] hover:to-[#B45309] text-[#0B0E14] font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-2 shrink-0 self-start sm:self-auto shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all cursor-pointer active:scale-95"
          >
            {isSearchingNext ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Calendar className="w-3.5 h-3.5" />
            )}
            <span>Jump to Next Open Date</span>
            {nextAvailableDate ? (
              <span className="font-sans font-black underline">
                ({nextAvailableDate.weekday} {nextAvailableDate.dayNum})
              </span>
            ) : null}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Time Slot Grid */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase text-[#94A3B8] tracking-wider block font-mono">
            2. Select Bay Slot for {activeDateObj ? `${activeDateObj.weekday}, ${activeDateObj.monthName} ${activeDateObj.dayNum}` : activeDate}
          </label>
          {isLoadingSlots && (
            <span className="text-xs text-[#F59E0B] flex items-center gap-1 font-mono">
              <RefreshCw className="w-3 h-3 animate-spin text-[#F59E0B]" />
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
                    ? 'bg-[#0E121B]/60 border-white/5 opacity-55 cursor-not-allowed'
                    : isSelected
                    ? 'bg-[#182030] border-[#F59E0B] shadow-[0_0_24px_rgba(245,158,11,0.25)] ring-1 ring-[#F59E0B] cursor-pointer'
                    : 'bg-[#111622] border-white/10 hover:border-[#F59E0B]/50 hover:bg-[#161D2A] cursor-pointer'
                }`}
              >
                {/* Time & Selection Indicator */}
                <div className="flex items-center justify-between mb-2.5">
                  <div className={`text-base font-black font-mono flex items-center gap-1.5 ${isAvailable ? 'text-white' : 'text-[#64748B]'}`}>
                    <Clock className={`w-4 h-4 ${isAvailable ? 'text-[#F59E0B]' : 'text-[#64748B]'}`} />
                    {slotTime}
                  </div>
                  {isAvailable && (
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected ? 'border-[#F59E0B] bg-[#F59E0B]' : 'border-slate-600'
                    }`}>
                      {isSelected && <div className="w-1.5 h-1.5 bg-[#0B0E14] rounded-full" />}
                    </div>
                  )}
                  {!isAvailable && (
                    <Lock className="w-3.5 h-3.5 text-[#EF4444]/60" />
                  )}
                </div>

                {/* Capacity Status */}
                <div className="text-xs">
                  {isAvailable ? (
                    openBaysCount >= 2 ? (
                      <div className="flex items-center justify-between">
                        <span className="text-[#10B981] font-semibold flex items-center gap-1 font-mono text-[11px]">
                          <Warehouse className="w-3.5 h-3.5" />
                          Dual Bays Open
                        </span>
                        <span className="text-[10px] font-mono font-bold text-[#10B981] bg-[#10B981]/15 px-1.5 py-0.5 rounded">
                          Bays 1 & 2
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span className="text-[#F59E0B] font-semibold flex items-center gap-1 font-mono text-[11px]">
                          <Warehouse className="w-3.5 h-3.5" />
                          1 Bay Open
                        </span>
                        <span className="text-[10px] font-mono font-bold text-[#F59E0B] bg-[#F59E0B]/15 px-1.5 py-0.5 rounded">
                          {slot.suggestedBay ? `Bay ${slot.suggestedBay}` : 'Bay 1'}
                        </span>
                      </div>
                    )
                  ) : (
                    <span className="text-[#94A3B8] font-semibold font-mono text-[11px] flex items-center gap-1">
                      Fully Reserved
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
        <div className="p-4 sm:p-4.5 rounded-2xl bg-gradient-to-r from-[#141B28] to-[#111622] border border-[#F59E0B]/40 shadow-[0_8px_30px_rgba(245,158,11,0.12)] flex items-center justify-between text-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B] shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white font-display text-sm flex items-center gap-2">
                Scheduled Slot: {activeDate} at {selectedSlot}
                <Check className="w-3.5 h-3.5 text-[#10B981]" />
              </div>
              <div className="text-[#94A3B8] text-[11px] mt-0.5">
                Climate-controlled cleanroom bay dedicated exclusively upon vehicle intake
              </div>
            </div>
          </div>
          <span className="text-[11px] font-mono text-[#10B981] font-bold bg-[#10B981]/15 border border-[#10B981]/30 px-3 py-1 rounded-lg shrink-0">
            Bay Reserved
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
          className="glow-amber"
        >
          Continue to Vehicle Intake
        </Button>
      </div>
    </div>
  );
};
