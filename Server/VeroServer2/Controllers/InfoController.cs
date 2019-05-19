using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace VeroServer2.Controllers
{
    public class InfoController : ApiController
    {
        private static Dictionary<string, RequestUserModel> aguardando = new Dictionary<string, RequestUserModel>();
        private static Dictionary<string, RequestUserModel> finalizado = new Dictionary<string, RequestUserModel>();
        [HttpPost]
        public async Task<Dictionary<string, string>> RequestUser([FromBody]RequestUserModel model)
        {
            //var id = Request.Headers.GetCookies("pkey").FirstOrDefault().ToString();
            model.Id = "5Kb8kLf9zgWQnogidDA76Mz_SAMPLE_PRIVATE_KEY_DO_NOT_IMPORT_PL6TsZZY36hWXMssSzNydYXYB9KF";
            aguardando[model.Id] = model;
            return await Task.Run(() =>
             {
                 while (true)
                 {
                     if (finalizado.ContainsKey(model.Id))
                     {
                         var m = finalizado[model.Id];
                         finalizado.Remove(model.Id);
                         return m.Response;
                     }

                     Task.Delay(1000);
                 }
             });


        }
        [HttpOptions]
        public HttpResponseMessage Options()
        {
            var response = new HttpResponseMessage();
            response.StatusCode = HttpStatusCode.OK;
            return response;
        }
        [HttpGet]
        public RequestUserModel CheckUser(string id)
        {
            if (aguardando.ContainsKey(id))
            {
                var a = aguardando[id];
                aguardando.Remove(id);
                return a;
            }
            else
                return null;
        }

        [HttpPost]
        public void ConfirmarTransacao(string id, [FromBody] RequestUserModel model)
        {
            finalizado[id] = model;
        }

    }

    public class RequestUserModel
    {
        public string Id { get; set; }
        public string StoreName { get; set; }
        public string[] Fields { get; set; }
        public double Value { get; set; }
        public Dictionary<string, string> Response { get; set; }

    }
}
