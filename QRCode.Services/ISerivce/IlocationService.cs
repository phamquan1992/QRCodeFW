using QRCode.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QRCode.Services.ISerivce
{
    public interface IlocationService
    {
        IQueryable<location> GetAll();
        bool CreateNew(location obj);
        bool Update(location obj);
        bool Delete(location obj);
        location Getbyma(string ma);
    }
}
