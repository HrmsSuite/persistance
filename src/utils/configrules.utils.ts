import { CompanySubscription } from "../types";
import { COMPANY_PLAN_CONFIG } from "../types/subscriptionconfig.typings";


export interface EffectivePlanLimits {
  storageLimitBytes: number;
  maxEmployees: number | null;
  maxWorkLocations: number | null;
  maxRoles: number | null;
  maxRegularizationsPerMonth: number | null;
  maxGeofencesPerLocation: number;
}

export function getEffectivePlanLimits(
  subscription: CompanySubscription,
): EffectivePlanLimits {
  const planConfig = COMPANY_PLAN_CONFIG[subscription.plan];

  return {
    storageLimitBytes:
      subscription.storageLimitBytes ?? planConfig.storageLimitBytes,

    maxEmployees: subscription.maxEmployees ?? planConfig.maxEmployees,

    maxWorkLocations:
      subscription.maxWorkLocations ?? planConfig.maxWorkLocations,

    maxRoles: subscription.maxRoles ?? planConfig.maxRoles,

    maxRegularizationsPerMonth:
      subscription.maxRegularizationsPerMonth ??
      planConfig.maxRegularizationsPerMonth,

    maxGeofencesPerLocation:
      subscription.maxGeofencesPerLocation ??
      planConfig.maxGeofencesPerLocation,
  };
}
