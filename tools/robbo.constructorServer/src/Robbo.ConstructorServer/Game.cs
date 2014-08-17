using System.Collections.Generic;


namespace Robbo.Local.API
{
    public class Game
    {
        public Game()
        {
            Planets = new List<Planet>();
        }
        public string Name { get; set; }
        public IList<Planet> Planets { get; set; } 
        public int StartingNumberOfLives { get; set; }
    }
}
