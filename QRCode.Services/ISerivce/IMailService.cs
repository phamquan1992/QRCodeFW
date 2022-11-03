using QRCode.Core.Domain2;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace QRCode.Services.ISerivce
{
    public interface IMailService
    {
        Task SendEmailAsync(MailRequest mailRequest);
    }
}
