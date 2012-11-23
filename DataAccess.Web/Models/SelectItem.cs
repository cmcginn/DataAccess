using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DataAccess.Web.Models
{
    public class SelectItem
    {
        public virtual string Id { get; set; }
        public virtual string Name { get; set; }
        public bool Selected { get; set; }
    }
}