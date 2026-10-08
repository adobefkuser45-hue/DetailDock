import React from 'react';
import { Sparkles, ShieldCheck, Calendar, Gauge, ArrowRight } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#090C12] text-[#F8FAFC]">
      {/* Top Navigation */}
      <header className="border-b border-[#1D2536] bg-[#101522]/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#0284C7]/10 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8]">
            <Sparkles className="w-5 h-5 text-[#38BDF8]" />
          </div>
          <div className="font-extrabold text-xl tracking-tight">
            Detail<span className="text-[#38BDF8]">Dock</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-[#94A3B8]">
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#builder" className="hover:text-white transition-colors">Package Builder</a>
          <a href="#track" className="hover:text-white transition-colors">Track Job</a>
          <a href="#admin" className="hover:text-white transition-colors">Admin</a>
        </nav>

        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 rounded-lg text-sm font-bold bg-[#0284C7] hover:bg-[#38BDF8] hover:text-[#090C12] transition-all shadow-lg shadow-[#0284C7]/20 flex items-center gap-2">
            <span>Book Appointment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Hero Announcement Banner */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/30 text-[#38BDF8] text-xs font-bold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          MERN Full-Stack Foundation Ready
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          Precision Auto Detailing & <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#0284C7]">
            Smart Service Booking
          </span>
        </h1>

        <p className="text-base md:text-lg text-[#94A3B8] max-w-2xl mb-10 leading-relaxed">
          Experience bespoke vehicle care, interactive dynamic package configuration, and seamless live bay booking built on the Google Antigravity MERN Master System v1.1.
        </p>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full text-left">
          <div className="p-5 rounded-xl bg-[#101522] border border-[#1D2536] hover:border-[#38BDF8]/50 transition-all">
            <Gauge className="w-6 h-6 text-[#38BDF8] mb-3" />
            <h3 className="font-bold text-base mb-1">Dynamic Pricing</h3>
            <p className="text-xs text-[#94A3B8]">Authoritative server calculations based on vehicle dimensions and add-ons.</p>
          </div>

          <div className="p-5 rounded-xl bg-[#101522] border border-[#1D2536] hover:border-[#38BDF8]/50 transition-all">
            <Calendar className="w-6 h-6 text-[#F59E0B] mb-3" />
            <h3 className="font-bold text-base mb-1">Bay Scheduling</h3>
            <p className="text-xs text-[#94A3B8]">Capacity-constrained time slots preventing double bookings across all bays.</p>
          </div>

          <div className="p-5 rounded-xl bg-[#101522] border border-[#1D2536] hover:border-[#38BDF8]/50 transition-all">
            <ShieldCheck className="w-6 h-6 text-[#10B981] mb-3" />
            <h3 className="font-bold text-base mb-1">100% Commercial</h3>
            <p className="text-xs text-[#94A3B8]">Zero copyleft risk with verified MIT, Apache-2.0, and ISC dependencies.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1D2536] py-6 text-center text-xs text-[#64748B]">
        DetailDock © {new Date().getFullYear()} — Smart Auto Detailing & Service Booking Platform
      </footer>
    </div>
  );
}

export default App;
