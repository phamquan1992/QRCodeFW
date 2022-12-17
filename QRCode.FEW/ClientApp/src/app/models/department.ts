import { branch } from "./branch";

export interface department {
    id: number;
    branchid: number;
    departmentcode: string;
    departmentname: string;
    description: string;
    order?: number;
    parentid?: number;
    isparentnode?: boolean;
    isactive?: boolean;
    created_by?: number;
    created_date?: Date;
    last_updated_by?: number;
    last_updated_date?: Date;
}
export interface department_edit {
    obj_edit: department;
    list_branch:  { key: string, value: string }[];
}