using QRCode.Core.Domain;
using System.Linq;

namespace QRCode.Services.ISerivce
{
    public interface Iqr_surveyService
    {
        IQueryable<qr_survey> GetAll();
        bool CreateNew(qr_survey obj);
        bool Update(qr_survey obj);
        bool Delete(qr_survey obj);
        IQueryable<qr_survey> FilterBy(int id);
    }
}
