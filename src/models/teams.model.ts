import { model } from "mongoose";
import { ITeam } from "../types";
import { teamsSchema } from "../schema";

export const TeamModel = model<ITeam>("Team", teamsSchema);
