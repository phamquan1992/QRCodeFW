using NHibernate;
using QRCode.Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace QRCode.Repositories.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        public IproductRepository productRepository { get; }
        public IlocationRepository locationRepository { get; }
        public IcategoryRepository categoryRepository { get; }
        public Iqr_enterpriseRepository qr_enterpriseRepository { get; }
        public IuserdataRepository userdataRepository { get; }
        private readonly ISessionFactory _sessionFactory;
        private readonly ITransaction _transaction;
        public ISession Session { get; private set; }
        public UnitOfWork(ISessionFactory sessionFactory, IproductRepository productRepository, IlocationRepository locationRepository, IcategoryRepository categoryRepository,
            Iqr_enterpriseRepository qr_enterpriseRepository, IuserdataRepository userdataRepository)
        {
            this._sessionFactory = sessionFactory;
            this.Session = _sessionFactory.OpenSession();
            this.Session.FlushMode = FlushMode.Auto;
            if (!Session.IsOpen && Session.Connection.State != ConnectionState.Open)
                this.Session = _sessionFactory.OpenSession();
            this._transaction = Session.BeginTransaction(IsolationLevel.ReadCommitted);
            this.productRepository = productRepository;
            this.locationRepository = locationRepository;
            this.categoryRepository = categoryRepository;
            this.qr_enterpriseRepository = qr_enterpriseRepository;
            this.userdataRepository = userdataRepository;
        }
        public void Dispose()
        {
            if (Session.IsOpen)
            {
                Session.Close();
            }
        }

        public void Commit()
        {
            if (!_transaction.IsActive)
            {
                throw new InvalidOperationException("No active transation");
            }

            _transaction.Commit();
        }

        public void Rollback()
        {
            if (_transaction.IsActive)
            {
                _transaction.Rollback();
            }
        }
    }
}
