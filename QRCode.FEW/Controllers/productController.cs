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
    [Route("api/[controller]")]
    [ApiController]
    public class productController : ControllerBase
    {
        private readonly IproductService _IproductService;
        public productController(IproductService iproductService)
        {
            _IproductService = iproductService;
        }
        [HttpGet]
        public List<product> Get()
        {
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
                is_require = true,
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
                is_delete = true,
                is_require = true,
                is_visible = true,
                name = "price",
                nhom = "macdinh",
                Title = "Giá sản phẩm",
                type = "number",
                value_ip = product_it.price == null ? "" : product_it.price.ToString("#.#")
            };
            data.Add(Gia_sp);
            productdetail Slogan_sp = new productdetail
            {
                is_delete = true,
                is_require = true,
                is_visible = true,
                name = "slogan",
                nhom = "macdinh",
                Title = "Slogan sản phẩm",
                type = "text",
                value_ip = product_it.slogan
            };
            data.Add(Slogan_sp);
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

            if(!string.IsNullOrEmpty(product_it.des_story))
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
                    value_ip = product_it.des_preserve
                };
                data.Add(des_enddate);
            }
          
            return data;
        }
        [HttpDelete]
        [Route("Delete")]
        public List<decimal> Delete([FromBody] decimal[] ids)
        {
            List<decimal> list_id = ids.ToList();
            return list_id;
        }
        [HttpDelete]
        [Route("Delete/{id}")]
        public decimal Delete(decimal id)
        {
            return id;
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
                var folderName = helper.path_file("products");
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
