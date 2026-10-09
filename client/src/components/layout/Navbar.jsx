import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Calendar, 
  Wrench, 
  Search, 
  Shield, 
  Sparkles,
  ArrowRight,
  PhoneCall
} from 'lucide-react';
import { DetailDockLogo } from '../common/DetailDockLogo.jsx';
import { Button } from '../common/Button.jsx';
import { useStudio } from '../../context/StudioContext.jsx';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { settings } = useStudio();

  const navLinks = [
    { name: 'Services', path: '/#services', icon: Sparkles },
    { name: 'Smart Builder', path: '/builder', icon: Wrench, highlight: true },
    { name: 'Schedule Bay', path: '/book', icon: Calendar },
    { name: 'Track Job', path: '/track', icon: Search },
    { name: 'Admin Portal', path: '/admin', icon: Shield }
  ];

  const isActive = (path) => {
    if (path.startsWith('/#')) return false;
    return location.pathname === path;
  };

  const bayCountText = settings?.maxBayCapacity === 1 
    ? 'Cleanroom Bay Active' 
    : `${settings?.maxBayCapacity || 2} Detailing Bays Active`;

  const locationText = `${settings?.address?.city || 'Austin'}, ${settings?.address?.state || 'TX'} Atelier`;
  const hoursText = `Operating: Mon–Sat ${settings?.operatingHours?.openTime || '09:00 AM'} – ${settings?.operatingHours?.closeTime || '06:00 PM'}`;
  const phoneText = settings?.contactPhone || '+1 (555) 348-2450';
  const cleanPhone = phoneText.replace(/[^\d+]/g, '');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1D2536] bg-[#090C12]/85 backdrop-blur-xl transition-all">
      {/* Top Thin Studio Status Bar */}
      <div className="hidden lg:flex items-center justify-between px-8 py-1.5 text-[11px] font-semibold tracking-wider uppercase border-b border-[#1D2536]/60 bg-[#101522]/40 text-[#94A3B8]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[#34D399]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
            </span>
            Atelier Live: {bayCountText}
          </span>
          <span className="text-[#2A364E]">•</span>
          <span>{locationText}</span>
          <span className="text-[#2A364E]">•</span>
          <span>{hoursText}</span>
        </div>

        <div className="flex items-center gap-4 text-[#94A3B8]">
          <a
            href={`tel:${cleanPhone}`}
            className="flex items-center gap-1.5 hover:text-[#38BDF8] transition-colors"
          >
            <PhoneCall className="w-3 h-3 text-[#38BDF8]" />
            <span>Concierge: {phoneText}</span>
          </a>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center focus:outline-none">
          <DetailDockLogo size="md" />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                  active
                    ? 'text-[#38BDF8] bg-[#38BDF8]/10 border border-[#38BDF8]/30 shadow-sm'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#161D2E]/60'
                }`}
              >
                {item.name}
                {item.highlight && (
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-extrabold uppercase bg-[#0284C7] text-white">
                    PRO
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <Link to="/track">
            <Button
              variant="secondary"
              size="sm"
              icon={Search}
              className="hidden lg:inline-flex"
            >
              Track Job
            </Button>
          </Link>

          <Link to="/builder">
            <Button
              variant="primary"
              size="sm"
              iconRight={ArrowRight}
              className="glow-cyan-sm"
            >
              Configure Service
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#161D2E] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#1D2536] bg-[#090C12] px-4 pt-4 pb-6 space-y-3">
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#1D2536] text-xs text-[#94A3B8]">
            <span className="flex items-center gap-1.5 text-[#34D399]">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              Bays Active (2/2)
            </span>
            <span>Austin, TX</span>
          </div>

          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-[#94A3B8] hover:text-white hover:bg-[#161D2E] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <item.icon className="w-4 h-4 text-[#38BDF8]" />
                <span>{item.name}</span>
              </div>
              {item.highlight && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-[#0284C7] text-white">
                  PRO
                </span>
              )}
            </Link>
          ))}

          <div className="pt-3 border-t border-[#1D2536] space-y-2">
            <Link to="/builder" onClick={() => setMobileMenuOpen(false)} className="block">
              <Button variant="primary" size="md" className="w-full">
                Configure Detailing Package
              </Button>
            </Link>
            <Link to="/track" onClick={() => setMobileMenuOpen(false)} className="block">
              <Button variant="secondary" size="md" className="w-full">
                Track Existing Job
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
