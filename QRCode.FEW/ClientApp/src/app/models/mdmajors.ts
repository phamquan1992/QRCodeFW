export interface mdmajors {
    id: number;
    majorscode: string;
    majorsname: string;
    description: string;
    order?: number;
    isactive?: boolean;
    created_by?: number;
    created_date?: Date;
    last_updated_by?: number;
    last_updated_date?: Date;
}