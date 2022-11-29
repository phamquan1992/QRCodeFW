using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
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
    public class productController : ControllerBase
    {
        private readonly IproductService _IproductService;
        private readonly IcategoryService _IcategoryService;
        private readonly ILogger<productController> _logger;
        public productController(IproductService iproductService, IcategoryService icategoryService, ILogger<productController> logger)
        {
            _IproductService = iproductService;
            _IcategoryService = icategoryService;
            _logger = logger;
        }
        [HttpGet]
        public List<product> Get()
        {
            var req = Request;
            _logger.LogError("TestLog");
            List<product> data = new List<product>();
            data = _IproductService.GetAll().ToList();
            return data;
        }
        [HttpGet]
        [Route("object/{id}")]
        public product Get_obj(int id)
        {
            var product_it = new product();
            if (id != 0)
                product_it = _IproductService.GetAll().FirstOrDefault(t => t.qrproductid == id);
            return product_it;
        }
        private List<productdetail> get_json(string data)
        {
            List<productdetail> list = new List<productdetail>();
            JArray array = JArray.Parse(data);
            JObject firstObject = (JObject)array.First;
            //String adminValue = (String)firstObject.GetValue("ADMIN");
            foreach (JObject content in array.Children<JObject>())
            {
                //foreach (JProperty prop in content.Properties())
                //{
                //    productdetail it = new productdetail();
                //    it.name = prop.Name;
                //    JObject obj_value = JObject.Parse(prop.Value.ToString());
                //    foreach (JProperty item2 in obj_value.Properties())
                //    {
                //        if (item2.Name == "title")
                //            it.Title = item2.Value.ToString();
                //        if (item2.Name == "value")
                //            it.value_ip = item2.Value.ToString();
                //    }
                //    it.is_delete = true;
                //    it.is_require = false;
                //    it.is_visible = false;
                //    it.type = "text";
                //    it.nhom = "khac";
                //    list.Add(it);
                //}
                productdetail it = new productdetail();
                var name_obj = content["key"].ToString();
                it.name = name_obj;
                var value_obj = content["values"].ToString();
                JObject obj_value = JObject.Parse(content["values"].ToString());
                it.Title = obj_value["title"].ToString();
                it.value_ip = obj_value["value"].ToString();
                it.is_delete = true;
                it.is_require = true;
                it.is_visible = false;
                it.type = "text";
                it.nhom = "khac";
                list.Add(it);
            }
            return list;
        }
        [HttpGet]
        [Route("detail/{id}")]
        public List<productdetail> GetProductdetails(int id)
        {
            List<productdetail> data = new List<productdetail>();
            var product_it = new product();
            if (id != 0)
                product_it = _IproductService.GetAll().FirstOrDefault(t => t.qrproductid == id);

            productdetail ma_sp = new productdetail
            {
                is_delete = false,
                is_require = false,
                is_visible = true,
                name = "code",
                nhom = "macdinh",
                Title = "Mã sản phẩm",
                type = "text",
                value_ip = product_it.code
            };
            data.Add(ma_sp);
            productdetail ten_sp = new productdetail
            {
                is_delete = false,
                is_require = true,
                is_visible = true,
                name = "name",
                nhom = "macdinh",
                Title = "Tên sản phẩm",
                type = "text",
                value_ip = product_it.name
            };
            data.Add(ten_sp);
            productdetail Danh_muc = new productdetail
            {
                is_delete = false,
                is_require = true,
                is_visible = true,
                name = "category",
                nhom = "macdinh",
                Title = "Danh mục",
                type = "dropdown",
                value_ip = product_it.category
            };
            data.Add(Danh_muc);
            productdetail Gia_sp = new productdetail
            {
                is_delete = false,
                is_require = true,
                is_visible = true,
                name = "price",
                nhom = "macdinh",
                Title = "Giá sản phẩm",
                type = "number",
                value_ip = product_it.price == null ? null : product_it.price.Value.ToString("#.#")
            };
            data.Add(Gia_sp);
            productdetail Slogan_sp = new productdetail
            {
                is_delete = false,
                is_require = true,
                is_visible = true,
                name = "slogan",
                nhom = "macdinh",
                Title = "Slogan sản phẩm",
                type = "text",
                value_ip = product_it.slogan
            };
            data.Add(Slogan_sp);
            productdetail enterprise_sp = new productdetail
            {
                is_delete = false,
                is_require = true,
                is_visible = true,
                name = "enterpriseid",
                nhom = "macdinh",
                Title = "Doanh nghiệp",
                type = "dropdown",
                value_ip = product_it.enterpriseid == 0 ? "" : product_it.enterpriseid.ToString()
            };
            data.Add(enterprise_sp);
            productdetail img_daidien = new productdetail
            {
                is_delete = true,
                is_require = true,
                is_visible = true,
                name = "logo",
                nhom = "macdinh",
                Title = "Logo sản phẩm",
                type = "",
                value_ip = product_it.logo
            };
            data.Add(img_daidien);
            productdetail img_sanpham = new productdetail
            {
                is_delete = true,
                is_require = true,
                is_visible = true,
                name = "url_img",
                nhom = "macdinh",
                Title = "Ảnh sản phẩm",
                type = "",
                value_ip = product_it.url_img
            };
            data.Add(img_sanpham);
            productdetail img_chungchi = new productdetail
            {
                is_delete = true,
                is_require = true,
                is_visible = true,
                name = "url_iso",
                nhom = "macdinh",
                Title = "Chứng chỉ sản phẩm",
                type = "",
                value_ip = product_it.url_iso
            };
            data.Add(img_chungchi);
            productdetail img_mavach = new productdetail
            {
                is_delete = true,
                is_require = true,
                is_visible = true,
                name = "url_barcode",
                nhom = "macdinh",
                Title = "Mã vạch sản phẩm",
                type = "",
                value_ip = product_it.url_barcode
            };
            data.Add(img_mavach);
            if (!string.IsNullOrEmpty(product_it.url_video))
            {
                productdetail video_product = new productdetail
                {
                    is_delete = true,
                    is_require = true,
                    is_visible = true,
                    name = "url_video",
                    nhom = "macdinh",
                    Title = "Video sản phẩm",
                    type = "",
                    value_ip = product_it.url_video
                };
                data.Add(video_product);
            }
            if (!string.IsNullOrEmpty(product_it.des_story))
            {
                productdetail des_story = new productdetail
                {
                    is_delete = true,
                    is_require = true,
                    is_visible = true,
                    name = "des_story",
                    nhom = "mota",
                    Title = "Câu chuyện sản phẩm",
                    type = "",
                    value_ip = product_it.des_story
                };
                data.Add(des_story);
            }

            if (!string.IsNullOrEmpty(product_it.des_pack))
            {
                productdetail des_pack = new productdetail
                {
                    is_delete = true,
                    is_require = true,
                    is_visible = true,
                    name = "des_pack",
                    nhom = "mota",
                    Title = "Quy cách đóng gói",
                    type = "",
                    value_ip = product_it.des_pack
                };
                data.Add(des_pack);
            }
            if (!string.IsNullOrEmpty(product_it.des_element))
            {
                productdetail des_element = new productdetail
                {
                    is_delete = true,
                    is_require = true,
                    is_visible = true,
                    name = "des_element",
                    nhom = "mota",
                    Title = "Thành phần",
                    type = "",
                    value_ip = product_it.des_element
                };
                data.Add(des_element);
            }
            if (!string.IsNullOrEmpty(product_it.des_uses))
            {
                productdetail des_uses = new productdetail
                {
                    is_delete = true,
                    is_require = true,
                    is_visible = true,
                    name = "des_uses",
                    nhom = "mota",
                    Title = "Công dụng",
                    type = "",
                    value_ip = product_it.des_uses
                };
                data.Add(des_uses);
            }
            if (!string.IsNullOrEmpty(product_it.des_guide))
            {
                productdetail des_guide = new productdetail
                {
                    is_delete = true,
                    is_require = true,
                    is_visible = true,
                    name = "des_guide",
                    nhom = "mota",
                    Title = "Hướng dẫn sử dụng",
                    type = "",
                    value_ip = product_it.des_guide
                };
                data.Add(des_guide);
            }
            if (!string.IsNullOrEmpty(product_it.des_preserve))
            {
                productdetail des_preserve = new productdetail
                {
                    is_delete = true,
                    is_require = true,
                    is_visible = true,
                    name = "des_preserve",
                    nhom = "mota",
                    Title = "Bảo quản",
                    type = "",
                    value_ip = product_it.des_preserve
                };
                data.Add(des_preserve);
            }
            if (!string.IsNullOrEmpty(product_it.des_startdate))
            {
                productdetail des_startdate = new productdetail
                {
                    is_delete = true,
                    is_require = true,
                    is_visible = true,
                    name = "des_startdate",
                    nhom = "mota",
                    Title = "Ngày sản xuất",
                    type = "",
                    value_ip = product_it.des_startdate
                };
                data.Add(des_startdate);
            }
            if (!string.IsNullOrEmpty(product_it.des_enddate))
            {
                productdetail des_enddate = new productdetail
                {
                    is_delete = true,
                    is_require = true,
                    is_visible = true,
                    name = "des_enddate",
                    nhom = "mota",
                    Title = "Hạn sử dụng",
                    type = "",
                    value_ip = product_it.des_enddate
                };
                data.Add(des_enddate);
            }
            if (!string.IsNullOrEmpty(product_it.additional))
                data.AddRange(get_json(product_it.additional));
            return data;
        }
        [HttpPut]
        [Route("Update")]
        public bool Update([FromBody] product product_up)
        {
            try
            {
                var product_it = _IproductService.GetAll().FirstOrDefault(t => t.qrproductid == product_up.qrproductid);
                product_it.name = product_up.name;
                product_it.code = product_up.code;
                product_it.category = product_up.category;
                product_it.url_img = setImg(product_it.url_img, product_up.url_img);
                product_it.url_video = setImg(product_it.url_video, product_up.url_video);
                product_it.url_iso = setImg(product_it.url_iso, product_up.url_iso);
                product_it.url_barcode = setImg(product_it.url_barcode, product_up.url_barcode);
                product_it.price = product_up.price;
                product_it.slogan = product_up.slogan;
                product_it.logo = setImg(product_it.logo, product_up.logo);
                product_it.des_story = product_up.des_story;
                product_it.des_pack = product_up.des_pack;
                product_it.des_element = product_up.des_element;
                product_it.enterpriseid = product_up.enterpriseid;
                product_it.des_uses = product_up.des_uses;
                product_it.des_guide = product_up.des_guide;
                product_it.des_preserve = product_up.des_preserve;
                product_it.des_startdate = product_up.des_startdate;
                product_it.des_enddate = product_up.des_enddate;
                product_it.additional = product_up.additional;
                product_it.lastcreated_by = product_up.lastcreated_by;
                product_it.lastcreated_date = DateTime.Now;
                return _IproductService.Update(product_it);
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        [HttpPut]
        [Route("ChangeStatus")]
        public bool UpdateStatus([FromBody] product[] products)
        {
            return _IproductService.UpdateRange(products.ToList());
        }
        [HttpPost]
        [Route("Add")]
        public bool Add([FromBody] product product_up)
        {
            try
            {

                product product_it = new product();
                product_it.name = product_up.name;
                product_it.code = product_up.code;
                product_it.category = product_up.category;
                product_it.url_img = setImg("", product_up.url_img);
                product_it.url_video = setImg("", product_up.url_video);
                product_it.url_iso = setImg("", product_up.url_iso);
                product_it.url_barcode = setImg("", product_up.url_barcode);
                product_it.price = product_up.price;
                product_it.slogan = product_up.slogan;
                product_it.logo = setImg("", product_up.logo);
                product_it.des_story = product_up.des_story;
                product_it.des_pack = product_up.des_pack;
                product_it.des_element = product_up.des_element;
                product_it.des_uses = product_up.des_uses;
                product_it.des_guide = product_up.des_guide;
                product_it.des_preserve = product_up.des_preserve;
                product_it.des_startdate = product_up.des_startdate;
                product_it.des_enddate = product_up.des_enddate;
                product_it.additional = product_up.additional;
                product_it.enterpriseid = product_up.enterpriseid;
                product_it.created_by = product_up.created_by;
                product_it.created_date = DateTime.Now;
                return _IproductService.CreateNew(product_it);
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        [HttpPost]
        [Route("Import")]
        public bool Import([FromBody] List<product> list)
        {
            try
            {
                List<product> data = new List<product>();
                foreach (var item in list)
                {
                    product product_it = new product();
                    product_it.name = item.name;
                    product_it.code = item.code;
                    product_it.category = item.category;
                    product_it.url_img = item.url_img;
                    product_it.url_video = item.url_video;
                    product_it.url_iso = item.url_iso;
                    product_it.url_barcode = item.url_barcode;
                    product_it.price = item.price;
                    product_it.slogan = item.slogan;
                    product_it.logo = item.logo;
                    product_it.des_story = item.des_story;
                    product_it.des_pack = item.des_pack;
                    product_it.des_element = item.des_element;
                    product_it.des_uses = item.des_uses;
                    product_it.des_guide = item.des_guide;
                    product_it.des_preserve = item.des_preserve;
                    product_it.des_startdate = item.des_startdate;
                    product_it.des_enddate = item.des_enddate;
                    product_it.additional = item.additional;
                    product_it.enterpriseid = item.enterpriseid;
                    product_it.created_by = item.created_by;
                    product_it.created_date = DateTime.Now;
                    data.Add(product_it);
                }
                return _IproductService.AddRange(list);
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        private string setImg(string imgOld, string inputSrc)
        {
            Helper helper = new Helper();
            string gt = helper.CopyFileImg(imgOld, inputSrc, FORDERConstant.Product_tmp, FORDERConstant.Product);
            if (string.IsNullOrEmpty(gt))
                return imgOld;
            return gt;
        }
        [HttpDelete]
        [Route("Delete")]
        public bool Delete([FromBody] decimal[] ids)
        {
            List<product> data = new List<product>();
            data = _IproductService.GetAll().Where(t => ids.Contains(t.qrproductid)).ToList();
            return _IproductService.DeleteRange(data);
        }
        [HttpDelete]
        [Route("Delete/{id}")]
        public bool Delete(decimal id)
        {
            var data = _IproductService.GetAll().FirstOrDefault(t => t.qrproductid == id);
            return _IproductService.Delete(data);
        }
        [HttpGet]
        [Route("category")]
        public List<category> GetCategories()
        {
            List<category> data = new List<category>();
            var query = _IcategoryService.GetAll();
            if (query != null && query.Count() > 0)
            {
                data = query.ToList();
            }
            return data;
        }
        private string path_file()
        {
            var extractPath = Path.Combine(@"ClientApp");
            string[] files = Directory.GetFiles(extractPath, "*.*", SearchOption.AllDirectories);
            var file_find = files.Where(t => t.Contains("qr_image"));
            var gt = file_find.Select(t => t.Split("qr_image")[0] + @"qr_image");
            var temp = from a in gt
                       group a by a into gr
                       select gr.Key;
            var any_src = temp.Any(t => t.Contains(@"ClientApp\src\assets"));
            if (any_src)
                return Path.Combine(@"ClientApp\src\assets", "qr_image");
            else
                return temp.FirstOrDefault();
        }
        [HttpPost, DisableRequestSizeLimit]
        public async Task<IActionResult> Upload()
        {
            try
            {
                Helper helper = new Helper();
                var formCollection = await Request.ReadFormAsync();
                var file = formCollection.Files.First();
                var folderName = helper.path_file(FORDERConstant.Product_tmp);
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var filearr = fileName.Split('.');
                    string duoifile = filearr[filearr.Length - 1];
                    string tenfile = FORDERConstant.Product + DateTime.Now.ToString("yyyyMMddHHmmss");
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
    }
}
