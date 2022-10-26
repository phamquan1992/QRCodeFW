using NHibernate;
using QRCode.Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace QRCode.Repositories.Repository
{
    public class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        private readonly ISession _session;

        public BaseRepository(ISession session)
        {
            _session = session;
        }

        public void Add(T entity)
        {
            using (var transaction = _session.BeginTransaction())
            {
                try
                {
                    _session.Save(entity);
                    transaction.Commit();
                }
                catch (Exception)
                {
                    if (!transaction.WasCommitted)
                    {
                        transaction.Rollback();
                    }

                    throw;
                }
            }
        }

        public void AddRange(IEnumerable<T> entities)
        {
            using (var transaction = _session.BeginTransaction())
            {
                try
                {
                    foreach (T entity in entities)
                    {
                        _session.Save(entity);
                        transaction.Commit();
                    }
                }
                catch (Exception)
                {
                    if (!transaction.WasCommitted)
                    {
                        transaction.Rollback();
                    }

                    throw;
                }
            }
        }

        public void Update(T entity)
        {
            using (var transaction = _session.BeginTransaction())
            {
                try
                {
                    _session.Update(entity);
                    transaction.Commit();
                }
                catch (Exception)
                {
                    if (!transaction.WasCommitted)
                    {
                        transaction.Rollback();
                    }

                    throw;
                }
            }
        }

        public void UpdateRange(IEnumerable<T> entities)
        {
            using (var transaction = _session.BeginTransaction())
            {
                try
                {
                    foreach (T entity in entities)
                    {
                        _session.Update(entity);
                        transaction.Commit();
                    }
                }
                catch (Exception)
                {
                    if (!transaction.WasCommitted)
                    {
                        transaction.Rollback();
                    }

                    throw;
                }
            }
        }

        public void Delete(T entity)
        {
            using (var transaction = _session.BeginTransaction())
            {
                try
                {
                    _session.Delete(entity);
                    transaction.Commit();
                }
                catch (Exception)
                {
                    if (!transaction.WasCommitted)
                    {
                        transaction.Rollback();
                    }

                    throw;
                }
            }
        }

        public void DeleteRange(IEnumerable<T> entities)
        {
            using (var transaction = _session.BeginTransaction())
            {
                try
                {
                    foreach (T item in entities)
                    {
                        _session.Delete(item);
                        transaction.Commit();
                    }
                }
                catch (Exception)
                {
                    if (!transaction.WasCommitted)
                    {
                        transaction.Rollback();
                    }

                    throw;
                }
            }
        }

        public IQueryable<T> GetAll()
        {
            return _session.Query<T>();
        }

        public T FindBy(Expression<Func<T, bool>> expression)
        {
            return FilterBy(expression).Single();
        }

        public T FindBy(int id)
        {
            return _session.Get<T>(id);
        }

        public IQueryable<T> FilterBy(Expression<Func<T, bool>> expression)
        {
            return GetAll().Where(expression).AsQueryable();
        }
    }
}
