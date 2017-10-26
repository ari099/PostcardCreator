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
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// Home Page (Upload File)...
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult Index(HttpPostedFileBase file)
        {
            string directory = "~/App_Data/Uploads";
            if (file != null && file.ContentLength > 0)
            {
                var fileName = Path.GetFileName(file.FileName);
                file.SaveAs(Server.MapPath(directory + "/" + fileName));
            }

            return RedirectToAction("Index");
        }

        public ActionResult FileUpload()
        {
            return PartialView();
        }
        public ActionResult DragAndDrop()
        {
            return PartialView();
        }
        public ActionResult WebCam()
        {
            return PartialView();
        }

        /// <summary>
        /// Changing image page...
        /// </summary>
        /// <returns></returns>
        public ActionResult Change()
        {
            return View();
        }
    }
}