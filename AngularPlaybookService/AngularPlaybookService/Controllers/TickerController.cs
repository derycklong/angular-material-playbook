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
    //[Route("api/Ticker")]
    public HttpResponseMessage Get()
    {
      AngularPlaybookEntities entities = new AngularPlaybookEntities();

      var result1 = entities.Tickers.Select(ticker => new
      {
        tickerId = ticker.TickerId,
        stockName = ticker.StockName,
        symbol = ticker.Symbol,
        stockLastPrice = ticker.StockLastPrice,
        transactions = entities.Transactions.Where(trans => trans.TickerId == ticker.TickerId).Select(s =>
           
          new
          {
            
            
            transactionId = s.TransactionId,
            transactionType = s.TransactionType,
            purchasePrice = s.TransactionPrice,
            purchaseQuantity = s.TransactionQuantity,
            transactionDate = s.TransactionDate,
          }
        )


      });

      var result = from ticker in entities.Tickers
                   let buyTransaction = entities.Transactions.Where(t => t.TickerId == ticker.TickerId && t.TransactionType == "Buy")
                   let sellTransaction = entities.Transactions.Where(t => t.TickerId == ticker.TickerId && t.TransactionType == "Sell")
                   let buySum = buyTransaction.Count() > 0 ? buyTransaction.Sum(t => (double)t.TransactionPrice * t.TransactionQuantity) : 0
                   let sellSum = sellTransaction.Count() > 0 ? sellTransaction.Sum(t => (double)t.TransactionPrice * t.TransactionQuantity) : 0
                   select new
                   {
                     tickerId = ticker.TickerId,
                     stockName = ticker.StockName,
                     symbol = ticker.Symbol,
                     stockLastPrice = ticker.StockLastPrice,
                     buySum = buySum,
                     sellSum = sellSum,
                            


                     transactions = from trans in entities.Transactions
                                    where ticker.TickerId == trans.TickerId
                                    select new
                                    {
                                      tickerId = ticker.TickerId,
                                      transactionId = trans.TransactionId,
                                      transactionType = trans.TransactionType,
                                      transactionPrice = trans.TransactionPrice,
                                      transactionQuantity = trans.TransactionQuantity,
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
                                        transactionPrice = trans.TransactionPrice,
                                        transactionQuantity = trans.TransactionQuantity,
                                        transactionDate = trans.TransactionDate,

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
    [Route("api/Ticker/getTickerDetails/")]
    public HttpResponseMessage getTickerDetails(int id)
    {
      AngularPlaybookEntities entities = new AngularPlaybookEntities();

      try
      {
        var checkNull = entities.Transactions
            .Where(t => t.TickerId == id).FirstOrDefault();
        var tickers = entities.Tickers
          .Where(t => t.TickerId == id).FirstOrDefault<Ticker>();
                              
        var debug = checkNull;
        if (checkNull != null)
        {
          var buyTransaction = entities.Transactions.Where(t => t.TickerId == id && t.TransactionType == "Buy");
          var sellTransaction = entities.Transactions.Where(t => t.TickerId == id && t.TransactionType == "Sell");

          var buySum = 0.0;
          var buyQuantity = 0.0;
          var sellSum = 0.0;
          var sellQuantity = 0.0;


          if (buyTransaction.Count() > 0)
          {
             buySum = buyTransaction.Sum(t => (double)t.TransactionPrice * t.TransactionQuantity);
             buyQuantity = buyTransaction.Sum(p => p.TransactionQuantity);
          }

          if (sellTransaction.Count() > 0)
          {
            sellSum = sellTransaction.Sum(t => (double)t.TransactionPrice * t.TransactionQuantity);
            sellQuantity = sellTransaction.Sum(p => p.TransactionQuantity);

          }

          var averagePrice = buySum / buyQuantity;
          var averagePriceWithSell = (buySum - sellSum)/(buyQuantity-sellQuantity);
          var totalQuantity = buyQuantity - sellQuantity;
          var pl = (buyQuantity * (double)tickers.StockLastPrice) - buySum;
          var plPercentage = (((buyQuantity * (double)tickers.StockLastPrice)/buySum)*100)-100;



          var collection = new Dictionary<string, dynamic>();
          collection.Add("tickerId", tickers.TickerId);
          collection.Add("symbol", tickers.Symbol);
          collection.Add("stockName", tickers.StockName);
          collection.Add("lastPrice", tickers.StockLastPrice);
          collection.Add("averagePrice", averagePrice);
          collection.Add("totalQuantity", totalQuantity);
          collection.Add("averagePriceWithSell", averagePriceWithSell);
          collection.Add("p&l", pl);
          collection.Add("p&lPercentage", plPercentage);

          var json = new
          {
            tickerId = tickers.TickerId,
            symbol = tickers.Symbol,
            stockName = tickers.StockName,
            lastPrice = tickers.StockLastPrice,
            averagePrice = averagePrice,
            totalQuantity = totalQuantity,
            averagePriceWithSell = averagePriceWithSell,
            pnl = pl,
            pnlPercentage = plPercentage
          };
          return Request.CreateResponse(HttpStatusCode.OK, json);
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

