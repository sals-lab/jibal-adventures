// =============================================================================
// Jibal Adventures — Airtable Client
// =============================================================================

import Airtable from "airtable";
import type {
  AirtableAttachment,
  Attachment,
  Trip,
  TripAirtableFields,
  TripDate,
  TripDateAirtableFields,
  Guide,
  GuideAirtableFields,
  Application,
  ApplicationAirtableFields,
  NewsletterSubscriber,
  NewsletterAirtableFields,
} from "@/types";

// -----------------------------------------------------------------------------
// Environment Validation
// -----------------------------------------------------------------------------

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

if (!AIRTABLE_API_KEY) {
  throw new Error("Missing required environment variable: AIRTABLE_API_KEY");
}

if (!AIRTABLE_BASE_ID) {
  throw new Error("Missing required environment variable: AIRTABLE_BASE_ID");
}

// -----------------------------------------------------------------------------
// Airtable Client Singleton
// -----------------------------------------------------------------------------

Airtable.configure({
  apiKey: AIRTABLE_API_KEY,
});

const base = Airtable.base(AIRTABLE_BASE_ID);

// -----------------------------------------------------------------------------
// Table Names
// -----------------------------------------------------------------------------

export const TABLE_NAMES = {
  TRIPS: "tbl6IJFt8MKiHTAmd",
  TRIP_DATES: "tblkqdYgXNNKaGcaD",
  GUIDES: "tblLUcPjGAaNHsFZf",
  APPLICATIONS: "tblRUSu0KDU5eYk6e",
  NEWSLETTER: "tblELGvEpPTALzpwJ",
} as const;

// -----------------------------------------------------------------------------
// Typed Table Accessors
// -----------------------------------------------------------------------------

export const tables = {
  trips: base<TripAirtableFields>(TABLE_NAMES.TRIPS),
  tripDates: base<TripDateAirtableFields>(TABLE_NAMES.TRIP_DATES),
  guides: base<GuideAirtableFields>(TABLE_NAMES.GUIDES),
  applications: base<ApplicationAirtableFields>(TABLE_NAMES.APPLICATIONS),
  newsletter: base<NewsletterAirtableFields>(TABLE_NAMES.NEWSLETTER),
};

// -----------------------------------------------------------------------------
// Utility Functions
// -----------------------------------------------------------------------------

export function escapeAirtableString(str: string): string {
  return str.replace(/'/g, "\\'").replace(/\\/g, "\\\\");
}

// -----------------------------------------------------------------------------
// Attachment Helpers
// -----------------------------------------------------------------------------

export function parseAttachment(attachment: AirtableAttachment): Attachment {
  return {
    url: attachment.url,
    filename: attachment.filename,
    width: attachment.width,
    height: attachment.height,
    thumbnailUrl:
      attachment.thumbnails?.large?.url ?? attachment.thumbnails?.small?.url,
  };
}

export function parseAttachments(
  attachments?: readonly AirtableAttachment[]
): Attachment[] {
  if (!attachments || attachments.length === 0) return [];
  return attachments.map(parseAttachment);
}

export function parseSingleAttachment(
  attachments?: readonly AirtableAttachment[]
): Attachment | null {
  if (!attachments || attachments.length === 0) return null;
  return parseAttachment(attachments[0]);
}

// -----------------------------------------------------------------------------
// Record Transformers
// -----------------------------------------------------------------------------

export function transformTrip(
  record: Airtable.Record<TripAirtableFields>
): Trip {
  const fields = record.fields;

  return {
    id: record.id,
    name: (fields.Name as string) ?? (fields.name as string) ?? "",
    slug: (fields.Slug as string) ?? (fields.slug as string) ?? "",
    description:
      (fields.Description as string) ?? (fields.description as string) ?? "",
    overview:
      (fields.Overview as string) ?? (fields.overview as string) ?? null,
    price: (fields.Price as number) ?? (fields.price as number) ?? 0,
    depositAmount:
      (fields["Deposit Amount"] as number) ??
      (fields.depositAmount as number) ??
      0,
    photos: parseAttachments(fields.Photos ?? fields.photos),
    difficulty:
      (fields.Difficulty as Trip["difficulty"]) ??
      (fields.difficulty as Trip["difficulty"]) ??
      "moderate",
    continent:
      (fields.Continent as Trip["continent"]) ??
      (fields.continent as Trip["continent"]) ??
      "Asia",
    duration: (fields.Duration as number) ?? (fields.duration as number) ?? 0,
    fitnessLevel:
      (fields["Fitness Level"] as Trip["fitnessLevel"]) ??
      (fields.fitnessLevel as Trip["fitnessLevel"]) ??
      "intermediate",
    itinerary:
      (fields.Itinerary as string) ?? (fields.itinerary as string) ?? null,
    guideIds: (fields.Guides as string[]) ?? (fields.guides as string[]) ?? [],
    status:
      (fields.Status as Trip["status"]) ??
      (fields.status as Trip["status"]) ??
      "draft",
    included:
      (fields.Included as string) ?? (fields.included as string) ?? null,
    notIncluded:
      (fields["Not Included"] as string) ??
      (fields.notIncluded as string) ??
      null,
    type: (fields.Type as string) ?? (fields.type as string) ?? null,
    createdAt: record._rawJson?.createdTime ?? new Date().toISOString(),
    tripDateIds:
      (fields["Departures"] as string[]) ??
      (fields["Trip Dates"] as string[]) ??
      [],
  };
}

export function transformTripDate(
  record: Airtable.Record<TripDateAirtableFields>
): TripDate {
  const fields = record.fields;

  return {
    id: record.id,
    name: (fields.Name as string) ?? (fields.name as string) ?? "",
    tripId: (fields.Trip as string[])?.[0] ?? null,
    startDate: (fields["Start Date"] as string) ?? "",
    endDate: (fields["End Date"] as string) ?? "",
    guideId: (fields.Guide as string[])?.[0] ?? null,
    maxCapacity: (fields["Max Capacity"] as number) ?? 0,
    spotsLeft: (fields["Spots Left"] as number) ?? 0,
    price: (fields.Price as number) ?? null,
    status: (fields.Status as TripDate["status"]) ?? "open",
    applicationCount: (fields["Application Count"] as number) ?? 0,
  };
}

export function transformGuide(
  record: Airtable.Record<GuideAirtableFields>
): Guide {
  const fields = record.fields;

  return {
    id: record.id,
    name: (fields.Name as string) ?? (fields.name as string) ?? "",
    photo: parseSingleAttachment(fields.Photo ?? fields.photo),
    bio: (fields.Bio as string) ?? (fields.bio as string) ?? null,
    tripIds:
      (fields["Trips Assigned"] as string[]) ??
      (fields["trips assigned"] as string[]) ??
      [],
  };
}

export function transformApplication(
  record: Airtable.Record<ApplicationAirtableFields>
): Application {
  const fields = record.fields;

  return {
    id: record.id,
    tripId: (fields.trip as string[])?.[0] ?? null,
    departureId: (fields.departure as string[])?.[0] ?? null,
    customerName: (fields.customerName as string) ?? "",
    email: (fields.email as string) ?? "",
    phone: (fields.phone as string) ?? "",
    dateOfBirth: (fields.dateOfBirth as string) ?? "",
    nationality: (fields.nationality as string) ?? "",
    passportNumber: (fields.passportNumber as string) ?? "",
    fitnessLevel:
      (fields.fitnessLevel as Application["fitnessLevel"]) ?? "intermediate",
    experience: (fields.experience as string) ?? null,
    emergencyContactName: (fields.emergencyContactName as string) ?? "",
    emergencyContactPhone: (fields.emergencyContactPhone as string) ?? "",
    emergencyContactRelation: (fields.emergencyContactRelation as string) ?? "",
    allergies: (fields.allergies as string) ?? "",
    medications: (fields.medications as string) ?? "",
    dietaryRestrictions: (fields.dietaryRestrictions as string) ?? "",
    howDidYouHear: (fields.howDidYouHear as string) ?? "",
    termsSignature: (fields.termsSignature as string) ?? "",
    termsAcceptedAt: (fields.termsAcceptedAt as string) ?? "",
    status: (fields.status as Application["status"]) ?? "applied",
    calendarBookingLink: (fields["calendar booking link"] as string) ?? null,
    calendarBookingTime: (fields.calendarBookingTime as string) ?? null,
    appliedDate:
      (fields.appliedDate as string) ??
      record._rawJson?.createdTime ??
      new Date().toISOString(),
    adminNotes: (fields.adminNotes as string) ?? null,
  };
}

export function transformNewsletter(
  record: Airtable.Record<NewsletterAirtableFields>
): NewsletterSubscriber {
  const fields = record.fields;

  return {
    id: record.id,
    email: (fields.Email as string) ?? "",
    subscribedAt:
      (fields["Subscribed At"] as string) ??
      record._rawJson?.createdTime ??
      new Date().toISOString(),
    source: (fields.Source as string) ?? null,
  };
}

// -----------------------------------------------------------------------------
// Generic Fetch Helpers
// -----------------------------------------------------------------------------

interface FetchOptions {
  filterByFormula?: string;
  sort?: Array<{ field: string; direction?: "asc" | "desc" }>;
  maxRecords?: number;
  pageSize?: number;
  view?: string;
}

async function fetchAllRecords<T extends Airtable.FieldSet>(
  table: Airtable.Table<T>,
  options: FetchOptions = {}
): Promise<Airtable.Record<T>[]> {
  const { filterByFormula, sort, maxRecords, pageSize = 100, view } = options;

  const records: Airtable.Record<T>[] = [];

  const query = table.select({
    ...(filterByFormula && { filterByFormula }),
    ...(sort && { sort }),
    ...(maxRecords && { maxRecords }),
    ...(view && { view }),
    pageSize,
  });

  await query.eachPage((pageRecords, fetchNextPage) => {
    records.push(...pageRecords);
    fetchNextPage();
  });

  return records;
}

async function fetchRecordById<T extends Airtable.FieldSet>(
  table: Airtable.Table<T>,
  recordId: string
): Promise<Airtable.Record<T> | null> {
  try {
    const record = await table.find(recordId);
    return record;
  } catch (error) {
    if (error instanceof Error && error.message.includes("NOT_FOUND")) {
      return null;
    }
    throw error;
  }
}

// -----------------------------------------------------------------------------
// Trip Functions
// -----------------------------------------------------------------------------

export async function fetchAllTrips(
  options: FetchOptions = {}
): Promise<Trip[]> {
  const records = await fetchAllRecords(tables.trips, options);
  return records.map(transformTrip);
}

export async function fetchActiveTrips(): Promise<Trip[]> {
  return fetchAllTrips({
    filterByFormula: `{Status} = 'active'`,
    sort: [{ field: "Name", direction: "asc" }],
  });
}

export async function fetchTripById(tripId: string): Promise<Trip | null> {
  const record = await fetchRecordById(tables.trips, tripId);
  if (!record) return null;
  return transformTrip(record);
}

export async function fetchTripBySlug(slug: string): Promise<Trip | null> {
  const records = await fetchAllRecords(tables.trips, {
    filterByFormula: `{Slug} = '${escapeAirtableString(slug)}'`,
    maxRecords: 1,
  });

  if (records.length === 0) return null;
  return transformTrip(records[0]);
}

export async function createTrip(
  fields: Partial<TripAirtableFields>
): Promise<Trip> {
  const record = await tables.trips.create(
    fields as unknown as Airtable.FieldSet
  );
  return transformTrip(record as Airtable.Record<TripAirtableFields>);
}

export async function updateTrip(
  tripId: string,
  fields: Partial<TripAirtableFields>
): Promise<Trip> {
  const record = await tables.trips.update(
    tripId,
    fields as unknown as Airtable.FieldSet
  );
  return transformTrip(record as Airtable.Record<TripAirtableFields>);
}

export async function deleteTrip(tripId: string): Promise<void> {
  await tables.trips.destroy(tripId);
}

// -----------------------------------------------------------------------------
// Trip Date Functions
// -----------------------------------------------------------------------------

export async function fetchAllTripDates(
  options: FetchOptions = {}
): Promise<TripDate[]> {
  const records = await fetchAllRecords(tables.tripDates, {
    sort: [{ field: "Start Date", direction: "asc" }],
    ...options,
  });
  return records.map(transformTripDate);
}

export async function fetchTripDatesByTripId(
  tripId: string
): Promise<TripDate[]> {
  return fetchAllTripDates({
    filterByFormula: `FIND('${escapeAirtableString(
      tripId
    )}', ARRAYJOIN({Trip})) > 0`,
  });
}

export async function fetchOpenTripDatesByTripId(
  tripId: string
): Promise<TripDate[]> {
  return fetchAllTripDates({
    filterByFormula: `AND(FIND('${escapeAirtableString(
      tripId
    )}', ARRAYJOIN({Trip})) > 0, OR({Status} = 'open', {Status} = 'limited'))`,
  });
}

export async function fetchTripDateById(
  tripDateId: string
): Promise<TripDate | null> {
  const record = await fetchRecordById(tables.tripDates, tripDateId);
  if (!record) return null;
  return transformTripDate(record);
}

export async function fetchTripDatesByIds(
  tripDateIds: string[]
): Promise<TripDate[]> {
  if (tripDateIds.length === 0) return [];

  const idFormulas = tripDateIds.map(
    (id) => `RECORD_ID() = '${escapeAirtableString(id)}'`
  );
  const filterByFormula = `OR(${idFormulas.join(", ")})`;

  const records = await fetchAllRecords(tables.tripDates, { filterByFormula });
  return records.map(transformTripDate);
}

export async function createTripDate(
  fields: Partial<TripDateAirtableFields>
): Promise<TripDate> {
  const record = await tables.tripDates.create(
    fields as unknown as Airtable.FieldSet
  );
  return transformTripDate(record as Airtable.Record<TripDateAirtableFields>);
}

export async function updateTripDate(
  tripDateId: string,
  fields: Partial<TripDateAirtableFields>
): Promise<TripDate> {
  const record = await tables.tripDates.update(
    tripDateId,
    fields as unknown as Airtable.FieldSet
  );
  return transformTripDate(record as Airtable.Record<TripDateAirtableFields>);
}

export async function deleteTripDate(tripDateId: string): Promise<void> {
  await tables.tripDates.destroy(tripDateId);
}

// -----------------------------------------------------------------------------
// Guide Functions
// -----------------------------------------------------------------------------

export async function fetchAllGuides(
  options: FetchOptions = {}
): Promise<Guide[]> {
  const records = await fetchAllRecords(tables.guides, options);
  return records.map(transformGuide);
}

export async function fetchGuideById(guideId: string): Promise<Guide | null> {
  const record = await fetchRecordById(tables.guides, guideId);
  if (!record) return null;
  return transformGuide(record);
}

export async function fetchGuidesByIds(guideIds: string[]): Promise<Guide[]> {
  if (guideIds.length === 0) return [];

  const idFormulas = guideIds.map(
    (id) => `RECORD_ID() = '${escapeAirtableString(id)}'`
  );
  const filterByFormula = `OR(${idFormulas.join(", ")})`;

  const records = await fetchAllRecords(tables.guides, { filterByFormula });
  return records.map(transformGuide);
}

export async function createGuide(
  fields: Partial<GuideAirtableFields>
): Promise<Guide> {
  const record = await tables.guides.create(
    fields as unknown as Airtable.FieldSet
  );
  return transformGuide(record as Airtable.Record<GuideAirtableFields>);
}

export async function updateGuide(
  guideId: string,
  fields: Partial<GuideAirtableFields>
): Promise<Guide> {
  const record = await tables.guides.update(
    guideId,
    fields as unknown as Airtable.FieldSet
  );
  return transformGuide(record as Airtable.Record<GuideAirtableFields>);
}

export async function deleteGuide(guideId: string): Promise<void> {
  await tables.guides.destroy(guideId);
}

// -----------------------------------------------------------------------------
// Application Functions
// -----------------------------------------------------------------------------

export async function fetchAllApplications(
  options: FetchOptions = {}
): Promise<Application[]> {
  const records = await fetchAllRecords(tables.applications, {
    sort: [{ field: "Applied Date", direction: "desc" }],
    ...options,
  });
  return records.map(transformApplication);
}

export async function fetchApplicationsByTripId(
  tripId: string
): Promise<Application[]> {
  return fetchAllApplications({
    filterByFormula: `FIND('${escapeAirtableString(
      tripId
    )}', ARRAYJOIN({trip})) > 0`,
  });
}

export async function fetchApplicationsByDepartureId(
  departureId: string
): Promise<Application[]> {
  return fetchAllApplications({
    filterByFormula: `FIND('${escapeAirtableString(
      departureId
    )}', ARRAYJOIN({departure})) > 0`,
  });
}

export async function fetchApplicationsByStatus(
  status: string
): Promise<Application[]> {
  return fetchAllApplications({
    filterByFormula: `{status} = '${escapeAirtableString(status)}'`,
  });
}

export async function fetchApplicationById(
  applicationId: string
): Promise<Application | null> {
  const record = await fetchRecordById(tables.applications, applicationId);
  if (!record) return null;
  return transformApplication(record);
}

export async function createApplication(
  fields: Partial<ApplicationAirtableFields>
): Promise<Application> {
  const record = await tables.applications.create(
    fields as unknown as Airtable.FieldSet
  );
  return transformApplication(
    record as Airtable.Record<ApplicationAirtableFields>
  );
}

export async function updateApplication(
  applicationId: string,
  fields: Partial<ApplicationAirtableFields>
): Promise<Application> {
  const record = await tables.applications.update(
    applicationId,
    fields as unknown as Airtable.FieldSet
  );
  return transformApplication(
    record as Airtable.Record<ApplicationAirtableFields>
  );
}

export async function deleteApplication(applicationId: string): Promise<void> {
  await tables.applications.destroy(applicationId);
}

// -----------------------------------------------------------------------------
// Newsletter Functions
// -----------------------------------------------------------------------------

export async function fetchAllNewsletterSubscribers(
  options: FetchOptions = {}
): Promise<NewsletterSubscriber[]> {
  const records = await fetchAllRecords(tables.newsletter, {
    sort: [{ field: "Subscribed At", direction: "desc" }],
    ...options,
  });
  return records.map(transformNewsletter);
}

export async function fetchNewsletterByEmail(
  email: string
): Promise<NewsletterSubscriber | null> {
  const records = await fetchAllRecords(tables.newsletter, {
    filterByFormula: `{Email} = '${escapeAirtableString(email)}'`,
    maxRecords: 1,
  });

  if (records.length === 0) return null;
  return transformNewsletter(records[0]);
}

export async function createNewsletterSubscriber(
  fields: Partial<NewsletterAirtableFields>
): Promise<NewsletterSubscriber> {
  const record = await tables.newsletter.create(
    fields as unknown as Airtable.FieldSet
  );
  return transformNewsletter(
    record as Airtable.Record<NewsletterAirtableFields>
  );
}

// -----------------------------------------------------------------------------
// Expansion Helpers
// -----------------------------------------------------------------------------

export async function expandTripWithGuides(trip: Trip): Promise<Trip> {
  if (trip.guideIds.length === 0) return trip;
  const guides = await fetchGuidesByIds(trip.guideIds);
  return { ...trip, guides };
}

export async function expandTripsWithGuides(trips: Trip[]): Promise<Trip[]> {
  const allGuideIds = [...new Set(trips.flatMap((trip) => trip.guideIds))];

  if (allGuideIds.length === 0) return trips;

  const guides = await fetchGuidesByIds(allGuideIds);
  const guidesMap = new Map(guides.map((g) => [g.id, g]));

  return trips.map((trip) => ({
    ...trip,
    guides: trip.guideIds
      .map((id) => guidesMap.get(id))
      .filter(Boolean) as Guide[],
  }));
}

export async function expandTripWithTripDates(trip: Trip): Promise<Trip> {
  // Use tripDateIds directly instead of filtering by trip
  if (trip.tripDateIds.length === 0) return trip;

  const tripDates = await fetchTripDatesByIds(trip.tripDateIds);

  // Expand each trip date with guide info
  const guideIds = [
    ...new Set(tripDates.map((td) => td.guideId).filter(Boolean) as string[]),
  ];
  const guides = guideIds.length > 0 ? await fetchGuidesByIds(guideIds) : [];
  const guidesMap = new Map(guides.map((g) => [g.id, g]));

  const tripDatesWithGuides = tripDates.map((td) => ({
    ...td,
    guide: td.guideId ? guidesMap.get(td.guideId) : undefined,
  }));

  return { ...trip, tripDates: tripDatesWithGuides };
}

export async function expandTripsWithTripDates(trips: Trip[]): Promise<Trip[]> {
  // Get all trip date IDs
  const allTripDateIds = [
    ...new Set(trips.flatMap((trip) => trip.tripDateIds)),
  ];

  if (allTripDateIds.length === 0) return trips;

  // Fetch all trip dates
  const tripDates = await fetchTripDatesByIds(allTripDateIds);

  // Get all guide IDs from trip dates
  const guideIds = [
    ...new Set(tripDates.map((td) => td.guideId).filter(Boolean) as string[]),
  ];
  const guides = guideIds.length > 0 ? await fetchGuidesByIds(guideIds) : [];
  const guidesMap = new Map(guides.map((g) => [g.id, g]));

  // Add guide to each trip date
  const tripDatesWithGuides = tripDates.map((td) => ({
    ...td,
    guide: td.guideId ? guidesMap.get(td.guideId) : undefined,
  }));

  // Create map of trip date by ID
  const tripDatesMap = new Map(tripDatesWithGuides.map((td) => [td.id, td]));

  // Assign trip dates to each trip
  return trips.map((trip) => ({
    ...trip,
    tripDates: trip.tripDateIds
      .map((id) => tripDatesMap.get(id))
      .filter(Boolean) as TripDate[],
  }));
}

export async function expandApplicationWithTrip(
  application: Application
): Promise<Application> {
  if (!application.tripId) return application;
  const trip = await fetchTripById(application.tripId);
  return { ...application, trip: trip ?? undefined };
}

export async function expandApplicationWithDeparture(
  application: Application
): Promise<Application> {
  if (!application.departureId) return application;
  const departure = await fetchTripDateById(application.departureId);
  return { ...application, departure: departure ?? undefined };
}

// -----------------------------------------------------------------------------
// Export base for advanced use cases
// -----------------------------------------------------------------------------

export { base, Airtable };
