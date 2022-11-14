using QRCode.Core.Domain;
using QRCode.Repositories.IRepository;
using QRCode.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QRCode.Services.ServiceImp
{
    public class sectorsService : IsectorsService
    {
        private readonly IUnitOfWork _unitOfWork;
        public sectorsService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public IQueryable<sectors> GetAll()
        {
            return _unitOfWork.sectorsRepository.GetAll();
        }
        public bool CreateNew(sectors obj)
        {
            try
            {
                return _unitOfWork.sectorsRepository.Add(obj);

            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool Update(sectors obj)
        {
            try
            {
                return _unitOfWork.sectorsRepository.Update(obj);

            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool Delete(sectors obj)
        {
            try
            {
                return _unitOfWork.sectorsRepository.Delete(obj);

            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
