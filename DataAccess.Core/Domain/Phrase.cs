using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;

namespace DataAccess.Core.Domain
{
    [DataContract]
    public class Phrase
    {
        [DataMember]
        public string Value { get; set; }
        [DataMember]
        public int Score { get; set; }
    }
}
