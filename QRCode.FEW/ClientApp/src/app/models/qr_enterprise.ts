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
    sectors_code: string;
    url_background: string;
    url_video: string;
    url_img: string
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
export interface qr_enterprise_excel {
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
    address: string;
    sectors_code: string;
    url_background: string;
    url_video: string;
    url_img: string;
    err_str:string;
    Website:string;
    Facebook:string;
    Shopee:string;
    Zalo:string;
    Instagram:string;
    Tiktok:string;
    Tiki:string;
    Youtube:string;
    Linkedin:string;
    Lazada:string;
    Sendo:string;
}