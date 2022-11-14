using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class sectorsController : ControllerBase
    {
        private readonly IsectorsService _IsectorsService;
        public sectorsController(IsectorsService sectorsService)
        {
            _IsectorsService = sectorsService;
        }
        [HttpGet]
        [Route("list")]
        public List<sectors> GetSectors()
        {
            var data = new List<sectors>();
            var query = _IsectorsService.GetAll();
            if (query != null && query.Count() != 0)
                data = query.ToList();
            return data;
        }
    }
}
