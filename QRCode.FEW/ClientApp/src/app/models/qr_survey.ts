import { cauhoi } from "./cauhoi";

export interface qr_survey {
    qrsurveyid: number;
    name: string;
    code: string;
    status: boolean;
    additional: string;
    start_date: Date;
    end_date: Date;
    created_date: Date;
    created_by: number;
    lastcreated_date: Date;
    lastcreated_by: number;
}
export interface survey_view {
    object_edit: qr_survey;
    list_cauhoi: cauhoi[];
}