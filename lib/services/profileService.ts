import { mockProfiles } from "@/data/profiles";
import { Profile, FilterState } from "@/lib/types";
import { getStoredShortlists, saveStoredShortlists, getStoredInterests, saveStoredInterests } from "@/lib/mockStorage";

// TODO: Replace with real REST/GraphQL API endpoint (e.g. GET /api/v1/profiles)
export const profileService = {
  async getAllProfiles(): Promise<Profile[]> {
    return Promise.resolve(mockProfiles);
  },

  async getProfileById(id: string): Promise<Profile | null> {
    const profile = mockProfiles.find((p) => p.id === id);
    return Promise.resolve(profile || null);
  },

  async filterProfiles(filters: FilterState): Promise<Profile[]> {
    let result = [...mockProfiles];

    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.profession.toLowerCase().includes(q) ||
          p.community.toLowerCase().includes(q) ||
          p.gotra.toLowerCase().includes(q)
      );
    }

    // Age
    result = result.filter((p) => p.age >= filters.ageRange[0] && p.age <= filters.ageRange[1]);

    // NRI
    if (filters.isNRIOnly) {
      result = result.filter((p) => p.isNRI);
    }

    // Communities
    if (filters.communities.length > 0) {
      result = result.filter((p) => filters.communities.includes(p.community));
    }

    // Gotras
    if (filters.gotras.length > 0) {
      result = result.filter((p) => filters.gotras.includes(p.gotra));
    }

    // Diet
    if (filters.diet.length > 0) {
      result = result.filter((p) => filters.diet.includes(p.diet));
    }

    // Verified only
    if (filters.verifiedOnly) {
      result = result.filter((p) => p.isVerified);
    }

    // Premium only
    if (filters.premiumOnly) {
      result = result.filter((p) => p.isPremium);
    }

    // Business only
    if (filters.businessOnly) {
      result = result.filter((p) => p.isBusiness);
    }

    // Sort
    if (filters.sortBy === "compatibility") {
      result.sort((a, b) => b.compatibility.overall - a.compatibility.overall);
    } else if (filters.sortBy === "new") {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return Promise.resolve(result);
  },

  async shortlistProfile(profile: Profile, folder: "Maybe" | "Strong Match" | "Family Review" = "Strong Match"): Promise<void> {
    const shortlists = getStoredShortlists();
    const existingIndex = shortlists.findIndex((s) => s.profileId === profile.id);
    if (existingIndex >= 0) {
      shortlists[existingIndex].folder = folder;
    } else {
      shortlists.push({
        profileId: profile.id,
        profile: profile,
        folder: folder,
        addedDate: "Just now"
      });
    }
    saveStoredShortlists(shortlists);
  },

  async removeShortlist(profileId: string): Promise<void> {
    const shortlists = getStoredShortlists().filter((s) => s.profileId !== profileId);
    saveStoredShortlists(shortlists);
  },

  async sendInterest(profile: Profile, message?: string): Promise<void> {
    const interests = getStoredInterests();
    const existing = interests.find((i) => i.profileId === profile.id);
    if (!existing) {
      interests.push({
        id: `int-${Date.now()}`,
        profileId: profile.id,
        profile: profile,
        status: "sent",
        sentDate: "Just now",
        message: message || "Warm regards. I found your profile very interesting and would love to connect."
      });
      saveStoredInterests(interests);
    }
  }
};
