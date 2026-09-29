"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Search, HelpCircle } from "lucide-react";
import { mockFAQs, FAQItem } from "@/data/faqs";

const CATEGORIES = [
  "All",
  "Account",
  "Profiles",
  "Verification",
  "Membership",
  "Privacy",
  "Family",
  "Payments",
  "Safety",
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const filteredFAQs = mockFAQs.filter((item) => {
    const matchCat = activeCategory === "All" || item.category === activeCategory;
    const matchQ =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand dark:bg-charcoal-surface border border-bmBorder dark:border-charcoal-border text-xs font-semibold text-burgundy dark:text-gold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Help & Clarity</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal dark:text-ivory">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-bmText-secondary dark:text-bmText-darkSecondary leading-relaxed">
          Everything you need to know about our verification, privacy safeguards, family permissions, and membership tiers.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-lg mx-auto">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-bmText-muted" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by topic, e.g. Gotra, Privacy, Verification..."
          className="w-full pl-11 pr-4 py-3 rounded-full text-xs sm:text-sm bg-white dark:bg-charcoal-surface border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory focus:outline-none focus:border-burgundy dark:focus:border-gold transition-colors shadow-subtle"
        />
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-center gap-1.5 flex-wrap text-xs">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full font-medium transition-colors ${
              activeCategory === cat
                ? "bg-burgundy text-white shadow-xs"
                : "bg-sand/60 dark:bg-charcoal-surface text-bmText-secondary hover:text-charcoal dark:hover:text-ivory border border-bmBorder dark:border-charcoal-border"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFAQs.length === 0 ? (
          <div className="p-8 text-center text-xs text-bmText-secondary">
            No matching questions found. Try a different search term.
          </div>
        ) : (
          filteredFAQs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className="bg-white dark:bg-charcoal-surface rounded-2xl border border-bmBorder dark:border-charcoal-border overflow-hidden transition-all shadow-subtle"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-base font-bold text-charcoal dark:text-ivory"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-xs font-sans px-2 py-0.5 rounded bg-sand dark:bg-charcoal-muted text-gold font-normal">
                      {faq.category}
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  {isOpen ? <ChevronUp className="w-4 h-4 shrink-0 text-gold" /> : <ChevronDown className="w-4 h-4 shrink-0 text-bmText-muted" />}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-bmText-secondary dark:text-bmText-darkSecondary leading-relaxed border-t border-bmBorder/40 dark:border-charcoal-border/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
