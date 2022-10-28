using System;
using System.Collections.Generic;
using System.Text;

namespace QRCode.Core.Domain
{
    public class location
    {
        public virtual string code { get; set; }
        public virtual string name { get; set; }
        public virtual string parent { get; set; }
        public virtual int levelion { get; set; }
        public virtual int orderidx { get; set; }
        public virtual int trang_thai { get; set; }

    }
}
