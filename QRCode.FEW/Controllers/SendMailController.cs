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
                var listuser = _IuserdataService.GetAll().ToList();
                bool checkuser = listuser.Any(t => t.email.ToUpper() == request.ToEmail.ToUpper() || t.sdt.ToUpper() == request.sdt.ToUpper());
                if (checkuser)
                {
                    var resul_objet = new
                    {
                        result = "AnyUser"
                    };
                    return Ok(resul_objet);
                }

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
                    error = ex.Message,
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
        [HttpPut]
        [Route("ResetPass")]
        public async Task<IActionResult> ResetPass([FromBody] MailRequest request)
        {
            try
            {
                var listuser = _IuserdataService.GetAll().ToList();
                bool checkuser = listuser.Any(t => t.email.ToUpper() == request.ToEmail.ToUpper());
                if (!checkuser)
                {
                    var resul_objet = new
                    {
                        result = "NotUser"
                    };
                    return Ok(resul_objet);
                }
                var obj_data1 = listuser.FirstOrDefault(t => t.email == request.ToEmail);
                obj_data1.password = RandomString(6);
                request.Body = "<div><h2>Bạn đã thay đổi mật khẩu tài khoản tại trang web của chúng tôi</h2></div>" +
        "<div>Mật khẩu tạm thời là: " + obj_data1.password + "</div>" +
        "<div>Vui lòng vào link dưới để xác nhận đăng ký</div><div><a href='" + request.sdt + "'>Bấm vào đây thay đổi mật khẩu mới</a><div>";
                await mailService.SendEmailAsync(request);
                bool kq = _IuserdataService.Update(obj_data1);
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
        [HttpPut]
        [Route("ChangePass")]
        public async Task<IActionResult> Changepass([FromBody] user_reset model)
        {
            var listuser = await Task.FromResult(_IuserdataService.GetAll().ToList());
            var obj_data1 = listuser.FirstOrDefault(t => t.email == model.email && t.password == model.password_old);
            if (obj_data1 == null)
            {
                var resul_objet1 = new
                {
                    result = "NullUser"
                };
                return Ok(resul_objet1);
            }
            else
            {
                obj_data1.password = model.password;
                var kq = _IuserdataService.Update(obj_data1);
                if (!kq)
                {
                    var resul_objet2 = new
                    {
                        result = "UpdateError"
                    };
                    return Ok(resul_objet2);
                }
                else
                {
                    var resul_objet3 = new
                    {
                        result = "Success"
                    };
                    return Ok(resul_objet3);
                }
            }
        }
        private string RandomString(int length)
        {
            Random random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}
