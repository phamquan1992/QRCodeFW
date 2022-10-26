using NHibernate;
using QRCode.Core.Domain;
using QRCode.Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace QRCode.Repositories.Repository
{
    public class productRepository : BaseRepository<product>, IproductRepository
    {
        private readonly ISession _session;
        public productRepository(ISession session) : base(session)
        {
            _session = session;
        }
    }
}
