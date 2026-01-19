// =============================================================================
// Jibal Adventures — Send Email Functions
// =============================================================================

import { resend, FROM_EMAIL, FROM_NAME } from "./client";
import { applicationConfirmationEmail } from "./templates/application-confirmation";
import { adminNotificationEmail } from "./templates/admin-notification";

// Your email address to receive admin notifications
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "your@email.com";
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || "";

interface SendApplicationEmailsProps {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  tripName: string;
  departureName: string;
  departureDate: string;
  calendarLink: string;
  calendarBookingTime?: string | null;
  applicationId: string;
}

/**
 * Send both customer confirmation and admin notification emails
 */
export async function sendApplicationEmails({
  customerName,
  customerEmail,
  customerPhone,
  tripName,
  departureName,
  departureDate,
  calendarLink,
  calendarBookingTime,
  applicationId,
}: SendApplicationEmailsProps) {
  // 1. Send confirmation email to customer
  const customerEmail_ = applicationConfirmationEmail({
    customerName,
    tripName,
    departureName,
    departureDate,
    calendarLink,
    calendarBookingTime,
  });

  const customerResult = await resend.emails.send({
    from: `${FROM_NAME} <${FROM_EMAIL}>`,
    to: customerEmail,
    subject: customerEmail_.subject,
    html: customerEmail_.html,
    text: customerEmail_.text,
  });

  if (customerResult.error) {
    console.error("Failed to send customer email:", customerResult.error);
  }

  // 2. Send notification email to admin
  const adminEmail = adminNotificationEmail({
    customerName,
    customerEmail,
    customerPhone,
    tripName,
    departureName,
    departureDate,
    calendarBookingTime,
    applicationId,
    airtableBaseId: AIRTABLE_BASE_ID,
  });

  const adminResult = await resend.emails.send({
    from: `${FROM_NAME} <${FROM_EMAIL}>`,
    to: ADMIN_EMAIL,
    subject: adminEmail.subject,
    html: adminEmail.html,
    text: adminEmail.text,
  });

  if (adminResult.error) {
    console.error("Failed to send admin email:", adminResult.error);
  }

  return {
    customerEmailSent: !customerResult.error,
    adminEmailSent: !adminResult.error,
  };
}
