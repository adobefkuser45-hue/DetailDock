import React, { useState } from 'react';
import { 
  MessageSquare, 
  Smartphone, 
  Mail, 
  CheckCircle2, 
  BellRing, 
  ExternalLink,
  X,
  Sparkles
} from 'lucide-react';
import { Button } from '../common/Button.jsx';

export const CommunicationsLogSection = ({ communications = [], customerPhone = '', bookingCode = '' }) => {
  const [showSimulator, setShowSimulator] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);

  const defaultNotices = communications.length > 0 ? communications : [
    {
      channel: 'sms',
      recipient: customerPhone || '+1 (555) 348-2450',
      message: `DetailDock Studio: Reservation ${bookingCode || 'DD-XXXXXX'} confirmed. Cleanroom Bay 1 reserved.`,
      dispatchedAt: new Date(),
      status: 'dispatched'
    },
    {
      channel: 'email',
      recipient: 'Client Inbox',
      message: `Official Vector PDF preservation invoice & concierge receipt dispatched for ${bookingCode || 'DD-XXXXXX'}.`,
      dispatchedAt: new Date(Date.now() - 3600000),
      status: 'dispatched'
    }
  ];

  const handleOpenSimulator = (item) => {
    setSelectedNotice(item);
    setShowSimulator(true);
  };

  return (
    <div className="rounded-2xl bg-[#101522] border border-[#1D2536] p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#1D2536] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0284C7]/20 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8]">
            <BellRing className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Automated Client Telemetry & Notifications
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#34D399]/20 text-[#34D399] border border-[#34D399]/30 font-mono font-semibold">
                LIVE DISPATCH
              </span>
            </h3>
            <p className="text-xs text-[#94A3B8]">
              Automated SMS and email receipts dispatched directly to client device.
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          icon={Smartphone}
          onClick={() => handleOpenSimulator(defaultNotices[0])}
          className="text-xs border-[#38BDF8]/40 text-[#38BDF8] hover:bg-[#38BDF8]/10"
        >
          Simulate Phone Notification
        </Button>
      </div>

      {/* Dispatch Timeline Feed */}
      <div className="space-y-3 pt-2">
        {defaultNotices.map((comm, idx) => {
          const isSms = comm.channel === 'sms';
          const isWhatsApp = comm.channel === 'whatsapp';
          const isEmail = comm.channel === 'email';

          const channelBadge = isWhatsApp
            ? { label: 'WhatsApp', color: 'bg-[#25D366]/20 text-[#25D366] border-[#25D366]/30' }
            : isSms
            ? { label: 'SMS Carrier', color: 'bg-[#38BDF8]/20 text-[#38BDF8] border-[#38BDF8]/30' }
            : { label: 'Secure Email', color: 'bg-[#8B5CF6]/20 text-[#A78BFA] border-[#8B5CF6]/30' };

          const timeFormatted = new Date(comm.dispatchedAt || Date.now()).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          });

          return (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-[#090C12] border border-[#1D2536] hover:border-[#2A364E] transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-start gap-3 flex-1">
                <div className="mt-0.5">
                  {isEmail ? (
                    <Mail className="w-4 h-4 text-[#A78BFA]" />
                  ) : isWhatsApp ? (
                    <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  ) : (
                    <Smartphone className="w-4 h-4 text-[#38BDF8]" />
                  )}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-bold ${channelBadge.color}`}>
                      {channelBadge.label}
                    </span>
                    <span className="text-[#64748B]">To: {comm.recipient}</span>
                    <span className="text-[#2A364E]">•</span>
                    <span className="text-[#64748B] font-mono">{timeFormatted}</span>
                  </div>
                  <p className="text-[#E2E8F0] leading-relaxed">
                    {comm.message}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleOpenSimulator(comm)}
                className="text-[11px] text-[#38BDF8] hover:underline flex items-center gap-1 flex-shrink-0"
              >
                <span>Preview Alert</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Interactive Smartphone Notification Simulator Modal */}
      {showSimulator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="max-w-sm w-full bg-[#0D1117] border-2 border-[#1D2536] rounded-3xl p-6 shadow-2xl relative space-y-4">
            {/* Close Button */}
            <button
              onClick={() => setShowSimulator(false)}
              className="absolute top-4 right-4 p-2 text-[#64748B] hover:text-white rounded-lg hover:bg-[#161D2E]"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Smartphone Header Notch */}
            <div className="w-24 h-4 bg-[#161D2E] rounded-full mx-auto" />

            <div className="text-center pt-1">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#38BDF8] bg-[#0284C7]/20 px-2.5 py-1 rounded-full border border-[#0284C7]/30">
                Customer Phone Lockscreen
              </span>
              <h4 className="text-base font-extrabold text-white mt-2">
                Live Notification Alert
              </h4>
            </div>

            {/* Phone Push Notification Card */}
            <div className="p-4 rounded-2xl bg-[#161D2E]/90 border border-[#38BDF8]/40 shadow-xl space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md bg-[#0284C7] flex items-center justify-center text-white text-[10px] font-bold">
                    DD
                  </div>
                  <span className="font-bold text-white">DetailDock Atelier</span>
                </div>
                <span className="text-[10px] text-[#64748B]">now</span>
              </div>
              <p className="text-xs text-[#E2E8F0] leading-snug">
                {selectedNotice?.message || 'Your vehicle detailing service is progressing in Cleanroom Bay 1.'}
              </p>
              <div className="pt-1 flex items-center justify-between text-[10px] text-[#38BDF8]">
                <span>Tap to view live telemetry</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399]" />
              </div>
            </div>

            <div className="pt-2 text-center">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowSimulator(false)}
                className="w-full text-xs"
              >
                Dismiss Phone Preview
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
