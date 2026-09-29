import { mockProfiles } from "@/data/profiles";
import { Profile } from "@/lib/types";

// TODO: Connect to backend matching engine / ML recommendation pipeline
export const matchService = {
  async getMatchOfTheDay(): Promise<Profile> {
    // Return high compatibility curated match
    return Promise.resolve(mockProfiles[0]);
  },

  async getRecommendedMatches(): Promise<Profile[]> {
    return Promise.resolve(mockProfiles.slice(1, 7));
  },

  async getRecentlyActive(): Promise<Profile[]> {
    return Promise.resolve(mockProfiles.slice(7, 13));
  },

  async getNewMatches(): Promise<Profile[]> {
    return Promise.resolve(mockProfiles.filter((p) => p.isNew).slice(0, 6));
  },

  async getFamilyCompatible(): Promise<Profile[]> {
    return Promise.resolve(
      [...mockProfiles]
        .sort((a, b) => b.compatibility.family - a.compatibility.family)
        .slice(0, 6)
    );
  },

  async getHoroscopeCompatible(): Promise<Profile[]> {
    return Promise.resolve(
      mockProfiles.filter((p) => p.horoscope.manglik === "Non-Manglik").slice(0, 6)
    );
  },

  async getNRIProfessionals(): Promise<Profile[]> {
    return Promise.resolve(mockProfiles.filter((p) => p.isNRI).slice(0, 6));
  },

  async getBusinessFamilies(): Promise<Profile[]> {
    return Promise.resolve(mockProfiles.filter((p) => p.isBusiness).slice(0, 6));
  }
};
