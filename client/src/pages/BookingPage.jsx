import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  ArrowLeft,
  Car, 
  Sparkles,
  Warehouse
} from 'lucide-react';
import { BookingSummaryStep } from '../components/booking/BookingSummaryStep.jsx';
import { SlotPickerStep } from '../components/booking/SlotPickerStep.jsx';
import { CustomerIntakeStep } from '../components/booking/CustomerIntakeStep.jsx';
import { BookingConfirmation } from '../components/booking/BookingConfirmation.jsx';
import { 
  getVehicleCategories, 
  getServices, 
  getAddons, 
  createBooking, 
  calculatePricing 
} from '../services/api.js';

export const BookingPage = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Active step (1: Review, 2: Date & Slot, 3: Intake, 4: Confirmed)
  const [currentStep, setCurrentStep] = useState(1);

  // Selected Service Configuration
  const [category, setCategory] = useState(location.state?.category || null);
  const [pkg, setPkg] = useState(location.state?.package || null);
  const [addons, setAddons] = useState(location.state?.addons || []);
  const [pricing, setPricing] = useState(location.state?.pricing || null);

  // Scheduling State
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');

  // Customer & Vehicle Form State
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: new Date().getFullYear(),
    vehicleColor: '',
    vehicleLicensePlate: '',
    notes: ''
  });

  // Submission & Confirmation State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Initial Data Fallback / Hydration from URL query parameters if state is empty
  useEffect(() => {
    let isMounted = true;

    const hydrateFromCatalog = async () => {
      if (category && pkg) return; // already loaded from state

      try {
        const [cats, pkgs, adds] = await Promise.all([
          getVehicleCategories(),
          getServices(),
          getAddons()
        ]);

        if (!isMounted) return;

        // Resolve Category
        const catSlug = searchParams.get('category');
        const resolvedCat = (cats && cats.find(c => c.slug === catSlug)) || cats?.[0] || {
          _id: 'cat-sedan',
          name: 'Compact / Sedan',
          slug: 'sedan',
          priceMultiplier: 1.0,
          durationMultiplier: 1.0
        };
        setCategory(resolvedCat);

        // Resolve Package
        const pkgSlug = searchParams.get('package');
        const resolvedPkg = (pkgs && pkgs.find(p => p.slug === pkgSlug)) || (pkgs && pkgs.find(p => p.isPopular)) || pkgs?.[0] || {
          _id: 'pkg-sig',
          title: 'Signature Multi-Stage Detail',
          slug: 'signature-detail',
          basePrice: 289,
          baseDurationMinutes: 180
        };
        setPkg(resolvedPkg);

        // Resolve Addons
        const addonSlugs = searchParams.get('addons')?.split(',').filter(Boolean) || [];
        const resolvedAddons = adds ? adds.filter(a => addonSlugs.includes(a.slug)) : [];
        setAddons(resolvedAddons);

        // Calculate Pricing Snapshot
        const priceRes = await calculatePricing({
          vehicleCategorySlug: resolvedCat.slug,
          packageSlug: resolvedPkg.slug,
          addonSlugs: resolvedAddons.map(a => a.slug)
        }).catch(() => null);

        if (isMounted && priceRes) {
          setPricing(priceRes);
        }
      } catch (err) {
        console.warn('Catalog hydration note in booking:', err.message);
      }
    };

    hydrateFromCatalog();
    return () => { isMounted = false; };
  }, [category, pkg, searchParams]);

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Submit Booking to Backend
  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        customer: {
          name: formData.customerName.trim(),
          email: formData.customerEmail.trim(),
          phone: formData.customerPhone.trim()
        },
        vehicle: {
          make: formData.vehicleMake.trim(),
          model: formData.vehicleModel.trim(),
          year: Number(formData.vehicleYear),
          color: formData.vehicleColor?.trim() || undefined,
          licensePlate: formData.vehicleLicensePlate?.trim() || undefined,
          categorySlug: category?.slug || 'sedan'
        },
        packageSlug: pkg?.slug || 'signature-detail',
        addonSlugs: addons.map(a => a.slug),
        scheduledDate: selectedDate,
        scheduledTimeSlot: selectedSlot,
        notes: formData.notes?.trim() || undefined
      };

      const res = await createBooking(payload);
      if (res && res.data) {
        setConfirmedBooking(res.data);
        setCurrentStep(4);
      } else {
        throw new Error('Unexpected server response format');
      }
    } catch (err) {
      console.error('Booking submission failed:', err);
      setSubmitError(err.message || 'Failed to complete bay reservation. Please try again or contact studio.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#090C12] text-[#F8FAFC] min-h-screen py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101522] border border-[#2A364E] text-xs font-semibold text-[#38BDF8] mb-3">
            <Warehouse className="w-3.5 h-3.5" />
            <span>Dual Cleanroom Bays • Austin Atelier</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F8FAFC] tracking-tight">
            Reserve Studio Bay Slot
          </h1>
          <p className="text-sm text-[#94A3B8] mt-2">
            Capacity-guarded scheduling ensuring your vehicle receives sterile bay isolation, dedicated technicians, and zero double booking.
          </p>
        </div>

        {/* Multi-Step Wizard Progress Bar (Steps 1, 2, 3) */}
        {currentStep < 4 && (
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-between relative">
              {/* Connecting background bar */}
              <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[2px] bg-[#1D2536] -z-0" />
              <div 
                className="absolute top-1/2 left-0 -translate-y-1/2 h-[2px] bg-[#38BDF8] transition-all duration-300 -z-0" 
                style={{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%' }}
              />

              {[
                { step: 1, label: '1. Review Spec' },
                { step: 2, label: '2. Date & Bay' },
                { step: 3, label: '3. Vehicle Intake' }
              ].map((item) => {
                const isPassed = currentStep > item.step;
                const isCurrent = currentStep === item.step;

                return (
                  <div key={item.step} className="flex flex-col items-center bg-[#090C12] px-3 z-10">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-extrabold font-mono transition-all ${
                      isPassed
                        ? 'bg-[#10B981] text-white shadow-md'
                        : isCurrent
                        ? 'bg-[#0284C7] text-white ring-4 ring-[#0284C7]/20 shadow-lg shadow-[#0284C7]/40'
                        : 'bg-[#161D2E] text-[#64748B] border border-[#1D2536]'
                    }`}>
                      {isPassed ? <Check className="w-4 h-4 stroke-[3]" /> : item.step}
                    </div>
                    <span className={`text-xs mt-2 font-medium ${
                      isCurrent ? 'text-white font-bold' : isPassed ? 'text-[#38BDF8]' : 'text-[#64748B]'
                    }`}>
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Wizard Step Render */}
        <div className="max-w-4xl mx-auto">
          {currentStep === 1 && (
            <BookingSummaryStep
              category={category}
              pkg={pkg}
              addons={addons}
              pricing={pricing}
              onNext={() => setCurrentStep(2)}
            />
          )}

          {currentStep === 2 && (
            <SlotPickerStep
              selectedDate={selectedDate}
              selectedSlot={selectedSlot}
              onSelectDate={setSelectedDate}
              onSelectSlot={setSelectedSlot}
              onNext={() => setCurrentStep(3)}
              onBack={() => setCurrentStep(1)}
            />
          )}

          {currentStep === 3 && (
            <CustomerIntakeStep
              formData={formData}
              onChangeForm={handleFormChange}
              onSubmit={handleFinalSubmit}
              onBack={() => setCurrentStep(2)}
              isSubmitting={isSubmitting}
              submitError={submitError}
            />
          )}

          {currentStep === 4 && confirmedBooking && (
            <BookingConfirmation
              booking={confirmedBooking}
            />
          )}
        </div>

      </div>
    </div>
  );
};
