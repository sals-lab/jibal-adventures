import Link from "next/link";
import { Container } from "@/components/ui/Section";

export const dynamic = "force-dynamic";

// =============================================================================
// APPLICATION SUCCESS PAGE WITH CAL.COM EMBED
// =============================================================================

// Your Cal.com event link
const CALCOM_LINK = "https://cal.com/jibal-adventures/15min";

export default function ApplicationSuccessPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      {/* Success Header - Creamy White */}
      <section className="bg-white py-12 md:py-16 border-b border-[#E8E8E8]">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-[#121E1E] mb-4">
              Application Submitted!
            </h1>

            <p className="text-[#5A6666] text-lg">
              Thank you for your application. We've received your details and
              will review them shortly.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Schedule Call Card with Embed */}
            <div className="bg-white rounded-2xl p-6 md:p-8 mb-8">
              <div className="text-center mb-8">
                <span className="inline-block px-3 py-1 bg-[#BABCA7]/30 text-[#121E1E] text-xs font-semibold rounded-full mb-4">
                  NEXT STEP
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-[#121E1E] mb-3">
                  Schedule Your Discovery Call
                </h2>
                <p className="text-[#5A6666] max-w-lg mx-auto">
                  Book a 15-minute call with our team to discuss your trip,
                  answer questions, and confirm your spot.
                </p>
              </div>

              {/* Cal.com Embed */}
              <div className="bg-[#F9F9F9] rounded-xl p-4 mb-6">
                <iframe
                  src={`${CALCOM_LINK}?embed=true&theme=light`}
                  width="100%"
                  height="600"
                  frameBorder="0"
                  className="rounded-lg"
                  title="Schedule a call"
                />
              </div>

              {/* Fallback link if embed doesn't work */}
              <div className="text-center">
                <p className="text-sm text-[#5A6666] mb-2">
                  Calendar not loading?
                </p>
                <a
                  href={CALCOM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#121E1E] font-medium underline hover:no-underline"
                >
                  Open scheduling page
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* What Happens Next */}
            <div className="bg-white rounded-2xl p-6 md:p-8 mb-8">
              <h3 className="text-xl font-bold text-[#121E1E] mb-6">
                What Happens Next?
              </h3>
              <div className="space-y-6">
                <StepItem
                  number={1}
                  title="Discovery Call"
                  description="We'll discuss your trip details, answer questions, and ensure this adventure is right for you."
                  active={true}
                />
                <StepItem
                  number={2}
                  title="Application Review"
                  description="Our team reviews your application and confirms your eligibility for the trip."
                  active={false}
                />
                <StepItem
                  number={3}
                  title="Secure Your Spot"
                  description="Pay your deposit to confirm your place on the expedition."
                  active={false}
                />
                <StepItem
                  number={4}
                  title="Pre-Trip Preparation"
                  description="Receive your welcome pack with gear list, training tips, and trip details."
                  active={false}
                />
              </div>
            </div>

            {/* Confirmation Email Notice - Creamy White */}
            <div className="bg-white rounded-2xl p-6 mb-8 border border-[#E8E8E8]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#BABCA7]/30 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-[#121E1E]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-[#121E1E] mb-1">
                    Check Your Inbox
                  </h4>
                  <p className="text-[#5A6666] text-sm">
                    We've sent a confirmation email with your application
                    details. Don't forget to check your spam folder.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/trips"
                className="px-6 py-3 rounded-xl border border-[#E8E8E8] bg-white text-[#5A6666] hover:bg-[#F9F9F9] transition-colors font-medium text-center"
              >
                Browse More Trips
              </Link>
              <Link
                href="/"
                className="px-6 py-3 rounded-xl bg-[#121E1E] text-white hover:bg-[#1E2D2D] transition-colors font-semibold text-center"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Help Section */}
      <section className="py-12 bg-white border-t border-[#E8E8E8]">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-xl font-bold text-[#121E1E] mb-3">
              Questions?
            </h2>
            <p className="text-[#5A6666] mb-6">
              Our team is here to help. Reach out anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/96512345678"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-[#F2F2F2] text-[#121E1E] font-medium hover:bg-[#E8E8E8] transition-colors flex items-center justify-center gap-2"
              >
                <WhatsAppIcon className="w-5 h-5" />
                WhatsApp
              </a>
              <a
                href="mailto:info@jibaladventures.com"
                className="px-6 py-3 rounded-xl bg-[#F2F2F2] text-[#121E1E] font-medium hover:bg-[#E8E8E8] transition-colors flex items-center justify-center gap-2"
              >
                <EmailIcon className="w-5 h-5" />
                Email Us
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

// =============================================================================
// STEP ITEM COMPONENT
// =============================================================================

function StepItem({
  number,
  title,
  description,
  active,
}: {
  number: number;
  title: string;
  description: string;
  active: boolean;
}) {
  return (
    <div className="flex gap-4">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
          active ? "bg-[#BABCA7] text-[#121E1E]" : "bg-[#E8E8E8] text-[#5A6666]"
        }`}
      >
        <span className="font-bold">{number}</span>
      </div>
      <div className={active ? "" : "opacity-60"}>
        <h4 className="font-semibold text-[#121E1E]">{title}</h4>
        <p className="text-sm text-[#5A6666]">{description}</p>
      </div>
    </div>
  );
}

// =============================================================================
// ICONS
// =============================================================================

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function EmailIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}
