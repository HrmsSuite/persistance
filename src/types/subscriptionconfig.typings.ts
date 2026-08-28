export const COMPANY_PLANS = ["FREE", "PRO", "ENTERPRISE"] as const;
export type CompanyPlan = (typeof COMPANY_PLANS)[number];

export interface PlanLimits {
  storageLimitBytes: number;
  maxEmployees: number | null; // null = unlimited
  maxWorkLocations: number | null; // null = unlimited
  maxRoles: number | null; // null = unlimited
  maxRegularizationsPerMonth: number | null; // null = disabled or unlimited (your choice)
  maxGeofencesPerLocation: number; // concrete default per plan
}

export const COMPANY_PLAN_CONFIG: Record<CompanyPlan, PlanLimits> = {
  FREE: {
    storageLimitBytes: 2 * 1024 * 1024 * 1024, // 2 GB
    maxEmployees: 25,
    maxWorkLocations: 2,
    maxRoles: 3, // e.g., Admin, Manager, Employee
    maxRegularizationsPerMonth: 0, // disabled on FREE
    maxGeofencesPerLocation: 1,
  },

  PRO: {
    storageLimitBytes: 50 * 1024 * 1024 * 1024, // 50 GB
    maxEmployees: 250,
    maxWorkLocations: 3,
    maxRoles: 20,
    maxRegularizationsPerMonth: 100,
    maxGeofencesPerLocation: 3,
  },

  ENTERPRISE: {
    storageLimitBytes: 500 * 1024 * 1024 * 1024, // 500 GB
    maxEmployees: null, // unlimited
    maxWorkLocations: null, // unlimited
    maxRoles: null, // unlimited
    maxRegularizationsPerMonth: null, // unlimited
    maxGeofencesPerLocation: 10, // or null if you want truly unlimited
  },
};
