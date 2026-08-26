import { model, type Model } from "mongoose";
import { CompanyWorkLocationSchema } from "../schema";
import { CompanyWorkLocation } from "../types";

/**
 * Mongoose model for company physical work locations.
 *
 * @remarks
 * Each work location belongs to exactly one company through `companyId`.
 *
 * The schema provides:
 *
 * - GeoJSON 2dsphere indexing
 * - Tenant-scoped location-code uniqueness
 * - At most one primary location per company
 * - Active-location query optimization
 */
export const CompanyWorkLocationModel: Model<CompanyWorkLocation> =
  model<CompanyWorkLocation>("CompanyWorkLocation", CompanyWorkLocationSchema);
