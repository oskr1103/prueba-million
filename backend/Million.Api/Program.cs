using System.Reflection;
using Million.Api.Middleware;
using Million.Application.Interfaces;
using Million.Application.Services;
using Million.Domain.Interfaces;
using Million.Infrastructure.Configuration;
using Million.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Version = "v1",
        Title = "Million Real Estate API",
        Description = "API para gestión de propiedades inmobiliarias de lujo"
    });

    try
    {
        var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
        var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
        if (File.Exists(xmlPath))
        {
            options.IncludeXmlComments(xmlPath);
        }
    }
    catch
    {
    }
});

var mongoDbSettings = new MongoDbSettings
{
    ConnectionString = builder.Configuration.GetValue<string>("MongoDB:ConnectionString") ?? "mongodb://localhost:27017",
    DatabaseName = builder.Configuration.GetValue<string>("MongoDB:DatabaseName") ?? "million",
    PropertiesCollectionName = builder.Configuration.GetValue<string>("MongoDB:PropertiesCollectionName") ?? "properties"
};

builder.Services.AddSingleton(mongoDbSettings);
builder.Services.AddSingleton<IPropertyRepository, PropertyRepository>();
builder.Services.AddScoped<IPropertyService, PropertyService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("AllowFrontend");

app.UseMiddleware<GlobalExceptionMiddleware>();

app.UseAuthorization();

app.MapControllers();

app.Run();
