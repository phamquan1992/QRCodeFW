using QRCode.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QRCode.Services.ISerivce
{
    public interface IuserdataService
    {
        IQueryable<userdata> GetAll();
        bool CreateNew(userdata obj);
        bool Update(userdata obj);
        bool Delete(userdata obj);
    }
}
