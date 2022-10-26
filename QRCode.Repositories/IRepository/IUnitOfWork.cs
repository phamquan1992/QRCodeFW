using System;
using System.Collections.Generic;
using System.Text;

namespace QRCode.Repositories.IRepository
{
    public interface IUnitOfWork
    {
        IproductRepository productRepository { get; }
        void Commit();
        void Rollback();
    }
}
