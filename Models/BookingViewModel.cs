using System;
using System.ComponentModel.DataAnnotations;


public class BookingViewModel
{
    [Required]
    public string Name { get; set; }

    [Required, EmailAddress]
    public string Email { get; set; }

    [Required]
    public string Location { get; set; }

    [Required, DataType(DataType.Date)]
    public DateTime Pickup { get; set; }

    [Required, DataType(DataType.Date)]
    public DateTime Dropoff { get; set; }

    [Required]
    public string CarType { get; set; }
}
