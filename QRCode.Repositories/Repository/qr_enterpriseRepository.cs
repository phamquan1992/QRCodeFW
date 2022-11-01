using NHibernate;
using QRCode.Core.Domain;
using QRCode.Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace QRCode.Repositories.Repository
{
    public class qr_enterpriseRepository : BaseRepository<qr_enterprise>, Iqr_enterpriseRepository
    {
        private readonly ISession _session;
        public qr_enterpriseRepository(ISession session) : base(session)
        {
            _session = session;
        }
    }
}
