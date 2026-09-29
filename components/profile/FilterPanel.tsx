"use client";

import React from "react";
import { X, RotateCcw, Check, SlidersHorizontal } from "lucide-react";
import { FilterState, CommunityType, GotraType, DietType } from "@/lib/types";

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onReset: () => void;
  totalMatchesCount?: number;
  isMobileDrawer?: boolean;
  onCloseMobileDrawer?: () => void;
}

const ALL_COMMUNITIES: CommunityType[] = [
  "Agarwal",
  "Maheshwari",
  "Oswal",
  "Khandelwal",
  "Gupta",
  "Bansal",
  "Singhal",
  "Mittal",
  "Goyal",
  "Jindal",
  "Tayal",
  "Jain Baniya",
  "Vaishya",
  "Porwal",
  "Rastogi",
  "Mahajan",
  "Lodha",
];

const ALL_GOTRAS: GotraType[] = [
  "Garg (Gargeya)",
  "Goyal (Goel)",
  "Goyan",
  "Bansal",
  "Kansal",
  "Singhal",
  "Mangal",
  "Jindal",
  "Tingal",
  "Aeron (Airan)",
  "Dharan",
  "Madhukul",
  "Mittal",
  "Tayal",
  "Bhandal",
  "Kuchhal",
  "Nagal",
  "Bindal"
];

const ALL_DIETS: DietType[] = [
  "Pure Vegetarian",
  "Jain Vegetarian",
  "Vegan",
  "Eggetarian",
];

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  onReset,
  totalMatchesCount,
  isMobileDrawer = false,
  onCloseMobileDrawer,
}) => {
  const getActiveCount = () => {
    let count = 0;
    if (filters.ageRange[0] > 21 || filters.ageRange[1] < 38) count++;
    if (filters.communities.length > 0) count += filters.communities.length;
    if (filters.gotras.length > 0) count += filters.gotras.length;
    if (filters.diet.length > 0) count += filters.diet.length;
    if (filters.isNRIOnly) count++;
    if (filters.verifiedOnly) count++;
    if (filters.premiumOnly) count++;
    if (filters.businessOnly) count++;
    if (filters.searchQuery) count++;
    return count;
  };

  const activeCount = getActiveCount();

  const toggleCommunity = (comm: CommunityType) => {
    const next = filters.communities.includes(comm)
      ? filters.communities.filter((c) => c !== comm)
      : [...filters.communities, comm];
    onFilterChange({ ...filters, communities: next });
  };

  const toggleGotra = (gotra: GotraType) => {
    const next = filters.gotras.includes(gotra)
      ? filters.gotras.filter((g) => g !== gotra)
      : [...filters.gotras, gotra];
    onFilterChange({ ...filters, gotras: next });
  };

  const toggleDiet = (diet: DietType) => {
    const next = filters.diet.includes(diet)
      ? filters.diet.filter((d) => d !== diet)
      : [...filters.diet, diet];
    onFilterChange({ ...filters, diet: next });
  };

  return (
    <div className="bg-white dark:bg-charcoal-surface rounded-2xl border border-bmBorder dark:border-charcoal-border p-5 shadow-subtle flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-bmBorder dark:border-charcoal-border">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-burgundy dark:text-gold" />
          <h3 className="font-serif text-base font-bold text-charcoal dark:text-ivory">
            Filters
          </h3>
          {activeCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-burgundy/10 dark:bg-gold/15 text-burgundy dark:text-gold">
              {activeCount} applied
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {activeCount > 0 && (
            <button
              onClick={onReset}
              className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary hover:text-burgundy dark:hover:text-gold flex items-center gap-1 font-medium transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
          {isMobileDrawer && (
            <button
              onClick={onCloseMobileDrawer}
              className="p-1 rounded-md text-bmText-muted hover:text-charcoal dark:hover:text-ivory"
              aria-label="Close filters"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Quick Toggles */}
      <div className="space-y-2.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-bmText-secondary dark:text-bmText-darkSecondary">
          Quick Toggles
        </label>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            onClick={() => onFilterChange({ ...filters, verifiedOnly: !filters.verifiedOnly })}
            className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-colors ${
              filters.verifiedOnly
                ? "border-bmSuccess bg-sage-soft dark:bg-charcoal-muted text-bmSuccess font-medium"
                : "border-bmBorder dark:border-charcoal-border text-bmText-primary dark:text-bmText-darkPrimary"
            }`}
          >
            <span>Verified Profiles</span>
            {filters.verifiedOnly && <Check className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => onFilterChange({ ...filters, isNRIOnly: !filters.isNRIOnly })}
            className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-colors ${
              filters.isNRIOnly
                ? "border-gold bg-gold/10 text-charcoal dark:text-ivory font-medium"
                : "border-bmBorder dark:border-charcoal-border text-bmText-primary dark:text-bmText-darkPrimary"
            }`}
          >
            <span>NRI Only</span>
            {filters.isNRIOnly && <Check className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => onFilterChange({ ...filters, businessOnly: !filters.businessOnly })}
            className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-colors ${
              filters.businessOnly
                ? "border-burgundy bg-burgundy/10 text-burgundy dark:text-gold font-medium"
                : "border-bmBorder dark:border-charcoal-border text-bmText-primary dark:text-bmText-darkPrimary"
            }`}
          >
            <span>Business Families</span>
            {filters.businessOnly && <Check className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => onFilterChange({ ...filters, premiumOnly: !filters.premiumOnly })}
            className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-colors ${
              filters.premiumOnly
                ? "border-burgundy bg-burgundy/10 text-burgundy dark:text-gold font-medium"
                : "border-bmBorder dark:border-charcoal-border text-bmText-primary dark:text-bmText-darkPrimary"
            }`}
          >
            <span>Premium Members</span>
            {filters.premiumOnly && <Check className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Age Range Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-charcoal dark:text-ivory">
          <span className="uppercase tracking-wider text-bmText-secondary dark:text-bmText-darkSecondary">
            Age Range
          </span>
          <span>{filters.ageRange[0]} - {filters.ageRange[1]} yrs</span>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={21}
            max={38}
            value={filters.ageRange[0]}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                ageRange: [Math.min(Number(e.target.value), filters.ageRange[1] - 1), filters.ageRange[1]],
              })
            }
            className="w-full accent-burgundy"
          />
          <input
            type="range"
            min={21}
            max={38}
            value={filters.ageRange[1]}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                ageRange: [filters.ageRange[0], Math.max(Number(e.target.value), filters.ageRange[0] + 1)],
              })
            }
            className="w-full accent-burgundy"
          />
        </div>
      </div>

      {/* Community Chips */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider text-bmText-secondary dark:text-bmText-darkSecondary">
            Baniya Community
          </label>
          {filters.communities.length > 0 && (
            <button
              onClick={() => onFilterChange({ ...filters, communities: [] })}
              className="text-[11px] text-bmText-muted hover:text-burgundy"
            >
              Clear
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
          {ALL_COMMUNITIES.map((comm) => {
            const selected = filters.communities.includes(comm);
            return (
              <button
                key={comm}
                onClick={() => toggleCommunity(comm)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                  selected
                    ? "bg-burgundy text-white shadow-xs"
                    : "bg-sand/70 dark:bg-charcoal-muted text-bmText-primary dark:text-bmText-darkPrimary hover:bg-sand"
                }`}
              >
                {comm}
              </button>
            );
          })}
        </div>
      </div>

      {/* Gotra Selector */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider text-bmText-secondary dark:text-bmText-darkSecondary">
            Gotra
          </label>
          {filters.gotras.length > 0 && (
            <button
              onClick={() => onFilterChange({ ...filters, gotras: [] })}
              className="text-[11px] text-bmText-muted hover:text-burgundy"
            >
              Clear
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pr-1">
          {ALL_GOTRAS.map((gotra) => {
            const selected = filters.gotras.includes(gotra);
            return (
              <button
                key={gotra}
                onClick={() => toggleGotra(gotra)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                  selected
                    ? "bg-burgundy text-white shadow-xs"
                    : "bg-sand/70 dark:bg-charcoal-muted text-bmText-primary dark:text-bmText-darkPrimary hover:bg-sand"
                }`}
              >
                {gotra}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dietary Preference */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-bmText-secondary dark:text-bmText-darkSecondary">
          Dietary Preference
        </label>
        <div className="flex flex-wrap gap-1.5">
          {ALL_DIETS.map((diet) => {
            const selected = filters.diet.includes(diet);
            return (
              <button
                key={diet}
                onClick={() => toggleDiet(diet)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                  selected
                    ? "bg-sage text-white shadow-xs"
                    : "bg-sand/70 dark:bg-charcoal-muted text-bmText-primary dark:text-bmText-darkPrimary hover:bg-sand"
                }`}
              >
                {diet}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Close / Apply Button */}
      {isMobileDrawer && (
        <div className="pt-3 border-t border-bmBorder dark:border-charcoal-border">
          <button
            onClick={onCloseMobileDrawer}
            className="w-full py-2.5 rounded-full bg-burgundy text-white font-medium text-sm shadow-card"
          >
            Show {totalMatchesCount ?? "Filtered"} Profiles
          </button>
        </div>
      )}
    </div>
  );
};
