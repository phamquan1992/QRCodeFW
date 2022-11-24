using QRCode.Core.Domain;
using System.Linq;

namespace QRCode.Services.ISerivce
{
    public interface Iqr_survey_dtlService
    {
        IQueryable<qr_survey_dtl> GetAll();
        bool CreateNew(qr_survey_dtl obj);
        bool Update(qr_survey_dtl obj);
        bool Delete(qr_survey_dtl obj);
    }
}
