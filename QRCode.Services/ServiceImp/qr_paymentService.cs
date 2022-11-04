using QRCode.Core.Domain;
using QRCode.Repositories.IRepository;
using QRCode.Services.ISerivce;
using System;
using System.Linq;

namespace QRCode.Services.ServiceImp
{
    public class qr_paymentService: Iqr_paymentService
    {
        private readonly IUnitOfWork _unitOfWork;
        public qr_paymentService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public IQueryable<qr_payment> GetAll()
        {
            return _unitOfWork.qr_paymentRepository.GetAll();
        }
        public bool CreateNew(qr_payment obj)
        {
            try
            {
                return _unitOfWork.qr_paymentRepository.Add(obj);

            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool Update(qr_payment obj)
        {
            try
            {
                return _unitOfWork.qr_paymentRepository.Update(obj);

            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool Delete(qr_payment obj)
        {
            try
            {
                return _unitOfWork.qr_paymentRepository.Delete(obj);

            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
