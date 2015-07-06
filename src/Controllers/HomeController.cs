using FirstASPNET5AppWithVSCode.Models;
using Microsoft.AspNet.Mvc;

namespace FirstASPNET5AppWithVSCode.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            MenuItem[] menuItems = {
                 new MenuItem { Label = "Page A", Url = "pageA.html" }
                ,new MenuItem { Label = "Page B", Url = "pageB.html" }
            };
            
            return View(menuItems);
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View("~/Views/Shared/Error.cshtml");
        }
    }
}
