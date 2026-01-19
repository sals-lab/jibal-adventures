"use client";

import { useState, useEffect, useCallback } from "react";

// =============================================================================
// PHOTO GALLERY WITH LIGHTBOX
// =============================================================================

interface Photo {
  url: string;
  filename: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
  tripName: string;
}

export function PhotoGallery({ photos, tripName }: PhotoGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxOpen(false);
      } else if (e.key === "ArrowRight") {
        goNext();
      } else if (e.key === "ArrowLeft") {
        goPrev();
      }
    };

    // Prevent body scroll when lightbox is open
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen, currentIndex]);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  if (!photos || photos.length === 0) return null;

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {photos.slice(0, 6).map((photo, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className={`rounded-xl overflow-hidden cursor-pointer group ${
              index === 0 ? "col-span-2 row-span-2" : ""
            }`}
          >
            <img
              src={photo.url}
              alt={`${tripName} - Photo ${index + 1}`}
              className="w-full h-full object-cover aspect-square group-hover:scale-105 transition-transform duration-300"
            />
          </button>
        ))}
      </div>

      {/* View All Button (if more than 6 photos) */}
      {photos.length > 6 && (
        <button
          onClick={() => openLightbox(0)}
          className="mt-4 w-full py-3 text-center text-[#5A6666] hover:text-[#121E1E] font-medium transition-colors"
        >
          View all {photos.length} photos
        </button>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Close gallery"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-4 text-white/70 text-sm">
            {currentIndex + 1} / {photos.length}
          </div>

          {/* Previous Button */}
          <button
            onClick={goPrev}
            className="absolute left-4 md:left-8 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Previous photo"
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Image */}
          <div className="max-w-5xl max-h-[80vh] px-16 md:px-24">
            <img
              src={photos[currentIndex].url}
              alt={`${tripName} - Photo ${currentIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
          </div>

          {/* Next Button */}
          <button
            onClick={goNext}
            className="absolute right-4 md:right-8 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Next photo"
          >
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Thumbnail Strip */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4 overflow-x-auto">
            {photos.map((photo, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-200 ${
                  index === currentIndex
                    ? "ring-2 ring-white opacity-100"
                    : "opacity-50 hover:opacity-75"
                }`}
              >
                <img
                  src={photo.url}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
