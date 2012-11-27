//using DataAccess.Core.Domain;
//using DataAccess.Core.Services;
//using DataAccess.Raven.Services;
//using DataAccess.Web.Models;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Net;
//using System.Net.Http;
//using System.Web.Http;
//using DataAccess.Core.Extensions;
//using Newtonsoft.Json.Linq;
//using DataAccess.Core.Infrastructure;
//namespace DataAccess.Web.Api
//{
//    public class Common1Controller : ApiController
//    {
//        IDataService _dataService = new RavenDataService();
//        WorkContext _workContext = new WorkContext();
//        [AcceptVerbs("GET", "HEAD")]
//        [ActionName("QueryLocations")]
//        public List<SelectItem> QueryLocations(string query)
//        {
//            var results = _dataService.QueryLocations(query).Select(x => new SelectItem { Id = x.Code, Name = x.Name, Selected = false });
//            return results.ToList();
//        }
//        [AcceptVerbs("GET", "HEAD")]
//        [ActionName("CreateProfileQuery")]
//        public ProfileQuery CreateProfileQuery()
//        {

           
//               return _dataService.CreateProfileQuery("users/193");
       
//        }

//        //[ActionName("GetProfileQuery")]
//        //public ProfileQuery GetProfileQuery(string id)
//        //{
//        //    return _dataService.GetProfileQuery(id);
//        //}
//        [AcceptVerbs("POST")]
//        [ActionName("SaveLocation")]
//        public void SaveLocation(SelectItem city,string profileQueryId)
//        {
//            var userSession = _dataService.GetUserSession(_workContext.UserSessionId);
//            var queryProfile = userSession.GetProperty<ProfileQuery>("CurrentProfileQuery");
//            var exists = queryProfile.LocationIds.Count(x => x==city.Id)>0;
//            if (city.Selected &! exists)
//            {
//                queryProfile.LocationIds.Add(city.Id);
//            }
//            else if (!city.Selected && exists)
//            {
//                queryProfile.LocationIds.Remove(city.Id);
//            }
//            userSession.SetProperty<ProfileQuery>("CurrentProfileQuery", queryProfile);
//            _dataService.SaveUserSession(userSession);
//        }
//        //[AcceptVerbs("POST")]
//        //public UserQuery SaveQuery(UserQuery query)
//        //{
//        //    return UserQuery;
//        //}
//    }
//}
