"use client";

import React from "react";
import { Check, Sparkles } from "lucide-react";
import { PlanDetails } from "@/lib/services/paymentService";

interface PricingCardProps {
  plan: PlanDetails;
  isAnnual: boolean;
  onSelectPlan: (plan: PlanDetails) => void;
  isCurrent?: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  isAnnual,
  onSelectPlan,
  isCurrent = false,
}) => {
  const isPlatinum = plan.id === "platinum";
  const isDiamond = plan.id === "diamond";

  const displayPrice = isAnnual
    ? plan.annualPrice === 0
      ? "₹0"
      : `₹${Math.round(plan.annualPrice / 12).toLocaleString()}`
    : `₹${plan.monthlyPrice.toLocaleString()}`;

  const periodLabel = plan.monthlyPrice === 0 ? "forever" : isAnnual ? "per month, billed annually" : "per month";

  return (
    <div
      className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
        isPlatinum
          ? "bg-white dark:bg-charcoal-surface border-2 border-burgundy dark:border-gold shadow-elevated scale-102 z-10"
          : isDiamond
          ? "bg-gradient-to-b from-white to-sand/40 dark:from-charcoal-surface dark:to-charcoal-muted border border-gold shadow-card"
          : "bg-white dark:bg-charcoal-surface border border-bmBorder dark:border-charcoal-border shadow-subtle hover:shadow-card"
      }`}
    >
      {/* Top Badge */}
      {plan.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-burgundy text-white shadow-xs">
          {plan.badge}
        </div>
      )}

      <div>
        {/* Plan Title & description */}
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-2xl font-bold text-charcoal dark:text-ivory">
            {plan.name}
          </h3>
          {isPlatinum && <Sparkles className="w-5 h-5 text-gold fill-gold" />}
        </div>

        {/* Price Lockup */}
        <div className="mt-4 pb-5 border-b border-bmBorder dark:border-charcoal-border">
          <div className="flex items-baseline gap-1">
            <span className="font-serif text-3xl sm:text-4xl font-extrabold text-charcoal dark:text-ivory">
              {displayPrice}
            </span>
            <span className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary">
              /{plan.monthlyPrice === 0 ? "mo" : "mo"}
            </span>
          </div>
          <div className="text-xs text-bmText-muted mt-1">{periodLabel}</div>
          {isAnnual && plan.annualPrice > 0 && (
            <div className="text-[11px] font-medium text-bmSuccess mt-0.5">
              Total ₹{plan.annualPrice.toLocaleString()} billed yearly (Save up to 30%)
            </div>
          )}
        </div>

        {/* Feature List */}
        <ul className="mt-6 space-y-2.5 text-xs text-bmText-secondary dark:text-bmText-darkSecondary">
          {plan.features.map((feat, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-burgundy dark:text-gold shrink-0 mt-0.5" />
              <span className="leading-relaxed">{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Select Button */}
      <div className="mt-8 pt-4">
        <button
          onClick={() => onSelectPlan(plan)}
          className={`w-full py-3 rounded-full text-xs font-semibold tracking-wide transition-all ${
            isCurrent
              ? "bg-sand dark:bg-charcoal-muted text-bmText-secondary cursor-default"
              : isPlatinum
              ? "bg-burgundy hover:bg-burgundy-dark text-white shadow-card hover:shadow-elevated hover:-translate-y-0.5"
              : isDiamond
              ? "bg-gold hover:bg-gold-dark text-charcoal shadow-card font-bold"
              : "bg-sand dark:bg-charcoal-muted hover:bg-bmBorder dark:hover:bg-charcoal-border text-charcoal dark:text-ivory"
          }`}
        >
          {isCurrent ? "Current Plan" : plan.monthlyPrice === 0 ? "Get Started Free" : `Choose ${plan.name}`}
        </button>
      </div>
    </div>
  );
};
