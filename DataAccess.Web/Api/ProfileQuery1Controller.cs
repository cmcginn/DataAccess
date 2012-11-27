using DataAccess.Core.Domain;
using DataAccess.Core.Infrastructure;
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
    public class ProfileQuery1Controller : ApiController
    {
        WorkContext _workContext = new WorkContext();
        IDataService _dataService = new RavenDataService();
        // GET api/profilequery
        [AcceptVerbs("GET", "HEAD")]
        public ProfileQuery Get()
        {
            var result = _dataService.CreateProfileQuery(_workContext.CurrentUserId);
            return result;
        }

        // GET api/profilequery/5
        [AcceptVerbs("GET","HEAD")]
        public ProfileQuery Get(string id)
        {
            return _dataService.GetProfileQuery(id);
        }

        // POST api/profilequery
        public void Post([FromBody]string value)
        {
        }

        // PUT api/profilequery/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/profilequery/5
        public void Delete(int id)
        {
        }
    }
}
