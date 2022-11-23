using System;
using System.Collections.Generic;
using System.Text;

namespace QRCode.Core.Domain
{
    public class qr_survey
    {
        public virtual int qrsurveyid { get; set; }
        public virtual string name { get; set; }
        public virtual string code { get; set; }
        public virtual bool status { get; set; }
        public virtual string additional { get; set; }
        public virtual DateTime? start_date { get; set; }
        public virtual DateTime? end_date { get; set; }
        public virtual DateTime? created_date { get; set; }
        public virtual int created_by { get; set; }
        public virtual DateTime? lastcreated_date { get; set; }
        public virtual int lastcreated_by { get; set; }
    }
}
