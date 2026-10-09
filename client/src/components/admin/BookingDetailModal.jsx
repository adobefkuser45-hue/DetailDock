import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Clock, 
  Car, 
  User, 
  Warehouse, 
  ShieldCheck, 
  FileText, 
  Check, 
  AlertTriangle 
} from 'lucide-react';
import { Button } from '../common/Button.jsx';
import { Badge } from '../common/Badge.jsx';

export const BookingDetailModal = ({ booking, onClose, onUpdateStatus, isUpdating }) => {
  const [selectedStatus, setSelectedStatus] = useState(booking?.status || 'Pending');
  const [adminNote, setAdminNote] = useState('');
  const [bayNumber, setBayNumber] = useState(booking?.bayNumber || 1);

  if (!booking) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateStatus(booking, selectedStatus, adminNote, bayNumber);
  };

  const vehicle = booking.vehicle || {};
  const customer = booking.customer || {};
  const scheduledDate = booking.scheduledDate ? new Date(booking.scheduledDate).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }) : '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl rounded-3xl bg-[#101522] border-2 border-[#1D2536] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-left">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-[#1D2536] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl sm:text-2xl font-black font-mono text-[#38BDF8]">
              {booking.bookingCode}
            </span>
            <Badge status={booking.status} size="md" />
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#161D2E] text-[#94A3B8] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs">
          
          {/* Quick Telemetry Pods */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Vehicle */}
            <div className="p-3.5 rounded-xl bg-[#090C12] border border-[#1D2536]">
              <span className="text-[#64748B] uppercase font-bold flex items-center gap-1 mb-1">
                <Car className="w-3.5 h-3.5 text-[#38BDF8]" />
                Vehicle Spec
              </span>
              <div className="font-bold text-white text-sm">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </div>
              <div className="text-[#94A3B8] mt-0.5">
                {vehicle.paintColor || 'Standard'} • {vehicle.categoryName || vehicle.category || 'Sedan'}
              </div>
            </div>

            {/* Client */}
            <div className="p-3.5 rounded-xl bg-[#090C12] border border-[#1D2536]">
              <span className="text-[#64748B] uppercase font-bold flex items-center gap-1 mb-1">
                <User className="w-3.5 h-3.5 text-[#F59E0B]" />
                Customer
              </span>
              <div className="font-bold text-white text-sm">
                {customer.name}
              </div>
              <div className="text-[#94A3B8] mt-0.5 font-mono">
                {customer.phone || customer.maskedPhone}
              </div>
            </div>

            {/* Schedule */}
            <div className="p-3.5 rounded-xl bg-[#090C12] border border-[#1D2536]">
              <span className="text-[#64748B] uppercase font-bold flex items-center gap-1 mb-1">
                <Warehouse className="w-3.5 h-3.5 text-[#10B981]" />
                Bay Allocation
              </span>
              <div className="font-bold text-white text-sm">
                Cleanroom Bay {booking.bayNumber || 1}
              </div>
              <div className="text-[#38BDF8] mt-0.5 font-mono">
                {scheduledDate} ({booking.scheduledTimeSlot})
              </div>
            </div>
          </div>

          {/* Pricing & Service Breakdown */}
          <div className="p-4 rounded-xl bg-[#161D2E] border border-[#1D2536] space-y-2">
            <div className="font-bold text-white uppercase text-[11px] text-[#94A3B8] mb-2">
              Financial Breakdown
            </div>
            <div className="flex justify-between text-[#94A3B8]">
              <span>Package: {booking.packageSnapshot?.title || 'Selected Detail'}</span>
              <span className="font-mono text-white">${Number(booking.packageSnapshot?.calculatedPrice || booking.packageSnapshot?.basePrice || 0).toFixed(2)}</span>
            </div>
            {booking.addonsSnapshot?.map((a, i) => (
              <div key={i} className="flex justify-between text-[#94A3B8]">
                <span>+ Add-on: {a.title}</span>
                <span className="font-mono text-[#F59E0B]">+${Number(a.price).toFixed(2)}</span>
              </div>
            ))}
            <div className="pt-2 border-t border-[#1D2536] flex justify-between font-bold text-white text-sm">
              <span>Total Invoice:</span>
              <span className="font-mono text-[#38BDF8] text-base">${Number(booking.totalPrice || 0).toFixed(2)}</span>
            </div>
          </div>

          {/* Customer Special Notes */}
          {booking.notes && (
            <div className="p-4 rounded-xl bg-[#090C12] border border-[#1D2536]">
              <div className="text-[11px] font-bold uppercase text-[#94A3B8] mb-1">
                Customer Special Request / Handling Notes
              </div>
              <p className="text-white italic">"{booking.notes}"</p>
            </div>
          )}

          {/* UPDATE STATUS & NOTE FORM */}
          <form onSubmit={handleSubmit} className="p-4 rounded-xl bg-[#090C12] border border-[#2A364E] space-y-4">
            <div className="text-xs font-bold uppercase text-[#38BDF8] tracking-wider">
              Update Appointment Stage & Log Technician Remarks
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-[#94A3B8] block mb-1">
                  Target Stage Status:
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#161D2E] border border-[#1D2536] text-white focus:outline-none focus:border-[#38BDF8]"
                >
                  <option value="Pending">Pending (Requested)</option>
                  <option value="Confirmed">Confirmed (Bay Allocated)</option>
                  <option value="In Bay">In Bay (Detailing Active)</option>
                  <option value="Ready">Ready (Passed Inspection)</option>
                  <option value="Completed">Completed (Handover Done)</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] text-[#94A3B8] block mb-1">
                  Assigned Studio Bay:
                </label>
                <select
                  value={bayNumber}
                  onChange={(e) => setBayNumber(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-[#161D2E] border border-[#1D2536] text-white focus:outline-none focus:border-[#38BDF8]"
                >
                  <option value={1}>Cleanroom Bay 1</option>
                  <option value={2}>Cleanroom Bay 2</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] text-[#94A3B8] block mb-1">
                Technician Inspection Remark (Logged in Audit History):
              </label>
              <textarea
                rows="2"
                placeholder="e.g. Scangrip defect inspection complete; clear coat swirl elimination at 98 GU; applying dual-layer 9H ceramic."
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#161D2E] border border-[#1D2536] text-white placeholder-[#64748B] focus:outline-none focus:border-[#38BDF8]"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isUpdating}
              className="w-full glow-cyan-sm"
            >
              Save Stage Transition & Audit Trail
            </Button>
          </form>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#1D2536] bg-[#090C12] flex items-center justify-between text-xs">
          <a
            href={`/track/${booking.bookingCode}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#38BDF8] hover:underline flex items-center gap-1 font-mono"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Public Telemetry View</span>
          </a>

          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>

      </div>
    </div>
  );
};
