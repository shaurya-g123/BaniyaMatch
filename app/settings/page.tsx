"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Settings,
  Shield,
  Bell,
  Eye,
  Lock,
  Moon,
  Sun,
  Check,
  User,
  LogOut
} from "lucide-react";
import { authService, UserSession } from "@/lib/services/authService";

export default function SettingsPage() {
  const [user, setUser] = useState<UserSession>(authService.getCurrentUser());
  const [photoPrivacy, setPhotoPrivacy] = useState("all");
  const [incognitoMode, setIncognitoMode] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [whatsAppAlerts, setWhatsAppAlerts] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const handleToggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("bm_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("bm_theme", "light");
    }
  };

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Title */}
      <div className="pb-4 border-b border-bmBorder dark:border-charcoal-border">
        <h1 className="font-serif text-3xl font-bold text-charcoal dark:text-ivory">
          Account & Privacy Settings
        </h1>
        <p className="text-xs sm:text-sm text-bmText-secondary dark:text-bmText-darkSecondary mt-0.5">
          Manage your personal profile, privacy visibility, notification channels, and display mode.
        </p>
      </div>

      {/* User Profile Overview Card */}
      <div className="bg-white dark:bg-charcoal-surface rounded-3xl border border-bmBorder dark:border-charcoal-border p-6 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-sand border border-bmBorder dark:border-charcoal-border">
            <Image src={user.avatar} alt={user.name} fill className="object-cover object-top" />
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold text-charcoal dark:text-ivory">
              {user.name}
            </h2>
            <p className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary">
              {user.community} • Gotra: {user.gotra} • {user.city}
            </p>
            <div className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-burgundy/10 text-burgundy dark:text-gold uppercase tracking-wider">
              {user.membershipPlan} Member
            </div>
          </div>
        </div>

        <div className="text-xs text-bmText-secondary">
          <div>Email: {user.email}</div>
          <div>Phone: {user.phone}</div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* 1. Privacy Controls */}
        <section className="bg-white dark:bg-charcoal-surface rounded-3xl border border-bmBorder dark:border-charcoal-border p-6 sm:p-8 space-y-5 shadow-subtle">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-burgundy dark:text-gold" />
            <h3 className="font-serif text-xl font-bold text-charcoal dark:text-ivory">
              Privacy & Discovery Controls
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            {/* Photo Visibility */}
            <div>
              <label className="font-semibold text-charcoal dark:text-ivory block mb-1">
                Photo Album Visibility
              </label>
              <select
                value={photoPrivacy}
                onChange={(e) => setPhotoPrivacy(e.target.value)}
                className="w-full sm:w-80 p-2.5 rounded-xl bg-sand/40 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory"
              >
                <option value="all">Visible to all verified members</option>
                <option value="accepted">Visible to accepted interests only</option>
                <option value="request">Visible on explicit request only</option>
              </select>
            </div>

            {/* Incognito mode toggle */}
            <div className="pt-3 border-t border-bmBorder/60 dark:border-charcoal-border/60 flex items-center justify-between">
              <div>
                <strong className="text-charcoal dark:text-ivory block font-medium">
                  Incognito Browsing Mode
                </strong>
                <span className="text-bmText-secondary">
                  Browse profiles without appearing in other members' 'Who Viewed You' tab.
                </span>
              </div>
              <input
                type="checkbox"
                checked={incognitoMode}
                onChange={(e) => setIncognitoMode(e.target.checked)}
                className="w-5 h-5 accent-burgundy"
              />
            </div>
          </div>
        </section>

        {/* 2. Notification Preferences */}
        <section className="bg-white dark:bg-charcoal-surface rounded-3xl border border-bmBorder dark:border-charcoal-border p-6 sm:p-8 space-y-5 shadow-subtle">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-burgundy dark:text-gold" />
            <h3 className="font-serif text-xl font-bold text-charcoal dark:text-ivory">
              Notifications & Alerts
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <strong className="text-charcoal dark:text-ivory block font-medium">
                  Email Summaries & Daily Digests
                </strong>
                <span className="text-bmText-secondary">
                  Receive curated daily match recommendations and interest alerts in your inbox.
                </span>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-5 h-5 accent-burgundy"
              />
            </div>

            <div className="pt-3 border-t border-bmBorder/60 dark:border-charcoal-border/60 flex items-center justify-between">
              <div>
                <strong className="text-charcoal dark:text-ivory block font-medium">
                  WhatsApp Instant Verification Alerts
                </strong>
                <span className="text-bmText-secondary">
                  High-priority alerts when parents or candidates accept your interest or Family Connect.
                </span>
              </div>
              <input
                type="checkbox"
                checked={whatsAppAlerts}
                onChange={(e) => setWhatsAppAlerts(e.target.checked)}
                className="w-5 h-5 accent-burgundy"
              />
            </div>
          </div>
        </section>

        {/* 3. Display & Aesthetics (Dark Mode) */}
        <section className="bg-white dark:bg-charcoal-surface rounded-3xl border border-bmBorder dark:border-charcoal-border p-6 sm:p-8 space-y-5 shadow-subtle">
          <div className="flex items-center gap-2">
            <Moon className="w-5 h-5 text-burgundy dark:text-gold" />
            <h3 className="font-serif text-xl font-bold text-charcoal dark:text-ivory">
              Appearance & Aesthetics
            </h3>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div>
              <strong className="text-charcoal dark:text-ivory block font-medium">
                Theme Palette
              </strong>
              <span className="text-bmText-secondary">
                Switch between Warm Ivory editorial mode and Deep Charcoal quiet luxury mode.
              </span>
            </div>
            <button
              onClick={handleToggleTheme}
              className="px-4 py-2 rounded-full border border-bmBorder dark:border-charcoal-border bg-sand dark:bg-charcoal-muted text-charcoal dark:text-ivory font-semibold flex items-center gap-2"
            >
              {isDark ? <Sun className="w-4 h-4 text-gold" /> : <Moon className="w-4 h-4" />}
              <span>{isDark ? "Deep Charcoal" : "Warm Ivory"}</span>
            </button>
          </div>
        </section>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-3 pt-4">
        {saveSuccess && (
          <span className="text-xs text-bmSuccess font-medium flex items-center gap-1">
            <Check className="w-4 h-4" /> Preferences Saved
          </span>
        )}
        <button
          onClick={handleSave}
          className="px-8 py-3 rounded-full bg-burgundy hover:bg-burgundy-dark text-white text-xs font-semibold shadow-card transition-all"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
