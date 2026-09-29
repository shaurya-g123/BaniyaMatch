export type CommunityType =
  | "Agarwal"
  | "Maheshwari"
  | "Oswal"
  | "Khandelwal"
  | "Gupta"
  | "Bansal"
  | "Singhal"
  | "Mittal"
  | "Goyal"
  | "Jindal"
  | "Tayal"
  | "Jain Baniya"
  | "Vaishya"
  | "Porwal"
  | "Rastogi"
  | "Mahajan"
  | "Lodha"
  | "Kasuadhan"
  | "Komati"
  | "Other";

export type GotraType =
  | "Garg (Gargeya)"
  | "Goyal (Goel)"
  | "Goyan"
  | "Bansal"
  | "Kansal"
  | "Singhal"
  | "Mangal"
  | "Jindal"
  | "Tingal"
  | "Aeron (Airan)"
  | "Dharan"
  | "Madhukul"
  | "Mittal"
  | "Tayal"
  | "Bhandal"
  | "Kuchhal"
  | "Nagal"
  | "Bindal"
  | "Garg"
  | "Goyal"
  | "Airan"
  | "Goel"
  | "Shandilya"
  | "Kaushik"
  | "Bharadwaj"
  | "Vashishtha"
  | "Other";

export type DietType =
  | "Pure Vegetarian"
  | "Jain Vegetarian"
  | "Vegan"
  | "Eggetarian"
  | "Non-Vegetarian";

export type FamilyValuesType = "Traditional" | "Moderate" | "Liberal";
export type FamilyTypeVal = "Joint" | "Nuclear";
export type MarriageTimelineType =
  | "Within 6 months"
  | "6-12 months"
  | "1-2 years"
  | "2+ years"
  | "Not sure";

export interface VerificationStatus {
  mobile: boolean;
  email: boolean;
  identity: boolean;
  education: boolean;
  employment: boolean;
  selfie: boolean;
}

export interface CompatibilityScores {
  overall: number;
  lifestyle: number;
  family: number;
  career: number;
  location: number;
  interests: number;
  whyMatch: string;
}

export interface FamilyDetails {
  fatherOccupation: string;
  motherOccupation: string;
  siblings: string;
  familyType: FamilyTypeVal;
  familyValues: FamilyValuesType;
  familyIncome: string;
  nativePlace: string;
  familyBusiness?: string;
  livingArrangement: string;
  familyInvolvement: string;
}

export interface Profile {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female";
  height: string;
  city: string;
  state?: string;
  country: string;
  isNRI: boolean;
  motherTongue: string;
  community: CommunityType;
  gotra: GotraType;
  maternalGotra?: string;
  education: string;
  college: string;
  degreeLevel: string;
  profession: string;
  companyOrFirm?: string;
  income: string;
  isBusiness: boolean;
  businessDetails?: {
    type: string;
    size: string;
    turnover: string;
  };
  diet: DietType;
  religion: string;
  lifestyle: {
    smoking: string;
    drinking: string;
    fitness: string;
    spiritual: string;
    social: string;
  };
  horoscope: {
    manglik: "Non-Manglik" | "Manglik" | "Anshik Manglik" | "Doesn't Matter";
    rashi?: string;
    nakshatra?: string;
    birthTime?: string;
  };
  timeline: MarriageTimelineType;
  family: FamilyDetails;
  about: string;
  interests: string[];
  photos: string[];
  verification: VerificationStatus;
  isVerified: boolean;
  compatibility: CompatibilityScores;
  isPremium?: boolean;
  isBoosted?: boolean;
  isNew?: boolean;
  lastActive: string;
}

export type InterestStatus = "received" | "sent" | "accepted" | "declined";

export interface InterestItem {
  id: string;
  profileId: string;
  profile: Profile;
  status: InterestStatus;
  sentDate: string;
  message?: string;
  familyConnectRequested?: boolean;
}

export type ShortlistFolder = "Maybe" | "Strong Match" | "Family Review";

export interface ShortlistItem {
  profileId: string;
  profile: Profile;
  folder: ShortlistFolder;
  addedDate: string;
  notes?: string;
  suggestedBy?: string;
}

export interface MessageItem {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isFamilyMessage?: boolean;
  type?: "text" | "voice" | "family_note";
  voiceDuration?: string;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  participantProfession: string;
  participantCity: string;
  isFamilyConnected: boolean;
  unreadCount: number;
  lastMessage: string;
  lastMessageTime: string;
  messages: MessageItem[];
}

export interface NotificationItem {
  id: string;
  type:
    | "interest"
    | "view"
    | "shortlist"
    | "match"
    | "verification"
    | "membership"
    | "family";
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  avatar?: string;
}

export interface FilterState {
  searchQuery: string;
  ageRange: [number, number];
  heightRange: [string, string];
  incomeRanges: string[];
  communities: CommunityType[];
  gotras: GotraType[];
  locations: string[];
  isNRIOnly: boolean;
  diet: DietType[];
  professions: string[];
  educationLevels: string[];
  familyValues: FamilyValuesType[];
  manglik: string[];
  verifiedOnly: boolean;
  premiumOnly: boolean;
  businessOnly: boolean;
  timeline: MarriageTimelineType[];
  sortBy: "recommended" | "recent" | "new" | "compatibility";
}
