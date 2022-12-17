using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using qcglobal.Core.Domain;
using qcglobal.Core.Domain2;
using qcglobal.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace qcglobal.FEW.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class branchController : ControllerBase
    {
        private readonly IbranchService _IbranchService;
        public branchController(IbranchService branchService)
        {
            _IbranchService = branchService;
        }
        [HttpGet]
        public async Task<List<branch>> Get()
        {
            List<branch> data = new List<branch>();
            var list = await Task.FromResult(_IbranchService.GetAll());
            if (list != null && list.Count() > 0)
                data = list.ToList();
            return data;
        }

        [HttpGet]
        [Route("GetByID/{id}")]
        public async Task<IActionResult> GetbyID(int id)
        {
            resultobj result = new resultobj();
            var model_tmp = await Task.FromResult(_IbranchService.GetbyID(id));
            if (model_tmp != null)
            {
                result.ketqua = "Success";
                result.data = model_tmp;
            }
            else
            {
                result.ketqua = "Notdata";
            }
            return Ok(result);
        }
        [HttpPost]
        [Route("Add")]
        public async Task<IActionResult> Add([FromBody] branch branch_up)
        {
            string result = "Success";
            try
            {
                var check_obj = await Task.FromResult(_IbranchService.GetbyCode(branch_up.branchcode));
                if (check_obj != null)
                {
                    result = "AnyObj";
                    return Ok(new { result });
                }
                branch branch_it = new branch();
                branch_it.address = branch_up.address;
                branch_it.branchcode = branch_up.branchcode;
                branch_it.branchid = branch_up.branchid;
                branch_it.branchname = branch_up.branchname;
                branch_it.description = branch_up.description;
                branch_it.created_by = branch_up.created_by;
                branch_it.isactive = branch_up.isactive;
                branch_it.created_date = DateTime.Now;
                var check = _IbranchService.CreateNew(branch_it);
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
        public async Task<IActionResult> Update([FromBody] branch branch_up)
        {
            string result = "Success";
            try
            {
                var branch_it = await Task.FromResult(_IbranchService.GetAll().FirstOrDefault(t => t.id == branch_up.id));
                branch_it.address = branch_up.address;
                branch_it.branchcode = branch_up.branchcode;
                branch_it.branchid = branch_up.branchid;
                branch_it.branchname = branch_up.branchname;
                branch_it.description = branch_up.description;
                branch_it.last_updated_by = 1;
                branch_it.isactive = branch_up.isactive;
                branch_it.last_updated_date = DateTime.Now;
                var check = _IbranchService.Update(branch_it);
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
        public bool UpdateStatus([FromBody] branch[] branchs)
        {
            return _IbranchService.UpdateRange(branchs.ToList());
        }
        [HttpDelete]
        [Route("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            string result = "Success";
            try
            {
                var branch_it = await Task.FromResult(_IbranchService.GetAll().FirstOrDefault(t => t.id == id));

                var check = _IbranchService.Delete(branch_it);
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
                List<branch> data = new List<branch>();
                data = await Task.FromResult(_IbranchService.GetAll().Where(t => ids.Contains(t.id)).ToList());
                var check = _IbranchService.DeleteRange(data);
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
