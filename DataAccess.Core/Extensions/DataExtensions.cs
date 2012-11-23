using DataAccess.Core.Domain;
using Newtonsoft.Json.Linq;
using Raven.Imports.Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DataAccess.Core.Extensions
{
    public static class DataExtensions
    {
        public static T GetProperty<T>(this UserSession userSession,string key)
        {
            T result = default(T);
           
            var jObj = JsonConvert.DeserializeObject<JObject>(userSession.Data);
            JToken i;
            if (jObj.TryGetValue(key, out i))
                result = i.Value<T>();
            return (T)result;
        }

        public static void SetProperty(this UserSession userSession,string key, JToken value)
        {
            var result = false;
            var jObj = JsonConvert.DeserializeObject<JObject>(userSession.Data);
            jObj.Property(key).Value = value;
            userSession.Data = jObj.ToString();
        }
    }
}
