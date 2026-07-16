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

  LEAVE: {
    CREATE: "leave.create",
    VIEW: "leave.view",
    APPROVE: "leave.approve",
    REJECT: "leave.reject",
  },

  ATTENDANCE: {
    VIEW: "attendance.view",
    REGULARIZATION_APPROVE:
      "attendance.regularization.approve",
  },

  PAYROLL: {
    VIEW: "payroll.view",
    PROCESS: "payroll.process",
  },
} as const;