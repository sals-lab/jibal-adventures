import Link from "next/link";
import { Container } from "@/components/ui/Section";

export const dynamic = "force-dynamic";
// =============================================================================
// ALL TRIPS PAGE
// =============================================================================

interface Trip {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  duration: string;
  difficulty: string;
  continent: string;
  photos: { url: string; filename: string }[];
}

async function getTrips(): Promise<Trip[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/trips`);

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Failed to fetch trips:", error);
    return [];
  }
}

export default async function TripsPage({
  searchParams,
}: {
  searchParams: Promise<{ continent?: string; difficulty?: string }>;
}) {
  // Await searchParams in Next.js 15+
  const params = await searchParams;

  const allTrips = await getTrips();

  // Filter trips based on search params
  let filteredTrips = allTrips;

  if (params.continent) {
    filteredTrips = filteredTrips.filter(
      (trip) =>
        trip.continent?.toLowerCase() === params.continent?.toLowerCase()
    );
  }

  if (params.difficulty) {
    filteredTrips = filteredTrips.filter(
      (trip) =>
        trip.difficulty?.toLowerCase() === params.difficulty?.toLowerCase()
    );
  }

  // Get unique values for filters
  const continents = [
    ...new Set(allTrips.map((trip) => trip.continent).filter(Boolean)),
  ];
  const difficulties = [
    ...new Set(allTrips.map((trip) => trip.difficulty).filter(Boolean)),
  ];

  return (
    <>
      {/* Hero Banner */}
      <section className="relative py-20 md:py-28 bg-[#121E1E]">
        <Container>
          <div className="text-center">
            <p className="text-[#BABCA7] text-sm font-medium tracking-widest uppercase mb-3">
              Explore Our Adventures
            </p>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              style={{ color: "#FFFFFF" }}
            >
              All Trips
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Discover your next mountain adventure from our collection of
              expertly crafted expeditions
            </p>
          </div>
        </Container>
      </section>

      {/* Filters & Trips */}
      <section className="py-12 md:py-16 bg-[#F2F2F2]">
        <Container>
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <span className="text-[#5A6666] font-medium">Filter by:</span>

            {/* Continent Filter */}
            <div className="flex flex-wrap gap-2">
              <FilterButton
                href="/trips"
                active={!params.continent && !params.difficulty}
              >
                All
              </FilterButton>
              {continents.map((continent) => (
                <FilterButton
                  key={continent}
                  href={`/trips?continent=${encodeURIComponent(continent)}`}
                  active={
                    params.continent?.toLowerCase() === continent.toLowerCase()
                  }
                >
                  {continent}
                </FilterButton>
              ))}
            </div>

            {/* Difficulty Filter */}
            {difficulties.length > 0 && (
              <>
                <span className="text-[#5A6666] mx-2">|</span>
                <div className="flex flex-wrap gap-2">
                  {difficulties.map((difficulty) => (
                    <FilterButton
                      key={difficulty}
                      href={`/trips?difficulty=${encodeURIComponent(
                        difficulty
                      )}`}
                      active={
                        params.difficulty?.toLowerCase() ===
                        difficulty.toLowerCase()
                      }
                    >
                      {difficulty}
                    </FilterButton>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Results Count */}
          <p className="text-[#5A6666] mb-8">
            Showing {filteredTrips.length}{" "}
            {filteredTrips.length === 1 ? "trip" : "trips"}
          </p>

          {/* Trips Grid */}
          {filteredTrips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-[#5A6666] text-lg mb-4">
                No trips found matching your criteria.
              </p>
              <Link
                href="/trips"
                className="inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 bg-[#121E1E] text-white hover:bg-[#1E2D2D] h-12 px-6"
              >
                View All Trips
              </Link>
            </div>
          )}
        </Container>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-20 bg-[#121E1E]">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ color: "#BABCA7" }}
            >
              Never Miss an Adventure
            </h2>
            <p className="text-white/70 mb-8">
              Subscribe to our newsletter for new trip announcements and
              exclusive offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-12 px-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-[#BABCA7]"
              />
              <button
                type="submit"
                className="h-12 px-6 rounded-xl bg-[#BABCA7] text-[#121E1E] font-semibold hover:bg-[#D1D3C4] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </Container>
      </section>
    </>
  );
}

// =============================================================================
// FILTER BUTTON COMPONENT
// =============================================================================

function FilterButton({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
        active
          ? "bg-[#121E1E] text-white"
          : "bg-white text-[#5A6666] hover:bg-[#E8E8E8]"
      }`}
    >
      {children}
    </Link>
  );
}

// =============================================================================
// TRIP CARD COMPONENT
// =============================================================================

function TripCard({ trip }: { trip: Trip }) {
  const imageUrl =
    trip.photos?.[0]?.url ||
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800";

  return (
    <Link href={`/trips/${trip.slug}`} className="group block">
      <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full">
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={imageUrl}
            alt={trip.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Difficulty Badge */}
          <span
            className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
              trip.difficulty
            )}`}
          >
            {trip.difficulty}
          </span>
          {/* Continent Badge */}
          <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium bg-white/90 text-[#121E1E]">
            {trip.continent}
          </span>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-[#121E1E] mb-2 group-hover:text-[#1E2D2D] transition-colors">
            {trip.name}
          </h3>
          <p className="text-[#5A6666] text-sm mb-4 line-clamp-2">
            {trip.description}
          </p>

          {/* Details */}
          <div className="flex items-center justify-between pt-4 border-t border-[#E8E8E8]">
            <div className="flex items-center gap-2 text-[#5A6666] text-sm">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{trip.duration} days</span>
            </div>
            <div className="text-right">
              <span className="text-[#121E1E] font-bold text-lg">
                ${trip.price?.toLocaleString()}
              </span>
              <span className="text-[#5A6666] text-sm"> / person</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function getDifficultyColor(difficulty: string): string {
  switch (difficulty?.toLowerCase()) {
    case "easy":
      return "bg-green-100 text-green-800";
    case "moderate":
      return "bg-blue-100 text-blue-800";
    case "challenging":
      return "bg-amber-100 text-amber-800";
    case "extreme":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
