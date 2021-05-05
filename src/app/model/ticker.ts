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
    purchasePrice:number,
    purchaseQuantity:number,
    transactionDate: Date

}