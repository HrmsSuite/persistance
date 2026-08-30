import { Types } from "mongoose";

//Enums

export type EmploymentType = "Full-time" | "Part-time" | "Contract" | "Intern";
export type EmployeeStatus = "Active" | "Inactive" | "On Leave" | "Terminated";
export type Gender = "Male" | "Female" | "Other";
export type DocumentType =
  | "Aadhaar"
  | "PAN"
  | "Experience Letter"
  | "Conduct Certificate"
  | "Resume"
  | "Offer Letter"
  | "Passport Photo"
  | "Bank Passbook";

export type AttendanceMode = "Manual" | "Biometric" | "GPS" | "Hybrid";
export type TaxRegime = "Old" | "New";
export type PayslipPreference = "Email" | "Download" | "Both";

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
  roleIds?: Types.ObjectId[];
  dateOfJoining: Date;
  reportingManagerId?: Types.ObjectId;
  workLocation: string;
  workLocationId: Types.ObjectId;
  employeeStatus: EmployeeStatus;
  shiftId?: Types.ObjectId;
  attendanceMode?: AttendanceMode;
  leavepolicy: Types.ObjectId[];
  dateOfExit?: Date;
  exitReason?: string;
  fullAndFinalSettled?: boolean;
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
  uan?: string;
}

export interface Address {
  currentAddress: string;
  permanentAddress?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface Document {
  type: DocumentType;
  name: string;
  url: string;
  uploadedAt?: Date;
}

export interface PayrollInfo {
  payrollId?: string; // unique ID inside payroll system
  payrollGroupId?: Types.ObjectId; // batch / cycle group
  payslipPreference?: PayslipPreference;
}

export interface TaxInfo {
  taxRegime?: TaxRegime;
  taxDeclarationSubmitted?: boolean;
}

export interface AuditEntry {
  action:
    | "created"
    | "updated"
    | "deleted"
    | "reporting_manager_changed"
    | "roles_changed";
  changedBy?: Types.ObjectId;
  changedAt?: Date;
  changes?: string;
  changedFields?: string[];
  diff?: any;
  before?: any;
  after?: any;
}

export interface EmployeeData {
  basic: EmployeeBasic;
  job: JobDetails;
  bank?: BankDetails;
  legal?: LegalDetails;
  address: Address;
  documents?: Document[];
  payroll?: PayrollInfo;
  tax?: TaxInfo;
}

export interface Employee {
  companyId: Types.ObjectId;
  data: EmployeeData;
  meta: {
    version: number;
    isDeleted?: boolean;
    auditTrail?: AuditEntry[];
  };
  createdAt: Date;
  updatedAt: Date;
}
