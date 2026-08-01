import { Schema } from "mongoose";

export const AuditChangeSchema = new Schema(
    {
        field: {
            type: String,
            required: true,
            trim: true
        },

        previous: {
            type: Schema.Types.Mixed,
            default: null
        },

        current: {
            type: Schema.Types.Mixed,
            default: null
        }
    },
    {
        _id: false,
        versionKey: false
    }
);