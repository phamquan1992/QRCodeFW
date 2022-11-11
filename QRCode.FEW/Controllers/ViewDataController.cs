﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QRCode.Core.Domain;
using QRCode.Core.Domain2;
using QRCode.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QRCode.FEW.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ViewDataController : ControllerBase
    {
        private readonly IproductService _IproductService;
        private readonly Iqr_enterpriseService _Iqr_enterpriseService;
        private readonly Iqr_gencodeService _Iqr_gencodeService;
        public ViewDataController(IproductService productService, Iqr_enterpriseService qr_enterpriseService, Iqr_gencodeService qr_gencodeService)
        {
            _IproductService = productService;
            _Iqr_enterpriseService = qr_enterpriseService;
            _Iqr_gencodeService = qr_gencodeService;
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
