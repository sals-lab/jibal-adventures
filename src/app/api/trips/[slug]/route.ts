// =============================================================================
// GET /api/trips/[slug] — Get single trip with departures
// =============================================================================

import { NextResponse } from "next/server";
import {
  fetchTripBySlug,
  expandTripWithTripDates,
  expandTripWithGuides,
} from "@/lib/airtable";
import { notFound, errorResponse } from "@/lib/errors";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { slug } = await params;

    if (!slug) {
      throw notFound("Trip");
    }

    const trip = await fetchTripBySlug(slug);

    if (!trip) {
      throw notFound("Trip");
    }

    const tripWithDates = await expandTripWithTripDates(trip);
    const tripWithAll = await expandTripWithGuides(tripWithDates);

    return NextResponse.json({
      data: tripWithAll,
    });
  } catch (error) {
    console.error("Error fetching trip:", error);
    return errorResponse(error);
  }
}
