using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QRCode.Core.Domain;
using QRCode.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QRCode.FEW.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class qr_his_scanController : ControllerBase
    {
        private readonly Iqr_his_scanService _Iqr_his_scanService;
        public qr_his_scanController(Iqr_his_scanService qr_his_scanService)
        {
            _Iqr_his_scanService = qr_his_scanService;
        }
        [HttpGet]
        [Route("list")]
        public List<qr_his_scan> Get(string typecode, int dataid)
        {
            List<qr_his_scan> data = new List<qr_his_scan>();
            var list = _Iqr_his_scanService.GetAll().Where(t => t.typecode == typecode && t.dataid == dataid);
            if (list != null && list.Count() != 0)
            {
                data = list.ToList();
            }
            return data;
        }
    }
}
