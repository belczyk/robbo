namespace Robbo.Local.API
{
    public class Planet
    {
        public string name { get; set; }
        public int index { get; set; }
        public int width { get; set; }
        public int height { get; set; }
        public int boltsToBeCollected { get; set; }
        public string map { get; set; }
        public int[] background { get; set; }
        public int[] transparent { get; set; }
        public int[][] colors { get; set; }
    }
}