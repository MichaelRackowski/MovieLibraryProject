using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPISample.Models
{
    public class Movie
    {
        public int MovieId { get; set; }
        public string Genre { get; set; }
        public string Title { get; set; }
<<<<<<< HEAD
        public string Genre { get; set; }
        public string DirectorName { get; set; }
=======
        public string Director { get; set; }
        
>>>>>>> af5826ca3b25214b559a09b3a91a4af849c89fd1
    }
}