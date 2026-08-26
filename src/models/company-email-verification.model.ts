import { model, type Model } from "mongoose";
import { CompanyEmailVerificationSchema } from "../schema";
import { CompanyEmailVerification } from "../types";

/**
 * Mongoose model for company email verification requests.
 *
 * @remarks
 * Raw verification tokens must never be persisted.
 *
 * The schema stores only the cryptographic token hash and provides
 * a TTL index for automatic cleanup of expired verification records.
 */
export const CompanyEmailVerificationModel: Model<CompanyEmailVerification> =
  model<CompanyEmailVerification>(
    "CompanyEmailVerification",
    CompanyEmailVerificationSchema,
  );
