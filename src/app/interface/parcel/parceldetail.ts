import { IParcelType } from './parceltype';
import { IAddres } from "../address";
import { IOperation } from "./operation";
import { ParcelStateType } from "./parcelstatetype";

export interface IParcelDetail{
    id: number,
    type: IParcelType,
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