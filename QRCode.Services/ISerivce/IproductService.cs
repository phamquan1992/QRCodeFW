using QRCode.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QRCode.Services.ISerivce
{
    public interface IproductService
    {
        IQueryable<product> GetAll();
        bool CreateNew(product obj);
        bool Update(product obj);
        bool Delete(product obj);
    }
}
