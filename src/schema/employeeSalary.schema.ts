import { Schema } from "mongoose";

import {
  EmployeeSalary,
  EmployeeSalaryComponent,
  EmployeeSalaryTotals,
  EmployeeSalaryStatus,
  EmployeeSalarySource,
} from "../types/employeeSalary.types";
 

import {
  SalaryCalculationBase,
} from "../types/salaryComponent.types";
import { SalaryPayFrequency } from "../types";

/**
 * Employee salary lifecycle.
 */
const employeeSalaryStatusEnum: EmployeeSalaryStatus[] = [
  "DRAFT",
  "PENDING_APPROVAL",
  "APPROVED",
  "ACTIVE",
  "INACTIVE",
  "REJECTED",
  "CANCELLED",
  "ARCHIVED",
];

/**
 * How the salary assignment originated.
 */
const employeeSalarySourceEnum: EmployeeSalarySource[] = [
  "STRUCTURE",
  "CUSTOM",
  "PROMOTION",
  "REVISION",
  "TRANSFER",
  "JOINING",
  "ADJUSTMENT",
  "SYSTEM",
];

/**
 * Salary payment frequency.
 */
const salaryPayFrequencyEnum: SalaryPayFrequency[] = [
  "MONTHLY",
  "WEEKLY",
  "BI_WEEKLY",
  "QUARTERLY",
  "HALF_YEARLY",
  "YEARLY",
];

/**
 * Employee-specific salary component.
 *
 * This is a snapshot of the component assignment/value
 * at the time the salary record is created.
 */
const employeeSalaryComponentSchema =
  new Schema<EmployeeSalaryComponent>(
    {
      componentId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
      },

      amount: {
        type: Number,
        required: true,
        min: 0,
      },

      percentage: {
        type: Number,
        min: 0,
        max: 100,
      },

      calculationBase: {
        type: String,
        enum: [
          "BASIC",
          "GROSS",
          "CTC",
          "NET",
          "COMPONENT",
          "CUSTOM",
        ] satisfies SalaryCalculationBase[],
      },

      isOverridden: {
        type: Boolean,
        default: false,
      },

      overrideReason: {
        type: String,
        trim: true,
      },

      displayOrder: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
      },

      metadata: {
        type: Schema.Types.Mixed,
      },
    },
    {
      _id: false,
    },
  );

/**
 * Salary totals snapshot.
 */
const employeeSalaryTotalsSchema =
  new Schema<EmployeeSalaryTotals>(
    {
      gross: {
        type: Number,
        required: true,
        min: 0,
      },

      totalDeductions: {
        type: Number,
        required: true,
        min: 0,
      },

      totalEmployerContributions: {
        type: Number,
        required: true,
        min: 0,
      },

      ctc: {
        type: Number,
        required: true,
        min: 0,
      },

      net: {
        type: Number,
        required: true,
        min: 0,
      },
    },
    {
      _id: false,
    },
  );

/**
 * Employee Salary Schema.
 */
export const EmployeeSalarySchema =
  new Schema<EmployeeSalary>(
    {
      /**
       * Multi-tenant company.
       */
      companyId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
      },

      /**
       * Employee receiving this salary.
       */
      employeeId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
      },

      /**
       * Salary structure used as the base.
       */
      salaryStructureId: {
        type: Schema.Types.ObjectId,
        index: true,
      },

      /**
       * Structure version used for this salary.
       */
      salaryStructureVersion: {
        type: Number,
        min: 1,
      },

      /**
       * Payment frequency.
       */
      payFrequency: {
        type: String,
        enum: salaryPayFrequencyEnum,
        required: true,
      },

      currency: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
        default: "INR",
      },

      /**
       * Actual employee salary components.
       */
      components: {
        type: [employeeSalaryComponentSchema],
        default: [],
      },

      /**
       * Salary totals snapshot.
       */
      totals: {
        type: employeeSalaryTotalsSchema,
        required: true,
      },

      /**
       * Salary validity period.
       */
      effectiveFrom: {
        type: Date,
        required: true,
      },

      effectiveTo: {
        type: Date,
        default: null,
      },

      /**
       * Current salary status.
       */
      status: {
        type: String,
        enum: employeeSalaryStatusEnum,
        required: true,
        default: "DRAFT",
        index: true,
      },

      /**
       * Salary creation source.
       */
      source: {
        type: String,
        enum: employeeSalarySourceEnum,
        required: true,
      },

      /**
       * Employee salary revision number.
       */
      revisionNumber: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
      },

      /**
       * Reason for revision.
       */
      revisionReason: {
        type: String,
        trim: true,
      },

      /**
       * Approval information.
       */
      approvedBy: {
        type: Schema.Types.ObjectId,
      },

      approvedAt: {
        type: Date,
      },

      /**
       * Rejection information.
       */
      rejectedBy: {
        type: Schema.Types.ObjectId,
      },

      rejectedAt: {
        type: Date,
      },

      rejectionReason: {
        type: String,
        trim: true,
      },

      /**
       * Audit user references.
       */
      createdBy: {
        type: Schema.Types.ObjectId,
      },

      updatedBy: {
        type: Schema.Types.ObjectId,
      },

      /**
       * Company-specific extension data.
       */
      metadata: {
        type: Schema.Types.Mixed,
      },
    },
    {
      timestamps: true,
    },
  );

/**
 * Prevent duplicate revision numbers
 * for the same employee/company.
 */
EmployeeSalarySchema.index(
  {
    companyId: 1,
    employeeId: 1,
    revisionNumber: 1,
  },
  {
    unique: true,
  },
);

/**
 * Useful for finding an employee's
 * salary history.
 */
EmployeeSalarySchema.index({
  companyId: 1,
  employeeId: 1,
  effectiveFrom: -1,
});

/**
 * Useful for finding the active salary.
 */
EmployeeSalarySchema.index({
  companyId: 1,
  employeeId: 1,
  status: 1,
  effectiveFrom: -1,
});

/**
 * Useful for structure-based queries.
 */
EmployeeSalarySchema.index({
  companyId: 1,
  salaryStructureId: 1,
});