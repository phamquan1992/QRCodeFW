using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using QRCode.Core.Domain2;
using QRCode.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace QRCode.FEW.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationsController : ControllerBase
    {
        public IConfiguration _configuration;
        private readonly IuserdataService _IuserdataService;
        private readonly Iqr_paymentService _Iqr_paymentService;
        public AuthenticationsController(IuserdataService userdataService, Iqr_paymentService qr_paymentService, IConfiguration configuration)
        {
            _IuserdataService = userdataService;
            _Iqr_paymentService = qr_paymentService;
            _configuration = configuration;
        }
        [HttpGet]
        [Route("Login")]
        public NGUOIDUNG Login(string user, string pass)
        {
            var nd = _IuserdataService.GetAll().FirstOrDefault(t => (t.sdt == user || t.email == user) && t.password == pass);
            if (nd != null && nd.userid != 0)
            {
                NGUOIDUNG nguoidung = new NGUOIDUNG
                {
                    email = nd.email,
                    id = nd.userid,
                    sodt = nd.sdt,
                    token = "",
                    active = Checkpay((int)nd.userid)
                };
                if (!nd.status)
                {
                    nguoidung.id = -1000;
                    return nguoidung;
                }
                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub,_configuration["JWT:Subject"]),
                    new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat,DateTime.Now.ToString()),
                    new Claim("ID",nd.userid.ToString()),
                    new Claim("Sdt",nd.sdt),
                    new Claim("Email",nd.email)
                };
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));
                var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                DateTime time_expires = DateTime.Now.AddHours(1);
                var token = new JwtSecurityToken(_configuration["JWT:Issuer"], _configuration["JWT:Audience"], claims, expires: time_expires, signingCredentials: signIn);
                nguoidung.token = new JwtSecurityTokenHandler().WriteToken(token);
                return nguoidung;
            }
            else
            {
                return new NGUOIDUNG();
            }
        }
        public bool Checkpay(int userid)
        {
            bool check = false;
            var list_pay = _Iqr_paymentService.GetAll();
            if (list_pay != null && list_pay.Count() > 0)
            {
                var data = list_pay.ToList();
                check = data.Any(t => t.userid == userid && t.payment_date != null && t.payment_date.Value <= DateTime.Now.Date && DateTime.Now.Date <= get_exptime(t.payment_date.Value));
            }
            return check;
        }
        private DateTime get_exptime(DateTime startdate)
        {
            DateTime tmp = startdate.AddYears(1);
            return tmp;
        }
        public string GetIPAddress(string userAgent)
        {
            var ip = HttpContext.Connection.RemoteIpAddress.ToString();
            string externalIpString = new WebClient().DownloadString("http://icanhazip.com").Replace("\\r\\n", "").Replace("\\n", "").Trim();
            return IPAddress.Parse(externalIpString).ToString();
        }
    }
}
