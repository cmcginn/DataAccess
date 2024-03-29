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
using System.Web.Http.OData.Query;


namespace DataAccess.Api.v1.Controllers
{
     
    public class LocationsController : ApiController
    {
        WorkContext _workContext = new WorkContext();
        IDataService _dataService = new RavenDataService();
        // GET api/locations
        [Queryable(HandleNullPropagation = HandleNullPropagationOption.False)] 
        public IQueryable<Location> Get()
        {
            return _dataService.Locations();           
        }

        // GET api/locations/5
        public Location Get(string id)
        {
            return _dataService.Location(id);
        }

        // POST api/locations
        public void Post(Location location)
        {
            throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.MethodNotAllowed));
        }

        // PUT api/locations/5
        public void Put(Location location)
        {
            throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.MethodNotAllowed));
        }

        // DELETE api/locations/5
        public void Delete(string id)
        {
            throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.MethodNotAllowed));
        }
    }
}
