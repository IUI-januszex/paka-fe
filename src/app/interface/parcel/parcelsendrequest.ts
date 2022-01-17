import { IAddres } from './../address';
export interface IParcelSendRequest{
    deliveryAddress: IAddres,
    parcelType: number,
    price: number,
    receiverDetails: string,
    receiverEmailAddress:string,
    receiverPhoneNumber:string,
    senderAddress: IAddres,
    senderDetails: string,
    senderEmailAddress: string,
    senderPhoneNumber: string
}