import { Schema } from "mongoose";

import { SalaryCalculationBase } from "../types/salaryComponent.types";
import {
  SalaryPayFrequency,
  SalaryStructure,
  SalaryStructureComponent,
  SalaryStructureStatus,
} from "../types";

const salaryStructureStatusEnum: SalaryStructureStatus[] = [
  "DRAFT",
  "ACTIVE",
  "INACTIVE",
  "ARCHIVED",
];

const salaryPayFrequencyEnum: SalaryPayFrequency[] = [
  "MONTHLY",
  "WEEKLY",
  "BI_WEEKLY",
  "QUARTERLY",
  "HALF_YEARLY",
  "YEARLY",
];

const salaryStructureComponentSchema = new Schema<SalaryStructureComponent>(
  {
    componentId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    displayOrder: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    isRequired: {
      type: Boolean,
      default: false,
    },

    allowOverride: {
      type: Boolean,
      default: false,
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

    formula: {
      type: String,
      trim: true,
    },

    minimumAmount: {
      type: Number,
      min: 0,
    },

    maximumAmount: {
      type: Number,
      min: 0,
    },

    metadata: {
      type: Schema.Types.Mixed,
    },
  },
  {
    _id: false,
  },
);

export const SalaryStructureSchema = new Schema<SalaryStructure>(
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

    currency: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      default: "INR",
    },

    description: {
      type: String,
      trim: true,
    },

    category: {
      type: String,
      trim: true,
    },

    payFrequency: {
      type: String,
      enum: salaryPayFrequencyEnum,
      required: true,
    },

    components: {
      type: [salaryStructureComponentSchema],
      default: [],
    },

    status: {
      type: String,
      enum: salaryStructureStatusEnum,
      default: "DRAFT",
      index: true,
    },

    version: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },

    effectiveFrom: {
      type: Date,
      required: true,
    },

    effectiveTo: {
      type: Date,
      default: null,
    },

    isDefault: {
      type: Boolean,
      default: false,
    },

    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
      index: true,
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
 * A structure code is unique only inside
 * its own company.
 *
 * Company A:
 *   ENGINEER
 *
 * Company B:
 *   ENGINEER
 *
 * Both are valid.
 */
SalaryStructureSchema.index(
  {
    companyId: 1,
    code: 1,
  },
  {
    unique: true,
    partialFilterExpression: { isDeleted: false },
  },
);

/**
 * Useful for finding active/default structures
 * for a company.
 */
SalaryStructureSchema.index({
  companyId: 1,
  status: 1,
  effectiveFrom: -1,
});

/**
 * Useful when checking structures by date.
 */
SalaryStructureSchema.index({
  companyId: 1,
  effectiveFrom: 1,
  effectiveTo: 1,
});
