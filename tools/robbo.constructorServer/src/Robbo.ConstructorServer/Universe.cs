using System.Collections.Generic;

namespace Robbo.Local.API
{
    public class Universe
    {
        public Universe()
        {
            games = new List<Game>();
        }
        public IList<Game> games { get; set; }
    }
}