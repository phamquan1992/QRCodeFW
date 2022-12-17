using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using qcglobal.Core.Domain;
using qcglobal.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace qcglobal.FEW.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class departmentController : ControllerBase
    {
        private readonly IdepartmentService _IdepartmentService;
        public departmentController(IdepartmentService departmentService)
        {
            _IdepartmentService = departmentService;
        }
        [HttpGet]
        public async Task<List<department>> Get()
        {
            List<department> list = new List<department>();
            var data = await Task.FromResult(_IdepartmentService.GetAll());
            if (data != null && data.Count() > 0)
            {
                list = data.ToList();
            }
            return list;
        }
        [HttpPost]
        [Route("Add")]
        public async Task<IActionResult> Add([FromBody] department department_up)
        {
            string result = "Success";
            try
            {
                var check_obj = await Task.FromResult(_IdepartmentService.GetbyCode(department_up.departmentcode));
                if (check_obj != null)
                {
                    result = "AnyObj";
                    return Ok(new { result });
                }
                department department_it = new department();
                department_it.branchid = department_up.branchid;
                department_it.departmentcode = department_up.departmentcode;
                department_it.departmentname = department_up.departmentname;
                department_it.description = department_up.description;
                department_it.isactive = department_up.isactive;
                department_it.created_by = 1;              
                department_it.created_date = DateTime.Now;
                var check = _IdepartmentService.CreateNew(department_it);
                if (!check)
                {
                    result = "ErrorAdd";
                }
                return Ok(new { result });
            }
            catch (Exception ex)
            {
                result = "Error";
                return Ok(new { result });
            }
        }
        [HttpPut]
        [Route("Update")]
        public async Task<IActionResult> Update([FromBody] department department_up)
        {
            string result = "Success";
            try
            {
                var department_it = await Task.FromResult(_IdepartmentService.GetAll().FirstOrDefault(t => t.id == department_up.id));
                department_it.branchid = department_up.branchid;
                department_it.departmentcode = department_up.departmentcode;
                department_it.departmentname = department_up.departmentname;
                department_it.description = department_up.description;
                department_it.isactive = department_up.isactive;
                department_it.last_updated_by = 1;
                department_it.last_updated_date = DateTime.Now;
                var check = _IdepartmentService.Update(department_it);
                if (!check)
                {
                    result = "ErrorUpdate";
                }
                return Ok(new { result });
            }
            catch (Exception ex)
            {
                result = "Error";
                return Ok(new { result });
            }
        }
        [HttpPut]
        [Route("ChangeStatus")]
        public bool UpdateStatus([FromBody] department[] departments)
        {
            return _IdepartmentService.UpdateRange(departments.ToList());
        }
        [HttpDelete]
        [Route("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            string result = "Success";
            try
            {
                var department_it = await Task.FromResult(_IdepartmentService.GetAll().FirstOrDefault(t => t.id == id));

                var check = _IdepartmentService.Delete(department_it);
                if (!check)
                {
                    result = "ErrorDelete";
                }
                return Ok(new { result });
            }
            catch (Exception ex)
            {
                result = "Error";
                return Ok(new { result });
            }
        }
        [HttpDelete]
        [Route("Delete")]
        public async Task<IActionResult> Delete([FromBody] decimal[] ids)
        {
            string result = "Success";
            try
            {
                List<department> data = new List<department>();
                data = await Task.FromResult(_IdepartmentService.GetAll().Where(t => ids.Contains(t.id)).ToList());
                var check = _IdepartmentService.DeleteRange(data);
                if (!check)
                {
                    result = "ErrorDelete";
                }
                return Ok(new { result });
            }
            catch (Exception ex)
            {
                result = "Error";
                return Ok(new { result });
            }
        }
    }
}
