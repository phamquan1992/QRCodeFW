using QRCode.Core.Domain;
using System.Collections.Generic;
using System.Linq;

namespace QRCode.Services.ISerivce
{
    public interface Iqr_gencodeService
    {
        IQueryable<qr_gencode> GetAll();
        bool CreateNew(qr_gencode obj);
        bool Update(qr_gencode obj);
        bool UpdateRange(List<qr_gencode> obj);
        bool Delete(qr_gencode obj);
    }
}
