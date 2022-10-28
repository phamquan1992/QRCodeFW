using NHibernate;
using QRCode.Core.Domain;
using QRCode.Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace QRCode.Repositories.Repository
{
    public class locationRepository : BaseRepository<location>, IlocationRepository
    {
        private readonly ISession _session;
        public locationRepository(ISession session) : base(session)
        {
            _session = session;
        }
    }
}
