using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;

namespace DataAccess.Core.Domain
{
    [DataContract]
    public class Location:BaseEntity
    {
        [DataMember]
        public virtual string Code { get; set; }
        [DataMember]
        public virtual string Name { get; set; }
    }
}
