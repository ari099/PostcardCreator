using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PostcardCreator.Controllers {
    public class HomeController : Controller {
        public ActionResult Index() {
            return View();
        }
    }
}