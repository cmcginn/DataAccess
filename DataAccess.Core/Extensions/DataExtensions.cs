using DataAccess.Core.Domain;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DataAccess.Core.Extensions
{
    public static class DataExtensions
    {
        public static void SetProperty<T>(this UserSession userSession, string key, T value)
        {
            var obj = JsonConvert.DeserializeObject<JObject>(userSession.Data);
            obj.Remove(key);
            var objectValue = JsonConvert.SerializeObject(value);
            obj.Add(new JProperty(key, objectValue));
            userSession.Data = JsonConvert.SerializeObject(obj);
        }

        public static T GetProperty<T>(this UserSession userSession, string key)
        {
            T result = default(T);
            var obj = JObject.Parse(userSession.Data);
            var item = obj.SelectToken(key);
            if (item != null)
            {
                result = JsonConvert.DeserializeObject<T>(item.ToString());
            }
            return result;
        }

        public static string UniqueName(this List<string> names, string prefix)
        {
            int counter = 1;
            string uniqueName = prefix;
            while (names.Where(x => x.ToLower() == uniqueName.ToLower()).Count() > 0)
            {
                uniqueName = String.Format("{0} {1}", uniqueName, counter);
                counter++;
            }
            return uniqueName;
        }
    }
}
