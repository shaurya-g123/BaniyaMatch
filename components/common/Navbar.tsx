"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Heart,
  MessageSquare,
  Users,
  Bell,
  User,
  ShieldCheck,
  Crown,
  Search,
  Bookmark,
  Menu,
  X,
  Lock
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { getStoredNotifications } from "@/lib/mockStorage";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [unreadNotifs, setUnreadNotifs] = useState(2);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const notifs = getStoredNotifications();
    const unread = notifs.filter((n) => !n.read).length;
    setUnreadNotifs(unread);
  }, [pathname]);

  const navLinks = [
    { label: "Discover", href: "/browse", icon: Search },
    { label: "Matches", href: "/matches", icon: Heart },
    { label: "Interests", href: "/interests", icon: Heart },
    { label: "Shortlists", href: "/shortlists", icon: Bookmark },
    { label: "Messages", href: "/messages", icon: MessageSquare },
    { label: "Family", href: "/family", icon: Users },
    { label: "Membership", href: "/membership", icon: Crown },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/browse" && pathname === "/browse") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return pathname === href;
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "bg-ivory/95 dark:bg-charcoal/95 backdrop-blur-md shadow-subtle border-b border-bmBorder dark:border-charcoal-border py-2.5"
          : "bg-ivory dark:bg-charcoal border-b border-bmBorder/60 dark:border-charcoal-border/60 py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full bg-burgundy flex items-center justify-center text-ivory text-sm font-serif font-bold shadow-sm group-hover:scale-105 transition-transform">
            BM
          </div>
          <div>
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-charcoal dark:text-ivory group-hover:text-burgundy dark:group-hover:text-gold transition-colors">
              BANIYA MATCH
            </span>
            <span className="hidden sm:block text-[9px] tracking-widest uppercase text-bmText-secondary dark:text-bmText-darkSecondary font-medium">
              Traditions & Compatibility
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          {navLinks.map((item) => {
            const active = isLinkActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all ${
                  active
                    ? "bg-sand dark:bg-charcoal-surface text-burgundy dark:text-gold shadow-xs"
                    : "text-bmText-secondary dark:text-bmText-darkSecondary hover:text-charcoal dark:hover:text-ivory hover:bg-sand/60 dark:hover:bg-charcoal-surface/60"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Icons & Auth */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          {/* Notifications */}
          <Link
            href="/notifications"
            className="relative p-2 rounded-full border border-bmBorder dark:border-charcoal-border hover:bg-sand dark:hover:bg-charcoal-surface text-bmText-secondary dark:text-bmText-darkSecondary transition-colors"
            title="Notifications"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifs > 0 && (
              <span className="absolute -top-1 -right-1 bg-burgundy text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {unreadNotifs}
              </span>
            )}
          </Link>

          {/* Admin link */}
          <Link
            href="/admin"
            className="hidden sm:flex p-2 rounded-full border border-bmBorder dark:border-charcoal-border hover:bg-sand dark:hover:bg-charcoal-surface text-bmText-secondary dark:text-bmText-darkSecondary transition-colors"
            title="Admin Portal"
            aria-label="Admin Portal"
          >
            <Lock className="w-4 h-4" />
          </Link>

          {/* Verification indicator */}
          <Link
            href="/verification"
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-sage-soft text-bmSuccess border border-sage/20 hover:bg-sage/10 transition-colors"
            title="4 of 6 Verifications Complete"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified</span>
          </Link>

          {/* Create Profile CTA */}
          <Link
            href="/onboarding"
            className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-burgundy hover:bg-burgundy-dark text-white text-xs sm:text-sm font-medium tracking-wide transition-all shadow-subtle hover:shadow-card hover:-translate-y-0.5 active:translate-y-0"
          >
            Create Profile
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-bmText-secondary dark:text-bmText-darkSecondary hover:bg-sand dark:hover:bg-charcoal-surface"
            aria-label="Open navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-ivory dark:bg-charcoal border-b border-bmBorder dark:border-charcoal-border px-4 py-4 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-bmBorder dark:border-charcoal-border">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const active = isLinkActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 p-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "bg-burgundy text-white"
                      : "bg-sand dark:bg-charcoal-surface text-bmText-primary dark:text-bmText-darkPrimary"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-2 flex flex-col gap-2 text-xs text-bmText-secondary dark:text-bmText-darkSecondary">
            <Link
              href="/verification"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-2 hover:bg-sand dark:hover:bg-charcoal-surface rounded-md"
            >
              <span>Trust & Verification</span>
              <ShieldCheck className="w-4 h-4 text-bmSuccess" />
            </Link>
            <Link
              href="/success-stories"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-sand dark:hover:bg-charcoal-surface rounded-md"
            >
              Success Stories
            </Link>
            <Link
              href="/safety"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-sand dark:hover:bg-charcoal-surface rounded-md"
            >
              Safety Center
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-sand dark:hover:bg-charcoal-surface rounded-md"
            >
              About Baniya Match
            </Link>
            <Link
              href="/settings"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-sand dark:hover:bg-charcoal-surface rounded-md"
            >
              Account Settings
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-sand dark:hover:bg-charcoal-surface rounded-md text-gold font-medium"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
