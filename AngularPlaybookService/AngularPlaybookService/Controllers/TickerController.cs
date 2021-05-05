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
  public class TickerController : ApiController
  {
    [Route("api/Ticker")]
    public HttpResponseMessage Get()
    {
      AngularPlaybookEntities entities = new AngularPlaybookEntities();
      var result = from ticker in entities.Tickers
                   select new
                   {
                     tickerId = ticker.TickerId,
                     stockName = ticker.StockName,
                     symbol = ticker.Symbol,
                     stockLastPrice = ticker.StockLastPrice,
                     transactions = from trans in entities.Transactions
                                    where ticker.TickerId == trans.TickerId
                                    select new
                                    {
                                      transactionId = trans.TransactionId,
                                      transactionType = trans.TransactionType,
                                      purchasePrice = trans.TransactionPrice,
                                      purchaseQuantity = trans.TransactionQuantity,
                                      transactionDate = trans.TransactionDate
                                    }
                   };
      return Request.CreateResponse(HttpStatusCode.OK, result);

    }

    public HttpResponseMessage Get(int id)
    {
      try
      {
        AngularPlaybookEntities entities = new AngularPlaybookEntities();
        var result = from ticker in entities.Tickers
                     where ticker.TickerId == id
                     select new
                     {
                       tickerId = ticker.TickerId,
                       stockName = ticker.StockName,
                       symbol = ticker.Symbol,
                       stockLastPrice = ticker.StockLastPrice,
                       transactions = from trans in entities.Transactions
                                      where ticker.TickerId == trans.TickerId
                                      select new
                                      {
                                        transactionId = trans.TransactionId,
                                        transactionType = trans.TransactionType,
                                        purchasePrice = trans.TransactionPrice,
                                        purchaseQuantity = trans.TransactionQuantity,
                                        transactionDate = trans.TransactionDate
                                      }
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

    public HttpResponseMessage Post([FromBody] Ticker ticker)
    {
      if (!ModelState.IsValid)
        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Bad Request");

      try
      {
        AngularPlaybookEntities entities = new AngularPlaybookEntities();
        
        
        entities.Tickers.Add(ticker);
        entities.SaveChanges();

        var message = Request.CreateResponse(HttpStatusCode.Created, ticker);
        message.Headers.Location = new Uri(Request.RequestUri + ticker.TickerId.ToString());
        return message;


      }

      catch (Exception ex)
      {
        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Something went wrong.");
      }
    }

    public HttpResponseMessage Put([FromBody] Ticker ticker)
    {
      if (!ModelState.IsValid)
        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Bad Request");


      AngularPlaybookEntities entities = new AngularPlaybookEntities();

      var debug = ticker;

      var existingTicker = entities.Tickers.Where(t => t.TickerId == ticker.TickerId)
                                              .FirstOrDefault<Ticker>();

      if (existingTicker != null)
      {
        existingTicker.StockName = ticker.StockName;
        existingTicker.Symbol = ticker.Symbol;
        existingTicker.StockLastPrice = ticker.StockLastPrice;

        entities.SaveChanges();
      }
      else
      {
        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Requested item not found");
      }


      return Request.CreateResponse(HttpStatusCode.OK, existingTicker);
    }

    public HttpResponseMessage Delete(int id)
    {
      if (id <= 0)
        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "ID not found");

      AngularPlaybookEntities entities = new AngularPlaybookEntities();
      var ticker = entities.Tickers
          .Where(s => s.TickerId == id)
          .FirstOrDefault();
      var debug = ticker;
      if (ticker != null)
      {
        entities.Entry(ticker).State = EntityState.Deleted;
        entities.SaveChanges();
        return Request.CreateResponse(HttpStatusCode.OK, ticker);

      }
      else
      {
        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Requested ID not found");
      }
    }

    [HttpGet()]
    [Route("api/Ticker/getAveragePrice/")]
    public HttpResponseMessage getAveragePrice(int id)
    {
      AngularPlaybookEntities entities = new AngularPlaybookEntities();

      try
      {
        var transactions = entities.Transactions
            .Where(t => t.TickerId == id);
        var checkNull = entities.Transactions
            .Where(t => t.TickerId == id).FirstOrDefault();
        var debug = checkNull;
        if (checkNull != null)
        {
          var sum = transactions.Sum(p => (float)p.TransactionPrice * p.TransactionQuantity);
          var totalQuantity = transactions.Sum(p => p.TransactionQuantity);

          return Request.CreateResponse(HttpStatusCode.OK, sum / totalQuantity);
        }
        else
        {
          return Request.CreateResponse(HttpStatusCode.OK, 0);
        }
      }
      catch(Exception ex)
      {
        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Something wrong has occured");
      }
       
      
    }
  }
}

