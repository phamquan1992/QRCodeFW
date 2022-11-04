using QRCode.Core.Domain2;
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
        public List<package_objet> GetPackage_Objets()
        {
            List<package_objet> list_pack = new List<package_objet>
            {
                new package_objet{packcode="Pack1",packname="Gói 5 mã 1 năm",price=2500000},
                new package_objet{packcode="Pack2",packname="Gói 10 mã 1 năm",price=3000000},
                new package_objet{packcode="Pack3",packname="Gói 20 mã 1 năm",price=4000000}
            };
            return list_pack;
        }
    }
}
