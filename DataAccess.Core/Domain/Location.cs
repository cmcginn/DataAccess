using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DataAccess.Core.Domain
{
    public class Location:BaseEntity
    {
        public virtual string Code { get; set; }
        public virtual string Name { get; set; }
    }
}
