import { IParcelBrief } from './parcelbrief';
export interface IUserParcel{
    observedParcels: IParcelBrief[],
    sentParcels: IParcelBrief[]
}