using System.Collections.Generic;
using System.Configuration;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;

namespace Robbo.AssetConverter
{
    class Program
    {
        static void Main(string[] args)
        {
            var gameAssets = ConfigurationManager.AppSettings["AssetDirectory"];
            var constructorAssets = Path.Combine(gameAssets, "constructor");
            var gameFiles = (new DirectoryInfo(gameAssets)).GetFiles().ToList();
            var constructorFiles = (new DirectoryInfo(constructorAssets)).GetFiles().ToList();

            var files = new Dictionary<string, List<List<int>>>();

            foreach (var file in gameFiles.Union(constructorFiles))
            {
                files[file.Name] = GetPixels(file);
            }

            var script = FilesToScript(files);

            File.WriteAllText("assets.js", script);
        }

        private static string FilesToScript(Dictionary<string, List<List<int>>> files)
        {
            var sb = new StringBuilder("app.Assets = {\n");
            for (var i = 0; i < files.Count; i++)
            {
                sb.Append(GetAssetString(files.ElementAt(i)));

                if (i != files.Count - 1)
                {
                    sb.Append(",");
                }

                sb.Append("\n");
            }
            sb.Append("}");
            return sb.ToString();
        }

        private static string GetAssetString(KeyValuePair<string, List<List<int>>> file)
        {
            var sb = new StringBuilder();
            sb.AppendLine(string.Format("\t\"{0}\" = [", file.Key));

            for (var i = 0; i < file.Value.Count; i++)
            {
                var row = file.Value[i];
                sb.Append("\t\t[");
                sb.Append(row.Select(x => x.ToString()).Aggregate((c, n) => c + ", " + n));
                sb.Append("]");

                if (i != file.Value.Count - 1)
                    sb.Append(",");

                sb.Append("\n");
            }

            sb.Append("\t]");

            return sb.ToString();
        }

        private static List<List<int>> GetPixels(FileInfo file)
        {
            var rows = new List<List<int>>();
            var bitmap = new Bitmap(file.FullName);
            for (var x = 0; x < bitmap.Height; x++)
            {
                var row = new List<int>();
                for (var y = 0; y < bitmap.Width; y++)
                {
                    var pixel = bitmap.GetPixel(y, x);
                    int? color = null;
                    for (var i = 0; i < ColorMap.Length; i++)
                    {
                        if (ComparePixels(pixel, ColorMap[i]))
                        {
                            color = i + 1;
                            break;
                        }
                    }
                    row.Add(color ?? 0);
                }
                rows.Add(row);
            }
            return rows;
        }

        private static bool ComparePixels(Color color1, Color color2)
        {
            return color1.R == color2.R && color1.B == color2.B && color1.G == color2.G;
        }

        private static Color[] ColorMap = new Color[]
        {
            Color.FromArgb(0,162,114,64),
            Color.FromArgb(0,28,39,131),
            Color.FromArgb(0,16,16,16),
            Color.FromArgb(0,152,152,152),
        };
    }
}
