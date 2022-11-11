using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Text;

namespace QRCode.Core.Domain
{
    public class qr_gencodeMapping : ClassMap<qr_gencode>
    {
        public qr_gencodeMapping()
        {
            Table("qr_gencode");
            Id(x => x.qrgencodeid).GeneratedBy.Identity();
            Map(x => x.code).Not.Nullable();
            Map(x => x.created_by).Nullable();
            Map(x => x.created_date).Nullable();
            Map(x => x.dataid).Not.Nullable();
            Map(x => x.image).Not.Nullable();
            Map(x => x.lastcreated_by).Nullable();
            Map(x => x.lastcreated_date).Nullable();
            Map(x => x.name).Not.Nullable();
            Map(x => x.status).Not.Nullable();
            Map(x => x.typecode).Not.Nullable();
            Map(x => x.qrpaymentid).Not.Nullable();
        }
    }
}
