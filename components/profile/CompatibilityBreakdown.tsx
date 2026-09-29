"use client";

import React from "react";
import { Sparkles, Heart, Users, Briefcase, MapPin, Smile } from "lucide-react";
import { CompatibilityScores } from "@/lib/types";

interface CompatibilityBreakdownProps {
  scores: CompatibilityScores;
  className?: string;
}

export const CompatibilityBreakdown: React.FC<CompatibilityBreakdownProps> = ({
  scores,
  className = "",
}) => {
  const dimensions = [
    { label: "Lifestyle Alignment", value: scores.lifestyle, icon: Heart, desc: "Dietary habits, daily routine, personal wellness" },
    { label: "Family Dynamics", value: scores.family, icon: Users, desc: "Living arrangement, traditions, family involvement" },
    { label: "Career & Ambition", value: scores.career, icon: Briefcase, desc: "Educational pedigree, profession, financial outlook" },
    { label: "Location & Relocation", value: scores.location, icon: MapPin, desc: "Current city, mobility, long-term settlement" },
    { label: "Interests & Leisure", value: scores.interests, icon: Smile, desc: "Weekend pursuits, cultural appreciation, music" },
  ];

  return (
    <div className={`bg-white dark:bg-charcoal-surface rounded-2xl border border-bmBorder dark:border-charcoal-border p-6 shadow-subtle ${className}`}>
      {/* Top Header with Overall Ring/Pill */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-bmBorder dark:border-charcoal-border">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gold fill-gold" />
            <h3 className="font-serif text-xl font-bold text-charcoal dark:text-ivory">
              Holistic Compatibility Analysis
            </h3>
          </div>
          <p className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary mt-1">
            Calculated across multi-dimensional criteria rather than superficial filters.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-sand/60 dark:bg-charcoal-muted px-4 py-2 rounded-xl self-start sm:self-center border border-bmBorder/60 dark:border-charcoal-border/60">
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider text-bmText-secondary dark:text-bmText-darkSecondary font-semibold">
              Overall Score
            </div>
            <div className="text-2xl font-serif font-bold text-burgundy dark:text-gold">
              {scores.overall}%
            </div>
          </div>
        </div>
      </div>

      {/* Editorial "Why this match?" Highlight */}
      <div className="mt-5 p-4 rounded-xl bg-ivory/80 dark:bg-charcoal-muted border-l-4 border-gold">
        <div className="text-xs font-semibold uppercase tracking-wider text-burgundy dark:text-gold mb-1">
          Why This Match?
        </div>
        <p className="text-sm font-serif italic text-charcoal dark:text-ivory leading-relaxed">
          "{scores.whyMatch}"
        </p>
      </div>

      {/* 5-Dimension Progress Bars */}
      <div className="mt-6 space-y-4">
        {dimensions.map((dim) => {
          const Icon = dim.icon;
          return (
            <div key={dim.label} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-charcoal dark:text-ivory font-medium">
                  <Icon className="w-3.5 h-3.5 text-gold shrink-0" />
                  <span>{dim.label}</span>
                </div>
                <span className="font-semibold text-burgundy dark:text-gold">
                  {dim.value}%
                </span>
              </div>
              {/* Progress Track */}
              <div className="w-full h-2 rounded-full bg-sand dark:bg-charcoal-border overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-burgundy to-gold transition-all duration-700 ease-out"
                  style={{ width: `${dim.value}%` }}
                />
              </div>
              <p className="text-[11px] text-bmText-secondary dark:text-bmText-darkSecondary">
                {dim.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
