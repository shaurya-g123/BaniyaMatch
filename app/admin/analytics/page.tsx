"use client";

import React from "react";
import { BarChart3, TrendingUp, Users, Heart, MessageSquare, Coffee, Sparkles } from "lucide-react";

export default function AdminAnalyticsPage() {
  const funnelSteps = [
    { label: "Profile Registration & Completion", count: "14,820", rate: "100%", desc: "Full bio and initial photos uploaded" },
    { label: "6-Level Verification Pass", count: "12,150", rate: "82%", desc: "Mobile, ID, and selfie checks cleared" },
    { label: "Algorithmic Match Delivery", count: "11,200", rate: "75%", desc: "High compatibility recommendations viewed" },
    { label: "Mutual Interest Expressed", count: "6,480", rate: "43%", desc: "Reciprocal interest accepted" },
    { label: "Direct Conversation & Voice Note", count: "4,120", rate: "27%", desc: "Exchanged 5+ messages" },
    { label: "Family Connect Activation", count: "2,240", rate: "15%", desc: "Parent-to-parent introduction coordinated" },
    { label: "In-Person Meeting Scheduled", count: "1,180", rate: "8%", desc: "Reported coffee date / family meeting" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-bmBorder dark:border-charcoal-border">
        <h1 className="font-serif text-3xl font-bold text-charcoal dark:text-ivory">
          Platform Funnel & Conversion Analytics
        </h1>
        <p className="text-xs sm:text-sm text-bmText-secondary dark:text-bmText-darkSecondary mt-0.5">
          End-to-end matchmaking conversion funnel from profile onboarding to real-life matrimonial meetings.
        </p>
      </div>

      {/* Funnel Visualisation */}
      <div className="bg-white dark:bg-charcoal-surface rounded-3xl border border-bmBorder dark:border-charcoal-border p-6 sm:p-8 shadow-subtle space-y-6">
        <h2 className="font-serif text-xl font-bold text-charcoal dark:text-ivory">
          The Baniya Match Journey Funnel
        </h2>

        <div className="space-y-4">
          {funnelSteps.map((step, idx) => (
            <div key={step.label} className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between font-medium">
                <span className="text-charcoal dark:text-ivory font-semibold text-sm">
                  {idx + 1}. {step.label}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-bmText-secondary">{step.count} users</span>
                  <span className="font-bold text-burgundy dark:text-gold w-12 text-right">
                    {step.rate}
                  </span>
                </div>
              </div>

              <div className="w-full h-3 rounded-full bg-sand dark:bg-charcoal-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-burgundy to-gold transition-all duration-500"
                  style={{ width: step.rate }}
                />
              </div>

              <p className="text-[11px] text-bmText-muted">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
