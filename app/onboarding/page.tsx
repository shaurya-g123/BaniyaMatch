"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Upload,
  Camera,
  Sparkles,
  Lock,
  Building,
  Heart
} from "lucide-react";

const STEPS = [
  "Basic Details",
  "Community & Lineage",
  "Lifestyle & Values",
  "Career & Education",
  "Family Background",
  "Partner Preferences",
  "Photos & Privacy",
  "Verification Badge",
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);

  // Form State with realistic initial demo values
  const [formData, setFormData] = useState({
    fullName: "Riya Agarwal",
    gender: "Female",
    dob: "1998-05-14",
    height: "5'4\"",
    maritalStatus: "Never Married",
    motherTongue: "Hindi",
    currentCity: "Gurugram",
    country: "India",
    mobile: "+91 98765 43210",
    email: "riya.agarwal@example.com",
    community: "Agarwal",
    gotra: "Garg",
    maternalGotra: "Bansal",
    diet: "Pure Vegetarian",
    smoking: "Non-smoker",
    drinking: "Non-drinker",
    religion: "Hindu",
    spiritual: "Spiritual and regular temple visits",
    educationLevel: "Master's / MBA",
    college: "IIM Ahmedabad",
    profession: "Senior Product Manager",
    income: "₹25–40 LPA",
    isBusiness: false,
    turnover: "₹10 Cr - ₹25 Cr",
    fatherOccupation: "Senior Executive in Corporate",
    motherOccupation: "Homemaker",
    siblings: "1 Brother (Married)",
    familyType: "Nuclear",
    familyValues: "Moderate",
    nativePlace: "Agra, Uttar Pradesh",
    livingArrangement: "Independent setup with proximity to parents",
    prefAgeMin: 26,
    prefAgeMax: 32,
    prefDiet: "Pure Vegetarian",
    prefTimeline: "6-12 months",
    prefCommunity: "Agarwal, Gupta, Bansal",
    prefGotra: "Open (Different from self & maternal gotra)",
    photoPrivacy: "Visible to all verified members",
    simulatedPhotos: [
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    ],
  });

  useEffect(() => {
    const saved = localStorage.getItem("bm_onboarding_draft");
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const updateField = (field: string, val: any) => {
    const updated = { ...formData, [field]: val };
    setFormData(updated);
    localStorage.setItem("bm_onboarding_draft", JSON.stringify(updated));
  };

  const nextStep = () => {
    if (currentStep < 8) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      finishOnboarding();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const finishOnboarding = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setCompleted(true);
    }, 1200);
  };

  if (completed) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-sage-soft text-bmSuccess flex items-center justify-center mx-auto shadow-card">
          <Check className="w-8 h-8 stroke-[2.5]" />
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal dark:text-ivory">
          Welcome to Baniya Match, {formData.fullName.split(" ")[0]}
        </h1>

        <p className="text-sm text-bmText-secondary dark:text-bmText-darkSecondary leading-relaxed">
          Your profile draft has been saved. Your preliminary verification badges are active, and our compatibility engine is matching you with eligible candidates.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => router.push("/matches")}
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-burgundy hover:bg-burgundy-dark text-white text-xs font-semibold shadow-card"
          >
            Go to My Matches
          </button>
          <button
            onClick={() => router.push("/family")}
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-sand dark:bg-charcoal-surface text-charcoal dark:text-ivory text-xs font-semibold border border-bmBorder dark:border-charcoal-border"
          >
            Invite Family Members
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Progress Bar & Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-burgundy dark:text-gold uppercase tracking-wider">
            Step {currentStep} of 8: {STEPS[currentStep - 1]}
          </span>
          <span className="text-bmText-muted">
            {Math.round((currentStep / 8) * 100)}% Complete
          </span>
        </div>

        <div className="w-full h-2 rounded-full bg-sand dark:bg-charcoal-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-burgundy to-gold transition-all duration-300"
            style={{ width: `${(currentStep / 8) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Container Form */}
      <div className="bg-white dark:bg-charcoal-surface rounded-3xl border border-bmBorder dark:border-charcoal-border p-6 sm:p-10 shadow-subtle space-y-6">
        {/* ================================================== */}
        {/* STEP 1: BASIC DETAILS                              */}
        {/* ================================================== */}
        {currentStep === 1 && (
          <div className="space-y-5">
            <div>
              <h2 className="font-serif text-2xl font-bold text-charcoal dark:text-ivory">
                Personal Foundation
              </h2>
              <p className="text-xs text-bmText-secondary mt-1">
                Tell us your core identity details. You control what is shared with prospective matches.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-medium text-bmText-secondary mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  className="w-full p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory"
                />
              </div>

              <div>
                <label className="block font-medium text-bmText-secondary mb-1">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => updateField("gender", e.target.value)}
                  className="w-full p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-bmText-secondary mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => updateField("dob", e.target.value)}
                  className="w-full p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory"
                />
              </div>

              <div>
                <label className="block font-medium text-bmText-secondary mb-1">Height</label>
                <input
                  type="text"
                  value={formData.height}
                  onChange={(e) => updateField("height", e.target.value)}
                  className="w-full p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory"
                />
              </div>

              <div>
                <label className="block font-medium text-bmText-secondary mb-1">Current City</label>
                <input
                  type="text"
                  value={formData.currentCity}
                  onChange={(e) => updateField("currentCity", e.target.value)}
                  className="w-full p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory"
                />
              </div>

              <div>
                <label className="block font-medium text-bmText-secondary mb-1">Country</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => updateField("country", e.target.value)}
                  className="w-full p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory"
                />
              </div>

              <div>
                <label className="block font-medium text-bmText-secondary mb-1">Mobile Number (Private)</label>
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => updateField("mobile", e.target.value)}
                  className="w-full p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory"
                />
              </div>

              <div>
                <label className="block font-medium text-bmText-secondary mb-1">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="w-full p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================================================== */}
        {/* STEP 2: COMMUNITY & LINEAGE                        */}
        {/* ================================================== */}
        {currentStep === 2 && (
          <div className="space-y-5">
            <div>
              <h2 className="font-serif text-2xl font-bold text-charcoal dark:text-ivory">
                Community & Gotra Heritage
              </h2>
              <p className="text-xs text-bmText-secondary mt-1">
                Preserving ancestral heritage and enabling accurate gotra compatibility for your family.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-medium text-bmText-secondary mb-1">Community</label>
                <select
                  value={formData.community}
                  onChange={(e) => updateField("community", e.target.value)}
                  className="w-full p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory"
                >
                  {["Agarwal", "Maheshwari", "Oswal", "Khandelwal", "Gupta", "Bansal", "Singhal", "Mittal", "Goyal", "Jindal", "Tayal", "Jain Baniya", "Vaishya", "Porwal", "Rastogi", "Mahajan", "Lodha"].map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-bmText-secondary mb-1">Self Gotra</label>
                <select
                  value={formData.gotra}
                  onChange={(e) => updateField("gotra", e.target.value)}
                  className="w-full p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory"
                >
                  {["Garg", "Goyal", "Bansal", "Singhal", "Mittal", "Jindal", "Tayal", "Kansal", "Airan", "Dharan", "Kuchhal", "Shandilya", "Kaushik", "Bharadwaj"].map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-bmText-secondary mb-1">Maternal Gotra</label>
                <input
                  type="text"
                  value={formData.maternalGotra}
                  onChange={(e) => updateField("maternalGotra", e.target.value)}
                  placeholder="e.g. Bansal"
                  className="w-full p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory"
                />
              </div>

              <div>
                <label className="block font-medium text-bmText-secondary mb-1">Sub-caste / Lineage Notes</label>
                <input
                  type="text"
                  placeholder="Optional ancestral notes"
                  className="w-full p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================================================== */}
        {/* STEP 3: LIFESTYLE & VALUES                         */}
        {/* ================================================== */}
        {currentStep === 3 && (
          <div className="space-y-5">
            <div>
              <h2 className="font-serif text-2xl font-bold text-charcoal dark:text-ivory">
                Lifestyle & Dietary Ethics
              </h2>
              <p className="text-xs text-bmText-secondary mt-1">
                Transparency in daily food practices and personal habits fosters seamless harmony.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-medium text-bmText-secondary mb-1">Dietary Preference</label>
                <select
                  value={formData.diet}
                  onChange={(e) => updateField("diet", e.target.value)}
                  className="w-full p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory"
                >
                  <option value="Pure Vegetarian">Pure Vegetarian</option>
                  <option value="Jain Vegetarian">Jain Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Eggetarian">Eggetarian</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-bmText-secondary mb-1">Religious Outlook</label>
                <select
                  value={formData.religion}
                  onChange={(e) => updateField("religion", e.target.value)}
                  className="w-full p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory"
                >
                  <option value="Hindu">Hindu</option>
                  <option value="Jain">Jain</option>
                  <option value="Vaishnav">Vaishnav</option>
                  <option value="Swaminarayan">Swaminarayan</option>
                  <option value="Arya Samaj">Arya Samaj</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-bmText-secondary mb-1">Smoking Habit</label>
                <select
                  value={formData.smoking}
                  onChange={(e) => updateField("smoking", e.target.value)}
                  className="w-full p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory"
                >
                  <option value="Non-smoker">Non-smoker</option>
                  <option value="Occasional smoker">Occasional smoker</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-bmText-secondary mb-1">Alcohol Consumption</label>
                <select
                  value={formData.drinking}
                  onChange={(e) => updateField("drinking", e.target.value)}
                  className="w-full p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory"
                >
                  <option value="Non-drinker">Non-drinker</option>
                  <option value="Occasional drinker">Occasional drinker</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* ================================================== */}
        {/* STEP 4: CAREER & EDUCATION                         */}
        {/* ================================================== */}
        {currentStep === 4 && (
          <div className="space-y-5">
            <div>
              <h2 className="font-serif text-2xl font-bold text-charcoal dark:text-ivory">
                Education & Career Standing
              </h2>
              <p className="text-xs text-bmText-secondary mt-1">
                Highlight your academic pedigree and professional achievements.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-medium text-bmText-secondary mb-1">Education Level</label>
                <select
                  value={formData.educationLevel}
                  onChange={(e) => updateField("educationLevel", e.target.value)}
                  className="w-full p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory"
                >
                  <option value="Bachelor's">Bachelor's Degree</option>
                  <option value="Master's / MBA">Master's / MBA</option>
                  <option value="CA / CFA">Chartered Accountant (CA) / CFA</option>
                  <option value="MD / MBBS">Doctor (MD / MBBS)</option>
                  <option value="PhD">Doctorate / PhD</option>
                  <option value="Law">Law (LLB / LLM)</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-bmText-secondary mb-1">College or University</label>
                <input
                  type="text"
                  value={formData.college}
                  onChange={(e) => updateField("college", e.target.value)}
                  className="w-full p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory"
                />
              </div>

              <div>
                <label className="block font-medium text-bmText-secondary mb-1">Profession</label>
                <input
                  type="text"
                  value={formData.profession}
                  onChange={(e) => updateField("profession", e.target.value)}
                  className="w-full p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory"
                />
              </div>

              <div>
                <label className="block font-medium text-bmText-secondary mb-1">Annual Personal Income</label>
                <select
                  value={formData.income}
                  onChange={(e) => updateField("income", e.target.value)}
                  className="w-full p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory"
                >
                  {["₹8–12 LPA", "₹12–18 LPA", "₹18–25 LPA", "₹25–40 LPA", "₹40–60 LPA", "₹60 LPA–₹1 Cr", "₹1 Cr+"].map((inc) => (
                    <option key={inc} value={inc}>
                      {inc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Business owner toggle */}
            <div className="pt-2 border-t border-bmBorder dark:border-charcoal-border">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-charcoal dark:text-ivory">
                <input
                  type="checkbox"
                  checked={formData.isBusiness}
                  onChange={(e) => updateField("isBusiness", e.target.checked)}
                  className="rounded text-burgundy accent-burgundy"
                />
                <span>Are you a business owner or part of a family enterprise?</span>
              </label>

              {formData.isBusiness && (
                <div className="mt-3 p-4 rounded-xl bg-sand/40 dark:bg-charcoal-muted text-xs space-y-2">
                  <label className="block font-medium text-bmText-secondary">Annual Enterprise Turnover</label>
                  <select
                    value={formData.turnover}
                    onChange={(e) => updateField("turnover", e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-white dark:bg-charcoal-surface border border-bmBorder dark:border-charcoal-border"
                  >
                    <option value="₹5 Cr - ₹15 Cr">₹5 Cr - ₹15 Cr</option>
                    <option value="₹15 Cr - ₹50 Cr">₹15 Cr - ₹50 Cr</option>
                    <option value="₹50 Cr - ₹200 Cr">₹50 Cr - ₹200 Cr</option>
                    <option value="₹200 Cr+">₹200 Cr+</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================================================== */}
        {/* STEP 5: FAMILY BACKGROUND                          */}
        {/* ================================================== */}
        {currentStep === 5 && (
          <div className="space-y-5">
            <div>
              <h2 className="font-serif text-2xl font-bold text-charcoal dark:text-ivory">
                Family Heritage & Setup
              </h2>
              <p className="text-xs text-bmText-secondary mt-1">
                Help other families understand your roots, values, and household culture.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-medium text-bmText-secondary mb-1">Father's Profession</label>
                <input
                  type="text"
                  value={formData.fatherOccupation}
                  onChange={(e) => updateField("fatherOccupation", e.target.value)}
                  className="w-full p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory"
                />
              </div>

              <div>
                <label className="block font-medium text-bmText-secondary mb-1">Mother's Profession</label>
                <input
                  type="text"
                  value={formData.motherOccupation}
                  onChange={(e) => updateField("motherOccupation", e.target.value)}
                  className="w-full p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory"
                />
              </div>

              <div>
                <label className="block font-medium text-bmText-secondary mb-1">Native Ancestral Place</label>
                <input
                  type="text"
                  value={formData.nativePlace}
                  onChange={(e) => updateField("nativePlace", e.target.value)}
                  placeholder="e.g. Jaipur, Rajasthan"
                  className="w-full p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory"
                />
              </div>

              <div>
                <label className="block font-medium text-bmText-secondary mb-1">Family Values</label>
                <select
                  value={formData.familyValues}
                  onChange={(e) => updateField("familyValues", e.target.value)}
                  className="w-full p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory"
                >
                  <option value="Moderate">Moderate</option>
                  <option value="Traditional">Traditional</option>
                  <option value="Liberal">Liberal</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-bmText-secondary mb-1">Family Structure</label>
                <select
                  value={formData.familyType}
                  onChange={(e) => updateField("familyType", e.target.value)}
                  className="w-full p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory"
                >
                  <option value="Nuclear">Nuclear</option>
                  <option value="Joint">Joint Family</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-bmText-secondary mb-1">Siblings</label>
                <input
                  type="text"
                  value={formData.siblings}
                  onChange={(e) => updateField("siblings", e.target.value)}
                  className="w-full p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================================================== */}
        {/* STEP 6: PARTNER PREFERENCES                        */}
        {/* ================================================== */}
        {currentStep === 6 && (
          <div className="space-y-5">
            <div>
              <h2 className="font-serif text-2xl font-bold text-charcoal dark:text-ivory">
                Partner Preferences
              </h2>
              <p className="text-xs text-bmText-secondary mt-1">
                Define what matters most in a partner. We will weigh these parameters in your compatibility radar.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-medium text-bmText-secondary mb-1">Preferred Marriage Timeline</label>
                <select
                  value={formData.prefTimeline}
                  onChange={(e) => updateField("prefTimeline", e.target.value)}
                  className="w-full p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory"
                >
                  <option value="Within 6 months">Within 6 months</option>
                  <option value="6-12 months">6-12 months</option>
                  <option value="1-2 years">1-2 years</option>
                  <option value="2+ years">2+ years</option>
                  <option value="Not sure">Not sure / Exploring</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-bmText-secondary mb-1">Dietary Requirement</label>
                <select
                  value={formData.prefDiet}
                  onChange={(e) => updateField("prefDiet", e.target.value)}
                  className="w-full p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory"
                >
                  <option value="Pure Vegetarian">Pure Vegetarian Only</option>
                  <option value="Jain Vegetarian">Jain Vegetarian</option>
                  <option value="Open to Eggetarian">Open to Eggetarian</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-bmText-secondary mb-1">Age Preference</label>
                <div className="p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory">
                  26 - 34 years
                </div>
              </div>

              <div>
                <label className="block font-medium text-bmText-secondary mb-1">Gotra Preference</label>
                <input
                  type="text"
                  value={formData.prefGotra}
                  onChange={(e) => updateField("prefGotra", e.target.value)}
                  className="w-full p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================================================== */}
        {/* STEP 7: PHOTOS & PRIVACY                           */}
        {/* ================================================== */}
        {currentStep === 7 && (
          <div className="space-y-5">
            <div>
              <h2 className="font-serif text-2xl font-bold text-charcoal dark:text-ivory">
                Photos & Visual Privacy
              </h2>
              <p className="text-xs text-bmText-secondary mt-1">
                Upload authentic, naturally lit portraits. You maintain total visibility control.
              </p>
            </div>

            {/* Photo previews */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {formData.simulatedPhotos.map((url, i) => (
                <div key={i} className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-sand border border-bmBorder dark:border-charcoal-border shadow-xs">
                  <Image src={url} alt={`Upload ${i}`} fill className="object-cover" />
                  <span className="absolute bottom-2 left-2 text-[10px] bg-charcoal/70 text-white px-2 py-0.5 rounded-full">
                    {i === 0 ? "Primary" : "Secondary"}
                  </span>
                </div>
              ))}

              <div className="aspect-[3/4] rounded-2xl border-2 border-dashed border-bmBorder dark:border-charcoal-border flex flex-col items-center justify-center text-center p-3 text-xs text-bmText-muted hover:border-gold cursor-pointer transition-colors">
                <Camera className="w-6 h-6 text-gold mb-1" />
                <span>Add Photo</span>
              </div>
            </div>

            {/* Privacy Controls */}
            <div className="p-4 rounded-xl bg-sand/40 dark:bg-charcoal-muted space-y-2 text-xs">
              <label className="font-semibold text-charcoal dark:text-ivory block">Photo Visibility Setting</label>
              <select
                value={formData.photoPrivacy}
                onChange={(e) => updateField("photoPrivacy", e.target.value)}
                className="w-full p-2.5 rounded-lg bg-white dark:bg-charcoal-surface border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory"
              >
                <option value="Visible to all verified members">Visible to all verified members (Recommended)</option>
                <option value="Visible on Request only">Visible on Request only</option>
                <option value="Visible to Accepted Interests only">Visible to Accepted Interests only</option>
              </select>
            </div>
          </div>
        )}

        {/* ================================================== */}
        {/* STEP 8: SIMULATED VERIFICATION BADGE               */}
        {/* ================================================== */}
        {currentStep === 8 && (
          <div className="space-y-5">
            <div>
              <h2 className="font-serif text-2xl font-bold text-charcoal dark:text-ivory">
                Simulated Trust Verification
              </h2>
              <p className="text-xs text-bmText-secondary mt-1">
                Your profile credibility score increases with each completed checkpoint.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              {[
                { title: "Mobile & SMS Authentication", status: "Verified", date: "Instant" },
                { title: "Personal Email Address", status: "Verified", date: "Instant" },
                { title: "Biometric Live Selfie Match", status: "Verified", date: "Instant" },
                { title: "Government Identity (Aadhaar / Passport)", status: "Pending Audit", date: "Simulated" },
                { title: "Higher Education Degree Validation", status: "Pending Audit", date: "Simulated" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-sand/30 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className={`w-4 h-4 ${item.status === "Verified" ? "text-bmSuccess" : "text-gold"}`} />
                    <span className="font-medium text-charcoal dark:text-ivory">{item.title}</span>
                  </div>
                  <span className={`text-[11px] font-semibold ${item.status === "Verified" ? "text-bmSuccess" : "text-gold"}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Buttons Row */}
        <div className="pt-6 border-t border-bmBorder dark:border-charcoal-border flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              onClick={prevStep}
              className="px-5 py-2.5 rounded-full border border-bmBorder dark:border-charcoal-border text-xs font-semibold text-charcoal dark:text-ivory hover:bg-sand transition-colors flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={nextStep}
            disabled={isSubmitting}
            className="px-7 py-2.5 rounded-full bg-burgundy hover:bg-burgundy-dark text-white text-xs font-semibold shadow-card flex items-center gap-1.5 transition-all"
          >
            <span>{currentStep === 8 ? (isSubmitting ? "Saving..." : "Complete & Activate") : "Continue"}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
