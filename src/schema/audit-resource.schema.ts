import { Schema } from "mongoose";

export const AuditResourceSchema = new Schema(
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
        },

        parent: {
            module: {
                type: String,
                trim: true
            },

            entity: {
                type: String,
                trim: true
            },

            id: Schema.Types.ObjectId,

            name: {
                type: String,
                trim: true
            },

            code: {
                type: String,
                trim: true
            }
        }
    },
    {
        _id: false,
        versionKey: false
    }
);