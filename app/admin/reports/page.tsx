"use client";

import React, { useState } from "react";
import { AlertTriangle, ShieldAlert, Check, Ban, Eye, FileText } from "lucide-react";
import { mockAdminReports, AdminReportItem } from "@/data/adminData";

export default function AdminReportsPage() {
  const [reports, setReports] = useState<AdminReportItem[]>(mockAdminReports);

  const handleUpdateReportStatus = (id: string, newStatus: AdminReportItem["status"]) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-bmBorder dark:border-charcoal-border">
        <h1 className="font-serif text-3xl font-bold text-charcoal dark:text-ivory">
          Incidents & Safety Reports
        </h1>
        <p className="text-xs sm:text-sm text-bmText-secondary dark:text-bmText-darkSecondary mt-0.5">
          Investigate member reports, financial solicitation flags, and marital status discrepancies.
        </p>
      </div>

      {/* Reports Table */}
      <div className="bg-white dark:bg-charcoal-surface rounded-2xl border border-bmBorder dark:border-charcoal-border overflow-x-auto shadow-subtle">
        <table className="w-full text-left text-xs">
          <thead className="bg-sand/40 dark:bg-charcoal-muted border-b border-bmBorder dark:border-charcoal-border text-[11px] uppercase tracking-wider text-bmText-secondary font-semibold">
            <tr>
              <th className="p-4">Report ID</th>
              <th className="p-4">Reported Candidate</th>
              <th className="p-4">Filed By</th>
              <th className="p-4">Reason Category</th>
              <th className="p-4">Investigation Notes</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Moderation Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bmBorder/60 dark:divide-charcoal-border/60">
            {reports.map((rep) => (
              <tr key={rep.id} className="hover:bg-sand/20 dark:hover:bg-charcoal-muted/30 transition-colors">
                <td className="p-4 font-mono text-[11px] text-bmText-muted">
                  {rep.id}
                </td>
                <td className="p-4 font-serif font-bold text-sm text-charcoal dark:text-ivory">
                  {rep.reportedName}
                  <span className="text-[10px] text-bmText-muted font-sans font-normal block">
                    {rep.reportedProfileId}
                  </span>
                </td>
                <td className="p-4 text-bmText-secondary">
                  {rep.reportedBy}
                </td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-50 text-bmError">
                    {rep.reason}
                  </span>
                </td>
                <td className="p-4 max-w-xs text-bmText-secondary italic text-[11px]">
                  "{rep.notes}"
                </td>
                <td className="p-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      rep.status === "Banned"
                        ? "bg-red-100 text-bmError"
                        : rep.status === "Investigating"
                        ? "bg-gold/20 text-gold-dark"
                        : rep.status === "Resolved"
                        ? "bg-sage-soft text-bmSuccess"
                        : "bg-sand text-bmText-secondary"
                    }`}
                  >
                    {rep.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => handleUpdateReportStatus(rep.id, "Resolved")}
                      className="px-2.5 py-1 rounded-lg bg-sage-soft hover:bg-sage/20 text-bmSuccess text-[11px] font-semibold"
                    >
                      Resolve
                    </button>
                    <button
                      onClick={() => handleUpdateReportStatus(rep.id, "Banned")}
                      className="px-2.5 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-bmError text-[11px] font-semibold"
                    >
                      Ban User
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
