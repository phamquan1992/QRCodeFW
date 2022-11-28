using QRCode.Core.Domain;
using QRCode.Repositories.IRepository;
using QRCode.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QRCode.Services.ServiceImp
{
    public class locationService : IlocationService
    {
        private readonly IUnitOfWork _unitOfWork;
        public locationService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public IQueryable<location> GetAll()
        {
            return _unitOfWork.locationRepository.GetAll();
        }
        public location Getbyma(string ma)
        {
            return _unitOfWork.locationRepository.FindBy(t => t.code == ma);
        }
        public bool CreateNew(location obj)
        {
            try
            {
                return _unitOfWork.locationRepository.Add(obj);

            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool Update(location obj)
        {
            try
            {
                return _unitOfWork.locationRepository.Update(obj);

            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool Delete(location obj)
        {
            try
            {
                return _unitOfWork.locationRepository.Delete(obj);

            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
