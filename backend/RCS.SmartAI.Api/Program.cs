using RCS.SmartAI.Application.Businesses.Repositories;
using RCS.SmartAI.Infrastructure.GoogleSheets;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddHealthChecks();

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy
            .WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});
builder.Services.AddSingleton<IBusinessBrainRepository,
    GoogleSheetsBusinessBrainRepository>();
var app = builder.Build();

app.UseCors("Frontend");

app.MapHealthChecks("/health");
app.MapControllers();

app.Run();
