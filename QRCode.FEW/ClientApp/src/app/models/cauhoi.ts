export interface cauhoi {
    name: string;
    visible_index: number;
    noidung: string;
    type: string;
    element: element_value[];
    dapan: element_value;
}
export interface element_value {
    key: string;
    value: string,
    mota: string
}
export interface obj_value_form {
    name: string;
    value: string;
    required: boolean;
}