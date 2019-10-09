using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPISample.Models;

namespace WebAPISample.Controllers
{
    public class MovieController : ApiController
    {
        ApplicationDbContext context;
        public MovieController()
        {
            context = new ApplicationDbContext();
         }
        public IEnumerable<Movie> Get()
        {
           
            return context.Movies.ToList(); ;
        }

        // GET api/values/5
        public string Get(int id)
        {

            return "value";
        }

        // POST api/values
        public void Post([FromBody]Movie value)
        {
            // Create movie in db logic
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
            // Update movie in db logic
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
            // Delete movie from db logic
        }
    }

}