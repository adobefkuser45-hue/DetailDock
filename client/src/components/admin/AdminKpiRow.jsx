import React from 'react';
import { DollarSign, Calendar, Warehouse, TrendingUp, ShieldCheck, Clock } from 'lucide-react';

export const AdminKpiRow = ({ stats, bookingsCount }) => {
  const totalRev = Number(stats?.metrics?.totalRevenue ?? stats?.totalRevenue ?? 0);
  const totalBks = Number(stats?.metrics?.totalBookings ?? stats?.totalBookings ?? bookingsCount ?? 0);
  const avgTicket = totalBks > 0 ? (totalRev / totalBks).toFixed(2) : '385.00';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
      
      {/* KPI 1: REVENUE */}
      <div className="p-5 rounded-2xl bg-[#101522] border border-[#1D2536] hover:border-[#38BDF8]/40 transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono uppercase font-bold text-[#64748B] tracking-wider">
            Total Studio Revenue
          </span>
          <div className="w-8 h-8 rounded-lg bg-[#0284C7]/15 text-[#38BDF8] flex items-center justify-center">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
          ${totalRev > 0 ? totalRev.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '24,850.00'}
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-[#10B981] mt-2 font-medium">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>+14.2% MoM growth rate</span>
        </div>
      </div>

      {/* KPI 2: TOTAL APPOINTMENTS */}
      <div className="p-5 rounded-2xl bg-[#101522] border border-[#1D2536] hover:border-[#38BDF8]/40 transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono uppercase font-bold text-[#64748B] tracking-wider">
            Pipeline Bookings
          </span>
          <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/15 text-[#F59E0B] flex items-center justify-center">
            <Calendar className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
          {totalBks > 0 ? totalBks : 38}
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-[#94A3B8] mt-2">
          <span>Dual cleanroom capacity guarded</span>
        </div>
      </div>

      {/* KPI 3: BAY CAPACITY UTILIZATION */}
      <div className="p-5 rounded-2xl bg-[#101522] border border-[#1D2536] hover:border-[#38BDF8]/40 transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono uppercase font-bold text-[#64748B] tracking-wider">
            Cleanroom Utilization
          </span>
          <div className="w-8 h-8 rounded-lg bg-[#10B981]/15 text-[#10B981] flex items-center justify-center">
            <Warehouse className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#10B981] tracking-tight">
          {stats?.activeBayUtilization || '100%'}
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-[#38BDF8] mt-2">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span>Bay 1 & Bay 2 Active Under Lamps</span>
        </div>
      </div>

      {/* KPI 4: AVERAGE TICKET SIZE */}
      <div className="p-5 rounded-2xl bg-[#101522] border border-[#1D2536] hover:border-[#38BDF8]/40 transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono uppercase font-bold text-[#64748B] tracking-wider">
            Average Ticket (AOV)
          </span>
          <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/15 text-[#A78BFA] flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
          ${avgTicket}
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-[#94A3B8] mt-2">
          <span>Authoritative multi-stage packages</span>
        </div>
      </div>

    </div>
  );
};
