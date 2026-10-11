import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getPublicStudioSettings, getPublicCMS, updateStudioSettings as apiUpdateSettings } from '../services/api.js';

const DEFAULT_STUDIO_SETTINGS = {
  studioName: 'DetailDock Luxury Atelier',
  contactPhone: '+1 (555) 348-2450',
  contactEmail: 'concierge@detaildock.com',
  address: {
    street: '1440 Velocity Way, Suite 100',
    city: 'Austin',
    state: 'TX',
    zip: '78701'
  },
  operatingHours: {
    openTime: '09:00 AM',
    closeTime: '06:00 PM',
    slotIntervalMinutes: 120
  },
  maxBayCapacity: 2,
  workingDays: [1, 2, 3, 4, 5, 6]
};

const DEFAULT_STUDIO_CMS = {
  announcementBanner: {
    isActive: true,
    message: '🔥 Spring Studio Special: Complimentary Shortwave Infrared Curing on All 9H Ceramic Suites',
    link: '/builder',
    badgeText: 'LIMITED ATELIER APPOINTMENTS'
  },
  hero: {
    badge: 'DUAL CLEANROOM BAYS ACTIVE • Austin ISO-6 Atelier',
    headline: 'Where Paint Meets Concourse Perfection.',
    subheadline: 'Bespoke multi-stage rotary compounding, certified 9H ceramic glass shielding, and real-time bay telemetry engineered for discerning automotive enthusiasts.',
    primaryCtaText: 'Configure In Smart Builder',
    primaryCtaLink: '/builder',
    secondaryCtaText: 'Reserve Bay Appointment',
    secondaryCtaLink: '/book',
    telemetryHighlights: [
      { metric: '9H + IR', description: 'Shortwave Infrared Cured' },
      { metric: '< 0.5µm', description: 'Paint Preservation Depth' },
      { metric: '100%', description: 'Hand-Compounded Finish' },
      { metric: 'ISO-6', description: 'Sterile Cleanroom Studio' }
    ]
  },
  beforeAfterShowcase: [
    {
      vehicle: '2024 Porsche 911 GT3 RS',
      treatment: 'Two-Stage Compound Correction & 9H Ceramic Glass Shield',
      defectType: 'Heavy Swirls & Dealership Buffer Holograms',
      beforeImage: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop',
      swirlElimination: '98.5% Defect Elimination',
      finalGloss: '98.4 GU Mirror Gloss',
      isActive: true
    },
    {
      vehicle: '2023 Lamborghini Huracán Tecnica',
      treatment: 'Forged Wheel Ceramic Glass & Caliper Heat Barrier',
      defectType: 'Baked Track Brake Dust & Road Tar Oxidation',
      beforeImage: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=1200&auto=format&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1200&auto=format&fit=crop',
      swirlElimination: '100% Brake Dust Extraction',
      finalGloss: 'High-Temp Glass Barrier',
      isActive: true
    },
    {
      vehicle: '2024 Ferrari 296 GTB',
      treatment: 'Full Leather Preservation & Matte Hydrophobic Seal',
      defectType: 'Denim Dye Transfer & Matte Hide Grease Glaze',
      beforeImage: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?q=80&w=1200&auto=format&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop',
      swirlElimination: 'OEM Factory Matte Restored',
      finalGloss: 'Zero Silicone Greasiness',
      isActive: true
    }
  ],
  testimonials: [
    {
      clientName: 'Julian Vance',
      vehicle: '2024 Porsche 911 GT3 RS',
      rating: 5,
      quote: 'The level of craftsmanship DetailDock exhibits is genuinely unparalleled. Seeing my clear coat depth logged in real-time gave me immense confidence in their technical mastery.',
      isVerified: true,
      isActive: true
    },
    {
      clientName: 'Elena Rostova',
      vehicle: '2023 Ferrari Roma',
      rating: 5,
      quote: 'My Roma arrived with heavy swirls from dealer delivery. DetailDock eliminated 99% of defects and applied a 9H ceramic shield that looks liquid under stadium lights.',
      isVerified: true,
      isActive: true
    },
    {
      clientName: 'Marcus Sterling',
      vehicle: '2024 BMW M4 Competition',
      rating: 5,
      quote: 'The live cleanroom bay telemetry tracking was fascinating to watch. Transparent upfront pricing and a digital warranty diploma that protects resale value.',
      isVerified: true,
      isActive: true
    }
  ],
  faqs: [
    {
      question: 'What is the benefit of an ISO-6 Sterile Cleanroom Bay?',
      answer: 'Our cleanrooms maintain sub-micron HEPA air filtration and 45% relative humidity control. This prevents airborne particulates from bonding into wet ceramic coatings, ensuring flawless optical clarity and maximum bond durability.',
      category: 'Cleanroom',
      isActive: true
    },
    {
      question: 'How does the Sub-Micron Paint Depth Inspection work?',
      answer: 'Before machine rotary compounding touches your paint, our master technicians take 18-point ultrasonic clear coat thickness readings. We establish safe defect removal thresholds to preserve maximum factory clear coat for the lifetime of your vehicle.',
      category: 'Inspection',
      isActive: true
    },
    {
      question: 'Is the 3-Year Ceramic Warranty transferable to a new owner?',
      answer: 'Yes. Every DetailDock ceramic warranty diploma includes a unique serialized tracking code (e.g. DD-W2026-X). When you sell your vehicle, the new owner can look up and verify the warranty on our public portal, protecting resale value.',
      category: 'Warranty',
      isActive: true
    }
  ]
};

const StudioContext = createContext({
  settings: DEFAULT_STUDIO_SETTINGS,
  cms: DEFAULT_STUDIO_CMS,
  loading: false,
  refreshSettings: async () => {},
  refreshCMS: async () => {},
  updateSettings: async () => {}
});

export const StudioProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    try {
      const cached = localStorage.getItem('detaildock_studio_settings');
      return cached ? JSON.parse(cached) : DEFAULT_STUDIO_SETTINGS;
    } catch {
      return DEFAULT_STUDIO_SETTINGS;
    }
  });

  const [cms, setCms] = useState(() => {
    try {
      const cached = localStorage.getItem('detaildock_studio_cms');
      return cached ? JSON.parse(cached) : DEFAULT_STUDIO_CMS;
    } catch {
      return DEFAULT_STUDIO_CMS;
    }
  });

  const [loading, setLoading] = useState(false);

  const refreshCMS = useCallback(async () => {
    try {
      const data = await getPublicCMS();
      if (data && (data.hero || data.announcementBanner)) {
        setCms(data);
        localStorage.setItem('detaildock_studio_cms', JSON.stringify(data));
      }
    } catch (err) {
      console.warn('[StudioContext]: Could not fetch remote CMS, using cache/defaults:', err.message);
    }
  }, []);

  const refreshSettings = useCallback(async () => {
    try {
      setLoading(true);
      const [settingsData] = await Promise.all([
        getPublicStudioSettings().catch(() => null),
        refreshCMS().catch(() => null)
      ]);
      if (settingsData && settingsData.studioName) {
        setSettings(settingsData);
        localStorage.setItem('detaildock_studio_settings', JSON.stringify(settingsData));
      }
    } catch (err) {
      console.warn('[StudioContext]: Could not fetch remote studio settings, using cache/defaults:', err.message);
    } finally {
      setLoading(false);
    }
  }, [refreshCMS]);

  useEffect(() => {
    refreshSettings();
  }, [refreshSettings]);

  const updateSettings = async (newSettingsData, token) => {
    const updated = await apiUpdateSettings(newSettingsData, token);
    if (updated) {
      setSettings(updated);
      localStorage.setItem('detaildock_studio_settings', JSON.stringify(updated));
    }
    return updated;
  };

  return (
    <StudioContext.Provider value={{ settings, cms, loading, refreshSettings, refreshCMS, updateSettings }}>
      {children}
    </StudioContext.Provider>
  );
};

export const useStudio = () => useContext(StudioContext);
