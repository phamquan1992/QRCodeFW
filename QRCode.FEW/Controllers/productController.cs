using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QRCode.Core.Domain;
using QRCode.Core.Domain2;
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
                name = "Ma_sp",
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
                name = "Ten_sp",
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
                name = "Danh_muc",
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
                name = "Gia_sp",
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
                name = "Slogan_sp",
                nhom = "macdinh",
                Title = "Slogan sản phẩm",
                type = "text",
                value_ip = product_it.slogan
            };
            data.Add(Slogan_sp);
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
                var formCollection = await Request.ReadFormAsync();
                var file = formCollection.Files.First();
                var folderName = path_file();
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
