"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Heart,
  ShieldCheck,
  Send,
  Bookmark,
  Users,
  Compass,
  ArrowRight,
  Briefcase,
  GraduationCap
} from "lucide-react";
import { Profile } from "@/lib/types";
import { matchService } from "@/lib/services/matchService";
import { profileService } from "@/lib/services/profileService";
import { ProfileCard } from "@/components/profile/ProfileCard";

export default function MatchesPage() {
  const [matchOfDay, setMatchOfDay] = useState<Profile | null>(null);
  const [recommended, setRecommended] = useState<Profile[]>([]);
  const [familyCompatible, setFamilyCompatible] = useState<Profile[]>([]);
  const [businessFamilies, setBusinessFamilies] = useState<Profile[]>([]);
  const [nriProfiles, setNriProfiles] = useState<Profile[]>([]);
  const [newMatches, setNewMatches] = useState<Profile[]>([]);
  const [interestSent, setInterestSent] = useState(false);

  useEffect(() => {
    const load = async () => {
      const [mod, rec, fam, biz, nri, nw] = await Promise.all([
        matchService.getMatchOfTheDay(),
        matchService.getRecommendedMatches(),
        matchService.getFamilyCompatible(),
        matchService.getBusinessFamilies(),
        matchService.getNRIProfessionals(),
        matchService.getNewMatches(),
      ]);
      setMatchOfDay(mod);
      setRecommended(rec);
      setFamilyCompatible(fam);
      setBusinessFamilies(biz);
      setNriProfiles(nri);
      setNewMatches(nw);
    };
    load();
  }, []);

  const handleSendMatchOfDayInterest = async () => {
    if (!matchOfDay) return;
    await profileService.sendInterest(matchOfDay);
    setInterestSent(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Personalized Greeting Header */}
      <div className="space-y-2 pb-6 border-b border-bmBorder dark:border-charcoal-border">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-burgundy dark:text-gold">
          <Sparkles className="w-3.5 h-3.5 fill-current" />
          <span>Curated Matches</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal dark:text-ivory">
          Good evening, Riya
        </h1>
        <p className="text-sm text-bmText-secondary dark:text-bmText-darkSecondary max-w-xl">
          Here are people who align with what you are looking for across lifestyle, family values, and long-term aspirations.
        </p>
      </div>

      {/* ================================================== */}
      {/* 1. MATCH OF THE DAY SPOTLIGHT                      */}
      {/* ================================================== */}
      {matchOfDay && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-charcoal dark:text-ivory">
                Match of the Day
              </h2>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gold/15 text-charcoal dark:text-gold border border-gold/30">
              {matchOfDay.compatibility.overall}% Overall Compatibility
            </span>
          </div>

          <div className="bg-white dark:bg-charcoal-surface rounded-3xl border border-gold/40 dark:border-gold/30 p-6 sm:p-8 shadow-card grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Photo & Badges */}
            <div className="lg:col-span-4 relative aspect-[3/4] rounded-2xl overflow-hidden shadow-subtle bg-sand">
              <Image
                src={matchOfDay.photos[0]}
                alt={matchOfDay.name}
                fill
                className="object-cover object-top"
              />
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-ivory/95 dark:bg-charcoal/95 text-bmSuccess shadow-xs border border-sage/30 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-burgundy text-white shadow-xs">
                  {matchOfDay.community}
                </span>
              </div>
            </div>

            {/* Right Details & "Why this match?" */}
            <div className="lg:col-span-8 space-y-5">
              <div>
                <div className="flex flex-wrap items-baseline gap-2">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal dark:text-ivory">
                    {matchOfDay.name}
                  </h3>
                  <span className="text-sm font-medium text-bmText-secondary dark:text-bmText-darkSecondary">
                    {matchOfDay.age} yrs • {matchOfDay.height} • {matchOfDay.city}
                  </span>
                </div>
                <div className="text-xs text-burgundy dark:text-gold font-medium mt-1">
                  {matchOfDay.community} • Gotra: {matchOfDay.gotra}
                </div>
              </div>

              {/* Pedigree & Career */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-bmText-secondary dark:text-bmText-darkSecondary bg-sand/30 dark:bg-charcoal-muted p-4 rounded-xl">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-gold shrink-0" />
                  <span>{matchOfDay.education} • {matchOfDay.college}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-gold shrink-0" />
                  <span>{matchOfDay.profession} ({matchOfDay.income})</span>
                </div>
              </div>

              {/* Editorial Reason */}
              <div className="p-4 rounded-xl bg-ivory dark:bg-charcoal-surface border-l-4 border-gold">
                <div className="text-[11px] font-bold uppercase tracking-wider text-burgundy dark:text-gold mb-1">
                  Why this curated match?
                </div>
                <p className="text-sm font-serif italic text-charcoal dark:text-ivory leading-relaxed">
                  "{matchOfDay.compatibility.whyMatch}"
                </p>
              </div>

              {/* Compatibility Breakdown Bars */}
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-sand/40 dark:bg-charcoal-muted text-center">
                  <div className="text-bmText-secondary text-[11px]">Lifestyle</div>
                  <div className="font-serif font-bold text-base text-burgundy dark:text-gold mt-0.5">
                    {matchOfDay.compatibility.lifestyle}%
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-sand/40 dark:bg-charcoal-muted text-center">
                  <div className="text-bmText-secondary text-[11px]">Family</div>
                  <div className="font-serif font-bold text-base text-burgundy dark:text-gold mt-0.5">
                    {matchOfDay.compatibility.family}%
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-sand/40 dark:bg-charcoal-muted text-center">
                  <div className="text-bmText-secondary text-[11px]">Location</div>
                  <div className="font-serif font-bold text-base text-burgundy dark:text-gold mt-0.5">
                    {matchOfDay.compatibility.location}%
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href={`/profile/${matchOfDay.id}`}
                  className="px-6 py-2.5 rounded-full bg-burgundy hover:bg-burgundy-dark text-white text-xs font-semibold shadow-card transition-all"
                >
                  View Full Profile
                </Link>
                <button
                  onClick={handleSendMatchOfDayInterest}
                  disabled={interestSent}
                  className={`px-6 py-2.5 rounded-full text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                    interestSent
                      ? "bg-sage-soft text-bmSuccess border-sage/30"
                      : "bg-white dark:bg-charcoal-surface hover:bg-sand text-charcoal dark:text-ivory border-bmBorder dark:border-charcoal-border"
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{interestSent ? "Interest Sent" : "Send Interest"}</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================================================== */}
      {/* 2. RECOMMENDED FOR YOU                             */}
      {/* ================================================== */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold text-charcoal dark:text-ivory">
              Recommended For You
            </h2>
            <p className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary mt-0.5">
              Based on your preferences for education, vegetarian diet, and location in Delhi NCR.
            </p>
          </div>
          <Link
            href="/browse"
            className="text-xs font-semibold text-burgundy dark:text-gold hover:underline flex items-center gap-1"
          >
            <span>View all</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommended.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      </section>

      {/* ================================================== */}
      {/* 3. FAMILY COMPATIBLE MATCHES                       */}
      {/* ================================================== */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-burgundy dark:text-gold" />
              <h2 className="font-serif text-2xl font-bold text-charcoal dark:text-ivory">
                Family Compatible Matches
              </h2>
            </div>
            <p className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary mt-0.5">
              High score on family values, joint festival traditions, and shared cultural practices.
            </p>
          </div>
          <Link
            href="/family"
            className="text-xs font-semibold text-burgundy dark:text-gold hover:underline flex items-center gap-1"
          >
            <span>Family Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {familyCompatible.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      </section>

      {/* ================================================== */}
      {/* 4. BUSINESS FAMILIES & ENTREPRENEURS               */}
      {/* ================================================== */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold text-charcoal dark:text-ivory">
              Established Business Families
            </h2>
            <p className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary mt-0.5">
              Entrepreneurs, industrial partners, and family enterprise leaders with verified MCA records.
            </p>
          </div>
          <Link
            href="/browse"
            className="text-xs font-semibold text-burgundy dark:text-gold hover:underline flex items-center gap-1"
          >
            <span>Explore all</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {businessFamilies.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      </section>

      {/* ================================================== */}
      {/* 5. NRI PROFESSIONALS                               */}
      {/* ================================================== */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold text-charcoal dark:text-ivory">
              Global & NRI Professionals
            </h2>
            <p className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary mt-0.5">
              Professionals living in London, Dubai, Singapore, New York, and Toronto seeking rooted Indian companionship.
            </p>
          </div>
          <Link
            href="/browse"
            className="text-xs font-semibold text-burgundy dark:text-gold hover:underline flex items-center gap-1"
          >
            <span>See more</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {nriProfiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      </section>
    </div>
  );
}
