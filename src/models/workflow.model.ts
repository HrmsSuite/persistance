import { model } from "mongoose";
import { WorkflowSchema } from "../schema";
import { IWorkflow } from "../types";

export const WorkflowModel = model<IWorkflow>("Workflow", WorkflowSchema);
