// =============================================================================
// POST /api/applications — Submit a new application
// =============================================================================

import { NextResponse } from "next/server";
import {
  createApplication,
  fetchTripDateById,
  fetchTripById,
} from "@/lib/airtable";
import { validateApplication } from "@/lib/validation/applications";
import { badRequest, notFound, errorResponse } from "@/lib/errors";
import { sendApplicationEmails } from "@/lib/email/send";

const CAL_BOOKING_LINK =
  process.env.CAL_BOOKING_LINK || "https://cal.com/jibal/consultation";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validation = validateApplication(body);

    if (!validation.success) {
      throw badRequest("Validation failed", { fields: validation.errors });
    }

    const data = validation.data;

    const departure = await fetchTripDateById(data.departureId);

    if (!departure) {
      throw notFound("Departure");
    }

    if (departure.status !== "open" && departure.status !== "limited") {
      throw badRequest("This departure is not accepting applications");
    }

    if (departure.spotsLeft <= 0) {
      throw badRequest("This departure is fully booked");
    }

    const trip = departure.tripId
      ? await fetchTripById(departure.tripId)
      : null;

    if (!trip) {
      throw notFound("Trip");
    }

    if (trip.status !== "active") {
      throw badRequest("This trip is not accepting applications");
    }

    // Create application with exact Airtable field names from CSV
    const application = await createApplication({
      Trip: [trip.id],
      departure: [data.departureId],
      "Customer Name": data.customerName,
      Email: data.email,
      Phone: data.phone,
      dateOfBirth: data.dateOfBirth,
      nationality: data.nationality,
      passportNumber: data.passportNumber,
      "Fitness Level": data.fitnessLevel,
      Experience: data.experience || "",
      emergencyContactName: data.emergencyContactName,
      emergencyContactPhone: data.emergencyContactPhone,
      emergencyContactRelation: data.emergencyContactRelation,
      Allergies: data.allergies,
      Medications: data.medications,
      dietaryRestrictions: data.dietaryRestrictions,
      howDidYouHear: data.howDidYouHear,
      termsSignature: data.termsSignature,
      termsAcceptedAt: new Date().toISOString(),
      calendarBookingTime: data.calendarBookingTime || "",
      Status: "applied",
    });

    const emailResult = await sendApplicationEmails({
      customerName: data.customerName,
      customerEmail: data.email,
      customerPhone: data.email,
      tripName: trip.name,
      departureName: departure.name,
      departureDate: departure.startDate,
      calendarLink: CAL_BOOKING_LINK,
      calendarBookingTime: data.calendarBookingTime,
      applicationId: application.id,
    });

    return NextResponse.json(
      {
        data: {
          id: application.id,
          message: "Application submitted successfully",
          tripName: trip.name,
          departureName: departure.name,
          emailSent: emailResult.customerEmailSent,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating application:", error);
    return errorResponse(error);
  }
}
