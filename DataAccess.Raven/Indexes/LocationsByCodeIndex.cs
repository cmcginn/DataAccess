using DataAccess.Core.Domain;
using Raven.Client.Indexes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DataAccess.Raven.Indexes
{
    public class LocationsByCodeIndex:AbstractIndexCreationTask<Location>
    {
        public LocationsByCodeIndex()
        {
            Map = locations => from location in locations select new Location { Id = location.Id, Code = location.Code, Name = location.Name };

            Indexes.Add(x => x.Code, global::Raven.Abstractions.Indexing.FieldIndexing.Analyzed);
        }
    }
}
