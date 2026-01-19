// src/types/trip.ts

export interface Photo {
  url: string;
  filename: string;
  width?: number;
  height?: number;
  thumbnailUrl?: string;
}

export interface Guide {
  id: string;
  name: string;
  photo?: Photo;
  bio?: string;
  tripIds?: string[];
}

export interface TripDate {
  id: string;
  name: string;
  tripId: string;
  startDate: string;
  endDate: string;
  guideId: string | null;
  maxCapacity: number;
  spotsLeft: number;
  price: number | null;
  status: "open" | "closed" | "full";
  applicationCount: number;
  guide?: Guide;
}

export interface Trip {
  id: string;
  name: string;
  slug: string;
  description: string;
  overview?: string;
  price: number;
  depositAmount?: number;
  photos: Photo[];
  difficulty: string;
  continent: string;
  duration: number;
  fitnessLevel?: string;
  itinerary?: string | null;
  included?: string | null;
  notIncluded?: string | null;
  type?: string | null;
  status: string;
  tripDates: TripDate[];
  guides: Guide[];
}
