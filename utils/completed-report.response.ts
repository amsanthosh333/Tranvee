export class CompletedListDataRes {
    _id: string;
    customerusername: string;
    drivername:string;
    vechicleName:string;
    vechicleNo:string;
    customerphone: string;
    driverphone:string;
    baseFare:number;
    additionDistancePerKm:number;
    additionMinPerMin:number;
    timeLimit:number;
    distanceLimit:number;
    Pickuploc:string;
    Bookdate:string;
    Droploc:string;
    paymentstatus:string;
    TotalKm:number;
    loadingamount:number;
    basefare:number;
    extramin:number;
    Amount:number
}
export interface CompletedReportResponse {
    response:CompletedListDataRes[]
}