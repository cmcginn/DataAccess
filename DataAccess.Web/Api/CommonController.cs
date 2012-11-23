using DataAccess.Core.Domain;
using DataAccess.Core.Services;
using DataAccess.Raven.Services;
using DataAccess.Web.Models;
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
        public List<SelectItem> QueryLocations(string query)
        {
            var results = _dataService.QueryLocations(query).Select(x => new SelectItem { Id = x.Code, Name = x.Name, Selected = false });
            return results.ToList();
        }
        [AcceptVerbs("POST")]
        public void SaveCity(SelectItem city)
        {
            var x = city;
        }
    }
}
