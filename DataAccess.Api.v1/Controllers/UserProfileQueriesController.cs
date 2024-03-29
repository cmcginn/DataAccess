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

namespace DataAccess.Api.v1.Controllers
{
    public class UserProfileQueriesController : ApiController
    {
        
        IDataService _dataService = new RavenDataService();
        // GET api/profilequeries
        public IQueryable<ProfileQuery> Get()
        {
            try
            {
                return _dataService.ProfileQueries();
            }
            catch
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.InternalServerError));
            }
        }

        // GET api/profilequeries/5
        public ProfileQuery Get(string id)
        {
            try
            {
                if (id == null || id =="null")
                    return new ProfileQuery();
                else
                return  _dataService.ProfileQuery(id);
            }
            catch
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.InternalServerError));
            }
        }

        // POST api/profilequeries
        public ProfileQuery Post(ProfileQuery profileQuery)
        {
            try
            {
                if (profileQuery.Id == null || profileQuery.Id == "null")
                    profileQuery.Id = null;
                _dataService.SaveProfileQuery(profileQuery);                
                return profileQuery;
            }
            catch
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.InternalServerError));
            }
        }

        // PUT api/profilequeries/5
        [AcceptVerbs("PUT")]
        public void Put(ProfileQuery profileQuery)
        {
            try
            {
                _dataService.SaveProfileQuery(profileQuery);
            }
            catch
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.InternalServerError));
            }
        }

        // DELETE api/profilequeries/5
        public void Delete(string id)
        {
            try
            {
                _dataService.DeleteProfileQuery(id);
            }
            catch
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.InternalServerError));
            }
        }
    }
}
