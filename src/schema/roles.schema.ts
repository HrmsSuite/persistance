import { Schema } from "mongoose";
import { IRole } from "../types";
import { ROLE_TYPES } from "../constants";

export const RoleSchema = new Schema<IRole>(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    code: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: null,
    },

    type: {
      type: String,
      enum: ROLE_TYPES,
      required: true,
      default: "CUSTOM",
    },

    permissions: {
      type: [String],
      default: [],
    },

    isDefault: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
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

    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
      default: null,
    },

    deletedBy: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// ----------------------------------------------------
// UNIQUE INDEXES
// ----------------------------------------------------

// Unique role code per company
RoleSchema.index(
  {
    companyId: 1,
    code: 1,
  },
  {
    unique: true,
    partialFilterExpression: {
      isDeleted: false,
    },
  },
);

// Unique role name per company
RoleSchema.index(
  {
    companyId: 1,
    name: 1,
  },
  {
    unique: true,
    partialFilterExpression: {
      isDeleted: false,
    },
  },
);

// ----------------------------------------------------
// QUERY PERFORMANCE INDEXES
// ----------------------------------------------------

// Active roles
RoleSchema.index({
  companyId: 1,
  isActive: 1,
});

// Filter by type
RoleSchema.index({
  companyId: 1,
  type: 1,
});

// Common role listing query
RoleSchema.index({
  companyId: 1,
  isDeleted: 1,
  isActive: 1,
});