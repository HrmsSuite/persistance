import { Schema } from "mongoose";

export const AuditRequestSchema = new Schema(
    {
        ip: {
            type: String,
            trim: true
        },

        method: {
            type: String,
            uppercase: true,
            trim: true
        },

        endpoint: {
            type: String,
            trim: true
        },

        userAgent: String,

        browser: String,

        os: String,

        device: {
            type: String,
            enum: [
                "desktop",
                "mobile",
                "tablet",
                "server",
                "unknown"
            ],
            default: "unknown"
        },

        requestId: {
            type: String,
            trim: true
        },

        correlationId: {
            type: String,
            trim: true
        }
    },
    {
        _id: false,
        versionKey: false
    }
);