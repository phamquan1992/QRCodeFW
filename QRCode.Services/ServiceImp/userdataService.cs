using QRCode.Core.Domain;
using QRCode.Repositories.IRepository;
using QRCode.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QRCode.Services.ServiceImp
{
    public class userdataService : IuserdataService
    {
        private readonly IUnitOfWork _unitOfWork;
        public userdataService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public IQueryable<userdata> GetAll()
        {
            return _unitOfWork.userdataRepository.GetAll();
        }
        public bool CreateNew(userdata obj)
        {
            try
            {
                return _unitOfWork.userdataRepository.Add(obj);

            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool Update(userdata obj)
        {
            try
            {
                return _unitOfWork.userdataRepository.Update(obj);

            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool Delete(userdata obj)
        {
            try
            {
                return _unitOfWork.userdataRepository.Delete(obj);

            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
