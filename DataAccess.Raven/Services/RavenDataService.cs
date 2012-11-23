using DataAccess.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Raven.Abstractions;
using Raven.Client.Document;
using DataAccess.Core.Domain;
using Raven.Client;

namespace DataAccess.Raven.Services
{
    public class RavenDataService : IDataService
    {
        DocumentStore GetDocumentStore()
        {
            var result = new DocumentStore { ConnectionStringName = "RavenDB" };
            result.DefaultDatabase = "Test";
            result.Initialize();
            return result;
        }
        
       
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
    }
}
