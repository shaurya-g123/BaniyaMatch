"use client";

import React from "react";
import { IndianRupee, TrendingUp, Users, CreditCard, ArrowUpRight } from "lucide-react";
import { mockRevenueBreakdown } from "@/data/adminData";

export default function AdminRevenuePage() {
  const kpis = [
    { label: "Monthly Recurring Revenue (MRR)", value: "₹24,98,340", change: "+18.2%", isUp: true },
    { label: "Average Revenue Per Paying User (ARPU)", value: "₹1,505", change: "+4.1%", isUp: true },
    { label: "Free to Premium Conversion Rate", value: "17.4%", change: "+2.3%", isUp: true },
    { label: "Annual Subscription Churn", value: "2.8%", change: "-0.6%", isUp: true },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-bmBorder dark:border-charcoal-border">
        <div>
          <h1 className="font-serif text-3xl font-bold text-charcoal dark:text-ivory">
            Revenue & Subscription Analytics
          </h1>
          <p className="text-xs sm:text-sm text-bmText-secondary dark:text-bmText-darkSecondary mt-0.5">
            Financial performance across Free, Gold, Platinum, and Diamond membership plans.
          </p>
        </div>
        <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-sand dark:bg-charcoal-muted text-bmText-secondary">
          Illustrative Demo Financial Data
        </span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, i) => (
          <div
            key={i}
            className="bg-white dark:bg-charcoal-surface rounded-2xl border border-bmBorder dark:border-charcoal-border p-5 shadow-subtle flex flex-col justify-between"
          >
            <span className="text-xs text-bmText-secondary">{kpi.label}</span>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-charcoal dark:text-ivory mt-2">
              {kpi.value}
            </div>
            <div className="mt-3 pt-2 border-t border-bmBorder dark:border-charcoal-border flex items-center justify-between text-xs">
              <span className="text-bmSuccess font-semibold flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" />
                {kpi.change}
              </span>
              <span className="text-[11px] text-bmText-muted">vs previous period</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tier Breakdown Table */}
      <div className="bg-white dark:bg-charcoal-surface rounded-2xl border border-bmBorder dark:border-charcoal-border p-6 shadow-subtle space-y-4">
        <h2 className="font-serif text-xl font-bold text-charcoal dark:text-ivory">
          Membership Tier Performance Breakdown
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-sand/40 dark:bg-charcoal-muted border-b border-bmBorder dark:border-charcoal-border text-[11px] uppercase tracking-wider text-bmText-secondary font-semibold">
              <tr>
                <th className="p-3.5">Plan Tier</th>
                <th className="p-3.5">Active Subscribers</th>
                <th className="p-3.5">Monthly Revenue</th>
                <th className="p-3.5">Share of Total MRR</th>
                <th className="p-3.5">Growth Velocity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bmBorder/60 dark:divide-charcoal-border/60">
              {mockRevenueBreakdown.map((row) => (
                <tr key={row.plan} className="hover:bg-sand/20 dark:hover:bg-charcoal-muted/30">
                  <td className="p-3.5 font-serif font-bold text-sm text-charcoal dark:text-ivory">
                    {row.plan}
                  </td>
                  <td className="p-3.5 text-bmText-secondary">
                    {row.subscribers.toLocaleString()} members
                  </td>
                  <td className="p-3.5 font-semibold text-charcoal dark:text-ivory">
                    ₹{row.monthlyRevenue.toLocaleString()}
                  </td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 rounded-full bg-sand dark:bg-charcoal-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-burgundy"
                          style={{ width: `${row.percentage}%` }}
                        />
                      </div>
                      <span className="font-medium text-xs">{row.percentage}%</span>
                    </div>
                  </td>
                  <td className="p-3.5 text-bmSuccess font-semibold">
                    {row.plan === "Free" ? "+12%" : row.plan === "Platinum" ? "+24%" : "+16%"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
