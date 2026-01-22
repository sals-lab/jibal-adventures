import { Container } from "@/components/ui/Section";

// =============================================================================
// TERMS & CONDITIONS PAGE
// =============================================================================

export const metadata = {
  title: "Terms & Conditions | Jibal Adventures",
  description:
    "Terms and conditions for booking adventures with Jibal Adventures.",
};

export default function TermsPage() {
  return (
    <>
      {/* ================================================================== */}
      {/* HERO SECTION */}
      {/* ================================================================== */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 bg-[#BABCA7]/30 text-[#121E1E] text-xs font-semibold rounded-full mb-6">
              LEGAL
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#121E1E] mb-6">
              Terms & Conditions
            </h1>
            <p className="text-xl text-[#5A6666] leading-relaxed">
              Please read these terms carefully before booking an adventure with
              us.
            </p>
            <p className="text-sm text-[#5A6666] mt-4">
              Last updated: January 2025
            </p>
          </div>
        </Container>
      </section>

      {/* ================================================================== */}
      {/* TERMS CONTENT */}
      {/* ================================================================== */}
      <section className="py-16 md:py-24 bg-[#F2F2F2]">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-8 md:p-12 space-y-10">
              {/* Section 1 */}
              <TermsSection title="1. Agreement">
                <p>
                  By submitting a trip application or booking with Jibal
                  Adventures, you agree to these Terms & Conditions. These terms
                  constitute a binding agreement between you and Jibal
                  Adventures.
                </p>
              </TermsSection>

              {/* Section 2 */}
              <TermsSection title="2. Booking & Payment">
                <p>To secure your booking:</p>
                <ul className="list-disc list-inside mt-3 space-y-2 text-[#5A6666]">
                  <li>
                    A non-refundable deposit of <strong>250 KWD</strong> is
                    required upon booking confirmation
                  </li>
                  <li>
                    The remaining balance is due <strong>60 days</strong> before
                    departure
                  </li>
                  <li>
                    Bookings made within 60 days of departure require full
                    payment
                  </li>
                  <li>
                    Payment can be made via bank transfer or other methods as
                    communicated
                  </li>
                </ul>
                <p className="mt-4">
                  Your spot is not confirmed until we receive your deposit and
                  send you a confirmation email.
                </p>
              </TermsSection>

              {/* Section 3 */}
              <TermsSection title="3. Cancellation Policy">
                <p>If you need to cancel your booking:</p>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#E8E8E8]">
                        <th className="text-left py-2 text-[#121E1E]">
                          Cancellation Notice
                        </th>
                        <th className="text-left py-2 text-[#121E1E]">
                          Refund
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-[#5A6666]">
                      <tr className="border-b border-[#E8E8E8]">
                        <td className="py-2">60+ days before departure</td>
                        <td className="py-2">
                          Full refund minus 250 KWD deposit
                        </td>
                      </tr>
                      <tr className="border-b border-[#E8E8E8]">
                        <td className="py-2">30-59 days before departure</td>
                        <td className="py-2">50% refund</td>
                      </tr>
                      <tr className="border-b border-[#E8E8E8]">
                        <td className="py-2">15-29 days before departure</td>
                        <td className="py-2">25% refund</td>
                      </tr>
                      <tr>
                        <td className="py-2">Less than 15 days</td>
                        <td className="py-2">No refund</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-sm">
                  We strongly recommend purchasing travel insurance that covers
                  trip cancellation.
                </p>
              </TermsSection>

              {/* Section 4 */}
              <TermsSection title="4. Trip Pricing">
                <p>Trip prices typically include:</p>
                <ul className="list-disc list-inside mt-3 space-y-2 text-[#5A6666]">
                  <li>Professional guide services</li>
                  <li>Accommodations as specified in trip details</li>
                  <li>Meals as specified in trip details</li>
                  <li>Ground transportation during the trip</li>
                  <li>Permits and park fees</li>
                </ul>
                <p className="mt-4">
                  Unless otherwise stated, prices do not include:
                </p>
                <ul className="list-disc list-inside mt-3 space-y-2 text-[#5A6666]">
                  <li>International flights</li>
                  <li>Travel insurance</li>
                  <li>Visa fees</li>
                  <li>Personal equipment</li>
                  <li>Tips and gratuities</li>
                  <li>Meals not specified</li>
                </ul>
              </TermsSection>

              {/* Section 5 */}
              <TermsSection title="5. Health & Fitness Requirements">
                <p>
                  Adventure travel is physically demanding. By booking, you
                  confirm that:
                </p>
                <ul className="list-disc list-inside mt-3 space-y-2 text-[#5A6666]">
                  <li>
                    You meet the fitness level required for your chosen trip
                  </li>
                  <li>You have disclosed all relevant medical conditions</li>
                  <li>
                    You have consulted a physician if you have any health
                    concerns
                  </li>
                  <li>
                    You are physically capable of participating in all planned
                    activities
                  </li>
                </ul>
                <p className="mt-4">
                  We reserve the right to refuse participation if we believe a
                  participant's health or fitness poses a risk to themselves or
                  the group.
                </p>
              </TermsSection>

              {/* Section 6 */}
              <TermsSection title="6. Assumption of Risk">
                <p>
                  Adventure travel involves inherent risks including but not
                  limited to: high altitude, extreme weather, physical exertion,
                  remote locations, and unpredictable conditions. By
                  participating, you acknowledge and accept these risks.
                </p>
                <p className="mt-4">
                  Full liability terms and risk acknowledgments are detailed in
                  the
                  <strong> Trip Waiver</strong>, which must be signed before
                  departure.
                </p>
              </TermsSection>

              {/* Section 7 */}
              <TermsSection title="7. Travel Documents">
                <p>You are responsible for:</p>
                <ul className="list-disc list-inside mt-3 space-y-2 text-[#5A6666]">
                  <li>
                    Ensuring your passport is valid for at least 6 months beyond
                    travel dates
                  </li>
                  <li>Obtaining required visas and permits</li>
                  <li>Meeting entry requirements for destination countries</li>
                  <li>Purchasing adequate travel insurance</li>
                </ul>
                <p className="mt-4">
                  We can assist with visa information but are not responsible
                  for denied entry due to inadequate documentation.
                </p>
              </TermsSection>

              {/* Section 8 */}
              <TermsSection title="8. Trip Modifications">
                <p>
                  We reserve the right to modify itineraries due to weather,
                  safety concerns, local conditions, or circumstances beyond our
                  control. We will make reasonable efforts to provide comparable
                  alternatives.
                </p>
                <p className="mt-4">
                  If we must cancel a trip entirely, you will receive a full
                  refund or credit toward a future trip.
                </p>
              </TermsSection>

              {/* Section 9 */}
              <TermsSection title="9. Photography & Media">
                <p>
                  By participating in our trips, you grant Jibal Adventures
                  permission to use photographs and videos taken during the trip
                  for marketing and promotional purposes. If you prefer not to
                  be featured, please inform us in writing before departure.
                </p>
              </TermsSection>

              {/* Section 10 */}
              <TermsSection title="10. Age Requirement">
                <p>
                  Participants must be at least <strong>21 years old</strong> to
                  join our expeditions unless otherwise specified for family
                  trips. Participants under 21 may be considered on a
                  case-by-case basis with guardian consent.
                </p>
              </TermsSection>

              {/* Section 11 */}
              <TermsSection title="11. Code of Conduct">
                <p>
                  Participants are expected to respect fellow travelers, guides,
                  local communities, and the environment. We reserve the right
                  to remove any participant whose behavior is disruptive or
                  endangers others, without refund.
                </p>
              </TermsSection>

              {/* Section 12 */}
              <TermsSection title="12. Governing Law">
                <p>
                  These terms are governed by the laws of the{" "}
                  <strong>Abu Dhabi Global Market (ADGM)</strong>. Any disputes
                  shall be resolved in the ADGM Courts.
                </p>
              </TermsSection>

              {/* Section 13 */}
              <TermsSection title="13. Contact Us">
                <p>For questions about these terms, contact us:</p>
                <div className="mt-4 p-4 bg-[#F2F2F2] rounded-xl">
                  <p className="font-semibold text-[#121E1E]">
                    Jibal Adventures
                  </p>
                  <p className="text-[#5A6666]">
                    Email: Zooky@JibalAdventures.com
                  </p>
                  <p className="text-[#5A6666]">Phone: +965 66626223</p>
                </div>
              </TermsSection>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

function TermsSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-[#121E1E] mb-4">{title}</h2>
      <div className="text-[#5A6666] leading-relaxed">{children}</div>
    </div>
  );
}
