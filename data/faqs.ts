export interface FAQItem {
  question: string;
  answer: string;
  category: "Account" | "Profiles" | "Verification" | "Membership" | "Privacy" | "Family" | "Payments" | "Safety";
}

export const mockFAQs: FAQItem[] = [
  // Account
  {
    category: "Account",
    question: "Who can register on Baniya Match?",
    answer: "Baniya Match is designed for eligible candidates and families from the Baniya community across India and internationally, including Agarwal, Maheshwari, Oswal, Khandelwal, Gupta, Bansal, Singhal, Mittal, Goyal, Jindal, Jain Baniya, Porwal, Rastogi, and allied lineages."
  },
  {
    category: "Account",
    question: "Can parents create an account on behalf of their son or daughter?",
    answer: "Yes. Parents can create and manage a profile. With our Family Account feature, candidates and parents can collaborate together, while the candidate retains final consent for direct personal communication."
  },
  // Profiles
  {
    category: "Profiles",
    question: "How do compatibility scores work?",
    answer: "Compatibility is not a random number. We calculate multi-dimensional scores across Lifestyle (diet, habits, routine), Family Values (traditional vs. liberal, living setups), Career Expectations, Location Preferences, and Personal Interests."
  },
  {
    category: "Profiles",
    question: "Can I specify gotra exclusions for marriage suitability?",
    answer: "Yes. You can specify your self gotra, maternal gotra, paternal grandmother gotra, and specify preferences for gotra compatibility according to your family customs."
  },
  // Verification
  {
    category: "Verification",
    question: "What is the 6-Level Verification Trust System?",
    answer: "We verify Mobile, Email, Government Identity (Aadhaar or Passport), Degree & Educational Credentials, LinkedIn / Employment proof, and a Live Selfie check to confirm authentic photographs."
  },
  {
    category: "Verification",
    question: "Are my official government documents visible to others?",
    answer: "No. Never. Your Aadhaar, Passport, pay slips, and degree scans are strictly inspected by our compliance moderation team and deleted or encrypted. Other members only see a green verified badge."
  },
  // Membership
  {
    category: "Membership",
    question: "What is included in the Free tier?",
    answer: "Free members can create a full profile, browse candidate recommendations, apply basic filters, send up to 5 interests daily, shortlist profiles, and receive inbound communications."
  },
  {
    category: "Membership",
    question: "What is the difference between Gold, Platinum, and Diamond?",
    answer: "Gold offers contact viewing, advanced filters, who viewed you, and calls. Platinum adds AI-guided compatibility explanations, family connect scheduling, and priority verification. Diamond offers top search spotlight, family group chats, and direct parent-to-parent introductions."
  },
  // Privacy
  {
    category: "Privacy",
    question: "Can I keep my photos private from public view?",
    answer: "Yes. You can set your photos to 'Visible on Request' or 'Visible to Accepted Interests Only', ensuring complete control over who views your album."
  },
  {
    category: "Privacy",
    question: "Can I browse anonymously without notifying others?",
    answer: "Gold, Platinum, and Diamond members have access to Incognito Mode, allowing you to browse profiles without leaving a trace in their 'Who Viewed You' tab."
  },
  // Family
  {
    category: "Family",
    question: "How does the Family Connect feature work?",
    answer: "When both candidates or families show mutual interest, either side can request a 'Family Connect'. Once approved, parents from both sides can participate in a dedicated family chat or joint video introduction."
  },
  {
    category: "Family",
    question: "Can siblings help with shortlisting?",
    answer: "Yes. A Family Account allows up to 4 family members (candidate, father, mother, sibling) with granular permissions to recommend and shortlist profiles."
  },
  // Payments
  {
    category: "Payments",
    question: "What payment methods are supported?",
    answer: "We support all major Indian credit and debit cards, UPI (Google Pay, PhonePe, Paytm), Net Banking, as well as international cards for NRI families."
  },
  {
    category: "Payments",
    question: "Do subscriptions automatically renew?",
    answer: "You can choose automatic renewal or manual renewal with 100% control inside your Settings page anytime."
  },
  // Safety
  {
    category: "Safety",
    question: "How does Baniya Match prevent fake profiles and scams?",
    answer: "Every profile undergoes mandatory phone and selfie checks. Our automated heuristics flag inconsistent employment or rapid location jumps, and any reported profile is quarantined within 15 minutes."
  },
  {
    category: "Safety",
    question: "What should I do if a profile asks for financial assistance?",
    answer: "Never send money or financial gifts to anyone you meet online. Report the profile immediately using the 'Report Profile' button on their card for instantaneous investigation."
  }
];
