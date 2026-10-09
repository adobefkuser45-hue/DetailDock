import React from 'react';
import { 
  CreditCard, 
  Warehouse, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  Sparkles,
  DollarSign
} from 'lucide-react';

export const PaymentSelector = ({
  totalPrice = 0,
  paymentConfig = { method: 'studio_pay', option: 'full' },
  onChange
}) => {
  const formattedTotal = `$${Number(totalPrice || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const depositAmount = 50.00;
  const balanceRemaining = Math.max(0, totalPrice - depositAmount);
  const formattedBalance = `$${balanceRemaining.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const isStripe = paymentConfig.method === 'stripe';
  const isStudioPay = paymentConfig.method === 'studio_pay';

  return (
    <div className="p-6 rounded-2xl bg-[#101522] border border-[#1D2536] space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-[#1D2536]">
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-[#38BDF8]" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            Payment & Settlement Preference
          </h3>
        </div>
        <span className="text-[11px] font-mono font-semibold text-[#10B981] flex items-center gap-1 bg-[#10B981]/10 px-2.5 py-0.5 rounded-full border border-[#10B981]/20">
          <Lock className="w-3 h-3" />
          PCI-DSS Level 1 Secure
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* OPTION 1: Pay at Studio / On Arrival */}
        <div
          onClick={() => onChange({ method: 'studio_pay', option: 'full' })}
          className={`p-4 rounded-xl border cursor-pointer transition-all relative ${
            isStudioPay
              ? 'bg-[#090C12] border-[#38BDF8] ring-1 ring-[#38BDF8] shadow-lg shadow-[#0284C7]/15'
              : 'bg-[#0B0F19] border-[#1D2536] hover:border-[#2A364E]'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className={`p-2 rounded-lg ${isStudioPay ? 'bg-[#38BDF8]/15 text-[#38BDF8]' : 'bg-[#161D2E] text-[#64748B]'}`}>
                <Warehouse className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-1.5">
                  Pay at Studio Arrival
                  <span className="text-[10px] font-mono uppercase bg-[#38BDF8]/15 text-[#38BDF8] px-1.5 py-0.2 rounded font-semibold">
                    Flexible
                  </span>
                </div>
                <div className="text-xs text-[#94A3B8] mt-0.5">
                  No upfront charge. Settle at vehicle drop-off.
                </div>
              </div>
            </div>
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center mt-1 ${
              isStudioPay ? 'border-[#38BDF8] bg-[#38BDF8]' : 'border-[#475569]'
            }`}>
              {isStudioPay && <div className="w-1.5 h-1.5 bg-[#090C12] rounded-full" />}
            </div>
          </div>

          <div className="mt-3.5 pt-3 border-t border-[#1D2536]/80 flex items-center justify-between text-xs">
            <span className="text-[#64748B]">Due at check-in:</span>
            <span className="font-extrabold text-[#F8FAFC] font-mono">{formattedTotal}</span>
          </div>
        </div>

        {/* OPTION 2: Online Card via Stripe */}
        <div
          onClick={() => onChange({ method: 'stripe', option: paymentConfig.option || 'full' })}
          className={`p-4 rounded-xl border cursor-pointer transition-all relative ${
            isStripe
              ? 'bg-[#090C12] border-[#38BDF8] ring-1 ring-[#38BDF8] shadow-lg shadow-[#0284C7]/15'
              : 'bg-[#0B0F19] border-[#1D2536] hover:border-[#2A364E]'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className={`p-2 rounded-lg ${isStripe ? 'bg-[#38BDF8]/15 text-[#38BDF8]' : 'bg-[#161D2E] text-[#64748B]'}`}>
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-1.5">
                  Online Card Payment
                  <span className="text-[10px] font-mono uppercase bg-[#10B981]/15 text-[#10B981] px-1.5 py-0.2 rounded font-semibold">
                    Stripe
                  </span>
                </div>
                <div className="text-xs text-[#94A3B8] mt-0.5">
                  Instant confirmation & digital tax receipt.
                </div>
              </div>
            </div>
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center mt-1 ${
              isStripe ? 'border-[#38BDF8] bg-[#38BDF8]' : 'border-[#475569]'
            }`}>
              {isStripe && <div className="w-1.5 h-1.5 bg-[#090C12] rounded-full" />}
            </div>
          </div>

          <div className="mt-3.5 pt-3 border-t border-[#1D2536]/80 flex items-center justify-between text-xs">
            <span className="text-[#64748B]">Immediate settlement:</span>
            <span className="font-extrabold text-[#38BDF8] font-mono">
              {paymentConfig.option === 'deposit' ? '$50.00' : formattedTotal}
            </span>
          </div>
        </div>
      </div>

      {/* If Stripe is selected, show Full vs Deposit toggle */}
      {isStripe && (
        <div className="p-4 rounded-xl bg-[#090C12] border border-[#2A364E] space-y-3 animate-fadeIn">
          <div className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
            Choose Payment Structure:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onChange({ method: 'stripe', option: 'full' })}
              className={`p-3 rounded-lg text-left border transition-all ${
                paymentConfig.option === 'full'
                  ? 'bg-[#101522] border-[#38BDF8] text-white'
                  : 'bg-[#0B0F19] border-[#1D2536] text-[#94A3B8] hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold">
                <span>Pay in Full</span>
                <span className="text-[#38BDF8] font-mono">{formattedTotal}</span>
              </div>
              <div className="text-[11px] text-[#64748B] mt-1">
                Zero balance due on arrival. Priority vehicle pickup.
              </div>
            </button>

            <button
              type="button"
              onClick={() => onChange({ method: 'stripe', option: 'deposit' })}
              className={`p-3 rounded-lg text-left border transition-all ${
                paymentConfig.option === 'deposit'
                  ? 'bg-[#101522] border-[#38BDF8] text-white'
                  : 'bg-[#0B0F19] border-[#1D2536] text-[#94A3B8] hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold">
                <span>Reservation Deposit</span>
                <span className="text-[#F59E0B] font-mono">$50.00</span>
              </div>
              <div className="text-[11px] text-[#64748B] mt-1">
                Secures bay slot now. Remaining {formattedBalance} due at delivery.
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Security note */}
      <div className="flex items-center gap-2 text-[11px] text-[#64748B] pt-1">
        <ShieldCheck className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" />
        <span>
          Bank-grade 256-bit SSL encryption. Card numbers are processed directly via Stripe and never touch DetailDock servers.
        </span>
      </div>
    </div>
  );
};
