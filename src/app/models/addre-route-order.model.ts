import { Address } from './address.model';
import { Route } from './route.model';
import { Batch } from './batch.model';

export class AddreRouteOrder {
    id: number;
    addressId: number;
    routeId: number;
    createdAt: Date;
    updatedAt: Date;
    address: Address;
    route: Route;
    batch: Batch;
}