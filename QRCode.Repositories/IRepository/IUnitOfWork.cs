using System;
using System.Collections.Generic;
using System.Text;

namespace QRCode.Repositories.IRepository
{
    public interface IUnitOfWork
    {
        IproductRepository productRepository { get; }
        IlocationRepository locationRepository { get; }
        IcategoryRepository categoryRepository { get; }
        Iqr_enterpriseRepository qr_enterpriseRepository { get; }
        void Commit();
        void Rollback();
    }
}
