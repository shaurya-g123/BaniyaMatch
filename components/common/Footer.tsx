import React from "react";
import Link from "next/link";
import { ShieldCheck, Heart, Users, Lock } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-sand/70 dark:bg-charcoal border-t border-bmBorder dark:border-charcoal-border pt-14 pb-24 lg:pb-14 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-burgundy flex items-center justify-center text-ivory text-sm font-serif font-bold">
                BM
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-charcoal dark:text-ivory">
                BANIYA MATCH
              </span>
            </Link>
            <p className="text-sm font-serif italic text-burgundy dark:text-gold">
              "Where Traditions Meet Compatibility"
            </p>
            <p className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary leading-relaxed max-w-sm">
              A modern matchmaking experience built with care for Baniya families, young professionals, and parents across India and global hubs. Designed for quiet luxury, verified trust, and genuine compatibility.
            </p>
            <div className="flex items-center gap-4 text-xs text-bmText-secondary dark:text-bmText-darkSecondary pt-2">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-bmSuccess" />
                <span>6-Level Verification</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-burgundy dark:text-gold" />
                <span>Family Collaboration</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal dark:text-ivory">
              Matchmaking
            </h4>
            <ul className="space-y-2 text-xs text-bmText-secondary dark:text-bmText-darkSecondary">
              <li>
                <Link href="/browse" className="hover:text-burgundy dark:hover:text-gold transition-colors">
                  Discover Profiles
                </Link>
              </li>
              <li>
                <Link href="/matches" className="hover:text-burgundy dark:hover:text-gold transition-colors">
                  Curated Matches
                </Link>
              </li>
              <li>
                <Link href="/family" className="hover:text-burgundy dark:hover:text-gold transition-colors">
                  Family Connect
                </Link>
              </li>
              <li>
                <Link href="/interests" className="hover:text-burgundy dark:hover:text-gold transition-colors">
                  Interests & Invitations
                </Link>
              </li>
              <li>
                <Link href="/membership" className="hover:text-burgundy dark:hover:text-gold transition-colors">
                  Membership Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Safety */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal dark:text-ivory">
              Trust & Safety
            </h4>
            <ul className="space-y-2 text-xs text-bmText-secondary dark:text-bmText-darkSecondary">
              <li>
                <Link href="/verification" className="hover:text-burgundy dark:hover:text-gold transition-colors">
                  Trust Center
                </Link>
              </li>
              <li>
                <Link href="/safety" className="hover:text-burgundy dark:hover:text-gold transition-colors">
                  Safety Guidelines
                </Link>
              </li>
              <li>
                <Link href="/safety#privacy" className="hover:text-burgundy dark:hover:text-gold transition-colors">
                  Privacy Controls
                </Link>
              </li>
              <li>
                <Link href="/safety#report" className="hover:text-burgundy dark:hover:text-gold transition-colors">
                  Report Suspicious Profile
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-burgundy dark:hover:text-gold transition-colors">
                  Help & FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Community */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal dark:text-ivory">
              Community
            </h4>
            <ul className="space-y-2 text-xs text-bmText-secondary dark:text-bmText-darkSecondary">
              <li>
                <Link href="/about" className="hover:text-burgundy dark:hover:text-gold transition-colors">
                  About Our Vision
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="hover:text-burgundy dark:hover:text-gold transition-colors">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-burgundy dark:hover:text-gold transition-colors">
                  Editorial Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-burgundy dark:hover:text-gold transition-colors">
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-gold font-medium hover:underline flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-bmBorder dark:border-charcoal-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-bmText-muted">
          <div>
            (c) {new Date().getFullYear()} Baniya Match Technologies. Designed with quiet Indian luxury.
          </div>
          <div className="text-center md:text-right text-[11px] text-bmText-secondary dark:text-bmText-darkSecondary">
            Illustrative interactive prototype. All profiles and testimonials are fictional demo representations.
          </div>
        </div>
      </div>
    </footer>
  );
};
