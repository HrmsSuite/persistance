// ─── Calendar Event Constants ────────────────────────────────────────────────
// Single source of truth. Import from here in both types.ts and schema.ts.

export const EVENT_TYPES = [
  "holiday",
  "leave",
  "payroll",
  "review",
  "training",
  "meeting",
  "compliance",
] as const;

export const HOLIDAY_CATEGORIES = [
  "National Holiday",
  "Regional",
  "Company Event",
  "HR Deadline",
] as const;

export const RECURRENCE_TYPES = [
  "none",
  "daily",
  "weekly",
  "monthly",
  "yearly",
] as const;

export const APPLICABLE_TO = ["All", "Department", "Individual"] as const;

export const VISIBILITY = ["public", "private", "restricted"] as const;

export const EVENT_STATUS = ["draft", "published", "cancelled"] as const;

export const LEAVE_TYPE_NAMES = [
  "Casual Leave",
  "Sick Leave",
  "Earned Leave",
  "Loss of Pay",
  "Comp Off",
  "Maternity Leave",
  "Paternity Leave",
] as const;

export const GENDER_ELIGIBILITY = [
  "male",
  "female",
  "all",
] as const;

export const APPROVAL_LEVELS = [1, 2,null] as const;

export const LEAVE_STATUS = [
  "pending",
  "manager_approved",
  "approved",
  "rejected",
  "cancelled",
  "withdrawn",
] as const;

export const APPROVAL_ROLES = [
  "manager",
  "admin",
] as const;

export const APPROVAL_STEP_STATUS = [
  "pending",
  "approved",
  "rejected",
] as const;
