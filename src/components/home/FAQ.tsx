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
      "Our trips range from easy to challenging, offering something no matter what your adventure appetite is. Each trip has a fitness requirement and we want to ensure that you meet those requirements when you join, so that you properly enjoy each experience with us.",
  },
  {
    question: "What's included in the trip price?",
    answer:
      "All trips include expert guides, accommodations, most meals, ground transportation, permits, and equipment where specified. International flights, travel insurance, and personal gear are not included. Check each trip page for specific inclusions.",
  },
  {
    question: "How do I book a trip?",
    answer:
      "Browse our trips and select your preferred dates then submit an application. Afterwards you’ll be able to schedule a call with your trip guide so that they can discuss preparation and answer any questions you may have. Once approved you’ll need to pay a non refundable deposit in order to secure your spot. (The deposit counts towards the overall trip price)",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Deposts made to secure your spot are non refundable. Full payment is due 45 days before the trip date. Cancellations made 4 weeks or more before the trip date are eligible for a 50% refund of the total trip cost. Excluding the non-refundable depost. Exemptions are applicable in certain cases beyond either parties control.",
  },
  {
    question: "Do you provide gear and equipment?",
    answer:
      "We provide the necessary group equipment such as the ropes, tents and essential safety gear. Personal Items like hiking boots, clothing, and sleeping bags are your responsibility. We always send a detailed packing list after booking. If you do need to rent any equipment for any adventure with us let us know.",
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
