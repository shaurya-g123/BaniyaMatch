"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Sparkles, MapPin, Calendar, Users } from "lucide-react";
import { mockSuccessStories } from "@/data/stories";

export default function SuccessStoriesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand dark:bg-charcoal-surface border border-bmBorder dark:border-charcoal-border text-xs font-semibold text-burgundy dark:text-gold">
          <Heart className="w-3.5 h-3.5 fill-current" />
          <span>Fictional Demo Celebrations</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal dark:text-ivory">
          Stories of Companionship & Grace
        </h1>
        <p className="text-xs sm:text-sm text-bmText-secondary dark:text-bmText-darkSecondary leading-relaxed">
          How modern Baniya professionals and their families found shared cultural values, mutual respect, and lifelong partnership.
        </p>
      </div>

      {/* Stories Editorial Grid */}
      <div className="space-y-12">
        {mockSuccessStories.map((story, idx) => {
          const isReversed = idx % 2 === 1;
          return (
            <div
              key={story.id}
              className={`bg-white dark:bg-charcoal-surface rounded-3xl border border-bmBorder dark:border-charcoal-border overflow-hidden shadow-subtle grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 ${
                isReversed ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Couple Photograph */}
              <div className={`lg:col-span-5 relative aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-sand ${
                isReversed ? "lg:order-2" : "lg:order-1"
              }`}>
                <Image
                  src={story.image}
                  alt={story.coupleNames}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium bg-ivory/90 dark:bg-charcoal/90 text-charcoal dark:text-ivory shadow-xs">
                  {story.location}
                </div>
              </div>

              {/* Story Narrative */}
              <div className={`lg:col-span-7 space-y-4 ${isReversed ? "lg:order-1" : "lg:order-2"}`}>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gold">
                    <Users className="w-3.5 h-3.5" />
                    <span>{story.community}</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal dark:text-ivory">
                    {story.coupleNames}
                  </h2>
                  <div className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary flex items-center gap-3 pt-0.5">
                    <span>Celebrated in {story.weddingDate}</span>
                    <span>•</span>
                    <span>{story.timeline}</span>
                  </div>
                </div>

                {/* Pull Quote */}
                <blockquote className="p-4 rounded-xl bg-sand/30 dark:bg-charcoal-muted border-l-4 border-gold text-sm sm:text-base font-serif italic text-charcoal dark:text-ivory leading-relaxed">
                  "{story.quote}"
                </blockquote>

                {/* Full Courtship Narrative */}
                <p className="text-xs sm:text-sm text-bmText-secondary dark:text-bmText-darkSecondary leading-relaxed">
                  {story.fullStory}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Subtle Demo Notice */}
      <div className="text-center pt-8 border-t border-bmBorder dark:border-charcoal-border text-xs text-bmText-muted">
        All names, wedding accounts, and locations above are illustrative demo narratives created for platform preview.
      </div>
    </div>
  );
}
