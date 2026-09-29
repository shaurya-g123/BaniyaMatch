"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Check, MessageSquare, Clock } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Membership & Verification Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "Membership & Verification Inquiry", message: "" });
    }, 3500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal dark:text-ivory">
          Contact Our Advisory Team
        </h1>
        <p className="text-xs sm:text-sm text-bmText-secondary dark:text-bmText-darkSecondary leading-relaxed">
          Whether you have questions regarding 6-level verification, family accounts, or NRI coordination, we are here to support you with discretion.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Office Hubs & Advisory */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-charcoal-surface rounded-3xl border border-bmBorder dark:border-charcoal-border p-6 sm:p-8 space-y-6 shadow-subtle">
            <h2 className="font-serif text-xl font-bold text-charcoal dark:text-ivory">
              Community Hubs
            </h2>

            <div className="space-y-4 text-xs text-bmText-secondary dark:text-bmText-darkSecondary">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="text-charcoal dark:text-ivory block font-medium">
                    Delhi NCR (Headquarters)
                  </strong>
                  <span>Golf Course Road, Sector 54, Gurugram, Haryana 122002</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="text-charcoal dark:text-ivory block font-medium">
                    Mumbai Advisory
                  </strong>
                  <span>Bandra Kurla Complex (BKC), Mumbai, Maharashtra 400051</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="text-charcoal dark:text-ivory block font-medium">
                    Jaipur Heritage Cell
                  </strong>
                  <span>C-Scheme, Ashok Nagar, Jaipur, Rajasthan 302001</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="text-charcoal dark:text-ivory block font-medium">
                    NRI London & Dubai Desks
                  </strong>
                  <span>Mayfair, London W1J & DIFC Gate Precinct 4, Dubai</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-bmBorder dark:border-charcoal-border space-y-2 text-xs text-bmText-secondary">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-burgundy dark:text-gold" />
                <span>concierge@baniyamatch.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-burgundy dark:text-gold" />
                <span>Monday to Saturday: 10:00 AM - 7:00 PM IST</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 bg-white dark:bg-charcoal-surface rounded-3xl border border-bmBorder dark:border-charcoal-border p-6 sm:p-10 shadow-subtle space-y-6">
          <h2 className="font-serif text-2xl font-bold text-charcoal dark:text-ivory">
            Send an Inquiry
          </h2>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-sage-soft text-bmSuccess text-xs space-y-2 text-center">
              <Check className="w-8 h-8 mx-auto" />
              <strong className="font-serif text-base block">Message Received</strong>
              <p>Thank you for reaching out. A community counselor will respond to your registered email within 24 business hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-bmText-secondary mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Bansal"
                    className="w-full p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory"
                  />
                </div>

                <div>
                  <label className="block font-medium text-bmText-secondary mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. name@domain.com"
                    className="w-full p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-bmText-secondary mb-1">Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory"
                >
                  <option value="Membership & Verification Inquiry">Membership & Verification Inquiry</option>
                  <option value="Family Account Assistance">Family Account Assistance</option>
                  <option value="NRI Consultation">NRI Cross-Border Consultation</option>
                  <option value="Technical or Profile Assistance">Technical or Profile Assistance</option>
                  <option value="Community Partnership">Community Partnership</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-bmText-secondary mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we assist you or your family?"
                  className="w-full p-3 rounded-xl bg-sand/30 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="px-7 py-3 rounded-full bg-burgundy hover:bg-burgundy-dark text-white font-semibold shadow-card flex items-center gap-2 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
