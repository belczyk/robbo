using System;
using System.IO;
using System.Net;
using System.Web.Http;
using Newtonsoft.Json;

namespace Robbo.Local.API
{
    public class RobboController : ApiController
    {
        private const string UniverseFileFormat = "app.Universe = {0}";
        private const string UniverseFileName = "universe.js";
        private const string Config = "config";
        private const string Backup = "backup";

        public HttpStatusCode Get()
        {
            return HttpStatusCode.OK;
        }


        public void Post(Universe universe)
        {
            var json = JsonConvert.SerializeObject(universe,Formatting.Indented);
            json = json.Replace("\\n", "\\n\\\n");
            BackupUniverse();

            File.WriteAllText(Path.Combine(ConfigPath, UniverseFileName), string.Format(UniverseFileFormat, json));
        }

        private void BackupUniverse()
        {
            var universeFile = new FileInfo(Path.Combine(ConfigPath,UniverseFileName));

            if (!universeFile.Exists) return;

            var backupName = DateTime.Now.ToString("yyyy-MM-dd HH_mm_ss_fff ") + UniverseFileName;

            universeFile.CopyTo(Path.Combine(BackupPath,backupName));
        }

        private string ConfigPath
        {
            get
            {
                var path = Path.Combine(Environment.CurrentDirectory, Config);
                var dir = new DirectoryInfo(path);
                if (!dir.Exists)
                    dir.Create();

                return path;
            }
        }

        private string BackupPath
        {
            get
            {
                var path = Path.Combine(ConfigPath, Backup);
                var dir = new DirectoryInfo(path);
                if (!dir.Exists)
                    dir.Create();

                return path;
            }
        }
    }
}
