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
        private ApplicationDbContext context;

        public MovieController()
        {
            context = new ApplicationDbContext();
        }

        // GET api/Movies
        public IEnumerable<Movie> GetMovies()
        {
           // Retrieve all movies from db logic
            return context.Movies.ToList();

        }

        // GET api/Movies/5
        [HttpGet]
        public Movie GetMovie(int id)
        {
            // Retrieve movie by id from db logic
            var movie = context.Movies.SingleOrDefault(c => c.MovieId == id);
            
            if (movie == null)
                throw new HttpResponseException(HttpStatusCode.NotFound);
            return movie;
        }

        // POST api/values
        [HttpPost]
        public Movie CreateMovie([FromBody]Movie movie)
        {
            if (!ModelState.IsValid)          
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            
            context.Movies.Add(movie);
            context.SaveChanges();
            return movie;

        }

        // PUT api/movies/5
        [HttpPut]
        public Movie UpdateMovie(int id,[FromBody] Movie movie)
        {
            if (!ModelState.IsValid)
                throw new HttpResponseException(HttpStatusCode.BadRequest);

            var movieInDb = context.Movies.SingleOrDefault(c => c.MovieId == id);

            if(movieInDb == null)
                if (!ModelState.IsValid)
                    throw new HttpResponseException(HttpStatusCode.NotFound);

            movieInDb.Genre = movie.Genre;
            movieInDb.Title = movie.Title;
            movieInDb.DirectorName = movie.DirectorName;

            context.SaveChanges();
            return movieInDb;
        }

        // DELETE api/values/5
        [HttpDelete]
        public void DeleteMovie(int id)
        {
            var movieInDb = context.Movies.SingleOrDefault(c => c.MovieId == id);

            if (!ModelState.IsValid)
                throw new HttpResponseException(HttpStatusCode.NotFound);

            context.Movies.Remove(movieInDb);
            context.SaveChanges();


        }
    }

}