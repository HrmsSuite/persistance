import { Types } from "mongoose";

export interface ITeam {
  companyId: Types.ObjectId;
  departmentId: Types.ObjectId;
  reportingManagerId: Types.ObjectId;
  name: string;
  memberIds: Types.ObjectId[];
  chatChannelId?: Types.ObjectId | null;
  meta: {
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
}