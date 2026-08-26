import type { CompanyPlan } from "./company.typings.js";

export interface CompanySubscription {
  plan: CompanyPlan;

  storageLimitBytes: number;
  storageUsedBytes: number;
  storageUpdatedAt?: Date;

  provider?: "STRIPE" | "RAZORPAY" | "MANUAL";
  providerCustomerId?: string;
  providerSubscriptionId?: string;

  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
  cancelAtPeriodEnd?: boolean;
  cancelledAt?: Date;
}
