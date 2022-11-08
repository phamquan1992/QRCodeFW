export class optioncs {
    data!: string;
    image!: string;
    witdth!: number;
    height!: number;
    margin!: number;
    dotstyle!: string;
    cornersDot_type!: string;
    cornerSquareType!: string;
    dotcolor!: string;
    background_color!: string;
    shape!: string;
}
export interface mail_model {
    email: string;
    sdt: string;
    password: string;
}
export interface MailRequest {
    toemail: string;
    subject: string;
    body: string;
    sdt: string;
    pass: string;
}
export interface result_object {
    result: string;
}
export interface data_upload {
    type_file: string;
    forder_save: string;
}
export interface temp_object {
    key: string;
    values: value_it;
}
export interface value_it {
    title: string;
    value: string;
}