﻿using DataAccess.Core.Domain;
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
     
    public class LocationsController : ApiController
    {
        WorkContext _workContext = new WorkContext();
        IDataService _dataService = new RavenDataService();
        // GET api/locations
        [Queryable]
        public IQueryable<Location> Get()
        {
            return _dataService.Locations();
        }

        // GET api/locations/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/locations
        public void Post([FromBody]string value)
        {
        }

        // PUT api/locations/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/locations/5
        public void Delete(int id)
        {
        }
    }
}
