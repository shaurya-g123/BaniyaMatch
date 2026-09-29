import { InterestItem, ShortlistItem, Conversation, NotificationItem, Profile } from "./types";
import { mockProfiles } from "@/data/profiles";

const STORAGE_KEYS = {
  INTERESTS: "bm_interests",
  SHORTLISTS: "bm_shortlists",
  CONVERSATIONS: "bm_conversations",
  NOTIFICATIONS: "bm_notifications",
  USER_ONBOARDING: "bm_user_onboarding",
  USER_SETTINGS: "bm_user_settings",
  USER_MEMBERSHIP: "bm_user_membership",
  FAMILY_MEMBERS: "bm_family_members",
};

// Default initial interests
const initialInterests: InterestItem[] = [
  {
    id: "int-1",
    profileId: "bm-1000",
    profile: mockProfiles[0],
    status: "received",
    sentDate: "Today, 10:30 AM",
    message: "Namaste. I came across your profile and found our common family values in Delhi NCR very encouraging."
  },
  {
    id: "int-2",
    profileId: "bm-1002",
    profile: mockProfiles[2],
    status: "received",
    sentDate: "Yesterday",
    message: "Hello. Our parents are keen to know if you would be open to a casual introductory discussion."
  },
  {
    id: "int-3",
    profileId: "bm-1052",
    profile: mockProfiles[52],
    status: "sent",
    sentDate: "Sep 26, 2026",
    message: "Warm regards. Impressed by your dedication to both modern venture work and family roots."
  },
  {
    id: "int-4",
    profileId: "bm-1055",
    profile: mockProfiles[55],
    status: "accepted",
    sentDate: "Sep 22, 2026",
    message: "Interest accepted. Direct messaging is now unlocked."
  }
];

// Default initial shortlists
const initialShortlists: ShortlistItem[] = [
  {
    profileId: "bm-1001",
    profile: mockProfiles[1],
    folder: "Strong Match",
    addedDate: "Sep 28, 2026",
    notes: "Both aligned on vegetarian lifestyle and living in Gurugram."
  },
  {
    profileId: "bm-1003",
    profile: mockProfiles[3],
    folder: "Family Review",
    addedDate: "Sep 27, 2026",
    suggestedBy: "Mother",
    notes: "Maa liked the Agarwal Garg lineage and family background."
  },
  {
    profileId: "bm-1005",
    profile: mockProfiles[5],
    folder: "Maybe",
    addedDate: "Sep 25, 2026",
    notes: "Profile looks great; need to check relocation flexibility."
  }
];

// Default initial conversations
const initialConversations: Conversation[] = [
  {
    id: "conv-1",
    participantId: "bm-1000",
    participantName: mockProfiles[0].name,
    participantAvatar: mockProfiles[0].photos[0],
    participantProfession: mockProfiles[0].profession,
    participantCity: mockProfiles[0].city,
    isFamilyConnected: true,
    unreadCount: 1,
    lastMessage: "Looking forward to our conversation this Sunday afternoon.",
    lastMessageTime: "2:45 PM",
    messages: [
      {
        id: "m-1",
        senderId: "bm-1000",
        senderName: mockProfiles[0].name,
        text: "Namaste! Thank you for connecting. I saw that you also enjoy running and weekend treks around Delhi.",
        timestamp: "Yesterday, 4:15 PM"
      },
      {
        id: "m-2",
        senderId: "current-user",
        senderName: "Riya",
        text: "Namaste! Yes, morning runs around Lodhi Garden are my favorite weekend routine. How long have you been in Gurugram?",
        timestamp: "Yesterday, 5:30 PM"
      },
      {
        id: "m-3",
        senderId: "bm-1000",
        senderName: mockProfiles[0].name,
        text: "About 4 years now since graduating from IIM-A. By the way, our parents also had a brief respectful word yesterday.",
        timestamp: "Today, 11:20 AM"
      },
      {
        id: "m-4",
        senderId: "bm-1000",
        senderName: mockProfiles[0].name,
        text: "Looking forward to our conversation this Sunday afternoon.",
        timestamp: "2:45 PM"
      }
    ]
  },
  {
    id: "conv-2",
    participantId: "bm-1055",
    participantName: mockProfiles[55].name,
    participantAvatar: mockProfiles[55].photos[0],
    participantProfession: mockProfiles[55].profession,
    participantCity: mockProfiles[55].city,
    isFamilyConnected: false,
    unreadCount: 0,
    lastMessage: "That sounds wonderful. Let us plan a coffee meetup next week.",
    lastMessageTime: "Yesterday",
    messages: [
      {
        id: "m-21",
        senderId: "current-user",
        senderName: "Riya",
        text: "Hi Kunal, glad to connect here. How is the expansion going?",
        timestamp: "Sep 26, 3:00 PM"
      },
      {
        id: "m-22",
        senderId: "bm-1055",
        senderName: mockProfiles[55].name,
        text: "It is exciting and keeping us busy! That sounds wonderful. Let us plan a coffee meetup next week.",
        timestamp: "Yesterday, 6:00 PM"
      }
    ]
  }
];

// Default initial notifications
const initialNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    type: "interest",
    title: "New Interest Received",
    description: `${mockProfiles[0].name} sent you an interest. 94% overall compatibility.`,
    timestamp: "10 minutes ago",
    read: false,
    actionUrl: "/interests",
    avatar: mockProfiles[0].photos[0]
  },
  {
    id: "notif-2",
    type: "family",
    title: "Family Connect Requested",
    description: "Mother of Kunal Goyal requested a respectful Family Connect call.",
    timestamp: "2 hours ago",
    read: false,
    actionUrl: "/family",
    avatar: mockProfiles[55].photos[0]
  },
  {
    id: "notif-3",
    type: "view",
    title: "Profile Viewed",
    description: "Your profile was viewed by 14 verified matches today.",
    timestamp: "4 hours ago",
    read: true,
    actionUrl: "/matches"
  },
  {
    id: "notif-4",
    type: "verification",
    title: "Degree Verification Approved",
    description: "Your degree credentials from IIM Ahmedabad have been confirmed.",
    timestamp: "1 day ago",
    read: true,
    actionUrl: "/verification"
  }
];

export const getStoredInterests = (): InterestItem[] => {
  if (typeof window === "undefined") return initialInterests;
  const data = localStorage.getItem(STORAGE_KEYS.INTERESTS);
  return data ? JSON.parse(data) : initialInterests;
};

export const saveStoredInterests = (interests: InterestItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.INTERESTS, JSON.stringify(interests));
  }
};

export const getStoredShortlists = (): ShortlistItem[] => {
  if (typeof window === "undefined") return initialShortlists;
  const data = localStorage.getItem(STORAGE_KEYS.SHORTLISTS);
  return data ? JSON.parse(data) : initialShortlists;
};

export const saveStoredShortlists = (shortlists: ShortlistItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.SHORTLISTS, JSON.stringify(shortlists));
  }
};

export const getStoredConversations = (): Conversation[] => {
  if (typeof window === "undefined") return initialConversations;
  const data = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
  return data ? JSON.parse(data) : initialConversations;
};

export const saveStoredConversations = (conversations: Conversation[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(conversations));
  }
};

export const getStoredNotifications = (): NotificationItem[] => {
  if (typeof window === "undefined") return initialNotifications;
  const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
  return data ? JSON.parse(data) : initialNotifications;
};

export const saveStoredNotifications = (notifications: NotificationItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }
};
