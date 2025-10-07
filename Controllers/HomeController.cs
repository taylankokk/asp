using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using asp.Models;

namespace asp.Controllers;

public class HomeController : Controller
{
    [HttpGet]
    public IActionResult Index()
    {
        return View();
    }

    [HttpPost]
    public IActionResult SubmitBooking(BookingViewModel model)
    {
        if (!ModelState.IsValid)
        {
            return View("Index", model);
        }

        // TODO: Save to DB or forward to payment process
        return RedirectToAction("Success");
    }

    public IActionResult Success()
    {
        return View(); // Show success message
    }
}
