using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
    public class gencodeController : ControllerBase
    {
        private readonly Iqr_gencodeService _Iqr_gencodeService;
        private readonly Iqr_enterpriseService _Iqr_enterpriseService;
        private readonly Iqr_paymentService _Iqr_paymentService;
        private readonly Iqr_surveyService _Iqr_surveyService;
        private readonly IproductService _IproductService;

        public gencodeController(Iqr_gencodeService qr_gencodeService, Iqr_enterpriseService qr_enterpriseService,
            Iqr_paymentService qr_paymentService, IproductService productService, Iqr_surveyService qr_surveyService)
        {
            _Iqr_gencodeService = qr_gencodeService;
            _Iqr_enterpriseService = qr_enterpriseService;
            _Iqr_paymentService = qr_paymentService;
            _IproductService = productService;
            _Iqr_surveyService = qr_surveyService;
        }
        [HttpGet]
        [Route("list/{userid}")]
        public async Task<List<gencodeview>> Get(int userid)
        {
            var data = new List<gencodeview>();
            data = await Task.FromResult(Listgencode(userid));
            return data;
        }
        [HttpGet]
        [Route("checkobj")]
        public bool CheckObject(int id, string type)
        {
            bool result = false;
            var list = _Iqr_gencodeService.GetAll();
            if (list != null && list.Count() > 0)
            {
                result = list.Any(t => t.typecode == type && t.dataid == id);
            }
            return result;
        }
        [HttpGet]
        [Route("getlist")]
        public List<decimal> GetListID(string type, int userid)
        {
            List<decimal> list_id = new List<decimal>();
            var list_gencode = _Iqr_gencodeService.GetAll().Where(t => t.created_by == userid && t.typecode == type);
            if (list_gencode != null && list_gencode.Count() > 0)
            {
                list_id = list_gencode.Select(t => t.dataid).ToList();
            }
            return list_id;
        }
        private List<gencodeview> Listgencode(int userid)
        {
            var list_payment = _Iqr_paymentService.GetAll().Where(t => t.created_by == userid).ToList();
            var list_enterprise = _Iqr_enterpriseService.GetAll().Where(t => t.created_by == userid);
            var list_product = _IproductService.GetAll().Where(t => t.created_by == userid);
            var list_survey = _Iqr_surveyService.GetAll().Where(t => t.created_by == userid);
            var list_gencode = _Iqr_gencodeService.GetAll().Where(t => t.created_by == userid);
            var list_gen_product = new List<gencodeview>();
            var list_gen_enterprise = new List<gencodeview>();
            var list_gen_survey = new List<gencodeview>();
            try
            {
                list_gen_product = (from a in list_payment
                                    from b in list_gencode
                                    from c in list_product
                                    where a.qrpaymentid == b.qrpaymentid && b.dataid == c.qrproductid
                                    select new gencodeview
                                    {
                                        create_date_qr = b.created_date.Value,
                                        exp_date = a.created_date.Value.AddYears(1),
                                        qr_img = b.image,
                                        qr_name = b.name,
                                        qr_obj_name = c.name,
                                        qr_obj_url = "/portal/products/edit/" + b.dataid,
                                        qr_tpye = b.typecode,
                                        status_pack = a.created_date.Value.AddYears(1) > DateTime.Now.Date ? "Chưa hết hạn" : "Hết hạn",
                                        status_qr = b.status == 1 ? "Kích hoạt" : "Huỷ kích hoạt",
                                        qrgencodeid = b.qrgencodeid,
                                        pack_name = a.packname,
                                        qr_code = b.code,
                                        qrpaymentid = (int)a.qrpaymentid

                                    }).ToList();

                list_gen_enterprise = (from a in list_payment
                                       from b in list_gencode
                                       from c in list_enterprise
                                       where a.qrpaymentid == b.qrpaymentid && b.dataid == c.qrenterpriseid
                                       select new gencodeview
                                       {
                                           create_date_qr = b.created_date.Value,
                                           exp_date = a.created_date.Value.AddYears(1),
                                           qr_img = b.image,
                                           qr_name = b.name,
                                           qr_obj_name = c.name,
                                           qr_obj_url = "/portal/companies/edit/" + b.dataid,
                                           qr_tpye = b.typecode,
                                           status_pack = a.created_date.Value.AddYears(1) >= DateTime.Now.Date ? "Chưa hết hạn" : "Hết hạn",
                                           status_qr = b.status == 1 ? "Kích hoạt" : "Huỷ kích hoạt",
                                           qrgencodeid = b.qrgencodeid,
                                           pack_name = a.packname,
                                           qr_code = b.code,
                                           qrpaymentid = (int)a.qrpaymentid
                                       }).ToList();
                list_gen_product.AddRange(list_gen_enterprise);
                list_gen_survey = (from a in list_payment
                                   from b in list_gencode
                                   from c in list_survey
                                   where a.qrpaymentid == b.qrpaymentid && b.dataid == c.qrsurveyid
                                   select new gencodeview
                                   {
                                       create_date_qr = b.created_date.Value,
                                       exp_date = a.created_date.Value.AddYears(1),
                                       qr_img = b.image,
                                       qr_name = b.name,
                                       qr_obj_name = c.name,
                                       qr_obj_url = "/portal/companies/edit/" + b.dataid,
                                       qr_tpye = b.typecode,
                                       status_pack = a.created_date.Value.AddYears(1) >= DateTime.Now.Date ? "Chưa hết hạn" : "Hết hạn",
                                       status_qr = b.status == 1 ? "Kích hoạt" : "Huỷ kích hoạt",
                                       qrgencodeid = b.qrgencodeid,
                                       pack_name = a.packname,
                                       qr_code = b.code,
                                       qrpaymentid = (int)a.qrpaymentid
                                   }).ToList();
                list_gen_product.AddRange(list_gen_survey);
            }
            catch (Exception ex)
            {

                throw;
            }

            return list_gen_product;
        }
        [HttpGet]
        [Route("list2")]
        public List<gencodeview> Listgencode2(string id, string loaisp, string goidv)
        {
            return new List<gencodeview>();
        }
        [HttpPost]
        [Route("Add")]
        public bool CreateNew([FromBody] qr_gencode model)
        {
            qr_gencode temp = new qr_gencode();
            temp.code = model.code;
            temp.created_by = model.created_by;
            temp.created_date = DateTime.Now;
            temp.dataid = model.dataid;
            temp.image = model.image;
            temp.name = model.name;
            temp.qrpaymentid = model.qrpaymentid;
            temp.status = 1;
            temp.typecode = model.typecode;
            return _Iqr_gencodeService.CreateNew(temp);
        }
        [HttpPost, DisableRequestSizeLimit]
        public async Task<IActionResult> Upload()
        {
            try
            {
                Helper helper = new Helper();
                var formCollection = await Request.ReadFormAsync();
                var file = formCollection.Files.First();
                var folderName = helper.path_file("gencode");
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
        [HttpPut]
        [Route("ChangeActive")]
        public bool ChangeStatus([FromBody] List<gencode_status> data)
        {
            var obj_update = data.FirstOrDefault();
            var list_id = data.Select(t => t.qrgencodeid).ToList();
            var list = _Iqr_gencodeService.GetAll().Where(t => list_id.Contains(t.qrgencodeid)).ToList();
            list.ForEach(t =>
            {
                t.status = obj_update.status;
                t.lastcreated_by = obj_update.userid;
                t.lastcreated_date = DateTime.Now;
            });
            return _Iqr_gencodeService.UpdateRange(list);
        }
        [HttpPut]
        [Route("SyncPay")]
        public bool SyncPay([FromBody] List<gencode_status> list)
        {
            var list_gen = _Iqr_gencodeService.GetAll();
            List<qr_gencode> data = new List<qr_gencode>();
            foreach (var item in list)
            {
                qr_gencode it = new qr_gencode();
                it = list_gen.FirstOrDefault(t => t.qrgencodeid == item.qrgencodeid);
                it.qrpaymentid = item.qrpaymentid;
                it.lastcreated_by = item.userid;
                it.lastcreated_date = DateTime.Now;
                data.Add(it);
            }
            return _Iqr_gencodeService.UpdateRange(data);
        }
        [HttpGet]
        [Route("CheckCount/{paymentid}")]
        public bool Checkcount(int paymentid)
        {
            var pay_obj = _Iqr_paymentService.GetAll().FirstOrDefault(t => t.qrpaymentid == paymentid);
            int soluong_ma = 0;
            switch (pay_obj.packcode)
            {
                case "Pack1":
                    soluong_ma = 5;
                    break;
                case "Pack2":
                    soluong_ma = 10;
                    break;
                case "Pack3":
                    soluong_ma = 20;
                    break;
            }

            var count_gencode = _Iqr_gencodeService.GetAll().Where(t => t.qrpaymentid == paymentid && t.status == 1).Count();
            return count_gencode < soluong_ma;
        }
        [HttpGet]
        [Route("CountObject/{id}")]
        public count_obj CountObj(int id)
        {
            var product = _IproductService.GetAll().Where(t => t.created_by == id).Count();
            var enterprise = _Iqr_enterpriseService.GetAll().Where(t => t.created_by == id).Count();
            var payment = _Iqr_paymentService.GetAll().Where(t => t.created_by == id).Count();
            var gencode = _Iqr_gencodeService.GetAll().Where(t => t.created_by == id).Count();
            var survey = _Iqr_surveyService.GetAll().Where(t => t.created_by == id).Count();
            count_obj _obj = new count_obj();
            _obj.count_enterprise = enterprise;
            _obj.count_gencode = gencode;
            _obj.count_payment = payment;
            _obj.count_product = product;
            _obj.count_survey = survey;
            return _obj;
        }
    }
}
