using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Text;

namespace QRCode.Core.Domain
{
    public class qr_survey_dtlMapping : ClassMap<qr_survey_dtl>
    {
        public qr_survey_dtlMapping()
        {
            Table("qr_survey_dtl");
            Id(m => m.qrsurveydtlid).GeneratedBy.Identity();
            Map(m => m.additional).Nullable();
            Map(m => m.created_by).Nullable();
            Map(m => m.created_date).Nullable();
            Map(m => m.qrsurveyid).Nullable();
            Map(m => m.userid).Nullable();
        }
    }
}
