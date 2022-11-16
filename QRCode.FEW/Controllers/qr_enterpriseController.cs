using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QRCode.Core.Domain;
using QRCode.FEW.Extensions.Common;
using QRCode.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace QRCode.FEW.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class qr_enterpriseController : ControllerBase
    {
        private readonly Iqr_enterpriseService _Iqr_enterpriseService;
        private readonly IlocationService _IlocationService;
        public qr_enterpriseController(Iqr_enterpriseService qr_enterpriseService, IlocationService locationService)
        {
            _Iqr_enterpriseService = qr_enterpriseService;
            _IlocationService = locationService;
        }
        [HttpGet]
        [Route("list")]
        public async Task<List<qr_enterprise>> GetTinhs()
        {
            var data = await Task.FromResult(GetCongty());
            return data;
        }
        [HttpGet]
        [Route("Check401")]
        public bool Check401()
        {
            return true;
        }
        [HttpGet]
        [Route("object/{id}")]
        public async Task<qr_enterprise> GetObject(long id)
        {
            var object_data = new qr_enterprise();
            var temp_data = GetCongty().FirstOrDefault(t => t.qrenterpriseid == id);
            if (temp_data != null)
                object_data = await Task.FromResult(temp_data);
            return object_data;
        }
        [HttpPost]
        [Route("add")]
        public bool CreateNew([FromBody] qr_enterprise qr_model)
        {
            try
            {
                qr_enterprise model = new qr_enterprise();
                model.additional = qr_model.additional;
                model.address = qr_model.address;
                model.district = qr_model.district;
                model.email = qr_model.email;
                model.fax = qr_model.fax;
                model.logo = qr_model.logo;
                model.name = qr_model.name;
                model.nation = qr_model.nation;
                model.occupation = qr_model.occupation;
                model.province = qr_model.province;
                model.taxcode = qr_model.taxcode;
                model.tel = qr_model.tel;
                model.wards = qr_model.wards;
                model.sectors_code = qr_model.sectors_code;
                model.url_background = qr_model.url_background;
                model.url_img = qr_model.url_img;
                model.url_video = qr_model.url_video;
                model.created_by = qr_model.created_by;
                model.created_date = DateTime.Now;
                return _Iqr_enterpriseService.CreateNew(model);
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        [HttpPut]
        [Route("update")]
        public bool Update([FromBody] qr_enterprise qr_model)
        {
            try
            {
                var model = _Iqr_enterpriseService.GetAll().FirstOrDefault(t => t.qrenterpriseid == qr_model.qrenterpriseid);
                model.additional = qr_model.additional;
                model.address = qr_model.address;
                model.district = qr_model.district;
                model.email = qr_model.email;
                model.fax = qr_model.fax;
                model.logo = qr_model.logo;
                model.name = qr_model.name;
                model.nation = qr_model.nation;
                model.occupation = qr_model.occupation;
                model.province = qr_model.province;
                model.taxcode = qr_model.taxcode;
                model.tel = qr_model.tel;
                model.wards = qr_model.wards;
                model.sectors_code = qr_model.sectors_code;
                model.url_background = qr_model.url_background;
                model.url_img = qr_model.url_img;
                model.url_video = qr_model.url_video;
                model.lastcreated_by = qr_model.lastcreated_by;
                model.lastcreated_date = DateTime.Now;
                return _Iqr_enterpriseService.Update(model);
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        [HttpDelete]
        [Route("Delete")]
        public bool Delete([FromBody] decimal[] ids)
        {
            List<qr_enterprise> data = new List<qr_enterprise>();
            data = _Iqr_enterpriseService.GetAll().Where(t => ids.Contains(t.qrenterpriseid)).ToList();
            _Iqr_enterpriseService.DeleteRange(data);
            return true;
        }
        [HttpDelete]
        [Route("Delete/{id}")]
        public bool Delete(decimal id)
        {
            var data = _Iqr_enterpriseService.GetAll().FirstOrDefault(t => t.qrenterpriseid == id);
            return _Iqr_enterpriseService.Delete(data);
        }
        [HttpPut]
        [Route("ChangeStatus")]
        public bool UpdateStatus([FromBody] qr_enterprise[] enterprise)
        {
            _Iqr_enterpriseService.UpdateRange(enterprise.ToList());
            return true;
        }
        [HttpGet]
        [Route("location/{id}")]
        public async Task<List<location>> GetHuyens(string id)
        {
            var data = await Task.FromResult(GetData(id));
            return data;
        }
        private List<location> GetData(string par)
        {
            return _IlocationService.GetAll().Where(t => t.parent == par).OrderBy(t => t.orderidx).ToList();
        }
        private List<qr_enterprise> GetCongty()
        {
            return _Iqr_enterpriseService.GetAll().ToList();
        }
        [HttpPost, DisableRequestSizeLimit]
        public async Task<IActionResult> Upload()
        {
            try
            {
                Helper helper = new Helper();
                var formCollection = await Request.ReadFormAsync();
                var file = formCollection.Files.First();
                var folderName = helper.path_file("enterprise");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);
                    dbPath = dbPath.Replace("\\", "/");
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    dbPath = "./assets" + dbPath.Split("assets")[1];
                    return Ok(new { dbPath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
    }
}
