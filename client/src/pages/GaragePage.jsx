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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentUser, activeTab]);

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
      <div className="w-full bg-[#0B0E14] text-[#F8FAFC] min-h-screen pt-32 pb-24 sm:pt-36 sm:pb-28 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-4xl mx-auto w-full">
          {/* Header Intro */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111622] border border-white/10 text-[#F59E0B] text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
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
          <div className="bg-[#111622] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
            {/* Subtle Accent Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F59E0B]/5 rounded-full blur-3xl pointer-events-none" />

            {/* Quick Demo Customer Pill */}
            <div className="mb-6 p-4 rounded-xl bg-[#0B0E14] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F59E0B] font-mono">
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
                className="text-xs font-bold text-[#0B0E14] bg-[#F59E0B] hover:bg-[#FBBF24] px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer font-mono tactile-press"
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
                    ? 'border-[#F59E0B] text-[#F59E0B]'
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
                    ? 'border-[#F59E0B] text-[#F59E0B]'
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
                    className="w-full bg-[#08090C] border border-white/10 focus:border-[#F59E0B] rounded-xl px-4 py-2.5 text-sm text-[#F8FAFC] outline-none transition-colors"
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
                    className="w-full bg-[#0B0E14] border border-white/10 focus:border-[#F59E0B] rounded-xl px-4 py-2.5 text-sm text-[#F8FAFC] outline-none transition-colors"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full glow-amber"
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
                    className="w-full bg-[#0B0E14] border border-white/10 focus:border-[#F59E0B] rounded-xl px-4 py-2.5 text-sm text-[#F8FAFC] outline-none transition-colors"
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
                    className="w-full bg-[#0B0E14] border border-white/10 focus:border-[#F59E0B] rounded-xl px-4 py-2.5 text-sm text-[#F8FAFC] outline-none transition-colors"
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
                  className="w-full bg-[#0B0E14] border border-white/10 focus:border-[#F59E0B] rounded-xl px-4 py-2.5 text-sm text-[#F8FAFC] outline-none transition-colors"
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
                  className="w-full bg-[#0B0E14] border border-white/10 focus:border-[#F59E0B] rounded-xl px-4 py-2.5 text-sm text-[#F8FAFC] outline-none transition-colors"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full glow-amber"
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

        {/* Atelier VIP Client Privilege Architecture */}
        <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
          <div className="p-5 rounded-2xl bg-[#111622] border border-white/10 hover:border-[#F59E0B]/30 transition-all space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B]">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white font-display">
              Priority Cleanroom Bay Access
            </h4>
            <p className="text-xs text-[#94A3B8] leading-relaxed font-normal">
              Guaranteed priority scheduling in climate-controlled dual cleanroom bays with dedicated master technician assignment.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#111622] border border-white/10 hover:border-[#F59E0B]/30 transition-all space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center text-[#10B981]">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white font-display">
              Serialized 9H Warranty Diplomas
            </h4>
            <p className="text-xs text-[#94A3B8] leading-relaxed font-normal">
              Instant digital archive and vector PDF downloads of all multi-year ceramic coating warranty certificates.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#111622] border border-white/10 hover:border-[#F59E0B]/30 transition-all space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/15 border border-[#3B82F6]/30 flex items-center justify-center text-[#3B82F6]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white font-display">
              Sub-Micron Paint Health Records
            </h4>
            <p className="text-xs text-[#94A3B8] leading-relaxed font-normal">
              Historical access to optical specular gloss index (GU) and ultrasonic clear coat thickness across every service milestone.
            </p>
          </div>
        </div>

      </div>
    </div>
    );
  }

  // Count active warranty certificates across bookings
  const warrantyCount = bookings.filter(b => b.warrantyCertificate?.issued).length;

  // Dynamic Supercar Photography Resolver
  const getVehicleImage = (vehicle) => {
    const make = (vehicle?.make || '').toLowerCase();
    const model = (vehicle?.model || '').toLowerCase();
    const cat = (vehicle?.categorySlug || '').toLowerCase();

    // 1. Exact Brand / Model Supercars
    if (make.includes('porsche') || model.includes('911') || model.includes('gt3') || model.includes('carrera') || model.includes('cayman')) {
      return 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=800&auto=format&fit=crop'; // Porsche 911 GT3 RS
    }
    if (make.includes('ferrari') || model.includes('296') || model.includes('f8') || model.includes('tributo') || model.includes('sf90') || model.includes('roma')) {
      return 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=800&auto=format&fit=crop'; // Ferrari Rosso Corsa
    }
    if (make.includes('lamborghini') || model.includes('huracan') || model.includes('revuelto') || model.includes('aventador')) {
      return 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=800&auto=format&fit=crop'; // Lamborghini
    }
    if (make.includes('mclaren') || model.includes('720s') || model.includes('750s') || model.includes('artura')) {
      return 'https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=800&auto=format&fit=crop'; // McLaren
    }
    if (make.includes('bmw') || model.includes('m3') || model.includes('m4') || model.includes('m5') || model.includes('m8')) {
      return 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800&auto=format&fit=crop'; // BMW M3 Competition
    }
    if (make.includes('mercedes') || make.includes('amg') || model.includes('gt') || model.includes('c63')) {
      return 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=800&auto=format&fit=crop'; // Mercedes-AMG
    }
    if (make.includes('audi') || model.includes('rs6') || model.includes('rs7') || model.includes('r8')) {
      return 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=800&auto=format&fit=crop'; // Audi RS
    }
    if (make.includes('ford') && (model.includes('f-150') || model.includes('raptor') || model.includes('truck'))) {
      return 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop'; // Ford F-150 Raptor
    }
    if (make.includes('rover') || model.includes('defender') || cat.includes('suv')) {
      return 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop'; // Luxury SUV
    }

    // 2. Category Fallbacks
    if (cat.includes('coupe') || cat.includes('supercar')) {
      return 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=800&auto=format&fit=crop';
    }
    if (cat.includes('truck')) {
      return 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop';
    }
    return 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800&auto=format&fit=crop';
  };

  // Format Chassis Category Badges
  const formatCategoryBadge = (slug) => {
    if (!slug) return 'Executive Coupe';
    const s = slug.toLowerCase();
    if (s.includes('supercar')) return 'Supercar / Exotic';
    if (s.includes('executive-coupe') || s.includes('coupe')) return 'Executive Coupe';
    if (s.includes('sedan')) return 'Luxury Sedan';
    if (s.includes('compact-suv')) return 'Compact SUV / Crossover';
    if (s.includes('full-suv') || s.includes('suv')) return 'Full-Size Luxury SUV';
    if (s.includes('truck')) return 'Full-Size Truck';
    return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  return (
    <div className="w-full bg-[#0B0E14] text-[#F8FAFC] min-h-screen pt-32 pb-24 sm:pt-36 sm:pb-28 px-4 sm:px-6 lg:px-8">
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
        <div className="bg-[#111622] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center text-[#0B0E14] text-2xl font-black shadow-lg font-mono">
              {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'C'}
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black text-[#F8FAFC] font-display">
                  {currentUser.name}
                </h1>
                <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30 font-mono">
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
          <div className="bg-[#111622] border border-white/10 hover:border-[#F59E0B]/30 transition-all rounded-2xl p-5 flex items-center justify-between shadow-lg">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] font-mono">Saved Vehicles</p>
              <p className="text-2xl font-black text-[#F8FAFC] mt-1 font-mono">{savedVehicles.length}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#F59E0B]">
              <Car className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-[#111622] border border-white/10 hover:border-[#10B981]/30 transition-all rounded-2xl p-5 flex items-center justify-between shadow-lg">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] font-mono">Service Bookings</p>
              <p className="text-2xl font-black text-[#F8FAFC] mt-1 font-mono">{bookings.length}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center text-[#10B981]">
              <Calendar className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-[#111622] border border-white/10 hover:border-[#F59E0B]/30 transition-all rounded-2xl p-5 flex items-center justify-between shadow-lg">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] font-mono">Active 9H Warranties</p>
              <p className="text-2xl font-black text-[#F59E0B] mt-1 font-mono">{warrantyCount}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B]">
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
                ? 'border-[#F59E0B] text-[#F59E0B]'
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
                ? 'border-[#F59E0B] text-[#F59E0B]'
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
              className="glow-amber"
            >
              Add Vehicle
            </Button>
          </div>

          {loadingGarage ? (
            <div className="py-12 flex justify-center"><LoadingSpinner size="lg" /></div>
          ) : savedVehicles.length === 0 ? (
            <div className="bg-[#111622] border border-white/10 rounded-2xl p-10 text-center shadow-lg">
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
                  className="glow-amber"
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
                  className="bg-[#111622] border border-white/10 hover:border-[#F59E0B]/50 transition-all rounded-2xl p-6 shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex flex-col justify-between group relative overflow-hidden"
                >
                  <div>
                    {/* Automotive Photo Banner */}
                    <div className="h-44 -mx-6 -mt-6 mb-4 relative overflow-hidden bg-[#0B0E14] border-b border-white/10">
                      <img 
                        src={getVehicleImage(vehicle)} 
                        alt={`${vehicle.make} ${vehicle.model}`}
                        className="w-full h-full object-cover opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111622] via-transparent to-transparent" />
                      <span className="absolute top-3 right-3 text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-full bg-[#0B0E14]/85 text-[#F59E0B] border border-[#F59E0B]/30 backdrop-blur-md">
                        {formatCategoryBadge(vehicle.categorySlug)}
                      </span>
                    </div>

                    <div className="mt-2">
                      <h3 className="text-lg font-black text-[#F8FAFC] font-display">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </h3>
                      {vehicle.licensePlate && (
                        <p className="text-xs text-[#94A3B8] mt-1 font-mono tracking-wider">
                          Plate: <span className="text-[#F59E0B] font-bold">{vehicle.licensePlate}</span>
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
                      className="text-xs py-1.5 glow-amber"
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
              <h2 className="text-xl font-bold text-[#F8FAFC] font-display">Service Bookings</h2>
              <p className="text-xs text-[#94A3B8] mt-0.5 font-normal">Live status, invoice receipts, and ceramic coating quality certificates.</p>
            </div>
            <Link to="/builder">
              <Button variant="primary" size="sm" iconRight={ArrowRight} className="glow-amber">
                Schedule New Bay
              </Button>
            </Link>
          </div>

          {loadingGarage ? (
            <div className="py-12 flex justify-center"><LoadingSpinner size="lg" /></div>
          ) : bookings.length === 0 ? (
            <div className="bg-[#111622] border border-white/10 rounded-2xl p-10 sm:p-12 text-center shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-4 max-w-2xl mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#F59E0B] mx-auto">
                <Calendar className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#F8FAFC] font-display">No detailing reservations found</h3>
              <p className="text-sm text-[#94A3B8] max-w-lg mx-auto font-normal leading-relaxed">
                Once you book a bespoke detailing session using your client email (<span className="text-[#F8FAFC] font-medium">{currentUser.email}</span>), it will automatically archive here with live stage telemetry, DVI paint inspections, and serialized 9H warranty certificates.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link to="/builder">
                  <Button variant="primary" size="md" iconRight={ArrowRight} className="w-full sm:w-auto glow-amber">
                    Configure Detailing Package
                  </Button>
                </Link>
                <Link to="/track/DD-DEMO01">
                  <Button variant="secondary" size="md" icon={ExternalLink} className="w-full sm:w-auto border-white/10 text-[#CBD5E1] hover:text-white">
                    Explore Demo Telemetry (DD-DEMO01)
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => {
                const isPaid = booking.payment?.status === 'paid';
                const hasWarranty = booking.warrantyCertificate?.issued;
                const totalAmt = booking.pricing?.totalPrice ?? booking.totalPrice ?? 0;

                return (
                  <div
                    key={booking._id}
                    className="bg-[#111622] border border-white/10 hover:border-[#F59E0B]/30 transition-all rounded-2xl p-5 sm:p-6 shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                  >
                    {/* Booking Meta */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-mono font-bold text-[#F59E0B] text-sm tracking-wider">
                          {booking.bookingCode}
                        </span>
                        <Badge status={booking.status} size="sm" />
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider font-mono ${
                          isPaid ? 'bg-[#10B981]/15 text-[#34D399] border border-[#10B981]/30' : 'bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30'
                        }`}>
                          {isPaid ? 'Paid in Full' : 'Payment Due at Studio'}
                        </span>
                      </div>

                      <h3 className="text-lg font-extrabold text-[#F8FAFC] font-display">
                        {booking.servicePackage?.title || 'Signature Detailing & Preservation'}
                      </h3>

                      <p className="text-xs text-[#94A3B8] flex items-center gap-2 flex-wrap">
                        <span>Chassis: <strong className="text-[#F8FAFC]">{booking.vehicle?.year} {booking.vehicle?.make} {booking.vehicle?.model}</strong></span>
                        <span className="text-white/20">•</span>
                        <span>Date: <strong className="text-[#F8FAFC]">{booking.scheduledDate ? new Date(booking.scheduledDate).toLocaleDateString() : 'TBD'}</strong></span>
                        <span className="text-white/20">•</span>
                        <span>Bay: <strong className="text-[#F8FAFC]">Bay {booking.baySlot || booking.bayNumber || 1}</strong></span>
                        <span className="text-white/20">•</span>
                        <span>Total: <strong className="text-[#10B981] font-mono text-sm">${Number(totalAmt).toFixed(2)}</strong></span>
                      </p>
                    </div>

                    {/* Action Hub */}
                    <div className="flex items-center gap-2 flex-wrap shrink-0">
                      <Link to={`/track/${booking.bookingCode}`}>
                        <Button variant="outline" size="sm" icon={ExternalLink} className="text-xs border-[#F59E0B]/40 text-[#F59E0B] hover:bg-[#F59E0B]/10">
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
                        <Button variant="secondary" size="sm" icon={FileText} className="text-xs border-white/10 hover:border-white/25">
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
                          <Button variant="primary" size="sm" icon={Award} className="text-xs glow-amber">
                            Warranty PDF
                          </Button>
                        </a>
                      )}

                      {/* Rebook */}
                      <Link
                        to={`/builder?category=${booking.vehicle?.categorySlug || 'sedan'}`}
                      >
                        <Button variant="ghost" size="sm" iconRight={ArrowRight} className="text-xs text-[#CBD5E1] hover:text-white">
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
          <div className="bg-[#0B0E14] border border-white/10 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative">
            <button
              onClick={() => setIsAddVehicleOpen(false)}
              className="absolute top-5 right-5 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B]">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#F8FAFC] font-display">Add Vehicle to Garage</h3>
                <p className="text-xs text-[#94A3B8]">Personal fleet configuration & paint specs</p>
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
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-1 font-mono">Make</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Porsche"
                    value={newVehicle.make}
                    onChange={(e) => setNewVehicle({ ...newVehicle, make: e.target.value })}
                    className="w-full bg-[#111622] border border-white/10 focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B]/50 rounded-xl px-3.5 py-2.5 text-sm text-[#F8FAFC] placeholder-[#64748B] outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-1 font-mono">Model</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 911 GT3"
                    value={newVehicle.model}
                    onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                    className="w-full bg-[#111622] border border-white/10 focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B]/50 rounded-xl px-3.5 py-2.5 text-sm text-[#F8FAFC] placeholder-[#64748B] outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-1 font-mono">Year</label>
                  <input
                    type="number"
                    required
                    min={1950}
                    max={new Date().getFullYear() + 1}
                    value={newVehicle.year}
                    onChange={(e) => setNewVehicle({ ...newVehicle, year: e.target.value })}
                    className="w-full bg-[#111622] border border-white/10 focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B]/50 rounded-xl px-3.5 py-2.5 text-sm text-[#F8FAFC] placeholder-[#64748B] outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-1 font-mono">License Plate</label>
                  <input
                    type="text"
                    placeholder="e.g. DOCK-911"
                    value={newVehicle.licensePlate}
                    onChange={(e) => setNewVehicle({ ...newVehicle, licensePlate: e.target.value })}
                    className="w-full bg-[#111622] border border-white/10 focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B]/50 rounded-xl px-3.5 py-2.5 text-sm text-[#F8FAFC] placeholder-[#64748B] outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-1 font-mono">Chassis Category</label>
                <select
                  value={newVehicle.categorySlug}
                  onChange={(e) => setNewVehicle({ ...newVehicle, categorySlug: e.target.value })}
                  className="w-full bg-[#111622] border border-white/10 focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B]/50 rounded-xl px-3.5 py-2.5 text-sm text-[#F8FAFC] outline-none transition-colors"
                >
                  {categories.length > 0 ? (
                    categories.map((c) => (
                      <option key={c._id} value={c.slug} className="bg-[#111622] text-[#F8FAFC]">
                        {c.name} ({c.priceMultiplier}x Multiplier)
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="sedan" className="bg-[#111622] text-[#F8FAFC]">Compact / Sedan (1.0x)</option>
                      <option value="executive-coupe" className="bg-[#111622] text-[#F8FAFC]">Executive / Coupe (1.1x)</option>
                      <option value="compact-suv" className="bg-[#111622] text-[#F8FAFC]">Compact SUV / Crossover (1.25x)</option>
                      <option value="full-suv" className="bg-[#111622] text-[#F8FAFC]">Full-Size SUV / Truck (1.45x)</option>
                    </>
                  )}
                </select>
              </div>

              <div className="pt-3 flex gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  className="flex-1 border-white/10 text-[#CBD5E1] hover:text-white"
                  onClick={() => setIsAddVehicleOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="flex-1 glow-amber"
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
