using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using Microsoft.Extensions.DependencyInjection;
using NHibernate.Cache;
using NHibernate.Tool.hbm2ddl;
using QRCode.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QRCode.FEW.Extensions.NHibernate
{
    public static class NHibernateExtensions
    {
        public static IServiceCollection AddNHibernate(this IServiceCollection services, string connectionString)
        {
            var configuration = Fluently.Configure()
                .Database(MsSqlConfiguration.MsSql2012.ConnectionString(connectionString).ShowSql)
                .Cache(c => c.UseQueryCache().UseSecondLevelCache().ProviderClass<HashtableCacheProvider>())
                .Mappings(m => m.FluentMappings.AddFromAssemblyOf<productMapping>())
                .Mappings(m => m.FluentMappings.AddFromAssemblyOf<locationMapping>())
                .Mappings(m => m.FluentMappings.AddFromAssemblyOf<categoryMapping>())
                .Mappings(m => m.FluentMappings.AddFromAssemblyOf<qr_enterpriseMapping>())
                .Mappings(m => m.FluentMappings.AddFromAssemblyOf<userdataMapping>())
                .Mappings(m => m.FluentMappings.AddFromAssemblyOf<qr_paymentMapping>())
                .Mappings(m => m.FluentMappings.AddFromAssemblyOf<qr_gencodeMapping>())
                .Mappings(m => m.FluentMappings.AddFromAssemblyOf<sectorsMapping>())
                .Mappings(m => m.FluentMappings.AddFromAssemblyOf<qr_his_scanMapping>())
                .Mappings(m => m.FluentMappings.AddFromAssemblyOf<qr_survey>())
                .ExposeConfiguration(cf => new SchemaUpdate(cf).Execute(false, false));

            var sessionFactory = configuration.BuildSessionFactory();

            services.AddSingleton(sessionFactory);
            services.AddScoped(factory => sessionFactory.OpenSession());

            return services;
        }
    }
}
