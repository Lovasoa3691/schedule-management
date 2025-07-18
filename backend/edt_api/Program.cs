using edt_api.config;
using edt_api.services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
);

// builder.Services.AddOpenApi();
builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddScoped<IUtilisateur, ImUtilisateur>();
builder.Services.AddScoped<IMention, ImMention>();
builder.Services.AddScoped<INiveau, IMNiveau>();
builder.Services.AddScoped<IMatiere, ImMatiere>();
builder.Services.AddScoped<ISalle, IMSalle>();
builder.Services.AddScoped<IDisponibilite, ImDisponibilite>();
builder.Services.AddScoped<IEdt, ImEdt>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

// using (var scope = app.Services.CreateScope())
// {
//     var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
//     db.Database.Migrate();
// }

app.UseAuthentication();
app.MapControllers();
app.Run();