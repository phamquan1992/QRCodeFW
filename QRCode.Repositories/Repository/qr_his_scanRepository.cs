using NHibernate;
using QRCode.Core.Domain;
using QRCode.Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace QRCode.Repositories.Repository
{
    public class qr_his_scanRepository : BaseRepository<qr_his_scan>, Iqr_his_scanRepository
    {
        private readonly ISession _session;
        public qr_his_scanRepository(ISession session) : base(session)
        {
            _session = session;
        }
    }
}
