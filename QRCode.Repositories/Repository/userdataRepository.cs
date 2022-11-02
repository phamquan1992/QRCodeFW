using NHibernate;
using QRCode.Core.Domain;
using QRCode.Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace QRCode.Repositories.Repository
{
    public class userdataRepository : BaseRepository<userdata>, IuserdataRepository
    {
        private readonly ISession _session;
        public userdataRepository(ISession session) : base(session)
        {
            _session = session;
        }
    }
}
