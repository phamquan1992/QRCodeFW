using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace QRCode.Core.Domain2
{
    public class NGUOIDUNG
    {
        public long id { get; set; }
        public string sodt { get; set; }
        public string email { get; set; }
        public string token { get; set; }
        public bool active { get; set; }
        public bool isadmin { get; set; }
    }
    public class MailRequest
    {
        public string sdt { get; set; }
        public string pass { get; set; }
        public string ToEmail { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public List<IFormFile> Attachments { get; set; }
    }
    public class MailSettings
    {
        public string Mail { get; set; }
        public string DisplayName { get; set; }
        public string Password { get; set; }
        public string Host { get; set; }
        public int Port { get; set; }
    }
    public class result_objet
    {
        public string key { get; set; }
        public string value { get; set; }
    }
    public class package_objet
    {
        public string packcode { get; set; }
        public string packname { get; set; }
        public decimal price { get; set; }
    }
}
