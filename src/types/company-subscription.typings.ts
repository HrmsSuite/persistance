import { CompanyPlan } from "./subscriptionconfig.typings";



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

  // NEW: capacity & feature limits (optional, null = unlimited)
  maxEmployees?: number | null;
  maxWorkLocations?: number | null;
  maxRoles?: number | null;

  // Regularization feature flag / limit
  maxRegularizationsPerMonth?: number | null;

  // Attendance geofence limit per location
  maxGeofencesPerLocation?: number | null;
}