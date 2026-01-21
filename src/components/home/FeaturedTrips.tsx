import Link from "next/link";
import { Container } from "@/components/ui/Section";
import { Trip } from "@/types";

// =============================================================================
// FEATURED TRIPS SECTION
// =============================================================================
// Displays featured trips from the API as cards.
// =============================================================================

interface FeaturedTripsProps {
  trips: Trip[];
}

export function FeaturedTrips({ trips }: FeaturedTripsProps) {
  return (
    <section className="py-20 md:py-28 bg-[#F2F2F2]">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-[#BABCA7] text-sm font-medium tracking-widest uppercase mb-3">
            Explore Our Adventures
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#121E1E] mb-4">
            Featured Trips
          </h2>
          <p className="text-[#5A6666] text-lg max-w-2xl mx-auto">
            Handpicked expeditions for unforgettable mountain experiences
          </p>
        </div>

        {/* Trips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/trips"
            className="inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 bg-[#121E1E] text-white hover:bg-[#1E2D2D] h-14 px-8 text-lg"
          >
            View All Trips
          </Link>
        </div>
      </Container>
    </section>
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
              <span>{`${trip.duration} days`}</span>
            </div>
            <div className="text-right">
              <span className="text-[#121E1E] font-bold text-lg">
                ${trip.price.toLocaleString()}
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
