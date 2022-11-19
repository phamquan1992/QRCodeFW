using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QRCode.Core.Domain;
using QRCode.Core.Domain2;
using QRCode.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using UAParser;

namespace QRCode.FEW.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ViewDataController : ControllerBase
    {
        private readonly IproductService _IproductService;
        private readonly Iqr_enterpriseService _Iqr_enterpriseService;
        private readonly Iqr_gencodeService _Iqr_gencodeService;
        private readonly Iqr_his_scanService _Iqr_his_scanService;
        public ViewDataController(IproductService productService, Iqr_enterpriseService qr_enterpriseService, Iqr_gencodeService qr_gencodeService, Iqr_his_scanService qr_his_scanService)
        {
            _IproductService = productService;
            _Iqr_enterpriseService = qr_enterpriseService;
            _Iqr_gencodeService = qr_gencodeService;
            _Iqr_his_scanService = qr_his_scanService;
        }
        private void InsertHisScan(string type, int dataid)
        {
            string userAgent = Request.Headers["User-Agent"].ToString();
            var uaParser = Parser.GetDefault();
            ClientInfo info = uaParser.Parse(userAgent);
            var clientIpAddress = Request.HttpContext.Connection.RemoteIpAddress.ToString();
            if (clientIpAddress == "::1")
            {
                var gt = Dns.GetHostEntry(Dns.GetHostName()).AddressList;
                clientIpAddress = Dns.GetHostEntry(Dns.GetHostName()).AddressList[2].ToString();
            }

            qr_his_scan scan_obj = new qr_his_scan();
            scan_obj.typecode = type;
            scan_obj.dataid = dataid;
            scan_obj.application = info.UA.Family;
            scan_obj.ip = clientIpAddress;
            scan_obj.location = "";
            scan_obj.osystem = info.OS.Family;
            scan_obj.province = "";
            scan_obj.tel = "";
            scan_obj.time_scan = DateTime.Now;
            _Iqr_his_scanService.CreateNew(scan_obj);
        }
        [HttpGet]
        [Route("product/{id}/{id2}")]
        public productview Get_obj(string id, string id2)
        {
            var product_view = new productview();
            if (!string.IsNullOrEmpty(id))
            {
                decimal id_product = 0;
                if (id2 == "gen")
                {
                    var gencode_list = _Iqr_gencodeService.GetAll();
                    var gencode_obj = gencode_list.FirstOrDefault(t => t.code == id);
                    id_product = gencode_obj.dataid;
                }
                else
                {
                    id_product = Decimal.Parse(id);
                }
                var product_it = _IproductService.GetAll().FirstOrDefault(t => t.qrproductid == id_product);
                product_view.additional = product_it.additional;
                product_view.des_element = product_it.des_element;
                product_view.des_enddate = product_it.des_enddate;
                product_view.des_guide = product_it.des_guide;
                product_view.des_manufactur = product_it.des_manufactur;
                product_view.des_pack = product_it.des_pack;
                product_view.des_preserve = product_it.des_preserve;
                product_view.des_startdate = product_it.des_startdate;
                product_view.des_story = product_it.des_story;
                product_view.des_uses = product_it.des_uses;
                product_view.name = product_it.name;
                product_view.price = product_it.price;
                product_view.qrproductid = product_it.qrproductid;
                product_view.url_img = product_it.url_img;
                product_view.enterpriseid = product_it.enterpriseid;
                product_view.list_ref = GetListProduct(product_it.enterpriseid, product_it.qrproductid);
                if (id2 == "gen")
                    InsertHisScan("product", (int)product_it.qrproductid);
            }
            return product_view;
        }
        private List<productview> GetListProduct(decimal enterpriseid, long qrproductid)
        {
            List<productview> data = new List<productview>();
            var temp = _IproductService.GetAll().Where(t => t.enterpriseid == enterpriseid && t.qrproductid != qrproductid);
            if (temp.Count() > 0)
            {
                data = (from a in temp
                        select new productview
                        {
                            name = a.name,
                            url_img = a.url_img,
                            qrproductid = a.qrproductid,
                            enterpriseid = enterpriseid,
                            price = a.price
                        }).ToList();
            }
            return data;
        }
        [HttpGet]
        [Route("enterprise/{id}")]
        public async Task<enterprisview> GetObject(string id)
        {
            var obj_temp = new enterprisview();
            if (!string.IsNullOrEmpty(id))
            {
                var gencode_list = _Iqr_gencodeService.GetAll();
                var gencode_obj = gencode_list.FirstOrDefault(t => t.code == id);
                var temp_data = await Task.FromResult(GetCongty().FirstOrDefault(t => t.qrenterpriseid == gencode_obj.dataid));
                if (temp_data != null)
                {
                    obj_temp.additional = temp_data.additional;
                    obj_temp.address = temp_data.address;
                    obj_temp.email = temp_data.email;
                    obj_temp.fax = temp_data.fax;
                    obj_temp.logo = temp_data.logo;
                    obj_temp.name = temp_data.name;
                    obj_temp.qrenterpriseid = temp_data.qrenterpriseid;
                    obj_temp.tel = temp_data.tel;
                    obj_temp.list_ref = GetListProduct_byenterprise(gencode_obj.dataid);
                    InsertHisScan("enterprise", Convert.ToInt32(id));
                }
            }
            return obj_temp;
        }
        private List<productview> GetListProduct_byenterprise(decimal enterpriseid)
        {
            List<productview> data = new List<productview>();
            var temp = _IproductService.GetAll().Where(t => t.enterpriseid == enterpriseid);
            if (temp.Count() > 0)
            {
                data = (from a in temp
                        select new productview
                        {
                            name = a.name,
                            url_img = a.url_img,
                            qrproductid = a.qrproductid,
                            enterpriseid = enterpriseid,
                            price = a.price
                        }).ToList();
            }
            return data;
        }
        private List<qr_enterprise> GetCongty()
        {
            return _Iqr_enterpriseService.GetAll().ToList();
        }
    }
}
