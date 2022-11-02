using QRCode.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QRCode.Services.ISerivce
{
    public interface Iqr_enterpriseService
    {
        IQueryable<qr_enterprise> GetAll();
        bool CreateNew(qr_enterprise obj);
        bool Update(qr_enterprise obj);
        bool UpdateRange(List<qr_enterprise> obj);
        bool Delete(qr_enterprise obj);
        bool DeleteRange(List<qr_enterprise> obj);
    }
}
