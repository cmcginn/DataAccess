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
        List<Location> _Locations;
        [DataMember]
        public virtual List<Location> Locations
        {
            get
            {
                return _Locations ?? (_Locations = new List<Location>());
            }
            set { _Locations = value; }
        }
        List<Phrase> _Phrases;
        [DataMember]
        public virtual List<Phrase> Phrases {
            get
            {
                return _Phrases ?? (_Phrases = new List<Phrase>());
            }
            set
            {
                _Phrases = value;
            }
        }
       
    }
}
