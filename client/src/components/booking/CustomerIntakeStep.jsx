import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Car, 
  FileText, 
  ShieldCheck, 
  ArrowLeft, 
  AlertCircle,
  Hash,
  Palette
} from 'lucide-react';
import { Button } from '../common/Button.jsx';
import { PaymentSelector } from './PaymentSelector.jsx';

export const CustomerIntakeStep = ({
  formData,
  onChangeForm,
  totalPrice,
  paymentConfig,
  onChangePayment,
  onSubmit,
  onBack,
  isSubmitting,
  submitError
}) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.customerName?.trim()) errs.customerName = 'Full name is required';
    if (!formData.customerEmail?.trim()) {
      errs.customerEmail = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail.trim())) {
      errs.customerEmail = 'Please provide a valid email address';
    }
    if (!formData.customerPhone?.trim()) errs.customerPhone = 'Phone number is required';
    
    if (!formData.vehicleMake?.trim()) errs.vehicleMake = 'Vehicle make is required (e.g. Porsche)';
    if (!formData.vehicleModel?.trim()) errs.vehicleModel = 'Vehicle model is required (e.g. 911 GT3)';
    
    const yearNum = Number(formData.vehicleYear);
    const currentYear = new Date().getFullYear();
    if (!formData.vehicleYear || isNaN(yearNum) || yearNum < 1920 || yearNum > currentYear + 2) {
      errs.vehicleYear = `Year must be between 1920 and ${currentYear + 1}`;
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-8 text-left">
      <div>
        <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider">
          Step 03 of 03
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-[#F8FAFC] tracking-tight mt-1 font-display">
          Vehicle Intake & Client Credentials
        </h2>
        <p className="text-sm text-[#94A3B8] mt-1 font-normal">
          Provide your vehicle details and contact information to confirm your reserved slot and generate your live job tracking code.
        </p>
      </div>

      {submitError && (
        <div className="p-4 rounded-xl bg-[#EF4444]/15 border border-[#EF4444]/40 flex items-start gap-3 text-xs text-[#FCA5A5]">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#EF4444]" />
          <div>
            <div className="font-bold">Reservation Error</div>
            <div>{submitError}</div>
          </div>
        </div>
      )}

      {/* SECTION 1: VEHICLE DETAILS */}
      <div className="p-6 sm:p-7 rounded-2xl bg-[#0E1017] border border-white/10 space-y-4 shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-2 pb-3 border-b border-white/10">
          <Car className="w-4 h-4 text-[#D4AF37]" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono">
            Vehicle Specification
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Make */}
          <div>
            <label className="text-xs font-semibold text-[#94A3B8] block mb-1">
              Make / Manufacturer *
            </label>
            <input
              type="text"
              placeholder="e.g. Porsche"
              value={formData.vehicleMake || ''}
              onChange={(e) => onChangeForm('vehicleMake', e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl bg-[#08090C] border text-xs text-white placeholder-[#64748B] focus:outline-none transition-colors ${
                errors.vehicleMake ? 'border-[#EF4444]' : 'border-white/10 focus:border-[#D4AF37]'
              }`}
            />
            {errors.vehicleMake && <p className="text-[11px] text-[#EF4444] mt-1">{errors.vehicleMake}</p>}
          </div>

          {/* Model */}
          <div>
            <label className="text-xs font-semibold text-[#94A3B8] block mb-1">
              Model *
            </label>
            <input
              type="text"
              placeholder="e.g. 911 GT3 RS"
              value={formData.vehicleModel || ''}
              onChange={(e) => onChangeForm('vehicleModel', e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl bg-[#08090C] border text-xs text-white placeholder-[#64748B] focus:outline-none transition-colors ${
                errors.vehicleModel ? 'border-[#EF4444]' : 'border-white/10 focus:border-[#D4AF37]'
              }`}
            />
            {errors.vehicleModel && <p className="text-[11px] text-[#EF4444] mt-1">{errors.vehicleModel}</p>}
          </div>

          {/* Year */}
          <div>
            <label className="text-xs font-semibold text-[#94A3B8] block mb-1">
              Year *
            </label>
            <input
              type="number"
              placeholder="e.g. 2024"
              value={formData.vehicleYear || ''}
              onChange={(e) => onChangeForm('vehicleYear', e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl bg-[#08090C] border text-xs text-white placeholder-[#64748B] focus:outline-none transition-colors ${
                errors.vehicleYear ? 'border-[#EF4444]' : 'border-white/10 focus:border-[#D4AF37]'
              }`}
            />
            {errors.vehicleYear && <p className="text-[11px] text-[#EF4444] mt-1">{errors.vehicleYear}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {/* Color */}
          <div>
            <label className="text-xs font-semibold text-[#94A3B8] block mb-1">
              Color / Finish (Optional)
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Shark Blue (Gloss)"
                value={formData.vehicleColor || ''}
                onChange={(e) => onChangeForm('vehicleColor', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090C] border border-white/10 text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#D4AF37]"
              />
              <Palette className="w-4 h-4 text-[#D4AF37] absolute right-3 top-3" />
            </div>
          </div>

          {/* License Plate */}
          <div>
            <label className="text-xs font-semibold text-[#94A3B8] block mb-1">
              License Plate (Optional)
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. TX-DOCK911"
                value={formData.vehicleLicensePlate || ''}
                onChange={(e) => onChangeForm('vehicleLicensePlate', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090C] border border-white/10 text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#D4AF37]"
              />
              <Hash className="w-4 h-4 text-[#D4AF37] absolute right-3 top-3" />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: CUSTOMER CONTACT */}
      <div className="p-6 sm:p-7 rounded-2xl bg-[#0E1017] border border-white/10 space-y-4 shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-2 pb-3 border-b border-white/10">
          <User className="w-4 h-4 text-[#D4AF37]" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono">
            Client Contact Information
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Full Name */}
          <div>
            <label className="text-xs font-semibold text-[#94A3B8] block mb-1">
              Full Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Alexander Rivera"
              value={formData.customerName || ''}
              onChange={(e) => onChangeForm('customerName', e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl bg-[#08090C] border text-xs text-white placeholder-[#64748B] focus:outline-none transition-colors ${
                errors.customerName ? 'border-[#EF4444]' : 'border-white/10 focus:border-[#D4AF37]'
              }`}
            />
            {errors.customerName && <p className="text-[11px] text-[#EF4444] mt-1">{errors.customerName}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-semibold text-[#94A3B8] block mb-1">
              Email Address *
            </label>
            <input
              type="email"
              placeholder="e.g. alex@example.com"
              value={formData.customerEmail || ''}
              onChange={(e) => onChangeForm('customerEmail', e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl bg-[#08090C] border text-xs text-white placeholder-[#64748B] focus:outline-none transition-colors ${
                errors.customerEmail ? 'border-[#EF4444]' : 'border-white/10 focus:border-[#D4AF37]'
              }`}
            />
            {errors.customerEmail && <p className="text-[11px] text-[#EF4444] mt-1">{errors.customerEmail}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="text-xs font-semibold text-[#94A3B8] block mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              placeholder="e.g. (512) 555-0199"
              value={formData.customerPhone || ''}
              onChange={(e) => onChangeForm('customerPhone', e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl bg-[#08090C] border text-xs text-white placeholder-[#64748B] focus:outline-none transition-colors ${
                errors.customerPhone ? 'border-[#EF4444]' : 'border-white/10 focus:border-[#D4AF37]'
              }`}
            />
            {errors.customerPhone && <p className="text-[11px] text-[#EF4444] mt-1">{errors.customerPhone}</p>}
          </div>
        </div>

        {/* Special Instructions / Notes */}
        <div>
          <label className="text-xs font-semibold text-[#94A3B8] block mb-1">
            Special Handling Instructions (Optional)
          </label>
          <textarea
            rows="3"
            placeholder="e.g. Please check clear coat swirl marks under Scangrip lamps on driver side rear quarter panel..."
            value={formData.notes || ''}
            onChange={(e) => onChangeForm('notes', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090C] border border-white/10 text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      </div>

      {/* SECTION 3: PAYMENT PREFERENCE & STRIPE SETTLEMENT */}
      <PaymentSelector
        totalPrice={totalPrice}
        paymentConfig={paymentConfig}
        onChange={onChangePayment}
      />

      {/* Confirmation Submit Strip */}
      <div className="flex items-center justify-between pt-6 border-t border-white/10">
        <Button
          type="button"
          variant="secondary"
          size="md"
          icon={ArrowLeft}
          onClick={onBack}
        >
          Back to Bay Selection
        </Button>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          iconRight={ShieldCheck}
          disabled={isSubmitting}
          className="glow-gold"
        >
          {isSubmitting ? 'Securing Bay Slot...' : 'Confirm & Reserve Slot'}
        </Button>
      </div>
    </form>
  );
};
