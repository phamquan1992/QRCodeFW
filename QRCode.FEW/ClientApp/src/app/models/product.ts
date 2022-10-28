export interface product {
    qrproductid: number;
    name: string;
    code: string;
    category: string;
    price: number;
    slogan: string;
    logo: string;
    url_img: string;
    url_iso: string;
    url_barcode: string; 
    des_story: string;
    des_pack: string;
    des_element: string;
    des_uses: string;
    des_guide: string;
    des_preserve: string;
    des_startdate:string;
    des_enddate:string;    
    url_video: string;  
    lastcreated_date: Date;
    lastcreated_by: number;
    additional:string;
    status:boolean;
}