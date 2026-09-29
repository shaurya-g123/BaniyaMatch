"use client";

import React from "react";
import { Users, CheckCircle2, AlertCircle } from "lucide-react";
import { FamilyDetails } from "@/lib/types";

interface FamilyCompatibilityCardProps {
  candidateFamily: FamilyDetails;
  userFamily?: Partial<FamilyDetails>;
  className?: string;
}

export const FamilyCompatibilityCard: React.FC<FamilyCompatibilityCardProps> = ({
  candidateFamily,
  className = "",
}) => {
  // Candidate family vs User profile defaults
  const comparisons = [
    {
      parameter: "Family Structure",
      candidate: candidateFamily.familyType + " Family",
      user: "Nuclear Family with Joint Values",
      status: "High Alignment",
      notes: "Both cherish regular weekend gatherings and festival celebrations."
    },
    {
      parameter: "Cultural Outlook",
      candidate: candidateFamily.familyValues + " Values",
      user: "Moderate Values",
      status: "Aligned",
      notes: "Both balance contemporary lifestyles with traditional respect."
    },
    {
      parameter: "Living Arrangements",
      candidate: candidateFamily.livingArrangement,
      user: "Open to independent setup in Delhi NCR",
      status: "Harmonious",
      notes: "Both prefer proximity to parents while maintaining personal space."
    },
    {
      parameter: "Decision Collaboration",
      candidate: candidateFamily.familyInvolvement,
      user: "High Involvement with candidate consent",
      status: "Identical Outlook",
      notes: "Candidate and parents make matrimonial choices through open dialogue."
    }
  ];

  return (
    <div className={`bg-white dark:bg-charcoal-surface rounded-2xl border border-bmBorder dark:border-charcoal-border p-6 shadow-subtle ${className}`}>
      <div className="flex items-center justify-between pb-4 border-b border-bmBorder dark:border-charcoal-border">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-burgundy dark:text-gold" />
          <h3 className="font-serif text-xl font-bold text-charcoal dark:text-ivory">
            Family Compatibility Comparison
          </h3>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-sage-soft text-bmSuccess border border-sage/30">
          91% Family Fit
        </span>
      </div>

      <p className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary mt-3">
        In our community, marriages connect two lineages. Here is how your family parameters match side by side.
      </p>

      {/* Comparison Grid */}
      <div className="mt-5 space-y-4">
        {comparisons.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-sand/40 dark:bg-charcoal-muted border border-bmBorder/60 dark:border-charcoal-border/60 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
          >
            <div className="md:w-1/3">
              <span className="font-semibold text-charcoal dark:text-ivory text-sm block">
                {item.parameter}
              </span>
              <span className="text-[11px] text-bmSuccess flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3 h-3" /> {item.status}
              </span>
            </div>

            <div className="md:w-1/3 border-t md:border-t-0 md:border-l border-bmBorder dark:border-charcoal-border pt-2 md:pt-0 md:pl-4">
              <div className="text-[10px] uppercase tracking-wider text-bmText-secondary dark:text-bmText-darkSecondary">
                Their Family
              </div>
              <div className="font-medium text-charcoal dark:text-ivory mt-0.5">
                {item.candidate}
              </div>
            </div>

            <div className="md:w-1/3 border-t md:border-t-0 md:border-l border-bmBorder dark:border-charcoal-border pt-2 md:pt-0 md:pl-4">
              <div className="text-[10px] uppercase tracking-wider text-bmText-secondary dark:text-bmText-darkSecondary">
                Compatibility Note
              </div>
              <div className="text-[11px] text-bmText-secondary dark:text-bmText-darkSecondary italic mt-0.5">
                {item.notes}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Family Credentials Details */}
      <div className="mt-6 pt-5 border-t border-bmBorder dark:border-charcoal-border grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div>
          <span className="text-[11px] text-bmText-secondary dark:text-bmText-darkSecondary block">
            Father's Background
          </span>
          <span className="font-medium text-charcoal dark:text-ivory mt-0.5 block">
            {candidateFamily.fatherOccupation}
          </span>
        </div>
        <div>
          <span className="text-[11px] text-bmText-secondary dark:text-bmText-darkSecondary block">
            Mother's Background
          </span>
          <span className="font-medium text-charcoal dark:text-ivory mt-0.5 block">
            {candidateFamily.motherOccupation}
          </span>
        </div>
        <div>
          <span className="text-[11px] text-bmText-secondary dark:text-bmText-darkSecondary block">
            Native Ancestral Place
          </span>
          <span className="font-medium text-charcoal dark:text-ivory mt-0.5 block">
            {candidateFamily.nativePlace}
          </span>
        </div>
        <div>
          <span className="text-[11px] text-bmText-secondary dark:text-bmText-darkSecondary block">
            Siblings
          </span>
          <span className="font-medium text-charcoal dark:text-ivory mt-0.5 block">
            {candidateFamily.siblings}
          </span>
        </div>
      </div>
    </div>
  );
};
