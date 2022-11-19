using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Text;

namespace QRCode.Core.Domain
{
    public class qr_his_scanMapping : ClassMap<qr_his_scan>
    {
        public qr_his_scanMapping()
        {
            Table("qr_his_scan");
            Id(x => x.qrhisscanid);
            Map(x => x.application).Nullable();
            Map(x => x.ip).Nullable();
            Map(x => x.location).Nullable();
            Map(x => x.osystem).Nullable();
            Map(x => x.province).Nullable();
            Map(x => x.tel).Nullable();
            Map(x => x.time_scan).Nullable();
            Map(x => x.typecode).Nullable();
            Map(x => x.dataid).Nullable();
        }
    }
}
