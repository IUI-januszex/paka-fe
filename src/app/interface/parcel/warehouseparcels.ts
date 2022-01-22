import { IParcelDetail } from './parceldetail';
export interface IWarehouseParcel{
    parcelsAssigned: IParcelDetail[],
    parcelsAtWarehouse: IParcelDetail[]
}