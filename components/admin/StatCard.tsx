import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { AdminMetric } from "@/data/adminData";

export const StatCard: React.FC<{ metric: AdminMetric }> = ({ metric }) => {
  return (
    <div className="bg-white dark:bg-charcoal-surface rounded-2xl border border-bmBorder dark:border-charcoal-border p-5 shadow-subtle flex flex-col justify-between">
      <div>
        <span className="text-xs font-medium text-bmText-secondary dark:text-bmText-darkSecondary">
          {metric.title}
        </span>
        <div className="font-serif text-2xl sm:text-3xl font-bold text-charcoal dark:text-ivory mt-2">
          {metric.value}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-bmBorder dark:border-charcoal-border flex items-center justify-between text-xs">
        <span
          className={`flex items-center gap-0.5 font-semibold ${
            metric.isPositive ? "text-bmSuccess" : "text-bmError"
          }`}
        >
          {metric.isPositive ? (
            <ArrowUpRight className="w-3.5 h-3.5" />
          ) : (
            <ArrowDownRight className="w-3.5 h-3.5" />
          )}
          {metric.change}
        </span>
        <span className="text-[11px] text-bmText-muted truncate max-w-[130px]">
          {metric.subtext}
        </span>
      </div>
    </div>
  );
};
