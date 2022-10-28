using QRCode.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QRCode.Services.ISerivce
{
    public interface IcategoryService
    {
        IQueryable<category> GetAll();
        bool CreateNew(category obj);
        bool Update(category obj);
        bool Delete(category obj);
    }
}
