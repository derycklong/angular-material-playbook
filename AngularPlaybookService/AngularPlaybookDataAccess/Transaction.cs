//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace AngularPlaybookDataAccess
{
    using System;
    using System.Collections.Generic;
    
    public partial class Transaction
    {
        public int TransactionId { get; set; }
        public int TickerId { get; set; }
        public string TransactionType { get; set; }
        public decimal TransactionPrice { get; set; }
        public double TransactionQuantity { get; set; }
        public Nullable<System.DateTime> TransactionDate { get; set; }
    
        public virtual Ticker Ticker { get; set; }
    }
}
