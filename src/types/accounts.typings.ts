import { Types } from "mongoose";

export interface Accounts {
  employee: Types.ObjectId;
  email: string;
  password: string;
  isActive: boolean;
  role: "employee";
  isPasswordChanged?: boolean;  
  passwordChangedAt?: Date;
}

export interface AccountDetails extends Accounts {
  meta: {
    createdBy: Types.ObjectId;
  };
  createdAt: Date;
  updatedAt: Date;
}
