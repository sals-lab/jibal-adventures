// =============================================================================
// Jibal Adventures — Resend Email Client
// =============================================================================

import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!RESEND_API_KEY) {
  throw new Error("Missing required environment variable: RESEND_API_KEY");
}

export const resend = new Resend(RESEND_API_KEY);

// Your verified "from" email address
// For testing, use: onboarding@resend.dev
// For production, verify your domain in Resend dashboard
export const FROM_EMAIL = "onboarding@resend.dev";
export const FROM_NAME = "Jibal Adventures";
