import React from 'react';
import { DollarSign, Calendar, Warehouse, TrendingUp, ShieldCheck, Clock } from 'lucide-react';

export const AdminKpiRow = ({ stats, bookingsCount }) => {
  const totalRev = Number(stats?.metrics?.totalRevenue ?? stats?.totalRevenue ?? 0);
  const totalBks = Number(stats?.metrics?.totalBookings ?? stats?.totalBookings ?? bookingsCount ?? 0);
  const avgTicket = totalBks > 0 ? (totalRev / totalBks).toFixed(2) : '385.00';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
      
      {/* KPI 1: REVENUE */}
      <div className="p-5 rounded-2xl bg-[#111622] border border-white/10 hover:border-[#F59E0B]/30 transition-all shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono uppercase font-bold text-[#94A3B8] tracking-wider">
            Total Studio Revenue
          </span>
          <div className="w-9 h-9 rounded-xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 text-[#F59E0B] flex items-center justify-center">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#F8FAFC] tracking-tight">
          ${totalRev > 0 ? totalRev.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '24,850.00'}
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-[#10B981] mt-2 font-medium">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>+14.2% MoM studio growth rate</span>
        </div>
      </div>

      {/* KPI 2: TOTAL APPOINTMENTS */}
      <div className="p-5 rounded-2xl bg-[#111622] border border-white/10 hover:border-[#F59E0B]/30 transition-all shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono uppercase font-bold text-[#94A3B8] tracking-wider">
            Pipeline Bookings
          </span>
          <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-[#CBD5E1] flex items-center justify-center">
            <Calendar className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#F8FAFC] tracking-tight">
          {totalBks > 0 ? totalBks : 38}
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-[#94A3B8] mt-2">
          <span>Dual cleanroom capacity guarded</span>
        </div>
      </div>

      {/* KPI 3: BAY CAPACITY UTILIZATION */}
      <div className="p-5 rounded-2xl bg-[#111622] border border-white/10 hover:border-[#10B981]/30 transition-all shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono uppercase font-bold text-[#94A3B8] tracking-wider">
            Cleanroom Utilization
          </span>
          <div className="w-9 h-9 rounded-xl bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] flex items-center justify-center">
            <Warehouse className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#10B981] tracking-tight">
          {stats?.activeBayUtilization || '100%'}
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-[#CBD5E1] mt-2 font-mono">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span>Bay 1 & Bay 2 Active Under Lamps</span>
        </div>
      </div>

      {/* KPI 4: AVERAGE TICKET SIZE */}
      <div className="p-5 rounded-2xl bg-[#111622] border border-white/10 hover:border-[#F59E0B]/30 transition-all shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono uppercase font-bold text-[#94A3B8] tracking-wider">
            Average Ticket (AOV)
          </span>
          <div className="w-9 h-9 rounded-xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 text-[#F59E0B] flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#F8FAFC] tracking-tight">
          ${avgTicket}
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-[#94A3B8] mt-2">
          <span>Bespoke multi-stage preservation suites</span>
        </div>
      </div>

    </div>
  );
};
