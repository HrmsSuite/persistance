export const PERMISSIONS = {
  EMPLOYEE: {
    CREATE: "employee.create",
    VIEW: "employee.view",
    UPDATE: "employee.update",
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
    REGULARIZATION_APPROVE: "attendance.regularization.approve",
    REGULARIZATION_EMPLOYEE: "attendance.regularization.employee",
  },

  LEAVE: {
    CREATE: "leave.create",
    VIEW: "leave.view",
    EMPLOYEE_VIEW: "leave.employee.view",
    APPROVE: "leave.approve",
    REJECT: "leave.reject",
  },

  PAYROLL: {
    VIEW: "payroll.view",
    PROCESS: "payroll.process",
  },
} as const;
