export interface DepartmentData {
    name:string;
    designation:string[];
}

export interface Department {
    data:DepartmentData;
    meta:{
        createdAt:Date;
        updatedAt:Date;
    }
}