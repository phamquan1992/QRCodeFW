export class branch {
    id: number;
    branchcode: string;
    branchname: string;
    description: string;
    address: string;
    order: number;
    branchid: number;
    isparentNode: boolean;
    isactive: boolean;
    created_by?: number;
    created_date?: Date;
    last_update_by?: number;
    last_update_date?: Date;
    constructor(option: {
        id?: number;
        branchcode?: string;
        branchname?: string;
        description?: string;
        address?: string;
        order?: number;
        branchid?: number;
        isparentNode?: boolean;
        isactive?: boolean;
        created_by?: number;
        created_date?: Date;
        last_update_by?: number;
        last_update_date?: Date;

    }) {
        this.id = option.id || 0;
        this.branchcode = option.branchcode || '';
        this.branchname = option.branchname || '';
        this.description = option.description || '';
        this.order = option.order || 0;
        this.branchid = option.branchid || 0;
        this.isparentNode = option.isparentNode || false;
        this.isactive = option.isactive || false;
        this.created_by = option.created_by || 0;
        this.created_date = option.created_date || new Date();
        this.last_update_by = option.last_update_by || 0;
        this.last_update_date = option.last_update_date || new Date();
        this.address = option.address || '';
    }
}
export interface branch_edit {
    branch_obj: branch;
    list_branch: { key: string, value: string }[]
}
export interface result_object {
    result: string;
}