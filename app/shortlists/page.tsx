"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bookmark,
  Folder,
  Trash2,
  Send,
  Users,
  ShieldCheck,
  ArrowRight,
  FolderOpen
} from "lucide-react";
import { ShortlistItem, ShortlistFolder } from "@/lib/types";
import { getStoredShortlists, saveStoredShortlists } from "@/lib/mockStorage";
import { profileService } from "@/lib/services/profileService";

const FOLDERS: ShortlistFolder[] = ["Strong Match", "Family Review", "Maybe"];

export default function ShortlistsPage() {
  const [shortlists, setShortlists] = useState<ShortlistItem[]>([]);
  const [activeFolder, setActiveFolder] = useState<ShortlistFolder>("Strong Match");

  useEffect(() => {
    setShortlists(getStoredShortlists());
  }, []);

  const handleMoveFolder = (profileId: string, newFolder: ShortlistFolder) => {
    const updated = shortlists.map((item) =>
      item.profileId === profileId ? { ...item, folder: newFolder } : item
    );
    setShortlists(updated);
    saveStoredShortlists(updated);
  };

  const handleRemove = async (profileId: string) => {
    await profileService.removeShortlist(profileId);
    setShortlists(shortlists.filter((s) => s.profileId !== profileId));
  };

  const filteredItems = shortlists.filter((s) => s.folder === activeFolder);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-charcoal dark:text-ivory">
          Saved Shortlists
        </h1>
        <p className="text-xs sm:text-sm text-bmText-secondary dark:text-bmText-darkSecondary mt-1">
          Organize prospective candidates into curated folders for personal review and family discussions.
        </p>
      </div>

      {/* Folder Tabs */}
      <div className="flex items-center gap-3 border-b border-bmBorder dark:border-charcoal-border pb-3 overflow-x-auto">
        {FOLDERS.map((folder) => {
          const count = shortlists.filter((s) => s.folder === folder).length;
          const isActive = activeFolder === folder;
          return (
            <button
              key={folder}
              onClick={() => setActiveFolder(folder)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                isActive
                  ? "bg-burgundy text-white shadow-xs"
                  : "bg-white dark:bg-charcoal-surface text-bmText-secondary hover:text-charcoal dark:hover:text-ivory border border-bmBorder dark:border-charcoal-border"
              }`}
            >
              {isActive ? <FolderOpen className="w-4 h-4" /> : <Folder className="w-4 h-4" />}
              <span>{folder}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                isActive ? "bg-white/20 text-white" : "bg-sand dark:bg-charcoal-muted text-charcoal dark:text-ivory"
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      {filteredItems.length === 0 ? (
        <div className="bg-white dark:bg-charcoal-surface rounded-2xl border border-bmBorder dark:border-charcoal-border p-12 text-center space-y-3">
          <Bookmark className="w-8 h-8 text-gold mx-auto" />
          <h3 className="font-serif text-lg font-bold text-charcoal dark:text-ivory">
            No profiles saved in "{activeFolder}" yet
          </h3>
          <p className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary max-w-sm mx-auto">
            Bookmark candidate cards while browsing so you can evaluate them together with your family.
          </p>
          <Link
            href="/browse"
            className="inline-block mt-2 px-5 py-2 rounded-full bg-burgundy text-white text-xs font-semibold"
          >
            Explore Profiles
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.profileId}
              className="bg-white dark:bg-charcoal-surface rounded-2xl border border-bmBorder dark:border-charcoal-border p-5 shadow-subtle flex flex-col justify-between space-y-4 hover:border-gold/40 transition-all"
            >
              {/* Profile Top snippet */}
              <div className="flex gap-4">
                <Link
                  href={`/profile/${item.profile.id}`}
                  className="relative w-20 h-24 rounded-xl overflow-hidden bg-sand shrink-0 border border-bmBorder dark:border-charcoal-border"
                >
                  <Image
                    src={item.profile.photos[0]}
                    alt={item.profile.name}
                    fill
                    className="object-cover object-top"
                  />
                </Link>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Link
                      href={`/profile/${item.profile.id}`}
                      className="font-serif text-base font-bold text-charcoal dark:text-ivory hover:text-burgundy transition-colors"
                    >
                      {item.profile.name}
                    </Link>
                    <ShieldCheck className="w-3.5 h-3.5 text-bmSuccess" />
                  </div>
                  <div className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary">
                    {item.profile.age} yrs • {item.profile.city}
                  </div>
                  <div className="text-xs text-burgundy dark:text-gold font-medium">
                    {item.profile.community} (Gotra: {item.profile.gotra})
                  </div>
                  <div className="text-xs text-bmText-primary dark:text-bmText-darkPrimary truncate">
                    {item.profile.profession}
                  </div>
                </div>
              </div>

              {/* Notes / Sugg by family */}
              {item.notes && (
                <div className="p-2.5 rounded-lg bg-sand/30 dark:bg-charcoal-muted text-[11px] text-bmText-secondary italic border-l-2 border-gold/40">
                  {item.suggestedBy && <strong className="not-italic text-charcoal dark:text-ivory font-semibold block">{item.suggestedBy}: </strong>}
                  "{item.notes}"
                </div>
              )}

              {/* Move folder selector & Actions */}
              <div className="pt-3 border-t border-bmBorder dark:border-charcoal-border space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-bmText-secondary text-[11px]">Move to:</span>
                  <select
                    value={item.folder}
                    onChange={(e) => handleMoveFolder(item.profileId, e.target.value as ShortlistFolder)}
                    className="px-2.5 py-1 rounded-lg text-xs bg-sand/60 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory focus:outline-none"
                  >
                    {FOLDERS.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    href={`/profile/${item.profile.id}`}
                    className="py-1.5 px-3 rounded-full text-center text-xs font-semibold bg-sand/80 hover:bg-sand text-charcoal dark:text-ivory transition-colors"
                  >
                    View
                  </Link>

                  <button
                    onClick={() => handleRemove(item.profileId)}
                    className="py-1.5 px-3 rounded-full text-center text-xs font-medium border border-bmBorder dark:border-charcoal-border hover:bg-red-50 hover:text-bmError text-bmText-secondary transition-colors flex items-center justify-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
