"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart, Sparkles, MessageSquare, User } from "lucide-react";

export const MobileNav: React.FC = () => {
  const pathname = usePathname();

  // Hide on admin routes
  if (pathname.startsWith("/admin")) return null;

  const tabs = [
    { label: "Discover", href: "/browse", icon: Search },
    { label: "Matches", href: "/matches", icon: Sparkles },
    { label: "Interests", href: "/interests", icon: Heart },
    { label: "Messages", href: "/messages", icon: MessageSquare },
    { label: "Profile", href: "/settings", icon: User },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-ivory/95 dark:bg-charcoal/95 backdrop-blur-md border-t border-bmBorder dark:border-charcoal-border py-2 px-3 safe-area-bottom shadow-elevated">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href || (tab.href !== "/" && pathname.startsWith(tab.href));
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-colors ${
                isActive
                  ? "text-burgundy dark:text-gold"
                  : "text-bmText-secondary dark:text-bmText-darkSecondary hover:text-charcoal dark:hover:text-ivory"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : "stroke-[1.75]"}`} />
              <span className={`text-[10px] mt-0.5 ${isActive ? "font-semibold" : "font-normal"}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
