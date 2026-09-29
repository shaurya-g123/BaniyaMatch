"use client";

import React, { useState } from "react";
import { Sparkles, ShieldCheck, Check, Zap, HelpCircle } from "lucide-react";
import { MEMBERSHIP_PLANS, ADD_ON_ITEMS, PlanDetails, AddOnItem, paymentService } from "@/lib/services/paymentService";
import { PricingCard } from "@/components/pricing/PricingCard";
import { AddOnCard } from "@/components/pricing/AddOnCard";

export default function MembershipPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<PlanDetails | null>(null);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [currentPlanId, setCurrentPlanId] = useState<string>("platinum");

  const handleSelectPlan = (plan: PlanDetails) => {
    setSelectedPlan(plan);
    setPaymentDone(false);
    setCheckoutModalOpen(true);
  };

  const handleConfirmPurchase = async () => {
    if (!selectedPlan) return;
    const amount = isAnnual ? selectedPlan.annualPrice : selectedPlan.monthlyPrice;
    await paymentService.simulatePurchase(selectedPlan.id, amount);
    setCurrentPlanId(selectedPlan.id);
    setPaymentDone(true);
    setTimeout(() => {
      setCheckoutModalOpen(false);
      setPaymentDone(false);
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header & Annual Toggle */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand dark:bg-charcoal-surface border border-bmBorder dark:border-charcoal-border text-xs font-semibold text-burgundy dark:text-gold">
          <Sparkles className="w-3.5 h-3.5 fill-current" />
          <span>Transparent Membership Tiers</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal dark:text-ivory tracking-tight">
          Invest in a Meaningful Future
        </h1>

        <p className="text-xs sm:text-sm text-bmText-secondary dark:text-bmText-darkSecondary leading-relaxed">
          Choose a plan that fits your search rhythm. Zero hidden commissions, no awkward broker fees, and full freedom to upgrade or cancel anytime.
        </p>

        {/* Monthly / Annual Billing Toggle */}
        <div className="pt-4 flex items-center justify-center">
          <div className="bg-sand/70 dark:bg-charcoal-surface p-1 rounded-full border border-bmBorder dark:border-charcoal-border flex items-center gap-1">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                !isAnnual
                  ? "bg-white dark:bg-charcoal-muted text-charcoal dark:text-ivory shadow-xs"
                  : "text-bmText-secondary dark:text-bmText-darkSecondary hover:text-charcoal"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isAnnual
                  ? "bg-burgundy text-white shadow-xs"
                  : "text-bmText-secondary dark:text-bmText-darkSecondary hover:text-charcoal"
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-gold text-charcoal font-bold">
                Save 30%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {MEMBERSHIP_PLANS.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            isAnnual={isAnnual}
            onSelectPlan={handleSelectPlan}
            isCurrent={plan.id === currentPlanId}
          />
        ))}
      </div>

      {/* Add-on Store Section */}
      <section className="pt-8 border-t border-bmBorder dark:border-charcoal-border space-y-6">
        <div className="max-w-xl">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-gold" />
            <h2 className="font-serif text-2xl font-bold text-charcoal dark:text-ivory">
              Add-on Power Packs
            </h2>
          </div>
          <p className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary mt-1">
            Boost individual features as you need them. Transparent flat-rate pricing without complicated virtual tokens.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ADD_ON_ITEMS.map((item) => (
            <AddOnCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Trust & Guarantee Box */}
      <div className="p-6 rounded-2xl bg-sand/40 dark:bg-charcoal-surface border border-bmBorder dark:border-charcoal-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-bmText-secondary">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-bmSuccess shrink-0" />
          <span>
            <strong className="text-charcoal dark:text-ivory block text-sm">
              Safe & Encrypted Transactions
            </strong>
            PCI-DSS certified gateway. Instant activation with full invoicing support for Indian & NRI cards.
          </span>
        </div>

        <div className="text-[11px] text-bmText-muted">
          All prices in Indian Rupees (INR), inclusive of GST.
        </div>
      </div>

      {/* Checkout / Confirmation Modal */}
      {checkoutModalOpen && selectedPlan && (
        <div className="fixed inset-0 z-50 bg-charcoal/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-charcoal-surface max-w-md w-full rounded-3xl border border-bmBorder dark:border-charcoal-border p-6 sm:p-8 space-y-5 shadow-elevated">
            <h3 className="font-serif text-2xl font-bold text-charcoal dark:text-ivory">
              Upgrade to {selectedPlan.name}
            </h3>

            {paymentDone ? (
              <div className="p-5 rounded-2xl bg-sage-soft text-bmSuccess text-xs space-y-2 text-center">
                <Check className="w-8 h-8 mx-auto" />
                <strong className="font-serif text-base block">Payment Successful!</strong>
                <p>Welcome to {selectedPlan.name} membership. Your premium features and badges are now active.</p>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-sand/40 dark:bg-charcoal-muted flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-sm text-charcoal dark:text-ivory block">
                      {selectedPlan.name} Plan ({isAnnual ? "Annual" : "Monthly"})
                    </span>
                    <span className="text-bmText-secondary">Full access to verified community features</span>
                  </div>
                  <div className="font-serif font-bold text-xl text-burgundy dark:text-gold">
                    ₹{isAnnual ? selectedPlan.annualPrice.toLocaleString() : selectedPlan.monthlyPrice.toLocaleString()}
                  </div>
                </div>

                <div className="space-y-1.5 text-bmText-secondary">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-bmSuccess" />
                    <span>Instant activation of contact viewing and radar insights</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-bmSuccess" />
                    <span>Simulated instant demo transaction</span>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-end gap-2">
                  <button
                    onClick={() => setCheckoutModalOpen(false)}
                    className="px-4 py-2 rounded-full text-bmText-secondary hover:text-charcoal"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmPurchase}
                    className="px-6 py-2.5 rounded-full bg-burgundy hover:bg-burgundy-dark text-white font-semibold shadow-card"
                  >
                    Confirm & Activate
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
