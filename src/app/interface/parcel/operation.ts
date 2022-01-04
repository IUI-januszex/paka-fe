import { WarehouseType } from "../warehouse/warehousetype";
import { OperationType } from "./operationtype";

export interface IOperation{
    operationType: OperationType,
    warehouseId: number,
    warehouseType: WarehouseType,
    amount: number
}