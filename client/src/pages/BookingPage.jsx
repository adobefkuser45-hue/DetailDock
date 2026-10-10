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
  calculatePricing,
  createCheckoutSession 
} from '../services/api.js';
import { useStudio } from '../context/StudioContext.jsx';

export const BookingPage = () => {
  const { settings } = useStudio();
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

  // Payment Selection State
  const [paymentConfig, setPaymentConfig] = useState({ method: 'studio_pay', option: 'full' });

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
        paymentMethod: paymentConfig.method,
        notes: formData.notes?.trim() || undefined
      };

      const res = await createBooking(payload);
      if (res && res.data) {
        const bookingData = { ...res.data };

        // If Stripe payment selected, initiate checkout session
        if (paymentConfig.method === 'stripe') {
          try {
            const checkoutRes = await createCheckoutSession({
              bookingCode: bookingData.bookingCode,
              payFull: paymentConfig.option === 'full',
              depositAmount: 50
            });
            if (checkoutRes?.url) {
              bookingData.checkoutUrl = checkoutRes.url;
              bookingData.payment = {
                ...bookingData.payment,
                status: paymentConfig.option === 'full' ? 'paid' : 'deposit_paid',
                amountPaid: checkoutRes.amount
              };
            }
          } catch (payErr) {
            console.warn('Stripe checkout session initialization note:', payErr.message);
          }
        }

        setConfirmedBooking(bookingData);
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

  // Scroll to top on step change for clear visibility
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  return (
    <div className="w-full bg-[#0B0E14] text-[#F8FAFC] min-h-screen pt-32 pb-24 sm:pt-36 sm:pb-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111622] border border-white/10 text-xs font-semibold text-[#F59E0B] mb-4">
            <Warehouse className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span className="font-mono">
              {settings?.maxBayCapacity === 1 ? 'Single Cleanroom Bay' : `${settings?.maxBayCapacity || 2} Cleanroom Bays`} • {settings?.address?.city || 'Austin'} Atelier
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#F8FAFC] tracking-[-0.03em] font-display">
            Reserve Studio Bay Slot
          </h1>
          <p className="text-sm text-[#94A3B8] mt-2 font-normal">
            Capacity-guarded scheduling ensuring your vehicle receives sterile bay isolation, dedicated technicians, and zero double booking.
          </p>
        </div>

        {/* Multi-Step Wizard Progress Bar (Steps 1, 2, 3) */}
        {currentStep < 4 && (
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-between relative">
              {/* Connecting background bar */}
              <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[2px] bg-white/10 -z-0" />
              <div 
                className="absolute top-1/2 left-0 -translate-y-1/2 h-[2px] bg-[#F59E0B] shadow-[0_0_12px_rgba(245,158,11,0.7)] transition-all duration-300 -z-0" 
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
                  <div key={item.step} className="flex flex-col items-center bg-[#0B0E14] px-3 z-10">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-black font-mono transition-all ${
                      isPassed
                        ? 'bg-[#10B981] text-white shadow-md'
                        : isCurrent
                        ? 'bg-[#F59E0B] text-[#0B0E14] ring-4 ring-[#F59E0B]/20 shadow-lg shadow-[#F59E0B]/40'
                        : 'bg-[#111622] text-[#94A3B8] border border-white/10'
                    }`}>
                      {isPassed ? <Check className="w-4 h-4 stroke-[3]" /> : item.step}
                    </div>
                    <span className={`text-xs mt-2 font-medium font-mono ${
                      isCurrent ? 'text-white font-bold' : isPassed ? 'text-[#F59E0B]' : 'text-[#64748B]'
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
              category={category}
              formData={formData}
              onChangeForm={handleFormChange}
              totalPrice={pricing?.summary?.totalPrice || pkg?.basePrice || 0}
              paymentConfig={paymentConfig}
              onChangePayment={setPaymentConfig}
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
