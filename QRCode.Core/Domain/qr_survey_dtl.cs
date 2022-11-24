using System;
using System.Collections.Generic;
using System.Text;

namespace QRCode.Core.Domain
{
    public class qr_survey_dtl
    {
        public virtual int qrsurveydtlid { get; set; }
        public virtual int qrsurveyid { get; set; }
        public virtual int userid { get; set; }
        public virtual string additional { get; set; }
        public virtual DateTime? created_date { get; set; }
        public virtual int created_by { get; set; }
    }
}
