/**
 * DetailDock Centralized Client API Service
 * Interacts with the backend REST endpoints at /api/v1/
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

/**
 * Universal request wrapper with error parsing
 */
const request = async (endpoint, options = {}) => {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const response = await fetch(url, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMessage = data?.error?.message || data?.message || `HTTP ${response.status} Error`;
    const error = new Error(errorMessage);
    error.statusCode = response.status;
    error.code = data?.error?.code || 'API_ERROR';
    error.details = data?.error?.details || [];
    throw error;
  }

  return data;
};

// -------------------------------------------------------------
// Catalog & Services
// -------------------------------------------------------------

export const getServices = async () => {
  const res = await request('/services');
  return res.data;
};

export const getServiceBySlug = async (slug) => {
  const res = await request(`/services/${slug}`);
  return res.data;
};

export const getAddons = async () => {
  const res = await request('/addons');
  return res.data;
};

export const getVehicleCategories = async () => {
  const res = await request('/vehicles/categories');
  return res.data;
};

// -------------------------------------------------------------
// Authoritative Pricing & Availability
// -------------------------------------------------------------

export const calculatePricing = async ({
  vehicleCategoryId,
  vehicleCategorySlug,
  packageId,
  packageSlug,
  addonIds = [],
  addonSlugs = []
}) => {
  const res = await request('/pricing/calculate', {
    method: 'POST',
    body: JSON.stringify({
      vehicleCategoryId,
      vehicleCategorySlug,
      packageId,
      packageSlug,
      addonIds,
      addonSlugs
    })
  });
  return res.data;
};

export const getAvailability = async (dateStr) => {
  const query = dateStr ? `?date=${encodeURIComponent(dateStr)}` : '';
  const res = await request(`/availability${query}`);
  return res.data;
};

export const getStudioInfo = async () => {
  const res = await request('/availability/studio-info');
  return res.data;
};

// -------------------------------------------------------------
// Bookings & Public Tracking
// -------------------------------------------------------------

export const createBooking = async (bookingData) => {
  const res = await request('/bookings', {
    method: 'POST',
    body: JSON.stringify(bookingData)
  });
  return res;
};

export const trackBooking = async (code) => {
  const cleanedCode = encodeURIComponent(code.trim());
  const res = await request(`/bookings/track/${cleanedCode}`);
  return res.data;
};

// -------------------------------------------------------------
// Authentication
// -------------------------------------------------------------

export const login = async ({ email, password }) => {
  const res = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  return res;
};

export const register = async (userData) => {
  const res = await request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData)
  });
  return res;
};

export const getMe = async (token) => {
  const res = await request('/auth/me', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// -------------------------------------------------------------
// Admin Operations
// -------------------------------------------------------------

export const getAdminBookings = async (params = {}, token) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== '') {
      searchParams.append(key, val);
    }
  });

  const queryStr = searchParams.toString() ? `?${searchParams.toString()}` : '';
  const res = await request(`/admin/bookings${queryStr}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res;
};

export const getAdminBookingById = async (id, token) => {
  const res = await request(`/admin/bookings/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const updateBookingStatus = async (id, payload, token) => {
  const res = await request(`/admin/bookings/${id}/status`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload)
  });
  return res.data;
};

export const getAdminStats = async (token) => {
  const res = await request('/admin/dashboard/stats', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const updateStudioSettings = async (settingsData, token) => {
  const res = await request('/admin/settings', {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(settingsData)
  });
  return res.data;
};

// -------------------------------------------------------------
// Payments & Invoicing
// -------------------------------------------------------------

export const createPaymentIntent = async ({ bookingCode, payFull = true, depositAmount = 50 }) => {
  const res = await request('/payments/create-intent', {
    method: 'POST',
    body: JSON.stringify({ bookingCode, payFull, depositAmount })
  });
  return res.data;
};

export const createCheckoutSession = async ({ bookingCode, payFull = true, depositAmount = 50 }) => {
  const res = await request('/payments/create-checkout-session', {
    method: 'POST',
    body: JSON.stringify({ bookingCode, payFull, depositAmount })
  });
  return res.data;
};

export const confirmStudioPayment = async (bookingCode) => {
  const res = await request('/payments/confirm-studio-pay', {
    method: 'POST',
    body: JSON.stringify({ bookingCode })
  });
  return res.data;
};

export const getInvoiceDownloadUrl = (bookingCode) => {
  const cleanedCode = encodeURIComponent(bookingCode.trim().toUpperCase());
  return `${API_BASE}/bookings/${cleanedCode}/invoice`;
};

export const resendBookingReceipt = async (bookingCode) => {
  const cleanedCode = encodeURIComponent(bookingCode.trim().toUpperCase());
  const res = await request(`/bookings/${cleanedCode}/resend-receipt`, {
    method: 'POST'
  });
  return res;
};
