import { Container } from "@/components/ui/Section";

// =============================================================================
// PRIVACY POLICY PAGE
// =============================================================================

export const metadata = {
  title: "Privacy Policy | Jibal Adventures",
  description:
    "How Jibal Adventures collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-xl text-[#5A6666] leading-relaxed">
              Your privacy matters to us. This policy explains how we collect,
              use, and protect your personal information.
            </p>
            <p className="text-sm text-[#5A6666] mt-4">
              Last updated: January 2025
            </p>
          </div>
        </Container>
      </section>

      {/* ================================================================== */}
      {/* POLICY CONTENT */}
      {/* ================================================================== */}
      <section className="py-16 md:py-24 bg-[#F2F2F2]">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-8 md:p-12 space-y-10">
              {/* Section 1 */}
              <PolicySection title="1. Information We Collect">
                <p>When you apply for a trip or contact us, we may collect:</p>
                <ul className="list-disc list-inside mt-3 space-y-2 text-[#5A6666]">
                  <li>
                    <strong>Identity Information:</strong> Name, date of birth,
                    nationality
                  </li>
                  <li>
                    <strong>Contact Information:</strong> Email address, phone
                    number
                  </li>
                  <li>
                    <strong>Travel Documents:</strong> Passport photo for visa
                    processing
                  </li>
                  <li>
                    <strong>Health Information:</strong> Fitness level,
                    allergies, medications, dietary restrictions
                  </li>
                  <li>
                    <strong>Emergency Contact:</strong> Name, phone, and
                    relationship of your emergency contact
                  </li>
                  <li>
                    <strong>Payment Information:</strong> Processed securely
                    through our payment providers
                  </li>
                </ul>
              </PolicySection>

              {/* Section 2 */}
              <PolicySection title="2. How We Use Your Information">
                <p>We use your information to:</p>
                <ul className="list-disc list-inside mt-3 space-y-2 text-[#5A6666]">
                  <li>Process your trip application and booking</li>
                  <li>Arrange visas, permits, and travel logistics</li>
                  <li>Communicate with you about your trip</li>
                  <li>
                    Ensure your safety during adventures (medical info shared
                    with guides)
                  </li>
                  <li>Contact your emergency contact if needed</li>
                  <li>Send important updates about your booking</li>
                  <li>Improve our services</li>
                </ul>
              </PolicySection>

              {/* Section 3 */}
              <PolicySection title="3. Information Sharing">
                <p>We share your information only when necessary:</p>
                <ul className="list-disc list-inside mt-3 space-y-2 text-[#5A6666]">
                  <li>
                    <strong>Trip Guides:</strong> Relevant health and emergency
                    information for your safety
                  </li>
                  <li>
                    <strong>Local Partners:</strong> Hotels, transport
                    providers, and permit offices as required
                  </li>
                  <li>
                    <strong>Visa Authorities:</strong> Passport information for
                    visa applications
                  </li>
                  <li>
                    <strong>Service Providers:</strong> Technical services that
                    help us operate (see below)
                  </li>
                </ul>
                <p className="mt-4">
                  We never sell your personal information to third parties.
                </p>
              </PolicySection>

              {/* Section 4 */}
              <PolicySection title="4. Service Providers">
                <p>We use trusted services to operate our platform:</p>
                <ul className="list-disc list-inside mt-3 space-y-2 text-[#5A6666]">
                  <li>
                    <strong>Airtable:</strong> Secure data storage
                  </li>
                  <li>
                    <strong>Resend:</strong> Email communications
                  </li>
                  <li>
                    <strong>Cal.com:</strong> Consultation scheduling
                  </li>
                  <li>
                    <strong>Vercel:</strong> Website hosting
                  </li>
                  <li>
                    <strong>Cloudflare:</strong> Website security and
                    performance
                  </li>
                  <li>
                    <strong>RabbitSign:</strong> Digital waiver signatures
                  </li>
                </ul>
                <p className="mt-4">
                  These providers are contractually obligated to protect your
                  data.
                </p>
              </PolicySection>

              {/* Section 5 */}
              <PolicySection title="5. Data Security">
                <p>
                  We implement appropriate security measures to protect your
                  personal information, including encrypted connections (HTTPS),
                  secure data storage, and limited access to personal data on a
                  need-to-know basis.
                </p>
              </PolicySection>

              {/* Section 6 */}
              <PolicySection title="6. Data Retention">
                <p>
                  We retain your personal information for as long as necessary
                  to fulfill the purposes outlined in this policy, typically for
                  7 years after your last trip with us for legal and accounting
                  purposes. You may request deletion of your data at any time.
                </p>
              </PolicySection>

              {/* Section 7 */}
              <PolicySection title="7. Your Rights">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside mt-3 space-y-2 text-[#5A6666]">
                  <li>Access the personal information we hold about you</li>
                  <li>Correct any inaccurate information</li>
                  <li>Request deletion of your data</li>
                  <li>Withdraw consent for marketing communications</li>
                  <li>Request a copy of your data in a portable format</li>
                </ul>
              </PolicySection>

              {/* Section 8 */}
              <PolicySection title="8. Cookies">
                <p>
                  Our website uses essential cookies to ensure proper
                  functionality. We do not use tracking cookies for advertising
                  purposes. Analytics, if implemented, will be anonymized to
                  improve our services.
                </p>
              </PolicySection>

              {/* Section 9 */}
              <PolicySection title="9. Changes to This Policy">
                <p>
                  We may update this privacy policy from time to time. We will
                  notify you of any significant changes by posting the new
                  policy on this page with an updated revision date.
                </p>
              </PolicySection>

              {/* Section 10 */}
              <PolicySection title="10. Contact Us">
                <p>
                  If you have questions about this privacy policy or your
                  personal data, contact us at:
                </p>
                <div className="mt-4 p-4 bg-[#F2F2F2] rounded-xl">
                  <p className="font-semibold text-[#121E1E]">
                    Jibal Adventures
                  </p>
                  <p className="text-[#5A6666]">
                    Email: Zooky@JibalAdventures.com
                  </p>
                  <p className="text-[#5A6666]">Phone: +965 66626223</p>
                </div>
              </PolicySection>
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

function PolicySection({
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
