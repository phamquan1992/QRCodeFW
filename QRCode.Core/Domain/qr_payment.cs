using System;
using System.Collections.Generic;
using System.Text;

namespace QRCode.Core.Domain
{
    public class qr_payment
    {
        public virtual long qrpaymentid { get; set; }
        public virtual string packcode { get; set; }
        public virtual string packname { get; set; }
        public virtual int userid { get; set; }
        public virtual int qrenterpriseid { get; set; }
        public virtual DateTime? created_date { get; set; }
        public virtual int created_by { get; set; }
        public virtual DateTime? lastcreated_date { get; set; }
        public virtual int lastcreated_by { get; set; }
        public virtual DateTime? payment_date { get; set; }
    }
}
