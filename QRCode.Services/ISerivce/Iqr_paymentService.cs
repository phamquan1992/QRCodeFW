using QRCode.Core.Domain;
using System.Linq;

namespace QRCode.Services.ISerivce
{
    public interface Iqr_paymentService
    {
        IQueryable<qr_payment> GetAll();
        bool CreateNew(qr_payment obj);
        bool Update(qr_payment obj);
        bool Delete(qr_payment obj);
    }
}
