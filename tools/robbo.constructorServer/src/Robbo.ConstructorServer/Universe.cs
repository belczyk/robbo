using System.Collections.Generic;

namespace Robbo.Local.API
{
    public class Universe
    {
        public Universe()
        {
            Games = new List<Game>();
        }
        public IList<Game> Games { get; set; }
    }
}