using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using QRCode.Core.Domain;
using QRCode.Core.Domain2;
using QRCode.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.IO;
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
        private readonly Iqr_surveyService _Iqr_surveyService;
        public ViewDataController(IproductService productService, Iqr_enterpriseService qr_enterpriseService,
            Iqr_gencodeService qr_gencodeService, Iqr_his_scanService qr_his_scanService, Iqr_surveyService qr_surveyService)
        {
            _IproductService = productService;
            _Iqr_enterpriseService = qr_enterpriseService;
            _Iqr_gencodeService = qr_gencodeService;
            _Iqr_his_scanService = qr_his_scanService;
            _Iqr_surveyService = qr_surveyService;
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
            scan_obj.qrgencodeid = dataid;
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
                int qrgencodeid = 0;
                if (id2 == "gen")
                {
                    var gencode_list = _Iqr_gencodeService.GetAll();
                    var gencode_obj = gencode_list.FirstOrDefault(t => t.code == id);
                    id_product = gencode_obj.dataid;
                    qrgencodeid = gencode_obj.qrgencodeid;
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
                if (qrgencodeid != 0)
                    InsertHisScan("product", qrgencodeid);
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
                    InsertHisScan("enterprise", Convert.ToInt32(gencode_obj.qrgencodeid));
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
        private string GetLocation(string ip)
        {
            var res = "";
            WebRequest request = WebRequest.Create("http://ipinfo.io/" + ip);
            using (WebResponse response = request.GetResponse())
            using (StreamReader stream = new StreamReader(response.GetResponseStream()))
            {
                string line;
                while ((line = stream.ReadLine()) != null)
                {
                    res += line;
                }
            }
            return res;
        }
        private bool checkIpprivate(string ip)
        {
            var arr_ip = ip.Split('.');
            string ip1 = arr_ip[0];
            int ip2 = Convert.ToInt32(arr_ip[1]);
            int ip3 = Convert.ToInt32(arr_ip[2]);
            int ip4 = Convert.ToInt32(arr_ip[3]);
            bool check = false;
            if (ip1 == "10")
            {
                if (ip2 >= 0 && ip2 <= 255)
                {
                    if (ip3 >= 0 && ip3 <= 255)
                    {
                        if (ip4 >= 0 && ip4 <= 255)
                        {
                            check = true;
                        }
                        else
                        {
                            check = false;
                        }
                    }
                    else
                    {
                        check = false;
                    }
                }
                else
                {
                    check = false;
                }
            }
            else if (ip1 == "172")
            {
                if (ip2 >= 16 && ip2 <= 31)
                {
                    if (ip3 >= 0 && ip3 <= 255)
                    {
                        if (ip4 >= 0 && ip4 <= 255)
                        {
                            check = true;
                        }
                        else
                        {
                            check = false;
                        }
                    }
                    else
                    {
                        check = false;
                    }
                }
                else
                {
                    check = false;
                }
            }
            else if (ip1 == "192")
            {

                if (ip2 == 168)
                {
                    if (ip3 >= 0 && ip3 <= 255)
                    {
                        if (ip4 >= 0 && ip4 <= 255)
                        {
                            check = true;
                        }
                        else
                        {
                            check = false;
                        }
                    }
                    else
                    {
                        check = false;
                    }
                }
                else
                {
                    check = false;
                }
            }
            else
            {
                check = false;
            }
            return check;
        }
        [HttpGet]
        [Route("GetObject/{id}")]
        public async Task<IActionResult> GetOject(string id)
        {
            survey_view object_view = new survey_view();
            if (!string.IsNullOrEmpty(id))
            {
                var gencode_list = _Iqr_gencodeService.GetAll();
                var gencode_obj = gencode_list.FirstOrDefault(t => t.code == id);
                if (gencode_obj == null)
                {
                    var resul_objet_tmp = new
                    {
                        result = new survey_view(),
                        error = "IDNull"
                    };
                    return Ok(resul_objet_tmp);
                }
                string gt_check = Checksurvey((int)gencode_obj.dataid);
                if (gt_check != "Success")
                {
                    var resul_objet_tmp = new
                    {
                        result = new survey_view(),
                        error = gt_check
                    };
                    return Ok(resul_objet_tmp);
                }
                var temp_data = await Task.FromResult(_Iqr_surveyService.GetAll().FirstOrDefault(t => t.qrsurveyid == gencode_obj.dataid));
                if (temp_data != null)
                {
                    var list_cauhoi = new List<cauhoi>();
                    object_view.object_edit = temp_data;
                    var array = JArray.Parse(temp_data.additional);
                    list_cauhoi = array.ToObject<List<cauhoi>>();
                    object_view.list_cauhoi = list_cauhoi;          
                    InsertHisScan("survey", (int)gencode_obj.dataid);
                    var resul_objet_tmp = new
                    {
                        result = object_view,
                        error = "Success"
                    };
                    return Ok(resul_objet_tmp);
                }
            }
            var resul_objet = new
            {
                result = object_view,
                error = "IDNull"
            };
            return Ok(resul_objet);
        }
        private string Checksurvey(int id)
        {
            string result = "Success";
            var list = _Iqr_surveyService.GetAll();
            if (list != null && list.Count() > 0)
            {
                var survey = _Iqr_surveyService.GetAll().FirstOrDefault(t => t.qrsurveyid == id);
                if (survey == null)
                {
                    result = "ErrorSurvey";
                }
                else
                {
                    if (!survey.start_date.HasValue || !survey.end_date.HasValue)
                    {
                        result = "ErrorActive";
                    }
                    else
                    {
                        DateTime ngay_bd = survey.start_date.Value.Date;
                        DateTime ngay_kt = survey.end_date.Value.Date.AddDays(1).AddSeconds(-1);
                        if (ngay_kt.Date < DateTime.Now.Date)
                        {
                            result = "EndSurvey";
                            return result;
                        }
                        else if (ngay_bd.Date > DateTime.Now.Date)
                        {
                            result = "NotStart";
                            return result;
                        }
                    }
                }
            }
            else
            {
                result = "ErrorSurvey";
            }
            return result;
        }
    }
}
