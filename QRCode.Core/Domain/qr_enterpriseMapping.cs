using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Text;

namespace QRCode.Core.Domain
{
    public class qr_enterpriseMapping : ClassMap<qr_enterprise>
    {
        public qr_enterpriseMapping()
        {
            Table("qr_enterprise");
            Id(x=>x.qrenterpriseid).GeneratedBy.Identity();
            Map(x => x.name).Not.Nullable();
            Map(x => x.taxcode).Nullable();
            Map(x => x.tel).Not.Nullable();
            Map(x => x.email).Nullable();
            Map(x => x.fax).Nullable();
            Map(x => x.logo).Nullable();
            Map(x => x.nation).Not.Nullable();
            Map(x => x.province).Not.Nullable();
            Map(x => x.district).Not.Nullable();
            Map(x => x.wards).Not.Nullable();
            Map(x => x.occupation).Not.Nullable();
            Map(x => x.additional).Nullable();
            Map(x => x.created_date).Nullable();
            Map(x => x.created_by).Nullable();
            Map(x => x.lastcreated_date).Nullable();
            Map(x => x.lastcreated_by).Nullable();
            Map(x => x.status).Nullable();
            Map(x => x.address).Nullable();
            Map(x => x.sectors_code).Nullable();
        }
    }
}
