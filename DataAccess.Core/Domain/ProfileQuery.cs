using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;

namespace DataAccess.Core.Domain
{
    [DataContract]
    public class ProfileQuery:BaseEntity
    {
        [DataMember]
        public virtual string UserId { get; set; }
        [DataMember]
        public virtual string Name { get; set; }
        [DataMember]
        public virtual List<Location> LocationCodes { get; set; }
    }
}
