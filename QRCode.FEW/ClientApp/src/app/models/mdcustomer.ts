export interface mdcustomer {
    id: number;
    branchid?: number;
    objectcode: string;
    objectname: string;
    address?: string;
    tel?: string;
    fax?: string;
    email?: string;
    website?: string;
    bankaccount?: string;
    bankname?: string;
    taxcode?: string;
    description?: string;
    contactname?: string;
    contacttitle?: string;
    contactsex?: number;
    contactmobile?: string;
    contactemail?: string;
    objecttype?: number;
    iscustomer?: boolean;
    isprovider?: boolean;
    isactive?: boolean;
    created_by?: number;
    created_date?: Date;
    last_updated_by?: number;
    last_updated_date?: Date;
}
export interface custormer_detail {
    detailid: number;
    customer_id: number;
    column1: string;
    column2: string;
    column3: string;
    status?: string;
}