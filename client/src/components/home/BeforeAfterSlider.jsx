import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Sparkles, 
  Lightbulb, 
  CheckCircle2, 
  ShieldCheck, 
  Sliders, 
  Gauge, 
  Flame,
  Award
} from 'lucide-react';

const COMPARISON_SCENARIOS = [
  {
    id: 'paint',
    title: 'Paint Correction & Ceramic Shield',
    subtitle: 'Porsche 911 GT3 RS — Shark Blue Clear Coat',
    beforeLabel: 'Before: Swirled & Oxidized',
    afterLabel: 'After: 2-Stage Compound + 9H Ceramic',
    beforeImage: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1200&auto=format&fit=crop',
    beforeStats: { gloss: '58 GU', defects: 'Heavy Holograms', slickness: 'Low' },
    afterStats: { gloss: '98 GU', defects: '95%+ Elimination', slickness: '115° Beading' },
    defectList: ['Tunnel wash micro-swirls', 'Acid rain etching', 'Clear coat haze'],
    type: 'paint'
  },
  {
    id: 'wheels',
    title: 'Wheels & Caliper Heat Shield',
    subtitle: 'Forged Centerlock Wheels & Carbon Ceramic Calipers',
    beforeLabel: 'Before: Baked Metallic Dust',
    afterLabel: 'After: High-Temp Ceramic Coating',
    beforeImage: 'https://images.unsplash.com/photo-1551522435-a13afa10f103?q=80&w=1200&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200&auto=format&fit=crop',
    beforeStats: { gloss: '42 GU', defects: 'Sintered Brake Dust', slickness: 'Sticking' },
    afterStats: { gloss: '94 GU', defects: 'Zero Contamination', slickness: 'Hydrophobic' },
    defectList: ['Baked-on iron filings', 'Road asphalt tar spots', 'Calipers oxidation'],
    type: 'wheels'
  },
  {
    id: 'interior',
    title: 'Cockpit Leather & Steam Extraction',
    subtitle: 'Full Leather & Alcantara Interior Suite',
    beforeLabel: 'Before: Oily Grime & Dirt',
    afterLabel: 'After: OEM Matte Restored',
    beforeImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop',
    beforeStats: { gloss: '75 GU (Oily)', defects: 'Body Oils & Dirt', slickness: 'Greasy' },
    afterStats: { gloss: 'Matte OEM', defects: 'Steam Sanitized', slickness: 'Supple Touch' },
    defectList: ['Oily steering wheel shine', 'Creased dirt deposits', 'UV fading on bolsters'],
    type: 'interior'
  }
];

export const BeforeAfterSlider = () => {
  const [activeScenario, setActiveScenario] = useState(COMPARISON_SCENARIOS[0]);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [scangripMode, setScangripMode] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef(null);

  const calculateGloss = useCallback(() => {
    const minGloss = 58;
    const maxGloss = 98;
    const current = Math.round(minGloss + ((maxGloss - minGloss) * (sliderPos / 100)));
    return `${current} GU`;
  }, [sliderPos]);

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
    <section id="results" className="py-24 bg-[#08090C] border-t border-b border-white/10 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E1017] border border-white/10 text-xs font-semibold text-[#D4AF37] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="font-mono uppercase tracking-wider">Verifiable Atelier Craftsmanship</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F8FAFC] tracking-[-0.03em] font-display">
              Defect Elimination Studio
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl mt-2 font-normal">
              Drag the high-precision scrubber to reveal the transformative power of multi-stage rotary compounding and infrared-cured 9H ceramic coatings.
            </p>
          </div>

          {/* Quick Scenario Selector Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-[#111622] border border-white/10 rounded-xl self-start md:self-auto">
            {COMPARISON_SCENARIOS.map((scenario) => {
              const isSelected = activeScenario.id === scenario.id;
              return (
                <button
                  key={scenario.id}
                  onClick={() => {
                    setActiveScenario(scenario);
                    setSliderPos(50);
                  }}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer tactile-press ${
                    isSelected
                      ? 'bg-[#F59E0B] text-[#0B0E14] shadow-lg shadow-[#F59E0B]/25 font-mono'
                      : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5'
                  }`}
                >
                  <span>{scenario.title.split('&')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Studio Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5 px-5 py-3.5 bg-[#111622] border border-white/10 rounded-xl text-xs">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-[#F8FAFC] flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#F59E0B]" />
              {activeScenario.subtitle}
            </span>
            <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-white/10">
              <span className="text-[#94A3B8]">Gloss Meter:</span>
              <span className="font-mono font-extrabold text-[#F59E0B] bg-[#F59E0B]/10 px-2.5 py-0.5 rounded border border-[#F59E0B]/25">
                {calculateGloss()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Scangrip Light Toggle */}
            <button
              onClick={() => setScangripMode(!scangripMode)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                scangripMode
                  ? 'bg-[#F59E0B]/15 border-[#F59E0B]/50 text-[#F59E0B] shadow-sm'
                  : 'bg-[#0B0E14] border-white/10 text-[#94A3B8] hover:text-white'
              }`}
              title="Toggle High-CRI Swirl Inspection Spotlight"
            >
              <Lightbulb className={`w-3.5 h-3.5 ${scangripMode ? 'animate-pulse text-[#F59E0B]' : ''}`} />
              <span>Scangrip Inspection Beam {scangripMode ? 'ON' : 'OFF'}</span>
            </button>

            {/* Quick Presets */}
            <div className="flex items-center gap-1 border-l border-white/10 pl-3">
              <button
                onClick={() => setSliderPos(0)}
                className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                  sliderPos <= 5 ? 'bg-[#F59E0B] text-[#0B0E14] font-bold' : 'text-[#94A3B8] hover:bg-white/5'
                }`}
              >
                Before
              </button>
              <button
                onClick={() => setSliderPos(50)}
                className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                  sliderPos >= 45 && sliderPos <= 55 ? 'bg-[#F59E0B] text-[#0B0E14] font-bold' : 'text-[#94A3B8] hover:bg-white/5'
                }`}
              >
                50/50
              </button>
              <button
                onClick={() => setSliderPos(100)}
                className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                  sliderPos >= 95 ? 'bg-[#F59E0B] text-[#0B0E14] font-bold' : 'text-[#94A3B8] hover:bg-white/5'
                }`}
              >
                After
              </button>
            </div>
          </div>
        </div>

        {/* The Interactive Visual Comparison Box - REAL PHOTOGRAPHIC LAYERS */}
        <div
          ref={containerRef}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          className="relative w-full h-[400px] sm:h-[500px] lg:h-[560px] rounded-2xl overflow-hidden select-none border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.85)] bg-[#0B0E14] cursor-ew-resize group"
        >
          {/* LAYER 1: The "AFTER" (Real Flawless Ceramic Mirror Finish Photo) */}
          <div className="absolute inset-0 w-full h-full bg-[#0B0E14] overflow-hidden">
            <img 
              src={activeScenario.afterImage} 
              alt={activeScenario.afterLabel} 
              className="w-full h-full object-cover object-center"
            />
            {/* Subtle photographic reflection sheen */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14]/70 via-transparent to-[#0B0E14]/30 pointer-events-none" />

            {/* Minimal Elegant After Studio Pill */}
            <div className="absolute top-5 right-5 z-20 pointer-events-none">
              <span className="px-3 py-1 rounded-full bg-[#0B0E14]/80 border border-[#10B981]/40 text-[#10B981] text-xs font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5 shadow-lg font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
                After: Ceramic Mirror
              </span>
            </div>
          </div>

          {/* LAYER 2: The "BEFORE" (Real Swirled & Scratched Photo) */}
          <div 
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{ width: `${sliderPos}%` }}
          >
            <div 
              className="absolute inset-0 h-full overflow-hidden"
              style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
            >
              <img 
                src={activeScenario.beforeImage} 
                alt={activeScenario.beforeLabel} 
                className="w-full h-full object-cover object-center filter contrast-90 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14]/60 via-transparent to-[#0B0E14]/30 pointer-events-none" />

              {/* Minimal Elegant Before Studio Pill */}
              <div className="absolute top-5 left-5 z-20 pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-[#0B0E14]/80 border border-[#EF4444]/40 text-[#F87171] text-xs font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5 shadow-lg font-mono">
                  <Flame className="w-3.5 h-3.5" />
                  Before: Swirl Haze
                </span>
              </div>
            </div>
          </div>

          {/* SCANGRIP INSPECTION SPOTLIGHT EFFECT */}
          {scangripMode && (
            <div 
              className="absolute pointer-events-none z-30 transition-transform duration-75"
              style={{
                left: `${mousePos.x}%`,
                top: `${mousePos.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="w-48 h-48 rounded-full bg-[#F59E0B]/20 blur-2xl border border-[#F59E0B]/30" />
              <div className="w-24 h-24 rounded-full bg-[#FDE68A]/30 blur-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <div className="w-16 h-16 rounded-full border border-[#F59E0B]/80 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#FDE68A] shadow-lg shadow-[#F59E0B]" />
              </div>
            </div>
          )}

          {/* THE SCRUBBER DIVIDER LINE & HANDLE */}
          <div 
            className="absolute top-0 bottom-0 z-40 w-1 bg-[#F59E0B] shadow-[0_0_20px_rgba(245,158,11,0.9)] cursor-ew-resize flex items-center justify-center"
            style={{ left: `${sliderPos}%` }}
          >
            {/* Scrubber Puck */}
            <div className="w-10 h-10 -ml-0.5 rounded-full bg-[#111622] border-2 border-[#F59E0B] shadow-2xl flex items-center justify-center text-[#F59E0B] group-hover:scale-110 active:scale-95 transition-transform">
              <div className="flex items-center gap-0.5">
                <div className="w-0.5 h-4 bg-[#F59E0B] rounded-full" />
                <div className="w-0.5 h-4 bg-[#F59E0B] rounded-full" />
              </div>
            </div>
          </div>

          {/* Bottom Interaction Prompt */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-3.5 py-1 rounded-full bg-[#0B0E14]/85 border border-white/10 text-[11px] text-[#94A3B8] font-medium backdrop-blur-md pointer-events-none flex items-center gap-2 shadow-lg">
            <Sliders className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Slide horizontally to inspect paint transition</span>
          </div>
        </div>

        {/* Post-Inspection Telemetry Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="p-6 rounded-2xl bg-[#111622]/90 border border-white/10 hover:border-[#F59E0B]/40 transition-all flex items-start gap-4 shadow-xl card-hover">
            <div className="w-11 h-11 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/25 flex items-center justify-center flex-shrink-0 text-[#F59E0B]">
              <Gauge className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase font-bold text-[#94A3B8] font-mono tracking-wider">Gloss Reflection Jump</div>
              <div className="text-xl font-black text-[#F8FAFC] font-mono mt-0.5 flex items-center gap-2">
                <span>{activeScenario.beforeStats.gloss}</span>
                <span className="text-[#64748B]">➔</span>
                <span className="text-[#F59E0B]">{activeScenario.afterStats.gloss}</span>
              </div>
              <p className="text-xs text-[#94A3B8] mt-1.5 leading-relaxed font-normal">
                Measured with precision 60° digital micro-gloss meter before and after 2-stage rotary compounding.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#111622]/90 border border-white/10 hover:border-[#10B981]/40 transition-all flex items-start gap-4 shadow-xl card-hover">
            <div className="w-11 h-11 rounded-xl bg-[#10B981]/10 border border-[#10B981]/25 flex items-center justify-center flex-shrink-0 text-[#10B981]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase font-bold text-[#94A3B8] font-mono tracking-wider">Defect Elimination Rate</div>
              <div className="text-xl font-black text-[#10B981] font-mono mt-0.5">
                95%+ Clear Coat Purity
              </div>
              <p className="text-xs text-[#94A3B8] mt-1.5 leading-relaxed font-normal">
                Zero buffer trails or holograms. OEM clear coat thickness preserved safely within 2-4 microns.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#111622]/90 border border-white/10 hover:border-[#F59E0B]/40 transition-all flex items-start gap-4 shadow-xl card-hover">
            <div className="w-11 h-11 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/25 flex items-center justify-center flex-shrink-0 text-[#F59E0B]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase font-bold text-[#94A3B8] font-mono tracking-wider">Warranty & Longevity</div>
              <div className="text-xl font-black text-[#F59E0B] font-mono mt-0.5">
                3-Year Certified Bond
              </div>
              <p className="text-xs text-[#94A3B8] mt-1.5 leading-relaxed font-normal">
                Permanent chemical cross-link bonding with serialized digital certificate and atelier warranty.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
