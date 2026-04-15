export interface DesignationsData {
    name:string;
    sortHand?:string;
    level?: number;
}
export interface Designations {
    data: DesignationsData;
    meta:{
        createdAt:Date;
        updatedAt:Date;
    }
}