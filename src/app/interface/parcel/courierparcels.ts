import { IParcelDetail } from './parceldetail';
export interface ICourierParcels{
    assignedParcels: IParcelDetail[],
    pickedUpParcels: IParcelDetail[]
}