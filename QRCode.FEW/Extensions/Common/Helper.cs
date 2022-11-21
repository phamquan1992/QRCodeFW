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
        public string CopyFileImg(string fileold, string fileFrom, string forder_from, string forder_copy)
        {
            if (fileold == fileFrom)
            {
                return fileold;
            }
            else
            {
                try
                {

                    if (string.IsNullOrEmpty(fileFrom))
                    {
                        return fileFrom;
                    }
                    else
                    {
                        string str_from = path_file(forder_from).Replace("\\","/");
                        string str_to = path_file(forder_copy).Replace("\\", "/");

                        string fileTo = replacelink(fileFrom, forder_from, forder_copy);

                        string link_from = replacelink(fileFrom, "./assets/qr_image/"+  forder_from, str_from);
                        string link_to = replacelink(fileTo, "./assets/qr_image/"+ forder_copy, str_to);

                        bool fileexist = File.Exists(link_to);
                        if (!fileexist)
                            System.IO.File.Copy(link_from, link_to);
                        return fileTo;
                    }
                }
                catch (Exception ex)
                {
                    return fileold;
                }
            }
        }
        public string replacelink(string inputtxt, string ipold, string ipnew)
        {
            return inputtxt.Replace(ipold, ipnew);
        }
    }
    public class FORDERConstant
    {
        public const string Product_tmp = "products_tmp";
        public const string Product = "products";
        public const string enterprise = "enterprise";
        public const string enterprise_tmp = "enterprise_tmp";
    }
}
