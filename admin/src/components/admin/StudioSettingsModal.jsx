import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  Warehouse, 
  X, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { Button } from '../common/Button.jsx';
import { getPublicStudioSettings, updateStudioSettings } from '../../services/api.js';

export const StudioSettingsModal = ({ isOpen, onClose, token, onSettingsUpdated }) => {
  const [formData, setFormData] = useState({
    studioName: 'DetailDock Luxury Atelier',
    contactPhone: '+1 (555) 348-2450',
    contactEmail: 'concierge@detaildock.com',
    street: '1440 Velocity Way, Suite 100',
    city: 'Austin',
    state: 'TX',
    zip: '78701',
    openTime: '09:00 AM',
    closeTime: '06:00 PM',
    maxBayCapacity: 2
  });

  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (isOpen) {
      getPublicStudioSettings()
        .then(settings => {
          if (settings) {
            setFormData({
              studioName: settings.studioName || 'DetailDock Luxury Atelier',
              contactPhone: settings.contactPhone || '+1 (555) 348-2450',
              contactEmail: settings.contactEmail || 'concierge@detaildock.com',
              street: settings.address?.street || '1440 Velocity Way, Suite 100',
              city: settings.address?.city || 'Austin',
              state: settings.address?.state || 'TX',
              zip: settings.address?.zip || '78701',
              openTime: settings.operatingHours?.openTime || '09:00 AM',
              closeTime: settings.operatingHours?.closeTime || '06:00 PM',
              maxBayCapacity: settings.maxBayCapacity || 2
            });
          }
        })
        .catch(err => console.warn('Could not load studio settings:', err.message));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  const handleResetDefaults = () => {
    setFormData({
      studioName: 'DetailDock Luxury Atelier',
      contactPhone: '+1 (555) 348-2450',
      contactEmail: 'concierge@detaildock.com',
      street: '1440 Velocity Way, Suite 100',
      city: 'Austin',
      state: 'TX',
      zip: '78701',
      openTime: '09:00 AM',
      closeTime: '06:00 PM',
      maxBayCapacity: 2
    });
    setSuccessMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const payload = {
        studioName: formData.studioName.trim(),
        contactPhone: formData.contactPhone.trim(),
        contactEmail: formData.contactEmail.trim(),
        address: {
          street: formData.street.trim(),
          city: formData.city.trim(),
          state: formData.state.trim(),
          zip: formData.zip.trim()
        },
        operatingHours: {
          openTime: formData.openTime.trim(),
          closeTime: formData.closeTime.trim(),
          slotIntervalMinutes: 120
        },
        maxBayCapacity: Number(formData.maxBayCapacity) || 2
      };

      await updateStudioSettings(payload, token);
      setSuccessMessage('Studio settings updated successfully! Platform is now white-labeled with your identity.');
      if (onSettingsUpdated) onSettingsUpdated();
    } catch (err) {
      setErrorMessage(err.message || 'Could not update studio settings. Check administrator authentication.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn text-left">
      <div className="w-full max-w-2xl rounded-3xl bg-[#0B0E14] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#111622]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B]">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#F59E0B] bg-[#F59E0B]/10 px-2 py-0.5 rounded border border-[#F59E0B]/20">
                White-Label Customizer
              </span>
              <h3 className="text-xl font-extrabold text-[#F8FAFC] mt-1 font-display">
                Studio Identity & Location Settings
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#94A3B8] hover:text-white rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
          {successMessage && (
            <div className="p-3.5 rounded-xl bg-[#10B981]/15 border border-[#10B981]/40 flex items-center gap-2.5 text-xs text-[#34D399]">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-[#EF4444]/15 border border-[#EF4444]/40 flex items-center gap-2.5 text-xs text-[#FCA5A5]">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Section: Business Branding */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase text-[#94A3B8] tracking-wider flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Business Brand & Contacts</span>
            </h4>

            <div>
              <label className="text-xs font-semibold text-[#CBD5E1] block mb-1">
                Studio / Business Trade Name
              </label>
              <input
                type="text"
                value={formData.studioName}
                onChange={(e) => handleChange('studioName', e.target.value)}
                placeholder="e.g. Apex Auto Detailing Spa"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#111622] border border-white/10 focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B]/50 text-xs text-[#F8FAFC] placeholder-[#64748B] focus:outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-[#CBD5E1] block mb-1">
                  Concierge Phone Number
                </label>
                <input
                  type="text"
                  value={formData.contactPhone}
                  onChange={(e) => handleChange('contactPhone', e.target.value)}
                  placeholder="+1 (555) 348-2450"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#111622] border border-white/10 focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B]/50 text-xs text-[#F8FAFC] placeholder-[#64748B] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#CBD5E1] block mb-1">
                  Concierge Invoicing Email
                </label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => handleChange('contactEmail', e.target.value)}
                  placeholder="concierge@detaildock.com"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#111622] border border-white/10 focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B]/50 text-xs text-[#F8FAFC] placeholder-[#64748B] focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Section: Physical Atelier Location */}
          <div className="space-y-3 pt-2 border-t border-white/10">
            <h4 className="text-xs font-mono font-bold uppercase text-[#94A3B8] tracking-wider flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Studio Physical Address</span>
            </h4>

            <div>
              <label className="text-xs font-semibold text-[#CBD5E1] block mb-1">
                Street Address & Suite
              </label>
              <input
                type="text"
                value={formData.street}
                onChange={(e) => handleChange('street', e.target.value)}
                placeholder="1440 Velocity Way, Suite 100"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#111622] border border-white/10 focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B]/50 text-xs text-[#F8FAFC] placeholder-[#64748B] focus:outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-semibold text-[#CBD5E1] block mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  placeholder="Austin"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#111622] border border-white/10 focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B]/50 text-xs text-[#F8FAFC] placeholder-[#64748B] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#CBD5E1] block mb-1">
                  State
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleChange('state', e.target.value)}
                  placeholder="TX"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#111622] border border-white/10 focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B]/50 text-xs text-[#F8FAFC] placeholder-[#64748B] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#CBD5E1] block mb-1">
                  ZIP / Postal
                </label>
                <input
                  type="text"
                  value={formData.zip}
                  onChange={(e) => handleChange('zip', e.target.value)}
                  placeholder="78701"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#111622] border border-white/10 focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B]/50 text-xs text-[#F8FAFC] placeholder-[#64748B] focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Section: Facility Operations & Bays */}
          <div className="space-y-3 pt-2 border-t border-white/10">
            <h4 className="text-xs font-mono font-bold uppercase text-[#94A3B8] tracking-wider flex items-center gap-2">
              <Warehouse className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Facility Capacity & Operating Hours</span>
            </h4>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-semibold text-[#CBD5E1] block mb-1">
                  Open Time
                </label>
                <input
                  type="text"
                  value={formData.openTime}
                  onChange={(e) => handleChange('openTime', e.target.value)}
                  placeholder="09:00 AM"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#111622] border border-white/10 focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B]/50 text-xs text-[#F8FAFC] placeholder-[#64748B] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#CBD5E1] block mb-1">
                  Close Time
                </label>
                <input
                  type="text"
                  value={formData.closeTime}
                  onChange={(e) => handleChange('closeTime', e.target.value)}
                  placeholder="06:00 PM"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#111622] border border-white/10 focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B]/50 text-xs text-[#F8FAFC] placeholder-[#64748B] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#CBD5E1] block mb-1">
                  Cleanroom Bays
                </label>
                <select
                  value={formData.maxBayCapacity}
                  onChange={(e) => handleChange('maxBayCapacity', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#111622] border border-white/10 focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B]/50 text-xs text-[#F8FAFC] focus:outline-none transition-colors"
                >
                  <option value={1}>1 Detailing Bay</option>
                  <option value={2}>2 Detailing Bays</option>
                  <option value={3}>3 Detailing Bays</option>
                  <option value={4}>4 Detailing Bays</option>
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleResetDefaults}
              className="text-xs text-[#94A3B8] hover:text-[#F8FAFC] flex items-center gap-1.5 transition-colors font-mono cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Factory Defaults</span>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="w-full sm:w-auto text-xs border border-white/10 text-[#CBD5E1] hover:text-white cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                isLoading={saving}
                className="w-full sm:w-auto text-xs glow-amber font-bold cursor-pointer"
              >
                Save White-Label Identity
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
