using QRCode.Core.Domain;
using QRCode.Repositories.IRepository;
using QRCode.Services.ISerivce;
using System;
using System.Linq;

namespace QRCode.Services.ServiceImp
{
    public class qr_surveyService : Iqr_surveyService
    {
        private readonly IUnitOfWork _unitOfWork;
        public qr_surveyService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public IQueryable<qr_survey> GetAll()
        {
            return _unitOfWork.qr_surveyRepository.GetAll();
        }
        public bool CreateNew(qr_survey obj)
        {
            try
            {
                return _unitOfWork.qr_surveyRepository.Add(obj);

            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool Update(qr_survey obj)
        {
            try
            {
                return _unitOfWork.qr_surveyRepository.Update(obj);

            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool Delete(qr_survey obj)
        {
            try
            {
                return _unitOfWork.qr_surveyRepository.Delete(obj);

            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
