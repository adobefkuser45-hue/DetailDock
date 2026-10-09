import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Gauge, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Clock, 
  Cpu, 
  RotateCcw,
  AlertCircle
} from 'lucide-react';
import { Button } from '../components/common/Button.jsx';
import { LoadingSpinner } from '../components/common/LoadingSpinner.jsx';
import { VehicleSelector } from '../components/builder/VehicleSelector.jsx';
import { PackageSelector } from '../components/builder/PackageSelector.jsx';
import { AddonSelector } from '../components/builder/AddonSelector.jsx';
import { PricingCockpit } from '../components/builder/PricingCockpit.jsx';
import { 
  getVehicleCategories, 
  getServices, 
  getAddons, 
  calculatePricing 
} from '../services/api.js';

// High-fidelity fallback catalog if backend API is cold or starting up
const FALLBACK_CATEGORIES = [
  {
    _id: 'cat-sedan',
    name: 'Compact / Sedan',
    slug: 'sedan',
    priceMultiplier: 1.0,
    durationMultiplier: 1.0,
    description: 'Standard 2-door coupe, hatchback, or 4-door sedan chassis.',
    iconName: 'Car'
  },
  {
    _id: 'cat-exec',
    name: 'Executive / Coupe',
    slug: 'executive-coupe',
    priceMultiplier: 1.1,
    durationMultiplier: 1.05,
    description: 'Luxury touring coupes and executive saloons with intricate trim.',
    iconName: 'Sparkles'
  },
  {
    _id: 'cat-csuv',
    name: 'Compact SUV / Crossover',
    slug: 'compact-suv',
    priceMultiplier: 1.25,
    durationMultiplier: 1.15,
    description: 'Mid-size crossovers, wagons, and compact SUVs.',
    iconName: 'CarFront'
  },
  {
    _id: 'cat-fsuv',
    name: 'Full-Size SUV / Truck',
    slug: 'full-suv',
    priceMultiplier: 1.45,
    durationMultiplier: 1.30,
    description: 'Extended wheelbase SUVs, minivans, and full-size commercial trucks.',
    iconName: 'Truck'
  }
];

const FALLBACK_PACKAGES = [
  {
    _id: 'pkg-ess',
    title: 'Essential Clean & Decon',
    slug: 'essential-clean',
    tagline: 'Precision maintenance wash & interior refresh',
    basePrice: 149,
    baseDurationMinutes: 90,
    isPopular: false,
    includedFeatures: [
      'Two-Bucket pH-Neutral Hand Wash',
      'Wheel Barrels & Calipers Cleaned',
      'Tire Dressing (Satin Finish)',
      'Interior Vacuum & Dust Extraction',
      'Streak-Free Glass Clarity'
    ]
  },
  {
    _id: 'pkg-sig',
    title: 'Signature Multi-Stage Detail',
    slug: 'signature-detail',
    tagline: 'Single-stage machine polish & deep interior sanitization',
    basePrice: 289,
    baseDurationMinutes: 180,
    isPopular: true,
    includedFeatures: [
      'Full Decontamination Foam Bath & Iron Fallout Removal',
      'Clay Bar Surface Treatment',
      'Single-Stage Machine Gloss Polish',
      'Synthetic Paint Sealant (6-Month Protection)',
      'Steam Extraction of Carpet & Fabric',
      'Leather Cleansed & Matte Conditioned'
    ]
  },
  {
    _id: 'pkg-cer',
    title: 'Ultimate 9H Ceramic Shield',
    slug: 'ceramic-shield',
    tagline: 'Two-stage paint correction & pro-grade 9H ceramic coating',
    basePrice: 499,
    baseDurationMinutes: 270,
    isPopular: false,
    includedFeatures: [
      'Full Chemical & Mechanical Decontamination',
      '2-Stage Heavy Compound & Mirror Finish Polish',
      'Professional 9H Nano-Ceramic Coating (Body & Lights)',
      'Windshield & Glass Hydrophobic Rain Repellent',
      'Wheel Face Ceramic Coating',
      '3-Year Warranty Certificate'
    ]
  }
];

const FALLBACK_ADDONS = [
  {
    _id: 'add-eng',
    title: 'Engine Bay Steam Decontamination',
    slug: 'engine-bay-clean',
    description: 'Pressurized dry steam cleaning, grease removal, and OEM satin plastic dressing.',
    price: 75,
    durationMinutes: 45,
    iconName: 'Flame'
  },
  {
    _id: 'add-lea',
    title: 'Leather Ceramic Shield & Conditioning',
    slug: 'leather-ceramic',
    description: 'Deep pore dirt lifting followed by breathable ceramic barrier against dye transfer & UV cracking.',
    price: 120,
    durationMinutes: 60,
    iconName: 'Shield'
  },
  {
    _id: 'add-pet',
    title: 'Pet Hair & Deep Fiber Extraction',
    slug: 'pet-hair-removal',
    description: 'Specialized rubber mechanical combs and high-lift extraction to remove stubborn woven fur.',
    price: 55,
    durationMinutes: 30,
    iconName: 'Sparkles'
  },
  {
    _id: 'add-whl',
    title: 'Wheel Barrel & Caliper Ceramic Coating',
    slug: 'wheel-caliper-ceramic',
    description: 'High-temperature 1200°F ceramic barrier resisting brake dust pitting and harsh road salts.',
    price: 180,
    durationMinutes: 45,
    iconName: 'Disc'
  },
  {
    _id: 'add-hea',
    title: 'Headlight UV Restoration & Polish',
    slug: 'headlight-restoration',
    description: 'Wet-sanding yellowed oxidation, diamond compound clarity polish, and UV clear barrier seal.',
    price: 65,
    durationMinutes: 30,
    iconName: 'Sun'
  }
];

export const BuilderPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Catalog State
  const [categories, setCategories] = useState(FALLBACK_CATEGORIES);
  const [packages, setPackages] = useState(FALLBACK_PACKAGES);
  const [addons, setAddons] = useState(FALLBACK_ADDONS);
  const [isLoadingCatalog, setIsLoadingCatalog] = useState(true);

  // User Selection State
  const [selectedCategory, setSelectedCategory] = useState(FALLBACK_CATEGORIES[0]);
  const [selectedPackage, setSelectedPackage] = useState(FALLBACK_PACKAGES[1]); // Default to Signature Popular
  const [selectedAddons, setSelectedAddons] = useState([]);

  // Authoritative Calculation State
  const [pricingData, setPricingData] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calcError, setCalcError] = useState(null);

  // 1. Initial Data Fetch & URL Hydration
  useEffect(() => {
    let isMounted = true;

    const loadCatalog = async () => {
      try {
        setIsLoadingCatalog(true);
        const [catsRes, pkgsRes, addsRes] = await Promise.allSettled([
          getVehicleCategories(),
          getServices(),
          getAddons()
        ]);

        if (isMounted) {
          const liveCats = catsRes.status === 'fulfilled' && catsRes.value?.length ? catsRes.value : FALLBACK_CATEGORIES;
          const livePkgs = pkgsRes.status === 'fulfilled' && pkgsRes.value?.length ? pkgsRes.value : FALLBACK_PACKAGES;
          const liveAdds = addsRes.status === 'fulfilled' && addsRes.value?.length ? addsRes.value : FALLBACK_ADDONS;

          setCategories(liveCats);
          setPackages(livePkgs);
          setAddons(liveAdds);

          // URL query param matching: ?category=... & ?package=...
          const catParam = searchParams.get('category');
          if (catParam) {
            const matchedCat = liveCats.find(c => c.slug === catParam || c._id === catParam);
            if (matchedCat) setSelectedCategory(matchedCat);
          } else {
            setSelectedCategory(liveCats[0]);
          }

          const pkgParam = searchParams.get('package');
          if (pkgParam) {
            const matchedPkg = livePkgs.find(p => p.slug === pkgParam || p._id === pkgParam);
            if (matchedPkg) setSelectedPackage(matchedPkg);
          } else {
            // Default to Signature Detail or second package
            const defaultPkg = livePkgs.find(p => p.isPopular || p.slug === 'signature-detail') || livePkgs[0];
            setSelectedPackage(defaultPkg);
          }
        }
      } catch (err) {
        console.warn('Error loading catalog from backend, using studio baseline:', err.message);
      } finally {
        if (isMounted) setIsLoadingCatalog(false);
      }
    };

    loadCatalog();
    return () => { isMounted = false; };
  }, [searchParams]);

  // 2. Perform Authoritative Pricing Calculation on change
  useEffect(() => {
    if (!selectedCategory || !selectedPackage) return;

    let isCancelled = false;

    const runCalculation = async () => {
      setIsCalculating(true);
      setCalcError(null);

      try {
        const payload = {
          vehicleCategoryId: selectedCategory._id,
          vehicleCategorySlug: selectedCategory.slug,
          packageId: selectedPackage._id,
          packageSlug: selectedPackage.slug,
          addonIds: selectedAddons.map(a => a._id).filter(Boolean),
          addonSlugs: selectedAddons.map(a => a.slug).filter(Boolean)
        };

        const res = await calculatePricing(payload);
        if (!isCancelled && res) {
          setPricingData(res);
        }
      } catch (err) {
        if (!isCancelled) {
          // If server call fails (e.g. offline dev server), fallback to client-side formula
          console.warn('Server pricing sync note:', err.message);
          setCalcError(null); // Keep graceful
        }
      } finally {
        if (!isCancelled) setIsCalculating(false);
      }
    };

    // Debounce slightly to prevent thrashing
    const timer = setTimeout(runCalculation, 80);
    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [selectedCategory, selectedPackage, selectedAddons]);

  // 3. Addon Toggle Handler
  const handleToggleAddon = useCallback((addon) => {
    setSelectedAddons((prev) => {
      const exists = prev.some(a => (a._id && a._id === addon._id) || (a.slug && a.slug === addon.slug));
      if (exists) {
        return prev.filter(a => (a._id !== addon._id && a.slug !== addon.slug));
      } else {
        return [...prev, addon];
      }
    });
  }, []);

  // 4. Reset Configurator
  const handleReset = () => {
    setSelectedCategory(categories[0]);
    setSelectedPackage(packages.find(p => p.isPopular) || packages[0]);
    setSelectedAddons([]);
  };

  // 5. Proceed to Booking Flow
  const handleProceedToBooking = () => {
    const addonParam = selectedAddons.map(a => a.slug).join(',');
    const queryString = `?category=${selectedCategory.slug}&package=${selectedPackage.slug}${addonParam ? `&addons=${addonParam}` : ''}`;
    
    navigate(`/book${queryString}`, {
      state: {
        category: selectedCategory,
        package: selectedPackage,
        addons: selectedAddons,
        pricing: pricingData
      }
    });
  };

  return (
    <div className="w-full bg-[#08090C] text-[#F8FAFC] min-h-screen py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Hero Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E1017] border border-white/10 text-xs font-semibold text-[#D4AF37] mb-4">
              <Gauge className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="font-mono uppercase tracking-wider">Authoritative Dynamic Configurator</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-[#F8FAFC] tracking-[-0.03em] font-display">
              Smart Package Builder
            </h1>
            <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl mt-2 font-normal">
              Select your vehicle body style to apply server-side surface area multipliers, pick your preservation tier, and customize with bespoke studio enhancements.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={handleReset}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#0E1017] border border-white/10 text-[#94A3B8] hover:text-white hover:border-white/30 transition-all flex items-center gap-1.5 cursor-pointer tactile-press"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#D4AF37]" />
              Reset Config
            </button>
            <div className="text-xs font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-3.5 py-2 rounded-xl border border-[#D4AF37]/25 flex items-center gap-1.5 font-bold">
              <Cpu className="w-3.5 h-3.5" />
              Deterministic Rule Engine
            </div>
          </div>
        </div>

        {/* Builder Layout: Left 8 Cols (Steps 1, 2, 3), Right 4 Cols (Pricing Cockpit) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Steps Column */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Step 1: Vehicle Category */}
            <VehicleSelector
              categories={categories}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />

            {/* Step 2: Detailing Package */}
            <PackageSelector
              packages={packages}
              selectedPackage={selectedPackage}
              selectedCategory={selectedCategory}
              onSelect={setSelectedPackage}
            />

            {/* Step 3: Optional Addons */}
            <AddonSelector
              addons={addons}
              selectedAddons={selectedAddons}
              onToggleAddon={handleToggleAddon}
            />

          </div>

          {/* Right Rail: Pricing Cockpit */}
          <div className="lg:col-span-4">
            <PricingCockpit
              category={selectedCategory}
              pkg={selectedPackage}
              addons={selectedAddons}
              pricingData={pricingData}
              isCalculating={isCalculating}
              onProceed={handleProceedToBooking}
            />
          </div>

        </div>

        {/* Mobile Sticky Bottom Floating Summary (Shown only on small screens) */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-4 bg-[#08090C]/95 border-t border-white/10 backdrop-blur-md shadow-2xl">
          <div className="max-w-md mx-auto flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] text-[#94A3B8] uppercase font-bold font-mono">Estimated Total:</div>
              <div className="text-2xl font-mono font-black text-[#D4AF37]">
                ${pricingData?.breakdown?.subtotal || (
                  (Number(selectedPackage?.basePrice || 0) * Number(selectedCategory?.priceMultiplier || 1.0)) +
                  selectedAddons.reduce((sum, a) => sum + Number(a.price || 0), 0)
                ).toFixed(2)}
              </div>
            </div>
            <Button
              variant="primary"
              size="md"
              iconRight={ArrowRight}
              onClick={handleProceedToBooking}
              className="glow-gold-sm"
            >
              Reserve Bay Slot
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};
