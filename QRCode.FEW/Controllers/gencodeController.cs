using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class gencodeController : ControllerBase
    {
        private readonly Iqr_gencodeService _Iqr_gencodeService;
        private readonly Iqr_enterpriseService _Iqr_enterpriseService;
        private readonly Iqr_paymentService _Iqr_paymentService;
        private readonly IproductService _IproductService;

        public gencodeController(Iqr_gencodeService qr_gencodeService, Iqr_enterpriseService qr_enterpriseService,
            Iqr_paymentService qr_paymentService, IproductService productService)
        {
            _Iqr_gencodeService = qr_gencodeService;
            _Iqr_enterpriseService = qr_enterpriseService;
            _Iqr_paymentService = qr_paymentService;
            _IproductService = productService;
        }
        [HttpGet]
        [Route("list/{userid}")]
        public async Task<List<gencodeview>> Get(int userid)
        {
            var data = new List<gencodeview>();
            data = await Task.FromResult(Listgencode(userid));
            return data;
        }
        private List<gencodeview> Listgencode(int userid)
        {
            var list_payment = _Iqr_paymentService.GetAll().Where(t => t.created_by == userid).ToList();
            var list_enterprise = _Iqr_enterpriseService.GetAll().Where(t => t.created_by == userid);
            var list_product = _IproductService.GetAll().Where(t => t.created_by == userid);
            var list_gencode = _Iqr_gencodeService.GetAll().Where(t => t.created_by == userid);
            var list_gen_product = new List<gencodeview>();
            var list_gen_enterprise = new List<gencodeview>();
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
                                    qr_code = b.code
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
                                       qr_code = b.code
                                   }).ToList();
            list_gen_product.AddRange(list_gen_enterprise);
            return list_gen_product;
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
    }
}
