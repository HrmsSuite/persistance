import { Schema, Types } from "mongoose";
import { LeaveBalance } from "../types";

const LeavePolicySchema = new Schema(
    {
        policyId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "LeavePolicy",
        },

        total: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },

        balance: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },

        used: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },
    },
    {
        _id: false, // prevents extra ids in leave array
    }
);

export const LeaveBalanceSchema = new Schema<LeaveBalance>(
    {
        companyId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Company",
            index: true,
        },

        employeeId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Employee",
            index: true,
        },

        leave: {
            type: [LeavePolicySchema],
            default: [],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

/**
 * One leave balance document per employee per company
 */
LeaveBalanceSchema.index(
    { companyId: 1, employeeId: 1 },
    { unique: true }
);

/**
 * Fast filtering by leave type
 */
LeaveBalanceSchema.index({
    "leave.policyId": 1,
});