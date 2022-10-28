using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Text;

namespace QRCode.Core.Domain
{
    public class productMapping : ClassMap<product>
    {
        public productMapping()
        {
            Table("qr_product");
            Id(x => x.qrproductid).GeneratedBy.Identity();
            Map(x => x.name).Not.Nullable();
            Map(x => x.code).Nullable();
            Map(x => x.category).Nullable();
            Map(x => x.url_img).Nullable();
            Map(x => x.url_video).Nullable();
            Map(x => x.url_iso).Nullable();
            Map(x => x.url_barcode).Nullable();
            Map(x => x.price).Nullable();
            Map(x => x.slogan).Nullable();
            Map(x => x.logo).Not.Nullable();
            Map(x => x.des_story).Nullable();
            Map(x => x.des_pack).Nullable();
            Map(x => x.des_element).Nullable();
            Map(x => x.des_uses).Nullable();
            Map(x => x.des_guide).Nullable();
            Map(x => x.des_preserve).Nullable();
            Map(x => x.des_startdate).Nullable();
            Map(x => x.des_enddate).Nullable();
            Map(x => x.additional).Nullable();
            Map(x => x.created_date).Nullable();
            Map(x => x.created_by).Nullable();
            Map(x => x.lastcreated_date).Nullable();
            Map(x => x.lastcreated_by).Nullable();
            Map(x => x.status).Nullable();
        }
    }
}
