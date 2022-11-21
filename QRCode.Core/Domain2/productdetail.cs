using QRCode.Core.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace QRCode.Core.Domain2
{
    public class productdetail
    {
        public string Title { get; set; }
        public string name { get; set; }
        public bool is_require { get; set; }
        public bool is_visible { get; set; }
        public string type { get; set; }
        public string nhom { get; set; }
        public bool is_delete { get; set; }
        public string value_ip { get; set; }
    }
    public class productview
    {
        public long qrproductid { get; set; }
        public string url_img { get; set; }
        public string name { get; set; }
        public decimal? price { get; set; }
        public string des_story { get; set; }
        public string des_manufactur { get; set; }
        public string des_pack { get; set; }
        public string des_element { get; set; }
        public string des_uses { get; set; }
        public string des_guide { get; set; }
        public string des_preserve { get; set; }
        public string des_startdate { get; set; }
        public string des_enddate { get; set; }
        public string additional { get; set; }
        public decimal enterpriseid { get; set; }
        public List<productview> list_ref { get; set; }
    }
    public class enterprisview
    {
        public long qrenterpriseid { get; set; }
        public string logo { get; set; }
        public string name { get; set; }
        public string address { get; set; }
        public string tel { get; set; }
        public string fax { get; set; }
        public string email { get; set; }
        public string additional { get; set; }
        public List<productview> list_ref { get; set; }
    }
    public class gencodeview
    {
        public string qr_name { get; set; }
        public string qr_img { get; set; }
        public string qr_tpye { get; set; }
        public string qr_obj_name { get; set; }
        public string qr_obj_url { get; set; }
        public string status_qr { get; set; }
        public string status_pack { get; set; }
        public string pack_name { get; set; }
        public DateTime create_date_qr { get; set; }
        public DateTime exp_date { get; set; }
        public int qrgencodeid { get; set; }
        public string qr_code { get; set; }
        public int qrpaymentid { get; set; }
    }
    public class gencode_status
    {
        public int qrgencodeid { get; set; }
        public int qrpaymentid { get; set; }
        public int status { get; set; }
        public int userid { get; set; }
    }
    public class reset_obj
    {
        public user_reset userdata { get; set; }
        public string result { get; set; }
    }

    public class user_reset
    {
        public string email { get; set; }
        public string password_old { get; set; }
        public string password { get; set; }
    }
    public class payment_view
    {
        public int qrpaymentid { get; set; }
        public string packcode { get; set; }
        public string packname { get; set; }
        public int userid { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
        public DateTime? created_date { get; set; }
        public DateTime? payment_date { get; set; }
    }
}
