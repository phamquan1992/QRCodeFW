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
    }
}
