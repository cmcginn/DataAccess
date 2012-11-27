using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DataAccess.Core.Domain
{
    
    public class ProfileQuery:BaseEntity
    {
        public virtual string UserId { get; set; }
        public virtual string Name { get; set; }
        public virtual List<string> LocationIds { get; set; }
    }
}
