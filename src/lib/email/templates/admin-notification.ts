// =============================================================================
// Admin Notification Email Template — New Application
// =============================================================================

interface AdminNotificationProps {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  tripName: string;
  departureName: string;
  departureDate: string;
  calendarBookingTime?: string | null;
  applicationId: string;
  airtableBaseId: string;
}

export function adminNotificationEmail({
  customerName,
  customerEmail,
  customerPhone,
  tripName,
  departureName,
  departureDate,
  calendarBookingTime,
  applicationId,
  airtableBaseId,
}: AdminNotificationProps) {
  const hasBooked = Boolean(calendarBookingTime);

  const subject = `New Application - ${tripName}`;

  const airtableLink = `https://airtable.com/${airtableBaseId}/tblApplications/${applicationId}`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${subject}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #121E1E; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase; }
          .value { font-size: 16px; margin-top: 4px; }
          .status { display: inline-block; padding: 6px 12px; border-radius: 4px; font-size: 14px; }
          .status.booked { background: #d4edda; color: #155724; }
          .status.pending { background: #fff3cd; color: #856404; }
          .button { display: inline-block; background: #121E1E; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin: 0;">🎉 New Application!</h2>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Trip</div>
              <div class="value">${tripName}</div>
            </div>
            <div class="field">
              <div class="label">Departure</div>
              <div class="value">📅 ${departureDate}</div>
            </div>
            <div class="field">
              <div class="label">Name</div>
              <div class="value">${customerName}</div>
            </div>
            <div class="field">
              <div class="label">Email</div>
              <div class="value"><a href="mailto:${customerEmail}">${customerEmail}</a></div>
            </div>
            <div class="field">
              <div class="label">Phone</div>
              <div class="value"><a href="tel:${customerPhone}">${customerPhone}</a></div>
            </div>
            <div class="field">
              <div class="label">Call Status</div>
              <div class="value">
                ${
                  hasBooked
                    ? `<span class="status booked">✓ Booked: ${calendarBookingTime}</span>`
                    : `<span class="status pending">⏳ Not booked yet</span>`
                }
              </div>
            </div>
            <a href="${airtableLink}" class="button">View Full Application</a>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
New Application Received!

Trip: ${tripName}
Departure: ${departureDate}
Name: ${customerName}
Email: ${customerEmail}
Phone: ${customerPhone}
Call Status: ${hasBooked ? `Booked - ${calendarBookingTime}` : "Not booked yet"}

View in Airtable: ${airtableLink}
  `.trim();

  return { subject, html, text };
}
