"use client";

import React from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-sand/30 dark:bg-charcoal flex flex-col md:flex-row">
      <AdminSidebar />
      <div className="flex-1 p-6 sm:p-10 max-w-7xl overflow-x-hidden">
        {/* Top Disclaimer for Admin demo */}
        <div className="mb-6 p-3 rounded-xl bg-gold/15 border border-gold/30 text-xs text-charcoal dark:text-ivory flex items-center justify-between">
          <span>
            <strong>Admin Console:</strong> Simulating real-time operational data, member moderation queues, and revenue metrics.
          </span>
          <span className="text-[10px] font-mono uppercase bg-burgundy text-white px-2 py-0.5 rounded">
            Ops Demo Mode
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}
