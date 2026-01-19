// =============================================================================
// Application Confirmation Email Template
// =============================================================================

interface ApplicationConfirmationProps {
  customerName: string;
  tripName: string;
  departureName: string;
  departureDate: string;
  calendarLink: string;
  calendarBookingTime?: string | null;
}

export function applicationConfirmationEmail({
  customerName,
  tripName,
  departureName,
  departureDate,
  calendarLink,
  calendarBookingTime,
}: ApplicationConfirmationProps) {
  const hasBooked = Boolean(calendarBookingTime);

  const subject = hasBooked
    ? `Call Confirmed - ${tripName}`
    : `Application Received - ${tripName}`;

  const callSection = hasBooked
    ? `
      <p><strong>Your consultation call is scheduled:</strong></p>
      <p style="font-size: 18px; background: #f0f0f0; padding: 15px; border-radius: 6px; text-align: center;">
        📅 ${calendarBookingTime}
      </p>
      <p>We'll discuss your trip details, answer questions, and go over next steps.</p>
    `
    : `
      <p><strong>Next step:</strong> Book a quick consultation call with our team:</p>
      <p style="text-align: center;">
        <a href="${calendarLink}" class="button">Book Your Call</a>
      </p>
      <p>During this call, we'll:</p>
      <ul>
        <li>Answer any questions you have about the trip</li>
        <li>Discuss your experience and fitness level</li>
        <li>Go over payment and next steps</li>
      </ul>
      <p>If the button doesn't work, copy this link:<br>
      <a href="${calendarLink}">${calendarLink}</a></p>
    `;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${subject}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .header h1 { color: #121E1E; margin: 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 8px; }
          .trip-details { background: #e8e8e8; padding: 15px; border-radius: 6px; margin: 20px 0; }
          .button { display: inline-block; background: #121E1E; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Jibal Adventures</h1>
          </div>
          <div class="content">
            <p>Hi ${customerName},</p>
            <p>Thank you for applying to <strong>${tripName}</strong>!</p>
            
            <div class="trip-details">
              <p style="margin: 0;"><strong>Your selected departure:</strong></p>
              <p style="margin: 5px 0 0 0; font-size: 16px;">📅 ${departureDate}</p>
            </div>
            
            <p>We've received your application and are excited to learn more about you.</p>
            ${callSection}
          </div>
          <div class="footer">
            <p>Jibal Adventures<br>Exhilarating yet safe. Exotic yet reliable.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const textCallSection = hasBooked
    ? `Your consultation call is scheduled:\n📅 ${calendarBookingTime}\n\nWe'll discuss your trip details, answer questions, and go over next steps.`
    : `Next step: Book a quick consultation call with our team:\n${calendarLink}\n\nDuring this call, we'll:\n- Answer any questions you have about the trip\n- Discuss your experience and fitness level\n- Go over payment and next steps`;

  const text = `
Hi ${customerName},

Thank you for applying to ${tripName}!

Your selected departure: ${departureDate}

We've received your application and are excited to learn more about you.

${textCallSection}

See you soon!

Jibal Adventures
Exhilarating yet safe. Exotic yet reliable.
  `.trim();

  return { subject, html, text };
}
