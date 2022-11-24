using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Text;

namespace QRCode.Core.Domain
{
    public class userdataMapping : ClassMap<userdata>
    {
        public userdataMapping()
        {
            Table("userdata");
            Id(x => x.userid).GeneratedBy.Identity();
            Map(x => x.created_date).Nullable();
            Map(x => x.email).Not.Nullable();
            Map(x => x.password).Not.Nullable();
            Map(x => x.sdt).Not.Nullable();
            Map(x => x.status).Nullable();
            Map(x => x.isadmin).Nullable();
        }
    }
}
