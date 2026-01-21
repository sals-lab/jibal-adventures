import { Hero } from "@/components/home/Hero";
import { FeaturedTrips } from "@/components/home/FeaturedTrips";
import { JibalDifference } from "@/components/home/JibalDifference";
import { FAQ } from "@/components/home/FAQ";
import { CTA } from "@/components/home/CTA";
import { fetchActiveTrips, expandTripsWithTripDates } from "@/lib/airtable";

export const dynamic = "force-dynamic";

// =============================================================================
// HOME PAGE
// =============================================================================

export default async function Home() {
  const trips = await fetchActiveTrips();
  const tripsWithDates = await expandTripsWithTripDates(trips);

  // Show all featured trips
  const featuredTrips = tripsWithDates.filter((trip) => trip.featured);

  return (
    <>
      <Hero />
      <FeaturedTrips trips={featuredTrips} />
      <JibalDifference />
      <FAQ />
      <CTA />
    </>
  );
}
