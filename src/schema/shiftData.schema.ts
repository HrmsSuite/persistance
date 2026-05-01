import { Schema } from "mongoose";
import { ShiftData } from "../types/shift.typings";

export const ShiftSchema = new Schema<ShiftData>(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,
    },

    data: {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      startTime: {
        type: Date,
        required: true,
      },

      endTime: {
        type: Date,
        required: true,
      },

      workingHours: {
        type: Number,
        required: true,
        min: 0,
      },

      halfDayThreshold: {
        type: Number,
        required: true,
        min: 0,
      },

      weeklyOff: {
        type: [String],
        default: [],
      },

      overtimeEligible: {
        type: Boolean,
        default: false,
      },

      gracePeriodMinutes: {
        type: Number,
        default: 0,
      },

      isNightShift: {
        type: Boolean,
        default: false,
      },

      breakDurationMinutes: {
        type: Number,
        default: 0,
      },

      isActive: {
        type: Boolean,
        default: true,
      },
    },

    meta: {
      version: {
        type: Number,
        default: 1,
      },

      isDeleted: {
        type: Boolean,
        default: false,
      },

      auditTrail: {
        type: [Schema.Types.Mixed],
        default: [],
      },
    },
  },
  {
    timestamps: true,
  }
);

/*  Indexes  */

ShiftSchema.index({ companyId: 1 });

ShiftSchema.index({ "meta.isDeleted": 1 });

ShiftSchema.index({
  companyId: 1,
  "data.name": 1,
});