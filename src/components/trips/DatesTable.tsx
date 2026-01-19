"use client";

import Link from "next/link";

// =============================================================================
// DATES TABLE COMPONENT
// =============================================================================

interface TripDate {
  id: string;
  startDate: string;
  endDate: string;
  guideId: string | null;
  maxCapacity: number;
  spotsLeft: number;
  price: number | null;
  status: "open" | "limited" | "sold_out" | "cancelled";
}

interface DatesTableProps {
  departures: TripDate[];
  basePrice: number;
  tripSlug: string;
}

export function DatesTable({
  departures,
  basePrice,
  tripSlug,
}: DatesTableProps) {
  if (!departures || departures.length === 0) {
    return (
      <div className="text-center py-8 bg-[#F2F2F2] rounded-xl">
        <p className="text-[#5A6666]">No dates currently scheduled</p>
        <p className="text-sm text-[#5A6666] mt-1">
          Check back soon for new departures
        </p>
      </div>
    );
  }

  // Sort by date
  const sortedDepartures = [...departures].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  return (
    <div className="space-y-3">
      {/* Header - Desktop */}
      <div className="hidden md:grid md:grid-cols-12 gap-4 px-4 py-2 text-sm font-medium text-[#5A6666]">
        <div className="col-span-4">Dates</div>
        <div className="col-span-3">Price</div>
        <div className="col-span-2">Availability</div>
        <div className="col-span-3"></div>
      </div>

      {/* Rows */}
      {sortedDepartures.map((departure) => {
        const price = departure.price || basePrice;
        const isAvailable =
          departure.status === "open" || departure.status === "limited";

        return (
          <div
            key={departure.id}
            className={`border rounded-xl p-4 transition-all duration-200 ${
              isAvailable
                ? "border-[#E8E8E8] hover:border-[#BABCA7] hover:shadow-md"
                : "border-[#E8E8E8] bg-[#F9F9F9] opacity-60"
            }`}
          >
            <div className="md:grid md:grid-cols-12 md:gap-4 md:items-center">
              {/* Dates */}
              <div className="col-span-4 mb-3 md:mb-0">
                <p className="font-semibold text-[#121E1E]">
                  {formatDate(departure.startDate)}
                </p>
                <p className="text-sm text-[#5A6666]">
                  to {formatDate(departure.endDate)}
                </p>
              </div>

              {/* Price */}
              <div className="col-span-3 mb-3 md:mb-0">
                <p className="text-xl font-bold text-[#121E1E]">
                  ${price.toLocaleString()}
                </p>
                <p className="text-xs text-[#5A6666]">per person</p>
              </div>

              {/* Availability */}
              <div className="col-span-2 mb-4 md:mb-0">
                <StatusBadge
                  status={departure.status}
                  spotsLeft={departure.spotsLeft}
                />
              </div>

              {/* CTA */}
              <div className="col-span-3">
                {isAvailable ? (
                  <Link
                    href={`/trips/${tripSlug}/apply?departure=${departure.id}`}
                    className="block w-full text-center font-semibold rounded-lg transition-all duration-200 bg-[#121E1E] text-white hover:bg-[#1E2D2D] py-3 text-sm"
                  >
                    Select
                  </Link>
                ) : (
                  <button
                    disabled
                    className="block w-full text-center font-semibold rounded-lg bg-[#E8E8E8] text-[#5A6666] py-3 text-sm cursor-not-allowed"
                  >
                    {departure.status === "sold_out"
                      ? "Sold Out"
                      : "Unavailable"}
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// =============================================================================
// STATUS BADGE
// =============================================================================

function StatusBadge({
  status,
  spotsLeft,
}: {
  status: string;
  spotsLeft: number;
}) {
  switch (status) {
    case "open":
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Available
        </span>
      );
    case "limited":
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
          {spotsLeft} left
        </span>
      );
    case "sold_out":
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
          Sold Out
        </span>
      );
    case "cancelled":
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          Cancelled
        </span>
      );
    default:
      return null;
  }
}

// =============================================================================
// HELPERS
// =============================================================================

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
