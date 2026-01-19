// =============================================================================
// POST /api/newsletter — Subscribe to newsletter
// =============================================================================

import { NextResponse } from "next/server";
import { z } from "zod";
import {
  fetchNewsletterByEmail,
  createNewsletterSubscriber,
} from "@/lib/airtable";
import { errorResponse, badRequest } from "@/lib/errors";

const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const result = newsletterSchema.safeParse(body);
    if (!result.success) {
      throw badRequest("Invalid email address");
    }

    const { email } = result.data;

    // Check if already subscribed (silent success to prevent enumeration)
    const existing = await fetchNewsletterByEmail(email);
    if (existing) {
      return NextResponse.json({
        success: true,
        message: "Successfully subscribed to newsletter",
      });
    }

    // Create subscriber - only Email field
    await createNewsletterSubscriber({
      Email: email,
    });

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to newsletter",
    });
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return errorResponse(error);
  }
}
