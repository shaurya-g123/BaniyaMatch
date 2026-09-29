export interface VerificationStep {
  id: string;
  name: string;
  description: string;
  status: "verified" | "in_progress" | "pending";
  verifiedDate?: string;
  icon: string;
}

export const verificationService = {
  getVerificationStatus(): VerificationStep[] {
    return [
      {
        id: "mobile",
        name: "Mobile Verification",
        description: "Verified via OTP on Indian/international mobile network.",
        status: "verified",
        verifiedDate: "Sep 15, 2026",
        icon: "phone"
      },
      {
        id: "email",
        name: "Email Address",
        description: "Official work or personal email verified via secure link.",
        status: "verified",
        verifiedDate: "Sep 15, 2026",
        icon: "mail"
      },
      {
        id: "selfie",
        name: "Live Selfie Check",
        description: "Liveness and biometric facial match against profile pictures.",
        status: "verified",
        verifiedDate: "Sep 16, 2026",
        icon: "camera"
      },
      {
        id: "identity",
        name: "Government ID",
        description: "Masked Aadhaar or Passport validated via encrypted portal.",
        status: "verified",
        verifiedDate: "Sep 18, 2026",
        icon: "shield"
      },
      {
        id: "education",
        name: "Higher Education Credentials",
        description: "Degree certificate or university alumni domain check.",
        status: "in_progress",
        icon: "graduation-cap"
      },
      {
        id: "employment",
        name: "Employment & Professional Standing",
        description: "Company email validation, corporate domain, or MCA director verification.",
        status: "pending",
        icon: "briefcase"
      }
    ];
  },

  async submitDocument(stepId: string, _fileName: string): Promise<boolean> {
    // TODO: Connect to secure document upload S3 / Cloud Storage & OCR pipeline
    return new Promise((resolve) => setTimeout(() => resolve(true), 800));
  }
};
