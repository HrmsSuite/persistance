import { Types } from "mongoose";

export interface DepartmentData {
    name:string;
    designation:string[];
}

export interface Department {
    companyId:Types.ObjectId
    data:DepartmentData;
    meta:{
        createdAt:Date;
        updatedAt:Date;
        version: number;     
        isDeleted: boolean;
    }
}