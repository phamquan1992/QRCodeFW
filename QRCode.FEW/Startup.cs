using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using QRCode.Core.Domain2;
using QRCode.FEW.Extensions.NHibernate;
using QRCode.Repositories.IRepository;
using QRCode.Repositories.Repository;
using QRCode.Services.ISerivce;
using QRCode.Services.ServiceImp;
using System;
using System.IO;
using System.Linq;
using System.Text;

namespace QRCode.FEW
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddNHibernate(Configuration["ConnectionStrings:DefaultConnection"]);
            #region Repository
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IproductRepository, productRepository>();
            services.AddScoped<IlocationRepository, locationRepository>();
            services.AddScoped<IcategoryRepository, categoryRepository>();
            services.AddScoped<Iqr_enterpriseRepository, qr_enterpriseRepository>();
            services.AddScoped<IuserdataRepository, userdataRepository>();
            services.AddScoped<Iqr_paymentRepository, qr_paymentRepository>();
            services.AddScoped<Iqr_gencodeRepository, qr_gencodeRepository>();
            services.AddScoped<IsectorsRepository, sectorsRepository>();
            #endregion
            #region Services
            services.AddScoped<IproductService, productService>();
            services.AddScoped<IlocationService, locationService>();
            services.AddScoped<IcategoryService, categoryService>();
            services.AddScoped<Iqr_enterpriseService, qr_enterpriseService>();
            services.AddScoped<IuserdataService, userdataService>();
            services.AddScoped<Iqr_paymentService, qr_paymentService>();
            services.AddScoped<Iqr_gencodeService, qr_gencodeService>();
            services.AddScoped<IsectorsService, sectorsService>();
            #endregion

            services.Configure<MailSettings>(Configuration.GetSection("MailSettings"));
            services.AddTransient<IMailService, MailService>();

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "_101SendEmailNotificationDoNetCoreWebAPI", Version = "v1" });
            });
            services.AddCors(c =>
            {
                c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin());
            });



            services.AddControllersWithViews();
            // In production, the Angular files will be served from this directory
            services.Configure<FormOptions>(o =>
            {
                o.ValueLengthLimit = int.MaxValue;
                o.MultipartBodyLengthLimit = int.MaxValue;
                o.MemoryBufferThreshold = int.MaxValue;
            });
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
            services.AddControllers().AddNewtonsoftJson();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(option =>
            {
                option.RequireHttpsMetadata = false;
                option.SaveToken = true;
                option.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidAudience = Configuration["JWT:Audience"],
                    ValidIssuer = Configuration["JWT:Issuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:Key"]))

                };
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            //loggerFactory.AddLog4Net();
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "_101SendEmailNotificationDoNetCoreWebAPI v1"));
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            string src_flie = path_file().Replace(@"\", "/") + "/";
            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), src_flie)),
                RequestPath = new PathString("/Resources")
            });
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";
                spa.Options.StartupTimeout = new TimeSpan(0, 15, 0);
                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
        private string path_file()
        {
            var extractPath = Path.Combine(@"ClientApp");
            string[] files = Directory.GetDirectories(extractPath, "*.*", SearchOption.AllDirectories);
            var file_find = files.Where(t => t.Contains("assets"));
            var gt = file_find.Select(t => t.Split("assets")[0]);
            var temp = from a in gt
                       group a by a into gr
                       select gr.Key;
            var any_src = temp.Any(t => t.Contains(@"ClientApp\src"));
            if (any_src)
                return Path.Combine(@"ClientApp\src", "assets");
            else
                return temp.FirstOrDefault();
        }
    }
}
