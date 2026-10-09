import React, { useState } from 'react';
import { ShieldCheck, Award, Download, ExternalLink, Sparkles, CheckCircle2, X } from 'lucide-react';
import { getWarrantyDownloadUrl } from '../../services/api.js';

export const WarrantyCertificateSection = ({ booking, studioName = 'DetailDock Luxury Atelier' }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const cert = booking?.warrantyCertificate;
  const isCeramicService = booking?.packageSnapshot?.title?.toLowerCase().includes('ceramic') ||
                          booking?.packageSnapshot?.category === 'ceramic' ||
                          cert?.certificateNumber;

  if (!isCeramicService && !cert?.certificateNumber) {
    return null;
  }

  const certNumber = cert?.certificateNumber || `CCW-2026-${booking?.bookingCode?.slice(-4) || '7F91'}`;
  const issuedDate = cert?.issuedAt ? new Date(cert.issuedAt).toLocaleDateString() : new Date().toLocaleDateString();
  const expiryDate = cert?.expiresAt ? new Date(cert.expiresAt).toLocaleDateString() : new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000).toLocaleDateString();
  const downloadUrl = getWarrantyDownloadUrl(booking?.bookingCode || '');

  return (
    <>
      <div className="p-6 rounded-2xl bg-[#101522] border-2 border-[#D97706]/40 shadow-xl relative overflow-hidden text-left">
        {/* Ambient Gold Glow */}
        <div className="absolute top-0 right-0 w-64 h-32 bg-[#F59E0B]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#D97706]/15 border border-[#D97706]/40 flex items-center justify-center text-[#F59E0B]">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#D97706]/20 text-[#F59E0B] font-bold border border-[#D97706]/30">
                  Official Atelier Guarantee
                </span>
                <span className="text-xs text-[#10B981] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Active Coverage
                </span>
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight mt-0.5">
                Digital Ceramic Coating Warranty Certificate
              </h3>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-[#161D2E] border border-[#2A364E] text-[#94A3B8] hover:text-white text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#38BDF8]" />
              View Certificate
            </button>
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="px-4 py-2 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-[#D97706]/20 transition"
            >
              <Download className="w-3.5 h-3.5" />
              Download Certificate (PDF)
            </a>
          </div>
        </div>

        {/* Certificate Meta Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#090C12] border border-[#1E293B]">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#64748B] block">Certificate Serial</span>
            <span className="text-xs font-mono font-bold text-[#F59E0B]">{certNumber}</span>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-[#64748B] block">Hardness Standard</span>
            <span className="text-xs font-bold text-white">9H Matrix Multi-Layer</span>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-[#64748B] block">Warranty Period</span>
            <span className="text-xs font-bold text-[#10B981]">3 Years Active</span>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-[#64748B] block">Expires On</span>
            <span className="text-xs font-mono text-[#94A3B8]">{expiryDate}</span>
          </div>
        </div>
      </div>

      {/* Interactive Certificate Preview Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#090C12] border-2 border-[#D97706] rounded-2xl w-full max-w-2xl p-8 relative shadow-2xl text-center text-white">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#94A3B8] hover:text-white rounded-lg hover:bg-[#1E293B] transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Certificate Diploma Visual */}
            <div className="border border-[#D97706]/40 p-6 rounded-xl bg-[#0D121F] space-y-4">
              <div className="text-xs font-mono font-bold uppercase text-[#D97706] tracking-widest">
                {studioName.toUpperCase()}
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-wide">
                CERTIFICATE OF CERAMIC COATING WARRANTY
              </h2>
              <p className="text-xs text-[#94A3B8]">
                This certifies that the {booking.vehicle?.year} {booking.vehicle?.make} {booking.vehicle?.model} registered to <strong className="text-white">{booking.customer?.name}</strong> has received a certified professional application of 9H Matrix Multi-Layer Nano-Ceramic.
              </p>

              <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#1E293B] text-xs">
                <div>
                  <span className="text-[10px] text-[#64748B] block">Serial No.</span>
                  <span className="font-mono text-[#F59E0B] font-bold">{certNumber}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#64748B] block">Hardness</span>
                  <span className="font-bold text-white">9H Certified</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#64748B] block">Valid Until</span>
                  <span className="font-mono text-[#10B981] font-bold">{expiryDate}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#64748B] pt-2">
                <span>Specialist: Marcus Vance</span>
                <span>Security Hash: VERIFIED-9H</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#1E293B] text-xs text-[#94A3B8] hover:text-white"
              >
                Close Preview
              </button>
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="px-5 py-2 rounded-xl bg-[#D97706] text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                Download PDF Certificate
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
