using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QRCode.Core.Domain2;
using QRCode.FEW.Extensions.Common;
using QRCode.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QRCode.FEW.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SendMailController : ControllerBase
    {
        private readonly IMailService mailService;
        public SendMailController(IMailService mailService)
        {
            this.mailService = mailService;
        }
        [HttpPost("Send")]
        public async Task<IActionResult> Send([FromBody] MailRequest request)
        {
            try
            {
                await mailService.SendEmailAsync(request);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}"); ;
            }

        }
        [HttpPost]
        [Route("Send2")]
        public async Task<IActionResult> Send2([FromBody] MailRequest request)
        {
            try
            {
                await MailUtils.SendMailGoogleSmtp("thanlong92vip@gmail.com", "phamquan2471992@gmail.com", "safsd", "Adsadsad", "quan pham", "Thanlong.92");
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}"); ;
            }

        }
    }
}
