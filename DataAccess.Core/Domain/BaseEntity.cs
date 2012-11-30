using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;

namespace DataAccess.Core.Domain
{
    [DataContract]
    public class BaseEntity
    {
        [DataMember]
        public virtual string Id { get; set; }
    }
}
