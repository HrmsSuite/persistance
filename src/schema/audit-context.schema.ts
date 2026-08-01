import { Schema } from "mongoose";

export const AuditContextSchema = new Schema(
    {
        companyId: {
            type: Schema.Types.ObjectId,
            required: true,
            index: true
        },

        tenantId: Schema.Types.ObjectId,

        workspaceId: Schema.Types.ObjectId,

        departmentId: Schema.Types.ObjectId,

        employeeId: Schema.Types.ObjectId,

        projectId: Schema.Types.ObjectId,

        sprintId: Schema.Types.ObjectId,

        taskId: Schema.Types.ObjectId
    },
    {
        _id: false,
        versionKey: false
    }
);