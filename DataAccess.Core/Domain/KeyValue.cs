using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DataAccess.Core.Domain
{
    [Serializable]
    public class KeyValue<T>
    {
        public virtual string Key { get; set; }
        public virtual T Value { get; set; }
    }
}
