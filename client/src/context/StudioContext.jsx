import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getPublicStudioSettings, updateStudioSettings as apiUpdateSettings } from '../services/api.js';

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

const StudioContext = createContext({
  settings: DEFAULT_STUDIO_SETTINGS,
  loading: false,
  refreshSettings: async () => {},
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
  const [loading, setLoading] = useState(false);

  const refreshSettings = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getPublicStudioSettings();
      if (data && data.studioName) {
        setSettings(data);
        localStorage.setItem('detaildock_studio_settings', JSON.stringify(data));
      }
    } catch (err) {
      console.warn('[StudioContext]: Could not fetch remote studio settings, using cache/defaults:', err.message);
    } finally {
      setLoading(false);
    }
  }, []);

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
    <StudioContext.Provider value={{ settings, loading, refreshSettings, updateSettings }}>
      {children}
    </StudioContext.Provider>
  );
};

export const useStudio = () => useContext(StudioContext);
