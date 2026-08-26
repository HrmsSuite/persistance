import { Types } from "mongoose";

export type CompanyEmailVerificationId = Types.ObjectId;
export type CompanyEmailVerificationCompanyId = Types.ObjectId;

export const COMPANY_EMAIL_VERIFICATION_STATUSES = [
  "PENDING",
  "VERIFIED",
  "REVOKED",
] as const;

export type CompanyEmailVerificationStatus =
  (typeof COMPANY_EMAIL_VERIFICATION_STATUSES)[number];

export interface CompanyEmailVerification {
  _id: CompanyEmailVerificationId;
  companyId: CompanyEmailVerificationCompanyId;

  email: string;
  tokenHash: string;

  status: CompanyEmailVerificationStatus;

  expiresAt: Date;
  verifiedAt?: Date;
  revokedAt?: Date;
  consumedAt?: Date;

  resendCount: number;
  lastSentAt?: Date;

  requestedFromIp?: string;
  requestedUserAgent?: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCompanyEmailVerificationInput {
  companyId: CompanyEmailVerificationCompanyId;
  email: string;
  tokenHash: string;
  expiresAt: Date;
  requestedFromIp?: string;
  requestedUserAgent?: string;
}
