using DataAccess.Core.Domain;
using DataAccess.Core.Services;
using DataAccess.Raven.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DataAccess.Web.Api
{
    public class CommonController : ApiController
    {
        IDataService _dataService = new RavenDataService();
        [AcceptVerbs("GET", "HEAD")]
        public List<Location> QueryLocations(string query)
        {
            return _dataService.QueryLocations(query);
        }
    }
}
