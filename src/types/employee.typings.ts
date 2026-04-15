
type EmploymentType = 'Full-time' | 'Part-time' | 'Contract' | 'Intern';
type EmployeeStatus = 'Active' | 'Inactive' | 'On Leave' | 'Terminated';
type Gender = 'Male' | 'Female' | 'Other';
type PayFrequency = 'Monthly' | 'Bi-weekly';

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
  designation: string;
  department: string;
  employmentType: EmploymentType;
  dateOfJoining: Date;
  reportingManagerId?: string;
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
  name: string;
  url: string;
  uploadedAt: Date;
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
  data: EmployeeData; 

  meta: {
    createdAt: Date;
    updatedAt: Date;
    version: number;         
    isDeleted?: boolean;    
  };
}