// =============================================================================
// Jibal Adventures — TypeScript Types
// =============================================================================

// -----------------------------------------------------------------------------
// Airtable Base Types
// -----------------------------------------------------------------------------

/** Airtable attachment object (photos, documents) */
export interface AirtableAttachment {
  id: string;
  url: string;
  filename: string;
  size: number;
  type: string;
  width?: number;
  height?: number;
  thumbnails?: {
    small: { url: string; width: number; height: number };
    large: { url: string; width: number; height: number };
    full?: { url: string; width: number; height: number };
  };
}

/** Simplified attachment for API responses */
export interface Attachment {
  url: string;
  filename: string;
  width?: number;
  height?: number;
  thumbnailUrl?: string;
}

/** Airtable linked record (array of record IDs) */
export type LinkedRecordIds = string[];

// -----------------------------------------------------------------------------
// Enums / Literal Types
// -----------------------------------------------------------------------------

export const TRIP_STATUS = {
  DRAFT: "draft",
  ACTIVE: "active",
  ARCHIVED: "archived",
} as const;

export type TripStatus = (typeof TRIP_STATUS)[keyof typeof TRIP_STATUS];

export const TRIP_DIFFICULTY = {
  EASY: "easy",
  MODERATE: "moderate",
  CHALLENGING: "challenging",
  EXTREME: "extreme",
} as const;

export type TripDifficulty =
  (typeof TRIP_DIFFICULTY)[keyof typeof TRIP_DIFFICULTY];

export const FITNESS_LEVEL = {
  BEGINNER: "beginner",
  INTERMEDIATE: "intermediate",
  ADVANCED: "advanced",
  ATHLETE: "athlete",
} as const;

export type FitnessLevel = (typeof FITNESS_LEVEL)[keyof typeof FITNESS_LEVEL];

export const APPLICATION_STATUS = {
  APPLIED: "applied",
  CALLED: "called",
  APPROVED: "approved",
  PAID_DEPOSIT: "paid_deposit",
  PAID_FULL: "paid_full",
  CANCELLED: "cancelled",
  REJECTED: "rejected",
} as const;

export type ApplicationStatus =
  (typeof APPLICATION_STATUS)[keyof typeof APPLICATION_STATUS];

export const CONTINENT = {
  AFRICA: "Africa",
  ASIA: "Asia",
  EUROPE: "Europe",
  NORTH_AMERICA: "North America",
  SOUTH_AMERICA: "South America",
  OCEANIA: "Oceania",
  ANTARCTICA: "Antarctica",
} as const;

export type Continent = (typeof CONTINENT)[keyof typeof CONTINENT];

export const TRIP_DATE_STATUS = {
  OPEN: "open",
  LIMITED: "limited",
  SOLD_OUT: "sold_out",
  CANCELLED: "cancelled",
} as const;

export type TripDateStatus =
  (typeof TRIP_DATE_STATUS)[keyof typeof TRIP_DATE_STATUS];

// -----------------------------------------------------------------------------
// Trip
// -----------------------------------------------------------------------------

/** Raw Airtable fields for Trips table */
export interface TripAirtableFields {
  [key: string]: any;
  name: string;
  slug: string;
  description: string;
  overview?: string;
  price: number;
  depositAmount: number;
  photos?: readonly AirtableAttachment[];
  difficulty: TripDifficulty;
  continent: Continent;
  duration: number;
  fitnessLevel: FitnessLevel;
  itinerary?: string;
  guides?: LinkedRecordIds;
  status: TripStatus;
  included?: string;
  notIncluded?: string;
  type?: string;
  "Trip Dates"?: LinkedRecordIds;
  maxGroupSize?: number;
  featured?: boolean;
}

/** Trip record from Airtable (includes record ID) */
export interface TripRecord {
  id: string;
  fields: TripAirtableFields;
  createdTime: string;
}

/** Normalized Trip for API responses */
export interface Trip {
  id: string;
  name: string;
  slug: string;
  description: string;
  overview: string | null;
  price: number;
  depositAmount: number;
  photos: Attachment[];
  difficulty: TripDifficulty;
  continent: Continent;
  duration: number;
  fitnessLevel: FitnessLevel;
  itinerary: string | null;
  guideIds: string[];
  guides?: Guide[];
  status: TripStatus;
  included: string | null;
  notIncluded: string | null;
  type: string | null;
  createdAt: string;
  tripDateIds: string[];
  tripDates?: TripDate[];
  maxGroupSize?: number;
  featured?: boolean;
}

// -----------------------------------------------------------------------------
// Trip Dates
// -----------------------------------------------------------------------------

/** Raw Airtable fields for Trip Dates table */
export interface TripDateAirtableFields {
  [key: string]: any;
  name?: string;
  Trip?: LinkedRecordIds;
  "Start Date"?: string;
  "End Date"?: string;
  Guide?: LinkedRecordIds;
  "Max Capacity"?: number;
  "Spots Left"?: number;
  Price?: number;
  Status?: TripDateStatus;
  Applied?: LinkedRecordIds;
  "Application Count"?: number;
}

/** Trip Date record from Airtable */
export interface TripDateRecord {
  id: string;
  fields: TripDateAirtableFields;
  createdTime: string;
}

/** Normalized Trip Date for API responses */
export interface TripDate {
  id: string;
  name: string;
  tripId: string | null;
  trip?: Trip;
  startDate: string;
  endDate: string;
  guideId: string | null;
  guide?: Guide;
  maxCapacity: number;
  spotsLeft: number;
  price: number | null;
  status: TripDateStatus;
  applicationCount: number;
}

// -----------------------------------------------------------------------------
// Guide
// -----------------------------------------------------------------------------

/** Raw Airtable fields for Guides table */
export interface GuideAirtableFields {
  [key: string]: any;
  name: string;
  photo?: readonly AirtableAttachment[];
  bio?: string;
  "trips assigned"?: LinkedRecordIds;
  Departures?: LinkedRecordIds;
}

/** Guide record from Airtable */
export interface GuideRecord {
  id: string;
  fields: GuideAirtableFields;
  createdTime: string;
}

/** Normalized Guide for API responses */
export interface Guide {
  id: string;
  name: string;
  photo: Attachment | null;
  bio: string | null;
  tripIds: string[];
}

// -----------------------------------------------------------------------------
// Application
// -----------------------------------------------------------------------------

/** Raw Airtable fields for Applications table */
export interface ApplicationAirtableFields {
  [key: string]: any;
  trip?: LinkedRecordIds;
  departure?: LinkedRecordIds;
  customerName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  passportPhoto?: readonly AirtableAttachment[];
  fitnessLevel: FitnessLevel;
  experience?: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  allergies: string;
  medications: string;
  dietaryRestrictions: string;
  howDidYouHear: string;
  termsSignature: string;
  termsAcceptedAt: string;
  status: ApplicationStatus;
  "calendar booking link"?: string;
  appliedDate?: string;
  adminNotes?: string;
  calendarBookingTime?: string;
}

/** Application record from Airtable */
export interface ApplicationRecord {
  id: string;
  fields: ApplicationAirtableFields;
  createdTime: string;
}

/** Normalized Application for API responses */
export interface Application {
  id: string;
  tripId: string | null;
  trip?: Trip;
  departureId: string | null;
  departure?: TripDate;
  customerName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  passportPhoto: Attachment | null;
  fitnessLevel: FitnessLevel;
  experience: string | null;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  allergies: string;
  medications: string;
  dietaryRestrictions: string;
  howDidYouHear: string;
  termsSignature: string;
  termsAcceptedAt: string;
  status: ApplicationStatus;
  calendarBookingLink: string | null;
  calendarBookingTime: string | null;
  appliedDate: string;
  adminNotes: string | null;
}

// -----------------------------------------------------------------------------
// Newsletter
// -----------------------------------------------------------------------------

/** Raw Airtable fields for Newsletter table */
export interface NewsletterAirtableFields {
  [key: string]: any;
  Email: string;
  "Subscribed At"?: string;
  Source?: string;
}

/** Newsletter record from Airtable */
export interface NewsletterRecord {
  id: string;
  fields: NewsletterAirtableFields;
  createdTime: string;
}

/** Normalized Newsletter subscriber for API responses */
export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  source: string | null;
}

// -----------------------------------------------------------------------------
// API Response Types
// -----------------------------------------------------------------------------

/** Standard API error response */
export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

/** Standard API success response wrapper */
export interface ApiResponse<T> {
  data: T;
  meta?: {
    total?: number;
    page?: number;
    pageSize?: number;
  };
}

/** Paginated list response */
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    hasMore: boolean;
  };
}
