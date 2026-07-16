export const PERMISSION_MODULES = [
  "EMPLOYEE",
  "DEPARTMENT",
  "DESIGNATION",
  "ROLE",
  "WORKFLOW",
  "LEAVE",
  "ATTENDANCE",
  "SHIFT",
  "SALARY",
  "PAYROLL",
  "REPORT",
  "SETTINGS",
] as const;


export type PermissionModule =
  (typeof PERMISSION_MODULES)[number];


export const PERMISSION_ACTIONS = [
  "CREATE",
  "VIEW",
  "UPDATE",
  "DELETE",
  "APPROVE",
  "REJECT",
  "PROCESS",
  "EXPORT",
] as const;


export type PermissionAction =
  (typeof PERMISSION_ACTIONS)[number];