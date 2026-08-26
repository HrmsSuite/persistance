import { Types } from "mongoose";

export type CompanyWorkLocationId = Types.ObjectId;
export type CompanyWorkLocationCompanyId = Types.ObjectId;

export interface CompanyWorkLocationGeoPoint {
  type: "Point";
  coordinates: [longitude: number, latitude: number];
}

export interface CompanyWorkLocationAddress {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

export interface CompanyWorkLocationGeoFence {
  location: CompanyWorkLocationGeoPoint;
  radiusMeters: number;
  enabled: boolean;
}

export interface CompanyWorkLocationMeta {
  isDeleted: boolean;
  deletedAt?: Date;
}

export interface CompanyWorkLocation {
  _id: CompanyWorkLocationId;
  companyId: CompanyWorkLocationCompanyId;

  name: string;
  code?: string;
  address?: CompanyWorkLocationAddress;

  geoFence: CompanyWorkLocationGeoFence;

  isActive: boolean;
  isPrimary: boolean;
  description?: string;

  meta: CompanyWorkLocationMeta;

  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCompanyWorkLocationInput {
  name: string;
  code?: string;
  address?: CompanyWorkLocationAddress;
  geoFence: CompanyWorkLocationGeoFence;
  isPrimary?: boolean;
  description?: string;
}

export interface UpdateCompanyWorkLocationInput {
  name?: string;
  code?: string;
  address?: CompanyWorkLocationAddress;
  geoFence?: CompanyWorkLocationGeoFence;
  isPrimary?: boolean;
  description?: string;

  isActive?: boolean;
}
