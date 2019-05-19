using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace VeroServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ValuesController : ControllerBase
    {
        public ValuesController()
        {
            
            //SupportedMediaTypes.Add(MediaTypeHeaderValue.Parse("text/vcard"));
            //SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/plain"));
        }
        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        //// POST api/values
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}
        [HttpPost()]
        [EnableCors("AllowAllHeaders")]
        //[DisableCors]
        public ActionResult<string> Post([FromBody] Teste img)
        {
            try
            {
                Genesis.QRCodeLib.QRDecoder q = new Genesis.QRCodeLib.QRDecoder();
                var matrix = q.ImageDecoder(img.img.Base64StringToBitmap());
                var text = Genesis.QRCodeLib.QRDecoder.QRCodeResult(matrix);

                return text;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        public class Teste
        {
            public string img { get; set; }
        }
        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
