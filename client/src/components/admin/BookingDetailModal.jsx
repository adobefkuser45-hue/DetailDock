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
  AlertTriangle,
  FileDown,
  CreditCard,
  MessageSquare,
  Smartphone,
  MailCheck,
  Award,
  Microscope,
  Gauge
} from 'lucide-react';
import { Button } from '../common/Button.jsx';
import { Badge } from '../common/Badge.jsx';
import { 
  getInvoiceDownloadUrl, 
  getWarrantyDownloadUrl, 
  resendBookingReceipt,
  issueWarrantyCertificate,
  updateInspectionData
} from '../../services/api.js';

export const BookingDetailModal = ({ booking, onClose, onUpdateStatus, isUpdating }) => {
  const [selectedStatus, setSelectedStatus] = useState(booking?.status || 'Pending');
  const [adminNote, setAdminNote] = useState('');
  const [bayNumber, setBayNumber] = useState(booking?.bayNumber || 1);
  const [paymentStatus, setPaymentStatus] = useState(booking?.payment?.status || 'unpaid');
  const [paymentMethod, setPaymentMethod] = useState(booking?.payment?.method || 'studio_pay');

  const [isIssuingWarranty, setIsIssuingWarranty] = useState(false);
  const [warrantySuccess, setWarrantySuccess] = useState(null);
  const [isSavingDvi, setIsSavingDvi] = useState(false);
  const [dviSuccess, setDviSuccess] = useState(null);
  const [dviData, setDviData] = useState({
    clearCoatDepthMicrons: booking.inspectionData?.intakeInspection?.clearCoatDepthMicrons || 118,
    finalGlossUnits: booking.inspectionData?.completionInspection?.finalGlossUnits || 98.4,
    swirlDefectEliminationPercent: booking.inspectionData?.completionInspection?.swirlDefectEliminationPercent || 95
  });

  if (!booking) return null;

  const handleIssueWarranty = async () => {
    try {
      setIsIssuingWarranty(true);
      const token = localStorage.getItem('detaildock_admin_token');
      const cert = await issueWarrantyCertificate(booking._id, {
        warrantyPeriodYears: 3
      }, token);
      setWarrantySuccess(cert.certificateNumber);
      setTimeout(() => setWarrantySuccess(null), 4000);
    } catch (err) {
      alert(`Error issuing warranty: ${err.message}`);
    } finally {
      setIsIssuingWarranty(false);
    }
  };

  const handleSaveDvi = async () => {
    try {
      setIsSavingDvi(true);
      const token = localStorage.getItem('detaildock_admin_token');
      await updateInspectionData(booking._id, {
        intakeInspection: {
          clearCoatDepthMicrons: Number(dviData.clearCoatDepthMicrons)
        },
        completionInspection: {
          finalGlossUnits: Number(dviData.finalGlossUnits),
          swirlDefectEliminationPercent: Number(dviData.swirlDefectEliminationPercent)
        }
      }, token);
      setDviSuccess(true);
      setTimeout(() => setDviSuccess(null), 3000);
    } catch (err) {
      alert(`Error saving DVI: ${err.message}`);
    } finally {
      setIsSavingDvi(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateStatus(booking, selectedStatus, adminNote, bayNumber, {
      paymentStatus,
      paymentMethod
    });
  };

  const vehicle = booking.vehicle || {};
  const customer = booking.customer || {};
  const payment = booking.payment || {};
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
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
              paymentStatus === 'paid' 
                ? 'bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/40'
                : paymentStatus === 'deposit_paid'
                ? 'bg-[#0284C7]/20 text-[#38BDF8] border border-[#0284C7]/40'
                : 'bg-[#F59E0B]/20 text-[#FBBF24] border border-[#F59E0B]/40'
            }`}>
              {paymentStatus === 'paid' ? 'Paid' : paymentStatus === 'deposit_paid' ? 'Deposit' : 'Unpaid'}
            </span>
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
            <div className="flex items-center justify-between pb-1 border-b border-[#1D2536]">
              <div className="font-bold text-white uppercase text-[11px] text-[#94A3B8]">
                Financial Breakdown & Settlement
              </div>
              <a
                href={getInvoiceDownloadUrl(booking.bookingCode)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#38BDF8] hover:underline flex items-center gap-1 text-[11px] font-semibold"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Download PDF Invoice</span>
              </a>
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
              <span>Total Invoice Amount:</span>
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

          {/* Direct Client Communications Dispatch Hub */}
          <div className="p-4 rounded-xl bg-[#161D2E] border border-[#2A364E] space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold uppercase text-white tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                <span>Direct Client Dispatch Hub</span>
              </div>
              <span className="text-[11px] font-mono text-[#38BDF8]">
                {customer.phone || 'No phone'}
              </span>
            </div>

            <p className="text-xs text-[#94A3B8]">
              Instantly notify customer of stage <span className="text-[#38BDF8] font-bold">({booking.status})</span> with 1-click via WhatsApp or SMS:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {customer.phone ? (
                <a
                  href={`https://wa.me/${(customer.phone || '').replace(/[^\d]/g, '')}?text=${encodeURIComponent(`DetailDock Atelier: Update on your ${vehicle.year || ''} ${vehicle.make || ''} ${vehicle.model || ''} (Ref: ${booking.bookingCode}). Current status: ${booking.status}. Cleanroom Bay: ${booking.bayNumber || 1}. Track live: https://client-mauve-zeta-13.vercel.app/track/${booking.bookingCode}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send WhatsApp Alert</span>
                </a>
              ) : (
                <div className="text-xs text-[#64748B] p-2 bg-[#090C12] rounded-xl border border-[#1D2536] text-center">
                  No mobile on file
                </div>
              )}

              {customer.phone ? (
                <a
                  href={`sms:${(customer.phone || '').replace(/[^\d]/g, '')}?body=${encodeURIComponent(`DetailDock Atelier: Update on your ${vehicle.year || ''} ${vehicle.make || ''} ${vehicle.model || ''} (Ref: ${booking.bookingCode}). Current status: ${booking.status}. Track live: https://client-mauve-zeta-13.vercel.app/track/${booking.bookingCode}`)}`}
                  className="py-2.5 px-3 rounded-xl bg-[#38BDF8]/15 hover:bg-[#38BDF8]/25 border border-[#38BDF8]/40 text-[#38BDF8] text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Send SMS Message</span>
                </a>
              ) : null}
            </div>
          </div>

          {/* DIGITAL CERAMIC WARRANTY & DVI INSPECTION TOOLS */}
          <div className="p-4 rounded-xl bg-[#090C12] border border-[#1E293B] space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold uppercase text-[#D97706] flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>Ceramic Coating Warranty & DVI Inspection</span>
              </div>
              {booking.warrantyCertificate?.certificateNumber && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30">
                  {booking.warrantyCertificate.certificateNumber}
                </span>
              )}
            </div>

            {/* DVI Telemetry Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] text-[#94A3B8] block mb-1">Intake Depth (µm)</label>
                <input
                  type="number"
                  value={dviData.clearCoatDepthMicrons}
                  onChange={(e) => setDviData({ ...dviData, clearCoatDepthMicrons: e.target.value })}
                  className="w-full bg-[#161D2E] border border-[#1D2536] rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#94A3B8] block mb-1">Final Gloss (GU)</label>
                <input
                  type="number"
                  step="0.1"
                  value={dviData.finalGlossUnits}
                  onChange={(e) => setDviData({ ...dviData, finalGlossUnits: e.target.value })}
                  className="w-full bg-[#161D2E] border border-[#1D2536] rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#94A3B8] block mb-1">Defect Elim (%)</label>
                <input
                  type="number"
                  value={dviData.swirlDefectEliminationPercent}
                  onChange={(e) => setDviData({ ...dviData, swirlDefectEliminationPercent: e.target.value })}
                  className="w-full bg-[#161D2E] border border-[#1D2536] rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#1E293B]">
              <button
                type="button"
                onClick={handleSaveDvi}
                disabled={isSavingDvi}
                className="px-3 py-1.5 rounded-lg bg-[#38BDF8]/20 hover:bg-[#38BDF8]/30 text-[#38BDF8] border border-[#38BDF8]/40 text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Microscope className="w-3.5 h-3.5" />
                {isSavingDvi ? 'Saving DVI...' : dviSuccess ? 'DVI Saved!' : 'Save DVI Telemetry'}
              </button>

              <div className="flex items-center gap-2">
                {booking.warrantyCertificate?.certificateNumber && (
                  <a
                    href={getWarrantyDownloadUrl(booking.bookingCode)}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="px-3 py-1.5 rounded-lg bg-[#161D2E] border border-[#2A364E] text-[#F59E0B] hover:text-white text-xs font-bold flex items-center gap-1 transition"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    PDF
                  </a>
                )}
                <button
                  type="button"
                  onClick={handleIssueWarranty}
                  disabled={isIssuingWarranty}
                  className="px-3.5 py-1.5 rounded-lg bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold flex items-center gap-1.5 transition shadow"
                >
                  <Award className="w-3.5 h-3.5" />
                  {isIssuingWarranty ? 'Generating...' : warrantySuccess ? `Issued ${warrantySuccess}` : 'Issue 3-Yr Warranty'}
                </button>
              </div>
            </div>
          </div>

          {/* UPDATE STATUS & SETTLEMENT FORM */}
          <form onSubmit={handleSubmit} className="p-4 rounded-xl bg-[#090C12] border border-[#2A364E] space-y-4">
            <div className="text-xs font-bold uppercase text-[#38BDF8] tracking-wider">
              Update Appointment Stage & Payment Settlement
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

            {/* Payment Settlement Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-[11px] text-[#94A3B8] block mb-1">
                  Payment Status:
                </label>
                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#161D2E] border border-[#1D2536] text-white focus:outline-none focus:border-[#38BDF8]"
                >
                  <option value="unpaid">Unpaid / Due on Arrival</option>
                  <option value="deposit_paid">Deposit Paid ($50.00)</option>
                  <option value="paid">Paid in Full</option>
                  <option value="refunded">Refunded</option>
                  <option value="waived">Waived / VIP</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] text-[#94A3B8] block mb-1">
                  Settlement Method:
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#161D2E] border border-[#1D2536] text-white focus:outline-none focus:border-[#38BDF8]"
                >
                  <option value="studio_pay">Pay at Studio Arrival</option>
                  <option value="stripe">Online Card (Stripe)</option>
                  <option value="card_present">Card Present (POS Terminal)</option>
                  <option value="cash">Cash / Direct Settlement</option>
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
              Save Stage Transition & Settlement
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
