"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  ShieldCheck,
  UserPlus,
  Bookmark,
  Heart,
  MessageSquare,
  Lock,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { mockProfiles } from "@/data/profiles";

interface FamilyMember {
  id: string;
  name: string;
  relation: "Candidate" | "Mother" | "Father" | "Sibling";
  role: "Candidate (Final Consent)" | "Family Admin" | "Parent Collaborator";
  avatar: string;
  status: "Active" | "Invited";
  permissions: string[];
}

export default function FamilyPage() {
  const [members, setMembers] = useState<FamilyMember[]>([
    {
      id: "fam-1",
      name: "Riya Agarwal",
      relation: "Candidate",
      role: "Candidate (Final Consent)",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      status: "Active",
      permissions: ["Direct Chat", "Final Connection Approval", "Profile Privacy Control"],
    },
    {
      id: "fam-2",
      name: "Sunita Agarwal",
      relation: "Mother",
      role: "Family Admin",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
      status: "Active",
      permissions: ["Shortlist Profiles", "Suggest Matches", "Parent Video Calls"],
    },
    {
      id: "fam-3",
      name: "Rajesh Agarwal",
      relation: "Father",
      role: "Parent Collaborator",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      status: "Active",
      permissions: ["View Matches", "Lineage & Gotra Verification"],
    },
    {
      id: "fam-4",
      name: "Ankur Agarwal",
      relation: "Sibling",
      role: "Parent Collaborator",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      status: "Invited",
      permissions: ["Peer Match Recommendation"],
    },
  ]);

  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteSuccess, setInviteSuccess] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRelation, setInviteRelation] = useState("Sibling");

  const familySuggestedProfiles = [mockProfiles[3], mockProfiles[7]];

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    setInviteSuccess(true);
    setTimeout(() => {
      setInviteSuccess(false);
      setInviteModalOpen(false);
      setInviteEmail("");
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-bmBorder dark:border-charcoal-border">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-burgundy dark:text-gold" />
            <h1 className="font-serif text-3xl font-bold text-charcoal dark:text-ivory">
              Family Collaborative Space
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-bmText-secondary dark:text-bmText-darkSecondary mt-1">
            Empower parents and siblings to suggest profiles while the candidate retains complete privacy and final communication consent.
          </p>
        </div>

        <button
          onClick={() => setInviteModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-burgundy hover:bg-burgundy-dark text-white text-xs font-semibold shadow-subtle flex items-center gap-2 self-start md:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Invite Family Member</span>
        </button>
      </div>

      {/* Consent & Privacy Notice */}
      <div className="p-5 rounded-2xl bg-gold/10 dark:bg-charcoal-surface border border-gold/30 flex items-start gap-4">
        <Lock className="w-5 h-5 text-gold shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <strong className="text-charcoal dark:text-ivory font-serif text-sm block">
            Candidate Privacy & Final Consent Safeguard
          </strong>
          <p className="text-bmText-secondary dark:text-bmText-darkSecondary leading-relaxed">
            Parents can browse verified profiles, bookmark favorites, and initiate respectful family inquiries. However, personal direct chat and contact exchanges are only unlocked when the candidate personally consents.
          </p>
        </div>
      </div>

      {/* Family Members Grid */}
      <section className="space-y-4">
        <h2 className="font-serif text-xl font-bold text-charcoal dark:text-ivory">
          Family Network (4 Members)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-white dark:bg-charcoal-surface rounded-2xl border border-bmBorder dark:border-charcoal-border p-5 shadow-subtle space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-sand shrink-0 border border-bmBorder dark:border-charcoal-border">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-sm text-charcoal dark:text-ivory">
                      {member.name}
                    </h3>
                    <span className="text-[11px] text-burgundy dark:text-gold font-medium block">
                      {member.relation}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-bmBorder/60 dark:border-charcoal-border/60 text-xs">
                  <span className="text-[10px] uppercase tracking-wider text-bmText-secondary block font-semibold">
                    Role & Access
                  </span>
                  <span className="font-medium text-charcoal dark:text-ivory mt-0.5 block">
                    {member.role}
                  </span>
                </div>

                <div className="space-y-1 text-[11px] text-bmText-secondary dark:text-bmText-darkSecondary">
                  {member.permissions.map((perm, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-bmSuccess shrink-0" />
                      <span>{perm}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-bmBorder dark:border-charcoal-border flex items-center justify-between text-[11px]">
                <span className="text-bmText-muted">Status:</span>
                <span
                  className={`font-semibold ${
                    member.status === "Active" ? "text-bmSuccess" : "text-gold"
                  }`}
                >
                  {member.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Profiles Recommended by Family Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl font-bold text-charcoal dark:text-ivory">
              Profiles Under Family Review
            </h2>
            <p className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary mt-0.5">
              These candidate profiles were shortlisted by your parents for your consideration.
            </p>
          </div>
          <Link
            href="/shortlists"
            className="text-xs font-semibold text-burgundy dark:text-gold hover:underline flex items-center gap-1"
          >
            <span>View All Shortlists</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {familySuggestedProfiles.map((p, idx) => (
            <div
              key={p.id}
              className="bg-white dark:bg-charcoal-surface rounded-2xl border border-bmBorder dark:border-charcoal-border p-5 shadow-subtle flex gap-4 items-center"
            >
              <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-sand shrink-0 border border-bmBorder dark:border-charcoal-border">
                <Image
                  src={p.photos[0]}
                  alt={p.name}
                  fill
                  className="object-cover object-top"
                />
              </div>

              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif font-bold text-base text-charcoal dark:text-ivory truncate">
                    {p.name}
                  </h3>
                  <ShieldCheck className="w-3.5 h-3.5 text-bmSuccess" />
                </div>
                <div className="text-xs text-bmText-secondary">
                  {p.age} yrs • {p.city} • {p.community} (Gotra: {p.gotra})
                </div>
                <div className="text-xs text-charcoal dark:text-ivory truncate">
                  {p.profession} • {p.college}
                </div>
                <div className="text-[11px] text-gold font-medium pt-1">
                  Suggested by: {idx === 0 ? "Mother (Sunita Agarwal)" : "Father (Rajesh Agarwal)"}
                </div>
              </div>

              <Link
                href={`/profile/${p.id}`}
                className="px-4 py-2 rounded-full bg-sand dark:bg-charcoal-muted text-xs font-semibold text-charcoal dark:text-ivory shrink-0 hover:bg-bmBorder"
              >
                Inspect
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Invite Modal */}
      {inviteModalOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-charcoal-surface max-w-md w-full rounded-3xl border border-bmBorder dark:border-charcoal-border p-6 sm:p-8 space-y-4 shadow-elevated">
            <h3 className="font-serif text-2xl font-bold text-charcoal dark:text-ivory">
              Invite Family Member
            </h3>

            {inviteSuccess ? (
              <div className="p-4 rounded-xl bg-sage-soft text-bmSuccess text-xs space-y-1">
                <strong>Invitation link sent!</strong>
                <p>Your family member will receive a secure SMS and WhatsApp magic link to join.</p>
              </div>
            ) : (
              <form onSubmit={handleSendInvite} className="space-y-4 text-xs">
                <p className="text-bmText-secondary">
                  Invite your mother, father, or sibling to collaborate on your profile.
                </p>

                <div>
                  <label className="block text-bmText-secondary mb-1 font-medium">Relationship</label>
                  <select
                    value={inviteRelation}
                    onChange={(e) => setInviteRelation(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-sand/40 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory"
                  >
                    <option value="Mother">Mother</option>
                    <option value="Father">Father</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Guardian">Guardian</option>
                  </select>
                </div>

                <div>
                  <label className="block text-bmText-secondary mb-1 font-medium">Email or Mobile Number</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98765 00000 or email@domain.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-sand/40 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setInviteModalOpen(false)}
                    className="px-4 py-2 rounded-full text-bmText-secondary hover:text-charcoal"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-full bg-burgundy text-white font-semibold shadow-subtle"
                  >
                    Send Invitation
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
