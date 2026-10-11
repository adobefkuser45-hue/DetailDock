const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const getAuthHeaders = (token) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const loginAdmin = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || data.message || 'Authentication failed');
  }
  return data;
};

export const getAdminStats = async (token) => {
  const response = await fetch(`${API_BASE_URL}/admin/stats`, {
    headers: getAuthHeaders(token)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'Failed to fetch dashboard stats');
  return data.data;
};

export const getAdminBookings = async (token) => {
  const response = await fetch(`${API_BASE_URL}/admin/bookings`, {
    headers: getAuthHeaders(token)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'Failed to fetch bookings');
  return data.data;
};

export const updateBookingStatus = async (id, status, token) => {
  const response = await fetch(`${API_BASE_URL}/admin/bookings/${id}/status`, {
    method: 'PATCH',
    headers: getAuthHeaders(token),
    body: JSON.stringify({ status })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'Failed to update booking status');
  return data.data;
};

export const updateBookingDVI = async (id, inspectionData, token) => {
  const response = await fetch(`${API_BASE_URL}/admin/bookings/${id}/inspection`, {
    method: 'PATCH',
    headers: getAuthHeaders(token),
    body: JSON.stringify(inspectionData)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'Failed to update DVI inspection');
  return data.data;
};

export const updateInspectionData = updateBookingDVI;

export const getInvoiceDownloadUrl = (id) => `${API_BASE_URL}/payments/invoice/${id}`;
export const getWarrantyDownloadUrl = (id) => `${API_BASE_URL}/bookings/${id}/warranty`;

export const issueWarrantyCertificate = async (id, payload, token) => {
  const response = await fetch(`${API_BASE_URL}/bookings/${id}/warranty`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify(payload)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'Failed to issue warranty');
  return data.data;
};

export const resendBookingReceipt = async (id, token) => {
  const response = await fetch(`${API_BASE_URL}/payments/resend-receipt/${id}`, {
    method: 'POST',
    headers: getAuthHeaders(token)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'Failed to resend receipt');
  return data.data;
};

export const settleBookingPayment = async (id, payload, token) => {
  const response = await fetch(`${API_BASE_URL}/payments/settle/${id}`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify(payload)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'Payment settlement failed');
  return data.data;
};

export const getPublicStudioSettings = async () => {
  const response = await fetch(`${API_BASE_URL}/studio/settings`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'Failed to fetch studio settings');
  return data.data;
};

export const updateStudioSettings = async (settingsData, token) => {
  const response = await fetch(`${API_BASE_URL}/studio/settings`, {
    method: 'PUT',
    headers: getAuthHeaders(token),
    body: JSON.stringify(settingsData)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'Failed to update studio settings');
  return data.data;
};

// Catalog API endpoints
export const getCatalogServices = async () => {
  const response = await fetch(`${API_BASE_URL}/services`);
  const data = await response.json();
  return data.data || [];
};

export const getCatalogAddons = async () => {
  const response = await fetch(`${API_BASE_URL}/addons`);
  const data = await response.json();
  return data.data || [];
};

export const getCatalogVehicles = async () => {
  const response = await fetch(`${API_BASE_URL}/vehicles`);
  const data = await response.json();
  return data.data || [];
};

export const createService = async (serviceData, token) => {
  const response = await fetch(`${API_BASE_URL}/services`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify(serviceData)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'Failed to create package');
  return data.data;
};

export const updateService = async (id, serviceData, token) => {
  const response = await fetch(`${API_BASE_URL}/services/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(token),
    body: JSON.stringify(serviceData)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'Failed to update package');
  return data.data;
};

export const deleteService = async (id, token) => {
  const response = await fetch(`${API_BASE_URL}/services/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(token)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'Failed to delete package');
  return data;
};

export const createAddon = async (addonData, token) => {
  const response = await fetch(`${API_BASE_URL}/addons`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify(addonData)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'Failed to create addon');
  return data.data;
};

export const updateAddon = async (id, addonData, token) => {
  const response = await fetch(`${API_BASE_URL}/addons/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(token),
    body: JSON.stringify(addonData)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'Failed to update addon');
  return data.data;
};

export const deleteAddon = async (id, token) => {
  const response = await fetch(`${API_BASE_URL}/addons/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(token)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'Failed to delete addon');
  return data;
};

export const updateVehicleMultiplier = async (id, vehicleData, token) => {
  const response = await fetch(`${API_BASE_URL}/vehicles/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(token),
    body: JSON.stringify(vehicleData)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'Failed to update category multiplier');
  return data.data;
};

// Admin Specific Catalog Management
export const getAdminCatalog = async (token) => {
  const response = await fetch(`${API_BASE_URL}/admin/catalog`, {
    headers: getAuthHeaders(token)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'Failed to load catalog');
  return data.data;
};

export const createAdminPackage = async (payload, token) => {
  const response = await fetch(`${API_BASE_URL}/admin/catalog/packages`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify(payload)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'Failed to create package');
  return data.data;
};

export const updateAdminPackage = async (id, payload, token) => {
  const response = await fetch(`${API_BASE_URL}/admin/catalog/packages/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(token),
    body: JSON.stringify(payload)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'Failed to update package');
  return data.data;
};

export const toggleAdminPackage = async (id, token) => {
  const response = await fetch(`${API_BASE_URL}/admin/catalog/packages/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(token)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'Failed to toggle package');
  return data.data;
};

export const createAdminAddon = async (payload, token) => {
  const response = await fetch(`${API_BASE_URL}/admin/catalog/addons`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify(payload)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'Failed to create addon');
  return data.data;
};

export const updateAdminAddon = async (id, payload, token) => {
  const response = await fetch(`${API_BASE_URL}/admin/catalog/addons/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(token),
    body: JSON.stringify(payload)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'Failed to update addon');
  return data.data;
};

export const toggleAdminAddon = async (id, token) => {
  const response = await fetch(`${API_BASE_URL}/admin/catalog/addons/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(token)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'Failed to toggle addon');
  return data.data;
};

export const updateAdminVehicleCategory = async (id, payload, token) => {
  const response = await fetch(`${API_BASE_URL}/admin/catalog/categories/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(token),
    body: JSON.stringify(payload)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'Failed to update multiplier');
  return data.data;
};

export const resetAdminCatalog = async (token) => {
  const response = await fetch(`${API_BASE_URL}/admin/catalog/reset`, {
    method: 'POST',
    headers: getAuthHeaders(token)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'Failed to reset catalog');
  return data.data;
};

export const getAdminStudioSettings = async (token) => {
  const response = await fetch(`${API_BASE_URL}/admin/settings`, {
    headers: getAuthHeaders(token)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'Failed to fetch settings');
  return data.data;
};

// Website Studio CMS API Endpoints
export const getAdminCMS = async (token) => {
  const response = await fetch(`${API_BASE_URL}/cms/admin/content`, {
    headers: getAuthHeaders(token)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'Failed to fetch CMS content');
  return data.data;
};

export const updateAdminCMS = async (cmsData, token) => {
  const response = await fetch(`${API_BASE_URL}/cms/admin/content`, {
    method: 'PUT',
    headers: getAuthHeaders(token),
    body: JSON.stringify(cmsData)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'Failed to update CMS content');
  return data.data;
};

export const resetAdminCMS = async (token) => {
  const response = await fetch(`${API_BASE_URL}/cms/admin/reset`, {
    method: 'POST',
    headers: getAuthHeaders(token)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'Failed to reset CMS');
  return data.data;
};

export const getPublicCMS = async () => {
  const response = await fetch(`${API_BASE_URL}/cms/content`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'Failed to load public CMS');
  return data.data;
};
