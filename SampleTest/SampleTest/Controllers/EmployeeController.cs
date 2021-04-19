using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SampleTest.Controllers
{
    public class EmployeeController : ApiController
    {
        public string Get()
        {
            return "Check my New WebAPI Controler";
        }
    }
}
