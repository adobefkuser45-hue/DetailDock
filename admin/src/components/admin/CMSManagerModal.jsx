import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Layers, 
  Save, 
  RotateCcw, 
  Plus, 
  Check, 
  AlertCircle, 
  ToggleLeft, 
  ToggleRight, 
  Globe, 
  Image as ImageIcon, 
  MessageSquareQuote, 
  HelpCircle, 
  Eye, 
  Trash2 
} from 'lucide-react';
import { Button } from '../common/Button.jsx';
import { getAdminCMS, updateAdminCMS, resetAdminCMS } from '../../services/api.js';

export const CMSManagerModal = ({ isOpen, onClose, token, onCMSUpdated }) => {
  const [activeTab, setActiveTab] = useState('banner'); // 'banner' | 'hero' | 'showcase' | 'testimonials' | 'faqs'
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  
  const [cms, setCms] = useState({
    announcementBanner: {
      isActive: true,
      message: '🔥 Spring Studio Special: Complimentary Shortwave Infrared Curing on All 9H Ceramic Suites',
      link: '/builder',
      badgeText: 'LIMITED ATELIER APPOINTMENTS'
    },
    hero: {
      badge: 'DUAL CLEANROOM BAYS ACTIVE • Austin ISO-6 Atelier',
      headline: 'Where Paint Meets Concourse Perfection.',
      subheadline: 'Bespoke multi-stage rotary compounding, certified 9H ceramic glass shielding, and real-time bay telemetry engineered for discerning automotive enthusiasts.',
      primaryCtaText: 'Configure In Smart Builder',
      primaryCtaLink: '/builder',
      secondaryCtaText: 'Reserve Bay Appointment',
      secondaryCtaLink: '/book',
      telemetryHighlights: [
        { metric: '9H + IR', description: 'Shortwave Infrared Cured' },
        { metric: '< 0.5µm', description: 'Paint Preservation Depth' },
        { metric: '100%', description: 'Hand-Compounded Finish' },
        { metric: 'ISO-6', description: 'Sterile Cleanroom Studio' }
      ]
    },
    beforeAfterShowcase: [],
    testimonials: [],
    faqs: []
  });

  const fetchCMS = async () => {
    try {
      setLoading(true);
      const data = await getAdminCMS(token);
      if (data) {
        setCms(data);
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to fetch CMS content.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCMS();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveCMS = async () => {
    try {
      setSaving(true);
      setStatusMessage(null);
      const updated = await updateAdminCMS(cms, token);
      setCms(updated);
      setStatusMessage({ type: 'success', text: 'Website Studio CMS updated and propagated live across the customer portal!' });
      if (onCMSUpdated) onCMSUpdated(updated);
      setTimeout(() => setStatusMessage(null), 4000);
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to save CMS changes.' });
    } finally {
      setSaving(false);
    }
  };

  const handleResetCMS = async () => {
    if (!window.confirm('Restore factory default website copy, headlines, showcases, and reviews? Custom modifications will be replaced.')) {
      return;
    }
    try {
      setLoading(true);
      const resetData = await resetAdminCMS(token);
      setCms(resetData);
      setStatusMessage({ type: 'success', text: 'Website content restored to factory defaults!' });
      if (onCMSUpdated) onCMSUpdated(resetData);
      setTimeout(() => setStatusMessage(null), 4000);
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to reset CMS.' });
    } finally {
      setLoading(false);
    }
  };

  // Showcase helpers
  const handleAddShowcase = () => {
    const newItem = {
      vehicle: '2025 Porsche 911 Turbo S',
      treatment: 'Two-Stage Paint Correction & 9H Ceramic Matrix',
      defectType: 'Heavy Swirls & Oxidation',
      beforeImage: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop',
      swirlElimination: '99% Elimination',
      finalGloss: '98.8 GU Mirror',
      isActive: true
    };
    setCms({ ...cms, beforeAfterShowcase: [newItem, ...cms.beforeAfterShowcase] });
  };

  const handleDeleteShowcase = (index) => {
    const list = [...cms.beforeAfterShowcase];
    list.splice(index, 1);
    setCms({ ...cms, beforeAfterShowcase: list });
  };

  // Testimonial helpers
  const handleAddTestimonial = () => {
    const newItem = {
      clientName: 'Julian Vance',
      vehicle: '2024 Porsche 911 GT3 RS',
      rating: 5,
      quote: 'The level of craftsmanship DetailDock exhibits is genuinely unparalleled.',
      isVerified: true,
      isActive: true
    };
    setCms({ ...cms, testimonials: [newItem, ...cms.testimonials] });
  };

  const handleDeleteTestimonial = (index) => {
    const list = [...cms.testimonials];
    list.splice(index, 1);
    setCms({ ...cms, testimonials: list });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="bg-[#0B0E14] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-[0_25px_60px_rgba(0,0,0,0.9)] text-left overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#111622]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#F8FAFC] flex items-center gap-2 font-display">
                Dynamic Website Studio CMS Cockpit
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30">
                  Live Client Sync
                </span>
              </h2>
              <p className="text-xs text-[#94A3B8] mt-0.5">
                Directly manage 100% of public customer website copy, headlines, showcase galleries, and client testimonials with zero code deployments.
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            aria-label="Close CMS modal"
            className="p-2 text-[#94A3B8] hover:text-white rounded-lg hover:bg-white/5 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between px-6 border-b border-white/10 bg-[#0B0E14] overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            <button
              onClick={() => setActiveTab('banner')}
              className={`py-3.5 px-3.5 text-xs font-bold uppercase tracking-wider border-b-2 transition flex items-center gap-1.5 font-mono cursor-pointer ${
                activeTab === 'banner'
                  ? 'border-[#F59E0B] text-[#F59E0B]'
                  : 'border-transparent text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              <span>Announcement Bar</span>
            </button>
            <button
              onClick={() => setActiveTab('hero')}
              className={`py-3.5 px-3.5 text-xs font-bold uppercase tracking-wider border-b-2 transition flex items-center gap-1.5 font-mono cursor-pointer ${
                activeTab === 'hero'
                  ? 'border-[#F59E0B] text-[#F59E0B]'
                  : 'border-transparent text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              <span>Hero & Headlines</span>
            </button>
            <button
              onClick={() => setActiveTab('showcase')}
              className={`py-3.5 px-3.5 text-xs font-bold uppercase tracking-wider border-b-2 transition flex items-center gap-1.5 font-mono cursor-pointer ${
                activeTab === 'showcase'
                  ? 'border-[#F59E0B] text-[#F59E0B]'
                  : 'border-transparent text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Before & After ({cms.beforeAfterShowcase?.length || 0})</span>
            </button>
            <button
              onClick={() => setActiveTab('testimonials')}
              className={`py-3.5 px-3.5 text-xs font-bold uppercase tracking-wider border-b-2 transition flex items-center gap-1.5 font-mono cursor-pointer ${
                activeTab === 'testimonials'
                  ? 'border-[#F59E0B] text-[#F59E0B]'
                  : 'border-transparent text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              <MessageSquareQuote className="w-3.5 h-3.5" />
              <span>Reviews ({cms.testimonials?.length || 0})</span>
            </button>
            <button
              onClick={() => setActiveTab('faqs')}
              className={`py-3.5 px-3.5 text-xs font-bold uppercase tracking-wider border-b-2 transition flex items-center gap-1.5 font-mono cursor-pointer ${
                activeTab === 'faqs'
                  ? 'border-[#F59E0B] text-[#F59E0B]'
                  : 'border-transparent text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>FAQs ({cms.faqs?.length || 0})</span>
            </button>
          </div>

          <button
            onClick={handleResetCMS}
            className="text-xs text-[#94A3B8] hover:text-[#EF4444] flex items-center gap-1.5 py-1.5 px-3 rounded-lg border border-white/10 hover:border-[#EF4444]/40 transition cursor-pointer flex-shrink-0 ml-4 font-mono"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>
        </div>

        {/* Status Alert */}
        {statusMessage && (
          <div className={`mx-6 mt-4 p-3 rounded-xl flex items-center gap-2 text-xs font-medium border ${
            statusMessage.type === 'success' 
              ? 'bg-[#10B981]/10 border-[#10B981]/30 text-[#10B981]' 
              : 'bg-[#EF4444]/10 border-[#EF4444]/30 text-[#EF4444]'
          }`}>
            {statusMessage.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {statusMessage.text}
          </div>
        )}

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 text-xs">
          {loading ? (
            <div className="text-center py-12 text-[#94A3B8] text-sm font-mono">
              Loading Website CMS configuration from MongoDB Atlas...
            </div>
          ) : (
            <>
              {/* TAB 1: ANNOUNCEMENT BANNER */}
              {activeTab === 'banner' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div>
                      <h4 className="font-bold text-white text-sm">Top Website Announcement Bar</h4>
                      <p className="text-slate-400 text-xs">Appears at the very top of all customer pages for seasonal specials.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCms({
                        ...cms,
                        announcementBanner: { ...cms.announcementBanner, isActive: !cms.announcementBanner.isActive }
                      })}
                      className={`p-1.5 rounded-lg border text-xs flex items-center gap-1.5 font-bold cursor-pointer ${
                        cms.announcementBanner.isActive
                          ? 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30'
                          : 'bg-white/5 text-slate-400 border-white/10'
                      }`}
                    >
                      {cms.announcementBanner.isActive ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                      <span>{cms.announcementBanner.isActive ? 'Banner Active' : 'Banner Hidden'}</span>
                    </button>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase text-[#94A3B8] block mb-1">
                      Banner Message Text:
                    </label>
                    <input
                      type="text"
                      value={cms.announcementBanner.message}
                      onChange={(e) => setCms({
                        ...cms,
                        announcementBanner: { ...cms.announcementBanner, message: e.target.value }
                      })}
                      className="w-full bg-[#111622] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#F59E0B]"
                      placeholder="e.g. 🔥 Spring Studio Special: Complimentary Infrared Curing on All 9H Ceramic Suites"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-mono uppercase text-[#94A3B8] block mb-1">
                        Pill Badge Label:
                      </label>
                      <input
                        type="text"
                        value={cms.announcementBanner.badgeText}
                        onChange={(e) => setCms({
                          ...cms,
                          announcementBanner: { ...cms.announcementBanner, badgeText: e.target.value }
                        })}
                        className="w-full bg-[#111622] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#F59E0B]"
                        placeholder="LIMITED ATELIER APPOINTMENTS"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono uppercase text-[#94A3B8] block mb-1">
                        Target Destination Route:
                      </label>
                      <input
                        type="text"
                        value={cms.announcementBanner.link}
                        onChange={(e) => setCms({
                          ...cms,
                          announcementBanner: { ...cms.announcementBanner, link: e.target.value }
                        })}
                        className="w-full bg-[#111622] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#F59E0B]"
                        placeholder="/builder"
                      />
                    </div>
                  </div>

                  {/* Live Mini Preview */}
                  <div className="mt-4 p-3 rounded-xl bg-black/60 border border-white/10 space-y-1">
                    <span className="text-[10px] font-mono uppercase text-[#F59E0B] font-bold">Public Preview:</span>
                    <div className="p-2.5 rounded-lg bg-[#F59E0B]/15 border border-[#F59E0B]/30 text-[#F59E0B] text-center font-medium">
                      {cms.announcementBanner.message}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: HERO & HEADLINES */}
              {activeTab === 'hero' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-[11px] font-mono uppercase text-[#94A3B8] block mb-1">
                      Hero Badge Chip:
                    </label>
                    <input
                      type="text"
                      value={cms.hero.badge}
                      onChange={(e) => setCms({
                        ...cms,
                        hero: { ...cms.hero, badge: e.target.value }
                      })}
                      className="w-full bg-[#111622] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#F59E0B]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase text-[#94A3B8] block mb-1">
                      Main Catchline Headline:
                    </label>
                    <input
                      type="text"
                      value={cms.hero.headline}
                      onChange={(e) => setCms({
                        ...cms,
                        hero: { ...cms.hero, headline: e.target.value }
                      })}
                      className="w-full bg-[#111622] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white font-bold focus:outline-none focus:border-[#F59E0B]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase text-[#94A3B8] block mb-1">
                      Subheadline Body Text:
                    </label>
                    <textarea
                      rows="3"
                      value={cms.hero.subheadline}
                      onChange={(e) => setCms({
                        ...cms,
                        hero: { ...cms.hero, subheadline: e.target.value }
                      })}
                      className="w-full bg-[#111622] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#F59E0B]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-mono uppercase text-[#94A3B8] block mb-1">
                        Primary CTA Text:
                      </label>
                      <input
                        type="text"
                        value={cms.hero.primaryCtaText}
                        onChange={(e) => setCms({
                          ...cms,
                          hero: { ...cms.hero, primaryCtaText: e.target.value }
                        })}
                        className="w-full bg-[#111622] border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#F59E0B]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono uppercase text-[#94A3B8] block mb-1">
                        Primary CTA Link:
                      </label>
                      <input
                        type="text"
                        value={cms.hero.primaryCtaLink}
                        onChange={(e) => setCms({
                          ...cms,
                          hero: { ...cms.hero, primaryCtaLink: e.target.value }
                        })}
                        className="w-full bg-[#111622] border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#F59E0B]"
                      />
                    </div>
                  </div>

                  {/* 4 Telemetry Highlights */}
                  <div className="pt-2 border-t border-white/10 space-y-2">
                    <span className="text-[11px] font-mono font-bold uppercase text-[#F59E0B] block">
                      4 Cleanroom Studio Telemetry Pods
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {cms.hero.telemetryHighlights?.map((t, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-[#111622] border border-white/10 space-y-1.5">
                          <input
                            type="text"
                            value={t.metric}
                            onChange={(e) => {
                              const list = [...cms.hero.telemetryHighlights];
                              list[idx].metric = e.target.value;
                              setCms({ ...cms, hero: { ...cms.hero, telemetryHighlights: list } });
                            }}
                            className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-[#F59E0B] font-mono font-bold"
                            placeholder="Metric (e.g. 9H + IR)"
                          />
                          <input
                            type="text"
                            value={t.description}
                            onChange={(e) => {
                              const list = [...cms.hero.telemetryHighlights];
                              list[idx].description = e.target.value;
                              setCms({ ...cms, hero: { ...cms.hero, telemetryHighlights: list } });
                            }}
                            className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-[11px] text-slate-300"
                            placeholder="Description (e.g. Shortwave IR Cured)"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: BEFORE & AFTER SHOWCASE */}
              {activeTab === 'showcase' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div>
                      <h4 className="font-bold text-white text-sm">Before & After Defect Elimination Gallery</h4>
                      <p className="text-slate-400 text-xs">Interactive GPU slider items comparing vehicle defect removal.</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddShowcase}
                      className="px-3 py-1.5 rounded-lg bg-[#F59E0B]/20 border border-[#F59E0B]/40 text-[#F59E0B] text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Vehicle Pair</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {cms.beforeAfterShowcase?.map((item, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-[#111622] border border-white/10 space-y-3">
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={item.vehicle}
                            onChange={(e) => {
                              const list = [...cms.beforeAfterShowcase];
                              list[idx].vehicle = e.target.value;
                              setCms({ ...cms, beforeAfterShowcase: list });
                            }}
                            className="bg-transparent text-sm font-bold text-white border-b border-white/15 outline-none focus:border-[#F59E0B] w-2/3"
                          />
                          <button
                            type="button"
                            onClick={() => handleDeleteShowcase(idx)}
                            className="p-1.5 rounded text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                            title="Delete pair"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] text-slate-400 font-mono uppercase block mb-1">Treatment Description</label>
                            <input
                              type="text"
                              value={item.treatment}
                              onChange={(e) => {
                                const list = [...cms.beforeAfterShowcase];
                                list[idx].treatment = e.target.value;
                                setCms({ ...cms, beforeAfterShowcase: list });
                              }}
                              className="w-full bg-[#0B0E14] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-slate-400 font-mono uppercase block mb-1">Defect Type</label>
                            <input
                              type="text"
                              value={item.defectType}
                              onChange={(e) => {
                                const list = [...cms.beforeAfterShowcase];
                                list[idx].defectType = e.target.value;
                                setCms({ ...cms, beforeAfterShowcase: list });
                              }}
                              className="w-full bg-[#0B0E14] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] text-slate-400 font-mono uppercase block mb-1">Before Photo URL</label>
                            <input
                              type="text"
                              value={item.beforeImage}
                              onChange={(e) => {
                                const list = [...cms.beforeAfterShowcase];
                                list[idx].beforeImage = e.target.value;
                                setCms({ ...cms, beforeAfterShowcase: list });
                              }}
                              className="w-full bg-[#0B0E14] border border-white/10 rounded px-2.5 py-1.5 text-[11px] text-slate-300 font-mono"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-slate-400 font-mono uppercase block mb-1">After Photo URL</label>
                            <input
                              type="text"
                              value={item.afterImage}
                              onChange={(e) => {
                                const list = [...cms.beforeAfterShowcase];
                                list[idx].afterImage = e.target.value;
                                setCms({ ...cms, beforeAfterShowcase: list });
                              }}
                              className="w-full bg-[#0B0E14] border border-white/10 rounded px-2.5 py-1.5 text-[11px] text-slate-300 font-mono"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-1">
                          <input
                            type="text"
                            value={item.swirlElimination}
                            onChange={(e) => {
                              const list = [...cms.beforeAfterShowcase];
                              list[idx].swirlElimination = e.target.value;
                              setCms({ ...cms, beforeAfterShowcase: list });
                            }}
                            className="bg-[#0B0E14] border border-white/10 rounded px-2 py-1 text-xs text-[#10B981] font-mono"
                            placeholder="e.g. 98.5% Elimination"
                          />
                          <input
                            type="text"
                            value={item.finalGloss}
                            onChange={(e) => {
                              const list = [...cms.beforeAfterShowcase];
                              list[idx].finalGloss = e.target.value;
                              setCms({ ...cms, beforeAfterShowcase: list });
                            }}
                            className="bg-[#0B0E14] border border-white/10 rounded px-2 py-1 text-xs text-[#F59E0B] font-mono"
                            placeholder="e.g. 98.4 GU Mirror"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: TESTIMONIALS */}
              {activeTab === 'testimonials' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div>
                      <h4 className="font-bold text-white text-sm">VIP Client Testimonials & Reviews</h4>
                      <p className="text-slate-400 text-xs">Featured on the homepage social proof section.</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddTestimonial}
                      className="px-3 py-1.5 rounded-lg bg-[#F59E0B]/20 border border-[#F59E0B]/40 text-[#F59E0B] text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Review</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {cms.testimonials?.map((t, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-[#111622] border border-white/10 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 w-3/4">
                            <input
                              type="text"
                              value={t.clientName}
                              onChange={(e) => {
                                const list = [...cms.testimonials];
                                list[idx].clientName = e.target.value;
                                setCms({ ...cms, testimonials: list });
                              }}
                              className="bg-transparent font-bold text-white border-b border-white/15 outline-none focus:border-[#F59E0B] text-xs"
                              placeholder="Client Name"
                            />
                            <input
                              type="text"
                              value={t.vehicle}
                              onChange={(e) => {
                                const list = [...cms.testimonials];
                                list[idx].vehicle = e.target.value;
                                setCms({ ...cms, testimonials: list });
                              }}
                              className="bg-transparent text-slate-400 border-b border-white/15 outline-none focus:border-[#F59E0B] text-xs"
                              placeholder="Vehicle Model"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteTestimonial(idx)}
                            className="p-1 rounded text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <textarea
                          rows="2"
                          value={t.quote}
                          onChange={(e) => {
                            const list = [...cms.testimonials];
                            list[idx].quote = e.target.value;
                            setCms({ ...cms, testimonials: list });
                          }}
                          className="w-full bg-[#0B0E14] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                          placeholder="Client review quote..."
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: FAQS */}
              {activeTab === 'faqs' && (
                <div className="space-y-4">
                  <span className="text-xs font-bold text-white uppercase font-mono tracking-wider block">
                    Technical Atelier Concierge FAQs
                  </span>
                  <div className="space-y-3">
                    {cms.faqs?.map((f, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-[#111622] border border-white/10 space-y-2">
                        <input
                          type="text"
                          value={f.question}
                          onChange={(e) => {
                            const list = [...cms.faqs];
                            list[idx].question = e.target.value;
                            setCms({ ...cms, faqs: list });
                          }}
                          className="w-full bg-black/40 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white font-bold"
                          placeholder="Question"
                        />
                        <textarea
                          rows="2"
                          value={f.answer}
                          onChange={(e) => {
                            const list = [...cms.faqs];
                            list[idx].answer = e.target.value;
                            setCms({ ...cms, faqs: list });
                          }}
                          className="w-full bg-black/40 border border-white/10 rounded px-2.5 py-1.5 text-xs text-slate-300"
                          placeholder="Answer"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/10 bg-[#111622] flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onClose} className="cursor-pointer">
            Close
          </Button>
          <Button 
            variant="primary" 
            size="sm" 
            isLoading={saving} 
            onClick={handleSaveCMS}
            icon={Save}
            className="glow-amber font-bold cursor-pointer"
          >
            Save CMS & Propagate Live
          </Button>
        </div>

      </div>
    </div>
  );
};
