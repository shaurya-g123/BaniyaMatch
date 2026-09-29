// TODO: Connect to Razorpay / Stripe gateway
export interface PlanDetails {
  id: "free" | "gold" | "platinum" | "diamond";
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  badge?: string;
  features: string[];
}

export const MEMBERSHIP_PLANS: PlanDetails[] = [
  {
    id: "free",
    name: "Free",
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      "Create full profile",
      "Browse profiles",
      "Basic filters",
      "5 interests/day",
      "Receive interests",
      "Basic compatibility",
      "Shortlist profiles",
      "Basic horoscope match",
      "Family invitation"
    ]
  },
  {
    id: "gold",
    name: "Gold",
    monthlyPrice: 999,
    annualPrice: 8999,
    badge: "Popular for Individuals",
    features: [
      "Everything in Free",
      "50 interests/month",
      "Contact viewing",
      "Advanced filters",
      "Who viewed you",
      "Who shortlisted you",
      "1 boost/month",
      "Premium badge",
      "Advanced horoscope compatibility",
      "NRI filters",
      "Saved searches",
      "Voice and video calls",
      "Private photo requests",
      "Incognito mode"
    ]
  },
  {
    id: "platinum",
    name: "Platinum",
    monthlyPrice: 1799,
    annualPrice: 15999,
    badge: "Most Recommended",
    features: [
      "Everything in Gold",
      "Unlimited interests",
      "Higher visibility",
      "3 boosts/month",
      "AI match recommendations",
      "Compatibility explanation",
      "Lifestyle compatibility",
      "Family compatibility radar",
      "AI bio assistance",
      "Conversation starters",
      "Priority verification",
      "Priority support",
      "Family Connect",
      "Meeting scheduling",
      "Profile analytics"
    ]
  },
  {
    id: "diamond",
    name: "Diamond",
    monthlyPrice: 2399,
    annualPrice: 20999,
    badge: "For Discerning Families",
    features: [
      "Everything in Platinum",
      "Top search placement",
      "5 boosts/month",
      "Diamond badge",
      "Featured profile spotlight",
      "Unlimited communication",
      "Parent-to-parent introduction",
      "Family group chat",
      "Advanced compatibility report",
      "Deep horoscope insights",
      "Private albums",
      "Enhanced privacy",
      "Priority recommendations",
      "Premium support"
    ]
  }
];

export interface AddOnItem {
  id: string;
  name: string;
  price: number;
  duration?: string;
  description: string;
}

export const ADD_ON_ITEMS: AddOnItem[] = [
  {
    id: "boost-24h",
    name: "Profile Boost",
    price: 149,
    duration: "24 hours",
    description: "Get 4x more profile views and top placement in your city."
  },
  {
    id: "super-interest-single",
    name: "Super Interest",
    price: 49,
    description: "Send a prioritized note with guaranteed read notification."
  },
  {
    id: "super-interest-5",
    name: "5 Super Interests",
    price: 199,
    description: "Pack of 5 high-priority direct introductions."
  },
  {
    id: "super-interest-10",
    name: "10 Super Interests",
    price: 349,
    description: "Best value bundle for active search."
  },
  {
    id: "highlight-7d",
    name: "Profile Highlight",
    price: 199,
    duration: "7 days",
    description: "Distinctive gold frame and badge in search discovery."
  },
  {
    id: "priority-verif",
    name: "Premium Verification",
    price: 299,
    description: "Fast-track document audit within 4 hours."
  }
];

export const paymentService = {
  async simulatePurchase(itemOrPlanId: string, amount: number): Promise<{ success: boolean; transactionId: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          transactionId: `TXN-${Date.now().toString().slice(-8)}`
        });
      }, 600);
    });
  }
};
