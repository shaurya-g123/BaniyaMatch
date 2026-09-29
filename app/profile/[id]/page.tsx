"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  Heart,
  Bookmark,
  Send,
  Users,
  Briefcase,
  GraduationCap,
  Sparkles,
  ArrowLeft,
  Calendar,
  Check,
  Building,
  Flag,
  Share2,
  Lock
} from "lucide-react";
import { Profile } from "@/lib/types";
import { profileService } from "@/lib/services/profileService";
import { PhotoGallery } from "@/components/profile/PhotoGallery";
import { CompatibilityBreakdown } from "@/components/profile/CompatibilityBreakdown";
import { FamilyCompatibilityCard } from "@/components/profile/FamilyCompatibilityCard";

export default function ProfileDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const profileId = (params?.id as string) || "bm-1000";

  const [profile, setProfile] = useState<Profile | null>(null);
  const [interestSent, setInterestSent] = useState(false);
  const [isShortlisted, setIsShortlisted] = useState(false);
  const [familyRequested, setFamilyRequested] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await profileService.getProfileById(profileId);
      setProfile(data);
    };
    fetchProfile();
  }, [profileId]);

  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-charcoal dark:text-ivory">
          Loading Candidate Profile...
        </h2>
        <Link href="/browse" className="text-sm text-burgundy dark:text-gold hover:underline">
          Return to Browse
        </Link>
      </div>
    );
  }

  const handleSendInterest = async () => {
    await profileService.sendInterest(profile);
    setInterestSent(true);
  };

  const handleToggleShortlist = async () => {
    if (isShortlisted) {
      await profileService.removeShortlist(profile.id);
      setIsShortlisted(false);
    } else {
      await profileService.shortlistProfile(profile, "Strong Match");
      setIsShortlisted(true);
    }
  };

  const handleFamilyConnect = () => {
    setFamilyRequested(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-28 lg:pb-16">
      {/* Top Navigation Row */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-xs font-medium text-bmText-secondary dark:text-bmText-darkSecondary hover:text-charcoal dark:hover:text-ivory transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Matches</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setReportModalOpen(true)}
            className="p-2 rounded-full border border-bmBorder dark:border-charcoal-border text-bmText-muted hover:text-bmError transition-colors"
            title="Report or Flag Profile"
          >
            <Flag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Photo Gallery + Quick Key Stats */}
        <div className="lg:col-span-5 space-y-6">
          <PhotoGallery
            photos={profile.photos}
            candidateName={profile.name}
            isVerified={profile.isVerified}
          />

          {/* Quick Actions (Desktop) */}
          <div className="hidden lg:grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleSendInterest}
              disabled={interestSent}
              className={`w-full py-3 px-4 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-2 ${
                interestSent
                  ? "bg-sage-soft text-bmSuccess border border-sage/30 cursor-default"
                  : "bg-burgundy hover:bg-burgundy-dark text-white shadow-card hover:shadow-elevated"
              }`}
            >
              {interestSent ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Interest Sent</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Interest</span>
                </>
              )}
            </button>

            <button
              onClick={handleToggleShortlist}
              className={`w-full py-3 px-4 rounded-full text-xs font-semibold tracking-wide border transition-all flex items-center justify-center gap-2 ${
                isShortlisted
                  ? "bg-sand dark:bg-charcoal-surface text-burgundy dark:text-gold border-burgundy/40"
                  : "bg-white dark:bg-charcoal-surface text-charcoal dark:text-ivory border-bmBorder dark:border-charcoal-border hover:bg-sand"
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isShortlisted ? "fill-current" : ""}`} />
              <span>{isShortlisted ? "Shortlisted" : "Shortlist"}</span>
            </button>
          </div>

          {/* Request Family Connect CTA */}
          <button
            onClick={handleFamilyConnect}
            disabled={familyRequested}
            className={`w-full py-3 px-4 rounded-2xl text-xs font-semibold border transition-all flex items-center justify-center gap-2 ${
              familyRequested
                ? "bg-gold/15 text-charcoal dark:text-gold border-gold/40 cursor-default"
                : "bg-sand/60 dark:bg-charcoal-muted hover:bg-sand text-charcoal dark:text-ivory border-bmBorder dark:border-charcoal-border"
            }`}
          >
            <Users className="w-4 h-4 text-burgundy dark:text-gold" />
            <span>
              {familyRequested ? "Family Connect Requested" : "Request Family Connect"}
            </span>
          </button>
        </div>

        {/* Right Column: In-depth Profile Details */}
        <div className="lg:col-span-7 space-y-8">
          {/* Header Title Lockup */}
          <div className="bg-white dark:bg-charcoal-surface rounded-3xl border border-bmBorder dark:border-charcoal-border p-6 sm:p-8 shadow-subtle space-y-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal dark:text-ivory">
                  {profile.name}
                </h1>
                <p className="text-sm font-medium text-bmText-secondary dark:text-bmText-darkSecondary mt-1">
                  {profile.age} years old • {profile.height} • {profile.city}
                  {profile.state ? `, ${profile.state}` : ""}
                  {profile.isNRI ? `, ${profile.country}` : ""}
                </p>
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gold/15 text-charcoal dark:text-gold border border-gold/30">
                {profile.compatibility.overall}% Compatibility
              </span>
            </div>

            {/* Lineage & Gotra badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="px-3 py-1 rounded-full bg-sand dark:bg-charcoal-muted font-semibold text-burgundy dark:text-gold">
                {profile.community}
              </span>
              <span className="px-3 py-1 rounded-full bg-sand/60 dark:bg-charcoal-muted text-bmText-primary dark:text-bmText-darkPrimary">
                Self Gotra: <strong>{profile.gotra}</strong>
              </span>
              {profile.maternalGotra && (
                <span className="px-3 py-1 rounded-full bg-sand/60 dark:bg-charcoal-muted text-bmText-primary dark:text-bmText-darkPrimary">
                  Maternal Gotra: <strong>{profile.maternalGotra}</strong>
                </span>
              )}
            </div>
          </div>

          {/* About Statement */}
          <div className="bg-white dark:bg-charcoal-surface rounded-3xl border border-bmBorder dark:border-charcoal-border p-6 sm:p-8 shadow-subtle space-y-3">
            <h3 className="font-serif text-xl font-bold text-charcoal dark:text-ivory">
              About {profile.name.split(" ")[0]}
            </h3>
            <p className="text-sm text-bmText-secondary dark:text-bmText-darkSecondary leading-relaxed whitespace-pre-line font-light sm:text-base">
              {profile.about}
            </p>
          </div>

          {/* Compatibility Radar & Breakdown */}
          <CompatibilityBreakdown scores={profile.compatibility} />

          {/* Education & Career Section */}
          <div className="bg-white dark:bg-charcoal-surface rounded-3xl border border-bmBorder dark:border-charcoal-border p-6 sm:p-8 shadow-subtle space-y-5">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-burgundy dark:text-gold" />
              <h3 className="font-serif text-xl font-bold text-charcoal dark:text-ivory">
                Education & Career
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-sand/40 dark:bg-charcoal-muted border border-bmBorder/60 dark:border-charcoal-border/60">
                <span className="text-[11px] uppercase tracking-wider text-bmText-secondary dark:text-bmText-darkSecondary font-semibold block">
                  Degree & Education
                </span>
                <span className="font-serif text-base font-bold text-charcoal dark:text-ivory mt-1 block">
                  {profile.education}
                </span>
                <span className="text-bmText-secondary dark:text-bmText-darkSecondary mt-0.5 block">
                  {profile.college}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-sand/40 dark:bg-charcoal-muted border border-bmBorder/60 dark:border-charcoal-border/60">
                <span className="text-[11px] uppercase tracking-wider text-bmText-secondary dark:text-bmText-darkSecondary font-semibold block">
                  Profession & Income
                </span>
                <span className="font-serif text-base font-bold text-charcoal dark:text-ivory mt-1 block">
                  {profile.profession}
                </span>
                <span className="text-bmText-secondary dark:text-bmText-darkSecondary mt-0.5 block">
                  Income Bracket: {profile.income}
                </span>
              </div>
            </div>

            {/* Business Specifics if applicable */}
            {profile.isBusiness && profile.businessDetails && (
              <div className="p-4 rounded-xl bg-gold/10 dark:bg-charcoal-muted border border-gold/30 text-xs space-y-2">
                <div className="flex items-center gap-2 font-semibold text-burgundy dark:text-gold">
                  <Building className="w-4 h-4" />
                  <span>Family Business / Enterprise Standing</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-charcoal dark:text-ivory">
                  <div>
                    <span className="text-bmText-secondary text-[11px] block">Business Type:</span>
                    <strong>{profile.businessDetails.type}</strong>
                  </div>
                  <div>
                    <span className="text-bmText-secondary text-[11px] block">Scale:</span>
                    <strong>{profile.businessDetails.size}</strong>
                  </div>
                  <div>
                    <span className="text-bmText-secondary text-[11px] block">Annual Turnover:</span>
                    <strong>{profile.businessDetails.turnover}</strong>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Lifestyle & Personal Outlook */}
          <div className="bg-white dark:bg-charcoal-surface rounded-3xl border border-bmBorder dark:border-charcoal-border p-6 sm:p-8 shadow-subtle space-y-5">
            <h3 className="font-serif text-xl font-bold text-charcoal dark:text-ivory">
              Lifestyle & Daily Routine
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted">
                <span className="text-bmText-secondary text-[11px] block">Dietary Practice</span>
                <span className="font-semibold text-charcoal dark:text-ivory mt-0.5 block">
                  {profile.diet}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted">
                <span className="text-bmText-secondary text-[11px] block">Smoking & Alcohol</span>
                <span className="font-semibold text-charcoal dark:text-ivory mt-0.5 block">
                  {profile.lifestyle.smoking} • {profile.lifestyle.drinking}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted">
                <span className="text-bmText-secondary text-[11px] block">Fitness Routine</span>
                <span className="font-semibold text-charcoal dark:text-ivory mt-0.5 block">
                  {profile.lifestyle.fitness}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted">
                <span className="text-bmText-secondary text-[11px] block">Spiritual Practice</span>
                <span className="font-semibold text-charcoal dark:text-ivory mt-0.5 block">
                  {profile.lifestyle.spiritual}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted">
                <span className="text-bmText-secondary text-[11px] block">Social Style</span>
                <span className="font-semibold text-charcoal dark:text-ivory mt-0.5 block">
                  {profile.lifestyle.social}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted">
                <span className="text-bmText-secondary text-[11px] block">Marriage Timeline</span>
                <span className="font-semibold text-charcoal dark:text-ivory mt-0.5 block">
                  {profile.timeline}
                </span>
              </div>
            </div>
          </div>

          {/* Family Compatibility Card */}
          <FamilyCompatibilityCard candidateFamily={profile.family} />

          {/* Horoscope & Astrological Details */}
          <div className="bg-white dark:bg-charcoal-surface rounded-3xl border border-bmBorder dark:border-charcoal-border p-6 sm:p-8 shadow-subtle space-y-4">
            <h3 className="font-serif text-xl font-bold text-charcoal dark:text-ivory">
              Horoscope & Astrological Records
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted">
                <span className="text-bmText-secondary text-[11px] block">Manglik Status</span>
                <span className="font-semibold text-charcoal dark:text-ivory mt-0.5 block">
                  {profile.horoscope.manglik}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted">
                <span className="text-bmText-secondary text-[11px] block">Rashi (Zodiac)</span>
                <span className="font-semibold text-charcoal dark:text-ivory mt-0.5 block">
                  {profile.horoscope.rashi || "Available on request"}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted">
                <span className="text-bmText-secondary text-[11px] block">Nakshatra</span>
                <span className="font-semibold text-charcoal dark:text-ivory mt-0.5 block">
                  {profile.horoscope.nakshatra || "Available on request"}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted">
                <span className="text-bmText-secondary text-[11px] block">Kundali Matching</span>
                <span className="font-semibold text-bmSuccess mt-0.5 block">
                  Matchable
                </span>
              </div>
            </div>
          </div>

          {/* Interests & Passions Chips */}
          <div className="bg-white dark:bg-charcoal-surface rounded-3xl border border-bmBorder dark:border-charcoal-border p-6 sm:p-8 shadow-subtle space-y-4">
            <h3 className="font-serif text-xl font-bold text-charcoal dark:text-ivory">
              Interests & Passions
            </h3>
            <div className="flex flex-wrap gap-2 text-xs">
              {profile.interests.map((interest, i) => (
                <span
                  key={i}
                  className="px-3.5 py-1.5 rounded-full bg-sand/70 dark:bg-charcoal-muted text-charcoal dark:text-ivory font-medium"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Action Bar */}
      <div className="lg:hidden fixed bottom-16 left-0 right-0 z-40 bg-white/95 dark:bg-charcoal/95 backdrop-blur-md border-t border-bmBorder dark:border-charcoal-border p-3 grid grid-cols-2 gap-2 shadow-elevated">
        <button
          onClick={handleSendInterest}
          disabled={interestSent}
          className={`w-full py-2.5 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
            interestSent
              ? "bg-sage-soft text-bmSuccess border border-sage/30"
              : "bg-burgundy text-white shadow-card"
          }`}
        >
          {interestSent ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
          <span>{interestSent ? "Interest Sent" : "Send Interest"}</span>
        </button>

        <button
          onClick={handleToggleShortlist}
          className="w-full py-2.5 rounded-full text-xs font-semibold border border-bmBorder dark:border-charcoal-border bg-sand dark:bg-charcoal-surface text-charcoal dark:text-ivory flex items-center justify-center gap-1.5"
        >
          <Bookmark className={`w-3.5 h-3.5 ${isShortlisted ? "fill-current text-burgundy" : ""}`} />
          <span>{isShortlisted ? "Shortlisted" : "Shortlist"}</span>
        </button>
      </div>

      {/* Report Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-charcoal-surface max-w-md w-full rounded-3xl border border-bmBorder dark:border-charcoal-border p-6 space-y-4 shadow-elevated">
            <h3 className="font-serif text-xl font-bold text-charcoal dark:text-ivory">
              Report Profile
            </h3>
            {reportSuccess ? (
              <div className="p-4 rounded-xl bg-sage-soft text-bmSuccess text-xs space-y-2">
                <strong>Report submitted to trust team.</strong>
                <p>Our compliance officers will review this account within 15 minutes.</p>
                <button
                  onClick={() => {
                    setReportSuccess(false);
                    setReportModalOpen(false);
                  }}
                  className="mt-2 px-4 py-1.5 rounded-full bg-bmSuccess text-white text-xs"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                <p className="text-bmText-secondary">
                  Help us maintain a safe community. Why are you reporting {profile.name}?
                </p>
                {["Inappropriate photo or impersonation", "Suspicious or financial request", "Incorrect marital status", "Unresponsive or commercial solicitation"].map((reason) => (
                  <button
                    key={reason}
                    onClick={() => setReportSuccess(true)}
                    className="w-full p-2.5 text-left rounded-xl border border-bmBorder dark:border-charcoal-border hover:bg-sand dark:hover:bg-charcoal-muted text-charcoal dark:text-ivory"
                  >
                    {reason}
                  </button>
                ))}
                <div className="pt-2 text-right">
                  <button
                    onClick={() => setReportModalOpen(false)}
                    className="text-xs text-bmText-muted hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
