export interface qr_payment {
    qrpaymentid: number;
    packcode: string;
    packname: string;
    userid: number;
    qrenterpriseid: number;
    payment_date: Date;
    created_date: Date;
    created_by: number;
    lastcreated_date: Date;
    lastcreated_by: number;
}
export interface payment_view{
    qrpaymentid: number;
    packcode: string;
    packname: string;
    userid: number;
    email:string;
    phone:string;
    created_date: Date;
    payment_date: Date;
}
export interface package_objet {
    packcode: string;
    packname: string;
    price: number;
}