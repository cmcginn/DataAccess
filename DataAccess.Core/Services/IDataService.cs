using DataAccess.Core.Domain;
using Raven.Client.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DataAccess.Core.Services
{
    public interface IDataService
    {
        List<Location> QueryLocations(string query);
        ProfileQuery CreateProfileQuery(string userId);
        ProfileQuery GetProfileQuery(string profileQueryId);
        void SaveProfileQuery(ProfileQuery query);
        UserSession GetUserSession(string userSessionId);
        void SaveUserSession(UserSession userSession);
        IQueryable<Location> Locations();
    }
}
