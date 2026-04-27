import {Types} from "mongoose"

export type EmploymentType = 'Full-time' | 'Part-time' | 'Contract' | 'Intern';
export type EmployeeStatus = 'Active' | 'Inactive' | 'On Leave' | 'Terminated';
export type Gender = 'Male' | 'Female' | 'Other';
export type PayFrequency = 'Monthly' | 'Bi-weekly';
export type DocumentType =
  | "Aadhaar"
  | "PAN"
  | "Experience Letter"
  | "Conduct Certificate"
  | "Resume"
  | "Offer Letter"
  | "Passport Photo"
  | "Bank Passbook";

export interface EmployeeBasic {
  employeeId: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  gender?: Gender;
  dateOfBirth?: Date;
  email: string;
  phone: string;
  profilePhotoUrl?: string;
}

export interface JobDetails {
  designation: Types.ObjectId;
  department: Types.ObjectId;
  employmentType: EmploymentType;
  dateOfJoining: Date;
  reportingManagerId?: Types.ObjectId;
  workLocation: string;
  employeeStatus: EmployeeStatus;
}

export interface Compensation {
  salary: number;
  payFrequency: PayFrequency;
}

export interface BankDetails {
  bankName: string;
  accountNumber: string;
  ifscCode?: string;
  branch?: string;
   createdAt?: Date;
  updatedAt?: Date;
}

export interface LegalDetails {
  panNumber?: string;
  aadhaarNumber?: string;
  uan?: string; // PF
}

export interface Address {
  currentAddress: string;
  permanentAddress?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface LeaveInfo {
  leaveBalance: number;
  sickLeaveBalance?: number;
  casualLeaveBalance?: number;
}

export interface Document {
  type: DocumentType;
  name: string;
  url: string;
  uploadedAt?: Date;
}

  export interface EmployeeData {
    basic: EmployeeBasic;
    job: JobDetails;
    compensation: Compensation;
    bank?: BankDetails;
    legal?: LegalDetails;
    address: Address;
    leave?: LeaveInfo;
    documents?: Document[];
    
}

export interface Employee {
  companyId: Types.ObjectId;
  data: EmployeeData; 

  meta: {
    version: number;         
    isDeleted?: boolean;    
  };
  createdAt: Date;
    updatedAt: Date;
}