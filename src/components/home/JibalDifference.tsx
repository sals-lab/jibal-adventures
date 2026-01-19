import { Container } from "@/components/ui/Section";

// =============================================================================
// JIBAL DIFFERENCE SECTION
// =============================================================================
// Highlights what makes Jibal Adventures unique.
// =============================================================================

const features = [
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    title: "Safety First",
    description:
      "Every expedition is led by certified guides with extensive wilderness first aid training and local expertise.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    title: "Small Groups",
    description:
      "Maximum 12 travelers per trip ensures personalized attention and minimal environmental impact.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Local Connections",
    description:
      "Deep partnerships with local communities provide authentic cultural experiences and support local economies.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
    title: "Premium Experience",
    description:
      "Carefully curated accommodations, equipment, and meals that elevate your adventure without compromising authenticity.",
  },
];

export function JibalDifference() {
  return (
    <section className="py-20 md:py-28 bg-[#121E1E]">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-[#BABCA7] text-sm font-medium tracking-widest uppercase mb-3">
            Why Choose Us
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: "#BABCA7" }}
          >
            The Jibal Adventure Difference
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            What sets us apart from ordinary adventure travel
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-[#1E2D2D] border border-[#BABCA7]/20 hover:bg-[#253535] transition-colors duration-300"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#BABCA7] text-[#121E1E] mb-5">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-[#BABCA7] mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-[#F2F2F2] text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
