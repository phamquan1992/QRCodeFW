export interface qr_gencode {
    qrgencodeid: number;
    typecode: string;
    dataid: number;
    image: string;
    name: string;
    code: string;
    status: number;
    created_date: Date;
    created_by: number;
    lastcreated_date: Date;
    lastcreated_by: number;
    qrpaymentid: number;
}
export interface gencodeview {
    qr_name: string;
    qr_img: string;
    qr_tpye: string;
    qr_obj_name: string;
    qr_obj_url: string;
    status_qr: string;
    status_pack: string;
    create_date_qr: string;
    exp_date: string;
    qrgencodeid: number;
    pack_name: string;
    qr_code: string;
    qrpaymentid:number;
}
export interface gencode_status {
    qrgencodeid: number;
    qrpaymentid:number;
    status: number;
    userid:number;
}
export interface count_obj{
    count_enterprise:number;
    count_gencode:number;
    count_payment:number;
    count_product:number;
    count_survey:number;
}