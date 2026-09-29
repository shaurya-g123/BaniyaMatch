"use client";

import React, { Suspense, useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, Search, RotateCcw, Sparkles, Crown, X, Check } from "lucide-react";
import { FilterState, GotraType } from "@/lib/types";
import { mockProfiles } from "@/data/profiles";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { FilterPanel } from "@/components/profile/FilterPanel";

const ALL_18_GOTRAS: GotraType[] = [
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
  "Bindal",
];

const initialFilterState: FilterState = {
  searchQuery: "",
  ageRange: [21, 38],
  heightRange: ["5'0\"", "6'2\""],
  incomeRanges: [],
  communities: [],
  gotras: [],
  locations: [],
  isNRIOnly: false,
  diet: [],
  professions: [],
  educationLevels: [],
  familyValues: [],
  manglik: [],
  verifiedOnly: false,
  premiumOnly: false,
  businessOnly: false,
  timeline: [],
  sortBy: "recommended",
};

function BrowseContent() {
  const searchParams = useSearchParams();
  const gotraParam = searchParams.get("gotra");
  const tabParam = searchParams.get("tab");

  const [filters, setFilters] = useState<FilterState>(() => {
    if (gotraParam) {
      const match = ALL_18_GOTRAS.find((g) =>
        g.toLowerCase().includes(gotraParam.toLowerCase())
      );
      if (match) {
        return { ...initialFilterState, gotras: [match] };
      }
    }
    return initialFilterState;
  });

  const [activeTab, setActiveTab] = useState<"recommended" | "recent" | "new" | "verified" | "nri">(
    tabParam === "nri" ? "nri" : tabParam === "verified" ? "verified" : "recommended"
  );
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync when searchParams change
  useEffect(() => {
    if (gotraParam) {
      const match = ALL_18_GOTRAS.find((g) =>
        g.toLowerCase().includes(gotraParam.toLowerCase())
      );
      if (match) {
        setFilters((prev) => ({
          ...prev,
          gotras: [match],
        }));
      }
    }
  }, [gotraParam]);

  // Count profiles per Gotra for quick badges
  const gotraCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    ALL_18_GOTRAS.forEach((g) => {
      counts[g] = mockProfiles.filter((p) => p.gotra === g).length;
    });
    return counts;
  }, []);

  const handleGotraPillClick = (gotra: GotraType | "all") => {
    if (gotra === "all") {
      setFilters((prev) => ({ ...prev, gotras: [] }));
    } else {
      setFilters((prev) => {
        const isSelected = prev.gotras.includes(gotra);
        return {
          ...prev,
          gotras: isSelected ? [] : [gotra],
        };
      });
    }
  };

  // Compute filtered profiles
  const filteredProfiles = useMemo(() => {
    let list = [...mockProfiles];

    // Search query
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.profession.toLowerCase().includes(q) ||
          p.community.toLowerCase().includes(q) ||
          p.gotra.toLowerCase().includes(q) ||
          p.education.toLowerCase().includes(q)
      );
    }

    // Tab filter
    if (activeTab === "verified") {
      list = list.filter((p) => p.isVerified);
    } else if (activeTab === "nri") {
      list = list.filter((p) => p.isNRI);
    } else if (activeTab === "new") {
      list = list.filter((p) => p.isNew);
    }

    // Age
    list = list.filter((p) => p.age >= filters.ageRange[0] && p.age <= filters.ageRange[1]);

    // NRI
    if (filters.isNRIOnly) {
      list = list.filter((p) => p.isNRI);
    }

    // Communities
    if (filters.communities.length > 0) {
      list = list.filter((p) => filters.communities.includes(p.community));
    }

    // Gotras
    if (filters.gotras.length > 0) {
      list = list.filter((p) => filters.gotras.includes(p.gotra));
    }

    // Diet
    if (filters.diet.length > 0) {
      list = list.filter((p) => filters.diet.includes(p.diet));
    }

    // Verified only
    if (filters.verifiedOnly) {
      list = list.filter((p) => p.isVerified);
    }

    // Premium only
    if (filters.premiumOnly) {
      list = list.filter((p) => p.isPremium);
    }

    // Business only
    if (filters.businessOnly) {
      list = list.filter((p) => p.isBusiness);
    }

    // Sorting
    if (activeTab === "recent") {
      list.sort((a, b) => (b.lastActive.includes("today") ? 1 : 0) - (a.lastActive.includes("today") ? 1 : 0));
    } else {
      list.sort((a, b) => b.compatibility.overall - a.compatibility.overall);
    }

    return list;
  }, [filters, activeTab]);

  const handleResetFilters = () => {
    setFilters(initialFilterState);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-bmBorder dark:border-charcoal-border">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-3xl font-bold text-charcoal dark:text-ivory">
              Discover Verified Profiles
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gold/15 text-charcoal dark:text-gold border border-gold/30">
              <Crown className="w-3 h-3 text-gold" />
              18 Classical Gotras
            </span>
          </div>
          <p className="text-xs sm:text-sm text-bmText-secondary dark:text-bmText-darkSecondary mt-0.5">
            Showing <strong className="text-charcoal dark:text-ivory">{filteredProfiles.length}</strong> cosmopolitan North Indian profiles
          </p>
        </div>

        {/* Search input & Mobile filter trigger */}
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-bmText-muted" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
              placeholder="Search surname, gotra, city, college..."
              className="w-full pl-9 pr-3 py-2 rounded-full text-xs bg-white dark:bg-charcoal-surface border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory focus:outline-none focus:border-burgundy dark:focus:border-gold transition-colors"
            />
          </div>

          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-full bg-sand dark:bg-charcoal-surface border border-bmBorder dark:border-charcoal-border text-xs font-medium text-charcoal dark:text-ivory"
          >
            <SlidersHorizontal className="w-4 h-4 text-burgundy dark:text-gold" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Discovery Quick Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {[
          { id: "recommended", label: "Recommended" },
          { id: "recent", label: "Recently Active" },
          { id: "new", label: "New Members" },
          { id: "verified", label: "Verified Only" },
          { id: "nri", label: "NRI Hubs (USA, UK, Dubai, Singapore)" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? "bg-burgundy text-white shadow-xs"
                : "bg-white dark:bg-charcoal-surface text-bmText-secondary dark:text-bmText-darkSecondary hover:text-charcoal dark:hover:text-ivory border border-bmBorder dark:border-charcoal-border"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ======================================================= */}
      {/* 18 CLASSICAL GOTRAS INTERACTIVE HERITAGE STRIP          */}
      {/* ======================================================= */}
      <div className="bg-sand/30 dark:bg-charcoal-surface/60 rounded-2xl border border-gold/30 dark:border-gold/20 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown className="w-4 h-4 text-gold" />
            <span className="text-xs font-serif font-bold uppercase tracking-wider text-charcoal dark:text-ivory">
              Filter by Classical Gotra Lineage (18 Gotras)
            </span>
          </div>
          {filters.gotras.length > 0 && (
            <button
              onClick={() => handleGotraPillClick("all")}
              className="text-xs font-medium text-burgundy dark:text-gold hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Show All Gotras</span>
            </button>
          )}
        </div>

        {/* Scrollable Gotra Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          <button
            onClick={() => handleGotraPillClick("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
              filters.gotras.length === 0
                ? "bg-gold text-charcoal shadow-xs font-semibold"
                : "bg-white dark:bg-charcoal-muted text-bmText-secondary dark:text-bmText-darkSecondary hover:text-charcoal dark:hover:text-ivory border border-bmBorder dark:border-charcoal-border"
            }`}
          >
            <span>All 18 Gotras</span>
            <span className="text-[10px] opacity-75">({mockProfiles.length})</span>
          </button>

          {ALL_18_GOTRAS.map((gotra) => {
            const isSelected = filters.gotras.includes(gotra);
            const count = gotraCounts[gotra] || 0;
            return (
              <button
                key={gotra}
                onClick={() => handleGotraPillClick(gotra)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-burgundy text-white shadow-xs font-semibold ring-2 ring-gold/50"
                    : "bg-white dark:bg-charcoal-muted text-bmText-secondary dark:text-bmText-darkSecondary hover:text-charcoal dark:hover:text-ivory border border-bmBorder dark:border-charcoal-border hover:border-gold/50"
                }`}
              >
                {isSelected && <Check className="w-3 h-3 text-gold" />}
                <span>{gotra}</span>
                <span className={`text-[10px] ${isSelected ? "text-gold" : "text-bmText-muted"}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Gotra Feedback Banner */}
        {filters.gotras.length > 0 && (
          <div className="pt-2 border-t border-gold/20 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-charcoal dark:text-ivory">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span>
                Filtered by Gotra: <strong className="font-serif text-burgundy dark:text-gold">{filters.gotras.join(", ")}</strong>
              </span>
              <span className="text-bmText-muted">• Swagotra avoidance verification active</span>
            </div>
            <button
              onClick={() => handleGotraPillClick("all")}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-bmText-secondary dark:text-bmText-darkSecondary hover:text-burgundy dark:hover:text-gold"
            >
              <X className="w-3 h-3" />
              Clear gotra filter
            </button>
          </div>
        )}
      </div>

      {/* Main Content Layout: Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Filter Panel */}
        <div className="hidden lg:block lg:col-span-4 sticky top-24">
          <FilterPanel
            filters={filters}
            onFilterChange={setFilters}
            onReset={handleResetFilters}
            totalMatchesCount={filteredProfiles.length}
          />
        </div>

        {/* Profile Grid */}
        <div className="lg:col-span-8 space-y-6">
          {filteredProfiles.length === 0 ? (
            <div className="bg-white dark:bg-charcoal-surface rounded-2xl border border-bmBorder dark:border-charcoal-border p-12 text-center space-y-4">
              <Sparkles className="w-8 h-8 text-gold mx-auto" />
              <h3 className="font-serif text-xl font-bold text-charcoal dark:text-ivory">
                No profiles match these exact filters
              </h3>
              <p className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary max-w-sm mx-auto">
                Try expanding your age bracket, clearing gotra restrictions, or toggling dietary preferences.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2 rounded-full bg-burgundy text-white text-xs font-semibold shadow-subtle"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredProfiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer Filter Sheet */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal/70 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-md h-full bg-white dark:bg-charcoal-surface p-4 overflow-y-auto animate-in slide-in-from-right duration-200">
            <FilterPanel
              filters={filters}
              onFilterChange={setFilters}
              onReset={handleResetFilters}
              totalMatchesCount={filteredProfiles.length}
              isMobileDrawer={true}
              onCloseMobileDrawer={() => setMobileFilterOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center text-xs text-bmText-muted">
          Loading verified candidate registry...
        </div>
      }
    >
      <BrowseContent />
    </Suspense>
  );
}
