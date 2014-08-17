using System;
using System.IO;
using System.Web.Http;
using Newtonsoft.Json;

namespace Robbo.Local.API
{
    public class RobboController : ApiController
    {
        private const string UniverseFileFormat = "app.Universe = {0}";
        private const string UniverseFileName = "universe.js";
        private const string Config = "config";

        public Universe Get()
        {
            return OriginalGame.OriginalUniverse;
        }

        private string ConfigPath
        {
            get
            {
                var path =  Path.Combine(Environment.CurrentDirectory, Config);
                var dir = new DirectoryInfo(path);
                if(!dir.Exists)
                    dir.Create();

                return path;
            }
        }
        public void Post(Universe universe)
        {
            var json = JsonConvert.SerializeObject(universe,Formatting.Indented);

            BackupUniverse();

            File.WriteAllText(Path.Combine(ConfigPath, UniverseFileName), string.Format(UniverseFileFormat, json));
        }

        private void BackupUniverse()
        {
            var universeFile = new FileInfo(UniverseFileName);

            if (!universeFile.Exists) return;

            var backupFolder = new DirectoryInfo(Path.Combine(ConfigPath, Config));

            if (!backupFolder.Exists)
                backupFolder.Create();

            universeFile.CopyTo(Path.Combine(ConfigPath, DateTime.Now.ToString("yyyy-MM-dd HH_mm_ss_fff ")+UniverseFileName));
        }
    }
}
