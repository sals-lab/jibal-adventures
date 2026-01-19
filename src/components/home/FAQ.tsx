"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Section";

// =============================================================================
// FAQ SECTION
// =============================================================================
// Accordion-style FAQ section for the home page.
// =============================================================================

const faqs = [
  {
    question: "What fitness level do I need for your trips?",
    answer:
      "Our trips range from moderate to challenging. Each trip listing includes a detailed fitness requirement. Generally, you should be comfortable hiking 6-8 hours per day with a daypack. We recommend starting a training program at least 8 weeks before your trip.",
  },
  {
    question: "What's included in the trip price?",
    answer:
      "All trips include expert guides, accommodations, most meals, ground transportation, permits, and equipment where specified. International flights, travel insurance, and personal gear are not included. Check each trip page for specific inclusions.",
  },
  {
    question: "How do I book a trip?",
    answer:
      "Browse our trips, select your preferred dates, and submit an application. Once approved, you'll pay a deposit to secure your spot. We'll then schedule a consultation call to discuss preparation and answer any questions.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Deposits are refundable up to 60 days before departure. Full payment is due 45 days before the trip. Cancellations within 45 days may be eligible for credit toward a future trip. We strongly recommend travel insurance.",
  },
  {
    question: "Do you provide gear and equipment?",
    answer:
      "We provide specialized group equipment like ropes and safety gear. Personal items like hiking boots, clothing, and sleeping bags are your responsibility. We send a detailed packing list after booking and can recommend where to purchase or rent gear.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-28 bg-[#F2F2F2]">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-[#BABCA7] text-sm font-medium tracking-widest uppercase mb-3">
            Got Questions?
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: "#121E1E" }}
          >
            Frequently Asked Questions
          </h2>
          <p className="text-[#5A6666] text-lg max-w-2xl mx-auto">
            Everything you need to know before your adventure
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="mb-4 bg-white rounded-xl overflow-hidden shadow-sm"
            >
              {/* Question Button */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#F9F9F9] transition-colors duration-200"
              >
                <span className="text-lg font-semibold text-[#121E1E] pr-4">
                  {faq.question}
                </span>
                <span className="flex-shrink-0 text-[#BABCA7]">
                  <svg
                    className={`w-6 h-6 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-5 text-[#5A6666] leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
