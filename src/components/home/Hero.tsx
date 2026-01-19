"use client";

import Link from "next/link";

// =============================================================================
// HERO SECTION
// =============================================================================
// Full-screen hero with background image, headline, and CTA.
// =============================================================================

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070')`,
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#121E1E]/60 via-[#121E1E]/40 to-[#121E1E]/80" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Tagline */}
        <p className="text-[#BABCA7] text-sm sm:text-base font-medium tracking-widest uppercase mb-6 animate-fade-in">
          Premium Adventure Travel
        </p>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
          Conquer Mountains.
          <br />
          <span className="text-[#BABCA7]">Create Memories.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10">
          Expert-led expeditions to the world's most breathtaking peaks. Small
          groups, big adventures, unforgettable experiences.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/trips"
            className="inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 bg-[#BABCA7] text-[#121E1E] hover:bg-[#D1D3C4] h-14 px-8 text-lg w-full sm:w-auto"
          >
            Explore Trips
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 border-2 border-white/30 text-white hover:bg-white/10 h-14 px-8 text-lg w-full sm:w-auto"
          >
            Our Story
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white/60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
