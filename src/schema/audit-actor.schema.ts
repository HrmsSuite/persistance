import { Schema } from "mongoose";

export const AuditActorSchema = new Schema(
    {
        id: {
            type: Schema.Types.ObjectId,
            required: true
        },

        type: {
            type: String,
            required: true,
            trim: true
        },

        name: {
            type: String,
            trim: true
        },

        email: {
            type: String,
            lowercase: true,
            trim: true
        }
    },
    {
        _id: false,
        versionKey: false
    }
);