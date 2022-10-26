using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace QRCode.Repositories.IRepository
{
    public interface IBaseRepository<T> where T : class
    {
        void Add(T entity);
        void AddRange(IEnumerable<T> entities);
        void Update(T entity);
        void UpdateRange(IEnumerable<T> entities);
        void Delete(T entity);
        void DeleteRange(IEnumerable<T> entities);

        IQueryable<T> GetAll();
        T FindBy(Expression<Func<T, bool>> expression);
        T FindBy(int id);
        IQueryable<T> FilterBy(Expression<Func<T, bool>> expression);
    }
}
