import { productview } from "./product";

export interface qr_enterprise {
    qrenterpriseid: number;
    name: string;
    taxcode: string;
    tel: string;
    email: string;
    fax: string;
    logo: string;
    nation: string;
    province: string;
    district: string;
    wards: string;
    occupation: string;
    additional: string;
    created_date: Date;
    created_by: number;
    lastcreated_date: Date;
    lastcreated_by: number;
    status: boolean;
    address: string;
    sectors_code:string;
}
export interface enterprisview {
    additional: string;
    address: string;
    email: string;
    fax: string;
    logo: string;
    name: string;
    qrenterpriseid: number;
    tel: string;
    list_ref: productview[]
}