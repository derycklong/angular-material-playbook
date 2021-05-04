using System;
using System.Collections.Generic;
using System.Data;
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
      if (!ModelState.IsValid)
        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Bad Request");

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
        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Something went wrong.");
      }
    }

    public HttpResponseMessage Put([FromBody] Portfolio portfolio)
    {
      if (!ModelState.IsValid)
        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Bad Request");


      AngularPlaybookEntities entities = new AngularPlaybookEntities();

      var debug = portfolio;

      var existingPortfolio = entities.Portfolios.Where(p => p.PortfolioId == portfolio.PortfolioId)
                                              .FirstOrDefault<Portfolio>();

      if (existingPortfolio != null)
      {
        existingPortfolio.StockName = portfolio.StockName;
        existingPortfolio.Symbol = portfolio.Symbol;
        existingPortfolio.StockLastPrice = portfolio.StockLastPrice;

        entities.SaveChanges();
      }
      else
      {
        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Requested item not found");
      }


      return Request.CreateResponse(HttpStatusCode.OK, existingPortfolio);
    }

    public HttpResponseMessage Delete(int id)
    {
      if (id <= 0)
        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "ID not found");

      AngularPlaybookEntities entities = new AngularPlaybookEntities();
      var portfolio = entities.Portfolios
          .Where(s => s.PortfolioId == id)
          .FirstOrDefault();
      if (portfolio != null)
      {
        entities.Entry(portfolio).State = EntityState.Deleted;
        entities.SaveChanges();
        return Request.CreateResponse(HttpStatusCode.OK, portfolio);

      }
      else
      {
        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Requested ID not found");
      }



      
    }
  }
}

