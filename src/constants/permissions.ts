export const PERMISSIONS = {
  EMPLOYEE: {
    CREATE: "employee.create",
    VIEW: "employee.view",
    VIEW_HIERARCHY: "employee.view.hierarchy",
    UPDATE: "employee.update",
    UPDATE_HIERARCHY: "employee.update.hierarchy",
    DELETE: "employee.delete",
  },

  DEPARTMENT: {
    CREATE: "department.create",
    VIEW: "department.view",
    UPDATE: "department.update",
    DELETE: "department.delete",
  },

  DESIGNATION: {
    CREATE: "designation.create",
    VIEW: "designation.view",
    UPDATE: "designation.update",
    DELETE: "designation.delete",
  },

  ROLE: {
    CREATE: "role.create",
    VIEW: "role.view",
    UPDATE: "role.update",
    DELETE: "role.delete",
  },

  WORKFLOW: {
    CREATE: "workflow.create",
    VIEW: "workflow.view",
    UPDATE: "workflow.update",
    DELETE: "workflow.delete",
  },

  ATTENDANCE: {
    CREATE: "attendance.create",
    VIEW: "attendance.view",
    UPDATE: "attendance.update",
    EMPLOYEE_VIEW: "attendance.employee.view",
    VIEW_HIERARCHY: "attendance.view.hierarchy",
    REGULARIZATION_APPROVE: "attendance.regularization.approve",
    REGULARIZATION_EMPLOYEE: "attendance.regularization.employee",
  },

  LEAVE: {
    CREATE: "leave.create",
    VIEW: "leave.view",
    EMPLOYEE_VIEW: "leave.employee.view",
    VIEW_HIERARCHY: "leave.view.hierarchy",
    APPROVE: "leave.approve",
    APPROVE_HIERARCHY: "leave.approve.hierarchy",
    REJECT: "leave.reject",
  },

  PAYROLL: {
    VIEW: "payroll.view",
    PROCESS: "payroll.process",
  },
} as const;