using QRCode.Core.Domain;
using QRCode.Repositories.IRepository;
using QRCode.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QRCode.Services.ServiceImp
{
    public class categoryService : IcategoryService
    {
        private readonly IUnitOfWork _unitOfWork;
        public categoryService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public IQueryable<category> GetAll()
        {
            return _unitOfWork.categoryRepository.GetAll();
        }
        public bool CreateNew(category obj)
        {
            try
            {
                return _unitOfWork.categoryRepository.Add(obj);

            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool Update(category obj)
        {
            try
            {
                return _unitOfWork.categoryRepository.Update(obj);

            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool Delete(category obj)
        {
            try
            {
                return _unitOfWork.categoryRepository.Delete(obj);

            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
