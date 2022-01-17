import { IParcelType } from './parceltype';
import { IAddres } from "../address";
import { IParcelState } from "./parcelstate";
import { ParcelStateType } from "./parcelstatetype";

export interface IParcelBrief{
    id: number,
    type: IParcelType,
    senderInfo: string,
    receiverInfo: string,
    senderAddress: IAddres,
    receiverAddress: IAddres,
    estimatedDeliveryTime: Date,
    parcelFee: number,
    parcelPrice: number,
    isFeePaid: boolean,
    isParcelPaid: boolean,
    isMovable: boolean,
    currentState: IParcelState,

}