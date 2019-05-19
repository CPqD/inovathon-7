using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace VeroServer2.Controllers
{
    public class ValuesController : ApiController
    {
        // GET api/values
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }
        [HttpOptions]
        public HttpResponseMessage Options()
        {
            var response = new HttpResponseMessage();
            response.StatusCode = HttpStatusCode.OK;
            return response;
        }


        // POST api/values

        [HttpPost()]
        //[DisableCors]
        public string Post([FromBody] Teste img)
        {
            try
            {
                ////QRCoder.QRCodeData s = new QRCoder.QRCodeData();
                //QRCoder.QRCodeData s = new QRCoder.QRCodeData(Convert.FromBase64String(img.img),QRCoder.QRCodeData.Compression.Uncompressed);
                //var b=s.GetRawData(QRCoder.QRCodeData.Compression.Uncompressed);
                //var tes = Genesis.QRCodeLib.QRDecoder.ByteArrayToStr(b);

                //Genesis.QRCodeLib.QRDecoder q = new Genesis.QRCodeLib.QRDecoder();
                //var matrix = q.ImageDecoder(img.img.Base64StringToBitmap());
                //var text = Genesis.QRCodeLib.QRDecoder.QRCodeResult(matrix);

                var model = new ValidaPcModel()
                {
                    ComputerName = "Windows NT 10.0",
                    Date = DateTime.Now,
                    //IP = ip,
                    Id = Guid.NewGuid(),
                };


                var text = Newtonsoft.Json.JsonConvert.SerializeObject(model);
                return text;
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }

        }


        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }

    public class Teste
    {
        public string img { get; set; }
    }
}
