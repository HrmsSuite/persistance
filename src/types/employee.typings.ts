import { Types } from "mongoose";

// ─── Existing Enums (unchanged) ───────────────────────────────────────────────

export type EmploymentType = "Full-time" | "Part-time" | "Contract" | "Intern";
export type EmployeeStatus = "Active" | "Inactive" | "On Leave" | "Terminated";
export type Gender = "Male" | "Female" | "Other";
export type PayFrequency = "Monthly" | "Bi-weekly";
export type DocumentType =
  | "Aadhaar"
  | "PAN"
  | "Experience Letter"
  | "Conduct Certificate"
  | "Resume"
  | "Offer Letter"
  | "Passport Photo"
  | "Bank Passbook";

// ─── New Enums ────────────────────────────────────────────────────────────────

export type AttendanceMode = "Manual" | "Biometric" | "GPS" | "Hybrid";
export type TaxRegime = "Old" | "New";
export type PayslipPreference = "Email" | "Download" | "Both";

// ─── Existing Interfaces (unchanged) ─────────────────────────────────────────

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
  // ── existing ──
  designation: Types.ObjectId;
  department: Types.ObjectId;
  employmentType: EmploymentType;
  dateOfJoining: Date;
  reportingManagerId?: Types.ObjectId;
  workLocation: string;
  employeeStatus: EmployeeStatus;

  // ── new: shift & attendance ──
  shiftId?: Types.ObjectId;
  weeklyOff?: string[];           // e.g. ["Saturday", "Sunday"]
  attendanceMode?: AttendanceMode;

  // ── new: exit & final settlement ──
  dateOfExit?: Date;
  exitReason?: string;
  fullAndFinalSettled?: boolean;
}

export interface Compensation {
  // ── existing ──
  salary: number;
  payFrequency: PayFrequency;

  // ── new: versioned salary structure ──
  salaryStructure?: SalaryStructure;   // current active breakdown
  salaryHistory?: SalaryStructure[];   // past structures for payslip accuracy
}

export interface SalaryStructure {
  basic: number;
  hra: number;
  allowances: number;
  gross: number;
  effectiveFrom: Date;
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

// ─── New Interfaces ───────────────────────────────────────────────────────────

export interface PayrollInfo {
  payrollId?: string;              // unique ID inside payroll system
  payrollGroupId?: Types.ObjectId; // batch / cycle group
  payslipPreference?: PayslipPreference;
}

export interface AttendancePolicy {
  workingHoursPerDay?: number;  // e.g. 8
  halfDayThreshold?: number;    // hours threshold to count as half-day
  overtimeEligible?: boolean;
}

export interface TaxInfo {
  taxRegime?: TaxRegime;
  taxDeclarationSubmitted?: boolean;
}

export interface AuditEntry {
  changedBy?: Types.ObjectId;
  changedAt?: Date;
  changes?: string; // JSON diff or human-readable summary
}

// ─── Root shapes (extended, backward-compatible) ───────────────────────────

export interface EmployeeData {
  // ── existing ──
  basic: EmployeeBasic;
  job: JobDetails;
  compensation: Compensation;
  bank?: BankDetails;
  legal?: LegalDetails;
  address: Address;
  leave?: LeaveInfo;
  documents?: Document[];

  // ── new ──
  payroll?: PayrollInfo;
  attendancePolicy?: AttendancePolicy;
  tax?: TaxInfo;
}

export interface Employee {
  companyId: Types.ObjectId;
  data: EmployeeData;
  meta: {
    version: number;
    isDeleted?: boolean;
    auditTrail?: AuditEntry[]; // new
  };
  createdAt: Date;
  updatedAt: Date;
}