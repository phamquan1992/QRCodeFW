using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace QRCode.FEW.Extensions.Common
{
    public class Helper
    {
        public string path_file(string ac_upload)
        {
            var extractPath = Path.Combine(@"ClientApp");
            string[] files = Directory.GetDirectories(extractPath, "*.*", SearchOption.AllDirectories);
            var file_find = files.Where(t => t.Contains("assets"));
            var file_find_2 = file_find.Where(t => t.EndsWith(ac_upload));
            var gt = file_find_2.Select(t => t.Split(ac_upload)[0] + ac_upload);
            var temp = from a in gt
                       group a by a into gr
                       select gr.Key;
            var any_src = temp.Any(t => t.Contains(@"ClientApp\src\assets"));
            if (any_src)
                return Path.Combine(@"ClientApp\src\assets\qr_image", ac_upload);
            else
                return temp.FirstOrDefault();
        }
    }
}
