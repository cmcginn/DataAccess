using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;

namespace DataAccess.Core.Domain
{
    [DataContract]
    public class User:BaseEntity
    {
        [DataMember]
        public virtual string Username { get; set; }
        [DataMember]
        public virtual string Password { get; set; }
        [DataMember]
        public virtual string EmailAddress { get; set; }
    }
}
