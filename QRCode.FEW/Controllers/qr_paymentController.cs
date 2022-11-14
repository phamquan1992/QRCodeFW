using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QRCode.Core.Domain;
using QRCode.Core.Domain2;
using QRCode.FEW.Extensions.Common;
using QRCode.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QRCode.FEW.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class qr_paymentController : ControllerBase
    {
        private readonly Iqr_paymentService _Iqr_paymentService;
        private readonly IuserdataService _IuserdataService;
        private readonly Iqr_enterpriseService _Iqr_enterpriseService;
        public qr_paymentController(Iqr_paymentService qr_paymentService, IuserdataService userdataService, Iqr_enterpriseService qr_enterpriseService)
        {
            _Iqr_paymentService = qr_paymentService;
            _IuserdataService = userdataService;
            _Iqr_enterpriseService = qr_enterpriseService;
        }
        [HttpGet]
        [Route("Getpack")]
        public List<package_objet> GetPackage_Objets()
        {
            Helper helper = new Helper();
            return helper.GetPackage_Objets();
        }
        private DateTime get_exptime(DateTime startdate)
        {
            DateTime tmp = startdate.AddYears(1);
            return tmp;
        }
        [HttpGet]
        [Route("Checkpay")]
        public bool Checkpay(int userid, string packcode)
        {
            bool check = false;
            var list_pay = _Iqr_paymentService.GetAll();
            if (list_pay != null && list_pay.Count() > 0)
                check = list_pay.Any(t => t.userid == userid && t.packcode == packcode && t.payment_date != null && t.payment_date.Value <= DateTime.Now.Date && DateTime.Now.Date <= get_exptime(t.payment_date.Value));
            return check;
        }
        [HttpGet]
        [Route("GetListPay/{userid}")]
        public List<qr_payment> GetListbyUser(int userid)
        {
            List<qr_payment> data = new List<qr_payment>(); ;
            var list_pay = _Iqr_paymentService.GetAll();
            if (list_pay != null && list_pay.Count() > 0)
            {
                list_pay = list_pay.Where(t => t.userid == userid && t.payment_date != null && t.payment_date.Value <= DateTime.Now.Date);
                if (list_pay.Count() > 0)
                {
                    data = list_pay.ToList();
                    data = data.Where(t => DateTime.Now.Date <= get_exptime(t.payment_date.Value)).ToList();
                }

            }
            return data;
        }
        [HttpPost]
        [Route("Add")]
        public bool Add([FromBody] qr_payment model)
        {
            try
            {
                qr_payment obj = new qr_payment();
                obj.created_by = model.created_by;
                obj.created_date = DateTime.Now;
                obj.packcode = model.packcode;
                obj.packname = GetPackage_Objets().FirstOrDefault(t => t.packcode == model.packcode).packname;
                obj.qrenterpriseid = model.qrenterpriseid;
                return _Iqr_paymentService.CreateNew(obj);
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        [HttpPut]
        [Route("Active")]
        public bool Update([FromBody] qr_payment model)
        {
            try
            {
                qr_payment obj = new qr_payment();
                obj = _Iqr_paymentService.GetAll().FirstOrDefault(t => t.qrpaymentid == model.qrpaymentid);
                obj.payment_date = DateTime.Now;
                obj.lastcreated_by = model.lastcreated_by;
                obj.lastcreated_date = DateTime.Now;
                return _Iqr_paymentService.Update(obj);
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
