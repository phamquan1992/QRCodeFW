using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using QRCode.Core.Domain2;
using QRCode.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
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
        public AuthenticationsController(IuserdataService userdataService, IConfiguration configuration)
        {
            _IuserdataService = userdataService;
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
                    token = ""
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
                DateTime time_expires = DateTime.Now.AddMinutes(3);
                var token = new JwtSecurityToken(_configuration["JWT:Issuer"], _configuration["JWT:Audience"], claims, expires: time_expires, signingCredentials: signIn);
                nguoidung.token = new JwtSecurityTokenHandler().WriteToken(token);
                return nguoidung;
            }
            else
            {
                return new NGUOIDUNG();
            }
        }
    }
}
