using NHibernate;
using QRCode.Core.Domain;
using QRCode.Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace QRCode.Repositories.Repository
{
    public class sectorsRepository : BaseRepository<sectors>, IsectorsRepository
    {
        private readonly ISession _session;
        public sectorsRepository(ISession session) : base(session)
        {
            _session = session;
        }
    }
}
