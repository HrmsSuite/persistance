import { model } from "mongoose";
import { ShiftData } from "../types";
import { ShiftSchema } from "../schema";

export const ShiftModel = model<ShiftData>("shifts", ShiftSchema);