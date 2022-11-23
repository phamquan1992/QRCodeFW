using NHibernate;
using QRCode.Core.Domain;
using QRCode.Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace QRCode.Repositories.Repository
{
    public class qr_surveyRepository : BaseRepository<qr_survey>, Iqr_surveyRepository
    {
        private readonly ISession _session;
        public qr_surveyRepository(ISession session) : base(session)
        {
            _session = session;
        }
    }
}
