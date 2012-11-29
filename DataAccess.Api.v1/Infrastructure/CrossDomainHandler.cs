using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web;

namespace DataAccess.Api.v1.Infrastructure
{
    public class CrossDomainHandler:DelegatingHandler
    {
        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            var result = base.SendAsync(request, cancellationToken);
            result.Wait();
            result.Result.Headers.Add("Access-Control-Allow-Origin", "*");
            return result;
        }

        
    }
}