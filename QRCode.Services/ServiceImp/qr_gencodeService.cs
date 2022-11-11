using QRCode.Core.Domain;
using QRCode.Repositories.IRepository;
using QRCode.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QRCode.Services.ServiceImp
{
    public class qr_gencodeService: Iqr_gencodeService
    {
        private readonly IUnitOfWork _unitOfWork;
        public qr_gencodeService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public IQueryable<qr_gencode> GetAll()
        {
            return _unitOfWork.qr_gencodeRepository.GetAll();
        }
        public bool CreateNew(qr_gencode obj)
        {
            try
            {
                return _unitOfWork.qr_gencodeRepository.Add(obj);

            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool Update(qr_gencode obj)
        {
            try
            {
                return _unitOfWork.qr_gencodeRepository.Update(obj);

            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool Delete(qr_gencode obj)
        {
            try
            {
                return _unitOfWork.qr_gencodeRepository.Delete(obj);

            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
