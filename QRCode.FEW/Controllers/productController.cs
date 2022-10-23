using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        [HttpGet]
        public int Get()
        {
            return 5;
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
