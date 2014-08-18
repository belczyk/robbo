using System.Collections.Generic;


namespace Robbo.Local.API
{
    public class Game
    {
        public Game()
        {
            planets = new List<Planet>();
        }
        public int startingNumberOfLives { get; set; }
        public string name { get; set; }
        public int index { get; set; }
        public IList<Planet> planets { get; set; } 
    }
}
