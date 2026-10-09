import React from 'react';
import { 
  CreditCard, 
  Warehouse, 
  Lock
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
    <div className="p-6 sm:p-7 rounded-2xl bg-[#111622] border border-white/10 space-y-5 shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-[#F59E0B]" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono">
            Payment & Settlement Preference
          </h3>
        </div>
        <span className="text-[11px] font-mono font-semibold text-[#10B981] flex items-center gap-1 bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/20">
          <Lock className="w-3 h-3" />
          PCI-DSS Level 1 Secure
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* OPTION 1: Pay at Studio / On Arrival */}
        <div
          onClick={() => onChange({ method: 'studio_pay', option: 'full' })}
          className={`p-5 rounded-2xl border cursor-pointer transition-all relative tactile-press ${
            isStudioPay
              ? 'bg-[#161D2A] border-[#F59E0B] ring-1 ring-[#F59E0B] shadow-[0_0_20px_rgba(245,158,11,0.15)]'
              : 'bg-[#0B0E14] border-white/10 hover:border-white/25 hover:bg-[#161D2A]'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${isStudioPay ? 'bg-[#F59E0B]/15 text-[#F59E0B]' : 'bg-white/5 text-[#94A3B8]'}`}>
                <Warehouse className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-2 font-display">
                  Pay at Studio Arrival
                  <span className="text-[10px] font-mono uppercase bg-[#F59E0B]/15 text-[#F59E0B] px-2 py-0.5 rounded font-bold">
                    Flexible
                  </span>
                </div>
                <div className="text-xs text-[#94A3B8] mt-0.5 font-normal">
                  No upfront charge. Settle at vehicle drop-off.
                </div>
              </div>
            </div>
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center mt-1 ${
              isStudioPay ? 'border-[#F59E0B] bg-[#F59E0B]' : 'border-slate-600'
            }`}>
              {isStudioPay && <div className="w-1.5 h-1.5 bg-[#0B0E14] rounded-full" />}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-[#94A3B8]">Due at check-in:</span>
            <span className="font-black text-[#F59E0B] font-mono">{formattedTotal}</span>
          </div>
        </div>

        {/* OPTION 2: Online Card via Stripe */}
        <div
          onClick={() => onChange({ method: 'stripe', option: paymentConfig.option || 'deposit' })}
          className={`p-5 rounded-2xl border cursor-pointer transition-all relative tactile-press ${
            isStripe
              ? 'bg-[#161D2A] border-[#F59E0B] ring-1 ring-[#F59E0B] shadow-[0_0_20px_rgba(245,158,11,0.15)]'
              : 'bg-[#0B0E14] border-white/10 hover:border-white/25 hover:bg-[#161D2A]'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${isStripe ? 'bg-[#F59E0B]/15 text-[#F59E0B]' : 'bg-white/5 text-[#94A3B8]'}`}>
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-2 font-display">
                  Online Card Settlement
                  <span className="text-[10px] font-mono uppercase bg-[#10B981]/15 text-[#10B981] px-2 py-0.5 rounded font-bold">
                    Instant Lock
                  </span>
                </div>
                <div className="text-xs text-[#94A3B8] mt-0.5 font-normal">
                  Direct encrypted card checkout via Stripe.
                </div>
              </div>
            </div>
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center mt-1 ${
              isStripe ? 'border-[#F59E0B] bg-[#F59E0B]' : 'border-slate-600'
            }`}>
              {isStripe && <div className="w-1.5 h-1.5 bg-[#0B0E14] rounded-full" />}
            </div>
          </div>

          {/* Sub options if Stripe selected */}
          {isStripe && (
            <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange({ method: 'stripe', option: 'deposit' });
                }}
                className={`py-1.5 px-2.5 rounded-lg border text-center transition-all ${
                  paymentConfig.option === 'deposit'
                    ? 'bg-[#F59E0B]/20 border-[#F59E0B] text-white font-bold'
                    : 'bg-[#0B0E14] border-white/5 text-[#94A3B8]'
                }`}
              >
                <div className="font-mono text-white">$50.00 Deposit</div>
                <div className="text-[10px] text-[#94A3B8]">Remaining: {formattedBalance}</div>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange({ method: 'stripe', option: 'full' });
                }}
                className={`py-1.5 px-2.5 rounded-lg border text-center transition-all ${
                  paymentConfig.option === 'full'
                    ? 'bg-[#F59E0B]/20 border-[#F59E0B] text-white font-bold'
                    : 'bg-[#0B0E14] border-white/5 text-[#94A3B8]'
                }`}
              >
                <div className="font-mono text-white">Full Settlement</div>
                <div className="text-[10px] text-[#F59E0B]">{formattedTotal} now</div>
              </button>
            </div>
          )}

          {!isStripe && (
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-[#94A3B8]">Deposit or full:</span>
              <span className="font-mono text-white">Starting from $50.00</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
