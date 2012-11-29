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

        #endregion

        #region Locations
        public IQueryable<Location> Locations()
        {
            var documentStore = GetDocumentStore();

            var session = documentStore.OpenSession();

            return session.Query<Location>();

        }
        public Location StateProvince(string code)
        {
            var documentStore = GetDocumentStore();
            var session = documentStore.OpenSession();
            return session.Load<Location>(code);
        }
        public IQueryable<Location> StateProvinces()
        {
            var documentStore = GetDocumentStore();
            var session = documentStore.OpenSession();
            return session.Advanced.LuceneQuery<Location>().Where("Code: US??").AsQueryable();
        }
        public Location Location(string code)
        {
            var documentStore = GetDocumentStore();
            var session = documentStore.OpenSession();
            return session.Advanced.LuceneQuery<Location>().WhereEquals("Code", code).Single();
        }
        #endregion

        #region Profile Queries
        public IQueryable<ProfileQuery> ProfileQueries()
        {
            throw new NotImplementedException();
        }

        public ProfileQuery ProfileQuery(string id)
        {
            throw new NotImplementedException();
        }

        public void DeleteProfileQuery(string id)
        {
            throw new NotImplementedException();
        }
        public void SaveProfileQuery(ProfileQuery profileQuery)
        {
            var documentStore = GetDocumentStore();
            var session = documentStore.OpenSession();
            if (!String.IsNullOrEmpty(profileQuery.Id))
            {
                var existing = session.Load<ProfileQuery>(profileQuery.Id);
            }
            else
            {
                profileQuery.UserId = _workContext.CurrentUserId;
                session.Store(profileQuery);
                session.SaveChanges();
            }
        }
        #endregion






    }
}
