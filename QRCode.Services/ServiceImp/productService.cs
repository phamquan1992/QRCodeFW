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
              return  _unitOfWork.productRepository.Add(obj);
                
            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool AddRange(List<product> obj)
        {
            try
            {
                return _unitOfWork.productRepository.AddRange(obj);

            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public bool Update(product obj)
        {
            try
            {
                return _unitOfWork.productRepository.Update(obj);
                
            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool UpdateRange(List<product> obj)
        {
            try
            {
                return _unitOfWork.productRepository.UpdateRange(obj);
                
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
                return _unitOfWork.productRepository.Delete(obj);
                
            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool DeleteRange(List<product> obj)
        {
            try
            {
                return _unitOfWork.productRepository.DeleteRange(obj);
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
