import React from 'react';
import { HeroSection } from '../components/home/HeroSection.jsx';
import { BeforeAfterSlider } from '../components/home/BeforeAfterSlider.jsx';
import { ServiceGrid } from '../components/home/ServiceGrid.jsx';
import { WhyChooseUs } from '../components/home/WhyChooseUs.jsx';
import { ProcessTimeline } from '../components/home/ProcessTimeline.jsx';
import { TestimonialsSection } from '../components/home/TestimonialsSection.jsx';
import { CTASection } from '../components/home/CTASection.jsx';

export const HomePage = () => {
  return (
    <div className="w-full bg-[#08090C] text-[#F8FAFC]">
      {/* 1. Hero with Instant Estimator Cockpit & Scangrip Beam */}
      <HeroSection />

      {/* 2. Interactive Before/After Defect Elimination Studio */}
      <BeforeAfterSlider />

      {/* 3. Precision Preservation Packages Grid */}
      <ServiceGrid />

      {/* 4. The DetailDock Difference / 4 Atelier Pillars */}
      <WhyChooseUs />

      {/* 5. Four-Stage Client Journey Timeline */}
      <ProcessTimeline />

      {/* 6. Verified Supercar Owner Testimonials */}
      <TestimonialsSection />

      {/* 7. Final High-Impact Booking CTA Banner */}
      <CTASection />
    </div>
  );
};
