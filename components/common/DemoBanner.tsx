"use client";

import React, { useState } from "react";
import { Sparkles, X } from "lucide-react";

export const DemoBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-sand dark:bg-charcoal-muted border-b border-bmBorder dark:border-charcoal-border text-xs text-bmText-secondary dark:text-bmText-darkSecondary px-4 py-1.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
          <span>
            <strong className="font-medium text-bmText-primary dark:text-bmText-darkPrimary">
              Interactive Prototype:
            </strong>{" "}
            All candidate profiles, statistics, and family connections are realistic fictional demo data.
          </span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-bmText-muted hover:text-bmText-primary dark:hover:text-bmText-darkPrimary p-0.5"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
