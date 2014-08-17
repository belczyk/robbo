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

        public Universe Get()
        {
            return OriginalGame.OriginalUniverse;
        }

        public void Post(Universe universe)
        {
            var json = JsonConvert.SerializeObject(universe);

            BackupUniverse();

            File.WriteAllText(UniverseFileName, string.Format(UniverseFileFormat, json));
        }

        private void BackupUniverse()
        {
            var universeFile = new FileInfo(UniverseFileName);

            if (!universeFile.Exists) return;

            var backupFolder = new DirectoryInfo("universe backup");

            if (!backupFolder.Exists)
                backupFolder.Create();

            universeFile.CopyTo(Path.Combine(backupFolder.FullName, DateTime.Now.ToString("yyyy-MM-dd HH_mm_ss_fff ")+"universe.js"));
        }
    }
}
