using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DataAccess.Core.Infrastructure
{
    public class WorkContext
    {
        string _CurrentUserId = "users/193";
        string _UserSessionId = "UserSessions/353";

        public string UserSessionId
        {
            get { return _UserSessionId; }
            set { _UserSessionId = value; }
        }
        public string CurrentUserId
        {
            get { return _CurrentUserId; }
            set { _CurrentUserId = value; }
        }
    }
}
