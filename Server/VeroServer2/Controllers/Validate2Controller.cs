using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using VeroServer2.Controllers;
//using System.Web.Mvc;
//using Microsoft.AspNetCore.Cors;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;

namespace VeroServer.Controllers
{
    //[EnableCors("AllowAllHeaders")]
    public class Validate2Controller : ApiController
    {
        private static Dictionary<Guid, string> keys = new Dictionary<Guid, string>();

        // GET api/values
        public ValidaPcModel Get()
        {
            var ua = Request.Headers.GetValues("User-Agent").ToString();

            var match = Regex.Match(ua, @"(.*?) \((?'plataforma'.*?)\) ");

            var ip = "";// HttpContext.Current..RemoteIpAddress.ToString();

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

        
       

    }
}