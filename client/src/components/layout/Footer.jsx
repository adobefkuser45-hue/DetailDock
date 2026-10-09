import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { DetailDockLogo } from '../common/DetailDockLogo.jsx';
import { useStudio } from '../../context/StudioContext.jsx';

export const Footer = () => {
  const { settings } = useStudio();
  const addressStr = `${settings?.address?.street || '1440 Velocity Way, Suite 100'}, ${settings?.address?.city || 'Austin'}, ${settings?.address?.state || 'TX'} ${settings?.address?.zip || '78701'}`;
  const phone = settings?.contactPhone || '+1 (555) 348-2450';
  const cleanPhone = phone.replace(/[^\d+]/g, '');
  const email = settings?.contactEmail || 'concierge@detaildock.com';
  const hoursStr = `Mon – Sat: ${settings?.operatingHours?.openTime || '09:00 AM'} – ${settings?.operatingHours?.closeTime || '06:00 PM'} (Closed Sun)`;
  const studioName = settings?.studioName || 'DetailDock Atelier';
  return (
    <footer className="border-t border-[#1D2536] bg-[#090C12] text-[#94A3B8] text-sm">
      {/* Top Banner Accent Line */}
      <div className="h-1 bg-gradient-to-r from-[#0284C7] via-[#38BDF8] to-[#F59E0B]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <DetailDockLogo size="md" />
            <p className="text-xs text-[#94A3B8] leading-relaxed pr-4">
              Precision automotive preservation atelier. Combining master multi-stage paint correction, pro-grade 9H ceramic coatings, and an intelligent double-bay service booking system.
            </p>
            <div className="flex items-center gap-2 pt-2 text-[11px] font-semibold text-[#34D399]">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span>Climate-Controlled Cleanroom Bays</span>
            </div>
          </div>

          {/* Service Packages */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F8FAFC]">
              Preservation Packages
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/builder" className="hover:text-[#38BDF8] transition-colors flex items-center justify-between group">
                  <span>Essential Clean & Decon</span>
                  <span className="text-[#64748B] group-hover:text-[#38BDF8] font-mono">$149+</span>
                </Link>
              </li>
              <li>
                <Link to="/builder" className="hover:text-[#38BDF8] transition-colors flex items-center justify-between group">
                  <span>Signature Multi-Stage Detail</span>
                  <span className="text-[#64748B] group-hover:text-[#38BDF8] font-mono">$289+</span>
                </Link>
              </li>
              <li>
                <Link to="/builder" className="hover:text-[#38BDF8] transition-colors flex items-center justify-between group">
                  <span>Ultimate 9H Ceramic Shield</span>
                  <span className="text-[#F59E0B] font-mono font-bold">$499+</span>
                </Link>
              </li>
              <li>
                <Link to="/builder" className="hover:text-[#38BDF8] transition-colors flex items-center gap-1 text-[#38BDF8] pt-1">
                  <span>Custom Configurator</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F8FAFC]">
              Client Workflows
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/builder" className="hover:text-[#F8FAFC] transition-colors">
                  Smart Package Builder
                </Link>
              </li>
              <li>
                <Link to="/book" className="hover:text-[#F8FAFC] transition-colors">
                  Reserve Detailing Bay
                </Link>
              </li>
              <li>
                <Link to="/track" className="hover:text-[#F8FAFC] transition-colors">
                  Live Job Tracker (DD-XXXXXX)
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-[#F8FAFC] transition-colors flex items-center gap-1.5">
                  <span>Studio Operations Admin</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#161D2E] text-[#94A3B8] border border-[#2A364E]">
                    STAFF
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Atelier Contact & Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F8FAFC]">
              Atelier Location & Concierge
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#38BDF8] flex-shrink-0 mt-0.5" />
                <span>{addressStr}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#38BDF8] flex-shrink-0" />
                <a href={`tel:${cleanPhone}`} className="hover:text-white transition-colors">
                  {phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#38BDF8] flex-shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                  {email}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-[#64748B]">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span>{hoursStr}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="mt-12 pt-8 border-t border-[#1D2536] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <div className="flex items-center gap-2">
            <span>{studioName} © {new Date().getFullYear()}</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-[#94A3B8]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
              100% Permissive Commercial License (MIT)
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[11px]">Server Verified: MongoDB Atlas + Express + React 19</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
