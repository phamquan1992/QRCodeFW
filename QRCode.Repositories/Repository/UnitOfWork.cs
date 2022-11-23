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
        public Iqr_paymentRepository qr_paymentRepository { get; }
        public Iqr_gencodeRepository qr_gencodeRepository { get; }
        public IsectorsRepository sectorsRepository { get; }
        public Iqr_surveyRepository qr_surveyRepository { get; }
        public Iqr_his_scanRepository qr_his_scanRepository { get; }
        private readonly ISessionFactory _sessionFactory;
        private readonly ITransaction _transaction;
        public ISession Session { get; private set; }
        public UnitOfWork(ISessionFactory sessionFactory, IproductRepository productRepository, IlocationRepository locationRepository, IcategoryRepository categoryRepository,
            Iqr_enterpriseRepository qr_enterpriseRepository, IuserdataRepository userdataRepository, Iqr_paymentRepository qr_paymentRepository, Iqr_gencodeRepository qr_gencodeRepository,
            IsectorsRepository sectorsRepository, Iqr_his_scanRepository qr_his_scanRepository, Iqr_surveyRepository qr_surveyRepository)
        {
            this._sessionFactory = sessionFactory;
            this.Session = _sessionFactory.OpenSession();
            this.Session.FlushMode = FlushMode.Auto;
            if (!Session.IsOpen && Session.Connection.State != ConnectionState.Open)
            {
                this.Session = _sessionFactory.OpenSession();
            }

            this._transaction = Session.BeginTransaction(IsolationLevel.ReadCommitted);
            this.productRepository = productRepository;
            this.locationRepository = locationRepository;
            this.categoryRepository = categoryRepository;
            this.qr_enterpriseRepository = qr_enterpriseRepository;
            this.userdataRepository = userdataRepository;
            this.qr_paymentRepository = qr_paymentRepository;
            this.qr_gencodeRepository = qr_gencodeRepository;
            this.sectorsRepository = sectorsRepository;
            this.qr_his_scanRepository = qr_his_scanRepository;
            this.qr_surveyRepository = qr_surveyRepository;
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
