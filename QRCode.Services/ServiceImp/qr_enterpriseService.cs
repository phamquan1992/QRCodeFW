using QRCode.Core.Domain;
using QRCode.Repositories.IRepository;
using QRCode.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QRCode.Services.ServiceImp
{
    public class qr_enterpriseService: Iqr_enterpriseService
    {
        private readonly IUnitOfWork _unitOfWork;
        public qr_enterpriseService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public IQueryable<qr_enterprise> GetAll()
        {
            return _unitOfWork.qr_enterpriseRepository.GetAll();
        }
        public bool CreateNew(qr_enterprise obj)
        {
            try
            {
                return _unitOfWork.qr_enterpriseRepository.Add(obj);

            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool Update(qr_enterprise obj)
        {
            try
            {
                return _unitOfWork.qr_enterpriseRepository.Update(obj);

            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool UpdateRange(List<qr_enterprise> obj)
        {
            try
            {
                return _unitOfWork.qr_enterpriseRepository.UpdateRange(obj);

            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool Delete(qr_enterprise obj)
        {
            try
            {
                return _unitOfWork.qr_enterpriseRepository.Delete(obj);

            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool DeleteRange(List<qr_enterprise> obj)
        {
            try
            {
                return _unitOfWork.qr_enterpriseRepository.DeleteRange(obj);
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
