﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using QRCode.Core.Domain;
using QRCode.Core.Domain2;
using QRCode.FEW.Extensions.Common;
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
    public class qr_paymentController : ControllerBase
    {
        private readonly Iqr_paymentService _Iqr_paymentService;
        private readonly IuserdataService _IuserdataService;
        private readonly Iqr_enterpriseService _Iqr_enterpriseService;
        private readonly IMailService _mailService;
        private readonly MailSettings _mailSettings;
        public qr_paymentController(Iqr_paymentService qr_paymentService, IuserdataService userdataService, Iqr_enterpriseService qr_enterpriseService,
            IMailService mailService, IOptions<MailSettings> mailSettings)
        {
            _Iqr_paymentService = qr_paymentService;
            _IuserdataService = userdataService;
            _Iqr_enterpriseService = qr_enterpriseService;
            _mailService = mailService;
            _mailSettings = mailSettings.Value;
        }
        [HttpGet]
        [Route("GetAll")]
        public async Task<List<payment_view>> GetAll()
        {
            List<payment_view> data = new List<payment_view>();
            data = await Task.FromResult(GetData());
            return data;
        }
        private List<payment_view> GetData()
        {
            List<payment_view> data = new List<payment_view>();
            var list = _Iqr_paymentService.GetAll();
            if (list != null && list.Count() != 0)
            {
                var listuser = _IuserdataService.GetAll();
                var querry = list.ToList();
                data = (from a in list
                        join b in listuser on a.created_by equals b.userid
                        select new payment_view
                        {
                            created_date = a.created_date,
                            email = b.email,
                            packcode = a.packcode,
                            packname = a.packname,
                            payment_date = a.payment_date,
                            phone = b.sdt,
                            qrpaymentid = (int)a.qrpaymentid,
                            userid = a.userid
                        }).ToList();
                data = data.OrderByDescending(t => t.created_date).ToList();
            }
            return data;
        }
        [HttpGet]
        [Route("Getpack")]
        public List<package_objet> GetPackage_Objets()
        {
            Helper helper = new Helper();
            return helper.GetPackage_Objets();
        }
        private DateTime get_exptime(DateTime startdate)
        {
            DateTime tmp = startdate.AddYears(1);
            return tmp;
        }
        [HttpGet]
        [Route("Checkpay")]
        public bool Checkpay(int userid, string packcode)
        {
            bool check = false;
            var list_pay = _Iqr_paymentService.GetAll();
            if (list_pay != null && list_pay.Count() > 0)
                check = list_pay.Any(t => t.userid == userid && t.packcode == packcode && t.payment_date != null && t.payment_date.Value <= DateTime.Now.Date && DateTime.Now.Date <= get_exptime(t.payment_date.Value));
            return check;
        }
        [HttpGet]
        [Route("CheckpayUser/{userid}")]
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
        [HttpGet]
        [Route("GetListPay/{userid}")]
        public List<qr_payment> GetListbyUser(int userid)
        {
            List<qr_payment> data = new List<qr_payment>(); ;
            var list_pay = _Iqr_paymentService.GetAll();
            if (list_pay != null && list_pay.Count() > 0)
            {
                list_pay = list_pay.Where(t => t.userid == userid && t.payment_date != null && t.payment_date.Value <= DateTime.Now.Date);
                if (list_pay.Count() > 0)
                {
                    data = list_pay.ToList();
                    data = data.Where(t => DateTime.Now.Date <= get_exptime(t.payment_date.Value)).ToList();
                }

            }
            return data;
        }
        [HttpPost]
        [Route("Add")]
        public async Task<bool> Add([FromBody] qr_payment model)
        {
            try
            {
                qr_payment obj = new qr_payment();
                obj.userid = model.userid;
                obj.created_by = model.created_by;
                obj.created_date = DateTime.Now;
                obj.packcode = model.packcode;
                obj.packname = GetPackage_Objets().FirstOrDefault(t => t.packcode == model.packcode).packname;
                obj.qrenterpriseid = model.qrenterpriseid;
                bool gt_kh = await send_kh(model);
                if (gt_kh)
                {
                    bool gt_admin = await send_admin(model);
                    if (gt_admin)
                    {
                        return _Iqr_paymentService.CreateNew(obj);
                    }
                }
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        private async Task<bool> send_kh(qr_payment moded)
        {
            var userdata = _IuserdataService.GetAll().FirstOrDefault(t => t.userid == moded.userid);
            string sub = "Thông báo xác nhận mua gói dịch vụ";
            string body = "<div><h2>Bạn đã xác nhận thanh toán gói dịch vụ QR Code của website chúng tôi</h2></div><div>Gói dịch vụ: " + moded.packname + "</div><div>Số điện thoại tài khoản: " + userdata.sdt + "</div><div>Email tài khoản: " + userdata.email + "</div><div>Vui lòng liên hệ với quản trị để xác nhận</div>";
            bool kq = await sendmaild(userdata.email, sub, body);
            return kq;
        }
        private async Task<bool> send_admin(qr_payment moded)
        {
            var userdata = _IuserdataService.GetAll().FirstOrDefault(t => t.userid == moded.userid);
            string sub = "Thông báo mua gói dịch vụ";
            string body = "<div><h2>Khách hàng đã xác nhận thanh toán gói dịch vụ</h2></div><div>Email: " + userdata.email + "</div><div>Số điện thoại: " + userdata.sdt + "</div><div>Gói dịch vụ: " + moded.packname + "</div><div>";
            bool kq = await sendmaild(_mailSettings.Mail, sub, body);
            return kq;
        }


        private async Task<bool> sendmaild(string mailnhan, string sub, string body)
        {
            try
            {
                MailRequest request = new MailRequest();
                request.ToEmail = mailnhan;//_mailSettings.Mail;
                request.Subject = sub;
                request.Body = body;
                await _mailService.SendEmailAsync(request);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }


        }
        [HttpPut]
        [Route("Active")]
        public bool Update([FromBody] qr_payment model)
        {
            try
            {
                qr_payment obj = new qr_payment();
                obj = _Iqr_paymentService.GetAll().FirstOrDefault(t => t.qrpaymentid == model.qrpaymentid);
                obj.payment_date = model.payment_date.Value.Date;
                obj.lastcreated_by = model.lastcreated_by;
                obj.lastcreated_date = DateTime.Now;
                return _Iqr_paymentService.Update(obj);
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
