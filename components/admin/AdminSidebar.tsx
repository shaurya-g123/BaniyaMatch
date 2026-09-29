"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  AlertTriangle,
  IndianRupee,
  BarChart3,
  ArrowLeft
} from "lucide-react";

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();

  const links = [
    { label: "Executive Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Users & Profiles", href: "/admin/users", icon: Users },
    { label: "Moderation Queue", href: "/admin/profiles", icon: ShieldCheck },
    { label: "Reports & Incidents", href: "/admin/reports", icon: AlertTriangle },
    { label: "Revenue & Subscriptions", href: "/admin/revenue", icon: IndianRupee },
    { label: "Growth Analytics", href: "/admin/analytics", icon: BarChart3 },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-charcoal-surface border-r border-bmBorder dark:border-charcoal-border min-h-[calc(100vh-80px)] p-4 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        {/* Admin Header */}
        <div className="px-3 pt-2">
          <div className="text-[10px] uppercase font-bold tracking-widest text-gold">
            Administrative Console
          </div>
          <h2 className="font-serif text-lg font-bold text-charcoal dark:text-ivory mt-0.5">
            Baniya Match Ops
          </h2>
        </div>

        {/* Navigation list */}
        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  active
                    ? "bg-burgundy text-white shadow-xs font-semibold"
                    : "text-bmText-secondary dark:text-bmText-darkSecondary hover:bg-sand dark:hover:bg-charcoal hover:text-charcoal dark:hover:text-ivory"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Return to main app */}
      <div className="pt-4 border-t border-bmBorder dark:border-charcoal-border">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-bmText-secondary dark:text-bmText-darkSecondary hover:text-burgundy dark:hover:text-gold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Main Site</span>
        </Link>
      </div>
    </aside>
  );
};
