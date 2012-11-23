using DataAccess.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DataAccess.Core.Services
{
    public interface IDataService
    {
        List<Location> QueryLocations(string query);  
    }
}
