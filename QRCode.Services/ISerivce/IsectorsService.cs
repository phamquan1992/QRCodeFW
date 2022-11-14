using QRCode.Core.Domain;
using System.Linq;

namespace QRCode.Services.ISerivce
{
    public interface IsectorsService
    {
        IQueryable<sectors> GetAll();
        bool CreateNew(sectors obj);
        bool Update(sectors obj);
        bool Delete(sectors obj);
    }
}
