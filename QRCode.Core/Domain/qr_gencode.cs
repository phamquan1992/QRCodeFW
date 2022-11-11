using System;
using System.Collections.Generic;
using System.Text;

namespace QRCode.Core.Domain
{
    public class qr_gencode
    {
        public virtual int qrgencodeid { get; set; }
        public virtual string typecode { get; set; }
        public virtual decimal dataid { get; set; }
        public virtual string image { get; set; }
        public virtual string name { get; set; }
        public virtual string code { get; set; }
        public virtual int status { get; set; }
        public virtual DateTime? created_date { get; set; }
        public virtual int created_by { get; set; }
        public virtual DateTime? lastcreated_date { get; set; }
        public virtual int lastcreated_by { get; set; }
        public virtual int qrpaymentid { get; set; }
    }
}
