"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Check,
  X,
  Users,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { InterestItem, InterestStatus } from "@/lib/types";
import { getStoredInterests, saveStoredInterests } from "@/lib/mockStorage";

export default function InterestsPage() {
  const [interests, setInterests] = useState<InterestItem[]>([]);
  const [activeTab, setActiveTab] = useState<InterestStatus>("received");

  useEffect(() => {
    setInterests(getStoredInterests());
  }, []);

  const handleUpdateStatus = (id: string, newStatus: InterestStatus) => {
    const updated = interests.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    setInterests(updated);
    saveStoredInterests(updated);
  };

  const filteredInterests = interests.filter((i) => i.status === activeTab);

  const tabs: { id: InterestStatus; label: string; count: number }[] = [
    { id: "received", label: "Received", count: interests.filter((i) => i.status === "received").length },
    { id: "sent", label: "Sent", count: interests.filter((i) => i.status === "sent").length },
    { id: "accepted", label: "Accepted", count: interests.filter((i) => i.status === "accepted").length },
    { id: "declined", label: "Declined", count: interests.filter((i) => i.status === "declined").length },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-charcoal dark:text-ivory">
          Interests & Invitations
        </h1>
        <p className="text-xs sm:text-sm text-bmText-secondary dark:text-bmText-darkSecondary mt-1">
          Review candidates who have expressed an interest in connecting with you or your family.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-bmBorder dark:border-charcoal-border pb-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === tab.id
                ? "bg-burgundy text-white shadow-xs"
                : "bg-sand/60 dark:bg-charcoal-surface text-bmText-secondary hover:text-charcoal dark:hover:text-ivory"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeTab === tab.id ? "bg-white/20 text-white" : "bg-bmBorder dark:bg-charcoal-border text-charcoal dark:text-ivory"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Content List */}
      {filteredInterests.length === 0 ? (
        <div className="bg-white dark:bg-charcoal-surface rounded-2xl border border-bmBorder dark:border-charcoal-border p-12 text-center space-y-3">
          <Heart className="w-8 h-8 text-gold mx-auto" />
          <h3 className="font-serif text-lg font-bold text-charcoal dark:text-ivory">
            No {activeTab} interests right now
          </h3>
          <p className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary max-w-sm mx-auto">
            Browse verified community members or adjust your profile preferences to discover more candidates.
          </p>
          <Link
            href="/browse"
            className="inline-block mt-2 px-5 py-2 rounded-full bg-burgundy text-white text-xs font-semibold"
          >
            Browse Profiles
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredInterests.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-charcoal-surface rounded-2xl border border-bmBorder dark:border-charcoal-border p-4 sm:p-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-5 hover:border-gold/40 transition-all"
            >
              {/* Left Profile Details */}
              <div className="flex items-center gap-4">
                <Link
                  href={`/profile/${item.profile.id}`}
                  className="relative w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden bg-sand shrink-0 border border-bmBorder dark:border-charcoal-border"
                >
                  <Image
                    src={item.profile.photos[0]}
                    alt={item.profile.name}
                    fill
                    className="object-cover object-top"
                  />
                </Link>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/profile/${item.profile.id}`}
                      className="font-serif text-lg font-bold text-charcoal dark:text-ivory hover:text-burgundy dark:hover:text-gold transition-colors"
                    >
                      {item.profile.name}
                    </Link>
                    <ShieldCheck className="w-4 h-4 text-bmSuccess" />
                  </div>

                  <p className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary">
                    {item.profile.age} yrs • {item.profile.city} • {item.profile.community} (Gotra: {item.profile.gotra})
                  </p>

                  <p className="text-xs text-charcoal dark:text-ivory font-medium">
                    {item.profile.profession} • {item.profile.college}
                  </p>

                  {item.message && (
                    <p className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary italic font-serif pt-1 max-w-lg">
                      "{item.message}"
                    </p>
                  )}

                  <div className="text-[11px] text-bmText-muted pt-0.5">
                    {item.sentDate}
                  </div>
                </div>
              </div>

              {/* Right Compatibility & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-bmBorder dark:border-charcoal-border">
                <div className="text-left sm:text-right pr-4 sm:border-r border-bmBorder dark:border-charcoal-border">
                  <div className="text-[10px] text-bmText-secondary uppercase tracking-wider font-semibold">
                    Compatibility
                  </div>
                  <div className="font-serif text-lg font-bold text-burgundy dark:text-gold">
                    {item.profile.compatibility.overall}%
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {activeTab === "received" && (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(item.id, "accepted")}
                        className="px-4 py-2 rounded-full bg-burgundy hover:bg-burgundy-dark text-white text-xs font-semibold shadow-xs flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Accept</span>
                      </button>

                      <button
                        onClick={() => handleUpdateStatus(item.id, "declined")}
                        className="px-4 py-2 rounded-full bg-sand dark:bg-charcoal-muted hover:bg-bmBorder text-charcoal dark:text-ivory text-xs font-semibold border border-bmBorder dark:border-charcoal-border"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}

                  {activeTab === "accepted" && (
                    <Link
                      href="/messages"
                      className="px-4 py-2 rounded-full bg-burgundy text-white text-xs font-semibold flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Start Chat</span>
                    </Link>
                  )}

                  <Link
                    href={`/profile/${item.profile.id}`}
                    className="px-3.5 py-2 rounded-full bg-sand dark:bg-charcoal-muted text-charcoal dark:text-ivory text-xs font-medium hover:bg-bmBorder transition-colors"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
