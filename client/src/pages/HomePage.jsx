import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ShieldCheck, 
  Calendar, 
  Gauge, 
  ArrowRight, 
  Clock, 
  Award,
  ChevronRight,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../components/common/Button.jsx';
import { Badge } from '../components/common/Badge.jsx';

export const HomePage = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-28 border-b border-[#1D2536] bg-radial from-[#161D2E]/40 via-[#090C12] to-[#090C12]">
        {/* Ambient Glow Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#0284C7]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          {/* Status Chip */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101522] border border-[#2A364E] text-xs font-bold text-[#F8FAFC] shadow-sm mb-6">
            <Badge status="Confirmed" label="Dual Cleanroom Bays Active" size="sm" />
            <span className="text-[#64748B]">•</span>
            <span className="text-[#94A3B8]">Austin, TX Atelier</span>
          </div>

          {/* Punchy Luxury Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-5xl leading-[1.08] mb-6">
            Preserve Perfection. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F8FAFC] via-[#38BDF8] to-[#0284C7]">
              Engineered Detailing & Smart Booking.
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-[#94A3B8] max-w-3xl leading-relaxed mb-10">
            DetailDock blends bespoke multi-stage paint correction, pro-grade 9H ceramic coatings, and an intelligent double-bay reservation engine built on authoritative server calculations.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link to="/builder" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                iconRight={ArrowRight}
                className="w-full sm:w-auto glow-cyan"
              >
                Launch Smart Package Builder
              </Button>
            </Link>

            <Link to="/book" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="lg"
                icon={Calendar}
                className="w-full sm:w-auto"
              >
                Reserve Bay Slot
              </Button>
            </Link>
          </div>

          {/* Trust Metric Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 mt-16 pt-12 border-t border-[#1D2536]/80 w-full max-w-4xl text-left">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] font-mono">9H + IR</div>
              <div className="text-xs text-[#94A3B8] font-semibold mt-0.5">Infrared Cured Ceramic</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#38BDF8] font-mono">2 Bays</div>
              <div className="text-xs text-[#94A3B8] font-semibold mt-0.5">Capacity Guarded Slots</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#F59E0B] font-mono">100%</div>
              <div className="text-xs text-[#94A3B8] font-semibold mt-0.5">Authoritative Pricing</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#10B981] font-mono">DD-XXXX</div>
              <div className="text-xs text-[#94A3B8] font-semibold mt-0.5">Live Job Tracking</div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Pillars */}
      <section id="services" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#38BDF8] bg-[#38BDF8]/10 px-3 py-1 rounded-full border border-[#38BDF8]/20">
            Precision Preservation Packages
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-4 text-[#F8FAFC]">
            Formulated for Discerning Automotive Enthusiasts
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] mt-3">
            Every vehicle receives dedicated bay time under high-CRI inspection lamps. Choose a tiered package or customize dynamically in our Smart Builder.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Essential Clean */}
          <div className="p-8 rounded-2xl bg-[#101522] border border-[#1D2536] hover:border-[#38BDF8]/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] font-mono">Stage 01</span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#1F273B] text-[#94A3B8]">90 Mins</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Essential Clean & Decon</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed mb-6">
                pH-neutral foam wash, dual-bucket contact wash, iron fallout decontamination, and synthetic spray sealant.
              </p>
              <div className="text-2xl font-extrabold font-mono text-[#F8FAFC] mb-6">
                $149 <span className="text-xs font-normal text-[#94A3B8]">/ base sedan</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#94A3B8] mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#38BDF8] flex-shrink-0" />
                  <span>Chemical Iron & Tar Decon</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#38BDF8] flex-shrink-0" />
                  <span>Deep Wheel Barrel & Arch Purge</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#38BDF8] flex-shrink-0" />
                  <span>3-Month Hydrophobic Sealant</span>
                </li>
              </ul>
            </div>
            <Link to="/builder">
              <Button variant="secondary" size="md" className="w-full">
                Configure Package
              </Button>
            </Link>
          </div>

          {/* Card 2: Signature Multi-Stage Detail (Popular) */}
          <div className="relative p-8 rounded-2xl bg-[#161D2E] border-2 border-[#38BDF8] shadow-xl shadow-[#0284C7]/15 flex flex-col justify-between">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#0284C7] text-white text-[10px] font-extrabold uppercase tracking-widest shadow-md">
              Most Popular
            </div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#38BDF8] font-mono">Stage 02</span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#0284C7]/20 text-[#38BDF8]">180 Mins</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Signature Multi-Stage Detail</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed mb-6">
                Single-stage machine gloss polish removing 60-70% swirl marks, combined with deep cabin interior steam extraction.
              </p>
              <div className="text-2xl font-extrabold font-mono text-[#38BDF8] mb-6">
                $289 <span className="text-xs font-normal text-[#94A3B8]">/ base sedan</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#94A3B8] mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#38BDF8] flex-shrink-0" />
                  <span>Single-Stage Machine Clarity Polish</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#38BDF8] flex-shrink-0" />
                  <span>Full Interior Steam Extraction</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#38BDF8] flex-shrink-0" />
                  <span>12-Month SiO2 Hybrid Ceramic Seal</span>
                </li>
              </ul>
            </div>
            <Link to="/builder">
              <Button variant="primary" size="md" className="w-full glow-cyan-sm">
                Configure Package
              </Button>
            </Link>
          </div>

          {/* Card 3: Ultimate 9H Ceramic Shield */}
          <div className="p-8 rounded-2xl bg-[#101522] border border-[#1D2536] hover:border-[#F59E0B]/50 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F59E0B] font-mono">Pinnacle</span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#F59E0B]/20 text-[#F59E0B]">270 Mins</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Ultimate 9H Ceramic Shield</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed mb-6">
                Two-stage compounding cutting 90%+ defects, sealed under certified 9H ceramic coating with 3-year warranty certificate.
              </p>
              <div className="text-2xl font-extrabold font-mono text-[#F59E0B] mb-6">
                $499 <span className="text-xs font-normal text-[#94A3B8]">/ base sedan</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#94A3B8] mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F59E0B] flex-shrink-0" />
                  <span>2-Stage Heavy Compound & Mirror Polish</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F59E0B] flex-shrink-0" />
                  <span>Pro-Grade 9H Nano-Ceramic Coating</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F59E0B] flex-shrink-0" />
                  <span>3-Year Warranty & Certificate</span>
                </li>
              </ul>
            </div>
            <Link to="/builder">
              <Button variant="gold" size="md" className="w-full">
                Configure Package
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Smart Builder Teaser Banner */}
      <section className="py-16 border-t border-[#1D2536] bg-[#101522]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#38BDF8] flex items-center gap-2 mb-2">
              <Gauge className="w-4 h-4" />
              Signature Configurator
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC]">
              Try the Interactive Smart Package Builder
            </h3>
            <p className="text-sm text-[#94A3B8] max-w-xl mt-2">
              Select your exact body style (Coupe, Sedan, Compact SUV, Full SUV/Truck) to see authoritative dynamic multipliers, duration estimates, and add-on pricing instantly calculated.
            </p>
          </div>
          <Link to="/builder" className="flex-shrink-0">
            <Button variant="primary" size="lg" iconRight={ArrowRight} className="glow-cyan">
              Open Package Builder
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
