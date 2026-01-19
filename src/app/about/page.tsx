import Link from "next/link";
import { Container } from "@/components/ui/Section";

// =============================================================================
// ABOUT PAGE
// =============================================================================

export default function AboutPage() {
  return (
    <>
      {/* ================================================================== */}
      {/* HERO SECTION - LIGHT */}
      {/* ================================================================== */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 bg-[#BABCA7]/30 text-[#121E1E] text-xs font-semibold rounded-full mb-6">
              OUR STORY
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#121E1E] mb-6">
              Adventures That Transform
            </h1>
            <p className="text-xl text-[#5A6666] leading-relaxed">
              Jibal Adventures was born from a simple belief: the mountains have
              the power to change us. We create journeys that challenge,
              inspire, and connect you to the world's most breathtaking
              landscapes.
            </p>
          </div>
        </Container>
      </section>

      {/* ================================================================== */}
      {/* FOUNDER SECTION - SIDE BY SIDE */}
      {/* ================================================================== */}
      <section className="py-16 md:py-24 bg-[#F2F2F2]">
        <Container>
          <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">
            {/* Image - Left Side */}
            <div className="relative flex-shrink-0">
              <div className="w-64 md:w-72 lg:w-80 aspect-[3/4] rounded-2xl overflow-hidden bg-[#E8E8E8]">
                {/* Replace with actual founder photo */}
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=533&fit=crop"
                  alt="Founder"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#BABCA7]/30 rounded-2xl -z-10" />
            </div>

            {/* Content - Right Side */}
            <div className="flex-1">
              <span className="inline-block px-3 py-1 bg-[#BABCA7]/30 text-[#121E1E] text-xs font-semibold rounded-full mb-4">
                MEET THE FOUNDER
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#121E1E] mb-6">
                From First Summit to Jibal Adventures
              </h2>
              <div className="space-y-4 text-[#5A6666] leading-relaxed">
                <p>
                  My journey began at 19, standing at the base of Mount Toubkal
                  in Morocco. That first summit changed everything—not just how
                  I saw the mountains, but how I saw myself.
                </p>
                <p>
                  After years of exploring peaks across four continents, I
                  founded Jibal Adventures with a mission: to share these
                  transformative experiences with others. "Jibal" means
                  "mountains" in Arabic, a tribute to both my roots and the
                  landscapes that shaped me.
                </p>
                <p>
                  Today, we partner with expert local guides to create
                  adventures that are exhilarating yet safe, exotic yet
                  reliable. Every trip is designed to push your limits while
                  ensuring you're supported every step of the way.
                </p>
              </div>
              <div className="mt-8">
                <p className="font-bold text-[#121E1E] text-lg">Zooky</p>
                <p className="text-[#5A6666]">Founder, Jibal Adventures</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================== */}
      {/* MISSION & VALUES */}
      {/* ================================================================== */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 bg-[#BABCA7]/30 text-[#121E1E] text-xs font-semibold rounded-full mb-4">
              WHAT WE BELIEVE
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#121E1E] mb-6">
              Our Mission & Values
            </h2>
            <p className="text-[#5A6666] text-lg">
              We're on a mission to make world-class mountain adventures
              accessible to those ready to challenge themselves and discover
              what they're capable of.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard
              icon={<ShieldIcon />}
              title="Safety First"
              description="Every adventure is meticulously planned with safety as our foundation. Expert guides, quality equipment, and thorough preparation ensure you can focus on the experience."
            />
            <ValueCard
              icon={<HeartIcon />}
              title="Authentic Experiences"
              description="We go beyond tourist trails to create genuine connections with local cultures, communities, and landscapes. Every journey tells a story."
            />
            <ValueCard
              icon={<UsersIcon />}
              title="Small Groups"
              description="Intimate group sizes mean personalized attention, stronger bonds, and minimal environmental impact. Quality over quantity, always."
            />
          </div>
        </Container>
      </section>

      {/* ================================================================== */}
      {/* CTA SECTION */}
      {/* ================================================================== */}
      <section className="py-16 md:py-24 bg-[#F2F2F2]">
        <Container>
          <div className="bg-white rounded-3xl p-8 md:p-16 text-center border border-[#E8E8E8]">
            <h2 className="text-3xl md:text-4xl font-bold text-[#121E1E] mb-4">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-[#5A6666] text-lg mb-8 max-w-2xl mx-auto">
              Browse our upcoming expeditions and find the journey that's
              calling you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/trips"
                className="px-8 py-4 bg-[#BABCA7] text-[#121E1E] font-semibold rounded-xl hover:bg-[#D1D3C4] transition-colors"
              >
                Browse Trips
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-[#121E1E] text-white font-semibold rounded-xl hover:bg-[#1E2D2D] transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

function ValueCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-[#F2F2F2] rounded-2xl p-6 md:p-8">
      <div className="w-14 h-14 rounded-xl bg-[#BABCA7]/30 flex items-center justify-center text-[#121E1E] mb-6 mx-auto">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-[#121E1E] mb-3 text-center">
        {title}
      </h3>
      <p className="text-[#5A6666] leading-relaxed text-center">
        {description}
      </p>
    </div>
  );
}

// =============================================================================
// ICONS
// =============================================================================

function ShieldIcon() {
  return (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
}
