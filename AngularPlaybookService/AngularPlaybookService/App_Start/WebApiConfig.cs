using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace AngularPlaybookService
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
          // Web API configuration and services

          // Web API routes
          config.MapHttpAttributeRoutes();

          config.Routes.MapHttpRoute(
              name: "DefaultApi",
              routeTemplate: "api/{controller}/{id}",
              defaults: new { id = RouteParameter.Optional }
          );



          //Remove XML Formatter
          config.Formatters.Remove(config.Formatters.XmlFormatter);
          config.Formatters.Add(config.Formatters.JsonFormatter);
          //Neat Indent
          config.Formatters.JsonFormatter.SerializerSettings.Formatting = Newtonsoft.Json.Formatting.Indented;

          config.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;

    }
    }
}
