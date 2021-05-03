using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AngularPlaybookDataAccess;


namespace AngularPlaybookService.Controllers
{
  public class PortfolioController : ApiController
  {

    public HttpResponseMessage Get()
    {
      AngularPlaybookEntities entities = new AngularPlaybookEntities();
      var result = from e in entities.Portfolios
                   select new
                   {
                     portfolioId = e.PortfolioId,
                     stockName = e.StockName,
                     symbol = e.Symbol,
                     stockLastPrice = e.StockLastPrice,
                   };
      return Request.CreateResponse(HttpStatusCode.OK, result);

    }

    public HttpResponseMessage Get(int id)
    {
      try
      {
        AngularPlaybookEntities entities = new AngularPlaybookEntities();
        var result = from e in entities.Portfolios
                     where e.PortfolioId == id
                     select new
                     {
                       portfolioId = e.PortfolioId,
                       stockName = e.StockName,
                       symbol = e.Symbol,
                       stockLastPrice = e.StockLastPrice


                     };
        if (result.Any())
        {
          return Request.CreateResponse(HttpStatusCode.OK, result.First());
        }
        else
        {
          return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Requested Item not found");
        }

      }

      catch (Exception ex)
      {
        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "An error has occured");
      }

    }

    public HttpResponseMessage Post([FromBody] Portfolio portfolio)
    {

      try
      {
        AngularPlaybookEntities entities = new AngularPlaybookEntities();
        
        
        entities.Portfolios.Add(portfolio);
        entities.SaveChanges();

        var message = Request.CreateResponse(HttpStatusCode.Created, portfolio);
        message.Headers.Location = new Uri(Request.RequestUri + portfolio.PortfolioId.ToString());
        return message;


      }

      catch (Exception ex)
      {
        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "an error has occured");
      }
    }

  }
}

