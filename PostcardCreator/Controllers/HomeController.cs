﻿using System;
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

        static void SendEmail(string server, string email, Attachment item) {
            SmtpClient client = new SmtpClient(server);
            MailMessage mm = new MailMessage("noreply@gmail.com", email);
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
            uploadedFile = file;
            string directory = "~/Uploads";
            if (file != null && file.ContentLength > 0)
            {
                //uploadedFile = file.FileName;
                var fileName = Path.GetFileName(file.FileName);
                var extension = Path.GetExtension(fileName);
                ViewBag.Extension = Path.GetExtension(fileName);
                file.SaveAs(Server.MapPath(directory + "/new" + extension));
            }

            return RedirectToAction("Change");
        }

        // Partial Views...
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
        [HttpGet]
        public ActionResult Change()
        {
            //System.NullReferenceException: 'Object reference not set to an instance of an object.'
            try
            {
                var fileName = Path.GetFileName(uploadedFile.FileName);
                ViewBag.Extension = Path.GetExtension(fileName);
                return View();
            }
            catch (NullReferenceException e)
            {
                ViewBag.Error = e.Message;
                return RedirectToAction("Index");
            }
        }
        [HttpPost]
        public ActionResult Change(string imageData) {
            string directory = "~/Uploads";
            string fileNameWitPath = directory + DateTime.Now.ToString().Replace("/", "-").Replace(" ", "- ").Replace(":", "") + ".png";

            using (FileStream fs = new FileStream(Server.MapPath(fileNameWitPath), FileMode.Create)) {
                using (BinaryWriter bw = new BinaryWriter(fs)) {
                    byte[] data = Convert.FromBase64String(imageData);
                    bw.Write(data);
                    bw.Close();
                }
            }

            return RedirectToAction("Index");
        }

        public ActionResult SaveUploadedFile()
        {
            bool isSavedSuccessfully = true;
            string fName = "";
            string directory = "~/Uploads";
            try
            {
                foreach (string fileName in Request.Files)
                {
                    HttpPostedFileBase file = Request.Files[fileName];
                    //Save file content goes here
                    fName = file.FileName;
                    if (file != null && file.ContentLength > 0)
                    {
                        var originalDirectory = new DirectoryInfo(string.Format("{0}Images\\WallImages", Server.MapPath(@"\")));
                        var fileName1 = Path.GetFileName(file.FileName);
                        if (!Directory.Exists(directory))
                            Directory.CreateDirectory(directory);
                        var path = Server.MapPath(directory + "/" + file.FileName);
                        file.SaveAs(path);
                    }
                }
            }
            catch (Exception ex)
            {
                isSavedSuccessfully = false;
            }

            if (isSavedSuccessfully)
            {
                return RedirectToAction("Change");
            }
            else
            {
                return RedirectToAction("Index");
            }
        }
    }
}