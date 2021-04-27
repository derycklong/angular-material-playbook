export interface IPortfolio{
    portfolioId:number,
    symbol:string,
    stockName:string,
    stockLastPrice:number,
    stockAveragePrice?:number,
    stockQuantity?:number
}