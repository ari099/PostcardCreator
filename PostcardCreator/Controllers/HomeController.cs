using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;

namespace PostcardCreator.Controllers {
    public class HomeController : Controller {
        private static HttpPostedFileBase uploadedFile;

        public static void LoadViewBag(dynamic viewBag)
        {
            viewBag.aaa = "something";
        }

        /// <summary>
        /// Send an email with the image attached...
        /// </summary>
        /// <param name="server"></param>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <param name="from"></param>
        /// <param name="to"></param>
        /// <param name="item"></param>
        static void SendEmail(string server, string username, string password, string from, string to, Attachment item) {
            SmtpClient client = new SmtpClient(server);
            client.Port = 587;
            client.Credentials = new NetworkCredential(username, password);
            client.EnableSsl = true;
            MailMessage mm = new MailMessage(from, to);
            mm.Subject = "Your Postcard";
            mm.Body = "Hope you enjoy the new postcard!";
            mm.Attachments.Add(item);
            client.Send(mm);
        }

        /// <summary>
        /// Home page...
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult Index() {
            return View();
        }

        /// <summary>
        /// Home Page (Upload File)...
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult Index(HttpPostedFileBase file) {
            uploadedFile = file;
            string directory = "~/Uploads";
            if (file != null && file.ContentLength > 0) {
                var fileName = Path.GetFileName(file.FileName);
                var extension = Path.GetExtension(fileName);
                ViewBag.Extension = Path.GetExtension(fileName);
                file.SaveAs(Server.MapPath(directory + "/new" + extension));
            }

            return RedirectToAction("Change");
        }

        // Partial Views...
        public ActionResult FileUpload() {
            return PartialView();
        }
        public ActionResult DragAndDrop() {
            return PartialView();
        }
        public ActionResult WebCam() {
            return PartialView();
        }

        /// <summary>
        /// Changing image page...
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult Change() {
            //System.NullReferenceException: 'Object reference not set to an instance of an object.'
            try {
                var fileName = Path.GetFileName(uploadedFile.FileName);
                ViewBag.Extension = Path.GetExtension(fileName);
                return View();
            } catch (NullReferenceException e) {
                ViewBag.Error = e.Message;
                return RedirectToAction("Index");
            }
        }
        [HttpPost]
        public ActionResult Modified() {
            string imageData = Request["modified"];
            string directory = "~/Uploads";
            string fileNameWitPath = directory + "/modified.png";

            using (FileStream fs = new FileStream(Server.MapPath(fileNameWitPath), FileMode.Create)) {
                using (BinaryWriter bw = new BinaryWriter(fs)) {
                    byte[] data = Convert.FromBase64String(imageData);
                    bw.Write(data);
                    bw.Close();
                    ViewBag.Success = "Image sent!";
                }
            }

            // implement SendEmail function here.
            
            return RedirectToAction("Index");
        }
    }
}