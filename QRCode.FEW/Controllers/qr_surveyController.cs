using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using QRCode.Core.Domain;
using QRCode.Core.Domain2;
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
    public class qr_surveyController : ControllerBase
    {
        private readonly Iqr_surveyService _Iqr_surveyService;
        public qr_surveyController(Iqr_surveyService qr_surveyService)
        {
            _Iqr_surveyService = qr_surveyService;
        }
        [HttpPost]
        [Route("AddNew")]
        public async Task<IActionResult> CreateNew([FromBody] qr_survey model)
        {
            try
            {
                qr_survey item = new qr_survey();

                item.code = model.code;
                item.created_by = model.created_by;
                item.created_date = DateTime.Now;
                item.start_date = model.start_date.Value.Date <= new DateTime(1970, 1, 1) ? (DateTime?)null : model.start_date.Value.Date;
                item.end_date = model.end_date.Value.Date <= new DateTime(1970, 1, 1) ? (DateTime?)null : model.end_date.Value.Date.AddDays(1).AddSeconds(-1);
                item.name = model.name;
                item.status = true;
                var insert_img = addImg(model.additional);
                if (!insert_img)
                {
                    var resul_objet = new
                    {
                        result = "ErrorImg"
                    };
                    return Ok(resul_objet);
                }
                item.additional = model.additional.Replace("assets/qr_image/survey_tmp", "assets/qr_image/survey");
                bool kq = await Task.FromResult(_Iqr_surveyService.CreateNew(item));
                if (kq)
                {
                    var resul_objet = new
                    {
                        result = "Success"
                    };
                    return Ok(resul_objet);
                }
                else
                {
                    var resul_objet = new
                    {
                        result = "ErrorIns"
                    };
                    return Ok(resul_objet);
                }
            }
            catch (Exception ex)
            {
                var resul_objet = new
                {
                    result = "ErrorEx",
                    error = ex.Message
                };
                return Ok(resul_objet);
            }

        }

        [HttpPut]
        [Route("Update")]
        public async Task<IActionResult> Update([FromBody] qr_survey model)
        {
            try
            {
                var data = _Iqr_surveyService.GetAll().FirstOrDefault(t => t.qrsurveyid == model.qrsurveyid);
                data.start_date = model.start_date.Value.Date <= new DateTime(1970, 1, 1) ? (DateTime?)null : model.start_date.Value.Date;
                data.end_date = model.end_date.Value.Date <= new DateTime(1970, 1, 1) ? (DateTime?)null : model.end_date.Value.Date.AddDays(1).AddSeconds(-1);
                data.code = model.code;
                data.lastcreated_by = model.lastcreated_by;
                data.lastcreated_date = DateTime.Now;
                data.name = model.name;
                var insert_img = addImg(model.additional);
                if (!insert_img)
                {
                    var resul_objet = new
                    {
                        result = "ErrorImg"
                    };
                    return Ok(resul_objet);
                }
                data.additional = model.additional.Replace("assets/qr_image/survey_tmp", "assets/qr_image/survey");
                bool kq = await Task.FromResult(_Iqr_surveyService.Update(data));
                if (kq)
                {
                    var resul_objet = new
                    {
                        result = "Success"
                    };
                    return Ok(resul_objet);
                }
                else
                {
                    var resul_objet = new
                    {
                        result = "ErrorUpd"
                    };
                    return Ok(resul_objet);
                }
            }
            catch (Exception ex)
            {
                var resul_objet = new
                {
                    result = "ErrorEx",
                    error = ex.Message
                };
                return Ok(resul_objet);
            }
        }
        private bool addImg(string data)
        {
            List<string> listurl = new List<string>();
            JArray array = JArray.Parse(data);
            try
            {
                var list = array.ToObject<List<cauhoi>>().Where(t => t.type == "images");
                var list_elemnent = list.Select(t => t.element);
                foreach (var item in list_elemnent)
                {
                    foreach (var item2 in item)
                    {
                        if (item2.value.Contains("/assets/qr_image/" + FORDERConstant.survey_tmp + "/"))
                        {
                            setImg("", item2.value);
                        }
                    }
                }
                return true;
            }
            catch (Exception)
            {
                return false;
            }


        }
        private string setImg(string imgOld, string inputSrc)
        {
            Helper helper = new Helper();
            string gt = helper.CopyFileImg(imgOld, inputSrc, FORDERConstant.survey_tmp, FORDERConstant.survey);
            if (string.IsNullOrEmpty(gt))
                return imgOld;
            return gt;
        }
        [HttpPut]
        [Route("KichHoat")]
        public bool Active([FromBody] qr_survey model)
        {
            try
            {
                var data = _Iqr_surveyService.GetAll().FirstOrDefault(t => t.qrsurveyid == model.qrsurveyid);
                data.start_date = model.start_date;
                data.end_date = model.end_date;
                data.lastcreated_by = model.lastcreated_by;
                data.lastcreated_date = DateTime.Now;
                return _Iqr_surveyService.Update(data);
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        [HttpPost, DisableRequestSizeLimit]
        public async Task<IActionResult> Upload()
        {
            try
            {
                Helper helper = new Helper();
                var formCollection = await Request.ReadFormAsync();
                var file = formCollection.Files.First();
                var folderName = helper.path_file(FORDERConstant.survey_tmp);
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var filearr = fileName.Split('.');
                    string duoifile = filearr[filearr.Length - 1];
                    string tenfile = FORDERConstant.survey + DateTime.Now.ToString("yyyyMMddHHmmss");
                    fileName = tenfile + "." + duoifile;
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
        [HttpGet]
        [Route("GetObject/{id}")]
        public async Task<survey_view> GetOject(int id)
        {
            var list_cauhoi = new List<cauhoi>();
            var objec_edit = await Task.FromResult(_Iqr_surveyService.GetAll().FirstOrDefault(t => t.qrsurveyid == id));
            survey_view object_view = new survey_view();
            object_view.object_edit = objec_edit;
            var array = JArray.Parse(objec_edit.additional);
            list_cauhoi = array.ToObject<List<cauhoi>>();
            object_view.list_cauhoi = list_cauhoi;
            return object_view;
        }
        [HttpGet]
        [Route("list/{id}")]
        public async Task<List<survey_view>> Getlist(int id)
        {
            List<survey_view> listview = new List<survey_view>();
            var list = _Iqr_surveyService.GetAll().Where(t => t.created_by == id).ToList();
            listview = await Task.FromResult(get_list(list));
            return listview;
        }
        private List<survey_view> get_list(List<qr_survey> data)
        {
            List<survey_view> listview = new List<survey_view>();
            listview = (from a in data
                        select new survey_view
                        {
                            object_edit = a,
                            list_cauhoi = GetCauhois(a.additional)
                        }).ToList();
            return listview;
        }
        private List<cauhoi> GetCauhois(string data)
        {
            var list_cauhoi = new List<cauhoi>();
            var array = JArray.Parse(data);
            list_cauhoi = array.ToObject<List<cauhoi>>();
            return list_cauhoi;
        }
    }
}
