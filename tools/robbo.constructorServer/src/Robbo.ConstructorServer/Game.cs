using System.Collections.Generic;


namespace Robbo.Local.API
{
    public class Game
    {
        public Game()
        {
            Plantes = new List<Planet>();
        }
        public string Name { get; set; }
        public IList<Planet> Plantes { get; set; } 
        public int StartingNumberOfLives { get; set; }
    }
}
