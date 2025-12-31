using Microsoft.EntityFrameworkCore;
using Photography.API.Data;
using Photography.API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// ============================================
// 1. CONFIGURATION
// ============================================

var configuration = builder.Configuration;
var services = builder.Services;

// ============================================
// 2. ADD SERVICES TO CONTAINER
// ============================================

// Controllers with JSON options
services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull;
    });

// Database Context (PostgreSQL)
services.AddDbContext<AppDbContext>(options =>
{
    var connectionString = configuration.GetConnectionString("DefaultConnection");
    options.UseNpgsql(connectionString);
});

// CORS Policy
services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
                configuration["FrontendUrl"] ?? "http://localhost:5173",
                "https://localhost:5173"
            )
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

// JWT Authentication
var jwtKey = configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key is not configured");
var jwtIssuer = configuration["Jwt:Issuer"] ?? "Photography.API";
var jwtAudience = configuration["Jwt:Audience"] ?? "Photography.Client";

services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtIssuer,
        ValidAudience = jwtAudience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
        ClockSkew = TimeSpan.Zero
    };
});

services.AddAuthorization();

// Application Services
services.AddScoped<IPhotoService, PhotoService>();
services.AddScoped<IStorageService, AzureBlobStorageService>(); // or S3StorageService
services.AddScoped<IImageProcessingService, ImageProcessingService>();

// HTTP Client for external APIs
services.AddHttpClient();

// Health Checks
services.AddHealthChecks()
    .AddDbContextCheck<AppDbContext>("database")
    .AddCheck("storage", () => Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckResult.Healthy("Storage is healthy"));

// Swagger/OpenAPI
services.AddEndpointsApiExplorer();
services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "Photography API",
        Version = "v1",
        Description = "API for Elena Photography photo upload and management",
        Contact = new Microsoft.OpenApi.Models.OpenApiContact
        {
            Name = "Elena Photography",
            Email = "contact@elenaphoto.com"
        }
    });

    // JWT Authentication in Swagger
    options.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Bearer {token}\"",
        Name = "Authorization",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    options.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Reference = new Microsoft.OpenApi.Models.OpenApiReference
                {
                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

// Request Logging
services.AddLogging(logging =>
{
    logging.ClearProviders();
    logging.AddConsole();
    logging.AddDebug();
});

// ============================================
// 3. BUILD THE APPLICATION
// ============================================

var app = builder.Build();

// ============================================
// 4. CONFIGURE HTTP REQUEST PIPELINE
// ============================================

// Development-specific middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "Photography API v1");
        options.RoutePrefix = string.Empty; // Swagger at root URL
    });
    
    app.UseDeveloperExceptionPage();
}
else
{
    // Production error handling
    app.UseExceptionHandler("/error");
    app.UseHsts();
}

// Security Headers
app.Use(async (context, next) =>
{
    context.Response.Headers.Append("X-Content-Type-Options", "nosniff");
    context.Response.Headers.Append("X-Frame-Options", "DENY");
    context.Response.Headers.Append("X-XSS-Protection", "1; mode=block");
    context.Response.Headers.Append("Referrer-Policy", "strict-origin-when-cross-origin");
    await next();
});

// HTTPS Redirection
app.UseHttpsRedirection();

// CORS - Must be before Authentication & Authorization
app.UseCors("AllowFrontend");

// Authentication & Authorization
app.UseAuthentication();
app.UseAuthorization();

// Request Logging Middleware
app.Use(async (context, next) =>
{
    var logger = context.RequestServices.GetRequiredService<ILogger<Program>>();
    var startTime = DateTime.UtcNow;
    
    logger.LogInformation("Request: {Method} {Path} from {IP}", 
        context.Request.Method, 
        context.Request.Path,
        context.Connection.RemoteIpAddress);
    
    await next();
    
    var duration = DateTime.UtcNow - startTime;
    logger.LogInformation("Response: {StatusCode} - Duration: {Duration}ms",
        context.Response.StatusCode,
        duration.TotalMilliseconds);
});

// Map Controllers
app.MapControllers();

// Health Check Endpoint
app.MapHealthChecks("/health");

// Root Endpoint
app.MapGet("/", () => Results.Ok(new
{
    Name = "Photography API",
    Version = "1.0.0",
    Status = "Running",
    Timestamp = DateTime.UtcNow,
    Endpoints = new
    {
        Health = "/health",
        Swagger = "/swagger",
        Api = "/api"
    }
}))
.WithName("Root")
.WithTags("Info");

// Error Endpoint (Production)
app.MapGet("/error", () => Results.Problem("An error occurred processing your request."))
    .ExcludeFromDescription();

// ============================================
// 5. DATABASE MIGRATION (Development)
// ============================================

if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    
    try
    {
        // Apply pending migrations
        await dbContext.Database.MigrateAsync();
        app.Logger.LogInformation("✅ Database migrations applied successfully");
    }
    catch (Exception ex)
    {
        app.Logger.LogError(ex, "❌ Error applying database migrations");
    }
}

// ============================================
// 6. RUN THE APPLICATION
// ============================================

app.Logger.LogInformation("🚀 Photography API starting...");
app.Logger.LogInformation("📡 Environment: {Environment}", app.Environment.EnvironmentName);
app.Logger.LogInformation("🌐 Listening on: {Urls}", string.Join(", ", app.Urls));

app.Run();