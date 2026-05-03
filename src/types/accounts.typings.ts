import { Types } from "mongoose";

export interface Accounts {
  companyId:Types.ObjectId;
  employee: Types.ObjectId;
  email: string;
  password: string;
  tempPassword?: string | null;
  isActive: boolean;
  role: "employee";
  isPasswordChanged?: boolean;  
  passwordChangedAt?: Date | null;
}

export interface AccountDetails extends Accounts {
  meta: {
    createdBy: Types.ObjectId;
  };
  createdAt: Date;
  updatedAt: Date;
}
