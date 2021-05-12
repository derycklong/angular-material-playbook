export interface ITicker{
    tickerId:number,
    symbol:string,
    stockName:string,
    stockLastPrice:number,
    stockAveragePrice?:number,
    stockQuantity?:number,
    transactions?:ITransaction[]
}

export interface ITransaction{
    tickerId:number,
    transactionId:number,
    transactionType:string,
    transactionPrice:number,
    transactionQuantity:number,
    transactionDate: string

}