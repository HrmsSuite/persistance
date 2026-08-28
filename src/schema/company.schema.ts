import { Schema } from "mongoose";

import {
  COMPANY_LOGO_MIME_TYPES,
  COMPANY_PLAN_CONFIG,
  COMPANY_PLANS,
  COMPANY_SIZES,
} from "../types/index.js";

const CompanyLogoSchema = new Schema(
  {
    storageKey: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    originalName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },

    mimeType: {
      type: String,
      required: true,
      enum: COMPANY_LOGO_MIME_TYPES,
    },

    sizeBytes: {
      type: Number,
      required: true,
      min: 1,
      max: 5 * 1024 * 1024,
    },

    uploadedAt: {
      type: Date,
      required: true,
    },
  },
  {
    _id: false,
    strict: true,
  },
);

const CompanyAddressSchema = new Schema(
  {
    street: {
      type: String,
      trim: true,
      maxlength: 255,
    },

    city: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    state: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    country: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    postalCode: {
      type: String,
      trim: true,
      maxlength: 20,
    },
  },
  {
    _id: false,
    strict: true,
  },
);

const CompanyProfileSchema = new Schema(
  {
    industry: {
      type: String,
      trim: true,
      maxlength: 150,
    },

    companySize: {
      type: String,
      enum: COMPANY_SIZES,
    },

    website: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    logo: {
      type: CompanyLogoSchema,
      required: false,
    },

    address: {
      type: CompanyAddressSchema,
      required: false,
    },
  },
  {
    _id: false,
    strict: true,
  },
);

const CompanyStatusSchema = new Schema(
  {
    isActive: {
      type: Boolean,
      required: true,
      default: false,
    },

    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },

    emailVerifiedAt: {
      type: Date,
    },

    onboardingCompleted: {
      type: Boolean,
      required: true,
      default: false,
    },

    suspendedAt: {
      type: Date,
    },

    suspensionReason: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
  },
  {
    _id: false,
    strict: true,
  },
);

const CompanySubscriptionSchema = new Schema(
  {
    plan: {
      type: String,
      required: true,
      enum: COMPANY_PLANS,
      default: "FREE",
    },

    storageLimitBytes: {
      type: Number,
      required: true,
      min: 0,
      default: COMPANY_PLAN_CONFIG.FREE.storageLimitBytes,
    },

    storageUsedBytes: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    storageUpdatedAt: {
      type: Date,
    },

    provider: {
      type: String,
      enum: ["STRIPE", "RAZORPAY", "MANUAL"],
    },

    providerCustomerId: {
      type: String,
      trim: true,
      maxlength: 255,
    },

    providerSubscriptionId: {
      type: String,
      trim: true,
      maxlength: 255,
    },

    currentPeriodStart: {
      type: Date,
    },

    currentPeriodEnd: {
      type: Date,
    },

    cancelAtPeriodEnd: {
      type: Boolean,
      default: false,
    },

    cancelledAt: {
      type: Date,
    },

    // NEW: capacity & feature limits
    maxEmployees: {
      type: Number,
      min: 0,
      // optional, can be null for “use plan default / unlimited”
    },

    maxWorkLocations: {
      type: Number,
      min: 0,
    },

    maxRoles: {
      type: Number,
      min: 0,
    },

    maxRegularizationsPerMonth: {
      type: Number,
      min: 0,
    },

    maxGeofencesPerLocation: {
      type: Number,
      min: 1,
    },
  },
  {
    _id: false,
    strict: true,
  },
);

const CompanyMetaSchema = new Schema(
  {
    version: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },

    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },

    deletedAt: {
      type: Date,
    },
  },
  {
    _id: false,
    strict: true,
  },
);

export const CompanySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 200,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 320,
    },

    passwordHash: {
      type: String,
      required: true,
      select: false,
      minlength: 20,
      maxlength: 500,
    },

    phone: {
      type: String,
      trim: true,
      maxlength: 30,
    },

    profile: {
      type: CompanyProfileSchema,
      required: true,
      default: {},
    },

    status: {
      type: CompanyStatusSchema,
      required: true,
      default: {},
    },

    subscription: {
      type: CompanySubscriptionSchema,
      required: true,
      default: {},
    },

    meta: {
      type: CompanyMetaSchema,
      required: true,
      default: {},
    },
  },
  {
    timestamps: true,
    strict: true,
    versionKey: false,
  },
);

CompanySchema.index(
  {
    email: 1,
  },
  {
    unique: true,
    name: "uq_active_company_email",
    partialFilterExpression: {
      "meta.isDeleted": false,
    },
  },
);

CompanySchema.pre("validate", function () {
  if (this.email) {
    this.email = this.email.trim().toLowerCase();
  }
});
