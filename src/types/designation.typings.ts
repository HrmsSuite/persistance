import { Types } from "mongoose";

export interface DesignationsData {
    name:string;
    sortHand?:string;
    level?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface Designations {
    companyId:Types.ObjectId
    data: DesignationsData;
    meta:{
        createdAt:Date;
        updatedAt:Date;
        version: number;      // ← add
        isDeleted: boolean;
    }
}