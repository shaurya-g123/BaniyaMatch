"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Sparkles,
  Users,
  Heart,
  Search,
  Lock,
  GraduationCap,
  Briefcase,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Building2,
  Globe2,
  Crown
} from "lucide-react";
import { mockProfiles } from "@/data/profiles";
import { mockSuccessStories } from "@/data/stories";
import { ProfileCard } from "@/components/profile/ProfileCard";

// The 18 classical gotras of the Baniya lineage
const THE_18_GOTRAS = [
  { name: "Garg (Gargeya)", desc: "Lineage of Sage Garga • Strength & Wisdom" },
  { name: "Goyal (Goel)", desc: "Lineage of Sage Goya • Intellect & Enterprise" },
  { name: "Goyan", desc: "Lineage of Sage Goyan • Commercial Integrity" },
  { name: "Bansal", desc: "Lineage of Sage Vatsa • Prosperity & Leadership" },
  { name: "Kansal", desc: "Lineage of Sage Kaushik • Heritage & Honor" },
  { name: "Singhal", desc: "Lineage of Sage Shringi • Courage & Devotion" },
  { name: "Mangal", desc: "Lineage of Sage Mangal • Auspiciousness & Growth" },
  { name: "Jindal", desc: "Lineage of Sage Jaimini • Industry & Tenacity" },
  { name: "Tingal", desc: "Lineage of Sage Shandilya • Grace & Harmony" },
  { name: "Aeron (Airan)", desc: "Lineage of Sage Aurva • Vision & Fortitude" },
  { name: "Dharan", desc: "Lineage of Sage Dhara • Steadfastness & Truth" },
  { name: "Madhukul", desc: "Lineage of Sage Madhava • Compassion & Art" },
  { name: "Mittal", desc: "Lineage of Sage Maitreya • Friendship & Unity" },
  { name: "Tayal", desc: "Lineage of Sage Taitila • Balance & Precision" },
  { name: "Bhandal", desc: "Lineage of Sage Bhandilya • Resourcefulness" },
  { name: "Kuchhal", desc: "Lineage of Sage Kashyapa • Universal Respect" },
  { name: "Nagal", desc: "Lineage of Sage Nagesh • Protection & Loyalty" },
  { name: "Bindal", desc: "Lineage of Sage Bindu • Clarity & Focus" }
];

export default function HomePage() {
  const featuredProfiles = mockProfiles.slice(0, 6);
  const featuredStories = mockSuccessStories.slice(0, 3);

  return (
    <div className="space-y-24 sm:space-y-32 pb-20">
      {/* ================================================== */}
      {/* 1. BESPOKE EDITORIAL HERO                          */}
      {/* ================================================== */}
      <section className="relative pt-6 sm:pt-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sand dark:bg-charcoal-surface border border-gold/40 text-xs text-burgundy dark:text-gold font-medium tracking-wide">
              <Crown className="w-3.5 h-3.5 text-gold" />
              <span className="uppercase text-[11px] font-bold tracking-widest">
                Private Matrimonial Ledger • Baniya Lineages & NRIs
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-charcoal dark:text-ivory leading-[1.1]">
              Where Traditions Meet Compatibility
            </h1>

            <p className="text-base sm:text-lg text-bmText-secondary dark:text-bmText-darkSecondary leading-relaxed max-w-xl font-normal">
              An exclusive, high-society matchmaking experience built for ambitious Baniya professionals, business families, and global NRIs. Rooted in ancestral gotra heritage, designed with modern poise.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/onboarding"
                className="px-8 py-4 rounded-full bg-burgundy hover:bg-burgundy-dark text-white text-sm font-semibold tracking-wide shadow-card hover:shadow-elevated transition-all text-center hover:-translate-y-0.5 active:translate-y-0"
              >
                Create Private Dossier
              </Link>
              <Link
                href="/browse"
                className="px-8 py-4 rounded-full bg-sand hover:bg-bmBorder dark:bg-charcoal-surface dark:hover:bg-charcoal-border text-charcoal dark:text-ivory text-sm font-semibold tracking-wide border border-bmBorder dark:border-charcoal-border transition-all text-center"
              >
                Explore 18 Gotras
              </Link>
            </div>

            {/* Value Pillars row */}
            <div className="pt-6 border-t border-bmBorder dark:border-charcoal-border grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-medium text-bmText-secondary dark:text-bmText-darkSecondary">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-bmSuccess shrink-0" />
                <span>Verified Profiles</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Crown className="w-4 h-4 text-gold shrink-0" />
                <span>18 Gotras Registry</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-gold shrink-0" />
                <span>Private & Masked</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe2 className="w-4 h-4 text-sage shrink-0" />
                <span>Tier 1 & NRI Hubs</span>
              </div>
            </div>
          </div>

          {/* Right Editorial Couple Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-elevated border-2 border-gold/30 bg-sand dark:bg-charcoal-muted">
              <Image
                src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85"
                alt="Modern North Indian couple with refined international aesthetic"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />

              {/* Floating verified badge card */}
              <div className="absolute bottom-6 left-6 right-6 p-4 sm:p-5 rounded-2xl bg-ivory/95 dark:bg-charcoal/95 backdrop-blur-md border border-gold/40 shadow-card flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-burgundy dark:text-gold">
                    <Sparkles className="w-3.5 h-3.5 fill-current" />
                    <span>Holistic Compatibility Matrix</span>
                  </div>
                  <p className="text-xs text-charcoal dark:text-ivory mt-0.5">
                    Agarwal, Goel, Bansal, Mittal, Singhal, Jindal, Maheshwari, Oswal, Gupta
                  </p>
                </div>
                <div className="text-right pl-4 border-l border-bmBorder dark:border-charcoal-border">
                  <span className="text-[10px] text-bmText-secondary uppercase tracking-widest block font-semibold">Average</span>
                  <span className="font-serif font-bold text-xl text-charcoal dark:text-ivory">94%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 2. THE 18 CLASSICAL GOTRAS REGISTRY SHOWCASE       */}
      {/* ================================================== */}
      <section className="bg-sand/60 dark:bg-charcoal-surface/60 border-y border-bmBorder dark:border-charcoal-border py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-burgundy dark:text-gold mb-1">
                <Crown className="w-3.5 h-3.5 text-gold" />
                <span>Ancestral Lineage Verification</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal dark:text-ivory">
                The 18 Classical Gotras of the Baniya Lineage
              </h2>
              <p className="text-xs sm:text-sm text-bmText-secondary dark:text-bmText-darkSecondary mt-1 max-w-2xl leading-relaxed">
                Every member profile is verified with self-gotra, maternal-gotra, and paternal grandmother lineage for strict astrological and customary compatibility.
              </p>
            </div>

            <Link
              href="/browse"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-burgundy dark:text-gold hover:underline self-start md:self-auto"
            >
              <span>Filter by Gotra</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 18 Gotras Interactive Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {THE_18_GOTRAS.map((gotra, idx) => (
              <Link
                key={gotra.name}
                href={`/browse?gotra=${encodeURIComponent(gotra.name)}`}
                className="group p-3.5 rounded-2xl bg-white dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border hover:border-gold dark:hover:border-gold shadow-xs hover:shadow-subtle transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-gold font-bold">
                    #{String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif font-bold text-sm text-charcoal dark:text-ivory group-hover:text-burgundy dark:group-hover:text-gold transition-colors mt-0.5">
                    {gotra.name}
                  </h3>
                  <p className="text-[10px] text-bmText-secondary dark:text-bmText-darkSecondary mt-1 leading-normal line-clamp-2">
                    {gotra.desc}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-bmBorder/40 dark:border-charcoal-border/40 text-[10px] text-burgundy dark:text-gold font-semibold flex items-center justify-between">
                  <span>Browse</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 3. PROFILE DISCOVERY SECTION                       */}
      {/* ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-burgundy dark:text-gold">
              Curated Profiles
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal dark:text-ivory mt-1">
              Meet People Looking for Something Real
            </h2>
            <p className="text-xs sm:text-sm text-bmText-secondary dark:text-bmText-darkSecondary mt-1 max-w-xl">
              North Indian professionals, venture founders, and business heirs with verified educational pedigree and authentic gotra records.
            </p>
          </div>

          <Link
            href="/browse"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-burgundy dark:text-gold hover:underline"
          >
            <span>Explore All 108 Verified Profiles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Profile Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredProfiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      </section>

      {/* ================================================== */}
      {/* 4. HOW IT WORKS (EDITORIAL PROGRESSION)            */}
      {/* ================================================== */}
      <section className="bg-sand/60 dark:bg-charcoal-surface/60 border-y border-bmBorder dark:border-charcoal-border py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-burgundy dark:text-gold">
              A Thoughtful Process
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal dark:text-ivory">
              Modern Matchmaking Designed for Clarity
            </h2>
            <p className="text-xs sm:text-sm text-bmText-secondary dark:text-bmText-darkSecondary leading-relaxed">
              We replace endless swiping and awkward bio-datas with transparent, family-aligned connections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="bg-white dark:bg-charcoal-muted rounded-2xl p-6 border border-bmBorder dark:border-charcoal-border space-y-4 shadow-subtle hover:shadow-card transition-all">
              <div className="w-10 h-10 rounded-full bg-burgundy/10 text-burgundy dark:text-gold font-serif font-bold text-lg flex items-center justify-center">
                1
              </div>
              <h3 className="font-serif text-lg font-bold text-charcoal dark:text-ivory">
                Tell us what matters
              </h3>
              <p className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary leading-relaxed">
                Specify your dietary lifestyle, gotra requirements, career trajectory, and family expectations upfront.
              </p>
            </div>

            <div className="bg-white dark:bg-charcoal-muted rounded-2xl p-6 border border-bmBorder dark:border-charcoal-border space-y-4 shadow-subtle hover:shadow-card transition-all">
              <div className="w-10 h-10 rounded-full bg-gold/20 text-gold-dark dark:text-gold font-serif font-bold text-lg flex items-center justify-center">
                2
              </div>
              <h3 className="font-serif text-lg font-bold text-charcoal dark:text-ivory">
                Discover compatible people
              </h3>
              <p className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary leading-relaxed">
                Browse verified candidates with genuine compatibility scores across lifestyle, values, and location.
              </p>
            </div>

            <div className="bg-white dark:bg-charcoal-muted rounded-2xl p-6 border border-bmBorder dark:border-charcoal-border space-y-4 shadow-subtle hover:shadow-card transition-all">
              <div className="w-10 h-10 rounded-full bg-sage/20 text-bmSuccess font-serif font-bold text-lg flex items-center justify-center">
                3
              </div>
              <h3 className="font-serif text-lg font-bold text-charcoal dark:text-ivory">
                Connect with families
              </h3>
              <p className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary leading-relaxed">
                Use our respectful Family Connect dashboard so parents can coordinate while candidates maintain full communication consent.
              </p>
            </div>

            <div className="bg-white dark:bg-charcoal-muted rounded-2xl p-6 border border-bmBorder dark:border-charcoal-border space-y-4 shadow-subtle hover:shadow-card transition-all">
              <div className="w-10 h-10 rounded-full bg-burgundy/10 text-burgundy dark:text-gold font-serif font-bold text-lg flex items-center justify-center">
                4
              </div>
              <h3 className="font-serif text-lg font-bold text-charcoal dark:text-ivory">
                Meet in real life
              </h3>
              <p className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary leading-relaxed">
                Take your time over comfortable coffee dates, festive dinners, and honest conversations with zero pressure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 5. BUILT AROUND TRUST                             */}
      {/* ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest font-semibold text-burgundy dark:text-gold">
            Uncompromising Standards
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal dark:text-ivory">
            Built Around Trust
          </h2>
          <p className="text-xs sm:text-sm text-bmText-secondary dark:text-bmText-darkSecondary leading-relaxed">
            Every step is designed to give you, your partner, and both families complete peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-charcoal-surface border border-bmBorder dark:border-charcoal-border space-y-3 shadow-subtle">
            <div className="w-10 h-10 rounded-xl bg-sage-soft text-bmSuccess flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-base font-bold text-charcoal dark:text-ivory">
              Identity Verified
            </h4>
            <p className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary leading-relaxed">
              Every profile undergoes government ID verification. Private identity documents are encrypted and never shown publicly.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-charcoal-surface border border-bmBorder dark:border-charcoal-border space-y-3 shadow-subtle">
            <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-base font-bold text-charcoal dark:text-ivory">
              Education Verified
            </h4>
            <p className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary leading-relaxed">
              Degrees and institutional credentials from top universities in India and abroad are authenticated.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-charcoal-surface border border-bmBorder dark:border-charcoal-border space-y-3 shadow-subtle">
            <div className="w-10 h-10 rounded-xl bg-burgundy/10 text-burgundy dark:text-gold flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-base font-bold text-charcoal dark:text-ivory">
              Employment & MCA Verified
            </h4>
            <p className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary leading-relaxed">
              Corporate email authentication for working professionals, and MCA director audits for family business owners.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-charcoal-surface border border-bmBorder dark:border-charcoal-border space-y-3 shadow-subtle">
            <div className="w-10 h-10 rounded-xl bg-sand text-charcoal dark:text-gold flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-base font-bold text-charcoal dark:text-ivory">
              Photo Verified
            </h4>
            <p className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary leading-relaxed">
              Biometric live selfie checks eliminate fake photos, heavily filtered renders, and outdated portraits.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-charcoal-surface border border-bmBorder dark:border-charcoal-border space-y-3 shadow-subtle">
            <div className="w-10 h-10 rounded-xl bg-sage-soft text-bmSuccess flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-base font-bold text-charcoal dark:text-ivory">
              Privacy Controls
            </h4>
            <p className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary leading-relaxed">
              Granular photo privacy, incognito browsing, and phone masking keep you in total control at all times.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-charcoal-surface border border-bmBorder dark:border-charcoal-border space-y-3 shadow-subtle">
            <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-base font-bold text-charcoal dark:text-ivory">
              Family Connect
            </h4>
            <p className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary leading-relaxed">
              Empower parents to suggest and review matches collaboratively without compromising your personal direct chat.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 6. SUCCESS STORIES                                 */}
      {/* ================================================== */}
      <section className="bg-sand/40 dark:bg-charcoal-surface/40 border-y border-bmBorder dark:border-charcoal-border py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-burgundy dark:text-gold">
                Real Unions
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal dark:text-ivory mt-1">
                Stories of Modern Indian Companionship
              </h2>
              <p className="text-xs sm:text-sm text-bmText-secondary dark:text-bmText-darkSecondary mt-1">
                Fictional demo celebrations from couples across India and global cities.
              </p>
            </div>

            <Link
              href="/success-stories"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-burgundy dark:text-gold hover:underline"
            >
              <span>Read All Stories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredStories.map((story) => (
              <div
                key={story.id}
                className="bg-white dark:bg-charcoal-surface rounded-2xl border border-bmBorder dark:border-charcoal-border overflow-hidden shadow-subtle flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] bg-sand">
                  <Image
                    src={story.image}
                    alt={story.coupleNames}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-medium bg-ivory/90 dark:bg-charcoal/90 text-charcoal dark:text-ivory shadow-xs">
                    {story.location}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="font-serif text-xl font-bold text-charcoal dark:text-ivory">
                      {story.coupleNames}
                    </div>
                    <div className="text-[11px] text-gold font-medium">
                      {story.community}
                    </div>
                    <p className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary italic font-serif leading-relaxed">
                      "{story.quote}"
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-bmBorder dark:border-charcoal-border text-[11px] text-bmText-muted">
                    {story.timeline}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 7. PLATFORM METRICS                                */}
      {/* ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-sand/70 dark:bg-charcoal-surface rounded-3xl border border-bmBorder dark:border-charcoal-border p-8 sm:p-12 text-center space-y-6">
          <div className="max-w-xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-burgundy dark:text-gold">
              Community Footprint
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal dark:text-ivory">
              Connecting Baniya Families Globally
            </h3>
            <p className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary">
              Illustrative platform metrics for demo
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t border-bmBorder/60 dark:border-charcoal-border/60">
            <div className="space-y-1">
              <div className="font-serif text-3xl sm:text-4xl font-extrabold text-burgundy dark:text-gold">
                18
              </div>
              <div className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary font-medium">
                Gotras Represented
              </div>
            </div>

            <div className="space-y-1">
              <div className="font-serif text-3xl sm:text-4xl font-extrabold text-charcoal dark:text-ivory">
                100%
              </div>
              <div className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary font-medium">
                Verified Members
              </div>
            </div>

            <div className="space-y-1">
              <div className="font-serif text-3xl sm:text-4xl font-extrabold text-charcoal dark:text-ivory">
                30+
              </div>
              <div className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary font-medium">
                Cities & NRI Hubs
              </div>
            </div>

            <div className="space-y-1">
              <div className="font-serif text-3xl sm:text-4xl font-extrabold text-burgundy dark:text-gold">
                Family
              </div>
              <div className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary font-medium">
                Centric Matching
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 8. BOTTOM CTA BANNER                               */}
      {/* ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-burgundy text-white p-8 sm:p-14 overflow-hidden shadow-elevated">
          <div className="relative z-10 max-w-2xl space-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
              Begin Your Search with Dignity and Harmony
            </h2>
            <p className="text-sm text-ivory/90 leading-relaxed font-light">
              Take your time. There is no pressure. Build a profile that feels like you, set your boundaries, and let compatible people and their families connect naturally.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/onboarding"
                className="px-7 py-3 rounded-full bg-ivory text-burgundy hover:bg-white text-xs sm:text-sm font-semibold tracking-wide shadow-card transition-all"
              >
                Create Free Profile
              </Link>
              <Link
                href="/about"
                className="px-7 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold tracking-wide border border-white/20 transition-all"
              >
                Learn Our Philosophy
              </Link>
            </div>
          </div>

          <div className="absolute -right-12 -bottom-12 w-80 h-80 rounded-full bg-white/5 blur-2xl pointer-events-none" />
        </div>
      </section>
    </div>
  );
}
