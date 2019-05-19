using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Web.Http;

namespace VeroServer2.Controllers
{
    public class ValidateController : ApiController
    {
        private static Dictionary<Guid, string> keys = new Dictionary<Guid, string>();
        // GET: api/Validate
        public ValidaPcModel Get()
        {
            var ua = Request.Headers.GetValues("User-Agent").ToString();

            var match = Regex.Match(ua, @"(.*?) \((?'plataforma'.*?)\) ");

            var ip = "";//Request..HttpContext.Connection.RemoteIpAddress.to

            var model = new ValidaPcModel()
            {
                ComputerName = match.Groups["plataforma"].Value.Split(';')[0],
                Date = DateTime.Now,
                IP = ip,
                Id = Guid.NewGuid(),
            };
            keys[model.Id] = "";

            return model;
        }

        public string GetPubKey(Guid id)
        {
            try
            {
                if (keys.ContainsKey(id))
                    return keys[id];
                else

                    return "";
            }
            catch
            {
                return "";
            }
        }

        [HttpPost]
        public string SetPkey(ValidadoPcModel dados)
        {

            if (keys.ContainsKey(dados.Id))
                keys[dados.Id] = dados.PublicKey;

            return "";
        }

        [HttpOptions]
        public HttpResponseMessage Options()
        {
            var response = new HttpResponseMessage();
            response.StatusCode = HttpStatusCode.OK;
            return response;
        }
    }

    public class ValidaPcModel
    {
        public string ComputerName { get; set; }
        public DateTime Date { get; set; }
        public string IP { get; set; }
        public Guid Id { get; set; }
    }
    public class ValidadoPcModel
    {
        public Guid Id { get; set; }
        public string PublicKey { get; set; }
    }
}
