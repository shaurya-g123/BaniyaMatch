"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  ShieldCheck,
  ShieldAlert,
  MoreVertical,
  Check,
  Trash2,
  Ban,
  Filter
} from "lucide-react";
import { mockProfiles } from "@/data/profiles";

interface AdminUserRow {
  id: string;
  name: string;
  age: number;
  gender: string;
  city: string;
  community: string;
  gotra: string;
  plan: "Free" | "Gold" | "Platinum" | "Diamond";
  verificationStatus: "Verified" | "Pending" | "Flagged";
  status: "Active" | "Suspended" | "Flagged";
  joinedDate: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUserRow[]>(
    mockProfiles.slice(0, 30).map((p, i) => ({
      id: p.id,
      name: p.name,
      age: p.age,
      gender: p.gender,
      city: p.city,
      community: p.community,
      gotra: p.gotra,
      plan: i % 4 === 0 ? "Diamond" : i % 3 === 0 ? "Platinum" : i % 2 === 0 ? "Gold" : "Free",
      verificationStatus: i % 7 === 0 ? "Pending" : "Verified",
      status: i === 5 ? "Suspended" : "Active",
      joinedDate: `Aug ${10 + (i % 18)}, 2026`,
    }))
  );

  const [search, setSearch] = useState("");
  const [filterPlan, setFilterPlan] = useState("All");

  const handleToggleSuspend = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          return {
            ...u,
            status: u.status === "Suspended" ? "Active" : "Suspended",
          };
        }
        return u;
      })
    );
  };

  const handleToggleVerify = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          return {
            ...u,
            verificationStatus: u.verificationStatus === "Verified" ? "Pending" : "Verified",
          };
        }
        return u;
      })
    );
  };

  const handleDeleteUser = (userId: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  const filteredUsers = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.city.toLowerCase().includes(search.toLowerCase()) ||
      u.community.toLowerCase().includes(search.toLowerCase()) ||
      u.id.toLowerCase().includes(search.toLowerCase());
    const matchPlan = filterPlan === "All" || u.plan === filterPlan;
    return matchSearch && matchPlan;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-bmBorder dark:border-charcoal-border">
        <div>
          <h1 className="font-serif text-3xl font-bold text-charcoal dark:text-ivory">
            Member Management Directory
          </h1>
          <p className="text-xs sm:text-sm text-bmText-secondary dark:text-bmText-darkSecondary mt-0.5">
            Manage user accounts, compliance verifications, and subscription tiers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-bmText-secondary font-medium">
            Total {filteredUsers.length} Members
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-charcoal-surface p-4 rounded-2xl border border-bmBorder dark:border-charcoal-border shadow-subtle">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-bmText-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, ID, city, or community..."
            className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-sand/40 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto text-xs">
          <span className="text-bmText-secondary shrink-0 font-medium">Plan:</span>
          <select
            value={filterPlan}
            onChange={(e) => setFilterPlan(e.target.value)}
            className="p-2 rounded-xl bg-sand/40 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-charcoal dark:text-ivory"
          >
            <option value="All">All Plans</option>
            <option value="Free">Free</option>
            <option value="Gold">Gold</option>
            <option value="Platinum">Platinum</option>
            <option value="Diamond">Diamond</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-charcoal-surface rounded-2xl border border-bmBorder dark:border-charcoal-border overflow-x-auto shadow-subtle">
        <table className="w-full text-left text-xs">
          <thead className="bg-sand/40 dark:bg-charcoal-muted border-b border-bmBorder dark:border-charcoal-border text-[11px] uppercase tracking-wider text-bmText-secondary font-semibold">
            <tr>
              <th className="p-4">Member Name & ID</th>
              <th className="p-4">Age / Gender</th>
              <th className="p-4">City</th>
              <th className="p-4">Community & Gotra</th>
              <th className="p-4">Membership</th>
              <th className="p-4">Verification</th>
              <th className="p-4">Account Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bmBorder/60 dark:divide-charcoal-border/60">
            {filteredUsers.map((u) => (
              <tr key={u.id} className="hover:bg-sand/20 dark:hover:bg-charcoal-muted/30 transition-colors">
                <td className="p-4">
                  <div className="font-serif font-bold text-sm text-charcoal dark:text-ivory">
                    {u.name}
                  </div>
                  <span className="text-[10px] text-bmText-muted font-mono">{u.id}</span>
                </td>
                <td className="p-4 text-bmText-secondary">
                  {u.age} yrs • {u.gender}
                </td>
                <td className="p-4 font-medium text-charcoal dark:text-ivory">
                  {u.city}
                </td>
                <td className="p-4">
                  <span className="font-medium text-charcoal dark:text-ivory">{u.community}</span>
                  <span className="text-[11px] text-bmText-muted block">Gotra: {u.gotra}</span>
                </td>
                <td className="p-4">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                      u.plan === "Diamond"
                        ? "bg-gold text-charcoal"
                        : u.plan === "Platinum"
                        ? "bg-burgundy text-white"
                        : u.plan === "Gold"
                        ? "bg-sand dark:bg-charcoal-muted text-burgundy dark:text-gold"
                        : "bg-sand/60 text-bmText-secondary"
                    }`}
                  >
                    {u.plan}
                  </span>
                </td>
                <td className="p-4">
                  <span
                    className={`inline-flex items-center gap-1 font-semibold ${
                      u.verificationStatus === "Verified" ? "text-bmSuccess" : "text-gold"
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {u.verificationStatus}
                  </span>
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      u.status === "Active"
                        ? "bg-sage-soft text-bmSuccess"
                        : "bg-red-100 text-bmError"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <Link
                      href={`/profile/${u.id}`}
                      className="px-2.5 py-1 rounded-lg bg-sand dark:bg-charcoal-muted hover:bg-bmBorder text-[11px] font-medium transition-colors"
                    >
                      View
                    </Link>

                    <button
                      onClick={() => handleToggleVerify(u.id)}
                      className="p-1 rounded-lg hover:bg-sand dark:hover:bg-charcoal text-bmText-secondary hover:text-bmSuccess"
                      title="Toggle Verification"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleToggleSuspend(u.id)}
                      className="p-1 rounded-lg hover:bg-sand dark:hover:bg-charcoal text-bmText-secondary hover:text-gold"
                      title="Toggle Suspension"
                    >
                      <Ban className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleDeleteUser(u.id)}
                      className="p-1 rounded-lg hover:bg-red-50 text-bmText-secondary hover:text-bmError"
                      title="Delete User"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
