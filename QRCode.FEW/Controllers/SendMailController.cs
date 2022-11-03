using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using QRCode.Core.Domain;
using QRCode.Core.Domain2;
using QRCode.FEW.Extensions.Common;
using QRCode.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QRCode.FEW.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SendMailController : ControllerBase
    {
        private readonly IMailService mailService;
        private readonly IuserdataService _IuserdataService;
        public SendMailController(IMailService mailService, IuserdataService userdataService)
        {
            this.mailService = mailService;
            _IuserdataService = userdataService;
        }
        [HttpPost("Send")]
        public async Task<IActionResult> Send([FromBody] MailRequest request)
        {
            try
            {
                await mailService.SendEmailAsync(request);
                userdata user = new userdata();
                user.created_date = DateTime.Now;
                user.email = request.ToEmail;
                user.password = request.pass;
                user.sdt = request.sdt;
                user.status = false;
                bool kq = _IuserdataService.CreateNew(user);
               
                if (kq)
                {
                    var resul_objet = new
                    {
                        result = "Success"
                    };
                    return Ok(resul_objet);
                }
                else
                {
                    var resul_objet = new
                    {
                        result = "Error"
                    };
                    await Task.FromResult(_IuserdataService.GetAll().FirstOrDefault());
                    result_objet res = new result_objet { key = "Error", value = "Error" };
                    return Ok(resul_objet);
                }
            }
            catch (Exception ex)
            {
                var resul_objet = new
                {
                    result = "Error"
                };
                return Ok(resul_objet);
            }

        }
        [HttpPost]
        [Route("Send2")]
        public async Task<IActionResult> Send2([FromBody] MailRequest request)
        {
            try
            {
                await MailUtils.SendMailGoogleSmtp("thanlong92vip@gmail.com", request.ToEmail, request.Subject, request.Body, "thanlong92vip@gmail.com", "blsvmcewjzcvthtj");
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}"); ;
            }

        }
        [HttpGet]
        [Route("XacThuc")]
        public async Task<IActionResult> XacThuc(string sdt)
        {
            try
            {
                string thongbao = "Kích hoạt tài khoản thành công";
                userdata user = new userdata();
                user = _IuserdataService.GetAll().FirstOrDefault(t => t.email == sdt || t.sdt == sdt);
                if (user != null)
                {
                    user.status = true;
                    bool kq = _IuserdataService.Update(user);
                    if (!kq)
                        thongbao = "Kích hoạt tài khoản thất bại.\n Vui lòng liên hệ với chúng tôi qua số điện thoại hỗ trợ";
                }
                else
                {
                    thongbao = "Kích hoạt tài khoản thất bại.\n Vui lòng liên hệ với chúng tôi qua số điện thoại hỗ trợ";
                }
                var ur_home = Request.IsHttps ? "https://" + Request.Host.Value : "http://" + Request.Host.Value;

                string html = @"<div style='display: flex;align-items: center;justify-content: center;height: 100vh;width: 100%;
                                        background: url(https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Mountains-1412683.svg/1280px-Mountains-1412683.svg.png) no-repeat center center;
                                        
                                        background-size: cover;'>
                                              <div style = 'width: 500px; padding: 40px; border-radius: 8px; background-color: white; font-family:system-ui;box-shadow: 5px 5px 10px rgb(0 0 0 / 30%);'>
                                                <div style = 'display: flex;justify-content: center;align-items: center;flex-direction: column;width: 400px;padding: 50px 55px; transition: 1.25s;'>
                                                  <img src = '/assets/images/logo_tqc_vuong.jpg' alt = '' style = 'width: 198px;' >
                                                       <h2 style = 'text-align:center;color: #223f93;' >" + thongbao + @"</h2><br>
                                                            <a href = '" + ur_home + @"' style = 'background-color: #4CAF50;border: none; color: white;padding: 15px 32px;text-align: center;text-decoration: none;
                                        display: inline-block;font-size: 16px;'>Quay về trang chủ</a>
                            </div></div></div>";
                return base.Content(html, "text/html", Encoding.UTF8);
            }
            catch (Exception ex)
            {
                var ur_home = Request.IsHttps ? "https://" + Request.Host.Value : "http://" + Request.Host.Value;
                string thongbao = "Kích hoạt tài khoản thất bại.\n Vui lòng liên hệ với chúng tôi qua số điện thoại hỗ trợ";
                string html = @"<div style='display: flex;align-items: center;justify-content: center;height: 100vh;width: 100%;
                                        background: url(https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Mountains-1412683.svg/1280px-Mountains-1412683.svg.png) no-repeat center center;
                                        
                                        background-size: cover;'>
                                              <div style = 'width: 500px; padding: 40px; border-radius: 8px; background-color: white; font-family:system-ui;box-shadow: 5px 5px 10px rgb(0 0 0 / 30%);'>
                                                <div style = 'display: flex;justify-content: center;align-items: center;flex-direction: column;width: 400px;padding: 50px 55px; transition: 1.25s;'>
                                                  <img src = '/assets/images/logo_tqc_vuong.jpg' alt = '' style = 'width: 198px;' >
                                                       <h2 style = 'text-align:center;color: #223f93;' >" + thongbao + @"</h2><br>
                                                            <a href = '" + ur_home + @"' style = 'background-color: #4CAF50;border: none; color: white;padding: 15px 32px;text-align: center;text-decoration: none;
                                        display: inline-block;font-size: 16px;'>Quay về trang chủ</a>
                            </div></div></div>";
                return base.Content(html, "text/html", Encoding.UTF8);
            }

        }
    }
}
