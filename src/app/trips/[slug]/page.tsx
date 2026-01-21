import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Section";
import { ItineraryAccordion } from "@/components/trips/ItineraryAccordion.tsx";
import { TripNavTabs } from "@/components/trips/TripNavTabs";
import { DatesTable } from "@/components/trips/DatesTable";
import { PhotoGallery } from "@/components/trips/PhotoGallery";
import {
  fetchTripBySlug,
  expandTripWithTripDates,
  expandTripWithGuides,
} from "@/lib/airtable";

export const dynamic = "force-dynamic";

// =============================================================================
// TRIP DETAIL PAGE
// =============================================================================

export default async function TripDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch trip directly from Airtable
  const baseTrip = await fetchTripBySlug(slug);

  if (!baseTrip) {
    notFound();
  }

  // Expand with related data
  const tripWithDates = await expandTripWithTripDates(baseTrip);
  const trip = await expandTripWithGuides(tripWithDates);

  const heroImage =
    trip.photos?.[0]?.url ||
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070";
  const mainGuide = trip.guides?.[0];

  const availableDepartures =
    trip.tripDates?.filter(
      (d) => d.status === "open" || d.status === "limited"
    ) || [];

  return (
    <>
      {/* ================================================================== */}
      {/* HERO SECTION */}
      {/* ================================================================== */}
      <section className="relative h-[70vh] md:h-[80vh] flex flex-col">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${heroImage}')` }}
        />

        {/* Content */}
        <Container className="relative z-10 flex-1 flex flex-col justify-end pb-8">
          {/* Badges Row */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
                trip.difficulty
              )}`}
            >
              {trip.difficulty}
            </span>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white backdrop-blur-sm">
              {trip.continent}
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl"
            style={{
              color: "#FFFFFF",
              textShadow:
                "0 4px 20px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.9)",
            }}
          >
            {trip.name}
          </h1>

          {/* Tagline */}
          <p
            className="text-lg md:text-xl text-white mb-8 max-w-2xl"
            style={{
              textShadow: "0 4px 20px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,1)",
            }}
          >
            {trip.description}
          </p>
          {/* Quick Info Bar */}

          <div
            className="flex flex-wrap items-center gap-6 md:gap-8"
            style={{
              textShadow: "0 4px 20px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,1)",
            }}
          >
            <QuickInfoItem
              icon={<CalendarIcon />}
              label="Duration"
              value={`${trip.duration} Days`}
            />
            <QuickInfoItem
              icon={<MountainIcon />}
              label="Difficulty"
              value={trip.difficulty}
            />
            <QuickInfoItem
              icon={<UsersIcon />}
              label="Group Size"
              value={`Max ${trip.maxGroupSize}`}
            />
          </div>
        </Container>
      </section>

      {/* ================================================================== */}
      {/* STICKY NAV TABS */}
      {/* ================================================================== */}
      <TripNavTabs />

      {/* ================================================================== */}
      {/* MAIN CONTENT */}
      {/* ================================================================== */}
      <section className="py-12 md:py-16 bg-[#F2F2F2]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* ============================================================ */}
            {/* LEFT COLUMN - Trip Content */}
            {/* ============================================================ */}
            <div className="lg:col-span-2 space-y-12">
              {/* GUIDE CARD */}
              {mainGuide && (
                <div
                  id="overview"
                  className="bg-white rounded-2xl p-6 flex items-center gap-5"
                >
                  <div className="w-20 h-20 rounded-full bg-[#BABCA7] flex-shrink-0 overflow-hidden">
                    {mainGuide.photo?.url ? (
                      <img
                        src={mainGuide.photo.url}
                        alt={mainGuide.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#121E1E] text-2xl font-bold">
                        {mainGuide.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-[#5A6666] mb-1">Led by</p>
                    <h3 className="text-xl font-bold text-[#121E1E]">
                      {mainGuide.name}
                    </h3>
                    <p className="text-sm text-[#5A6666] mt-1 line-clamp-2">
                      {mainGuide.bio}
                    </p>
                  </div>
                </div>
              )}

              {/* TRIP OVERVIEW */}
              <div className="bg-white rounded-2xl p-6 md:p-8">
                <h2
                  className="text-2xl font-bold mb-6"
                  style={{ color: "#121E1E" }}
                >
                  Trip Overview
                </h2>
                <p className="text-[#5A6666] leading-relaxed">
                  {trip.overview || trip.description}
                </p>
              </div>

              {/* WHO THIS TRIP IS FOR */}
              <div className="bg-[#121E1E] rounded-2xl p-6 md:p-8">
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{ color: "#BABCA7" }}
                >
                  Who This Trip Is For
                </h2>
                <p className="text-white/80 leading-relaxed">
                  This expedition is designed for adventurous travelers with{" "}
                  {trip.fitnessLevel?.toLowerCase() || "moderate"} fitness
                  levels who are comfortable hiking 6-8 hours per day. Previous
                  trekking experience is recommended but not required. You
                  should have a spirit of adventure and be prepared for variable
                  weather conditions.
                </p>
              </div>

              {/* DATES & PRICES */}
              <div id="dates" className="bg-white rounded-2xl p-6 md:p-8">
                <h2
                  className="text-2xl font-bold mb-6"
                  style={{ color: "#121E1E" }}
                >
                  Dates & Prices
                </h2>

                <DatesTable
                  departures={trip.tripDates || []}
                  basePrice={trip.price}
                  tripSlug={trip.slug}
                />

                {/* Payment Information */}
                <div className="mt-8 pt-6 border-t border-[#E8E8E8]">
                  <h3 className="font-bold text-[#121E1E] mb-4">
                    Payment Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-[#F2F2F2] rounded-xl">
                      <p className="text-sm text-[#5A6666]">Deposit Required</p>
                      <p className="text-lg font-bold text-[#121E1E]">
                        ${trip.depositAmount || 250}
                      </p>
                      <p className="text-xs text-[#5A6666] mt-1">
                        Due at booking
                      </p>
                    </div>
                    <div className="p-4 bg-[#F2F2F2] rounded-xl">
                      <p className="text-sm text-[#5A6666]">
                        Cancellation Policy
                      </p>
                      <p className="text-lg font-bold text-[#121E1E]">
                        Flexible
                      </p>
                      <p className="text-xs text-[#5A6666] mt-1">
                        Full refund 60+ days before
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* WHAT'S INCLUDED */}
              <div
                id="inclusions"
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {trip.included && (
                  <div className="bg-white rounded-2xl p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-[#121E1E]">
                      <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      What's Included
                    </h3>
                    <ul className="space-y-3">
                      {trip.included.split(",").map((item, i) => (
                        <li
                          key={i}
                          className="text-[#5A6666] text-sm flex items-start gap-3"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                          {item.trim()}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {trip.notIncluded && (
                  <div className="bg-white rounded-2xl p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-[#121E1E]">
                      <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-red-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </span>
                      Not Included
                    </h3>
                    <ul className="space-y-3">
                      {trip.notIncluded.split(",").map((item, i) => (
                        <li
                          key={i}
                          className="text-[#5A6666] text-sm flex items-start gap-3"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                          {item.trim()}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* DAY-BY-DAY ITINERARY */}
              {trip.itinerary && (
                <div id="itinerary" className="bg-white rounded-2xl p-6 md:p-8">
                  <h2
                    className="text-2xl font-bold mb-6"
                    style={{ color: "#121E1E" }}
                  >
                    Day-by-Day Itinerary
                  </h2>
                  <ItineraryAccordion itinerary={trip.itinerary} />
                </div>
              )}

              {/* PHOTO GALLERY */}
              {trip.photos && trip.photos.length > 1 && (
                <div id="gallery" className="bg-white rounded-2xl p-6 md:p-8">
                  <h2
                    className="text-2xl font-bold mb-6"
                    style={{ color: "#121E1E" }}
                  >
                    Photo Gallery
                  </h2>
                  <PhotoGallery photos={trip.photos} tripName={trip.name} />
                </div>
              )}
            </div>

            {/* ============================================================ */}
            {/* RIGHT COLUMN - Sticky Booking Card */}
            {/* ============================================================ */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
                {/* Price */}
                <div className="text-center mb-6 pb-6 border-b border-[#E8E8E8]">
                  <p className="text-[#5A6666] text-sm mb-1">From</p>
                  <p className="text-4xl font-bold text-[#121E1E]">
                    ${trip.price?.toLocaleString()}
                  </p>
                  <p className="text-[#5A6666] text-sm">per person</p>
                </div>

                {/* Trip Quick Info */}
                <div className="space-y-4 mb-6">
                  <InfoRow label="Duration" value={`${trip.duration} days`} />
                  <InfoRow label="Difficulty" value={trip.difficulty} />
                  <InfoRow label="Fitness Level" value={trip.fitnessLevel} />
                  <InfoRow
                    label="Deposit"
                    value={`$${trip.depositAmount || 250}`}
                  />
                </div>

                {/* Next Available Date */}
                {availableDepartures.length > 0 && (
                  <div className="mb-6 p-4 bg-[#F2F2F2] rounded-xl">
                    <p className="text-sm text-[#5A6666] mb-1">
                      Next Departure
                    </p>
                    <p className="font-bold text-[#121E1E]">
                      {formatDate(availableDepartures[0].startDate)}
                    </p>
                    <p className="text-sm text-green-600 mt-1">
                      {availableDepartures[0].spotsLeft} spots available
                    </p>
                  </div>
                )}

                {/* CTA Button */}
                <Link
                  href={`/trips/${trip.slug}/apply`}
                  className="block w-full text-center font-semibold rounded-xl transition-all duration-200 bg-[#BABCA7] text-[#121E1E] hover:bg-[#D1D3C4] py-4 text-lg"
                >
                  Apply Now
                </Link>

                {/* Contact */}
                <p className="text-center text-[#5A6666] text-sm mt-6">
                  Questions?{" "}
                  <Link
                    href="/contact"
                    className="text-[#121E1E] underline hover:no-underline"
                  >
                    Contact us
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================== */}
      {/* FINAL CTA SECTION */}
      {/* ================================================================== */}
      <section className="py-16 md:py-20 bg-[#121E1E]">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: "#BABCA7" }}
            >
              Ready for Your Adventure?
            </h2>
            <p className="text-white/70 mb-8">
              Secure your spot on the {trip.name}. Spaces are limited to ensure
              an intimate experience.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <div className="text-center">
                <p className="text-white/50 text-sm">From</p>
                <p className="text-2xl font-bold text-white">
                  ${trip.price?.toLocaleString()}
                </p>
              </div>
              <div className="hidden sm:block w-px h-12 bg-white/20" />
              <div className="text-center">
                <p className="text-white/50 text-sm">Duration</p>
                <p className="text-2xl font-bold text-white">
                  {trip.duration} Days
                </p>
              </div>
              <div className="hidden sm:block w-px h-12 bg-white/20" />
              <div className="text-center">
                <p className="text-white/50 text-sm">Next Trip</p>
                <p className="text-2xl font-bold text-white">
                  {availableDepartures.length > 0
                    ? formatDateShort(availableDepartures[0].startDate)
                    : "TBA"}
                </p>
              </div>
            </div>

            <Link
              href={`/trips/${trip.slug}/apply`}
              className="inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 bg-[#BABCA7] text-[#121E1E] hover:bg-[#D1D3C4] h-14 px-10 text-lg"
            >
              Apply Now
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

function QuickInfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
        {icon}
      </div>
      <div>
        <p className="text-white/70 text-xs font-semibold">{label}</p>
        <p className="text-white font-semibold">{value}</p>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[#5A6666] text-sm">{label}</span>
      <span className="font-medium text-[#121E1E]">{value}</span>
    </div>
  );
}

// =============================================================================
// ICONS
// =============================================================================

function CalendarIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}

function MountainIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4 20l4.5-9 3.5 5 4-7 4 11H4z"
      />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

// =============================================================================
// HELPERS
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

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatDateShort(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}
