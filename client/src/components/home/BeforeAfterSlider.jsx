import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Sparkles, 
  Eye, 
  Lightbulb, 
  CheckCircle2, 
  ShieldCheck, 
  Sliders, 
  Gauge, 
  Flame,
  RotateCcw
} from 'lucide-react';

const COMPARISON_SCENARIOS = [
  {
    id: 'paint',
    title: 'Paint Correction & Ceramic Shield',
    subtitle: 'Porsche 911 GT3 RS — Shark Blue Clear Coat',
    beforeLabel: 'Before: Swirled & Oxidized',
    afterLabel: 'After: 2-Stage Compound + 9H Ceramic',
    beforeStats: { gloss: '58 GU', defects: 'Heavy Holograms', slickness: 'Low' },
    afterStats: { gloss: '98 GU', defects: '95%+ Elimination', slickness: '115° Beading' },
    defectList: ['Tunnel wash micro-swirls', 'Acid rain etching', 'Clear coat haze'],
    colorScheme: 'from-[#0A192F] to-[#0369A1]',
    // High-resolution bespoke SVG visualization patterns
    type: 'paint'
  },
  {
    id: 'wheels',
    title: 'Wheels & Caliper Heat Shield',
    subtitle: 'Forged Centerlock Wheels & Carbon Ceramic Calipers',
    beforeLabel: 'Before: Baked Metallic Dust',
    afterLabel: 'After: High-Temp Ceramic Coating',
    beforeStats: { gloss: '42 GU', defects: 'Sintered Brake Dust', slickness: 'Sticking' },
    afterStats: { gloss: '94 GU', defects: 'Zero Contamination', slickness: 'Hydrophobic' },
    defectList: ['Baked-on iron filings', 'Road asphalt tar spots', 'Calipers oxidation'],
    colorScheme: 'from-[#1A1A24] to-[#3B82F6]',
    type: 'wheels'
  },
  {
    id: 'interior',
    title: 'Cockpit Leather & Steam Extraction',
    subtitle: 'Full Leather & Alcantara Interior Suite',
    beforeLabel: 'Before: Oily Grime & Dirt',
    afterLabel: 'After: OEM Matte Restored',
    beforeStats: { gloss: '75 GU (Oily)', defects: 'Body Oils & Dirt', slickness: 'Greasy' },
    afterStats: { gloss: 'Matte OEM', defects: 'Steam Sanitized', slickness: 'Supple Touch' },
    defectList: ['Oily steering wheel shine', 'Creased dirt deposits', 'UV fading on bolsters'],
    colorScheme: 'from-[#1F1D1B] to-[#D97706]',
    type: 'interior'
  }
];

export const BeforeAfterSlider = () => {
  const [activeScenario, setActiveScenario] = useState(COMPARISON_SCENARIOS[0]);
  const [sliderPos, setSliderPos] = useState(50); // 0 to 100 percentage
  const [isDragging, setIsDragging] = useState(false);
  const [scangripMode, setScangripMode] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef(null);

  // Calculate dynamic gloss level based on slider position
  const calculateGloss = useCallback(() => {
    const minGloss = 58;
    const maxGloss = 98;
    const current = Math.round(minGloss + ((maxGloss - minGloss) * (sliderPos / 100)));
    return `${current} GU`;
  }, [sliderPos]);

  // Handle pointer / drag events
  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(2, Math.min(98, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    handleMove(e.clientX || (e.touches && e.touches[0].clientX));
  };

  const handlePointerMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0]?.clientX);
    const clientY = e.clientY || (e.touches && e.touches[0]?.clientY);
    
    if (clientX && clientY) {
      const relX = ((clientX - rect.left) / rect.width) * 100;
      const relY = ((clientY - rect.top) / rect.height) * 100;
      setMousePos({ x: Math.max(0, Math.min(100, relX)), y: Math.max(0, Math.min(100, relY)) });
    }

    if (isDragging) {
      handleMove(clientX);
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    const handleGlobalMouseMove = (e) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('touchend', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, [isDragging, handleMove]);

  return (
    <section id="results" className="py-20 bg-[#090C12] border-t border-b border-[#1D2536] relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#0284C7]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101522] border border-[#2A364E] text-xs font-semibold text-[#38BDF8] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verifiable Atelier Craftsmanship</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F8FAFC] tracking-tight">
              Interactive Defect Elimination Studio
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl mt-2">
              Drag the high-precision scrubber to reveal the transformative power of multi-stage rotary compounding and infrared-cured 9H ceramic coatings.
            </p>
          </div>

          {/* Quick Scenario Selector Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-[#101522] border border-[#1D2536] rounded-xl self-start md:self-auto">
            {COMPARISON_SCENARIOS.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => {
                  setActiveScenario(scenario);
                  setSliderPos(50);
                }}
                className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
                  activeScenario.id === scenario.id
                    ? 'bg-[#0284C7] text-white shadow-md shadow-[#0284C7]/30'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#161D2E]'
                }`}
              >
                <span>{scenario.title.split('&')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Studio Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 px-4 py-3 bg-[#101522] border border-[#1D2536] rounded-xl text-xs">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-[#F8FAFC] flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#38BDF8]" />
              {activeScenario.subtitle}
            </span>
            <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-[#1D2536]">
              <span className="text-[#64748B]">Gloss Meter:</span>
              <span className="font-mono font-extrabold text-[#38BDF8] bg-[#0284C7]/15 px-2 py-0.5 rounded border border-[#0284C7]/30">
                {calculateGloss()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Scangrip Light Toggle */}
            <button
              onClick={() => setScangripMode(!scangripMode)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                scangripMode
                  ? 'bg-[#F59E0B]/15 border-[#F59E0B]/50 text-[#F59E0B] shadow-sm shadow-[#F59E0B]/20'
                  : 'bg-[#161D2E] border-[#2A364E] text-[#94A3B8] hover:text-white'
              }`}
              title="Toggle High-CRI Swirl Inspection Spotlight"
            >
              <Lightbulb className={`w-3.5 h-3.5 ${scangripMode ? 'animate-pulse' : ''}`} />
              <span>Scangrip Inspection Light {scangripMode ? 'ON' : 'OFF'}</span>
            </button>

            {/* Quick Presets */}
            <div className="flex items-center gap-1 border-l border-[#1D2536] pl-3">
              <button
                onClick={() => setSliderPos(0)}
                className={`px-2 py-1 rounded text-[11px] font-mono transition-colors ${
                  sliderPos <= 5 ? 'bg-[#38BDF8] text-[#090C12] font-bold' : 'text-[#94A3B8] hover:bg-[#161D2E]'
                }`}
              >
                Before
              </button>
              <button
                onClick={() => setSliderPos(50)}
                className={`px-2 py-1 rounded text-[11px] font-mono transition-colors ${
                  sliderPos >= 45 && sliderPos <= 55 ? 'bg-[#38BDF8] text-[#090C12] font-bold' : 'text-[#94A3B8] hover:bg-[#161D2E]'
                }`}
              >
                50/50
              </button>
              <button
                onClick={() => setSliderPos(100)}
                className={`px-2 py-1 rounded text-[11px] font-mono transition-colors ${
                  sliderPos >= 95 ? 'bg-[#38BDF8] text-[#090C12] font-bold' : 'text-[#94A3B8] hover:bg-[#161D2E]'
                }`}
              >
                After
              </button>
            </div>
          </div>
        </div>

        {/* The Interactive Visual Comparison Box */}
        <div
          ref={containerRef}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          className="relative w-full h-[400px] sm:h-[500px] lg:h-[560px] rounded-2xl overflow-hidden select-none border border-[#2A364E] shadow-2xl bg-[#090C12] cursor-ew-resize group"
        >
          {/* LAYER 1: The "AFTER" (Perfected Ceramic Surface) - Full Background */}
          <div className="absolute inset-0 w-full h-full bg-[#0A101D] overflow-hidden">
            {/* Visual Rendering for After state: Deep Mirror Gloss, Crisp Laser Reflection */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0B1528] via-[#081B38] to-[#040C1A]">
              {/* Metallic car paint flake micro-texture */}
              <div 
                className="absolute inset-0 opacity-40 mix-blend-overlay"
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.15) 1px, transparent 1px)`,
                  backgroundSize: '16px 16px'
                }}
              />

              {/* Atelier Overhead Hexagon Lighting Reflection (Topaz/Cleanroom aesthetic) */}
              <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 800 500" fill="none">
                  <path d="M200 100 L300 50 L400 100 L400 200 L300 250 L200 200 Z" stroke="#38BDF8" strokeWidth="3" opacity="0.4" />
                  <path d="M400 100 L500 50 L600 100 L600 200 L500 250 L400 200 Z" stroke="#38BDF8" strokeWidth="3" opacity="0.4" />
                  <path d="M300 250 L400 200 L500 250 L500 350 L400 400 L300 350 Z" stroke="#38BDF8" strokeWidth="3" opacity="0.4" />
                  {/* Laser reflection lines across fender curve */}
                  <line x1="50" y1="260" x2="750" y2="240" stroke="#F8FAFC" strokeWidth="2.5" opacity="0.7" />
                  <line x1="80" y1="280" x2="720" y2="260" stroke="#38BDF8" strokeWidth="1" opacity="0.5" />
                </svg>
              </div>

              {/* Water Beading Hydrophobic Effect Graphics on After surface */}
              <div className="absolute bottom-10 right-10 flex gap-3 opacity-60">
                <div className="w-4 h-4 rounded-full bg-cyan-400/40 border border-cyan-200/60 shadow-lg blur-[0.5px]" />
                <div className="w-6 h-6 rounded-full bg-cyan-400/50 border border-cyan-200/80 shadow-lg blur-[0.5px]" />
                <div className="w-3 h-3 rounded-full bg-cyan-400/40 border border-cyan-200/60 shadow-lg blur-[0.5px]" />
              </div>

              {/* After Studio Tag */}
              <div className="absolute top-6 right-6 z-20 flex flex-col items-end pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] text-xs font-extrabold uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {activeScenario.afterLabel}
                </span>
                <span className="text-[11px] font-mono text-[#94A3B8] mt-1.5 bg-[#090C12]/80 px-2 py-0.5 rounded border border-[#1D2536]">
                  9H Ceramic • 98 GU Mirror Finish
                </span>
              </div>
            </div>
          </div>

          {/* LAYER 2: The "BEFORE" (Swirled, Scratched, Oxidized Clear Coat) - Clipped to SliderPos */}
          <div 
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{ width: `${sliderPos}%` }}
          >
            <div 
              className="absolute inset-0 bg-gradient-to-br from-[#121620] via-[#0D121B] to-[#0A0D14]"
              style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
            >
              {/* Swirl Mark & Spiderweb Micro-Scratch Simulation Texture */}
              <div className="absolute inset-0 opacity-60 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 800 500" fill="none">
                  {/* Concentric circular micro-scratches caused by mechanical brush washers */}
                  <g stroke="#94A3B8" strokeWidth="0.8" opacity="0.35">
                    <circle cx="350" cy="220" r="40" strokeDasharray="3 4" />
                    <circle cx="350" cy="220" r="70" strokeDasharray="5 7" />
                    <circle cx="350" cy="220" r="110" strokeDasharray="4 6" />
                    <circle cx="350" cy="220" r="150" strokeDasharray="8 6" />
                    <circle cx="350" cy="220" r="200" strokeDasharray="5 8" />
                    <circle cx="350" cy="220" r="260" strokeDasharray="10 12" />
                    {/* Linear key / wash scratches */}
                    <path d="M220 180 Q340 220 420 190" />
                    <path d="M180 260 Q280 270 390 230" />
                    <path d="M250 140 Q310 170 380 160" />
                    <path d="M140 310 Q260 290 320 280" />
                  </g>
                  {/* Water spots & etching patches */}
                  <g fill="#475569" opacity="0.2">
                    <ellipse cx="280" cy="200" rx="30" ry="18" />
                    <ellipse cx="410" cy="250" rx="22" ry="14" />
                    <ellipse cx="200" cy="280" rx="40" ry="25" />
                  </g>
                </svg>
              </div>

              {/* Dull oxidized matte wash filter */}
              <div className="absolute inset-0 bg-[#090C12]/40 backdrop-blur-[0.8px]" />

              {/* Before Studio Tag */}
              <div className="absolute top-6 left-6 z-20 flex flex-col items-start pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-[#EF4444]/20 border border-[#EF4444]/40 text-[#F87171] text-xs font-extrabold uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                  <Flame className="w-3.5 h-3.5" />
                  {activeScenario.beforeLabel}
                </span>
                <span className="text-[11px] font-mono text-[#94A3B8] mt-1.5 bg-[#090C12]/80 px-2 py-0.5 rounded border border-[#1D2536]">
                  Hazed • 58 GU • Swirl Webs Present
                </span>
              </div>
            </div>
          </div>

          {/* SCANGRIP INSPECTION SPOTLIGHT EFFECT (Follows mouse cursor) */}
          {scangripMode && (
            <div 
              className="absolute pointer-events-none z-30 transition-transform duration-75"
              style={{
                left: `${mousePos.x}%`,
                top: `${mousePos.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* High-CRI LED Core Beam */}
              <div className="w-48 h-48 rounded-full bg-[#F59E0B]/20 blur-2xl border border-[#F59E0B]/30" />
              <div className="w-24 h-24 rounded-full bg-[#FEF08A]/40 blur-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              {/* Optical Inspection Ring */}
              <div className="w-16 h-16 rounded-full border border-[#F59E0B]/80 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#FEF08A] shadow-lg shadow-[#FEF08A]" />
              </div>
            </div>
          )}

          {/* THE SCRUBBER DIVIDER LINE & HANDLE */}
          <div 
            className="absolute top-0 bottom-0 z-40 w-1 bg-[#38BDF8] shadow-[0_0_16px_rgba(56,189,248,0.8)] cursor-ew-resize flex items-center justify-center"
            style={{ left: `${sliderPos}%` }}
          >
            {/* Scrubber Handle Puck */}
            <div className="w-10 h-10 -ml-0.5 rounded-full bg-[#101522] border-2 border-[#38BDF8] shadow-2xl flex items-center justify-center text-[#38BDF8] group-hover:scale-110 active:scale-95 transition-transform">
              <div className="flex items-center gap-0.5">
                <div className="w-0.5 h-4 bg-[#38BDF8] rounded-full" />
                <div className="w-0.5 h-4 bg-[#38BDF8] rounded-full" />
              </div>
            </div>

            {/* Top Badge on Handle */}
            <div className="absolute top-3 px-2 py-0.5 rounded bg-[#101522] border border-[#38BDF8]/60 text-[10px] font-mono text-[#38BDF8] font-bold shadow-md whitespace-nowrap">
              {Math.round(sliderPos)}%
            </div>
          </div>

          {/* Bottom Interaction Prompt */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-3.5 py-1 rounded-full bg-[#090C12]/90 border border-[#2A364E] text-[11px] text-[#94A3B8] font-medium backdrop-blur-md pointer-events-none flex items-center gap-2">
            <Sliders className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Drag slider horizontally or use buttons above</span>
          </div>
        </div>

        {/* Post-Inspection Telemetry Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="p-5 rounded-xl bg-[#101522] border border-[#1D2536] flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#0284C7]/15 border border-[#0284C7]/30 flex items-center justify-center flex-shrink-0 text-[#38BDF8]">
              <Gauge className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase font-bold text-[#64748B] tracking-wider">Gloss Reflection Jump</div>
              <div className="text-xl font-extrabold text-[#F8FAFC] font-mono mt-0.5">
                {activeScenario.beforeStats.gloss} ➔ <span className="text-[#38BDF8]">{activeScenario.afterStats.gloss}</span>
              </div>
              <p className="text-xs text-[#94A3B8] mt-1">
                Measured with precision 60° angle digital micro-gloss meter before and after 2-stage compounding.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#101522] border border-[#1D2536] flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center flex-shrink-0 text-[#10B981]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase font-bold text-[#64748B] tracking-wider">Defect Elimination Rate</div>
              <div className="text-xl font-extrabold text-[#10B981] font-mono mt-0.5">
                95%+ Clear Coat Purity
              </div>
              <p className="text-xs text-[#94A3B8] mt-1">
                Zero rotary buffer trails, holograms, or sanding marks. OEM clear coat thickness preserved within 2-4 microns.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#101522] border border-[#1D2536] flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center flex-shrink-0 text-[#F59E0B]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase font-bold text-[#64748B] tracking-wider">Warranty & Longevity</div>
              <div className="text-xl font-extrabold text-[#F59E0B] font-mono mt-0.5">
                3-Year Certified Bond
              </div>
              <p className="text-xs text-[#94A3B8] mt-1">
                Permanent chemical cross-link bonding with serialized digital certificate and free annual maintenance washes.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
