"use client";

import React from "react";
import Link from "next/link";
import {
  Users,
  ShieldCheck,
  AlertTriangle,
  IndianRupee,
  TrendingUp,
  UserCheck,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { mockAdminMetrics, mockRevenueBreakdown, mockAdminReports } from "@/data/adminData";
import { StatCard } from "@/components/admin/StatCard";

export default function AdminDashboardPage() {
  const cityDistribution = [
    { city: "Delhi NCR", count: "38%", color: "bg-burgundy" },
    { city: "Mumbai & Pune", count: "22%", color: "bg-gold" },
    { city: "Jaipur & Rajasthan", count: "16%", color: "bg-sage" },
    { city: "Bengaluru & South", count: "12%", color: "bg-charcoal dark:bg-sand" },
    { city: "International (NRI)", count: "12%", color: "bg-maroon" },
  ];

  const communityDistribution = [
    { name: "Agarwal", share: 42 },
    { name: "Gupta & Bansal", share: 24 },
    { name: "Maheshwari", share: 15 },
    { name: "Oswal & Jain Baniya", share: 11 },
    { name: "Khandelwal & Others", share: 8 },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-charcoal dark:text-ivory">
          Executive Operations Overview
        </h1>
        <p className="text-xs sm:text-sm text-bmText-secondary dark:text-bmText-darkSecondary mt-0.5">
          Real-time metrics on user growth, verification velocity, subscription revenue, and active moderation.
        </p>
      </div>

      {/* 6 Key Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {mockAdminMetrics.map((metric, i) => (
          <StatCard key={i} metric={metric} />
        ))}
      </div>

      {/* Charts & Distribution Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Community & City Mix */}
        <div className="lg:col-span-6 bg-white dark:bg-charcoal-surface rounded-3xl border border-bmBorder dark:border-charcoal-border p-6 sm:p-8 space-y-6 shadow-subtle">
          <div>
            <h2 className="font-serif text-xl font-bold text-charcoal dark:text-ivory">
              Community Representation
            </h2>
            <p className="text-xs text-bmText-secondary mt-0.5">
              Verified active member distribution across major lineages.
            </p>
          </div>

          <div className="space-y-3">
            {communityDistribution.map((item) => (
              <div key={item.name} className="space-y-1 text-xs">
                <div className="flex justify-between font-medium">
                  <span className="text-charcoal dark:text-ivory">{item.name}</span>
                  <span className="font-semibold text-burgundy dark:text-gold">{item.share}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-sand dark:bg-charcoal-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-burgundy to-gold"
                    style={{ width: `${item.share}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-bmBorder dark:border-charcoal-border">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-bmText-secondary mb-3">
              Regional Geographic Clusters
            </h3>
            <div className="space-y-2">
              {cityDistribution.map((c) => (
                <div key={c.city} className="flex items-center justify-between text-xs">
                  <span className="text-bmText-secondary">{c.city}</span>
                  <span className="font-semibold text-charcoal dark:text-ivory">{c.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Active Incident & Moderation Queue */}
        <div className="lg:col-span-6 bg-white dark:bg-charcoal-surface rounded-3xl border border-bmBorder dark:border-charcoal-border p-6 sm:p-8 space-y-6 shadow-subtle flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl font-bold text-charcoal dark:text-ivory">
                  Active Moderation Queue
                </h2>
                <p className="text-xs text-bmText-secondary mt-0.5">
                  Latest reported accounts and audit flags.
                </p>
              </div>
              <Link
                href="/admin/reports"
                className="text-xs text-burgundy dark:text-gold font-semibold hover:underline flex items-center gap-1"
              >
                <span>All reports</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {mockAdminReports.slice(0, 3).map((rep) => (
                <div
                  key={rep.id}
                  className="p-3.5 rounded-xl bg-sand/30 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-charcoal dark:text-ivory">
                      {rep.reportedName} ({rep.reportedProfileId})
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        rep.status === "Investigating"
                          ? "bg-gold/20 text-gold-dark"
                          : rep.status === "Banned"
                          ? "bg-red-100 text-bmError"
                          : "bg-sage-soft text-bmSuccess"
                      }`}
                    >
                      {rep.status}
                    </span>
                  </div>
                  <p className="text-bmText-secondary">
                    Reason: <strong>{rep.reason}</strong>
                  </p>
                  <p className="text-[11px] text-bmText-muted italic">
                    "{rep.notes}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-bmBorder dark:border-charcoal-border flex items-center justify-between text-xs">
            <span className="text-bmText-secondary">4 compliance officers on duty</span>
            <Link
              href="/admin/users"
              className="px-4 py-2 rounded-full bg-sand dark:bg-charcoal-muted hover:bg-bmBorder font-semibold text-charcoal dark:text-ivory transition-colors"
            >
              Open User Directory
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
