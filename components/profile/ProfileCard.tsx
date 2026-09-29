"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Bookmark,
  MapPin,
  Briefcase,
  GraduationCap,
  Sparkles,
  Check,
  Send,
  EyeOff,
  Crown
} from "lucide-react";
import { Profile } from "@/lib/types";
import { profileService } from "@/lib/services/profileService";

interface ProfileCardProps {
  profile: Profile;
  onInterestSent?: (id: string) => void;
  onShortlisted?: (id: string) => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  onInterestSent,
  onShortlisted,
}) => {
  const [interestSent, setInterestSent] = useState(false);
  const [isShortlisted, setIsShortlisted] = useState(false);
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);
  const [hidden, setHidden] = useState(false);

  if (hidden) {
    return (
      <div className="bg-sand/30 dark:bg-charcoal-surface/40 border border-bmBorder dark:border-charcoal-border rounded-2xl p-6 text-center text-xs text-bmText-secondary dark:text-bmText-darkSecondary flex items-center justify-between">
        <span>Profile hidden from discovery.</span>
        <button
          onClick={() => setHidden(false)}
          className="text-burgundy dark:text-gold hover:underline font-medium"
        >
          Undo
        </button>
      </div>
    );
  }

  const handleSendInterest = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await profileService.sendInterest(profile);
    setInterestSent(true);
    if (onInterestSent) onInterestSent(profile.id);
  };

  const handleToggleShortlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isShortlisted) {
      await profileService.removeShortlist(profile.id);
      setIsShortlisted(false);
    } else {
      await profileService.shortlistProfile(profile, "Strong Match");
      setIsShortlisted(true);
      if (onShortlisted) onShortlisted(profile.id);
    }
  };

  return (
    <div className="group relative bg-white dark:bg-charcoal-surface rounded-3xl border border-bmBorder dark:border-charcoal-border hover:border-gold/70 dark:hover:border-gold/60 shadow-subtle hover:shadow-elevated transition-all duration-500 overflow-hidden flex flex-col justify-between">
      {/* Top Subtle Luxury Accent Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-burgundy via-gold to-burgundy opacity-80 group-hover:opacity-100 transition-opacity" />

      {/* Portrait Section */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-sand dark:bg-charcoal-muted">
        <Link href={`/profile/${profile.id}`} className="block w-full h-full">
          <Image
            src={profile.photos[currentPhotoIdx] || profile.photos[0]}
            alt={profile.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top group-hover:scale-103 transition-transform duration-700 ease-out"
          />
        </Link>

        {/* Sophisticated Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex flex-wrap items-center gap-1.5 pointer-events-auto">
            {profile.isVerified && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-ivory/95 dark:bg-charcoal/95 text-bmSuccess backdrop-blur-md border border-sage/30 shadow-xs">
                <ShieldCheck className="w-3 h-3" />
                Verified Lineage
              </span>
            )}
            {profile.isNRI && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gold text-charcoal backdrop-blur-xs shadow-xs">
                Global NRI
              </span>
            )}
          </div>

          {/* Shortlist bookmark */}
          <button
            onClick={handleToggleShortlist}
            className={`p-2 rounded-full backdrop-blur-md pointer-events-auto transition-all ${
              isShortlisted
                ? "bg-burgundy text-white shadow-md scale-105"
                : "bg-ivory/80 dark:bg-charcoal/80 text-bmText-primary dark:text-ivory hover:bg-white dark:hover:bg-charcoal shadow-xs"
            }`}
            title={isShortlisted ? "Remove from shortlist" : "Add to shortlist"}
            aria-label="Toggle shortlist"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isShortlisted ? "fill-white" : ""}`} />
          </button>
        </div>

        {/* Bottom Overlay: Gotra & Compatibility */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between pointer-events-none">
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-ivory/95 dark:bg-charcoal/95 text-charcoal dark:text-ivory backdrop-blur-md border border-bmBorder dark:border-charcoal-border shadow-xs pointer-events-auto">
            <Sparkles className="w-3 h-3 text-gold fill-gold" />
            <span>{profile.compatibility.overall}% Fit</span>
          </div>

          {profile.photos.length > 1 && (
            <div className="flex items-center gap-1 pointer-events-auto bg-charcoal/50 backdrop-blur-xs px-2 py-1 rounded-full">
              {profile.photos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPhotoIdx(idx);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    idx === currentPhotoIdx ? "bg-gold w-3" : "bg-white/60"
                  }`}
                  aria-label={`View photo ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Gotra & Lineage Tag */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-serif font-bold bg-gold/15 text-charcoal dark:text-gold border border-gold/30">
                <Crown className="w-3 h-3 text-gold" />
                <span>Gotra: {profile.gotra}</span>
              </span>
              <span className="text-[10px] text-bmText-muted dark:text-bmText-darkSecondary">
                • Mat: {profile.maternalGotra}
              </span>
            </div>

            <button
              onClick={() => setHidden(true)}
              className="text-bmText-muted hover:text-bmText-primary dark:hover:text-ivory p-1"
              title="Hide profile from view"
              aria-label="Hide profile"
            >
              <EyeOff className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Candidate Name & City */}
          <div>
            <Link
              href={`/profile/${profile.id}`}
              className="font-serif text-xl font-bold text-charcoal dark:text-ivory hover:text-burgundy dark:hover:text-gold transition-colors block"
            >
              {profile.name}
            </Link>
            <div className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary font-medium mt-0.5">
              {profile.age} yrs • {profile.height} • {profile.city}
              {profile.isNRI ? `, ${profile.country}` : ""}
            </div>
          </div>

          {/* Education & Pedigree */}
          <div className="space-y-1.5 text-xs text-bmText-secondary dark:text-bmText-darkSecondary">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-3.5 h-3.5 text-gold shrink-0" />
              <span className="truncate font-medium text-charcoal dark:text-ivory">
                {profile.education} • {profile.college}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5 text-gold shrink-0" />
              <span className="truncate">
                {profile.profession} ({profile.income})
              </span>
            </div>
          </div>

          {/* Lifestyle Badges */}
          <div className="flex flex-wrap gap-1.5 text-[11px] text-bmText-secondary dark:text-bmText-darkSecondary">
            <span className="px-2 py-0.5 rounded-md bg-sand/60 dark:bg-charcoal-muted font-medium">
              {profile.community}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-sand/60 dark:bg-charcoal-muted">
              {profile.diet}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-sand/60 dark:bg-charcoal-muted">
              {profile.family.familyValues} Values
            </span>
          </div>

          {/* Editorial Compatibility Reason */}
          <p className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary italic font-serif leading-relaxed border-l-2 border-gold/50 pl-2.5 line-clamp-2">
            "{profile.compatibility.whyMatch}"
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-bmBorder dark:border-charcoal-border grid grid-cols-2 gap-2">
          <Link
            href={`/profile/${profile.id}`}
            className="w-full py-2 px-3 rounded-full text-center text-xs font-semibold text-charcoal dark:text-ivory bg-sand/80 dark:bg-charcoal-muted hover:bg-sand dark:hover:bg-charcoal transition-colors"
          >
            Inspect Profile
          </Link>

          <button
            onClick={handleSendInterest}
            disabled={interestSent}
            className={`w-full py-2 px-3 rounded-full text-center text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
              interestSent
                ? "bg-sage-soft text-bmSuccess border border-sage/30 cursor-default"
                : "bg-burgundy hover:bg-burgundy-dark text-white shadow-subtle hover:shadow-card"
            }`}
          >
            {interestSent ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Sent</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Express Interest</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
