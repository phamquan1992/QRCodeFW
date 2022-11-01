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

        public bool Add(T entity)
        {
            bool result = false;
            using (var transaction = _session.BeginTransaction())
            {
                try
                {
                    _session.Save(entity);
                    transaction.Commit();
                    result = true;
                }
                catch (Exception ex)
                {
                    if (!transaction.WasCommitted)
                    {
                        transaction.Rollback();
                    }
                    result = false;
                }
            }
            return result;
        }

        public bool AddRange(IEnumerable<T> entities)
        {
            bool result = false;
            using (var transaction = _session.BeginTransaction())
            {
                try
                {
                    foreach (T entity in entities)
                    {
                        _session.Save(entity);                        
                    }
                    transaction.Commit();
                    result = true;
                }
                catch (Exception ex)
                {
                    if (!transaction.WasCommitted)
                    {
                        transaction.Rollback();
                    }
                    result = false;
                }
            }
            return result;
        }

        public bool Update(T entity)
        {
            bool result = false;
            using (var transaction = _session.BeginTransaction())
            {
                try
                {
                    _session.Update(entity);
                    transaction.Commit();
                    result = true;
                }
                catch (Exception ex)
                {
                    if (!transaction.WasCommitted)
                    {
                        transaction.Rollback();
                    }
                    result = false;
                }
            }
            return result;
        }

        public bool UpdateRange(IEnumerable<T> entities)
        {
            bool result = false;
            using (var transaction = _session.BeginTransaction())
            {
                try
                {
                    foreach (T entity in entities)
                    {
                        _session.Update(entity);                        
                    }
                    transaction.Commit();
                    result = true;
                }
                catch (Exception ex)
                {
                    if (!transaction.WasCommitted)
                    {
                        transaction.Rollback();
                    }
                    result = false;
                }
                return result;
            }
        }

        public bool Delete(T entity)
        {
            bool result = false;
            using (var transaction = _session.BeginTransaction())
            {
                try
                {
                    _session.Delete(entity);
                    transaction.Commit();
                    result = true;
                }
                catch (Exception ex)
                {
                    if (!transaction.WasCommitted)
                    {
                        transaction.Rollback();
                    }
                    result = false;
                }
            }
            return result;
        }

        public bool DeleteRange(IEnumerable<T> entities)
        {
            bool result = false;
            using (var transaction = _session.BeginTransaction())
            {
                try
                {
                    foreach (T item in entities)
                    {
                        _session.Delete(item);                        
                    }
                    transaction.Commit();
                    result = true;
                }
                catch (Exception ex)
                {
                    if (!transaction.WasCommitted)
                    {
                        transaction.Rollback();
                    }

                    result = false;
                }
            }
            return result;
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
