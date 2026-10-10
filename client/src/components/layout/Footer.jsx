import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  ArrowUpRight,
  Award,
  Compass,
  CheckCircle2
} from 'lucide-react';
import { DetailDockLogo } from '../common/DetailDockLogo.jsx';
import { useStudio } from '../../context/StudioContext.jsx';

export const Footer = () => {
  const { settings } = useStudio();
  const addressStr = `${settings?.address?.street || '1440 Velocity Way, Suite 100'}, ${settings?.address?.city || 'Austin'}, ${settings?.address?.state || 'TX'} ${settings?.address?.zip || '78701'}`;
  const phone = settings?.contactPhone || '+1 (512) 842-9210';
  const cleanPhone = phone.replace(/[^\d+]/g, '');
  const email = settings?.contactEmail || 'concierge@detaildock.com';
  const hoursStr = `Mon – Sat: ${settings?.operatingHours?.openTime || '09:00 AM'} – ${settings?.operatingHours?.closeTime || '06:00 PM'} (Closed Sun)`;
  const studioName = settings?.studioName || 'DetailDock Concourse Atelier';

  return (
    <footer className="border-t border-white/10 bg-[#0B0E14] text-[#94A3B8] text-sm relative overflow-hidden">
      {/* Top Concourse Liquid Gold Hairline */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#F59E0B]/60 to-transparent" />

      {/* Grand Architectural Background Watermark */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden flex items-center justify-center opacity-30">
        <span className="text-[10vw] font-black tracking-tighter uppercase whitespace-nowrap text-white/[0.015]">
          DETAILDOCK ATELIER
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Info & Mission */}
          <div className="space-y-4">
            <DetailDockLogo size="md" />
            <p className="text-xs text-[#94A3B8] leading-relaxed pr-4">
              Concourse-grade automotive preservation studio. Master multi-stage rotary compounding, certified 9H ceramic glass shields, and sterile cleanroom execution guarded by authoritative server pricing.
            </p>
            <div className="flex items-center gap-2 pt-2 text-[11px] font-mono font-bold text-[#F59E0B]">
              <Compass className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>30.2672° N, 97.7431° W • Austin Cleanroom</span>
            </div>
          </div>

          {/* Preservation Packages */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#F8FAFC]">
              Preservation Packages
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/builder?package=essential-clean" className="hover:text-[#F59E0B] transition-colors flex items-center justify-between group">
                  <span className="text-[#CBD5E1]">Essential Clean & Decon</span>
                  <span className="text-[#64748B] group-hover:text-[#F59E0B] font-mono">$149+</span>
                </Link>
              </li>
              <li>
                <Link to="/builder?package=signature-detail" className="hover:text-[#F59E0B] transition-colors flex items-center justify-between group">
                  <span className="text-[#CBD5E1]">Signature Multi-Stage Detail</span>
                  <span className="text-[#64748B] group-hover:text-[#F59E0B] font-mono">$289+</span>
                </Link>
              </li>
              <li>
                <Link to="/builder?package=ceramic-shield" className="hover:text-[#F59E0B] transition-colors flex items-center justify-between group">
                  <span className="text-[#CBD5E1]">Ultimate 9H Ceramic Shield</span>
                  <span className="text-[#F59E0B] font-mono font-bold">$499+</span>
                </Link>
              </li>
              <li>
                <Link to="/builder" className="hover:text-[#F8FAFC] transition-colors flex items-center gap-1 text-[#F59E0B] pt-1 font-semibold">
                  <span>Open Configurator</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Client Workflows */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#F8FAFC]">
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
                <Link to="/garage" className="hover:text-[#F8FAFC] transition-colors flex items-center gap-1.5">
                  <span>Customer Atelier Garage</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30">
                    VIP
                  </span>
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
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#161D2A] text-[#94A3B8] border border-white/10">
                    STAFF
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Atelier Contact & Studio Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#F8FAFC]">
              Atelier Location & Concierge
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                <span>{addressStr}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F59E0B] flex-shrink-0" />
                <a href={`tel:${cleanPhone}`} className="hover:text-white transition-colors font-mono">
                  {phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#F59E0B] flex-shrink-0" />
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

        {/* Industry Accreditation Badge Strip */}
        <div className="mt-12 py-5 px-6 rounded-2xl bg-[#111622] border border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-[#CBD5E1] font-medium">
            <Award className="w-4 h-4 text-[#F59E0B]" />
            <span className="font-bold text-[#F8FAFC]">Atelier Accreditations:</span>
            <span>Rupes BigFoot Certified</span>
            <span className="text-white/20">•</span>
            <span>Modesta Japanese Glass Coating Partner</span>
            <span className="text-white/20">•</span>
            <span>IDA Certified Facility</span>
          </div>
          <div className="flex items-center gap-2 text-[#34D399] font-mono text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>ISO-6 Sterile Detailing Bays Verified</span>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <div className="flex flex-wrap items-center gap-2">
            <span>{studioName} © {new Date().getFullYear()}</span>
            <span>•</span>
            <span className="text-[#94A3B8]">Bespoke Automotive Preservation & Concourse Detailing</span>
          </div>

          <div className="flex items-center gap-5 text-[11px]">
            <span className="hover:text-[#CBD5E1] cursor-pointer transition-colors">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-[#CBD5E1] cursor-pointer transition-colors">Terms of Atelier Service</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-[#F59E0B]/80 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F59E0B]" />
              9H Warranty Backed
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
