"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Section";

// =============================================================================
// CONTACT PAGE
// =============================================================================

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // TODO: Replace with your actual API endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      {/* ================================================================== */}
      {/* HERO SECTION */}
      {/* ================================================================== */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 bg-[#BABCA7]/30 text-[#121E1E] text-xs font-semibold rounded-full mb-6">
              GET IN TOUCH
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#121E1E] mb-6">
              Let's Plan Your Next Adventure
            </h1>
            <p className="text-xl text-[#5A6666] leading-relaxed">
              Have questions about a trip? Want to know more about our
              expeditions? We're here to help you plan the adventure of a
              lifetime.
            </p>
          </div>
        </Container>
      </section>

      {/* ================================================================== */}
      {/* MAIN CONTENT */}
      {/* ================================================================== */}
      <section className="py-16 md:py-24 bg-[#F2F2F2]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-[#121E1E] mb-6">
                Send Us a Message
              </h2>

              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <p className="text-green-800 font-medium">
                    ✓ Message sent successfully! We'll get back to you soon.
                  </p>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-800 font-medium">
                    ✗ Something went wrong. Please try again or contact us
                    directly.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-[#121E1E] mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#E8E8E8] focus:outline-none focus:ring-2 focus:ring-[#BABCA7] focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-[#121E1E] mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#E8E8E8] focus:outline-none focus:ring-2 focus:ring-[#BABCA7] focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-[#121E1E] mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8E8E8] focus:outline-none focus:ring-2 focus:ring-[#BABCA7] focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about your adventure goals, questions, or anything else..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-[#BABCA7] text-[#121E1E] font-semibold rounded-xl hover:bg-[#D1D3C4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#121E1E] mb-8">
                Other Ways to Reach Us
              </h2>

              <div className="space-y-6">
                {/* Email */}
                <ContactItem
                  icon={<EmailIcon />}
                  title="Email Us"
                  content="zooky@jibaladventures.com"
                  href="mailto:zooky@jibaladventures.com"
                />

                {/* Phone */}
                <ContactItem
                  icon={<PhoneIcon />}
                  title="Call Us"
                  content="+965 66626223"
                  href="tel:+96566626223"
                />

                {/* WhatsApp */}
                <ContactItem
                  icon={<WhatsAppIcon />}
                  title="WhatsApp"
                  content="Chat with us on WhatsApp"
                  href="https://wa.me/96566626223"
                />
              </div>

              {/* Office Hours */}
              <div className="mt-8 p-6 bg-white rounded-2xl border border-[#E8E8E8]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#BABCA7]/30 flex items-center justify-center">
                    <ClockIcon />
                  </div>
                  <h3 className="font-bold text-[#121E1E]">Office Hours</h3>
                </div>
                <div className="space-y-2 text-[#5A6666]">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                  <p className="text-sm pt-2 border-t border-[#E8E8E8] mt-4">
                    Kuwait Standard Time (GMT+3)
                  </p>
                </div>
              </div>

              {/* FAQ Link */}
              <div className="mt-8 p-6 bg-white rounded-2xl shadow-md">
                <h3 className="font-bold mb-2">Have a quick question?</h3>
                <p className="text-[#121E1E]/70 text-sm mb-4">
                  Check out our FAQ section for instant answers to common
                  questions.
                </p>
                <Link
                  href="/#faq"
                  className="inline-flex items-center gap-2 text-[#BABCA7] font-medium hover:underline"
                >
                  View FAQ
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================== */}
      {/* CTA SECTION */}
      {/* ================================================================== */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="bg-[#F2F2F2] rounded-3xl p-8 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#121E1E] mb-4">
              Ready to Explore?
            </h2>
            <p className="text-[#5A6666] text-lg mb-8 max-w-2xl mx-auto">
              Browse our upcoming expeditions and find your next adventure.
            </p>
            <Link
              href="/trips"
              className="inline-block px-8 py-4 bg-[#BABCA7] text-[#121E1E] font-semibold rounded-xl hover:bg-[#D1D3C4] transition-colors"
            >
              Browse All Trips
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

function ContactItem({
  icon,
  title,
  content,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-[#E8E8E8] hover:border-[#BABCA7] transition-colors group"
    >
      <div className="w-12 h-12 rounded-xl bg-[#BABCA7]/30 flex items-center justify-center text-[#121E1E] flex-shrink-0 group-hover:bg-[#BABCA7] transition-colors">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-[#121E1E] mb-1">{title}</h3>
        <p className="text-[#5A6666]">{content}</p>
      </div>
    </a>
  );
}

// =============================================================================
// ICONS
// =============================================================================

function EmailIcon() {
  return (
    <svg
      className="w-6 h-6"
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

function PhoneIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      className="w-5 h-5 text-[#121E1E]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
