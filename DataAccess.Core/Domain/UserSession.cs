
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DataAccess.Core.Domain
{
    public class UserSession:BaseEntity
    {
        public virtual string Data { get; set; }
    }
}
