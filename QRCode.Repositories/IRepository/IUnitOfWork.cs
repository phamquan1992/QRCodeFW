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
        IuserdataRepository userdataRepository { get; }
        Iqr_enterpriseRepository qr_enterpriseRepository { get; }
        Iqr_paymentRepository qr_paymentRepository { get; }
        Iqr_gencodeRepository qr_gencodeRepository { get; }
        IsectorsRepository sectorsRepository { get; }
        Iqr_his_scanRepository qr_his_scanRepository { get; }
        void Commit();
        void Rollback();
    }
}
