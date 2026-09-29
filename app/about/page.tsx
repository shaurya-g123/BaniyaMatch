"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ShieldCheck, Heart, Users, Compass, Building2 } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Editorial Title */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand dark:bg-charcoal-surface border border-bmBorder dark:border-charcoal-border text-xs font-semibold text-burgundy dark:text-gold">
          <Sparkles className="w-3.5 h-3.5 fill-current" />
          <span>Our Guiding Philosophy</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal dark:text-ivory leading-tight">
          Where Traditions Meet Compatibility
        </h1>
        <p className="text-sm sm:text-base text-bmText-secondary dark:text-bmText-darkSecondary leading-relaxed font-light">
          We believe young Indians should never have to choose between personal compatibility and honoring family kinship.
        </p>
      </div>

      {/* Hero Narrative & Image */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-6 space-y-4 text-xs sm:text-sm text-bmText-secondary dark:text-bmText-darkSecondary leading-relaxed">
          <p>
            For generations, Baniya families have thrived through a combination of entrepreneurial resilience, humility, and tight-knit community trust. Yet, over the last two decades, matchmaking tools fragmented into two extremes: transactional matrimonial portals that felt outdated, or casual dating apps that ignored long-term family reality.
          </p>
          <p>
            Baniya Match was created to establish a third way: a modern, beautifully designed digital home that honors our culinary lifestyle, gotra nuances, and family involvement, while providing young professionals with the space, dignity, and autonomy to choose a true equal.
          </p>
          <p className="italic font-serif text-charcoal dark:text-ivory text-base pt-1">
            "We build for the modern Indian who is unapologetically ambitious in the boardroom and grounded at the Diwali dinner table."
          </p>
        </div>

        <div className="md:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-elevated border border-bmBorder dark:border-charcoal-border bg-sand">
          <Image
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80"
            alt="Family celebration"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* 5 Core Pillars (Section 31) */}
      <div className="space-y-6 pt-6 border-t border-bmBorder dark:border-charcoal-border">
        <h2 className="font-serif text-2xl font-bold text-charcoal dark:text-ivory text-center">
          The Five Foundations of Baniya Match
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
          <div className="p-6 rounded-2xl bg-white dark:bg-charcoal-surface border border-bmBorder dark:border-charcoal-border space-y-2.5 shadow-subtle">
            <div className="w-10 h-10 rounded-xl bg-burgundy/10 text-burgundy dark:text-gold flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-charcoal dark:text-ivory">
              1. Community Heritage
            </h3>
            <p className="text-bmText-secondary dark:text-bmText-darkSecondary leading-relaxed">
              Dedicated to Baniya lineages across India and global hubs. We understand dietary vegetarian customs, gotra traditions, and festival life.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-charcoal-surface border border-bmBorder dark:border-charcoal-border space-y-2.5 shadow-subtle">
            <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-charcoal dark:text-ivory">
              2. Deep Compatibility
            </h3>
            <p className="text-bmText-secondary dark:text-bmText-darkSecondary leading-relaxed">
              Matching goes far beyond biodatas. We evaluate lifestyle ethics, intellectual curiosity, financial priorities, and location expectations.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-charcoal-surface border border-bmBorder dark:border-charcoal-border space-y-2.5 shadow-subtle">
            <div className="w-10 h-10 rounded-xl bg-sage-soft text-bmSuccess flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-charcoal dark:text-ivory">
              3. Family Collaboration
            </h3>
            <p className="text-bmText-secondary dark:text-bmText-darkSecondary leading-relaxed">
              Parents can review and suggest matches with full visibility, while the candidate holds final consent over direct communication.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-charcoal-surface border border-bmBorder dark:border-charcoal-border space-y-2.5 shadow-subtle">
            <div className="w-10 h-10 rounded-xl bg-sand text-charcoal dark:text-gold flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-charcoal dark:text-ivory">
              4. Human Technology
            </h3>
            <p className="text-bmText-secondary dark:text-bmText-darkSecondary leading-relaxed">
              Thoughtful software built with quiet luxury aesthetics, responsive speed, and zero gamified gimmicks or superficial swipe decks.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-charcoal-surface border border-bmBorder dark:border-charcoal-border space-y-2.5 shadow-subtle sm:col-span-2 lg:col-span-1">
            <div className="w-10 h-10 rounded-xl bg-burgundy/10 text-burgundy dark:text-gold flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-charcoal dark:text-ivory">
              5. Uncompromising Trust
            </h3>
            <p className="text-bmText-secondary dark:text-bmText-darkSecondary leading-relaxed">
              A 6-level verification pipeline ensuring verified education, authentic photos, masked government IDs, and swift moderation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
