export interface AdminMetric {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  subtext: string;
}

export const mockAdminMetrics: AdminMetric[] = [
  {
    title: "Total Registered Users",
    value: "14,820",
    change: "+12.4%",
    isPositive: true,
    subtext: "vs. previous month"
  },
  {
    title: "Active Monthly Users",
    value: "9,640",
    change: "+8.1%",
    isPositive: true,
    subtext: "65% active engagement"
  },
  {
    title: "Verified Profiles",
    value: "8,920",
    change: "+14.6%",
    isPositive: true,
    subtext: "89% of active base"
  },
  {
    title: "Monthly Recurring Revenue",
    value: "₹24.8 Lakh",
    change: "+18.2%",
    isPositive: true,
    subtext: "Target: ₹30 Lakh"
  },
  {
    title: "Family Connections Made",
    value: "1,240",
    change: "+22.5%",
    isPositive: true,
    subtext: "High intent conversions"
  },
  {
    title: "Reported Profiles Queue",
    value: "7",
    change: "-4",
    isPositive: true,
    subtext: "Under review by team"
  }
];

export interface AdminReportItem {
  id: string;
  reportedProfileId: string;
  reportedName: string;
  reportedBy: string;
  reason: "Suspected Fake Photo" | "Improper Communication" | "Incorrect Marital Status" | "Financial Request";
  date: string;
  status: "Pending" | "Investigating" | "Resolved" | "Banned";
  notes: string;
}

export const mockAdminReports: AdminReportItem[] = [
  {
    id: "rep-101",
    reportedProfileId: "bm-1088",
    reportedName: "Vivek Goyal",
    reportedBy: "Meera Agarwal",
    reason: "Suspected Fake Photo",
    date: "Sep 28, 2026",
    status: "Investigating",
    notes: "Selfie scan confidence below 70%. Requested manual video verification."
  },
  {
    id: "rep-102",
    reportedProfileId: "bm-1092",
    reportedName: "Kunal Bansal",
    reportedBy: "Riya Mittal",
    reason: "Incorrect Marital Status",
    date: "Sep 27, 2026",
    status: "Pending",
    notes: "Reporter claims individual is currently legally separated rather than divorced."
  },
  {
    id: "rep-103",
    reportedProfileId: "bm-1045",
    reportedName: "Mayank Singhal",
    reportedBy: "Ananya Gupta",
    reason: "Financial Request",
    date: "Sep 26, 2026",
    status: "Banned",
    notes: "Immediate suspension enacted after crypto trading referral was detected."
  },
  {
    id: "rep-104",
    reportedProfileId: "bm-1067",
    reportedName: "Saurabh Jindal",
    reportedBy: "Aditi Khandelwal",
    reason: "Improper Communication",
    date: "Sep 25, 2026",
    status: "Resolved",
    notes: "First warning issued. Chat logs reviewed and flagged."
  }
];

export interface RevenueBreakdown {
  plan: "Free" | "Gold" | "Platinum" | "Diamond";
  subscribers: number;
  monthlyRevenue: number;
  percentage: number;
}

export const mockRevenueBreakdown: RevenueBreakdown[] = [
  { plan: "Free", subscribers: 8420, monthlyRevenue: 0, percentage: 0 },
  { plan: "Gold", subscribers: 820, monthlyRevenue: 819180, percentage: 33 },
  { plan: "Platinum", subscribers: 560, monthlyRevenue: 1007440, percentage: 41 },
  { plan: "Diamond", subscribers: 280, monthlyRevenue: 671720, percentage: 26 }
];
