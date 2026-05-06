import { Types } from "mongoose";


// ENUMS

type EventType =
  | "holiday"
  | "leave"
  | "payroll"
  | "review"
  | "training"
  | "meeting"
  | "compliance";

type HolidayCategory =
  | "National Holiday"
  | "Regional"
  | "Company Event"
  | "HR Deadline";

type RecurrenceType = "none" | "daily" | "weekly" | "monthly" | "yearly";

type ApplicableTo = "All" | "Department" | "Individual";

type Visibility = "public" | "private" | "restricted";

type EventStatus = "draft" | "published" | "cancelled";

type LeaveTypeName =
  | "Casual Leave"
  | "Sick Leave"
  | "Earned Leave"
  | "Loss of Pay"
  | "Comp Off"
  | "Maternity Leave"
  | "Paternity Leave";

type PayCycle = "monthly" | "bi-weekly" | "weekly";

type GenderEligibility = "male" | "female" | "all";

type LeaveRequestStatus =
  | "pending"          // just submitted, waiting manager
  | "manager_approved" // manager approved, waiting admin
  | "approved"         // admin approved, leave confirmed
  | "rejected"         // rejected at any level
  | "cancelled"        // employee cancelled before approval
  | "withdrawn";       // employee withdrew after approval

type ApproverRole = "manager" | "admin";


// SHARED INTERFACES


interface Audit {
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedBy: Types.ObjectId;
  updatedAt: Date;
}

interface Scope {
  companyId: Types.ObjectId;
  departmentId?: Types.ObjectId;
  employeeId?: Types.ObjectId;
  visibility: Visibility;
  status: EventStatus;
}

interface Classification {
  category: HolidayCategory;
  recurrence: RecurrenceType;
  recurrenceEndDate?: Date;
  applicableTo: ApplicableTo;
}


// APPROVAL STEP — per level tracking


interface ApprovalStep {
  level: 1 | 2;
  role: ApproverRole;            // level 1 = manager, level 2 = admin
  approverId: Types.ObjectId;    // who actioned it
  status: "pending" | "approved" | "rejected";
  remarks?: string;
  actedAt?: Date;
}

/*
  approvalChain will always have 2 entries:
  [
    { level: 1, role: "manager",  status: "pending"  },
    { level: 2, role: "admin",    status: "pending"  }  ← activated only after level 1 approved
  ]
*/


// 1. CALENDAR EVENT


export interface CalendarEvent {
  eventId: Types.ObjectId;
  eventName: string;
  eventType: EventType;
  startDate: Date;
  endDate: Date;
  isFullDay: boolean;
  startTime?: Date;
  endTime?: Date;
  description?: string;
  classification: Classification;
  scope: Scope;
  audit: Audit;
  isActive: boolean;
}


// 2. LEAVE POLICY


export interface LeavePolicy {
  policyId: Types.ObjectId;
  companyId: Types.ObjectId;
  leaveTypeName: LeaveTypeName;

  // Quota
  maxDaysPerYear: number;
  maxDaysPerMonth?: number;
  minDaysPerApplication: number;

  // Rules
  carryForwardAllowed: boolean;
  maxCarryForwardDays?: number;
  encashmentAllowed: boolean;
  maxEncashmentDays?: number;

  // Eligibility
  genderEligibility: GenderEligibility;
  probationEligible: boolean;
  minServiceDays: number;

  // Notice
  advanceNoticeDays: number;
  backdatedAllowed: boolean;
  maxBackdatedDays?: number;

  audit: Audit;
  isActive: boolean;
}


// 3. LEAVE REQUEST


export interface LeaveRequest {
  requestId: Types.ObjectId;
  companyId: Types.ObjectId;
  employeeId: Types.ObjectId;      // who applied
  managerId: Types.ObjectId;       // pre-filled from employee profile
  leaveTypeName: LeaveTypeName;

  startDate: Date;
  endDate: Date;
  totalDays: number;
  isHalfDay: boolean;
  halfDaySession?: "morning" | "afternoon";

  reason: string;
  attachmentUrl?: string;

  status: LeaveRequestStatus;

  approvalChain: ApprovalStep[];
  /*
    Flow:
    pending          → manager acts
    manager_approved → admin acts  
    approved         → confirmed
    rejected         → stopped at whichever level
  */

  currentLevel: 1 | 2;            // which level is active now

  handoverEmployeeId?: Types.ObjectId;

  audit: Audit;
}

// 4. PAYROLL CALENDAR

export interface PayrollCalendar {
  payrollId: Types.ObjectId;
  companyId: Types.ObjectId;

  payCycle: PayCycle;
  payPeriodLabel: string;           // "April 2025"

  // Key dates
  periodStartDate: Date;
  periodEndDate: Date;
  attendanceCutoffDate: Date;
  leaveCutoffDate: Date;
  payRunDate: Date;
  salaryCreditDate: Date;

  // Statutory
  pfDueDate: Date;
  esiDueDate: Date;
  tdsCutoffDate: Date;
  professionalTaxDate?: Date;

  // Flags
  isProcessed: boolean;
  isLocked: boolean;
  lockedBy?: Types.ObjectId;
  lockedAt?: Date;

  remarks?: string;
  audit: Audit;
}


