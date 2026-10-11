import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Shield, 
  RefreshCw, 
  LogOut, 
  Search, 
  Warehouse, 
  ExternalLink,
  Building2,
  SlidersHorizontal,
  Globe,
  Sparkles
} from 'lucide-react';
import { Button } from './components/common/Button.jsx';
import { LoadingSpinner } from './components/common/LoadingSpinner.jsx';
import { AdminLogin } from './components/admin/AdminLogin.jsx';
import { AdminKpiRow } from './components/admin/AdminKpiRow.jsx';
import { KanbanBoard } from './components/admin/KanbanBoard.jsx';
import { BookingDetailModal } from './components/admin/BookingDetailModal.jsx';
import { StudioSettingsModal } from './components/admin/StudioSettingsModal.jsx';
import { CatalogManagerModal } from './components/admin/CatalogManagerModal.jsx';
import { CMSManagerModal } from './components/admin/CMSManagerModal.jsx';
import { getAdminStats, getAdminBookings, updateBookingStatus } from './services/api.js';

// Fallback demo bookings for offline preview
const DEMO_BOOKINGS = [
  {
    _id: 'demo-1',
    bookingCode: 'DD-P911RS',
    status: 'Pending',
    bayNumber: 1,
    scheduledDate: new Date().toISOString(),
    scheduledTimeSlot: '09:00 - 13:00',
    totalPrice: 1699.00,
    vehicle: {
      make: 'Porsche',
      model: '911 GT3 RS',
      year: 2024,
      paintColor: 'Shark Blue',
      category: 'Coupe',
      categoryName: 'Coupe / Sports'
    },
    customer: {
      name: 'Alexander Wright',
      email: 'alexander@wrightcapital.com',
      phone: '+1 (555) 948-2201'
    },
    packageSnapshot: {
      title: 'Titanium Ceramic Shield & Paint Correction',
      calculatedPrice: 1450.00
    },
    addonsSnapshot: [
      { title: 'Graphene Wheel Face & Barrel Armor', price: 249.00 }
    ],
    notes: 'Please exercise special caution around rear exposed carbon wing endplates.'
  },
  {
    _id: 'demo-2',
    bookingCode: 'DD-F296TB',
    status: 'Confirmed',
    bayNumber: 2,
    scheduledDate: new Date().toISOString(),
    scheduledTimeSlot: '13:00 - 17:00',
    totalPrice: 2199.00,
    vehicle: {
      make: 'Ferrari',
      model: '296 GTB Assetto Fiorano',
      year: 2023,
      paintColor: 'Rosso Corsa',
      category: 'Coupe',
      categoryName: 'Coupe / Sports'
    },
    customer: {
      name: 'Elena Rostova',
      email: 'elena@rostovacars.com',
      phone: '+1 (555) 302-8841'
    },
    packageSnapshot: {
      title: 'Full Body Self-Healing PPF & Gloss Guard',
      calculatedPrice: 1899.00
    },
    addonsSnapshot: [
      { title: 'Full Alcantara Cleanse & Matte Guard', price: 150.00 },
      { title: 'Glass Hydrophobic Rain-Repellent', price: 150.00 }
    ],
    notes: 'Keyed delivery from enclosed transporter at 12:45.'
  },
  {
    _id: 'demo-3',
    bookingCode: 'DD-M4CSL1',
    status: 'In Bay',
    bayNumber: 1,
    scheduledDate: new Date().toISOString(),
    scheduledTimeSlot: '08:00 - 12:00',
    totalPrice: 1250.00,
    vehicle: {
      make: 'BMW',
      model: 'M4 CSL',
      year: 2023,
      paintColor: 'Frozen Brooklyn Grey',
      category: 'Coupe',
      categoryName: 'Coupe / Sports'
    },
    customer: {
      name: 'Marcus Sterling',
      email: 'marcus@sterlingmotors.com',
      phone: '+1 (555) 771-4092'
    },
    packageSnapshot: {
      title: 'Concourse Multi-Stage Correction Suite',
      calculatedPrice: 1250.00
    },
    addonsSnapshot: [],
    notes: 'Matte paint formulation — no high-gloss wax or silicone dressings.'
  }
];

export function App() {
  const [token, setToken] = useState(() => localStorage.getItem('detaildock_admin_token') || null);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('detaildock_admin_user')) || null;
    } catch {
      return null;
    }
  });

  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  // Modals state
  const [inspectBooking, setInspectBooking] = useState(null);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCMSOpen, setIsCMSOpen] = useState(false);

  const publicPortalUrl = import.meta.env.VITE_CLIENT_URL || 'http://localhost:5173';

  // Smooth scroll to top on auth changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [token]);

  const handleLoginSuccess = (authToken, authUser) => {
    localStorage.setItem('detaildock_admin_token', authToken);
    if (authUser) {
      localStorage.setItem('detaildock_admin_user', JSON.stringify(authUser));
      setUser(authUser);
    }
    setToken(authToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('detaildock_admin_token');
    localStorage.removeItem('detaildock_admin_user');
    setToken(null);
    setUser(null);
  };

  const loadDashboardData = useCallback(async (isRefresh = false) => {
    if (!token) return;
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const [statsData, bookingsData] = await Promise.all([
        getAdminStats(token).catch(e => {
          console.warn('Stats fetch warning:', e.message);
          return null;
        }),
        getAdminBookings(token).catch(e => {
          console.warn('Bookings fetch warning:', e.message);
          return null;
        })
      ]);

      setStats(statsData);
      if (Array.isArray(bookingsData) && bookingsData.length > 0) {
        setBookings(bookingsData);
      } else {
        setBookings(DEMO_BOOKINGS);
      }
    } catch (err) {
      console.warn('Dashboard API call failure, using fallback preview:', err);
      setBookings(DEMO_BOOKINGS);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      loadDashboardData();
    }
  }, [token, loadDashboardData]);

  const handleAdvanceStatus = async (booking, newStatus, note, bay) => {
    const id = booking._id || booking.id;
    try {
      setUpdatingId(id);
      await updateBookingStatus(id, newStatus, token);
      setBookings(prev => prev.map(b => (b._id === id || b.id === id ? { ...b, status: newStatus } : b)));
      if (inspectBooking && (inspectBooking._id === id || inspectBooking.id === id)) {
        setInspectBooking(prev => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      console.warn('Status update API error, applying optimistic update:', err);
      setBookings(prev => prev.map(b => (b._id === id || b.id === id ? { ...b, status: newStatus } : b)));
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredBookings = useMemo(() => {
    if (!searchTerm.trim()) return bookings;
    const term = searchTerm.toLowerCase();
    return bookings.filter(b => 
      b.bookingCode?.toLowerCase().includes(term) ||
      b.customer?.name?.toLowerCase().includes(term) ||
      b.customer?.email?.toLowerCase().includes(term) ||
      b.customer?.phone?.includes(term) ||
      b.vehicle?.make?.toLowerCase().includes(term) ||
      b.vehicle?.model?.toLowerCase().includes(term) ||
      b.packageSnapshot?.title?.toLowerCase().includes(term)
    );
  }, [bookings, searchTerm]);

  return (
    <div className="min-h-screen bg-[#0B0E14] text-slate-100 antialiased selection:bg-[#F59E0B] selection:text-black">
      
      {/* Top Floating App Bar */}
      <header className="sticky top-0 z-40 bg-[#0B0E14]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#F59E0B] to-[#D97706] p-0.5 flex items-center justify-center shadow-lg shadow-[#F59E0B]/20">
            <div className="w-full h-full bg-[#0B0E14] rounded-[10px] flex items-center justify-center text-[#F59E0B]">
              <Shield className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-base tracking-tight font-display">DetailDock</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-[#F59E0B] border border-amber-500/30 uppercase font-bold">
                Sovereign Admin
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono hidden sm:block">
              Dedicated Studio Operations Deck • Port 5174
            </div>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2">
          <a
            href={publicPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 hover:text-white transition font-mono"
            title="Open Public Customer Portal"
          >
            <span>Customer Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
          </a>

          {token && (
            <>
              {/* Dynamic Website Studio CMS Launcher Button */}
              <button
                onClick={() => setIsCMSOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-black text-xs font-extrabold hover:brightness-110 shadow-lg shadow-[#F59E0B]/25 transition cursor-pointer"
                title="Manage Website Copy, Headlines, Showcases & Testimonials"
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Website Studio CMS</span>
                <span className="sm:hidden">CMS</span>
              </button>

              {/* Service Catalog Cockpit Button */}
              <button
                onClick={() => setIsCatalogOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#111622] border border-white/10 text-xs text-slate-200 hover:text-white hover:border-[#F59E0B]/40 transition cursor-pointer"
                title="Manage Preservation Packages & Multipliers"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span className="hidden sm:inline">Catalog & Rates</span>
              </button>

              {/* Studio Settings Customizer Button */}
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 rounded-xl bg-[#111622] border border-white/10 text-slate-300 hover:text-white hover:border-[#F59E0B]/40 transition cursor-pointer"
                title="Studio Identity & White-label Settings"
              >
                <Building2 className="w-4 h-4 text-[#F59E0B]" />
              </button>

              {/* Refresh Dashboard Button */}
              <button
                onClick={() => loadDashboardData(true)}
                disabled={refreshing}
                className="p-2 rounded-xl bg-[#111622] border border-white/10 text-slate-300 hover:text-white transition cursor-pointer"
                title="Refresh Pipeline"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-[#F59E0B]' : ''}`} />
              </button>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 transition cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </header>

      {/* Main App Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        
        {!token ? (
          <div className="py-8">
            <AdminLogin onLoginSuccess={handleLoginSuccess} />
          </div>
        ) : (
          <>
            {/* Top Command Deck Header Card */}
            <div className="p-6 rounded-3xl bg-[#0B0E14] border border-white/10 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                  <span className="text-xs font-mono font-bold uppercase text-[#10B981] tracking-wider">
                    Dual Cleanroom Bays Active • Austin ISO-6 Atelier
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
                  Atelier Operations Deck
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
                  Real-time technician staging, sub-micron clear coat DVI telemetry, automated serialized 3-year warranty generation, and instant website CMS control.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter by code, Porsche, client..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#111622] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B]/30"
                />
              </div>
            </div>

            {/* Financial & Operational KPI Row */}
            <AdminKpiRow stats={stats} bookingsCount={bookings.length} />

            {/* Dual-Bay Cleanroom Kanban Board */}
            {loading ? (
              <LoadingSpinner size="lg" text="Syncing Atelier Cleanroom Pipeline..." />
            ) : (
              <KanbanBoard
                bookings={filteredBookings}
                onAdvanceStatus={handleAdvanceStatus}
                onOpenDetails={(b) => setInspectBooking(b)}
                isUpdatingId={updatingId}
              />
            )}
          </>
        )}

      </main>

      {/* Sovereign Admin Modals */}
      {inspectBooking && (
        <BookingDetailModal
          booking={inspectBooking}
          onClose={() => setInspectBooking(null)}
          onUpdateStatus={(b, st, note, bay) => {
            handleAdvanceStatus(b, st, note, bay);
            setInspectBooking(null);
          }}
          isUpdating={updatingId === (inspectBooking._id || inspectBooking.id)}
        />
      )}

      {isCatalogOpen && (
        <CatalogManagerModal
          isOpen={isCatalogOpen}
          onClose={() => setIsCatalogOpen(false)}
          token={token}
          onCatalogUpdated={() => loadDashboardData(true)}
        />
      )}

      {isSettingsOpen && (
        <StudioSettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          token={token}
          onSettingsUpdated={() => loadDashboardData(true)}
        />
      )}

      {isCMSOpen && (
        <CMSManagerModal
          isOpen={isCMSOpen}
          onClose={() => setIsCMSOpen(false)}
          token={token}
          onCMSUpdated={() => loadDashboardData(true)}
        />
      )}

    </div>
  );
}

export default App;
