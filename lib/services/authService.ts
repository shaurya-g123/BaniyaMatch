export interface UserSession {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: "Male" | "Female";
  community: string;
  gotra: string;
  city: string;
  avatar: string;
  membershipPlan: "free" | "gold" | "platinum" | "diamond";
  role: "user" | "admin";
}

export const defaultUser: UserSession = {
  id: "user-current-riya",
  name: "Riya Agarwal",
  email: "riya.agarwal@example.com",
  phone: "+91 98765 43210",
  gender: "Female",
  community: "Agarwal",
  gotra: "Garg",
  city: "Gurugram",
  avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
  membershipPlan: "platinum",
  role: "user"
};

// TODO: Connect to NextAuth / Supabase / Auth0 / JWT backend
export const authService = {
  getCurrentUser(): UserSession {
    if (typeof window === "undefined") return defaultUser;
    const stored = localStorage.getItem("bm_current_user");
    return stored ? JSON.parse(stored) : defaultUser;
  },

  updateCurrentUser(updates: Partial<UserSession>): UserSession {
    const current = this.getCurrentUser();
    const updated = { ...current, ...updates };
    if (typeof window !== "undefined") {
      localStorage.setItem("bm_current_user", JSON.stringify(updated));
    }
    return updated;
  }
};
