export interface ITicker{
    tickerId:number,
    symbol:string,
    stockName:string,
    stockLastPrice:number,
    stockAveragePrice?:number,
    stockQuantity?:number,
    transaction?:ITransaction[]
}

export interface ITransaction{
    tickerId:number,
    transactionType:string,
    transactionPrice:number,
    transactionQuantity:number,
    transactionDate: string

}