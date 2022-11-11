using NHibernate;
using QRCode.Core.Domain;
using QRCode.Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace QRCode.Repositories.Repository
{
    public class qr_gencodeRepository : BaseRepository<qr_gencode>, Iqr_gencodeRepository
    {
        private readonly ISession _session;
        public qr_gencodeRepository(ISession session) : base(session)
        {
            _session = session;
        }
    }
}
