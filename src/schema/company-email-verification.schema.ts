import { Schema } from "mongoose";

import { COMPANY_EMAIL_VERIFICATION_STATUSES } from "../types/index.js";

import type { CompanyEmailVerification } from "../types/index.js";

export const CompanyEmailVerificationSchema =
  new Schema<CompanyEmailVerification>(
    {
      companyId: {
        type: Schema.Types.ObjectId,
        required: true,
      },

      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        maxlength: 320,
      },

      tokenHash: {
        type: String,
        required: true,
        select: false,
        minlength: 32,
        maxlength: 255,
      },

      status: {
        type: String,
        required: true,
        enum: COMPANY_EMAIL_VERIFICATION_STATUSES,
        default: "PENDING",
      },

      expiresAt: {
        type: Date,
        required: true,
      },

      verifiedAt: {
        type: Date,
      },

      revokedAt: {
        type: Date,
      },

      consumedAt: {
        type: Date,
      },

      resendCount: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 20,
      },

      lastSentAt: {
        type: Date,
      },

      requestedFromIp: {
        type: String,
        trim: true,
        maxlength: 100,
      },

      requestedUserAgent: {
        type: String,
        trim: true,
        maxlength: 1000,
      },
    },
    {
      timestamps: true,
      strict: true,
      versionKey: false,
    },
  );

CompanyEmailVerificationSchema.index(
  {
    expiresAt: 1,
  },
  {
    expireAfterSeconds: 0,
    name: "ttl_company_email_verification",
  },
);

CompanyEmailVerificationSchema.index(
  {
    companyId: 1,
  },
  {
    unique: true,
    name: "uq_pending_company_verification",
    partialFilterExpression: {
      status: "PENDING",
    },
  },
);

CompanyEmailVerificationSchema.index(
  {
    tokenHash: 1,
  },
  {
    unique: true,
    name: "uq_company_verification_token_hash",
  },
);

CompanyEmailVerificationSchema.index(
  {
    companyId: 1,
    status: 1,
    expiresAt: 1,
  },
  {
    name: "idx_company_verification_status_expiry",
  },
);

CompanyEmailVerificationSchema.pre("validate", function () {
  if (this.email) {
    this.email = this.email.trim().toLowerCase();
  }
});
