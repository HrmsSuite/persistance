import { Schema } from "mongoose";
import { IWorkflow } from "../types";
import { APPROVER_TYPES, WORKFLOW_MODULES } from "../constants";

const WorkflowLevelSchema = new Schema(
  {
    level: {
      type: Number,
      required: true,
      min: 1,
    },

    approverType: {
      type: String,
      enum: APPROVER_TYPES,
      required: true,
    },

    roleId: {
      type: Schema.Types.ObjectId,
      ref: "Role",
      default: null,
    },

    approverId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
    },

    isRequired: {
      type: Boolean,
      default: true,
    },
  },
  {
    _id: false,
  },
);

// ------------------------------------
// Workflow Schema
// ------------------------------------

export const WorkflowSchema = new Schema<IWorkflow>(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    module: {
      type: String,
      enum: WORKFLOW_MODULES,
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: null,
    },

    levels: {
      type: [WorkflowLevelSchema],
      required: true,
      default: [],
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
    },

    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
    },

    deletedBy: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
WorkflowSchema.index(
  {
    companyId: 1,
    module: 1,
  },
  {
    unique: true,
    partialFilterExpression: {
      isDeleted: false,
    },
  },
);

WorkflowSchema.index({
  companyId: 1,
  isActive: 1,
});

WorkflowSchema.index({
  companyId: 1,
  isDeleted: 1,
});
