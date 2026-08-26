export interface CompanyStatus {
  isActive: boolean;
  isVerified: boolean;

  emailVerifiedAt?: Date;

  onboardingCompleted: boolean;

  suspendedAt?: Date;
  suspensionReason?: string;
}
