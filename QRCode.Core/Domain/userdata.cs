using System;
using System.Collections.Generic;
using System.Text;

namespace QRCode.Core.Domain
{
    public class userdata
    {
        public virtual long userid { get; set; }
        public virtual string email { get; set; }
        public virtual string sdt { get; set; }
        public virtual string password { get; set; }
        public virtual DateTime? created_date { get; set; }
        public virtual bool status { get; set; }
        public virtual bool isadmin { get; set; }
    }
}
