using System;
using System.Configuration;
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
                    Console.WriteLine("Press ENTER to close Robbo server.");
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
