// =============================================================================
// GET /api/trips — List all active trips with their departures
// =============================================================================

import { NextResponse } from "next/server";
import { fetchActiveTrips, expandTripsWithTripDates } from "@/lib/airtable";
import { errorResponse } from "@/lib/errors";

export async function GET() {
  try {
    // Fetch all active trips
    const trips = await fetchActiveTrips();

    // Add trip dates (departures) to each trip
    const tripsWithDates = await expandTripsWithTripDates(trips);

    return NextResponse.json({
      data: tripsWithDates,
      meta: {
        total: tripsWithDates.length,
      },
    });
  } catch (error) {
    console.error("Error fetching trips:", error);
    return errorResponse(error);
  }
}
