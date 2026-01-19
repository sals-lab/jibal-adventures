import { Hero } from "@/components/home/Hero";
import { FeaturedTrips } from "@/components/home/FeaturedTrips";
import { JibalDifference } from "@/components/home/JibalDifference";
import { FAQ } from "@/components/home/FAQ";
import { CTA } from "@/components/home/CTA";

// =============================================================================
// HOME PAGE
// =============================================================================

async function getTrips() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/trips`, {
      cache: "no-store",
    });

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

export default async function Home() {
  const trips = await getTrips();

  // Show up to 3 featured trips
  const featuredTrips = trips.slice(0, 3);

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
