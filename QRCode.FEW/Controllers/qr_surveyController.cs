using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QRCode.Core.Domain;
using QRCode.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QRCode.FEW.Controllers
{
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
        public bool CreateNew([FromBody] qr_survey model)
        {
            try
            {
                qr_survey item = new qr_survey();
                item.additional = model.additional;
                item.code = model.code;
                item.created_by = model.created_by;
                item.created_date = DateTime.Now;
                item.name = model.name;
                item.status = true;
                return _Iqr_surveyService.CreateNew(item);
            }
            catch (Exception ex)
            {
                return false;
            }
            
        }
        [HttpPut]
        [Route("Update")]
        public bool Update([FromBody] qr_survey model)
        {
            try
            {
                var data = _Iqr_surveyService.GetAll().FirstOrDefault(t=>t.qrsurveyid==model.qrsurveyid);
                data.additional = model.additional;
                data.code = model.code;
                data.lastcreated_by = model.lastcreated_by;
                data.lastcreated_date = DateTime.Now;
                data.name = model.name;
                return _Iqr_surveyService.Update(data);
            }
            catch (Exception ex)
            {
                return false;
            }
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
    }
}
