import { Types } from "mongoose";
import {
  EVENT_TYPES,
  HOLIDAY_CATEGORIES,
  RECURRENCE_TYPES,
  APPLICABLE_TO,
  VISIBILITY,
  EVENT_STATUS,
} from "./constant.typings";

//  Sub-type interfaces

export interface IClassification {
  category: (typeof HOLIDAY_CATEGORIES)[number];
  recurrence: (typeof RECURRENCE_TYPES)[number];
  recurrenceEndDate?: Date;
  applicableTo: (typeof APPLICABLE_TO)[number];
  /** Required when applicableTo === "Department" */
  departmentId?: Types.ObjectId;
  /** Required when applicableTo === "Individual" */
  employeeId?: Types.ObjectId;
}

export interface IScope {
  departmentId?: Types.ObjectId;
  employeeId?: Types.ObjectId;
  visibility: (typeof VISIBILITY)[number];
  status: (typeof EVENT_STATUS)[number];
}

export interface IAudit {
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedBy: Types.ObjectId;
  updatedAt: Date;
}

// Root document interface

export interface ICalendarEvent {
  companyId: Types.ObjectId;
  eventName: string;
  eventType: (typeof EVENT_TYPES)[number];
  startDate: Date;
  endDate: Date;
  isFullDay: boolean;
  /** Required when isFullDay === false */
  startTime?: Date;
  /** Required when isFullDay === false */
  endTime?: Date;
  description?: string;
  classification: IClassification;
  scope: IScope;
  audit: IAudit;
  isActive: boolean;
}
