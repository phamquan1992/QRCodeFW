using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QRCode.Core.Domain;
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
        public gencodeController(Iqr_gencodeService qr_gencodeService)
        {
            _Iqr_gencodeService = qr_gencodeService;
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
            temp.image =model.image;
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
