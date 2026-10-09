import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Car, 
  Calendar, 
  Shield, 
  Award, 
  Download, 
  Plus, 
  Trash2, 
  ExternalLink, 
  LogOut, 
  LogIn, 
  User, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  FileText, 
  Layers, 
  AlertCircle, 
  Key,
  ShieldCheck,
  RefreshCw,
  X
} from 'lucide-react';
import { Button } from '../components/common/Button.jsx';
import { Badge } from '../components/common/Badge.jsx';
import { LoadingSpinner } from '../components/common/LoadingSpinner.jsx';
import { 
  login, 
  register, 
  getCustomerGarage, 
  addSavedVehicle, 
  removeSavedVehicle,
  getVehicleCategories,
  getWarrantyDownloadUrl,
  getInvoiceDownloadUrl
} from '../services/api.js';

export const GaragePage = () => {
  const navigate = useNavigate();

  // Auth State
  const [token, setToken] = useState(() => localStorage.getItem('detaildock_customer_token') || '');
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('detaildock_customer_user') || 'null');
    } catch {
      return null;
    }
  });

  // Login / Register Form State
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // Garage Data State
  const [savedVehicles, setSavedVehicles] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingGarage, setLoadingGarage] = useState(false);
  const [activeTab, setActiveTab] = useState('vehicles'); // 'vehicles' | 'bookings'

  // Add Vehicle Modal State
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    categorySlug: 'sedan',
    licensePlate: ''
  });
  const [submittingVehicle, setSubmittingVehicle] = useState(false);
  const [vehicleError, setVehicleError] = useState('');

  // Status / Feedback
  const [actionSuccess, setActionSuccess] = useState('');

  // Load Vehicle Categories for vehicle creation
  useEffect(() => {
    getVehicleCategories()
      .then(cats => setCategories(cats || []))
      .catch(() => setCategories([]));
  }, []);

  // Fetch Garage Data when authenticated
  const fetchGarage = useCallback(async (authToken) => {
    if (!authToken) return;
    try {
      setLoadingGarage(true);
      const data = await getCustomerGarage(authToken);
      if (data) {
        setSavedVehicles(data.user?.savedVehicles || []);
        setBookings(data.bookings || []);
        if (data.user) {
          setCurrentUser(data.user);
          localStorage.setItem('detaildock_customer_user', JSON.stringify(data.user));
        }
      }
    } catch (err) {
      console.error('Failed to load customer garage:', err);
      if (err.message?.includes('401') || err.message?.includes('expired') || err.message?.includes('token')) {
        handleLogout();
      }
    } finally {
      setLoadingGarage(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchGarage(token);
    }
  }, [token, fetchGarage]);

  const handleLoginSubmit = async (e) => {
    e?.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    try {
      const res = await login({ email: authEmail, password: authPassword });
      if (res?.token && res?.data?.user) {
        const authToken = res.token;
        const authUser = res.data.user;
        localStorage.setItem('detaildock_customer_token', authToken);
        localStorage.setItem('detaildock_customer_user', JSON.stringify(authUser));
        setToken(authToken);
        setCurrentUser(authUser);
        setActionSuccess(`Welcome back, ${authUser.name}!`);
        setTimeout(() => setActionSuccess(''), 4000);
      }
    } catch (err) {
      setAuthError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e?.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    try {
      const res = await register({
        name: authName,
        email: authEmail,
        password: authPassword,
        phone: authPhone
      });
      if (res?.token && res?.data?.user) {
        const authToken = res.token;
        const authUser = res.data.user;
        localStorage.setItem('detaildock_customer_token', authToken);
        localStorage.setItem('detaildock_customer_user', JSON.stringify(authUser));
        setToken(authToken);
        setCurrentUser(authUser);
        setActionSuccess(`Welcome to the Atelier, ${authUser.name}!`);
        setTimeout(() => setActionSuccess(''), 4000);
      }
    } catch (err) {
      setAuthError(err.message || 'Registration failed. Please check your details.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setAuthEmail('alex@example.com');
    setAuthPassword('CustomerPass2026!');
    setAuthMode('login');
    setAuthError('');
  };

  const handleLogout = () => {
    localStorage.removeItem('detaildock_customer_token');
    localStorage.removeItem('detaildock_customer_user');
    setToken('');
    setCurrentUser(null);
    setSavedVehicles([]);
    setBookings([]);
    setActionSuccess('You have been signed out.');
    setTimeout(() => setActionSuccess(''), 3000);
  };

  const handleAddVehicle = async (e) => {
    e?.preventDefault();
    if (!newVehicle.make || !newVehicle.model || !newVehicle.year) {
      setVehicleError('Make, model, and year are required.');
      return;
    }

    try {
      setSubmittingVehicle(true);
      setVehicleError('');
      const updatedList = await addSavedVehicle(newVehicle, token);
      setSavedVehicles(updatedList || []);
      setIsAddVehicleOpen(false);
      setNewVehicle({
        make: '',
        model: '',
        year: new Date().getFullYear(),
        categorySlug: 'sedan',
        licensePlate: ''
      });
      setActionSuccess('Vehicle successfully added to your Atelier Garage!');
      setTimeout(() => setActionSuccess(''), 3500);
    } catch (err) {
      setVehicleError(err.message || 'Failed to save vehicle.');
    } finally {
      setSubmittingVehicle(false);
    }
  };

  const handleRemoveVehicle = async (vehicleId) => {
    if (!window.confirm('Are you sure you want to remove this vehicle from your personal garage?')) return;
    try {
      const updatedList = await removeSavedVehicle(vehicleId, token);
      setSavedVehicles(updatedList || []);
      setActionSuccess('Vehicle removed.');
      setTimeout(() => setActionSuccess(''), 3000);
    } catch (err) {
      alert(err.message || 'Failed to remove vehicle.');
    }
  };

  // If Not Authenticated: Render High-Fidelity Login / Register Portal
  if (!token || !currentUser) {
    return (
      <div className="w-full bg-[#08090C] text-[#F8FAFC] min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-4xl mx-auto w-full">
          {/* Header Intro */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E1017] border border-white/10 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              Customer Atelier Portal
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-[#F8FAFC] tracking-[-0.03em] font-display">
              Personal Garage & Service Concierge
            </h1>
            <p className="mt-3 text-base text-[#94A3B8] max-w-xl mx-auto font-normal">
              Manage your personal vehicle fleet, track live detailing telemetry, review paint health inspections, and download official 9H ceramic warranty certificates.
            </p>
          </div>

          {/* Auth Box */}
          <div className="bg-[#0E1017] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
            {/* Subtle Accent Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

            {/* Quick Demo Customer Pill */}
            <div className="mb-6 p-4 rounded-xl bg-[#08090C] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37] font-mono">
                  <Key className="w-3.5 h-3.5" />
                  1-Click Client Experience Demo
                </div>
                <p className="text-xs text-[#94A3B8] mt-0.5 font-sans">
                  Test with pre-configured client: <span className="text-[#F8FAFC] font-medium">alex@example.com</span> (Porsche 911 GT3)
                </p>
              </div>
              <button
                type="button"
                onClick={handleDemoLogin}
                className="text-xs font-bold text-[#08090C] bg-[#D4AF37] hover:bg-[#E2C366] px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer font-mono tactile-press"
              >
                Fill Demo Credentials
              </button>
            </div>

            {/* Auth Tabs */}
            <div className="flex border-b border-white/10 mb-6 font-mono">
              <button
                onClick={() => { setAuthMode('login'); setAuthError(''); }}
                className={`pb-3 px-4 font-bold text-sm transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                  authMode === 'login'
                    ? 'border-[#D4AF37] text-[#D4AF37]'
                    : 'border-transparent text-[#94A3B8] hover:text-[#F8FAFC]'
                }`}
              >
                <LogIn className="w-4 h-4" />
                Sign In to Garage
              </button>
              <button
                onClick={() => { setAuthMode('register'); setAuthError(''); }}
                className={`pb-3 px-4 font-bold text-sm transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                  authMode === 'register'
                    ? 'border-[#D4AF37] text-[#D4AF37]'
                    : 'border-transparent text-[#94A3B8] hover:text-[#F8FAFC]'
                }`}
              >
                <User className="w-4 h-4" />
                Register Account (Free)
              </button>
            </div>

            {/* Feedback error */}
            {authError && (
              <div className="mb-6 p-3.5 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {/* Login Form */}
            {authMode === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-1.5 font-mono">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="e.g. alex@example.com"
                    className="w-full bg-[#08090C] border border-white/10 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-sm text-[#F8FAFC] outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-1.5 font-mono">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-[#08090C] border border-white/10 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-sm text-[#F8FAFC] outline-none transition-colors"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full glow-gold-sm"
                    disabled={authLoading}
                  >
                    {authLoading ? (
                      <span className="flex items-center gap-2">
                        <LoadingSpinner size="sm" /> Authenticating...
                      </span>
                    ) : (
                      'Access Customer Garage'
                    )}
                  </Button>
                </div>
              </form>
            ) : (
            /* Register Form */
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-1.5 font-mono">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    placeholder="Christian Vance"
                    className="w-full bg-[#08090C] border border-white/10 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-sm text-[#F8FAFC] outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-1.5 font-mono">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={authPhone}
                    onChange={(e) => setAuthPhone(e.target.value)}
                    placeholder="+1 (512) 555-0199"
                    className="w-full bg-[#08090C] border border-white/10 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-sm text-[#F8FAFC] outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-1.5 font-mono">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="vance@atelier.com"
                  className="w-full bg-[#08090C] border border-white/10 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-sm text-[#F8FAFC] outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-1.5 font-mono">
                  Password (Min 6 Characters)
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#08090C] border border-white/10 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-sm text-[#F8FAFC] outline-none transition-colors"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full glow-gold-sm"
                  disabled={authLoading}
                >
                  {authLoading ? (
                    <span className="flex items-center gap-2">
                      <LoadingSpinner size="sm" /> Creating Account...
                    </span>
                  ) : (
                    'Create Account & Open Garage'
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
    );
  }

  // Count active warranty certificates across bookings
  const warrantyCount = bookings.filter(b => b.warrantyCertificate?.issued).length;

  return (
    <div className="w-full bg-[#08090C] text-[#F8FAFC] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Toast Feedback Banner */}
        {actionSuccess && (
          <div className="p-4 rounded-xl bg-[#10B981]/15 border border-[#10B981]/40 text-[#34D399] text-sm flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span className="font-medium">{actionSuccess}</span>
            </div>
            <button onClick={() => setActionSuccess('')} className="text-[#34D399] hover:text-white cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Header Profile Bar */}
        <div className="bg-[#0E1017] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center text-[#08090C] text-2xl font-black shadow-lg font-mono">
              {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'C'}
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black text-[#F8FAFC] font-display">
                  {currentUser.name}
                </h1>
                <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 font-mono">
                  Atelier VIP Client
                </span>
              </div>
              <p className="text-sm text-[#94A3B8] mt-1 flex items-center gap-3 font-normal">
                <span>{currentUser.email}</span>
                {currentUser.phone && (
                  <>
                    <span className="text-white/20">•</span>
                    <span>{currentUser.phone}</span>
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Quick Actions & Logout */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <Button
              variant="secondary"
              size="sm"
              icon={RefreshCw}
              onClick={() => fetchGarage(token)}
              disabled={loadingGarage}
              className="border-white/10 hover:border-white/25"
            >
              Refresh
            </Button>
            <Button
              variant="danger"
              size="sm"
              icon={LogOut}
              onClick={handleLogout}
            >
              Sign Out
            </Button>
          </div>
        </div>

        {/* Summary KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#0E1017] border border-white/10 rounded-xl p-5 flex items-center justify-between shadow-lg">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] font-mono">Saved Vehicles</p>
              <p className="text-2xl font-black text-[#F8FAFC] mt-1 font-mono">{savedVehicles.length}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37]">
              <Car className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-[#0E1017] border border-white/10 rounded-xl p-5 flex items-center justify-between shadow-lg">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] font-mono">Service Bookings</p>
              <p className="text-2xl font-black text-[#F8FAFC] mt-1 font-mono">{bookings.length}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center text-[#10B981]">
              <Calendar className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-[#0E1017] border border-white/10 rounded-xl p-5 flex items-center justify-between shadow-lg">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] font-mono">Active 9H Warranties</p>
              <p className="text-2xl font-black text-[#D4AF37] mt-1 font-mono">{warrantyCount}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <Award className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Tab Selectors */}
        <div className="flex border-b border-white/10 gap-4 font-mono">
          <button
            onClick={() => setActiveTab('vehicles')}
            className={`pb-3 px-4 font-bold text-sm transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'vehicles'
                ? 'border-[#D4AF37] text-[#D4AF37]'
                : 'border-transparent text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
          >
            <Car className="w-4 h-4" />
            My Vehicle Fleet ({savedVehicles.length})
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`pb-3 px-4 font-bold text-sm transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'bookings'
                ? 'border-[#D4AF37] text-[#D4AF37]'
                : 'border-transparent text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Concierge Bookings & History ({bookings.length})
          </button>
        </div>

      {/* Tab 1: Saved Vehicles */}
      {activeTab === 'vehicles' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#F8FAFC] font-display">Personal Fleet</h2>
              <p className="text-xs text-[#94A3B8] mt-0.5 font-normal">Vehicles saved for rapid 1-click package configuration & priority bay scheduling.</p>
            </div>
            <Button
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={() => setIsAddVehicleOpen(true)}
              className="glow-gold-sm"
            >
              Add Vehicle
            </Button>
          </div>

          {loadingGarage ? (
            <div className="py-12 flex justify-center"><LoadingSpinner size="lg" /></div>
          ) : savedVehicles.length === 0 ? (
            <div className="bg-[#0E1017] border border-white/10 rounded-2xl p-10 text-center shadow-lg">
              <Car className="w-12 h-12 text-[#94A3B8] mx-auto mb-3 opacity-60" />
              <h3 className="text-lg font-bold text-[#F8FAFC] font-display">No vehicles in your garage yet</h3>
              <p className="text-sm text-[#94A3B8] mt-1 max-w-md mx-auto font-normal">
                Save your car details once to auto-apply chassis multipliers and configure appointments in seconds.
              </p>
              <div className="mt-5">
                <Button
                  variant="primary"
                  size="md"
                  icon={Plus}
                  onClick={() => setIsAddVehicleOpen(true)}
                  className="glow-gold-sm"
                >
                  Add Your First Vehicle
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedVehicles.map((vehicle) => (
                <div
                  key={vehicle._id}
                  className="bg-[#0E1017] border border-white/10 hover:border-[#D4AF37]/50 transition-all rounded-2xl p-6 shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex flex-col justify-between group relative overflow-hidden"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37]">
                        <Car className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#08090C] text-[#CBD5E1] border border-white/10">
                        {vehicle.categorySlug || 'sedan'}
                      </span>
                    </div>

                    <div className="mt-4">
                      <h3 className="text-lg font-black text-[#F8FAFC] font-display">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </h3>
                      {vehicle.licensePlate && (
                        <p className="text-xs text-[#94A3B8] mt-1 font-mono tracking-wider">
                          Plate: <span className="text-[#D4AF37] font-bold">{vehicle.licensePlate}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      iconRight={ArrowRight}
                      onClick={() => navigate(`/builder?category=${vehicle.categorySlug || 'sedan'}`)}
                      className="text-xs py-1.5 glow-gold-sm"
                    >
                      Book Detailing
                    </Button>
                    <button
                      onClick={() => handleRemoveVehicle(vehicle._id)}
                      className="p-2 text-[#94A3B8] hover:text-[#EF4444] rounded-lg hover:bg-[#EF4444]/10 transition-colors cursor-pointer"
                      title="Remove Vehicle"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Bookings & History */}
      {activeTab === 'bookings' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#F8FAFC]">Service Bookings</h2>
              <p className="text-xs text-[#94A3B8] mt-0.5">Live status, invoice receipts, and ceramic coating quality certificates.</p>
            </div>
            <Link to="/builder">
              <Button variant="primary" size="sm" iconRight={ArrowRight}>
                Schedule New Bay
              </Button>
            </Link>
          </div>

          {loadingGarage ? (
            <div className="py-12 flex justify-center"><LoadingSpinner size="lg" /></div>
          ) : bookings.length === 0 ? (
            <div className="bg-[#0F1420] border border-[#1D2536] rounded-2xl p-10 text-center">
              <Calendar className="w-12 h-12 text-[#94A3B8] mx-auto mb-3 opacity-60" />
              <h3 className="text-lg font-bold text-[#F8FAFC]">No detailing reservations found</h3>
              <p className="text-sm text-[#94A3B8] mt-1 max-w-md mx-auto">
                Once you book a bespoke detailing session using this email ({currentUser.email}), it will instantly appear in your personal concierge ledger.
              </p>
              <div className="mt-5">
                <Link to="/builder">
                  <Button variant="primary" size="md" iconRight={ArrowRight}>
                    Configure Detailing Package
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => {
                const isPaid = booking.payment?.status === 'paid';
                const hasWarranty = booking.warrantyCertificate?.issued;

                return (
                  <div
                    key={booking._id}
                    className="bg-[#0F1420] border border-[#1D2536] rounded-2xl p-5 sm:p-6 shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                  >
                    {/* Booking Meta */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-mono font-bold text-[#38BDF8] text-sm">
                          {booking.bookingCode}
                        </span>
                        <Badge status={booking.status} size="sm" />
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                          isPaid ? 'bg-[#10B981]/15 text-[#34D399] border border-[#10B981]/30' : 'bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30'
                        }`}>
                          {isPaid ? 'Paid in Full' : 'Payment Due at Studio'}
                        </span>
                      </div>

                      <h3 className="text-lg font-extrabold text-[#F8FAFC]">
                        {booking.servicePackage?.title || 'Detailing Service'}
                      </h3>

                      <p className="text-xs text-[#94A3B8] flex items-center gap-2 flex-wrap">
                        <span>Chassis: <strong className="text-[#F8FAFC]">{booking.vehicle?.year} {booking.vehicle?.make} {booking.vehicle?.model}</strong></span>
                        <span className="text-[#2A364E]">•</span>
                        <span>Date: <strong className="text-[#F8FAFC]">{booking.scheduledDate ? new Date(booking.scheduledDate).toLocaleDateString() : 'TBD'}</strong></span>
                        <span className="text-[#2A364E]">•</span>
                        <span>Bay: <strong className="text-[#F8FAFC]">{booking.baySlot || 'Bay 1'}</strong></span>
                        <span className="text-[#2A364E]">•</span>
                        <span>Total: <strong className="text-[#34D399] font-mono text-sm">${booking.pricing?.totalPrice?.toFixed(2) || '0.00'}</strong></span>
                      </p>
                    </div>

                    {/* Action Hub */}
                    <div className="flex items-center gap-2 flex-wrap shrink-0">
                      <Link to={`/track/${booking.bookingCode}`}>
                        <Button variant="secondary" size="sm" icon={ExternalLink}>
                          Track Live
                        </Button>
                      </Link>

                      {/* PDF Invoice */}
                      <a
                        href={getInvoiceDownloadUrl(booking.bookingCode)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex"
                      >
                        <Button variant="secondary" size="sm" icon={FileText}>
                          Invoice PDF
                        </Button>
                      </a>

                      {/* Official Warranty Certificate */}
                      {hasWarranty && (
                        <a
                          href={getWarrantyDownloadUrl(booking.bookingCode)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex"
                        >
                          <Button variant="gold" size="sm" icon={Award}>
                            Warranty PDF
                          </Button>
                        </a>
                      )}

                      {/* Rebook */}
                      <Link
                        to={`/builder?package=${booking.servicePackage?.slug || ''}&category=${booking.vehicleCategory?.slug || ''}`}
                      >
                        <Button variant="ghost" size="sm" iconRight={ArrowRight}>
                          Rebook
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
      </div>

      {/* Add Vehicle Modal */}
      {isAddVehicleOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0F1420] border border-[#1D2536] rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setIsAddVehicleOpen(false)}
              className="absolute top-5 right-5 text-[#94A3B8] hover:text-[#F8FAFC]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#0284C7]/20 border border-[#38BDF8]/40 flex items-center justify-center text-[#38BDF8]">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#F8FAFC]">Add Vehicle to Garage</h3>
                <p className="text-xs text-[#94A3B8]">Personal fleet configuration</p>
              </div>
            </div>

            {vehicleError && (
              <div className="mb-4 p-3 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] text-xs">
                {vehicleError}
              </div>
            )}

            <form onSubmit={handleAddVehicle} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-1">Make</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Porsche"
                    value={newVehicle.make}
                    onChange={(e) => setNewVehicle({ ...newVehicle, make: e.target.value })}
                    className="w-full bg-[#161D2E] border border-[#2A364E] focus:border-[#38BDF8] rounded-xl px-3.5 py-2 text-sm text-[#F8FAFC] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-1">Model</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 911 GT3"
                    value={newVehicle.model}
                    onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                    className="w-full bg-[#161D2E] border border-[#2A364E] focus:border-[#38BDF8] rounded-xl px-3.5 py-2 text-sm text-[#F8FAFC] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-1">Year</label>
                  <input
                    type="number"
                    required
                    min={1950}
                    max={new Date().getFullYear() + 1}
                    value={newVehicle.year}
                    onChange={(e) => setNewVehicle({ ...newVehicle, year: e.target.value })}
                    className="w-full bg-[#161D2E] border border-[#2A364E] focus:border-[#38BDF8] rounded-xl px-3.5 py-2 text-sm text-[#F8FAFC] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-1">License Plate</label>
                  <input
                    type="text"
                    placeholder="e.g. DOCK-911"
                    value={newVehicle.licensePlate}
                    onChange={(e) => setNewVehicle({ ...newVehicle, licensePlate: e.target.value })}
                    className="w-full bg-[#161D2E] border border-[#2A364E] focus:border-[#38BDF8] rounded-xl px-3.5 py-2 text-sm text-[#F8FAFC] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-1">Chassis Category</label>
                <select
                  value={newVehicle.categorySlug}
                  onChange={(e) => setNewVehicle({ ...newVehicle, categorySlug: e.target.value })}
                  className="w-full bg-[#161D2E] border border-[#2A364E] focus:border-[#38BDF8] rounded-xl px-3.5 py-2 text-sm text-[#F8FAFC] outline-none"
                >
                  {categories.length > 0 ? (
                    categories.map((c) => (
                      <option key={c._id} value={c.slug}>
                        {c.name} ({c.priceMultiplier}x Multiplier)
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="sedan">Compact / Sedan (1.0x)</option>
                      <option value="executive-coupe">Executive / Coupe (1.1x)</option>
                      <option value="compact-suv">Compact SUV / Crossover (1.25x)</option>
                      <option value="full-suv">Full-Size SUV / Truck (1.45x)</option>
                    </>
                  )}
                </select>
              </div>

              <div className="pt-3 flex gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  className="flex-1"
                  onClick={() => setIsAddVehicleOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="flex-1 glow-cyan-sm"
                  disabled={submittingVehicle}
                >
                  {submittingVehicle ? 'Saving...' : 'Save Vehicle'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
