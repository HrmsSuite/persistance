import { Schema } from "mongoose";
import {
  SalaryComponent,
  SalaryComponentType,
  SalaryCalculationType,
  SalaryCalculationBase,
  SalaryComponentInclusion,
  SalaryTaxability,
  SalaryComponentStatus,
} from "../types/salaryComponent.types";

const salaryComponentTypeEnum: SalaryComponentType[] = [
  "EARNING",
  "DEDUCTION",
  "REIMBURSEMENT",
  "BENEFIT",
  "CONTRIBUTION",
  "TAX",
];

const salaryCalculationTypeEnum: SalaryCalculationType[] = [
  "FIXED",
  "PERCENTAGE",
  "FORMULA",
  "UNIT_BASED",
  "ATTENDANCE_BASED",
  "MANUAL",
];

const salaryCalculationBaseEnum: SalaryCalculationBase[] = [
  "BASIC",
  "GROSS",
  "CTC",
  "NET",
  "COMPONENT",
  "CUSTOM",
];

const salaryComponentInclusionEnum: SalaryComponentInclusion[] = [
  "GROSS",
  "CTC",
  "NET",
  "NONE",
];

const salaryTaxabilityEnum: SalaryTaxability[] = [
  "TAXABLE",
  "NON_TAXABLE",
  "PARTIALLY_TAXABLE",
];

const salaryComponentStatusEnum: SalaryComponentStatus[] = [
  "DRAFT",
  "ACTIVE",
  "INACTIVE",
  "ARCHIVED",
];

const SalaryUnitConfigSchema = new Schema(
  {
    unit: {
      type: String,
      enum: ["HOUR", "DAY", "KM", "MEAL", "SHIFT", "ITEM", "CUSTOM"],
      required: true,
    },

    rate: {
      type: Number,
      min: 0,
      required: true,
    },

    customUnitName: {
      type: String,
      trim: true,
    },

    minimumUnits: {
      type: Number,
      min: 0,
    },

    maximumUnits: {
      type: Number,
      min: 0,
    },
  },
  { _id: false },
);

export const SalaryComponentSchema = new Schema<SalaryComponent>(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    code: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    type: {
      type: String,
      enum: salaryComponentTypeEnum,
      required: true,
    },

    calculationType: {
      type: String,
      enum: salaryCalculationTypeEnum,
      required: true,
    },

    calculationBase: {
      type: String,
      enum: salaryCalculationBaseEnum,
    },

    baseComponentId: {
      type: Schema.Types.ObjectId,
    },

    fixedAmount: {
      type: Number,
      min: 0,
    },

    percentage: {
      type: Number,
      min: 0,
      max: 100,
    },

    formula: {
      type: String,
      trim: true,
    },

    unitConfig: {
      type: SalaryUnitConfigSchema,
    },

    inclusion: {
      type: String,
      enum: salaryComponentInclusionEnum,
      required: true,
    },

    taxability: {
      type: String,
      enum: salaryTaxabilityEnum,
      required: true,
    },

    isStatutory: {
      type: Boolean,
      default: false,
    },

    statutoryConfig: {
      type: Schema.Types.Mixed,
    },

    allowManualOverride: {
      type: Boolean,
      default: false,
    },

    isConfigurable: {
      type: Boolean,
      default: true,
    },

    status: {
      type: String,
      enum: salaryComponentStatusEnum,
      default: "DRAFT",
      index: true,
    },

    displayOrder: {
      type: Number,
      min: 0,
      default: 0,
    },

    metadata: {
      type: Schema.Types.Mixed,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
    },

    updatedBy: {
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  },
);

/**
 * A salary component code must be unique
 * within a company, not globally.
 *
 * Example:
 *
 * Company A → BASIC
 * Company B → BASIC
 *
 * Both are valid.
 */
SalaryComponentSchema.index({ companyId: 1, code: 1 }, { unique: true });
