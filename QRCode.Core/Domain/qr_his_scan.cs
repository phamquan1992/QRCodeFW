using System;
using System.Collections.Generic;
using System.Text;

namespace QRCode.Core.Domain
{
    public class qr_his_scan
    {
        public virtual int qrhisscanid { get; set; }
        public virtual string tel { get; set; }
        public virtual string location { get; set; }
        public virtual string province { get; set; }
        public virtual string ip { get; set; }
        public virtual string osystem { get; set; }
        public virtual string application { get; set; }
        public virtual DateTime time_scan { get; set; }
        public virtual string typecode { get; set; }
        public virtual int dataid { get; set; }
    }
}
