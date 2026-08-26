import { model, type Model } from "mongoose";
import { CompanySchema } from "../schema";
import { Company } from "../types";

/**
 * Mongoose model for the root company/tenant entity.
 *
 * @remarks
 * A company is the root tenant boundary for the HRMS platform.
 *
 * Subscription defaults are defined by `CompanySubscriptionSchema`,
 * so newly created companies automatically receive the FREE plan
 * and FREE storage quota.
 */
export const CompanyModel: Model<Company> = model<Company>(
  "Company",
  CompanySchema,
);
