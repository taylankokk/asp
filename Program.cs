using Microsoft.EntityFrameworkCore;
using asp; // <-- Doğru namespace

var builder = WebApplication.CreateBuilder(args);

// Controller + Razor view desteği
builder.Services.AddControllersWithViews();

// PostgreSQL bağlantısı
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles(); // wwwroot içindeki CSS / JS erişimi için şart
app.UseRouting();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
