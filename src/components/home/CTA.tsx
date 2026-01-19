import Link from "next/link";
import { Container } from "@/components/ui/Section";

// =============================================================================
// CTA SECTION
// =============================================================================
// Final call to action section with background image.
// =============================================================================

export function CTA() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070')`,
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-[#121E1E]/85" />

      {/* Content */}
      <Container>
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            style={{ color: "#FFFFFF" }}
          >
            Ready for Your Next Adventure?
          </h2>
          <p className="text-xl text-white/80 mb-10 leading-relaxed">
            Join us on an unforgettable journey through the world's most
            spectacular mountain ranges. Your adventure awaits.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/trips"
              className="inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 bg-[#BABCA7] text-[#121E1E] hover:bg-[#D1D3C4] h-14 px-8 text-lg w-full sm:w-auto"
            >
              Browse All Trips
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 border-2 border-white/30 text-white hover:bg-white/10 h-14 px-8 text-lg w-full sm:w-auto"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
