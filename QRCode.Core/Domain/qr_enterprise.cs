using System;
using System.Collections.Generic;
using System.Text;

namespace QRCode.Core.Domain
{
    public class qr_enterprise
    {
        public virtual long qrenterpriseid { get; set; }
        public virtual string name { get; set; }
        public virtual string taxcode { get; set; }
        public virtual string tel { get; set; }
        public virtual string email { get; set; }
        public virtual string fax { get; set; }
        public virtual string logo { get; set; }
        public virtual string nation { get; set; }
        public virtual string province { get; set; }
        public virtual string district { get; set; }
        public virtual string wards { get; set; }
        public virtual string occupation { get; set; }
        public virtual string additional { get; set; }
        public virtual DateTime? created_date { get; set; }
        public virtual int created_by { get; set; }
        public virtual DateTime? lastcreated_date { get; set; }
        public virtual int lastcreated_by { get; set; }
        public virtual bool status { get; set; }
        public virtual string address { get; set; }

    }
}
