import { Schema } from "mongoose";
import {
  EVENT_TYPES,
  HOLIDAY_CATEGORIES,
  RECURRENCE_TYPES,
  APPLICABLE_TO,
  VISIBILITY,
  EVENT_STATUS,
} from "../types";
import { ICalendarEvent } from "../types";

// ─── Sub-schemas

const ClassificationSchema = new Schema(
  {
    category: {
      type: String,
      enum: HOLIDAY_CATEGORIES,
      required: true,
    },
    recurrence: {
      type: String,
      enum: RECURRENCE_TYPES,
      required: true,
      default: "none",
    },
    recurrenceEndDate: {
      type: Date,
      default: null,
    },
    applicableTo: {
      type: String,
      enum: APPLICABLE_TO,
      required: true,
      default: "All",
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      default: null,
    },
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
    },
  },
  { _id: false },
);

const ScopeSchema = new Schema(
  {
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      default: null,
    },
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
    },
    visibility: {
      type: String,
      enum: VISIBILITY,
      required: true,
      default: "public",
    },
    status: {
      type: String,
      enum: EVENT_STATUS,
      required: true,
      default: "draft",
    },
  },
  { _id: false },
);

const AuditSchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: () => new Date(),
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    updatedAt: {
      type: Date,
      required: true,
      default: () => new Date(),
    },
  },
  { _id: false },
);

// ─── Root schema

export const CalendarEventSchema = new Schema<ICalendarEvent>(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    eventName: {
      type: String,
      required: true,
      trim: true,
    },
    eventType: {
      type: String,
      enum: EVENT_TYPES,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isFullDay: {
      type: Boolean,
      required: true,
      default: true,
    },
    startTime: {
      type: Date,
      default: null,
    },
    endTime: {
      type: Date,
      default: null,
    },
    description: {
      type: String,
      trim: true,
      default: null,
    },
    classification: {
      type: ClassificationSchema,
      required: true,
    },
    scope: {
      type: ScopeSchema,
      required: true,
    },
    audit: {
      type: AuditSchema,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: false, // audit sub-doc handles createdAt / updatedAt + tracks who
    versionKey: false,
  },
);

// ─── Indexes

// Primary dashboard query: company + active + published + date range
CalendarEventSchema.index({
  companyId: 1,
  "scope.status": 1,
  isActive: 1,
  startDate: 1,
  endDate: 1,
});

// Event type filtering within a company
CalendarEventSchema.index({ companyId: 1, eventType: 1 });

// Department-scoped events
CalendarEventSchema.index({ "scope.departmentId": 1, startDate: 1 });

// Individual-scoped events
CalendarEventSchema.index({ "classification.employeeId": 1, startDate: 1 });
