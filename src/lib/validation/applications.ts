// =============================================================================
// Jibal Adventures — Application Validation Schema
// =============================================================================

import { z } from "zod";

const fitnessLevelValues = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Athlete",
] as const;

const howDidYouHearValues = [
  "Instagram",
  "TikTok",
  "Friend/Family referral",
  "Google search",
  "YouTube",
  "Other",
] as const;

const phoneRegex = /^\+[1-9]\d{0,3}[\s\-]?\d{4,14}$/;

export const createApplicationSchema = z.object({
  // Now we require departureId instead of tripId
  departureId: z.string().min(1, "Please select a departure date"),

  customerName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),

  email: z.string().email("Please enter a valid email address"),

  phone: z
    .string()
    .regex(
      phoneRegex,
      "Please enter a valid phone number with country code (e.g., +965 1234 5678)"
    ),

  dateOfBirth: z.string().min(1, "Date of birth is required"),

  nationality: z
    .string()
    .min(2, "Nationality is required")
    .max(100, "Nationality must be less than 100 characters"),

  passportPhoto: z.string().optional(),

  fitnessLevel: z.enum(fitnessLevelValues, {
    message: "Please select your fitness level",
  }),

  experience: z
    .string()
    .max(2000, "Experience must be less than 2000 characters")
    .optional()
    .or(z.literal("")),

  emergencyContactName: z
    .string()
    .min(2, "Emergency contact name is required")
    .max(100, "Name must be less than 100 characters"),

  emergencyContactPhone: z
    .string()
    .regex(
      phoneRegex,
      "Please enter a valid phone number with country code (e.g., +965 1234 5678)"
    ),

  emergencyContactRelation: z
    .string()
    .min(2, "Please specify your relation to emergency contact")
    .max(50, "Relation must be less than 50 characters"),

  allergies: z
    .string()
    .min(1, "Please enter allergies or N/A")
    .max(1000, "Allergies must be less than 1000 characters"),

  medications: z
    .string()
    .min(1, "Please enter medications or N/A")
    .max(1000, "Medications must be less than 1000 characters"),

  dietaryRestrictions: z
    .string()
    .min(1, "Please enter dietary restrictions or N/A")
    .max(1000, "Dietary restrictions must be less than 1000 characters"),

  howDidYouHear: z.enum(howDidYouHearValues, {
    message: "Please select how you heard about us",
  }),

  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the Terms & Conditions",
  }),

  termsSignature: z
    .string()
    .min(2, "Please type your full name as signature")
    .max(100, "Signature must be less than 100 characters"),

  // Calendar booking (optional - they can book during form or later via email)
  calendarBookingTime: z.string().optional().or(z.literal("")),
});

export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;

export function validateApplication(data: unknown):
  | {
      success: true;
      data: CreateApplicationInput;
    }
  | {
      success: false;
      errors: Record<string, string>;
    } {
  const result = createApplicationSchema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors: Record<string, string> = {};
  for (const error of result.error.issues) {
    const field = error.path.join(".");
    if (!errors[field]) {
      errors[field] = error.message;
    }
  }

  return { success: false, errors };
}
