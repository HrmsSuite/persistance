import { Types } from "mongoose";

import type { CompanyProfile } from "./company-profile.typings.js";
import type { CompanyStatus } from "./company-status.typings.js";
import type { CompanySubscription } from "./company-subscription.typings.js";

export type CompanyId = Types.ObjectId;

export const COMPANY_PLANS = ["FREE", "PRO", "ENTERPRISE"] as const;

export type CompanyPlan = (typeof COMPANY_PLANS)[number];

export const COMPANY_PLAN_CONFIG = {
  FREE: {
    storageLimitBytes: 2 * 1024 * 1024 * 1024,
  },

  PRO: {
    storageLimitBytes: 50 * 1024 * 1024 * 1024,
  },

  ENTERPRISE: {
    storageLimitBytes: 500 * 1024 * 1024 * 1024,
  },
} as const satisfies Record<
  CompanyPlan,
  {
    storageLimitBytes: number;
  }
>;

export const COMPANY_SIZES = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "501-1000",
  "1000+",
] as const;

export type CompanySize = (typeof COMPANY_SIZES)[number];

export const COMPANY_LOGO_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export type CompanyLogoMimeType = (typeof COMPANY_LOGO_MIME_TYPES)[number];

export interface CompanyMeta {
  version: number;
  isDeleted: boolean;
  deletedAt?: Date;
}

export interface Company {
  _id: CompanyId;

  name: string;
  email: string;
  passwordHash: string;
  phone?: string;

  profile: CompanyProfile;
  status: CompanyStatus;
  subscription: CompanySubscription;
  meta: CompanyMeta;

  createdAt: Date;
  updatedAt: Date;
}

export type CompanyAccountStatus = Pick<
  CompanyStatus,
  "isActive" | "isVerified" | "onboardingCompleted"
>;

export interface CompanyPublic {
  _id: CompanyId;

  name: string;
  phone?: string;

  profile: CompanyProfile;

  createdAt: Date;
  updatedAt: Date;
}

export interface CompanyAuthenticatedView extends CompanyPublic {
  email: string;
  status: CompanyAccountStatus;

  subscription: Pick<
    CompanySubscription,
    "plan" | "storageLimitBytes" | "storageUsedBytes"
  >;
}

export interface RegisterCompanyInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface UpdateCompanyProfileInput {
  industry?: CompanyProfile["industry"];
  companySize?: CompanyProfile["companySize"];
  website?: CompanyProfile["website"];
  address?: CompanyProfile["address"];
}
