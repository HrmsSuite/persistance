import { Schema } from "mongoose";

export const AuditRelatedResourceSchema = new Schema(
    {
        module: {
            type: String,
            required: true,
            trim: true
        },

        entity: {
            type: String,
            required: true,
            trim: true
        },

        id: {
            type: Schema.Types.ObjectId,
            required: true
        },

        name: {
            type: String,
            trim: true
        },

        code: {
            type: String,
            trim: true
        }
    },
    {
        _id: false,
        versionKey: false
    }
);