import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Car, 
  Layers, 
  Save, 
  RotateCcw, 
  Plus, 
  Check, 
  AlertCircle, 
  Clock, 
  DollarSign, 
  ToggleLeft, 
  ToggleRight, 
  SlidersHorizontal 
} from 'lucide-react';
import { 
  getAdminCatalog, 
  updateAdminPackage, 
  createAdminPackage, 
  toggleAdminPackage, 
  updateAdminAddon, 
  createAdminAddon, 
  toggleAdminAddon, 
  updateAdminVehicleCategory, 
  resetAdminCatalog 
} from '../../services/api.js';

export const CatalogManagerModal = ({ isOpen, onClose, token, onCatalogUpdated }) => {
  const [activeTab, setActiveTab] = useState('packages'); // 'packages' | 'addons' | 'categories'
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);
  const [catalog, setCatalog] = useState({ packages: [], addons: [], categories: [] });

  // New item draft states
  const [isAddingPackage, setIsAddingPackage] = useState(false);
  const [newPackage, setNewPackage] = useState({
    title: '',
    tagline: '',
    basePrice: 199,
    baseDurationMinutes: 120,
    category: 'full',
    includedFeatures: 'Decontamination Wash, Hand Buffing, Gloss Sealant'
  });

  const [isAddingAddon, setIsAddingAddon] = useState(false);
  const [newAddon, setNewAddon] = useState({
    title: '',
    description: '',
    price: 65,
    durationMinutes: 30,
    iconName: 'Sparkles'
  });

  const fetchCatalog = async () => {
    try {
      setLoading(true);
      const data = await getAdminCatalog(token);
      setCatalog(data);
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to load catalog.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCatalog();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Update Package Handler
  const handleUpdatePackage = async (pkg) => {
    try {
      setSavingId(pkg._id);
      await updateAdminPackage(pkg._id, {
        title: pkg.title,
        tagline: pkg.tagline,
        basePrice: Number(pkg.basePrice),
        baseDurationMinutes: Number(pkg.baseDurationMinutes),
        isPopular: pkg.isPopular
      }, token);
      setStatusMessage({ type: 'success', text: `Package '${pkg.title}' updated successfully!` });
      if (onCatalogUpdated) onCatalogUpdated();
      setTimeout(() => setStatusMessage(null), 3500);
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to update package.' });
    } finally {
      setSavingId(null);
    }
  };

  // Toggle Package Active
  const handleTogglePackage = async (id) => {
    try {
      await toggleAdminPackage(id, token);
      fetchCatalog();
      if (onCatalogUpdated) onCatalogUpdated();
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message });
    }
  };

  // Create Package Handler
  const handleCreatePackage = async (e) => {
    e.preventDefault();
    try {
      setSavingId('new-pkg');
      const featuresArray = newPackage.includedFeatures.split(',').map(f => f.trim()).filter(Boolean);
      await createAdminPackage({
        ...newPackage,
        basePrice: Number(newPackage.basePrice),
        baseDurationMinutes: Number(newPackage.baseDurationMinutes),
        includedFeatures: featuresArray
      }, token);
      setIsAddingPackage(false);
      setNewPackage({
        title: '',
        tagline: '',
        basePrice: 199,
        baseDurationMinutes: 120,
        category: 'full',
        includedFeatures: 'Decontamination Wash, Hand Buffing, Gloss Sealant'
      });
      fetchCatalog();
      if (onCatalogUpdated) onCatalogUpdated();
      setStatusMessage({ type: 'success', text: 'New service package created successfully!' });
      setTimeout(() => setStatusMessage(null), 3500);
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message });
    } finally {
      setSavingId(null);
    }
  };

  // Update Addon Handler
  const handleUpdateAddon = async (addon) => {
    try {
      setSavingId(addon._id);
      await updateAdminAddon(addon._id, {
        title: addon.title,
        price: Number(addon.price),
        durationMinutes: Number(addon.durationMinutes),
        description: addon.description
      }, token);
      setStatusMessage({ type: 'success', text: `Add-on '${addon.title}' updated successfully!` });
      if (onCatalogUpdated) onCatalogUpdated();
      setTimeout(() => setStatusMessage(null), 3500);
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to update add-on.' });
    } finally {
      setSavingId(null);
    }
  };

  // Toggle Addon Active
  const handleToggleAddon = async (id) => {
    try {
      await toggleAdminAddon(id, token);
      fetchCatalog();
      if (onCatalogUpdated) onCatalogUpdated();
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message });
    }
  };

  // Create Addon Handler
  const handleCreateAddon = async (e) => {
    e.preventDefault();
    try {
      setSavingId('new-addon');
      await createAdminAddon({
        ...newAddon,
        price: Number(newAddon.price),
        durationMinutes: Number(newAddon.durationMinutes)
      }, token);
      setIsAddingAddon(false);
      setNewAddon({
        title: '',
        description: '',
        price: 65,
        durationMinutes: 30,
        iconName: 'Sparkles'
      });
      fetchCatalog();
      if (onCatalogUpdated) onCatalogUpdated();
      setStatusMessage({ type: 'success', text: 'New add-on created successfully!' });
      setTimeout(() => setStatusMessage(null), 3500);
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message });
    } finally {
      setSavingId(null);
    }
  };

  // Update Category Multipliers
  const handleUpdateCategory = async (cat) => {
    try {
      setSavingId(cat._id);
      await updateAdminVehicleCategory(cat._id, {
        priceMultiplier: Number(cat.priceMultiplier),
        durationMultiplier: Number(cat.durationMultiplier)
      }, token);
      setStatusMessage({ type: 'success', text: `Vehicle chassis '${cat.name}' multiplier updated!` });
      if (onCatalogUpdated) onCatalogUpdated();
      setTimeout(() => setStatusMessage(null), 3500);
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message });
    } finally {
      setSavingId(null);
    }
  };

  // Reset to Defaults
  const handleResetCatalog = async () => {
    if (!window.confirm('Restore factory default service packages, add-ons, and chassis multipliers? Custom services will be replaced with studio defaults.')) {
      return;
    }
    try {
      setLoading(true);
      await resetAdminCatalog(token);
      fetchCatalog();
      if (onCatalogUpdated) onCatalogUpdated();
      setStatusMessage({ type: 'success', text: 'Catalog successfully restored to factory defaults!' });
      setTimeout(() => setStatusMessage(null), 3500);
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0D121F] border border-[#1E293B] rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl text-left overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-[#1E293B] flex items-center justify-between bg-[#10172A]/70">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Service Catalog & Pricing Cockpit
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30">
                  Live Sync
                </span>
              </h2>
              <p className="text-xs text-[#94A3B8]">
                Configure detailing packages, add-ons, and chassis multipliers. Changes persist to MongoDB Atlas and update all client pages instantly.
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            aria-label="Close catalog modal"
            className="p-2 text-[#94A3B8] hover:text-white rounded-lg hover:bg-[#1E293B] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between px-6 border-b border-[#1E293B] bg-[#0B0F19]">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('packages')}
              className={`py-3.5 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition flex items-center gap-2 ${
                activeTab === 'packages'
                  ? 'border-[#38BDF8] text-[#38BDF8]'
                  : 'border-transparent text-[#94A3B8] hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              Preservation Packages ({catalog.packages?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('addons')}
              className={`py-3.5 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition flex items-center gap-2 ${
                activeTab === 'addons'
                  ? 'border-[#38BDF8] text-[#38BDF8]'
                  : 'border-transparent text-[#94A3B8] hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Add-on Enhancements ({catalog.addons?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`py-3.5 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition flex items-center gap-2 ${
                activeTab === 'categories'
                  ? 'border-[#38BDF8] text-[#38BDF8]'
                  : 'border-transparent text-[#94A3B8] hover:text-white'
              }`}
            >
              <Car className="w-4 h-4" />
              Chassis Multipliers ({catalog.categories?.length || 0})
            </button>
          </div>

          <button
            onClick={handleResetCatalog}
            className="text-xs text-[#94A3B8] hover:text-[#EF4444] flex items-center gap-1.5 py-1.5 px-3 rounded-lg border border-[#1E293B] hover:border-[#EF4444]/40 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Factory Reset
          </button>
        </div>

        {/* Status Alert Banner */}
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

        {/* Modal Body / Tab Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {loading ? (
            <div className="text-center py-12 text-[#94A3B8] text-sm font-mono">
              Fetching catalog from MongoDB Atlas...
            </div>
          ) : (
            <>
              {/* TAB 1: PACKAGES */}
              {activeTab === 'packages' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-[#94A3B8]">Active Treatment Tiers</span>
                    <button
                      onClick={() => setIsAddingPackage(!isAddingPackage)}
                      className="text-xs bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30 hover:bg-[#38BDF8]/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      {isAddingPackage ? 'Cancel' : 'Add New Package'}
                    </button>
                  </div>

                  {/* Add New Package Drawer */}
                  {isAddingPackage && (
                    <form onSubmit={handleCreatePackage} className="p-4 rounded-xl bg-[#131A2B] border border-[#38BDF8]/30 space-y-3">
                      <div className="text-xs font-bold text-[#38BDF8] uppercase tracking-wider">Create Custom Package</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] text-[#94A3B8] block mb-1">Package Title</label>
                          <input
                            type="text"
                            required
                            value={newPackage.title}
                            onChange={(e) => setNewPackage({ ...newPackage, title: e.target.value })}
                            placeholder="e.g. Ceramic Guard Pro"
                            className="w-full bg-[#090C12] border border-[#1E293B] rounded-lg px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-[#94A3B8] block mb-1">Tagline</label>
                          <input
                            type="text"
                            value={newPackage.tagline}
                            onChange={(e) => setNewPackage({ ...newPackage, tagline: e.target.value })}
                            placeholder="e.g. 3-Year Hydrophobic Coating"
                            className="w-full bg-[#090C12] border border-[#1E293B] rounded-lg px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-[#94A3B8] block mb-1">Base Price ($ USD)</label>
                          <input
                            type="number"
                            required
                            min="1"
                            value={newPackage.basePrice}
                            onChange={(e) => setNewPackage({ ...newPackage, basePrice: e.target.value })}
                            className="w-full bg-[#090C12] border border-[#1E293B] rounded-lg px-3 py-1.5 text-xs text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-[#94A3B8] block mb-1">Duration (Minutes)</label>
                          <input
                            type="number"
                            required
                            min="15"
                            value={newPackage.baseDurationMinutes}
                            onChange={(e) => setNewPackage({ ...newPackage, baseDurationMinutes: e.target.value })}
                            className="w-full bg-[#090C12] border border-[#1E293B] rounded-lg px-3 py-1.5 text-xs text-white font-mono"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[11px] text-[#94A3B8] block mb-1">Included Features (Comma-Separated)</label>
                        <input
                          type="text"
                          value={newPackage.includedFeatures}
                          onChange={(e) => setNewPackage({ ...newPackage, includedFeatures: e.target.value })}
                          className="w-full bg-[#090C12] border border-[#1E293B] rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingPackage(false)}
                          className="px-3 py-1.5 rounded-lg border border-[#1E293B] text-xs text-[#94A3B8]"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={savingId === 'new-pkg'}
                          className="px-4 py-1.5 rounded-lg bg-[#38BDF8] text-[#090C12] font-bold text-xs flex items-center gap-1.5 hover:bg-[#7DD3FC]"
                        >
                          <Save className="w-3.5 h-3.5" />
                          {savingId === 'new-pkg' ? 'Saving...' : 'Save Package'}
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Existing Packages List */}
                  {catalog.packages?.map((pkg) => (
                    <div 
                      key={pkg._id} 
                      className={`p-4 rounded-xl border transition ${
                        pkg.isActive ? 'bg-[#101522] border-[#1E293B]' : 'bg-[#090C12]/50 border-[#1E293B]/40 opacity-60'
                      }`}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                        <div className="sm:col-span-5">
                          <input
                            type="text"
                            value={pkg.title}
                            onChange={(e) => {
                              const updated = catalog.packages.map(p => p._id === pkg._id ? { ...p, title: e.target.value } : p);
                              setCatalog({ ...catalog, packages: updated });
                            }}
                            className="bg-transparent border-b border-[#2A364E] text-white font-bold text-sm w-full focus:border-[#38BDF8] outline-none pb-0.5"
                          />
                          <input
                            type="text"
                            value={pkg.tagline || ''}
                            onChange={(e) => {
                              const updated = catalog.packages.map(p => p._id === pkg._id ? { ...p, tagline: e.target.value } : p);
                              setCatalog({ ...catalog, packages: updated });
                            }}
                            placeholder="Tagline / brief"
                            className="bg-transparent text-xs text-[#94A3B8] w-full focus:text-white outline-none mt-1"
                          />
                        </div>

                        <div className="sm:col-span-3 flex items-center gap-3">
                          <div>
                            <span className="text-[10px] text-[#64748B] block">Price</span>
                            <div className="flex items-center text-white font-mono text-sm">
                              $<input
                                type="number"
                                value={pkg.basePrice}
                                onChange={(e) => {
                                  const updated = catalog.packages.map(p => p._id === pkg._id ? { ...p, basePrice: e.target.value } : p);
                                  setCatalog({ ...catalog, packages: updated });
                                }}
                                className="w-16 bg-[#090C12] border border-[#1E293B] rounded px-1.5 py-0.5 ml-1 text-white text-xs outline-none focus:border-[#38BDF8]"
                              />
                            </div>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#64748B] block">Duration</span>
                            <div className="flex items-center text-[#94A3B8] font-mono text-xs">
                              <input
                                type="number"
                                value={pkg.baseDurationMinutes}
                                onChange={(e) => {
                                  const updated = catalog.packages.map(p => p._id === pkg._id ? { ...p, baseDurationMinutes: e.target.value } : p);
                                  setCatalog({ ...catalog, packages: updated });
                                }}
                                className="w-14 bg-[#090C12] border border-[#1E293B] rounded px-1.5 py-0.5 text-white text-xs outline-none focus:border-[#38BDF8]"
                              />m
                            </div>
                          </div>
                        </div>

                        <div className="sm:col-span-4 flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleTogglePackage(pkg._id)}
                            className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 ${
                              pkg.isActive 
                                ? 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30' 
                                : 'bg-[#64748B]/10 text-[#64748B] border-[#64748B]/30'
                            }`}
                            title="Toggle active status"
                          >
                            {pkg.isActive ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                            {pkg.isActive ? 'Active' : 'Off'}
                          </button>

                          <button
                            onClick={() => handleUpdatePackage(pkg)}
                            disabled={savingId === pkg._id}
                            className="bg-[#38BDF8]/20 hover:bg-[#38BDF8]/30 text-[#38BDF8] border border-[#38BDF8]/40 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition"
                          >
                            <Save className="w-3.5 h-3.5" />
                            {savingId === pkg._id ? 'Saving...' : 'Update'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 2: ADDONS */}
              {activeTab === 'addons' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-[#94A3B8]">Studio Enhancements & Add-ons</span>
                    <button
                      onClick={() => setIsAddingAddon(!isAddingAddon)}
                      className="text-xs bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30 hover:bg-[#38BDF8]/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      {isAddingAddon ? 'Cancel' : 'Add New Add-on'}
                    </button>
                  </div>

                  {/* Add New Addon Drawer */}
                  {isAddingAddon && (
                    <form onSubmit={handleCreateAddon} className="p-4 rounded-xl bg-[#131A2B] border border-[#38BDF8]/30 space-y-3">
                      <div className="text-xs font-bold text-[#38BDF8] uppercase tracking-wider">Create Custom Add-on</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] text-[#94A3B8] block mb-1">Add-on Title</label>
                          <input
                            type="text"
                            required
                            value={newAddon.title}
                            onChange={(e) => setNewAddon({ ...newAddon, title: e.target.value })}
                            placeholder="e.g. Glass Hydrophobic Sealant"
                            className="w-full bg-[#090C12] border border-[#1E293B] rounded-lg px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-[#94A3B8] block mb-1">Price ($ USD)</label>
                          <input
                            type="number"
                            required
                            min="0"
                            value={newAddon.price}
                            onChange={(e) => setNewAddon({ ...newAddon, price: e.target.value })}
                            className="w-full bg-[#090C12] border border-[#1E293B] rounded-lg px-3 py-1.5 text-xs text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-[#94A3B8] block mb-1">Duration (Minutes)</label>
                          <input
                            type="number"
                            required
                            min="5"
                            value={newAddon.durationMinutes}
                            onChange={(e) => setNewAddon({ ...newAddon, durationMinutes: e.target.value })}
                            className="w-full bg-[#090C12] border border-[#1E293B] rounded-lg px-3 py-1.5 text-xs text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-[#94A3B8] block mb-1">Description</label>
                          <input
                            type="text"
                            value={newAddon.description}
                            onChange={(e) => setNewAddon({ ...newAddon, description: e.target.value })}
                            placeholder="Brief description of enhancement"
                            className="w-full bg-[#090C12] border border-[#1E293B] rounded-lg px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingAddon(false)}
                          className="px-3 py-1.5 rounded-lg border border-[#1E293B] text-xs text-[#94A3B8]"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={savingId === 'new-addon'}
                          className="px-4 py-1.5 rounded-lg bg-[#38BDF8] text-[#090C12] font-bold text-xs flex items-center gap-1.5 hover:bg-[#7DD3FC]"
                        >
                          <Save className="w-3.5 h-3.5" />
                          {savingId === 'new-addon' ? 'Saving...' : 'Save Add-on'}
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Existing Addons List */}
                  {catalog.addons?.map((addon) => (
                    <div 
                      key={addon._id} 
                      className={`p-4 rounded-xl border transition ${
                        addon.isActive ? 'bg-[#101522] border-[#1E293B]' : 'bg-[#090C12]/50 border-[#1E293B]/40 opacity-60'
                      }`}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                        <div className="sm:col-span-6">
                          <input
                            type="text"
                            value={addon.title}
                            onChange={(e) => {
                              const updated = catalog.addons.map(a => a._id === addon._id ? { ...a, title: e.target.value } : a);
                              setCatalog({ ...catalog, addons: updated });
                            }}
                            className="bg-transparent border-b border-[#2A364E] text-white font-bold text-sm w-full focus:border-[#38BDF8] outline-none pb-0.5"
                          />
                          <input
                            type="text"
                            value={addon.description || ''}
                            onChange={(e) => {
                              const updated = catalog.addons.map(a => a._id === addon._id ? { ...a, description: e.target.value } : a);
                              setCatalog({ ...catalog, addons: updated });
                            }}
                            placeholder="Description"
                            className="bg-transparent text-xs text-[#94A3B8] w-full focus:text-white outline-none mt-1"
                          />
                        </div>

                        <div className="sm:col-span-3 flex items-center gap-3">
                          <div>
                            <span className="text-[10px] text-[#64748B] block">Price</span>
                            <div className="flex items-center text-white font-mono text-sm">
                              $<input
                                type="number"
                                value={addon.price}
                                onChange={(e) => {
                                  const updated = catalog.addons.map(a => a._id === addon._id ? { ...a, price: e.target.value } : a);
                                  setCatalog({ ...catalog, addons: updated });
                                }}
                                className="w-16 bg-[#090C12] border border-[#1E293B] rounded px-1.5 py-0.5 ml-1 text-white text-xs outline-none focus:border-[#38BDF8]"
                              />
                            </div>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#64748B] block">Duration</span>
                            <div className="flex items-center text-[#94A3B8] font-mono text-xs">
                              <input
                                type="number"
                                value={addon.durationMinutes}
                                onChange={(e) => {
                                  const updated = catalog.addons.map(a => a._id === addon._id ? { ...a, durationMinutes: e.target.value } : a);
                                  setCatalog({ ...catalog, addons: updated });
                                }}
                                className="w-14 bg-[#090C12] border border-[#1E293B] rounded px-1.5 py-0.5 text-white text-xs outline-none focus:border-[#38BDF8]"
                              />m
                            </div>
                          </div>
                        </div>

                        <div className="sm:col-span-3 flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleToggleAddon(addon._id)}
                            className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 ${
                              addon.isActive 
                                ? 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30' 
                                : 'bg-[#64748B]/10 text-[#64748B] border-[#64748B]/30'
                            }`}
                          >
                            {addon.isActive ? 'Active' : 'Off'}
                          </button>

                          <button
                            onClick={() => handleUpdateAddon(addon)}
                            disabled={savingId === addon._id}
                            className="bg-[#38BDF8]/20 hover:bg-[#38BDF8]/30 text-[#38BDF8] border border-[#38BDF8]/40 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition"
                          >
                            <Save className="w-3.5 h-3.5" />
                            {savingId === addon._id ? 'Saving...' : 'Update'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: CATEGORIES */}
              {activeTab === 'categories' && (
                <div className="space-y-4">
                  <span className="text-xs font-bold uppercase text-[#94A3B8] block">
                    Chassis Vehicle Class Pricing & Duration Multipliers
                  </span>
                  <p className="text-xs text-[#64748B]">
                    Multipliers apply dynamically to package prices and durations. For example, 1.25x on a $289 package yields $361.25.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {catalog.categories?.map((cat) => (
                      <div key={cat._id} className="p-4 rounded-xl bg-[#101522] border border-[#1E293B] space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Car className="w-4 h-4 text-[#38BDF8]" />
                            <span className="font-bold text-white text-sm">{cat.name}</span>
                          </div>
                          <span className="text-[10px] font-mono uppercase bg-[#38BDF8]/10 text-[#38BDF8] px-2 py-0.5 rounded border border-[#38BDF8]/20">
                            {cat.slug}
                          </span>
                        </div>
                        <p className="text-xs text-[#94A3B8]">{cat.description}</p>
                        
                        <div className="grid grid-cols-2 gap-3 pt-1">
                          <div>
                            <label className="text-[10px] text-[#64748B] uppercase block mb-1">Price Multiplier</label>
                            <div className="flex items-center font-mono">
                              <input
                                type="number"
                                step="0.05"
                                min="0.5"
                                max="3.0"
                                value={cat.priceMultiplier}
                                onChange={(e) => {
                                  const updated = catalog.categories.map(c => c._id === cat._id ? { ...c, priceMultiplier: e.target.value } : c);
                                  setCatalog({ ...catalog, categories: updated });
                                }}
                                className="w-full bg-[#090C12] border border-[#1E293B] rounded-lg px-2.5 py-1 text-white text-xs outline-none focus:border-[#38BDF8]"
                              />
                              <span className="ml-1 text-xs text-[#94A3B8]">x</span>
                            </div>
                          </div>
                          <div>
                            <label className="text-[10px] text-[#64748B] uppercase block mb-1">Time Multiplier</label>
                            <div className="flex items-center font-mono">
                              <input
                                type="number"
                                step="0.05"
                                min="0.5"
                                max="3.0"
                                value={cat.durationMultiplier}
                                onChange={(e) => {
                                  const updated = catalog.categories.map(c => c._id === cat._id ? { ...c, durationMultiplier: e.target.value } : c);
                                  setCatalog({ ...catalog, categories: updated });
                                }}
                                className="w-full bg-[#090C12] border border-[#1E293B] rounded-lg px-2.5 py-1 text-white text-xs outline-none focus:border-[#38BDF8]"
                              />
                              <span className="ml-1 text-xs text-[#94A3B8]">x</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end pt-1">
                          <button
                            onClick={() => handleUpdateCategory(cat)}
                            disabled={savingId === cat._id}
                            className="bg-[#38BDF8]/20 hover:bg-[#38BDF8]/30 text-[#38BDF8] border border-[#38BDF8]/40 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition"
                          >
                            <Save className="w-3.5 h-3.5" />
                            {savingId === cat._id ? 'Saving...' : 'Save Multiplier'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#1E293B] bg-[#10172A]/70 flex items-center justify-between">
          <span className="text-[11px] text-[#64748B]">
            All pricing adjustments execute deterministic calculations on the authoritative backend.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#1E293B] hover:bg-[#2A364E] text-white text-xs font-bold transition"
          >
            Close Catalog Cockpit
          </button>
        </div>

      </div>
    </div>
  );
};
