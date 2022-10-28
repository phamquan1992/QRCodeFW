using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Text;

namespace QRCode.Core.Domain
{
    public class locationMapping : ClassMap<location>
    {
        public locationMapping()
        {
            Table("location");
            Id(x => x.code);
            Map(x => x.name).Not.Nullable();
            Map(x => x.parent).Nullable();
            Map(x => x.orderidx).Nullable();
            Map(x => x.trang_thai).Nullable();
        }
    }
}
