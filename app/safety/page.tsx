"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  Lock,
  EyeOff,
  AlertTriangle,
  PhoneCall,
  Coffee,
  Users,
  CheckCircle2,
  Flag
} from "lucide-react";

export default function SafetyPage() {
  const [reportSuccess, setReportSuccess] = useState(false);
  const [reportProfileId, setReportProfileId] = useState("");
  const [reportReason, setReportReason] = useState("Suspected Fake Photo");

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportProfileId) return;
    setReportSuccess(true);
    setTimeout(() => {
      setReportSuccess(false);
      setReportProfileId("");
    }, 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand dark:bg-charcoal-surface border border-bmBorder dark:border-charcoal-border text-xs font-semibold text-burgundy dark:text-gold">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Safety & Trust Standards</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal dark:text-ivory">
          Your Safety and Dignity Come First
        </h1>
        <p className="text-xs sm:text-sm text-bmText-secondary dark:text-bmText-darkSecondary leading-relaxed">
          Matchmaking should be a reassuring, honorable experience. Here is how we safeguard your identity and how you can protect yourself.
        </p>
      </div>

      {/* Safety Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Pillar 1 */}
        <div className="bg-white dark:bg-charcoal-surface rounded-2xl border border-bmBorder dark:border-charcoal-border p-6 space-y-3 shadow-subtle">
          <div className="w-10 h-10 rounded-xl bg-burgundy/10 text-burgundy dark:text-gold flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-charcoal dark:text-ivory">
            Protect Your Personal Details
          </h3>
          <p className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary leading-relaxed">
            Never share your Aadhaar number, passport scans, financial information, or bank details. Use our in-app messaging and video calling until you and your family feel comfortable.
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="bg-white dark:bg-charcoal-surface rounded-2xl border border-bmBorder dark:border-charcoal-border p-6 space-y-3 shadow-subtle">
          <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-charcoal dark:text-ivory">
            Recognize Financial Scams
          </h3>
          <p className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary leading-relaxed">
            Genuine suitors and families will never ask for monetary transfers, emergency flight funds, or crypto investment referrals. Flag any such request immediately.
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="bg-white dark:bg-charcoal-surface rounded-2xl border border-bmBorder dark:border-charcoal-border p-6 space-y-3 shadow-subtle">
          <div className="w-10 h-10 rounded-xl bg-sage-soft text-bmSuccess flex items-center justify-center">
            <Coffee className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-charcoal dark:text-ivory">
            Safe First Meetings
          </h3>
          <p className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary leading-relaxed">
            Always meet for the first time in a well-lit public place (e.g. coffee shop or casual restaurant). Inform a family member of your location and schedule.
          </p>
        </div>

        {/* Pillar 4 */}
        <div className="bg-white dark:bg-charcoal-surface rounded-2xl border border-bmBorder dark:border-charcoal-border p-6 space-y-3 shadow-subtle">
          <div className="w-10 h-10 rounded-xl bg-sand text-charcoal dark:text-ivory flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-charcoal dark:text-ivory">
            Respectful Family Involvement
          </h3>
          <p className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary leading-relaxed">
            Engage parents through our Family Connect dashboard. Mutual family introductions early on provide valuable context and deter dishonest candidates.
          </p>
        </div>

        {/* Pillar 5 */}
        <div className="bg-white dark:bg-charcoal-surface rounded-2xl border border-bmBorder dark:border-charcoal-border p-6 space-y-3 shadow-subtle">
          <div className="w-10 h-10 rounded-xl bg-burgundy/10 text-burgundy dark:text-gold flex items-center justify-center">
            <EyeOff className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-charcoal dark:text-ivory">
            Photo & Album Privacy
          </h3>
          <p className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary leading-relaxed">
            You can set your album to 'Visible to Accepted Matches Only'. Screenshots in private albums are discouraged by watermarked viewer sessions.
          </p>
        </div>

        {/* Pillar 6 */}
        <div className="bg-white dark:bg-charcoal-surface rounded-2xl border border-bmBorder dark:border-charcoal-border p-6 space-y-3 shadow-subtle">
          <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center">
            <PhoneCall className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-charcoal dark:text-ivory">
            Virtual Phone Masking
          </h3>
          <p className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary leading-relaxed">
            Your real telephone number is kept private until you choose to reveal it. Our in-app audio/video calling operates securely over WebRTC.
          </p>
        </div>
      </div>

      {/* Interactive Report & Incident Form */}
      <section className="bg-white dark:bg-charcoal-surface rounded-3xl border border-bmBorder dark:border-charcoal-border p-6 sm:p-10 shadow-subtle space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <Flag className="w-5 h-5 text-burgundy dark:text-gold" />
            <h2 className="font-serif text-2xl font-bold text-charcoal dark:text-ivory">
              Report a Suspicious Account
            </h2>
          </div>
          <p className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary mt-1">
            Our trust and safety team reviews flagged profiles within 15 minutes.
          </p>
        </div>

        {reportSuccess ? (
          <div className="p-4 rounded-2xl bg-sage-soft text-bmSuccess text-xs space-y-1">
            <strong className="block text-sm">Report received and logged.</strong>
            <p>Thank you for protecting our community. The reported profile has been placed under investigation.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmitReport} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-medium text-bmText-secondary mb-1">
                Profile ID or Candidate Name
              </label>
              <input
                type="text"
                required
                value={reportProfileId}
                onChange={(e) => setReportProfileId(e.target.value)}
                placeholder="e.g. bm-1088 or Vivek Goyal"
                className="w-full p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory"
              />
            </div>

            <div>
              <label className="block font-medium text-bmText-secondary mb-1">
                Reason for Reporting
              </label>
              <select
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                className="w-full p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory"
              >
                <option value="Suspected Fake Photo">Suspected Fake Photo or Impersonation</option>
                <option value="Financial or Crypto Request">Financial Request or Loan Proposal</option>
                <option value="Incorrect Marital Status">Incorrect Marital Status or Concealed Information</option>
                <option value="Disrespectful Communication">Disrespectful or Inappropriate Language</option>
              </select>
            </div>

            <div className="sm:col-span-2 pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-burgundy hover:bg-burgundy-dark text-white font-semibold shadow-subtle transition-all"
              >
                Submit Incident Report
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
