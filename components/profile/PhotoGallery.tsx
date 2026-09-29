"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X, ShieldCheck } from "lucide-react";

interface PhotoGalleryProps {
  photos: string[];
  candidateName: string;
  isVerified?: boolean;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  photos,
  candidateName,
  isVerified = true,
}) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const prevPhoto = () => {
    setSelectedIdx((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const nextPhoto = () => {
    setSelectedIdx((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-3">
      {/* Main Large Photo Frame */}
      <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden bg-sand dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border shadow-card group">
        <Image
          src={photos[selectedIdx] || photos[0]}
          alt={candidateName}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-101"
        />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          {isVerified && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-ivory/95 dark:bg-charcoal/95 text-bmSuccess backdrop-blur-md shadow-xs border border-sage/30">
              <ShieldCheck className="w-4 h-4" />
              Photo Verified
            </span>
          )}
        </div>

        {/* Expand button */}
        <button
          onClick={() => setLightboxOpen(true)}
          className="absolute top-4 right-4 p-2 rounded-full bg-ivory/80 dark:bg-charcoal/80 hover:bg-white dark:hover:bg-charcoal text-charcoal dark:text-ivory backdrop-blur-md shadow-subtle transition-all"
          title="View full photo"
          aria-label="Expand image"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Prev / Next controls */}
        {photos.length > 1 && (
          <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none">
            <button
              onClick={prevPhoto}
              className="p-2 rounded-full bg-ivory/80 dark:bg-charcoal/80 hover:bg-white dark:hover:bg-charcoal text-charcoal dark:text-ivory backdrop-blur-md pointer-events-auto transition-transform active:scale-95 shadow-subtle"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextPhoto}
              className="p-2 rounded-full bg-ivory/80 dark:bg-charcoal/80 hover:bg-white dark:hover:bg-charcoal text-charcoal dark:text-ivory backdrop-blur-md pointer-events-auto transition-transform active:scale-95 shadow-subtle"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Bottom indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-charcoal/60 backdrop-blur-md text-white text-xs font-medium">
          {selectedIdx + 1} of {photos.length}
        </div>
      </div>

      {/* Thumbnails row */}
      {photos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {photos.map((photo, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              className={`relative w-20 h-24 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                idx === selectedIdx
                  ? "border-burgundy dark:border-gold scale-102 shadow-subtle"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={photo}
                alt={`${candidateName} thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover object-top"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal/95 backdrop-blur-lg flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close fullscreen"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-4xl max-h-[85vh] w-full h-[75vh] flex items-center justify-center">
            <Image
              src={photos[selectedIdx]}
              alt={candidateName}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};
