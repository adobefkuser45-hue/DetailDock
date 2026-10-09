import React, { useState } from 'react';
import { Lock, Mail, Shield, ArrowRight, AlertCircle, Sparkles, Key } from 'lucide-react';
import { Button } from '../common/Button.jsx';
import { login } from '../../services/api.js';

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
      const res = await login({ email: email.trim(), password });
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
      <div className="p-8 rounded-3xl bg-[#101522] border-2 border-[#1D2536] shadow-2xl space-y-6 relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#0284C7]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="text-center pb-2">
          <div className="w-12 h-12 rounded-2xl bg-[#0284C7]/20 border border-[#38BDF8]/40 flex items-center justify-center text-[#38BDF8] mx-auto mb-3 shadow-lg shadow-[#0284C7]/20">
            <Lock className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#38BDF8] bg-[#0284C7]/10 px-3 py-1 rounded-full border border-[#0284C7]/20">
            Restricted Atelier Access
          </span>
          <h2 className="text-2xl font-extrabold text-white tracking-tight mt-3">
            Studio Operations Login
          </h2>
          <p className="text-xs text-[#94A3B8] mt-1">
            Authenticate to manage cleanroom bays, pipeline status transitions, and real-time revenue analytics.
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
            <label className="text-xs font-semibold text-[#94A3B8] block mb-1">
              Admin Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@detaildock.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#090C12] border border-[#1D2536] focus:border-[#38BDF8] text-xs text-white placeholder-[#64748B] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#94A3B8] block mb-1">
              Master Security Key / Password
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#090C12] border border-[#1D2536] focus:border-[#38BDF8] text-xs text-white placeholder-[#64748B] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={loading}
            iconRight={ArrowRight}
            className="w-full glow-cyan mt-2"
          >
            Authenticate & Open Pipeline
          </Button>
        </form>

        {/* Demo Quick-Fill Pill Button */}
        <div className="pt-4 border-t border-[#1D2536] text-center">
          <button
            type="button"
            onClick={handleQuickFill}
            className="w-full px-4 py-2.5 rounded-xl bg-[#161D2E] border border-[#2A364E] hover:border-[#38BDF8]/60 text-xs text-[#94A3B8] hover:text-white transition-all flex items-center justify-center gap-2 group"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#38BDF8] group-hover:scale-110 transition-transform" />
            <span>Fill Demo Admin Credentials (1-Click)</span>
          </button>
          <div className="text-[10px] text-[#64748B] mt-2 font-mono">
            admin@detaildock.com • DetailDockAdmin2026!
          </div>
        </div>

      </div>
    </div>
  );
};
