using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Text;

namespace QRCode.Core.Domain
{
    public class qr_paymentMapping : ClassMap<qr_payment>
    {
        public qr_paymentMapping()
        {
            Table("qr_payment");
            Id(x => x.qrpaymentid).GeneratedBy.Identity();
            Map(x => x.packcode).Nullable();
            Map(x => x.packname).Not.Nullable();
            Map(x => x.userid).Not.Nullable();
            Map(x => x.qrenterpriseid).Nullable();
            Map(x => x.payment_date).Nullable();
            Map(x => x.created_date).Nullable();
            Map(x => x.created_by).Nullable();
            Map(x => x.lastcreated_date).Nullable();
            Map(x => x.lastcreated_by).Nullable();
        }
    }
}
