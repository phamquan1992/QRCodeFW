using QRCode.Core.Domain;
using QRCode.Repositories.IRepository;
using QRCode.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QRCode.Services.ServiceImp
{
    public class productService : IproductService
    {
        private readonly IUnitOfWork _unitOfWork;
        public productService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public IQueryable<product> GetAll()
        {
            return _unitOfWork.productRepository.GetAll();
        }
        public bool CreateNew(product obj)
        {
            try
            {
                _unitOfWork.productRepository.Add(obj);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool Update(product obj)
        {
            try
            {
                _unitOfWork.productRepository.Update(obj);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool Delete(product obj)
        {
            try
            {
                _unitOfWork.productRepository.Delete(obj);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
