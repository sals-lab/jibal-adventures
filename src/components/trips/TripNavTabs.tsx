"use client";

import { useState, useEffect } from "react";

// =============================================================================
// TRIP NAV TABS - Sticky navigation for trip detail page
// =============================================================================

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "dates", label: "Dates & Prices" },
  { id: "inclusions", label: "Inclusions" },
  { id: "itinerary", label: "Itinerary" },
  { id: "gallery", label: "Gallery" },
];

export function TripNavTabs() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 500);

      const sections = tabs
        .map((tab) => ({
          id: tab.id,
          element: document.getElementById(tab.id),
        }))
        .filter((s) => s.element);

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveTab(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`bg-white border-b border-[#E8E8E8] transition-all duration-300 ${
        isSticky ? "sticky top-16 md:top-20 z-40 shadow-md" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => scrollToSection(tab.id)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-200 border-b-2 ${
                activeTab === tab.id
                  ? "border-[#121E1E] text-[#121E1E]"
                  : "border-transparent text-[#5A6666] hover:text-[#121E1E]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
