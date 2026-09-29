"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check, X, ShieldCheck, Camera, AlertCircle, Eye } from "lucide-react";
import { mockProfiles } from "@/data/profiles";

interface PhotoModerationItem {
  id: string;
  name: string;
  photoUrl: string;
  uploadedTime: string;
  confidenceScore: number;
  status: "Pending" | "Approved" | "Rejected";
}

export default function AdminProfilesPage() {
  const [photoQueue, setPhotoQueue] = useState<PhotoModerationItem[]>([
    {
      id: "bm-1002",
      name: mockProfiles[2].name,
      photoUrl: mockProfiles[2].photos[0],
      uploadedTime: "12 mins ago",
      confidenceScore: 94,
      status: "Pending",
    },
    {
      id: "bm-1004",
      name: mockProfiles[4].name,
      photoUrl: mockProfiles[4].photos[0],
      uploadedTime: "24 mins ago",
      confidenceScore: 89,
      status: "Pending",
    },
    {
      id: "bm-1008",
      name: mockProfiles[8].name,
      photoUrl: mockProfiles[8].photos[0],
      uploadedTime: "1 hour ago",
      confidenceScore: 76,
      status: "Pending",
    },
    {
      id: "bm-1054",
      name: mockProfiles[54].name,
      photoUrl: mockProfiles[54].photos[0],
      uploadedTime: "2 hours ago",
      confidenceScore: 96,
      status: "Pending",
    },
  ]);

  const handleDecision = (id: string, decision: "Approved" | "Rejected") => {
    setPhotoQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: decision } : item))
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-bmBorder dark:border-charcoal-border">
        <h1 className="font-serif text-3xl font-bold text-charcoal dark:text-ivory">
          Photo & Profile Moderation Queue
        </h1>
        <p className="text-xs sm:text-sm text-bmText-secondary dark:text-bmText-darkSecondary mt-0.5">
          Review newly uploaded candidate portraits, selfie matches, and bio updates before public indexing.
        </p>
      </div>

      {/* Photo Queue Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold text-charcoal dark:text-ivory">
            Pending Photo Audits ({photoQueue.filter((p) => p.status === "Pending").length})
          </h2>
          <span className="text-xs text-bmText-secondary">
            AI Facial Liveness Engine active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {photoQueue.map((item) => (
            <div
              key={item.id}
              className={`bg-white dark:bg-charcoal-surface rounded-2xl border p-4 shadow-subtle space-y-3 transition-all ${
                item.status === "Approved"
                  ? "border-bmSuccess/50 opacity-60"
                  : item.status === "Rejected"
                  ? "border-bmError/50 opacity-50"
                  : "border-bmBorder dark:border-charcoal-border"
              }`}
            >
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-sand">
                <Image src={item.photoUrl} alt={item.name} fill className="object-cover" />
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-charcoal/80 text-white backdrop-blur-xs">
                  {item.confidenceScore}% Liveness
                </div>
              </div>

              <div>
                <span className="font-serif font-bold text-sm text-charcoal dark:text-ivory block">
                  {item.name}
                </span>
                <span className="text-[11px] text-bmText-muted block">{item.uploadedTime}</span>
              </div>

              {item.status === "Pending" ? (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => handleDecision(item.id, "Approved")}
                    className="py-1.5 px-3 rounded-lg bg-sage-soft hover:bg-sage/30 text-bmSuccess text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve</span>
                  </button>

                  <button
                    onClick={() => handleDecision(item.id, "Rejected")}
                    className="py-1.5 px-3 rounded-lg bg-red-50 hover:bg-red-100 text-bmError text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                </div>
              ) : (
                <div className="p-2 text-center text-xs font-semibold rounded-lg bg-sand/40 dark:bg-charcoal-muted">
                  Decision: {item.status}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
