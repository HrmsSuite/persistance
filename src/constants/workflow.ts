export const WORKFLOW_MODULES = [
  "LEAVE_REQUEST",
  "ATTENDANCE_REGULARIZATION",
  "SALARY_REVISION",
  "EXPENSE_CLAIM",
  "LOAN_REQUEST",
  "RESIGNATION",
] as const;

export type WorkflowModule =
  (typeof WORKFLOW_MODULES)[number];

export const APPROVER_TYPES = [
  "REPORTING_MANAGER",
  "ROLE",
  "SPECIFIC_EMPLOYEE",
] as const;

export type ApproverType =
  (typeof APPROVER_TYPES)[number];