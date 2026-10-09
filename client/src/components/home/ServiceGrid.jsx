import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Flame, 
  Layers,
  ChevronRight
} from 'lucide-react';
import { Button } from '../common/Button.jsx';
import { getServices } from '../../services/api.js';

const FALLBACK_PACKAGES = [
  {
    _id: 'p-ess-01',
    name: 'Essential Clean & Decon',
    tagline: 'Exterior decontamination and interior rejuvenation for well-maintained vehicles.',
    category: 'Essential',
    basePrice: 149,
    estimatedDurationMinutes: 90,
    isPopular: false,
    warrantyMonths: 3,
    features: [
      'pH-Neutral Citrus Pre-Wash & Dual-Bucket Foam Wash',
      'Chemical Iron Fallout & Road Tar Dissolution',
      'Wheel Barrel & Caliper Deep Clean with Acid-Free Gel',
      'Cabin Vacuum & Dashboard Satin Anti-Static Wipe',
      '3-Month Hydrophobic SiO2 Sealant Application'
    ]
  },
  {
    _id: 'p-sig-02',
    name: 'Signature Multi-Stage Detail',
    tagline: 'Single-stage rotary machine clarity polish eliminating 60-70% light swirl marks.',
    category: 'Correction',
    basePrice: 289,
    estimatedDurationMinutes: 180,
    isPopular: true,
    warrantyMonths: 12,
    features: [
      'Full Multi-Stage Chemical & Mechanical Clay Decon',
      'Single-Stage Machine Polish (65-75% Swirl Elimination)',
      'Hot Water Interior Steam Extraction & Stain Treatment',
      'Leather Conditioning with OEM Matte Finish',
      '12-Month Ceramic Spray Coating Protection',
      'Engine Bay Surface Steam & Dressing'
    ]
  },
  {
    _id: 'p-cer-03',
    name: 'Ultimate 9H Ceramic Shield',
    tagline: 'Dual-stage heavy compounding followed by true 9H professional ceramic glass coating.',
    category: 'Pinnacle Ceramic',
    basePrice: 499,
    estimatedDurationMinutes: 270,
    isPopular: false,
    warrantyMonths: 36,
    features: [
      '2-Stage Heavy Cut Compounding & Jeweling Polish (90%+ Elimination)',
      'Scangrip High-CRI Swirl & Defect Inspection Report',
      'Dual-Layer Pro-Grade 9H Nano-Ceramic Glass Coating',
      'Infrared (IR) Shortwave Heat Lamp Curing in Cleanroom',
      '3-Year Serialized Warranty Certificate',
      'Full Cockpit Leather Ceramic Coating Treatment'
    ]
  }
];

export const ServiceGrid = () => {
  const [packages, setPackages] = useState(FALLBACK_PACKAGES);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchLiveServices = async () => {
      try {
        setIsLoading(true);
        const res = await getServices();
        if (isMounted && res && res.data && Array.isArray(res.data) && res.data.length > 0) {
          // Normalize server fields if needed
          setPackages(res.data);
        }
      } catch (err) {
        console.warn('Using fallback studio service packages:', err.message);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchLiveServices();
    return () => { isMounted = false; };
  }, []);

  return (
    <section id="services" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-[#38BDF8] bg-[#38BDF8]/10 px-3.5 py-1.5 rounded-full border border-[#38BDF8]/20 inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Precision Preservation Packages
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mt-4 text-[#F8FAFC]">
          Formulated for Discerning Automotive Enthusiasts
        </h2>
        <p className="text-sm sm:text-base text-[#94A3B8] mt-3">
          Every vehicle is staged in our climate-controlled dual cleanroom bays under 96+ CRI inspection lights. Choose a baseline package or customize vehicle sizing in the Smart Builder.
        </p>
      </div>

      {/* Package Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((pkg) => {
          const isSignature = pkg.isPopular || pkg.name.includes('Signature');
          const isPinnacle = pkg.name.includes('Ceramic') || pkg.name.includes('Ultimate');

          return (
            <div
              key={pkg._id}
              className={`relative rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                isSignature
                  ? 'bg-[#161D2E] border-2 border-[#38BDF8] shadow-xl shadow-[#0284C7]/15 p-8 scale-[1.02]'
                  : 'bg-[#101522] border border-[#1D2536] hover:border-[#2A364E] p-8'
              }`}
            >
              {/* Popular Badge */}
              {isSignature && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#0284C7] text-white text-[10px] font-extrabold uppercase tracking-widest shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Most Popular • Atelier Choice
                </div>
              )}

              <div>
                {/* Stage Tag & Duration */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-bold uppercase tracking-wider font-mono ${
                    isSignature ? 'text-[#38BDF8]' : isPinnacle ? 'text-[#F59E0B]' : 'text-[#94A3B8]'
                  }`}>
                    {isPinnacle ? 'Pinnacle Tier' : isSignature ? 'Stage 02 Polish' : 'Stage 01 Decon'}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#1F273B] text-[#94A3B8] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {pkg.estimatedDurationMinutes} Mins
                  </span>
                </div>

                {/* Package Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {pkg.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-6">
                  {pkg.tagline || pkg.description}
                </p>

                {/* Starting Price */}
                <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-[#1D2536]">
                  <span className={`text-3xl sm:text-4xl font-extrabold font-mono ${
                    isSignature ? 'text-[#38BDF8]' : isPinnacle ? 'text-[#F59E0B]' : 'text-[#F8FAFC]'
                  }`}>
                    ${pkg.basePrice}
                  </span>
                  <span className="text-xs text-[#94A3B8]">/ baseline coupe & sedan</span>
                </div>

                {/* Features List */}
                <ul className="space-y-3 text-xs sm:text-sm text-[#94A3B8] mb-8">
                  {(pkg.features || []).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                        isSignature ? 'text-[#38BDF8]' : isPinnacle ? 'text-[#F59E0B]' : 'text-[#10B981]'
                      }`} />
                      <span className="text-[#E2E8F0]">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div>
                <Link to={`/builder?package=${pkg._id}`}>
                  <Button
                    variant={isSignature ? 'primary' : isPinnacle ? 'gold' : 'secondary'}
                    size="md"
                    iconRight={ArrowRight}
                    className={`w-full ${isSignature ? 'glow-cyan-sm' : ''}`}
                  >
                    Configure In Builder
                  </Button>
                </Link>
                <div className="text-[11px] text-center text-[#64748B] mt-2">
                  Dynamic vehicle multipliers applied
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
