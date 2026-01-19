// =============================================================================
// JIBAL ADVENTURES API CLIENT
// =============================================================================
// Typed API client for communicating with backend routes.
// Handles loading states, errors, and response parsing.
// =============================================================================

import type { Trip, Application, Guide } from "@/types";

// =============================================================================
// TYPES
// =============================================================================

export interface ApiResponse<T> {
  data: T;
  meta?: {
    total?: number;
    page?: number;
    pageSize?: number;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}

export class ApiClientError extends Error {
  code: string;
  status: number;
  details?: Record<string, string[]>;

  constructor(
    message: string,
    code: string,
    status: number,
    details?: Record<string, string[]>
  ) {
    super(message);
    this.name = "ApiClientError";
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

// =============================================================================
// BASE FETCH HELPER
// =============================================================================

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;

  const config: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiClientError(
        errorData.error?.message || "An error occurred",
        errorData.error?.code || "UNKNOWN_ERROR",
        response.status,
        errorData.error?.details
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiClientError) {
      throw error;
    }
    throw new ApiClientError(
      "Network error. Please check your connection.",
      "NETWORK_ERROR",
      0
    );
  }
}

// =============================================================================
// TRIPS API
// =============================================================================

export interface GetTripsParams {
  continent?: string;
  difficulty?: string;
  status?: string;
}

/**
 * Fetch all active trips
 */
export async function getTrips(params?: GetTripsParams): Promise<Trip[]> {
  const searchParams = new URLSearchParams();
  if (params?.continent) searchParams.set("continent", params.continent);
  if (params?.difficulty) searchParams.set("difficulty", params.difficulty);
  if (params?.status) searchParams.set("status", params.status);

  const query = searchParams.toString();
  const endpoint = `/api/trips${query ? `?${query}` : ""}`;

  const response = await apiFetch<ApiResponse<Trip[]>>(endpoint);
  return response.data;
}

/**
 * Fetch a single trip by slug
 */
export async function getTripBySlug(slug: string): Promise<Trip | null> {
  try {
    const response = await apiFetch<ApiResponse<Trip>>(`/api/trips/${slug}`);
    return response.data;
  } catch (error) {
    if (error instanceof ApiClientError && error.status === 404) {
      return null;
    }
    throw error;
  }
}

/**
 * Fetch a single trip by ID
 */
export async function getTripById(id: string): Promise<Trip | null> {
  try {
    const response = await apiFetch<ApiResponse<Trip>>(`/api/trips/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof ApiClientError && error.status === 404) {
      return null;
    }
    throw error;
  }
}

// =============================================================================
// APPLICATIONS API
// =============================================================================

export interface CreateApplicationData {
  tripId: string;
  selectedDate: string;
  customerName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
  passportFile?: File;
  fitnessLevel: string;
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
}

export interface CreateApplicationResponse {
  application: Application;
  calendarBookingLink: string;
}

/**
 * Submit a new application
 */
export async function createApplication(
  data: CreateApplicationData
): Promise<CreateApplicationResponse> {
  const response = await apiFetch<ApiResponse<CreateApplicationResponse>>(
    "/api/applications",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  return response.data;
}

// =============================================================================
// GUIDES API (if needed separately)
// =============================================================================

/**
 * Fetch all guides
 */
export async function getGuides(): Promise<Guide[]> {
  const response = await apiFetch<ApiResponse<Guide[]>>("/api/guides");
  return response.data;
}

// =============================================================================
// CONTACT API
// =============================================================================

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  tripOfInterest?: string;
  subject: string;
  message: string;
  subscribeToNewsletter?: boolean;
}

/**
 * Submit contact form
 */
export async function submitContactForm(data: ContactFormData): Promise<void> {
  await apiFetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// =============================================================================
// NEWSLETTER API
// =============================================================================

export interface NewsletterSubscribeData {
  email: string;
}

/**
 * Subscribe to newsletter
 */
export async function subscribeToNewsletter(
  data: NewsletterSubscribeData
): Promise<void> {
  await apiFetch("/api/newsletter", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// =============================================================================
// FAQS API
// =============================================================================

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  page: string;
  order: number;
}

/**
 * Fetch FAQs for a specific page
 */
export async function getFAQs(page?: string): Promise<FAQ[]> {
  const endpoint = page ? `/api/faqs?page=${page}` : "/api/faqs";
  const response = await apiFetch<ApiResponse<FAQ[]>>(endpoint);
  return response.data;
}

// =============================================================================
// EXPORT DEFAULT CLIENT OBJECT
// =============================================================================

export const api = {
  // Trips
  getTrips,
  getTripBySlug,
  getTripById,
  // Applications
  createApplication,
  // Guides
  getGuides,
  // Contact
  submitContactForm,
  // Newsletter
  subscribeToNewsletter,
  // FAQs
  getFAQs,
};

export default api;
