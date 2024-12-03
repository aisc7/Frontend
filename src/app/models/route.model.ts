import { Contract } from './contract.model';
import { Vehiculo } from './vehiculo.model';
import { Batch } from './batch.model';
import { AddreRouteOrder } from './addre-route-order.model';
import { Address } from './address.model';

export class Route {
    id: number;
    startingPlace: string;
    endingPlace: string;
    distance: number;
    deliveryDate: Date;
    contractId: number;
    vehiculoId: number;
    createdAt: Date;
    updatedAt: Date;
    contract: Contract;
    vehiculo: Vehiculo;
    batches: Batch[];
    addrerouteorders: AddreRouteOrder[];
    conductores: Address[];
}
