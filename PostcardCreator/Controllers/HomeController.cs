using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PostcardCreator.Controllers {
    public class HomeController : Controller {
        /// <summary>
        /// Home page...
        /// </summary>
        /// <returns></returns>
        public ActionResult Index() {
            return View();
        }

        [HttpPost]
        public ActionResult Upload() {
            string directory = "~/App_Data/Uploads";
            var upload = Request.Files["file"];
            if(upload != null && upload.ContentLength > 0) {
                var fileName = Path.GetFileName(upload.FileName);
                upload.SaveAs(Server.MapPath(directory + "/" + fileName));
            }

            return RedirectToAction("Index");
        }
    }
}