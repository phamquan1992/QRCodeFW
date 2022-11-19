using QRCode.Core.Domain;
using System.Linq;

namespace QRCode.Services.ISerivce
{
    public interface Iqr_his_scanService
    {
        IQueryable<qr_his_scan> GetAll();
        bool CreateNew(qr_his_scan obj);
        bool Update(qr_his_scan obj);
        bool Delete(qr_his_scan obj);
    }
}
