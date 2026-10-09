export const DEFAULT_CATEGORIES = [
  {
    name: 'Compact / Sedan',
    slug: 'sedan',
    priceMultiplier: 1.0,
    durationMultiplier: 1.0,
    description: 'Standard 2-door coupe, hatchback, or 4-door sedan chassis.',
    iconName: 'Car',
    displayOrder: 1,
    isActive: true
  },
  {
    name: 'Executive / Coupe',
    slug: 'executive-coupe',
    priceMultiplier: 1.1,
    durationMultiplier: 1.05,
    description: 'Luxury touring coupes and executive saloons with intricate trim.',
    iconName: 'Sparkles',
    displayOrder: 2,
    isActive: true
  },
  {
    name: 'Compact SUV / Crossover',
    slug: 'compact-suv',
    priceMultiplier: 1.25,
    durationMultiplier: 1.15,
    description: 'Mid-size crossovers, wagons, and compact SUVs.',
    iconName: 'CarFront',
    displayOrder: 3,
    isActive: true
  },
  {
    name: 'Full-Size SUV / Truck',
    slug: 'full-suv',
    priceMultiplier: 1.45,
    durationMultiplier: 1.30,
    description: 'Extended wheelbase SUVs, minivans, and full-size commercial trucks.',
    iconName: 'Truck',
    displayOrder: 4,
    isActive: true
  }
];

export const DEFAULT_PACKAGES = [
  {
    title: 'Essential Clean',
    slug: 'essential-clean',
    tagline: 'Precision maintenance wash & interior refresh',
    description: 'Complete multi-bucket pH-neutral foam wash, wheel barrel decontamination, glass clarification, and full interior vacuum & wipe-down.',
    basePrice: 149,
    baseDurationMinutes: 90,
    category: 'full',
    includedFeatures: [
      'Two-Bucket pH-Neutral Hand Wash',
      'Wheel Barrels & Calipers Cleaned',
      'Tire Dressing (Satin Finish)',
      'Interior Vacuum & Dust Extraction',
      'Streak-Free Glass Clarity',
      'Door Jambs Wiped'
    ],
    isPopular: false,
    displayOrder: 1,
    isActive: true
  },
  {
    title: 'Signature Multi-Stage Detail',
    slug: 'signature-detail',
    tagline: 'Single-stage machine polish & deep interior sanitization',
    description: 'Our signature studio restoration. Enhances paint gloss by up to 80%, removes light wash marring, and steam-cleans all interior upholstery & leather.',
    basePrice: 289,
    baseDurationMinutes: 180,
    category: 'full',
    includedFeatures: [
      'Full Decontamination Foam Bath & Iron Fallout Removal',
      'Clay Bar Surface Treatment',
      'Single-Stage Machine Gloss Polish',
      'Synthetic Paint Sealant (6-Month Protection)',
      'Steam Extraction of Carpet & Fabric',
      'Leather Cleansed & Matte Conditioned',
      'Engine Bay Top Surface Wiped'
    ],
    isPopular: true,
    displayOrder: 2,
    isActive: true
  },
  {
    title: 'Ultimate 9H Ceramic Shield',
    slug: 'ceramic-shield',
    tagline: 'Two-stage paint correction & pro-grade 9H ceramic coating',
    description: 'The pinnacle of automotive surface preservation. 2-stage compounding eliminates 90%+ of paint defects, sealed under professional 9H ceramic coating for 3+ years of extreme hydrophobic gloss.',
    basePrice: 499,
    baseDurationMinutes: 270,
    category: 'ceramic',
    includedFeatures: [
      'Full Chemical & Mechanical Decontamination',
      '2-Stage Heavy Compound & Mirror Finish Polish',
      'Paint Depth Gauge & Surface Inspection',
      'Professional 9H Nano-Ceramic Coating (Body & Lights)',
      'Windshield & Glass Hydrophobic Rain Repellent',
      'Wheel Face Ceramic Coating',
      'Full Interior Nano-Shield Antimicrobial Guard',
      '3-Year Warranty Certificate'
    ],
    isPopular: false,
    displayOrder: 3,
    isActive: true
  }
];

export const DEFAULT_ADDONS = [
  {
    title: 'Engine Bay Steam Decontamination',
    slug: 'engine-bay-clean',
    description: 'Pressurized dry steam cleaning, grease removal, and OEM satin plastic dressing.',
    price: 75,
    durationMinutes: 45,
    iconName: 'Flame',
    displayOrder: 1,
    isActive: true
  },
  {
    title: 'Leather Ceramic Shield & Conditioning',
    slug: 'leather-ceramic',
    description: 'Deep pore dirt lifting followed by breathable ceramic barrier against dye transfer & UV cracking.',
    price: 120,
    durationMinutes: 60,
    iconName: 'Shield',
    displayOrder: 2,
    isActive: true
  },
  {
    title: 'Pet Hair & Deep Fiber Extraction',
    slug: 'pet-hair-removal',
    description: 'Specialized rubber mechanical combs and high-lift extraction to remove stubborn woven fur.',
    price: 55,
    durationMinutes: 30,
    iconName: 'Sparkles',
    displayOrder: 3,
    isActive: true
  },
  {
    title: 'Wheel Barrel & Caliper Ceramic Coating',
    slug: 'wheel-caliper-ceramic',
    description: 'High-temperature 1200°F ceramic barrier resisting brake dust pitting and harsh road salts.',
    price: 180,
    durationMinutes: 45,
    iconName: 'Disc',
    displayOrder: 4,
    isActive: true
  },
  {
    title: 'Headlight UV Restoration & Polish',
    slug: 'headlight-restoration',
    description: 'Wet-sanding yellowed oxidation, diamond compound clarity polish, and UV clear barrier seal.',
    price: 65,
    durationMinutes: 30,
    iconName: 'Sun',
    displayOrder: 5,
    isActive: true
  }
];
