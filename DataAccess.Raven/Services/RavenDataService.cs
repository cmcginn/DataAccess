using DataAccess.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Raven.Abstractions;
using Raven.Client.Document;
using DataAccess.Core.Domain;
using Raven.Client;
using DataAccess.Core.Infrastructure;
using DataAccess.Core.Extensions;
using Raven.Client.Linq;
namespace DataAccess.Raven.Services
{
    public class RavenDataService : IDataService
    {
        WorkContext _workContext = new WorkContext();
        DocumentStore GetDocumentStore()
        {
            var result = new DocumentStore { ConnectionStringName = "RavenDB" };            
            result.DefaultDatabase = "Test";
            result.Initialize();
            return result;
        }


        #region ProfileQueries
        public IQueryable<ProfileQuery> ProfileQueries(string userId)
        {
            using (var documentStore = GetDocumentStore())
            {
                using (var session = documentStore.OpenSession())
                {
                    return session.Query<ProfileQuery>().Where(x => x.UserId == userId);
                }
            }
        }
        #endregion

        #region Locations
        public IQueryable<Location> Locations()
        {
            var documentStore = GetDocumentStore();

            var session = documentStore.OpenSession();

            return session.Query<Location>();

            // }
            //using (var documentStore = GetDocumentStore())
            //{
            //    using (var session = documentStore.OpenSession())
            //    {
            //        return session.Query<Location>();
            //    }
            //}
        }

        #endregion

        public List<Core.Domain.Location> QueryLocations(string query)
        {
            using (var documentStore = GetDocumentStore())
            {
                using (var session = documentStore.OpenSession())
                {
                    var results = session.Advanced.LuceneQuery<Location>().Where(query);
                    return results.ToList();
                }
            }
        }


        public ProfileQuery CreateProfileQuery(string userId)
        {
            ProfileQuery result = null;
            using (var documentStore = GetDocumentStore())
            {
                using (var session = documentStore.OpenSession())
                {
                    //get list of names
                    var existingQueryNames = session.Advanced.LuceneQuery<ProfileQuery>().WhereEquals("UserId", _workContext.CurrentUserId).Select(x => x.Name).ToList();
                    var uniqueName = existingQueryNames.UniqueName("New Search");
                    result = new ProfileQuery { UserId = _workContext.CurrentUserId, Name = uniqueName, LocationIds = new List<string>() };
                    session.Store(result);
                    session.SaveChanges();
                }
            }
            return result;
        }

        public void SaveProfileQuery(ProfileQuery query)
        {
            using (var documentStore = GetDocumentStore())
            {
                using (var session = documentStore.OpenSession())
                {
                    session.Store(query);
                    session.SaveChanges();
                }
            }
        }
        public ProfileQuery GetProfileQuery(string profileQueryId)
        {
            ProfileQuery result;
            using (var documentStore = GetDocumentStore())
            {
                using (var session = documentStore.OpenSession())
                {
                    result = session.Load<ProfileQuery>(profileQueryId);
                }
            }
            return result;
        }
        public void SaveUserSession(UserSession userSession)
        {
            using (var documentStore = GetDocumentStore())
            {
                using (var session = documentStore.OpenSession())
                {
                    var us = session.Load<UserSession>(userSession.Id);
                    us.Data = userSession.Data;
                    session.SaveChanges();
                }
            }
        }
        public UserSession GetUserSession(string userSessionId)
        {
            UserSession result = null;
            using (var documentStore = GetDocumentStore())
            {
                using (var session = documentStore.OpenSession())
                {
                    result = session.Load<UserSession>(userSessionId);
                }
            }
            return result;
        }
    }
}
