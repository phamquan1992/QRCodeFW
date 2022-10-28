using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Text;

namespace QRCode.Core.Domain
{
    public class categoryMapping : ClassMap<category>
    {
        public categoryMapping()
        {
            Table("category");
            Id(x => x.code);
            Map(x => x.name).Not.Nullable();
        }
    }
}
