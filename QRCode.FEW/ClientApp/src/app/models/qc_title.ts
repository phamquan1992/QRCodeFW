export interface qc_title {
    id: number;
    titlecode: string;
    titlename: string;
    description: string;
    order?: number;
    departmentid?: number;
    isactive?: boolean;
    created_by?: number;
    created_date?: Date;
    last_updated_by?: number;
    last_updated_date?: Date;
}