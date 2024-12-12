import { Contract } from './contract.model';
import { Vehiculo } from './vehiculo.model';
import { Batch } from './batch.model';
import { AddreRouteOrder } from './addre-route-order.model';
import { Address } from './address.model';

export class Route {
    id: number;
    starting_place: string;
    ending_place: string;
    distance: number;
    delivery_date: Date;
    contract_id: number;
    vehiculo_id: number;
    createdAt: Date;
    updatedAt: Date;
    contract: Contract;
    vehiculo: Vehiculo;
    batches: Batch[];
    addrerouteorders: AddreRouteOrder[];
    conductores: Address[];
}
