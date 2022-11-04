using NHibernate;
using QRCode.Core.Domain;
using QRCode.Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Text;


namespace QRCode.Repositories.Repository
{
    public class qr_paymentRepository : BaseRepository<qr_payment>, Iqr_paymentRepository
    {
        private readonly ISession _session;
        public qr_paymentRepository(ISession session) : base(session)
        {
            _session = session;
        }
    }
}
