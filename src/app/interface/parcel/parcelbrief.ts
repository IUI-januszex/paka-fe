import { IAddres } from "../address";

export interface IParcelBrief{
    id: number,
    senderInfo: string,
    receiverInfo: string,
    senderAddress: IAddres,
    receiverAddress: IAddres,
    estimatedDeliveryTime: Date,
    parcelFee: number,
    parcelPrice: number,
    isFeePaid: boolean,
    isParcelPaid: boolean,
    isMovable: boolean
}