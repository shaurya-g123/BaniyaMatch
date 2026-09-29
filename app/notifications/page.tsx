"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Bell,
  Heart,
  Eye,
  Bookmark,
  Users,
  ShieldCheck,
  Crown,
  CheckCheck
} from "lucide-react";
import { NotificationItem } from "@/lib/types";
import { getStoredNotifications, saveStoredNotifications } from "@/lib/mockStorage";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  useEffect(() => {
    setNotifications(getStoredNotifications());
  }, []);

  const handleMarkAllRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    saveStoredNotifications(updated);
  };

  const handleMarkItemRead = (id: string) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
    saveStoredNotifications(updated);
  };

  const filteredNotifs = notifications.filter((n) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "unread") return !n.read;
    return n.type === activeFilter;
  });

  const getIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "interest":
        return <Heart className="w-4 h-4 text-burgundy dark:text-gold" />;
      case "view":
        return <Eye className="w-4 h-4 text-bmText-secondary" />;
      case "shortlist":
        return <Bookmark className="w-4 h-4 text-gold" />;
      case "family":
        return <Users className="w-4 h-4 text-burgundy dark:text-gold" />;
      case "verification":
        return <ShieldCheck className="w-4 h-4 text-bmSuccess" />;
      case "membership":
        return <Crown className="w-4 h-4 text-gold" />;
      default:
        return <Bell className="w-4 h-4 text-bmText-secondary" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-bmBorder dark:border-charcoal-border">
        <div>
          <h1 className="font-serif text-3xl font-bold text-charcoal dark:text-ivory">
            Activity & Notifications
          </h1>
          <p className="text-xs sm:text-sm text-bmText-secondary dark:text-bmText-darkSecondary mt-0.5">
            Stay updated with interests, profile views, and verification statuses.
          </p>
        </div>

        <button
          onClick={handleMarkAllRead}
          className="text-xs font-semibold text-burgundy dark:text-gold hover:underline flex items-center gap-1.5 self-start sm:self-auto"
        >
          <CheckCheck className="w-4 h-4" />
          <span>Mark all as read</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {[
          { id: "all", label: "All Activity" },
          { id: "unread", label: "Unread" },
          { id: "interest", label: "Interests" },
          { id: "family", label: "Family Requests" },
          { id: "verification", label: "Verification" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
              activeFilter === tab.id
                ? "bg-burgundy text-white shadow-xs"
                : "bg-white dark:bg-charcoal-surface text-bmText-secondary dark:text-bmText-darkSecondary border border-bmBorder dark:border-charcoal-border hover:bg-sand"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      {filteredNotifs.length === 0 ? (
        <div className="bg-white dark:bg-charcoal-surface rounded-2xl border border-bmBorder dark:border-charcoal-border p-12 text-center space-y-3">
          <Bell className="w-8 h-8 text-gold mx-auto" />
          <h3 className="font-serif text-lg font-bold text-charcoal dark:text-ivory">
            No notifications in this view
          </h3>
          <p className="text-xs text-bmText-secondary">
            You are all caught up with your latest platform activity.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredNotifs.map((item) => (
            <div
              key={item.id}
              onClick={() => handleMarkItemRead(item.id)}
              className={`p-4 sm:p-5 rounded-2xl border transition-all flex items-start justify-between gap-4 cursor-pointer ${
                item.read
                  ? "bg-white dark:bg-charcoal-surface border-bmBorder dark:border-charcoal-border opacity-80"
                  : "bg-sand/40 dark:bg-charcoal-muted border-gold/40 shadow-xs"
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-full bg-sand dark:bg-charcoal-surface border border-bmBorder dark:border-charcoal-border shrink-0 mt-0.5">
                  {getIcon(item.type)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-sm text-charcoal dark:text-ivory">
                      {item.title}
                    </span>
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-burgundy dark:bg-gold shrink-0" />
                    )}
                  </div>

                  <p className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary leading-relaxed max-w-xl">
                    {item.description}
                  </p>

                  <span className="text-[10px] text-bmText-muted block pt-0.5">
                    {item.timestamp}
                  </span>
                </div>
              </div>

              {item.actionUrl && (
                <Link
                  href={item.actionUrl}
                  className="px-3.5 py-1.5 rounded-full bg-sand dark:bg-charcoal-muted hover:bg-bmBorder text-xs font-semibold text-charcoal dark:text-ivory shrink-0 self-center"
                >
                  View
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
