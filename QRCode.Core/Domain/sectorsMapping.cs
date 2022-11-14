using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Text;

namespace QRCode.Core.Domain
{
    public class sectorsMapping:ClassMap<sectors>
    {
        public sectorsMapping()
        {
            Table("sectors");
            Id(x => x.code);
            Map(x => x.name).Not.Nullable();
        }
    }
}
