export const PERMISSIONS = {
  EMPLOYEE: {
    CREATE: "employee.create",

    VIEW: "employee.view",

    VIEW_SELF: "employee.view.self",

    VIEW_HIERARCHY: "employee.view.hierarchy",

    UPDATE: "employee.update",

    UPDATE_SELF: "employee.update.self",

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

    VIEW_SELF: "attendance.view.self",

    VIEW_HIERARCHY: "attendance.view.hierarchy",

    UPDATE: "attendance.update",

    UPDATE_SELF: "attendance.update.self",

    UPDATE_HIERARCHY: "attendance.update.hierarchy",

     REGULARIZATION_VIEW_ALL:
      "attendance.regularization.view.all",

    REGULARIZATION_APPROVE: "attendance.regularization.approve",

    REGULARIZATION_SELF: "attendance.regularization.self",
  },

  LEAVE: {
    CREATE: "leave.create",

    VIEW: "leave.view",

    VIEW_SELF: "leave.view.self",

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
