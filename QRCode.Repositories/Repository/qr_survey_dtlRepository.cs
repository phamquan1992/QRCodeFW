using NHibernate;
using QRCode.Core.Domain;
using QRCode.Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace QRCode.Repositories.Repository
{
    public class qr_survey_dtlRepository : BaseRepository<qr_survey_dtl>, Iqr_survey_dtlRepository
    {
        private readonly ISession _session;
        public qr_survey_dtlRepository(ISession session) : base(session)
        {
            _session = session;
        }
    }
}
