import React from 'react';
import { Shield, Lock, ArrowRight } from 'lucide-react';
import { Button } from '../components/common/Button.jsx';

export const AdminPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-[#A78BFA] text-xs font-bold uppercase tracking-wider mb-6">
        <Shield className="w-4 h-4" />
        Studio Operations
      </div>
      <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F8FAFC] tracking-tight mb-4">
        Admin & Bay Pipeline Portal
      </h1>
      <p className="text-base text-[#94A3B8] max-w-xl mx-auto mb-10">
        Manage active cleanroom bays, transition booking statuses across the 5-stage Kanban board, and inspect real-time studio financial metrics.
      </p>

      <div className="p-8 max-w-md mx-auto rounded-2xl bg-[#101522] border border-[#1D2536] text-left space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">Admin Login</span>
          <Lock className="w-4 h-4 text-[#38BDF8]" />
        </div>
        <p className="text-xs text-[#94A3B8] leading-relaxed">
          Demo Admin Credentials: <br />
          <span className="text-[#F8FAFC] font-mono">admin@detaildock.com</span> / <span className="text-[#F8FAFC] font-mono">DetailDockAdmin2026!</span>
        </p>
        <p className="text-xs text-[#64748B]">
          Admin Kanban Board & Operations UI will be fully implemented in TASK-019.
        </p>
      </div>
    </div>
  );
};
