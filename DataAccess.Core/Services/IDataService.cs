using DataAccess.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DataAccess.Core.Services
{
    public interface IDataService
    {

        #region Locations
        IQueryable<Location> Locations();
        IQueryable<Location> StateProvinces();
        Location StateProvince(string code);
        Location Location(string code);
        #endregion
        #region Profile Queries
        IQueryable<ProfileQuery> ProfileQueries();
        ProfileQuery ProfileQuery(string id);
        void SaveProfileQuery(ProfileQuery profileQuery);
        void DeleteProfileQuery(string id);
        #endregion
    }
}
