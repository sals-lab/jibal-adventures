"use client";

import { useState } from "react";

// =============================================================================
// ITINERARY ACCORDION COMPONENT
// =============================================================================

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

interface ItineraryAccordionProps {
  itinerary: string;
}

export function ItineraryAccordion({ itinerary }: ItineraryAccordionProps) {
  // Track multiple open days using a Set
  const [openDays, setOpenDays] = useState<Set<number>>(new Set([1]));

  const days = parseItinerary(itinerary);

  const toggleDay = (day: number) => {
    setOpenDays((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(day)) {
        newSet.delete(day);
      } else {
        newSet.add(day);
      }
      return newSet;
    });
  };

  const isOpen = (day: number) => openDays.has(day);

  if (days.length === 0) {
    return (
      <div className="text-[#5A6666]">
        <p>{itinerary}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {days.map((day) => (
        <div
          key={day.day}
          className="border border-[#E8E8E8] rounded-xl overflow-hidden bg-white"
        >
          {/* Day Header */}
          <button
            onClick={() => toggleDay(day.day)}
            className="w-full px-5 py-4 flex items-center gap-4 hover:bg-[#F9F9F9] transition-colors duration-200"
          >
            {/* Day Number Circle */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                isOpen(day.day)
                  ? "bg-[#121E1E] text-white"
                  : "bg-[#F2F2F2] text-[#121E1E]"
              }`}
            >
              <span className="font-bold text-sm">{day.day}</span>
            </div>

            {/* Day Title */}
            <div className="flex-1 text-left">
              <h4 className="font-semibold text-[#121E1E]">{day.title}</h4>
            </div>

            {/* Chevron */}
            <svg
              className={`w-5 h-5 text-[#5A6666] transition-transform duration-300 ${
                isOpen(day.day) ? "rotate-180" : ""
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
          </button>

          {/* Day Content */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isOpen(day.day) ? "max-h-96" : "max-h-0"
            }`}
          >
            <div className="px-5 pb-5 pt-0 ml-14">
              <p className="text-[#5A6666] leading-relaxed">
                {day.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// =============================================================================
// PARSER: Converts itinerary string into structured days
// =============================================================================

function parseItinerary(itinerary: string): ItineraryDay[] {
  if (!itinerary) return [];

  const days: ItineraryDay[] = [];

  const dayBlocks = itinerary
    .split(/(?=Day\s*\d+\s*[:\-–])/i)
    .filter((block) => block.trim());

  for (const block of dayBlocks) {
    const dayMatch = block.match(/Day\s*(\d+)\s*[:\-–]\s*/i);
    if (!dayMatch) continue;

    const dayNum = parseInt(dayMatch[1]);
    const content = block.replace(/Day\s*\d+\s*[:\-–]\s*/i, "").trim();

    if (!content) continue;

    let title: string;
    let description: string;

    if (content.includes("|")) {
      const parts = content.split("|");
      title = parts[0].trim();
      description = parts.slice(1).join("|").trim();
    } else if (content.includes(". ")) {
      const firstPeriod = content.indexOf(". ");
      const potentialTitle = content.substring(0, firstPeriod);

      if (potentialTitle.length < 60) {
        title = potentialTitle;
        description = content.substring(firstPeriod + 2).trim();
      } else {
        title = createShortTitle(content);
        description = content;
      }
    } else {
      title = createShortTitle(content);
      description = content;
    }

    days.push({ day: dayNum, title, description });
  }

  return days.sort((a, b) => a.day - b.day);
}

function createShortTitle(content: string): string {
  if (content.length <= 50) return content;

  const truncated = content.substring(0, 50);
  const lastSpace = truncated.lastIndexOf(" ");

  if (lastSpace > 20) {
    return truncated.substring(0, lastSpace) + "...";
  }

  return truncated + "...";
}
