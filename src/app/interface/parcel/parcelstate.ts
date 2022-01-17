import { ParcelStateType } from "./parcelstatetype";

export interface IParcelState{
    type: ParcelStateType,
    changeTime: Date,
    warehouseId: number,
    warehouseType: string,
    courierId: string
}