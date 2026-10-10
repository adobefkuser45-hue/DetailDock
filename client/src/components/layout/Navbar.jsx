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
  PhoneCall,
  Car,
  Compass
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
    { name: 'Garage', path: '/garage', icon: Car },
    { name: 'Admin Portal', path: '/admin', icon: Shield }
  ];

  const isActive = (path) => {
    if (path.startsWith('/#')) return false;
    return location.pathname === path;
  };

  const bayCountText = settings?.maxBayCapacity === 1 
    ? 'Cleanroom Bay Active' 
    : `${settings?.maxBayCapacity || 2} Bays Active`;

  const locationText = `${settings?.address?.city || 'Austin'}, ${settings?.address?.state || 'TX'}`;
  const phoneText = settings?.contactPhone || '+1 (512) 842-9210';
  const cleanPhone = phoneText.replace(/[^\d+]/g, '');

  return (
    <header className="sticky top-0 z-50 w-full pt-2 sm:pt-3 pb-2 px-3 sm:px-6 max-w-7xl mx-auto transition-all">
      {/* Floating Dynamic Island "Atelier Dock" */}
      <div className="liquid-glass rounded-2xl px-4 sm:px-6 py-2.5 flex items-center justify-between border border-white/10 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.12)]">
        
        {/* Brand Logo & Micro Bay Badge */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center focus:outline-none">
            <DetailDockLogo size="md" />
          </Link>

          {/* Micro Status Chip (Desktop) */}
          <div className="hidden xl:flex items-center gap-2 pl-3 border-l border-[#262B3A] text-[11px] font-mono text-[#94A3B8]">
            <span className="flex items-center gap-1.5 text-[#34D399]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
              </span>
              {bayCountText}
            </span>
            <span className="text-[#3A4154]">•</span>
            <span>{locationText}</span>
          </div>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 bg-[#0B0E14]/80 p-1 rounded-xl border border-white/10 backdrop-blur-md">
          {navLinks.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-2 ${
                  active
                    ? 'text-[#F8FAFC] bg-[#F59E0B]/20 border border-[#F59E0B]/50 shadow-[0_0_15px_rgba(245,158,11,0.25)] text-shadow-sm'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#161D2A]'
                }`}
              >
                <item.icon className={`w-3.5 h-3.5 ${active ? 'text-[#F59E0B]' : 'text-[#64748B]'}`} />
                <span>{item.name}</span>
                {item.highlight && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-[#0B0E14] shadow-sm">
                    PRO
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons & Concierge Hotline */}
        <div className="hidden sm:flex items-center gap-2.5">
          <a
            href={`tel:${cleanPhone}`}
            className="hidden xl:inline-flex items-center gap-1.5 text-xs font-medium text-[#94A3B8] hover:text-[#F59E0B] transition-colors py-1.5 px-2.5 rounded-lg hover:bg-[#161D2A] whitespace-nowrap"
            title="Call Concierge"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span className="font-mono text-[11px]">{phoneText}</span>
          </a>

          <Link to="/track">
            <Button
              variant="outline"
              size="sm"
              icon={Search}
              className="text-xs py-1.5 border-white/10 hover:border-[#F59E0B]/50 whitespace-nowrap"
            >
              Track Job
            </Button>
          </Link>

          <Link to="/builder">
            <Button
              variant="primary"
              size="sm"
              iconRight={ArrowRight}
              className="glow-amber-sm text-xs py-1.5 font-bold"
            >
              Configure Service
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#161D2A] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Liquid Dropdown) */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 liquid-glass-elevated rounded-2xl p-5 space-y-4 border border-white/10 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs text-[#94A3B8]">
            <span className="flex items-center gap-1.5 text-[#34D399] font-mono">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              {bayCountText}
            </span>
            <span className="font-mono">{locationText}</span>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold text-[#CBD5E1] hover:text-white hover:bg-[#161D2A] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4 text-[#F59E0B]" />
                  <span>{item.name}</span>
                </div>
                {item.highlight && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-black uppercase bg-[#F59E0B] text-[#0B0E14]">
                    PRO
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 space-y-2">
            <Link to="/builder" onClick={() => setMobileMenuOpen(false)} className="block">
              <Button variant="primary" size="md" className="w-full">
                Configure Detailing Package
              </Button>
            </Link>
            <Link to="/track" onClick={() => setMobileMenuOpen(false)} className="block">
              <Button variant="outline" size="md" className="w-full">
                Track Existing Job
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
