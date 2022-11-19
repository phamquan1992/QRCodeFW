using QRCode.Core.Domain;
using QRCode.Repositories.IRepository;
using QRCode.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QRCode.Services.ServiceImp
{
   public class qr_his_scanService : Iqr_his_scanService
    {
        private readonly IUnitOfWork _unitOfWork;
        public qr_his_scanService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public IQueryable<qr_his_scan> GetAll()
        {
            return _unitOfWork.qr_his_scanRepository.GetAll();
        }
        public bool CreateNew(qr_his_scan obj)
        {
            try
            {
                return _unitOfWork.qr_his_scanRepository.Add(obj);

            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool Update(qr_his_scan obj)
        {
            try
            {
                return _unitOfWork.qr_his_scanRepository.Update(obj);

            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool Delete(qr_his_scan obj)
        {
            try
            {
                return _unitOfWork.qr_his_scanRepository.Delete(obj);

            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
