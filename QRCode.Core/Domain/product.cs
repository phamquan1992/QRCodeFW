using System;
using System.Collections.Generic;
using System.Text;

namespace QRCode.Core.Domain
{
    public class product
    {
        public virtual long qrproductid { get; set; }
        public virtual string name { get; set; }
        public virtual string code { get; set; }
        public virtual string category { get; set; }
        public virtual string url_img { get; set; }
        public virtual string url_video { get; set; }
        public virtual string url_iso { get; set; }
        public virtual string url_barcode { get; set; }
        public virtual decimal price { get; set; }
        public virtual string slogan { get; set; }
        public virtual string logo { get; set; }
        public virtual string des_story { get; set; }
        public virtual string des_pack { get; set; }
        public virtual string des_element { get; set; }
        public virtual string des_uses { get; set; }
        public virtual string des_guide { get; set; }
        public virtual string des_preserve { get; set; }
        public virtual string des_startdate { get; set; }
        public virtual string des_enddate { get; set; }
        public virtual string additional { get; set; }
        public virtual DateTime? created_date { get; set; }
        public virtual decimal created_by { get; set; }
        public virtual DateTime? lastcreated_date { get; set; }
        public virtual decimal lastcreated_by { get; set; }
        public virtual bool status { get; set; }

    }
}
