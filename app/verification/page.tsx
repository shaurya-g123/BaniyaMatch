"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Phone,
  Mail,
  Camera,
  FileText,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  Clock,
  Upload,
  Lock,
  Sparkles
} from "lucide-react";
import { verificationService, VerificationStep } from "@/lib/services/verificationService";

export default function VerificationPage() {
  const [steps, setSteps] = useState<VerificationStep[]>(verificationService.getVerificationStatus());
  const [activeUploadId, setActiveUploadId] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  const completedCount = steps.filter((s) => s.status === "verified").length;

  const handleSimulateUpload = async (stepId: string) => {
    setActiveUploadId(stepId);
    await verificationService.submitDocument(stepId, "document_sample.pdf");
    setActiveUploadId(null);
    setUploadSuccess(stepId);

    // Update state to in_progress or verified
    setSteps((prev) =>
      prev.map((s) => (s.id === stepId ? { ...s, status: "in_progress" } : s))
    );

    setTimeout(() => {
      setUploadSuccess(null);
    }, 3000);
  };

  const getStepIcon = (id: string) => {
    switch (id) {
      case "mobile":
        return <Phone className="w-5 h-5 text-burgundy dark:text-gold" />;
      case "email":
        return <Mail className="w-5 h-5 text-burgundy dark:text-gold" />;
      case "selfie":
        return <Camera className="w-5 h-5 text-burgundy dark:text-gold" />;
      case "identity":
        return <ShieldCheck className="w-5 h-5 text-burgundy dark:text-gold" />;
      case "education":
        return <GraduationCap className="w-5 h-5 text-burgundy dark:text-gold" />;
      case "employment":
        return <Briefcase className="w-5 h-5 text-burgundy dark:text-gold" />;
      default:
        return <FileText className="w-5 h-5 text-burgundy dark:text-gold" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Banner & Progress */}
      <div className="bg-white dark:bg-charcoal-surface rounded-3xl border border-bmBorder dark:border-charcoal-border p-6 sm:p-8 shadow-subtle space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand dark:bg-charcoal-muted text-xs font-semibold text-burgundy dark:text-gold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Trust Center</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-charcoal dark:text-ivory">
              6-Level Verification Trust System
            </h1>
            <p className="text-xs sm:text-sm text-bmText-secondary dark:text-bmText-darkSecondary mt-1">
              {completedCount} of 6 verifications complete. High trust ratings receive 4x more mutual responses.
            </p>
          </div>

          <div className="text-left sm:text-right shrink-0">
            <span className="text-[11px] uppercase font-bold tracking-wider text-bmText-secondary block">
              Credibility Rating
            </span>
            <span className="font-serif text-3xl font-bold text-bmSuccess">
              Level {completedCount}
            </span>
          </div>
        </div>

        {/* Progress Track */}
        <div className="w-full h-2.5 rounded-full bg-sand dark:bg-charcoal-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-burgundy via-gold to-bmSuccess transition-all duration-500"
            style={{ width: `${(completedCount / 6) * 100}%` }}
          />
        </div>
      </div>

      {/* Privacy Guarantee Note */}
      <div className="p-5 rounded-2xl bg-sand/40 dark:bg-charcoal-surface border border-bmBorder dark:border-charcoal-border flex items-start gap-4 text-xs">
        <Lock className="w-5 h-5 text-burgundy dark:text-gold shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-charcoal dark:text-ivory font-serif text-sm block">
            Absolute Privacy of Identity Documents
          </strong>
          <p className="text-bmText-secondary dark:text-bmText-darkSecondary leading-relaxed">
            Your government ID (Aadhaar, Passport), pay slips, and degree certificates are strictly reviewed by internal compliance audits and encrypted. Other members only see a green verification badge. Your private identity numbers are never published.
          </p>
        </div>
      </div>

      {/* Verification Checkpoints List */}
      <div className="space-y-4">
        {steps.map((step) => {
          const isDone = step.status === "verified";
          const isInProgress = step.status === "in_progress";
          const isPending = step.status === "pending";

          return (
            <div
              key={step.id}
              className="bg-white dark:bg-charcoal-surface rounded-2xl border border-bmBorder dark:border-charcoal-border p-5 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:border-gold/40"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-sand/60 dark:bg-charcoal-muted shrink-0">
                  {getStepIcon(step.id)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-base font-bold text-charcoal dark:text-ivory">
                      {step.name}
                    </h3>
                    {isDone && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sage-soft text-bmSuccess border border-sage/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Verified
                      </span>
                    )}
                    {isInProgress && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gold/15 text-charcoal dark:text-gold border border-gold/30 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Audit in Progress
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary leading-relaxed max-w-lg">
                    {step.description}
                  </p>

                  {step.verifiedDate && (
                    <span className="text-[11px] text-bmText-muted block pt-0.5">
                      Verified on {step.verifiedDate}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="shrink-0 self-end sm:self-center">
                {isDone ? (
                  <span className="text-xs text-bmSuccess font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Completed
                  </span>
                ) : (
                  <button
                    onClick={() => handleSimulateUpload(step.id)}
                    disabled={activeUploadId === step.id}
                    className="px-4 py-2 rounded-full bg-burgundy hover:bg-burgundy-dark text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>
                      {activeUploadId === step.id ? "Auditing Document..." : "Upload & Validate"}
                    </span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
