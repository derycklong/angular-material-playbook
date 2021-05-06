using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AngularPlaybookDataAccess;
using Microsoft.Ajax.Utilities;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace AngularPlaybookService.Controllers
{
    public class TransactionController : ApiController
    {
    public HttpResponseMessage Post([FromBody]string content)
    {
      //if (!ModelState.IsValid)
       // return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Bad Request");

      try
      {
        AngularPlaybookEntities entities = new AngularPlaybookEntities();
        Transaction transaction = new Transaction();
        
        //trying a model-less method, not recommended as it does not check type.
        //content has to be stringify first if not it will be null
        var json = JsonConvert.DeserializeObject<Dictionary<string, dynamic>>(content);
        var debug = json;
        transaction.TickerId = (int)json["tickerId"];
        transaction.TransactionType = json["transactionType"];
        transaction.TransactionPrice = (decimal)json["transactionPrice"];
        transaction.TransactionQuantity = (double)json["transactionQuantity"];
        transaction.TransactionDate = Convert.ToDateTime(json["transactionDate"]);



        entities.Transactions.Add(transaction);
        entities.SaveChanges();

        var message = Request.CreateResponse(HttpStatusCode.Created, transaction);
        message.Headers.Location = new Uri(Request.RequestUri + transaction.TickerId.ToString());
        return message;


      }

      catch (Exception ex)
      {
        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Something went wrong.");
      }
    }
  }
}
