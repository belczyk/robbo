using System;
using System.Configuration;
using System.Diagnostics;
using System.IO;
using Microsoft.Owin.Hosting;

namespace Robbo.Local.API
{
    public class Program
    {
        static void Main(string[] args)
        {
            try
            {
                string baseAddress = "http://localhost:" + ConfigurationManager.AppSettings["port"] + "/";

                using (WebApp.Start<Startup>(url: baseAddress))
                {
                    try
                    {
                        Process.Start("file://" + Path.Combine(Environment.CurrentDirectory, "robbo_constructor.html"));
                    }
                    catch { Console.WriteLine("Coudn't run constructor page. Open it manually."); }

                    Console.WriteLine("Prress ENTER to close Robbo server.");
                    Console.ReadLine();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }

            Console.WriteLine("Press ENTER to close Robbo server.");
            Console.ReadLine();
        }
    }
}
