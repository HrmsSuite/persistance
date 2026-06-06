import { Schema, Types } from "mongoose"; 
import { ITeam } from "../types";

export const teamsSchema = new Schema<ITeam>(
  {
    companyId: {
      type: Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,
    },

    departmentId: {
      type: Types.ObjectId,
      ref: "Department",
      required: true,
      index: true,
    },

    reportingManagerId: {
      type: Types.ObjectId,
      ref: "Employee",
      required: true,
      unique: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    memberIds: [
      {
        type: Types.ObjectId,
        ref: "Employee",
      },
    ],

    chatChannelId: {
      type: Types.ObjectId,
      ref: "Channel",
      required: false,
      default: null,
    },

    meta: {
      isDeleted: {
        type: Boolean,
        default: false,
      },

      createdAt: {
        type: Date,
        default: Date.now,
      },

      updatedAt: {
        type: Date,
        default: Date.now,
      },
    },
  },
  {
    versionKey: false,
  },
);

teamsSchema.index({ companyId: 1 });
teamsSchema.index({ departmentId: 1 });
teamsSchema.index({ reportingManagerId: 1 }, { unique: true });
