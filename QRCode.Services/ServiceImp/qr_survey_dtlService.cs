using QRCode.Core.Domain;
using QRCode.Repositories.IRepository;
using QRCode.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QRCode.Services.ServiceImp
{
    public class qr_survey_dtlService : Iqr_survey_dtlService
    {
        private readonly IUnitOfWork _unitOfWork;
        public qr_survey_dtlService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public IQueryable<qr_survey_dtl> GetAll()
        {
            return _unitOfWork.qr_survey_dtlRepository.GetAll();
        }
        public bool CreateNew(qr_survey_dtl obj)
        {
            try
            {
                return _unitOfWork.qr_survey_dtlRepository.Add(obj);

            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool Update(qr_survey_dtl obj)
        {
            try
            {
                return _unitOfWork.qr_survey_dtlRepository.Update(obj);

            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool Delete(qr_survey_dtl obj)
        {
            try
            {
                return _unitOfWork.qr_survey_dtlRepository.Delete(obj);

            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
