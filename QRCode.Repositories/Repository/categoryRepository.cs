using NHibernate;
using QRCode.Core.Domain;
using QRCode.Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace QRCode.Repositories.Repository
{
    public class categoryRepository : BaseRepository<category>, IcategoryRepository
    {
        private readonly ISession _session;
        public categoryRepository(ISession session) : base(session)
        {
            _session = session;
        }
    }
}
