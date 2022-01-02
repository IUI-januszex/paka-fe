import { IAddres } from "../address";
import { IOperation } from "./operation";

export interface ParcelDetail{
    id: number,
    senderInfo: string,
    receiverInfo: string,
    senderAddress: IAddres,
    receiverAddress: IAddres,
    expectedCourierArrivalDate: Date,
    parcelFee: number,
    parcelPrice: number,
    isFeePaid: boolean,
    isParcelPaid: boolean,
    isMovable: boolean,
    currentState: ParcelStateType,
    sourceAddress: IAddres,
    destinationAddress: IAddres,
    operations: IOperation[]
}