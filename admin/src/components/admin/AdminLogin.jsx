import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, AlertCircle, Sparkles, Key } from 'lucide-react';
import { Button } from '../common/Button.jsx';
import { loginAdmin } from '../../services/api.js';

export const AdminLogin = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleQuickFill = () => {
    setEmail('admin@detaildock.com');
    setPassword('DetailDockAdmin2026!');
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await loginAdmin({ email: email.trim(), password });
      const authToken = res?.token || res?.data?.token;
      const user = res?.data?.user || res?.user;
      if (authToken) {
        onLoginSuccess(authToken, user);
      } else {
        throw new Error('Authentication succeeded but token was missing.');
      }
    } catch (err) {
      setError(err.message || 'Invalid administrator credentials. Please check password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 text-left">
      <div className="p-8 rounded-3xl bg-[#0B0E14] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] space-y-6 relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#F59E0B]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="text-center pb-2">
          <div className="w-12 h-12 rounded-2xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B] mx-auto mb-3 shadow-lg shadow-[#F59E0B]/10">
            <Lock className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#F59E0B] bg-[#F59E0B]/10 px-3 py-1 rounded-full border border-[#F59E0B]/20">
            Sovereign Studio Operations Deck
          </span>
          <h2 className="text-2xl font-extrabold text-[#F8FAFC] tracking-tight mt-3 font-display">
            Studio Operations Login
          </h2>
          <p className="text-xs text-[#94A3B8] mt-1.5 leading-relaxed">
            Direct access to Dual-Bay Cleanroom dispatching, DVI paint depth telemetry, and Dynamic Website Studio CMS.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-[#EF4444]/15 border border-[#EF4444]/40 flex items-center gap-2.5 text-xs text-[#FCA5A5]">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-[#EF4444]" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#94A3B8] block mb-1.5">
              Admin Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@detaildock.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#111622] border border-white/10 focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B]/50 text-xs text-[#F8FAFC] placeholder-[#64748B] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#94A3B8] block mb-1.5">
              Master Security Key / Password
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#111622] border border-white/10 focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B]/50 text-xs text-[#F8FAFC] placeholder-[#64748B] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={loading}
            iconRight={ArrowRight}
            className="w-full glow-amber mt-2"
          >
            Authenticate & Open Pipeline
          </Button>
        </form>

        {/* Demo Quick-Fill Pill Button */}
        <div className="pt-4 border-t border-white/10 text-center">
          <button
            type="button"
            onClick={handleQuickFill}
            className="w-full px-4 py-2.5 rounded-xl bg-[#111622] border border-white/10 hover:border-[#F59E0B]/40 text-xs text-[#CBD5E1] hover:text-white transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B] group-hover:scale-110 transition-transform" />
            <span>Fill Demo Admin Credentials</span>
          </button>
          <div className="text-[10px] text-[#64748B] mt-2 font-mono">
            admin@detaildock.com • DetailDockAdmin2026!
          </div>
        </div>

      </div>
    </div>
  );
};
