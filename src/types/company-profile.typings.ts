import type { CompanyLogoMimeType, CompanySize } from "./company.typings.js";

export interface CompanyAddress {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

export interface CompanyLogo {
  storageKey: string;
  originalName: string;
  mimeType: CompanyLogoMimeType;
  sizeBytes: number;
  uploadedAt: Date;
}

export interface CompanyProfile {
  industry?: string;
  companySize?: CompanySize;
  website?: string;
  logo?: CompanyLogo;
  address?: CompanyAddress;
}
