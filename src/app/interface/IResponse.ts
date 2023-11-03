export interface IResponse{
    responseMessage:String;
    httpStatus: any;
    responseStatus: String;
    responseBody: any;
}

export interface ITransactionDetail{
    transactionId: BigInt;
    transactionDate: Date;
    transactionType: String;
    transactionDetail: String;
    transactionCategory: String;
    trasactionCost: number;
    transactionSource: String;
}

export interface IChartDisplayData{
    y: number;
    name: String;
}