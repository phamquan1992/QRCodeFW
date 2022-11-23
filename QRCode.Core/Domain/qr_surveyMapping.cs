using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Text;

namespace QRCode.Core.Domain
{
    public class qr_surveyMapping:ClassMap<qr_survey>
    {
        public qr_surveyMapping()
        {
            Table("qr_survey");
            Id(m => m.qrsurveyid).GeneratedBy.Identity();
            Map(m => m.additional).Nullable();
            Map(m => m.code).Nullable();
            Map(m => m.created_by).Nullable();
            Map(m => m.created_date).Nullable();
            Map(m => m.end_date).Nullable();
            Map(m => m.lastcreated_by).Nullable();
            Map(m => m.lastcreated_date).Nullable();
            Map(m => m.name).Not.Nullable();
            Map(m => m.start_date).Nullable();
            Map(m => m.status).Nullable();
        }
    }
}
