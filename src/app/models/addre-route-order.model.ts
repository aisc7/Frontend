import { Address } from './address.model';
import { Route } from './route.model';
import { Batch } from './batch.model';

export class AddreRouteOrder {
    id: number;
    address_id: number;
    route_id: number;
    createdAt: Date;
    updatedAt: Date;
    address: Address;
    route: Route;
    batch: Batch;
}