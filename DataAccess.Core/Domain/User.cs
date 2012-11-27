using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DataAccess.Core.Domain
{
    public class User:BaseEntity
    {
        public virtual string Username { get; set; }
        public virtual string Password { get; set; }
    }
}
